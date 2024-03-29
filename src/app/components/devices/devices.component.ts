import {Component, OnInit} from '@angular/core';
import {Device} from "../../models/device.class";
import {FireEffect} from "../../models/effects/fire-effect.class";
import {Effect} from "../../models/effect.class";
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
import {PresetSaveComponent, PresetSelection} from "../presets/save/preset-save.component";
import {ShiftEffect} from "../../models/effects/shift-effect.class";
import {DeviceService} from "../../services/device.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../app-routing.module";
import {MqttService} from "ngx-mqtt";

@Component({
	selector: 'app-devices',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

	Effect = Effect;
	maxAllowedPendingPings = DeviceService.MAX_ALLOWED_PENDING_PINGS;
	minSupportedVersion = environment.minRequiredFirmwareVersion;
	devices: Array<Device>;

	constructor(private mqttService: MqttService,
				private deviceService: DeviceService,
				private storageService: LocalStorageService,
				private presetService: PresetsService,
				private snackBar: MatSnackBar,
				protected dialog: MatDialog,
				private router: Router) {

		if (environment.mqtt.password === '') {
			this.snackBar.open('You must first authenticate.');
			this.router.navigate([APP_ROUTES.AUTHENTICATE]);
		}

		this.devices = [];

		this.storageService.set('device-name-0', 'Office Window');
		this.storageService.set('device-name-1', 'Suite Window');
		this.storageService.set('device-name-2', 'Lucas Window');
		this.storageService.set('device-name-3', 'House Front');
		this.storageService.set('device-name-4', 'Lucas Desk');
		this.storageService.set('device-name-5', 'Davi Desk');
		this.storageService.set('device-name-6', 'Office Desk');
		this.storageService.set('device-name-7', 'Kitchen Top');
		this.storageService.set('device-name-8', 'Davi Window');
		this.storageService.set('device-name-9', 'Davi Closet');
		this.storageService.set('device-name-10', 'Living Room Window');
		this.storageService.set('device-name-255', 'Test Device');

		Effect.registerEffect(FireEffect.CODE, FireEffect.build);
		Effect.registerEffect(ColorEffect.CODE, ColorEffect.build);
		Effect.registerEffect(WaveEffect.CODE, WaveEffect.build);
		Effect.registerEffect(ChaseEffect.CODE, ChaseEffect.build);
		Effect.registerEffect(SparkleEffect.CODE, SparkleEffect.build);
		Effect.registerEffect(BreathingEffect.CODE, BreathingEffect.build);
		Effect.registerEffect(ShiftEffect.CODE, ShiftEffect.build);
	}

	ngOnInit(): void {
		this.devices = this.sortById(this.deviceService.getDevices());
		this.deviceService.observeChangeDevice().subscribe((devices: Array<Device>) => {
			this.devices = this.sortById(devices);
		});
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
		const dialogRef = this.dialog.open(PresetSaveComponent, {
			data: {
				devices: this.deviceService.getSupportedDevices()
			},
			closeOnNavigation: true
		});
		const onSave = dialogRef.componentInstance.save.subscribe((selection: PresetSelection) => {
			const data: Array<PresetEntry> = selection.devices.map((device: Device) => {
				const randomAccess = new RandomAccess(device.getSerializationSize())
				device.serialize(randomAccess);
				const entry: PresetEntry = {
					deviceName: device.name,
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
		this.deviceService.sendDeviceConfiguration(device);
		this.showSnack();
	}

	onEffectChange(id: number, effect: Effect): void {
		this.deviceService.updateEffect(id, effect);
		this.showSnack();
	}

	private showSnack(): void {
		this.snackBar.open('Configuration sent to device(s).', 'OK', {
			duration: 3000
		});
	}

	private sortById(devices: Array<Device>): Array<Device> {
		return devices.sort((a, b) => b.id - a.id);
	}
}
