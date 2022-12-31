import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-edit',
	templateUrl: './device-edit.component.html',
	styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

	@Output() save: EventEmitter<Device>;
	@Output() cancel: EventEmitter<void>;
	name: string;
	device: Device;

	constructor(public dialogRef: MatDialogRef<DeviceEditComponent>,
	            @Inject(MAT_DIALOG_DATA) public data: { device: Device }) {
		this.device = data.device;
		this.name = data.device.name;
		this.save = new EventEmitter<Device>();
		this.cancel = new EventEmitter<void>();
	}

	ngOnInit(): void {
	}

	public onSaveButtonClick(): void {
		this.device.name = this.name;
		this.save.emit(this.device);
	}

	public onCancelButtonClick(): void {
		this.cancel.emit();
	}
}
