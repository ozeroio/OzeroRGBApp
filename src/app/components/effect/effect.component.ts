import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Effect} from "../../models/effect.class";
import {Parameter} from "../../models/parameter.class";
import {Device} from "../../models/device.class";
import {MatDialog} from "@angular/material/dialog";
import {DeviceService} from "../../services/device.service";
import {EffectReplicateComponent, ReplicationSelection} from "./replicate/effect-replicate.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
	selector: 'app-effect',
	templateUrl: './effect.component.html',
	styleUrls: ['./effect.component.scss']
})
export class EffectComponent implements OnInit {

	@Input() effect: Effect;

	// NOTE: Not ideal drill down this property, but some parameters
	//  require to know the device settings they are associated to.
	@Input() device: Device;
	@Output() valueChange: EventEmitter<Parameter>;

	constructor(private deviceService: DeviceService,
				private dialog: MatDialog,
				private snackBar: MatSnackBar) {
		this.valueChange = new EventEmitter<Parameter>();
		this.effect = {} as Effect;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	replicateEffect(): void {
		const dialogRef = this.dialog.open(EffectReplicateComponent, {
			data: {
				effect: this.effect,
				devices: this.deviceService.getSupportedDevices()
			},
			closeOnNavigation: true
		});
		const onSave = dialogRef.componentInstance.save.subscribe((selection: ReplicationSelection) => {
			this.deviceService.replicateEffectTo(this.effect, selection.devices);
			this.snackBar.open('Effect replicated.', 'OK', {
				duration: 3000
			});
			dialogRef.close();
		});
		const onCancel = dialogRef.componentInstance.cancel.subscribe(() => {
			dialogRef.close();
		});
	}

	onApplyClick(): void {
		this.valueChange.emit({} as Parameter);
	}

	onReplicateClick(): void {
		this.replicateEffect();
	}

	onParameterChange(parameter: Parameter): void {
		this.valueChange.emit(parameter);
	}
}
