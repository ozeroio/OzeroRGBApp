import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterColor} from "../parameters/parameter-color.class";

export class FireEffect extends Effect {

  public static CODE: EffectCode = EffectCode.FIRE;
  public static NAME: string = 'fire';

  constructor() {
    const parameters = [
      new ParameterRange('Sparking', 60, 0, 255, 1),
      new ParameterRange('Cooling', 80, 0, 255, 1),
      new ParameterRange('Delay', 20, 0, 255, 1),
      new ParameterRange('Spark Level', 7, 1, 16, 1),
    ];
    super(FireEffect.CODE, FireEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as ParameterRange).value = payload[0];
    (this.parameters[1] as ParameterRange).value = payload[1];
    (this.parameters[2] as ParameterRange).value = payload[2];
    (this.parameters[3] as ParameterRange).value = payload[3];
  }

  public static build(): Effect {
    return new FireEffect();
  }
}
