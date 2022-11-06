import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterNumber} from "../../../models/parameters/parameter-number.class";
import {ParameterBoolean} from "../../../models/parameters/parameter-boolean.class";

@Component({
    selector: 'app-boolean',
    templateUrl: './boolean.component.html',
    styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

    @Input() parameter: ParameterBoolean;
    @Output() change: EventEmitter<void>;

    constructor() {
        this.change = new EventEmitter<void>();
        this.parameter = {} as ParameterBoolean;
    }

    ngOnInit(): void {
    }

    onChange(e: MouseEvent): void {
        console.log(this.parameter)
        this.change.emit();
    }
}
