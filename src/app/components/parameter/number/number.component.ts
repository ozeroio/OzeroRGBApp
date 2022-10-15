import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EffectParameterNumber} from "../../../models/parameters/effect-parameter-number.class";

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  @Input() parameter: EffectParameterNumber;
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
