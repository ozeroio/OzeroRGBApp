import {EffectParameterType} from "../effect-parameter.class";
import {EffectParameterNumber} from "./effect-parameter-number.class";

export class EffectParameterBoolean extends EffectParameterNumber {

  constructor(name: string, value: number) {
    super(name, value);
    this.type = EffectParameterType.BOOLEAN;
  }

  override serialize(): Array<number> {
    return Array.from([this.value ? 1 : 0]);
  }
}
