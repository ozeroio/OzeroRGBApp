import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterFireSegment} from "../../../models/parameters/parameter-fire-segment.class";
import {Device} from "../../../models/device.class";
import {FireEffect} from "../../../models/effects/fire-effect.class";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
	selector: 'app-fire-segment',
	templateUrl: './fire-segment.component.html',
	styleUrls: ['./fire-segment.component.scss']
})
export class FireSegmentComponent implements OnInit {

	@Input() parameter: ParameterFireSegment;
	@Input() device: Device;
	@Output() valueChange: EventEmitter<void>;
	@Output() remove: EventEmitter<void>;

	FireEffect = FireEffect;

	constructor(private snackBar: MatSnackBar) {
		this.valueChange = new EventEmitter<void>();
		this.remove = new EventEmitter<void>();
		this.parameter = {} as ParameterFireSegment;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		if (this.isSegmentValid()) {
			this.valueChange.emit();
		}
	}

	onRemove(): void {
		this.remove.emit();
	}

	private isSegmentValid(): boolean {
		if ((this.parameter.start + this.parameter.length) > this.device.numLeds) {
			this.snackBar.open('Configuration not sent! Start + length will exceed the device num of LEDs.', 'OK', {
				duration: 3000
			});
			return false;
		}
		return true;
	}
}
