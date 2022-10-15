import {EffectParameterType} from "../effect-parameter.class";
import {EffectParameterNumber} from "./effect-parameter-number.class";

export class EffectParameterRange extends EffectParameterNumber {
  private _min: number;
  private _max: number;
  private _step: number;

  constructor(name: string, value: number, min: number, max: number, step: number) {
    super(name, value);
    this._min = min;
    this._max = max;
    this._step = step;
    this.type = EffectParameterType.RANGE;
  }

  override serialize(): Array<number> {
    return super.serialize();
  }

  get min(): number {
    return this._min;
  }

  set min(value: number) {
    this._min = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }

  get step(): number {
    return this._step;
  }

  set step(value: number) {
    this._step = value;
  }
}
