import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterNumber} from "../../../models/parameters/parameter-number.class";
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
    @Output() change: EventEmitter<void>;

    constructor() {
        this.change = new EventEmitter<void>();
        this.parameter = {} as ParameterBoolean;
        this.device = {} as Device;
    }

    ngOnInit(): void {
    }

    onChange(e: MouseEvent): void {
        this.change.emit();
    }
}
