import {Component, OnInit} from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {Device} from "../../models/device.interface";
import {FireEffect} from "../../models/effects/fire-effect.class";
import {Builder, Effect, EffectCode} from "../../models/effect.class";
import {ColorEffect} from "../../models/effects/color-effect.class";
import {LocalStorageService} from "../../services/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {DeviceEditComponent} from "./edit/device-edit.component";
import {WaveEffect} from "../../models/effects/wave-effect.class";
import {ChaseEffect} from "../../models/effects/chase-effect.class";
import {SparkleEffect} from "../../models/effects/sparkle-effect.class";
import {ParameterNumber} from "../../models/parameters/parameter-number.class";
import {BreathingEffect} from "../../models/effects/breathing-effect.class";
import {ParameterBoolean} from "../../models/parameters/parameter-boolean.class";
import {RandomAccess} from "../../models/randomAccess.interface";

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
    Effect = Effect;
    maxAllowedPendingPings = DevicesComponent.MAX_ALLOWED_PENDING_PINGS;
    devices: Map<number, Device>;
    private presenceSubscription: Subscription;
    private descriptionSubscription: Subscription;
    private pongSubscription: Subscription;

    constructor(private mqttService: MqttService,
                private storageService: LocalStorageService,
                protected dialog: MatDialog) {
        this.devices = new Map<number, Device>();
        this.storageService.set('device-name-0', 'Office Window');
        this.storageService.set('device-name-1', 'Suite Window');
        this.storageService.set('device-name-2', 'Lucas Window');
        this.storageService.set('device-name-3', 'House Front');
        this.storageService.set('device-name-4', 'Lucas Desk');
        this.storageService.set('device-name-5', 'Davi Desk');
        this.storageService.set('device-name-6', 'Office Desk');
        this.storageService.set('device-name-7', 'Kitchen Top');
        this.storageService.set('device-name-8', 'Unknown');
        this.storageService.set('device-name-9', 'Test Device');

        this.mqttService.publish(DevicesComponent.DISCOVERY_TOPIC, '').subscribe(() => {
        });

        this.presenceSubscription = this.mqttService.observe(DevicesComponent.PRESENCE_TOPIC).subscribe((message: IMqttMessage) => {
            for (let i = 0; i < (message.payload.length || 0); i++) {
                console.log(i, ':', message.payload[i]);
            }
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();

            // TODO: remove it.
            if (id !== 9) {
                return;
            }
            const device: Device = this.retrieveOrCreateDevice(id);
            device.availableEffects = new Map<EffectCode, Effect>();
            const numAvailableEffect = randomAccess.readUnsignedInt();
            for (let i = 0; i < numAvailableEffect; i++) {
                const effectCode: number = randomAccess.readUnsignedInt();
                console.log(effectCode)
                const builder: Builder | undefined = Effect.registeredEffects.get(effectCode);
                console.log(builder)
                let effect = {} as Effect;
                if (builder != undefined) {
                    effect = builder();
                }
                device.availableEffects.set(effectCode, effect);
            }
            const sendRandomAccess = new RandomAccess(4);
            sendRandomAccess.writeUnsignedInt(device.id);
            this.mqttService.publish(DevicesComponent.DESCRIBE_TOPIC, sendRandomAccess.getBuffer()).subscribe(() => {
            });
        });

        // TODO: done.
        this.descriptionSubscription = this.mqttService.observe(DevicesComponent.DESCRIPTION_TOPIC).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();
            const device: Device = this.retrieveOrCreateDevice(id);
            device.deserialize(randomAccess);
        });

        // TODO: done.
        this.pongSubscription = this.mqttService.observe(DevicesComponent.PONG_TOPIC).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);

            // TODO: remove it.
            if (message.payload.length < 4) {
                return;
            }

            const id: number = randomAccess.readUnsignedInt();

            // TODO: remove it.
            if (id !== 9) {
                return;
            }
            const device: Device = this.retrieveOrCreateDevice(id);
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
        Effect.registerEffect(WaveEffect.CODE, WaveEffect.build);
        Effect.registerEffect(ChaseEffect.CODE, ChaseEffect.build);
        Effect.registerEffect(SparkleEffect.CODE, SparkleEffect.build);
        Effect.registerEffect(BreathingEffect.CODE, BreathingEffect.build);
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

    toggleDevice(device: Device): void {
        device.hidden = !device.hidden;
    }

    onDeviceConfigurationChange(device: Device): void {
        this.sendDeviceConfiguration(device);
    }

    onEffectChange(id: number, effect: Effect): void {
        const device: Device = this.retrieveOrCreateDevice(id);
        device.currentEffect = effect;
        this.sendDeviceConfiguration(device);
    }

    private sendDeviceConfiguration(device: Device): void {
        const randomAccess = new RandomAccess(device.getSerializationSize());
        device.serialize(randomAccess);
        console.log("DevicesComponent.CONFIGURE_TOPIC", randomAccess)
        this.mqttService.publish(DevicesComponent.CONFIGURE_TOPIC, randomAccess.getBuffer()).subscribe(() => {
        });
    }

    private retrieveOrCreateDevice(id: number): Device {
        let device: Device | undefined = this.devices.get(id);
        if (device == undefined) {
            device = new Device(
                id,
                new ParameterBoolean('On', true),
                new ParameterNumber('Brightness', Device.DEFAULT_BRIGHTNESS),
                this.storageService.get(`device-name-${id}`),
                0
            );
            this.devices.set(id, device);
        }
        return device;
    }
}
