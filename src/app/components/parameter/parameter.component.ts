import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EffectParameterType, Parameter} from "../../models/parameter.class";
import {ParameterColor} from "../../models/parameters/parameter-color.class";
import {ParameterNumber} from "../../models/parameters/parameter-number.class";
import {ParameterRange} from "../../models/parameters/parameter-range.class";
import {ParameterBoolean} from "../../models/parameters/parameter-boolean.class";
import {ParameterNumeralOption} from "../../models/parameters/parameter-numeral-option.class";
import {ParameterColorSegment} from "../../models/parameters/parameter-color-segment.class";
import {ParameterColorSegmentList} from "../../models/parameters/parameter-color-segment-list.class";
import {Device} from "../../models/device.class";
import {ParameterFireSegment} from "../../models/parameters/parameter-fire-segment.class";
import {ParameterFireSegmentList} from "../../models/parameters/parameter-fire-segment-list.class";

@Component({
	selector: 'app-parameter',
	templateUrl: './parameter.component.html',
	styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

	@Input() parameter: Parameter;
	@Input() device: Device;
	@Output() change: EventEmitter<void>;

	EffectParameterType = EffectParameterType;

	constructor() {
		this.change = new EventEmitter<void>();
		this.parameter = {} as Parameter;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	castToColor(): ParameterColor {
		return this.parameter as ParameterColor;
	}

	castToNumber(): ParameterNumber {
		return this.parameter as ParameterNumber;
	}

	castToRange(): ParameterRange {
		return this.parameter as ParameterRange;
	}

	castToBoolean(): ParameterBoolean {
		return this.parameter as ParameterBoolean;
	}

	castToNumeralOption(): ParameterNumeralOption {
		return this.parameter as ParameterNumeralOption;
	}

	castToColorSegment(): ParameterColorSegment {
		return this.parameter as ParameterColorSegment;
	}

	castToColorSegmentList(): ParameterColorSegmentList {
		return this.parameter as ParameterColorSegmentList;
	}

	castToFireSegment(): ParameterFireSegment {
		return this.parameter as ParameterFireSegment;
	}

	castToFireSegmentList(): ParameterFireSegmentList {
		return this.parameter as ParameterFireSegmentList;
	}

	onChange(): void {
		this.change.emit();
	}
}
