import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EffectParameter, EffectParameterType} from "../../models/effect-parameter.class";
import {EffectParameterColor} from "../../models/parameters/effect-parameter-color.class";
import {EffectParameterNumber} from "../../models/parameters/effect-parameter-number.class";
import {EffectParameterRange} from "../../models/parameters/effect-parameter-range.class";

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  @Input() parameter: EffectParameter;
  EffectParameterType = EffectParameterType;
  @Output() change: EventEmitter<void>;

  constructor() {
    this.change = new EventEmitter<void>();
    this.parameter = {} as EffectParameter;
  }

  ngOnInit(): void {
  }

  castToColor(): EffectParameterColor {
    return this.parameter as EffectParameterColor;
  }

  castToNumber(): EffectParameterNumber {
    return this.parameter as EffectParameterNumber;
  }

  castToRange(): EffectParameterRange {
    return this.parameter as EffectParameterRange;
  }

  onChange(): void {
    this.change.emit();
  }
}
