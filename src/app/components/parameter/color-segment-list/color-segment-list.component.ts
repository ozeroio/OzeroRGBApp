import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterColorSegmentList} from "../../../models/parameters/parameter-color-segment-list.class";
import {ParameterColorSegment} from "../../../models/parameters/parameter-color-segment.class";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-color-segment-list',
	templateUrl: './color-segment-list.component.html',
	styleUrls: ['./color-segment-list.component.scss']
})
export class ColorSegmentListComponent implements OnInit {

	@Input() parameter: ParameterColorSegmentList;
	@Input() device: Device;
	@Output() valueChange: EventEmitter<void>;

	constructor() {
		this.valueChange = new EventEmitter<void>();
		this.parameter = {} as ParameterColorSegmentList;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		this.valueChange.emit();
	}

	onRemove(segment: ParameterColorSegment): void {
		this.parameter.removeSegment(segment);
		this.valueChange.emit();
	}

	onAddButtonClick(): void {
		this.addUnitSegment();
		this.valueChange.emit();
	}

	private addUnitSegment(): void {
		this.parameter.segments.push(new ParameterColorSegment('Segment', 1));
	}
}
