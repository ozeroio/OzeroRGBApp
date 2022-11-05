import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Effect} from "../../models/effect.class";
import {Parameter} from "../../models/parameter.class";

@Component({
    selector: 'app-effect',
    templateUrl: './effect.component.html',
    styleUrls: ['./effect.component.scss']
})
export class EffectComponent implements OnInit {

    @Input() effect: Effect;
    @Output() change: EventEmitter<Parameter>;

    parameters: Array<Parameter>;

    constructor() {
        this.change = new EventEmitter<Parameter>();
        this.effect = {} as Effect;
        this.parameters = [];
    }

    onApplyClick(): void {
        this.change.emit({} as Parameter);
    }

    onParameterChange(parameter: Parameter): void {
        this.change.emit(parameter);
    }

    ngOnInit(): void {
        this.parameters = Array.from(this.effect.parameters.values());
    }
}
