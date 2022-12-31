import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterColorSegment} from "../../../models/parameters/parameter-color-segment.class";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-color-segment',
	templateUrl: './color-segment.component.html',
	styleUrls: ['./color-segment.component.scss']
})
export class ColorSegmentComponent implements OnInit {

	@Input() parameter: ParameterColorSegment;
	@Input() device: Device;
	@Output() change: EventEmitter<void>;
	@Output() remove: EventEmitter<void>;

	constructor() {
		this.change = new EventEmitter<void>();
		this.remove = new EventEmitter<void>();
		this.parameter = {} as ParameterColorSegment;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		this.change.emit();
	}

	onRemove(): void {
		this.remove.emit();
	}
}
