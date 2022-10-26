import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Effect} from "../../models/effect.class";
import {EffectParameter} from "../../models/effect-parameter.class";

@Component({
  selector: 'app-effect',
  templateUrl: './effect.component.html',
  styleUrls: ['./effect.component.scss']
})
export class EffectComponent implements OnInit {

  @Input() effect: Effect;
  @Output() change: EventEmitter<EffectParameter>;

  parameters: Array<EffectParameter>;

  constructor() {
    this.change = new EventEmitter<EffectParameter>();
    this.effect = {} as Effect;
    this.parameters = [];
  }

  onApplyClick(): void {
    this.change.emit({} as EffectParameter);
  }

  onParameterChange(parameter: EffectParameter): void {
    this.change.emit(parameter);
  }

  ngOnInit(): void {
    this.parameters = Array.from(this.effect.parameters.values());
  }
}
