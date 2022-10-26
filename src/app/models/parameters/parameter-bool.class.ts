import {EffectParameterType} from "../parameter.class";
import {ParameterNumber} from "./parameter-number.class";

export class ParameterBoolean extends ParameterNumber {

  constructor(name: string, value: number) {
    super(name, value);
    this.type = EffectParameterType.BOOLEAN;
  }

  override serialize(): Array<number> {
    return Array.from([this.value ? 1 : 0]);
  }
}
