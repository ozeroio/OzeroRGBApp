import {Injectable} from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {RandomAccess} from "../models/randomAccess.interface";
import {Device} from "../models/device.class";
import {Builder, Effect, EffectCode} from "../models/effect.class";
import {Subscription} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

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
    static MAX_ALLOWED_PENDING_PINGS: number = 3;

    private presenceSubscription: Subscription;
    private versionSubscription: Subscription;
    private descriptionSubscription: Subscription;
    private pongSubscription: Subscription;
    private readonly devices: Array<Device>;

    constructor(private mqttService: MqttService,
                private storageService: LocalStorageService) {

        this.devices = new Array<Device>();

        this.mqttService.publish(DeviceService.COMM_TOPIC_DISCOVERY, '').subscribe(() => {
        });

        this.presenceSubscription = this.mqttService.observe(DeviceService.COMM_TOPIC_PRESENCE).subscribe((message: IMqttMessage) => {
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
            this.mqttService.publish(DeviceService.COMM_TOPIC_REQ_VERSION, sendRandomAccess.getBuffer()).subscribe(() => {
            });
        });

        this.versionSubscription = this.mqttService.observe(DeviceService.COMM_TOPIC_RES_VERSION).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();
            const device: Device = this.retrieveOrCreateDevice(id);
            device.version.deserialize(randomAccess);
            device.checkSupportedVersion();
            const sendRandomAccess = new RandomAccess(4);
            sendRandomAccess.writeUnsignedInt(device.id);
            this.mqttService.publish(DeviceService.COMM_TOPIC_DESCRIBE, sendRandomAccess.getBuffer()).subscribe(() => {
            });
        });

        this.descriptionSubscription = this.mqttService.observe(DeviceService.COMM_TOPIC_DESCRIPTION).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();
            const device: Device = this.retrieveOrCreateDevice(id);
            device.deserialize(randomAccess);
        });

        this.pongSubscription = this.mqttService.observe(DeviceService.COMM_TOPIC_PONG).subscribe((message: IMqttMessage) => {
            const randomAccess = RandomAccess.createFrom(message.payload);
            const id: number = randomAccess.readUnsignedInt();
            const device: Device = this.retrieveOrCreateDevice(id);
            device.pendingPings = 0;
        });

        setInterval(() => {
            this.devices.filter(d => d.pendingPings >= DeviceService.MAX_ALLOWED_PENDING_PINGS).map(device => {
                this.removeDevice(device);
            });
            this.devices.map(d => {
                d.pendingPings++;
            })
            this.mqttService.publish(DeviceService.COMM_TOPIC_PING, '').subscribe(() => {
            });
        }, DeviceService.PING_TIMEOUT);
    }

    getDevices(): Array<Device> {
        return this.devices;
    }

    getSupportedDevices(): Array<Device> {
        return this.devices.filter(value => value.supported);
    }

    sendDeviceConfiguration(device: Device): void {
        const randomAccess = new RandomAccess(device.getSerializationSize());
        device.serialize(randomAccess);
        this.mqttService.publish(DeviceService.COMM_TOPIC_CONFIGURE, randomAccess.getBuffer()).subscribe(() => {
        });
    }

    updateEffect(id: number, effect: Effect): void {
        const device: Device = this.retrieveOrCreateDevice(id);
        device.currentEffect = effect;
        this.sendDeviceConfiguration(device);
    }

    private retrieveOrCreateDevice(id: number): Device {
        let device = this.findDeviceById(id);
        if (device == undefined) {
            device = new Device(id, this.storageService.get(`device-name-${id}`));
            this.addDevice(device);
        }
        return device;
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
}
