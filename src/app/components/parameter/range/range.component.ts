import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterRange} from "../../../models/parameters/parameter-range.class";

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  @Input() parameter: ParameterRange;
  @Output() change: EventEmitter<void>;

  constructor() {
    this.change = new EventEmitter<void>();
    this.parameter = {} as ParameterRange;
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.change.emit();
  }
}
