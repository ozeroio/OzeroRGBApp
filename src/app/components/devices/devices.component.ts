import {Component, OnInit} from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {Device} from "../../models/device.class";
import {FireEffect} from "../../models/effects/fire-effect.class";
import {SemVer} from "../../models/semver.class";
import {Builder, Effect, EffectCode} from "../../models/effect.class";
import {ColorEffect} from "../../models/effects/color-effect.class";
import {LocalStorageService} from "../../services/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {DeviceEditComponent} from "./edit/device-edit.component";
import {WaveEffect} from "../../models/effects/wave-effect.class";
import {ChaseEffect} from "../../models/effects/chase-effect.class";
import {SparkleEffect} from "../../models/effects/sparkle-effect.class";
import {NumberSize, ParameterNumber} from "../../models/parameters/parameter-number.class";
import {BreathingEffect} from "../../models/effects/breathing-effect.class";
import {ParameterBoolean} from "../../models/parameters/parameter-boolean.class";
import {RandomAccess} from "../../models/randomAccess.interface";
import {BookmarkEntry, BookmarksService} from "../../services/bookmarks.service";

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
    devices: Map<number, Device>;
    private presenceSubscription: Subscription;
    private versionSubscription: Subscription;
    private descriptionSubscription: Subscription;
    private pongSubscription: Subscription;

    constructor(private mqttService: MqttService,
                private storageService: LocalStorageService,
                private bookmarksService: BookmarksService,
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

        this.mqttService.publish(DevicesComponent.COMM_TOPIC_DISCOVERY, '').subscribe(() => {
        });

        this.presenceSubscription = this.mqttService.observe(DevicesComponent.COMM_TOPIC_PRESENCE).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();

            const device: Device = this.retrieveOrCreateDevice(id);
            device.availableEffects = new Map<EffectCode, Effect>();
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
            Array.from(this.devices.values()).filter(d => d.pendingPings > DevicesComponent.MAX_ALLOWED_PENDING_PINGS).map(d => this.devices.delete(d.id));
            Array.from(this.devices.values()).map(d => {
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

    addToBookmarks(): void {
        const data: Array<BookmarkEntry> =  Array.from(this.devices.values()).filter(d => d.supported).map(d => {
            const randomAccess = new RandomAccess(d.getSerializationSize())
            d.serialize(randomAccess);
            const entry: BookmarkEntry = {
                deviceName: d.name,
                configuration: {
                    data: Array.from(randomAccess.getBuffer())                }
            };
            return entry;
        });

        this.bookmarksService.addBookmark("Christmas", data);
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

    private retrieveOrCreateDevice(id: number): Device {
        let device: Device | undefined = this.devices.get(id);
        if (device == undefined) {
            device = new Device(
                id,
                new ParameterBoolean('On', true),
                new SemVer(),
                new ParameterNumber('Brightness', Device.DEFAULT_BRIGHTNESS, NumberSize.U8),
                this.storageService.get(`device-name-${id}`),
                0
            );
            this.devices.set(id, device);
        }
        return device;
    }
}
