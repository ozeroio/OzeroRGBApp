import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Effect} from "../../../models/effect.class";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-replicate',
	templateUrl: './effect-replicate.component.html',
	styleUrls: ['./effect-replicate.component.scss']
})
export class EffectReplicateComponent implements OnInit {

	@Output() save: EventEmitter<ReplicationSelection>;
	@Output() cancel: EventEmitter<void>;
	effect: Effect;
	devices: Array<Device>;
	chosenDevices: Array<Device>;

	constructor(public dialogRef: MatDialogRef<EffectReplicateComponent>,
	            @Inject(MAT_DIALOG_DATA) public data: ReplicationSelection) {
		this.effect = data.effect;
		this.devices = data.devices;
		this.save = new EventEmitter<ReplicationSelection>();
		this.cancel = new EventEmitter<void>();
		this.chosenDevices = new Array<Device>();
	}

	ngOnInit(): void {
	}

	public onSaveButtonClick(): void {
		const selections: ReplicationSelection = {
			effect: this.effect,
			devices: this.chosenDevices
		}
		this.save.emit(selections);
	}

	public onCancelButtonClick(): void {
		this.cancel.emit();
	}
}

export interface ReplicationSelection {
	effect: Effect,
	devices: Array<Device>
}
