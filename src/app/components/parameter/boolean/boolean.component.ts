import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterBoolean} from "../../../models/parameters/parameter-boolean.class";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-boolean',
	templateUrl: './boolean.component.html',
	styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

	@Input() parameter: ParameterBoolean;
	@Input() device: Device;
	@Output() valueChange: EventEmitter<void>;

	constructor() {
		this.valueChange = new EventEmitter<void>();
		this.parameter = {} as ParameterBoolean;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		this.valueChange.emit();
	}
}
