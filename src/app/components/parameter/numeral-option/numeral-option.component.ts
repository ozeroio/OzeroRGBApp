import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterNumeralOption} from "../../../models/parameters/parameter-numeral-option.class";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-numeral-option',
	templateUrl: './numeral-option.component.html',
	styleUrls: ['./numeral-option.component.scss']
})
export class NumeralOptionComponent implements OnInit {

	@Input() parameter: ParameterNumeralOption;
	@Input() device: Device;
	@Output() valueChange: EventEmitter<void>;

	constructor() {
		this.valueChange = new EventEmitter<void>();
		this.parameter = {} as ParameterNumeralOption;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		this.valueChange.emit();
	}
}
