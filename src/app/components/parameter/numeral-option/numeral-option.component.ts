import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterNumeralOption} from "../../../models/parameters/parameter-numeral-option.class";

@Component({
  selector: 'app-numeral-option',
  templateUrl: './numeral-option.component.html',
  styleUrls: ['./numeral-option.component.scss']
})
export class NumeralOptionComponent implements OnInit {

  @Input() parameter: ParameterNumeralOption;
  @Output() change: EventEmitter<void>;

  constructor() {
    this.change = new EventEmitter<void>();
    this.parameter = {} as ParameterNumeralOption;
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.change.emit();
  }
}
