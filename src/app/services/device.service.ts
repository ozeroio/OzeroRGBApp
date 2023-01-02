import {Injectable} from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {RandomAccess} from "../models/randomAccess.interface";
import {Device} from "../models/device.class";
import {Builder, Effect, EffectCode} from "../models/effect.class";
import {Observable, Subject, Subscription} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {Buffer} from "buffer";

@Injectable({
	providedIn: 'root'
})
export class DeviceService {

	static MAX_ALLOWED_PENDING_PINGS: number = 3;
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
	private readonly presenceSubscription: Subscription;
	private readonly versionSubscription: Subscription;
	private readonly descriptionSubscription: Subscription;
	private readonly pongSubscription: Subscription;
	private readonly devices: Array<Device>;
	private readonly deviceAddSubject: Subject<Device>;
	private readonly deviceRemoveSubject: Subject<Device>;
	private readonly devicesChangeSubject: Subject<Array<Device>>;
	private readonly deviceEffectReplicatedSubject: Subject<Device>;

	constructor(private mqttService: MqttService,
				private storageService: LocalStorageService) {

		this.devices = new Array<Device>();
		this.deviceAddSubject = new Subject<Device>();
		this.deviceRemoveSubject = new Subject<Device>();
		this.devicesChangeSubject = new Subject<Array<Device>>();
		this.deviceEffectReplicatedSubject = new Subject<Device>();

		this.discoverDevices();

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

	observeAddDevice(): Observable<Device> {
		return this.deviceAddSubject.asObservable();
	}

	observeRemoveDevice(): Observable<Device> {
		return this.deviceRemoveSubject.asObservable();
	}

	observeChangeDevice(): Observable<Array<Device>> {
		return this.devicesChangeSubject.asObservable();
	}

	observeDeviceEffectReplicate(): Observable<Device> {
		return this.deviceEffectReplicatedSubject.asObservable();
	}

	// Use observeChangeDevice ib case of repeatedly request.
	getDevices(): Array<Device> {
		return this.devices;
	}

	getSupportedDevices(): Array<Device> {
		return this.devices.filter(value => value.supported);
	}

	sendDeviceConfiguration(device: Device): void {
		const randomAccess = new RandomAccess(device.getSerializationSize());
		device.serialize(randomAccess);
		this.sendConfiguration(randomAccess.getBuffer());
	}

	sendConfiguration(buffer: Buffer): void {
		this.mqttService.publish(DeviceService.COMM_TOPIC_CONFIGURE, buffer).subscribe(() => {
		});
	}

	updateEffect(id: number, effect: Effect): void {
		const device: Device = this.retrieveOrCreateDevice(id);
		device.currentEffect = effect;
		this.sendDeviceConfiguration(device);
	}

	replicateEffectTo(effect: Effect, devices: Array<Device>): void {
		const randomAccess: RandomAccess = new RandomAccess(effect.getSerializationSize());
		effect.serialize(randomAccess);
		devices.forEach((device: Device) => {
			const itsOwnEffect = device.availableEffects?.get(effect.code);
			if (itsOwnEffect !== undefined) {
				randomAccess.reset();
				itsOwnEffect.deserialize(randomAccess);
				this.updateEffect(device.id, itsOwnEffect);
				this.deviceEffectReplicatedSubject.next(device);
			}
		});
	}

	discoverDevices(): void {
		this.mqttService.publish(DeviceService.COMM_TOPIC_DISCOVERY, '').subscribe(() => {
		});
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
			this.deviceRemoveSubject.next(device);
			this.devicesChangeSubject.next(this.devices);
		}
	}

	private addDevice(device: Device): void {
		if (!this.isDevicePresent(device)) {
			this.devices.push(device);
			this.deviceAddSubject.next(device);
			this.devicesChangeSubject.next(this.devices);
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
