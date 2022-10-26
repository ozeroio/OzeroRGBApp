import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EffectParameterNumber} from "../../../models/parameters/effect-parameter-number.class";
import {EffectParameterBoolean} from "../../../models/parameters/effect-parameter-bool.class";

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

  @Input() parameter: EffectParameterBoolean;
  @Output() change: EventEmitter<void>;

  constructor() {
    this.change = new EventEmitter<void>();
    this.parameter = {} as EffectParameterNumber;
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.change.emit();
  }
}
