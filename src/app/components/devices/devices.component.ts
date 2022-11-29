import {Component, OnInit} from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {Device} from "../../models/device.class";
import {FireEffect} from "../../models/effects/fire-effect.class";
import {Builder, Effect, EffectCode} from "../../models/effect.class";
import {ColorEffect} from "../../models/effects/color-effect.class";
import {LocalStorageService} from "../../services/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {DeviceEditComponent} from "./edit/device-edit.component";
import {WaveEffect} from "../../models/effects/wave-effect.class";
import {ChaseEffect} from "../../models/effects/chase-effect.class";
import {SparkleEffect} from "../../models/effects/sparkle-effect.class";
import {BreathingEffect} from "../../models/effects/breathing-effect.class";
import {RandomAccess} from "../../models/randomAccess.interface";
import {PresetEntry, PresetsService} from "../../services/presets.service";
import {environment} from "../../../environments/environment";
import {PresetEditComponent, PresetSelection} from "../presets/edit/preset-edit.component";
import {RainbowEffect} from "../../models/effects/rainbow-effect.class";

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

    private static COMM_TOPIC_DISCOVERY: string = 'device/discovery';
    private static COMM_TOPIC_PRESENCE: string = 'device/presence';
    private static COMM_TOPIC_CONFIGURE: string = 'device/configure';
    private static COMM_TOPIC_DESCRIPTION: string = 'device/description';
    private static COMM_TOPIC_DESCRIBE: string = 'device/describe';
    private static COMM_TOPIC_REQ_VERSION: string = 'device/req/version';
    private static COMM_TOPIC_RES_VERSION: string = 'device/res/version';
    private static COMM_TOPIC_PING: string = 'device/ping';
    private static COMM_TOPIC_PONG: string = 'device/pong';

    private static PING_TIMEOUT: number = 5000;
    private static MAX_ALLOWED_PENDING_PINGS: number = 3;
    Effect = Effect;
    maxAllowedPendingPings = DevicesComponent.MAX_ALLOWED_PENDING_PINGS;
    minSupportedVersion = environment.minRequiredFirmwareVersion;
    devices: Array<Device>;
    private presenceSubscription: Subscription;
    private versionSubscription: Subscription;
    private descriptionSubscription: Subscription;
    private pongSubscription: Subscription;

    constructor(private mqttService: MqttService,
                private storageService: LocalStorageService,
                private presetService: PresetsService,
                protected dialog: MatDialog) {
        this.devices = new Array<Device>();
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

        this.mqttService.publish(DevicesComponent.COMM_TOPIC_DISCOVERY, '').subscribe(() => {
        });

        this.presenceSubscription = this.mqttService.observe(DevicesComponent.COMM_TOPIC_PRESENCE).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();

            const device: Device = this.retrieveOrCreateDevice(id);
            device.availableEffects = new Map<EffectCode, Effect>();
            device.numLeds = randomAccess.readUnsignedInt();
            const numAvailableEffect = randomAccess.readUnsignedInt();
            for (let i = 0; i < numAvailableEffect; i++) {
                const effectCode: number = randomAccess.readUnsignedInt();
                const builder: Builder | undefined = Effect.registeredEffects.get(effectCode);
                let effect = {} as Effect;
                if (builder != undefined) {
                    effect = builder();
                }
                device.availableEffects.set(effectCode, effect);
            }
            const sendRandomAccess = new RandomAccess(4);
            sendRandomAccess.writeUnsignedInt(device.id);
            this.mqttService.publish(DevicesComponent.COMM_TOPIC_REQ_VERSION, sendRandomAccess.getBuffer()).subscribe(() => {
            });
        });

        this.versionSubscription = this.mqttService.observe(DevicesComponent.COMM_TOPIC_RES_VERSION).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();
            const device: Device = this.retrieveOrCreateDevice(id);
            device.version.deserialize(randomAccess);
            device.checkSupportedVersion();
            const sendRandomAccess = new RandomAccess(4);
            sendRandomAccess.writeUnsignedInt(device.id);
            this.mqttService.publish(DevicesComponent.COMM_TOPIC_DESCRIBE, sendRandomAccess.getBuffer()).subscribe(() => {
            });
        });

        this.descriptionSubscription = this.mqttService.observe(DevicesComponent.COMM_TOPIC_DESCRIPTION).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();
            const device: Device = this.retrieveOrCreateDevice(id);
            device.deserialize(randomAccess);
        });

        this.pongSubscription = this.mqttService.observe(DevicesComponent.COMM_TOPIC_PONG).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();
            const device: Device = this.retrieveOrCreateDevice(id);
            device.pendingPings = 0;
        });

        setInterval(() => {
            this.devices.filter(d => d.pendingPings >= DevicesComponent.MAX_ALLOWED_PENDING_PINGS).map(device => {
                this.removeDevice(device);
            });
            this.devices.map(d => {
                d.pendingPings++;
            })
            this.mqttService.publish(DevicesComponent.COMM_TOPIC_PING, '').subscribe(() => {
            });
        }, DevicesComponent.PING_TIMEOUT);

        Effect.registerEffect(FireEffect.CODE, FireEffect.build);
        Effect.registerEffect(ColorEffect.CODE, ColorEffect.build);
        Effect.registerEffect(WaveEffect.CODE, WaveEffect.build);
        Effect.registerEffect(ChaseEffect.CODE, ChaseEffect.build);
        Effect.registerEffect(SparkleEffect.CODE, SparkleEffect.build);
        Effect.registerEffect(BreathingEffect.CODE, BreathingEffect.build);
        Effect.registerEffect(RainbowEffect.CODE, RainbowEffect.build);
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

    addToPreset(): void {
        const dialogRef = this.dialog.open(PresetEditComponent, {
            data: {
                devices: this.devices.filter(d => d.supported)
            },
            closeOnNavigation: true
        });
        const onSave = dialogRef.componentInstance.save.subscribe((selection: PresetSelection) => {
            const data: Array<PresetEntry> = selection.devices.map(d => {
                const randomAccess = new RandomAccess(d.getSerializationSize())
                d.serialize(randomAccess);
                const entry: PresetEntry = {
                    deviceName: d.name,
                    configuration: Array.from(randomAccess.getBuffer())
                };
                return entry;
            });
            this.presetService.addPreset(selection.name, data);
            dialogRef.close();
        });
        const onCancel = dialogRef.componentInstance.cancel.subscribe(() => {
            dialogRef.close();
        });
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
        this.mqttService.publish(DevicesComponent.COMM_TOPIC_CONFIGURE, randomAccess.getBuffer()).subscribe(() => {
        });
    }

    private findDeviceIndex(device: Device): number {
        return this.devices.findIndex(d => d.id === device.id);
    }

    private findDeviceById(id: number): Device | undefined {
        const index = this.findDeviceIndex({id} as Device);
        if (index === -1) {
            return undefined;
        }
        return this.devices[index];
    }

    private isDevicePresent(device: Device): boolean {
        return this.findDeviceIndex(device) > -1;
    }

    private removeDevice(device: Device): void {
        const index = this.findDeviceIndex(device);
        if (index > -1) {
            this.devices.splice(index, 1);
        }
    }

    private addDevice(device: Device): void {
        if (!this.isDevicePresent(device)) {
            this.devices.push(device);
        }
    }

    private retrieveOrCreateDevice(id: number): Device {
        let device = this.findDeviceById(id);
        if (device == undefined) {
            device = new Device(id, this.storageService.get(`device-name-${id}`));
            this.addDevice(device);
        }
        return device;
    }
}
