import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterNumber} from "../../../models/parameters/parameter-number.class";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-number',
	templateUrl: './number.component.html',
	styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

	@Input() parameter: ParameterNumber;
	@Input() device: Device;
	@Output() valueChange: EventEmitter<void>;

	constructor() {
		this.valueChange = new EventEmitter<void>();
		this.parameter = {} as ParameterNumber;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		this.valueChange.emit();
	}
}
