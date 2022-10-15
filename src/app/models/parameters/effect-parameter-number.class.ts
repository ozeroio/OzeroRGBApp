import {EffectParameter, EffectParameterType} from "../effect-parameter.class";

export class EffectParameterNumber extends EffectParameter {

  private _value: number;

  constructor(name: string, value: number) {
    super(EffectParameterType.NUMBER, name);
    this._value = value;
  }

  override serialize(): Array<number> {
    return Array.from([this.value]);
  };

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
