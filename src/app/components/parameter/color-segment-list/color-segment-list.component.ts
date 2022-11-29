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
    @Output() change: EventEmitter<void>;

    constructor() {
        this.change = new EventEmitter<void>();
        this.parameter = {} as ParameterColorSegmentList;
        this.device = {} as Device;
    }

    ngOnInit(): void {
        this.parameter.segments.push(new ParameterColorSegment("Red"));
    }

    onChange(): void {
        this.change.emit();
    }

    onRemove(segment: ParameterColorSegment): void {
        this.parameter.removeSegment(segment);
        this.change.emit();
    }

    onAddButtonClick(): void {
        this.parameter.segments.push(new ParameterColorSegment('Segment', 1));
        this.change.emit();
    }
}