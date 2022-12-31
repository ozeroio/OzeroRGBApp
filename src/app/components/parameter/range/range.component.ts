import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterRange} from "../../../models/parameters/parameter-range.class";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-range',
	templateUrl: './range.component.html',
	styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

	@Input() parameter: ParameterRange;
	@Input() device: Device;
	@Output() change: EventEmitter<void>;

	constructor() {
		this.change = new EventEmitter<void>();
		this.parameter = {} as ParameterRange;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		this.change.emit();
	}
}
