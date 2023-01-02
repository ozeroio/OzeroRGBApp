import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterFireSegmentList} from "../../../models/parameters/parameter-fire-segment-list.class";
import {ParameterFireSegment} from "../../../models/parameters/parameter-fire-segment.class";
import {Device} from "../../../models/device.class";
import {FireEffect} from "../../../models/effects/fire-effect.class";

@Component({
	selector: 'app-fire-segment-list',
	templateUrl: './fire-segment-list.component.html',
	styleUrls: ['./fire-segment-list.component.scss']
})
export class FireSegmentListComponent implements OnInit {

	@Input() parameter: ParameterFireSegmentList;
	@Input() device: Device;
	@Output() change: EventEmitter<void>;

	FireEffect = FireEffect;

	constructor() {
		this.change = new EventEmitter<void>();
		this.parameter = {} as ParameterFireSegmentList;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onChange(): void {
		this.change.emit();
	}

	onRemove(segment: ParameterFireSegment): void {
		this.parameter.removeSegment(segment);
		this.change.emit();
	}

	onAddButtonClick(): void {
		this.addEmptySegment();
	}

	private addEmptySegment(): void {
		if (this.parameter.segments.length < FireEffect.FIRE_MAX_NUM_SEGMENTS) {
			this.parameter.segments.push(new ParameterFireSegment('Fire segment',
				0,
				FireEffect.FIRE_MIN_SEGMENT_SIZE,
				0,
				FireEffect.DEFAULT_SPARKING,
				FireEffect.DEFAULT_COOLING,
				3));
			this.change.emit();
		}
	}
}
