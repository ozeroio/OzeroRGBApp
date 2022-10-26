import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Parameter, EffectParameterType} from "../../models/parameter.class";
import {ParameterColor} from "../../models/parameters/parameter-color.class";
import {ParameterNumber} from "../../models/parameters/parameter-number.class";
import {ParameterRange} from "../../models/parameters/parameter-range.class";
import {ParameterBoolean} from "../../models/parameters/parameter-bool.class";

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  @Input() parameter: Parameter;
  @Output() change: EventEmitter<void>;

  EffectParameterType = EffectParameterType;

  constructor() {
    this.change = new EventEmitter<void>();
    this.parameter = {} as Parameter;
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

  onChange(): void {
    this.change.emit();
  }
}
