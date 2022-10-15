import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EffectParameterRange} from "../../../models/parameters/effect-parameter-range.class";

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  @Input() parameter: EffectParameterRange;
  @Output() change: EventEmitter<void>;

  constructor() {
    this.change = new EventEmitter<void>();
    this.parameter = {} as EffectParameterRange;
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.change.emit();
  }
}
