import {Component, OnInit} from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {Device} from "../../models/device.interface";
import {FireEffect} from "../../models/effects/fire-effect.class";
import {Builder, Effect, EffectCode} from "../../models/effect.class";
import {ColorEffect} from "../../models/effects/color-effect.class";
import {LocalStorageService} from "../../services/local-storage.service";
import {Buffer} from "buffer";
import {Deserializer} from "v8";
import {MatDialog} from "@angular/material/dialog";
import {DeviceEditComponent} from "./edit/device-edit.component";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  private static DISCOVERY_TOPIC: string = 'device/discovery';
  private static PRESENCE_TOPIC: string = 'device/presence';
  private static CONFIGURE_TOPIC: string = 'device/configure';
  private static DESCRIPTION_TOPIC: string = 'device/description';
  private static DESCRIBE_TOPIC: string = 'device/describe';
  private static PING_TOPIC: string = 'device/ping';
  private static PONG_TOPIC: string = 'device/pong';

  private static PING_TIMEOUT: number = 3000;
  private static MAX_ALLOWED_PENDING_PINGS: number = 3;

  private presenceSubscription: Subscription;
  private descriptionSubscription: Subscription;
  private pongSubscription: Subscription;

  Effect = Effect;
  maxAllowedPendingPings = DevicesComponent.MAX_ALLOWED_PENDING_PINGS;

  devices: Map<number, Device>;

  constructor(private mqttService: MqttService,
              private storageService: LocalStorageService,
              protected dialog: MatDialog) {
    this.devices = new Map<number, Device>();
    this.storageService.set(`device-name-0`, 'Office Window');
    this.storageService.set(`device-name-1`, 'Suite Window');
    this.storageService.set(`device-name-2`, 'Lucas Window');
    this.storageService.set(`device-name-3`, 'House Front');
    this.storageService.set(`device-name-4`, 'Lucas Desk');
    this.storageService.set(`device-name-5`, 'Davi Desk');
    this.storageService.set(`device-name-6`, 'Office Desk');

    this.mqttService.publish(DevicesComponent.DISCOVERY_TOPIC, '').subscribe(() => {
    });

    this.presenceSubscription = this.mqttService.observe(DevicesComponent.PRESENCE_TOPIC).subscribe((message: IMqttMessage) => {
      for (let i = 0; i < (message.length || 0); i++) {
        console.log(i, ':', message.payload[i]);
      }
      const id: number = message.payload[0];
      const device: Device = this.ensureDevice(id);
      device.availableEffects = new Map<EffectCode, Effect>();
      for (let i = 0; i < message.payload[1]; i++) {
        const effectCode: number = message.payload[2 + i];
        const builder: Builder | undefined = Effect.registeredEffects.get(effectCode);
        let effect = {} as Effect;
        if (builder != undefined) {
          effect = builder();
        }
        device.availableEffects.set(effectCode, effect);
      }
      const b = Uint8Array.from([device.id]);
      this.mqttService.publish(DevicesComponent.DESCRIBE_TOPIC, new Buffer(b)).subscribe(() => {
      });
    });

    this.descriptionSubscription = this.mqttService.observe(DevicesComponent.DESCRIPTION_TOPIC).subscribe((message: IMqttMessage) => {
      const id: number = message.payload[0];
      const effectCode: number = message.payload[1];
      const device: Device = this.ensureDevice(id);
      const effect: Effect | undefined = device.availableEffects?.get(effectCode);
      if (effect) {
        device.currentEffectCode = effectCode;
        effect.applyParameters(message.payload.slice(2));
        console.log(effect)
      }
    });

    this.pongSubscription = this.mqttService.observe(DevicesComponent.PONG_TOPIC).subscribe((message: IMqttMessage) => {
      const id: number = message.payload[0];
      const device: Device = this.ensureDevice(id);
      device.pendingPings = 0;
    });

    setInterval(() => {
      Array.from(this.devices.values()).filter(d => d.pendingPings > DevicesComponent.MAX_ALLOWED_PENDING_PINGS).map(d => this.devices.delete(d.id));
      Array.from(this.devices.values()).map(d => {
        d.pendingPings++;
      })
      this.mqttService.publish(DevicesComponent.PING_TOPIC, '').subscribe(() => {
      });
    }, DevicesComponent.PING_TIMEOUT);

    Effect.registerEffect(FireEffect.CODE, FireEffect.build);
    Effect.registerEffect(ColorEffect.CODE, ColorEffect.build);
  }

  ngOnInit(): void {
  }

  onRenameDeviceClick(device: Device): void {
    const dialogRef = this.dialog.open(DeviceEditComponent, {
      data: {device},
      closeOnNavigation: true
    });
    const onSave = dialogRef.componentInstance.save.subscribe((d: Device) => {
      this.storageService.set(`device-name-${d.id}`, d.name);
      dialogRef.close();
    });
    const onCancel = dialogRef.componentInstance.cancel.subscribe(() => {
      dialogRef.close();
    });
  }

  onApplyDeviceClick(id: number): void {

  }

  toggleDevice(device: Device): void {
    device.hidden = !device.hidden;
  }

  onEffectChange(id: number, effect: Effect): void {
    const b = Array.from([id, ...effect.serialize()])
    const device: Device = this.ensureDevice(id);
    device.currentEffectCode = effect.code;
    this.mqttService.publish(DevicesComponent.CONFIGURE_TOPIC, new Buffer(b)).subscribe(() => {
    });
  }

  private ensureDevice(id: number): Device {
    let device: Device | undefined = this.devices.get(id);
    if (device == undefined) {
      device = {id: id, name: this.storageService.get(`device-name-${id}`), pendingPings: 0};
      this.devices.set(id, device);
    }
    return device;
  }
}
