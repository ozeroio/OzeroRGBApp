import {Effect, EffectCode} from "../effect.class";
import {EffectParameterRange} from "../parameters/effect-parameter-range.class";
import {EffectParameterColor} from "../parameters/effect-parameter-color.class";

export class FireEffect extends Effect {

  public static CODE: EffectCode = EffectCode.FIRE;
  public static NAME: string = 'fire';

  constructor() {
    const parameters = [
      new EffectParameterRange('Sparking', 60, 0, 255, 1),
      new EffectParameterRange('Cooling', 80, 0, 255, 1),
      new EffectParameterRange('Speed', 20, 0, 50, 1),
      new EffectParameterRange('Spark Level', 7, 1, 16, 1),
    ];
    super(FireEffect.CODE, FireEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as EffectParameterRange).value = payload[0];
    (this.parameters[1] as EffectParameterRange).value = payload[1];
    (this.parameters[2] as EffectParameterRange).value = payload[2];
    (this.parameters[3] as EffectParameterRange).value = payload[3];
  }

  public static build(): Effect {
    return new FireEffect();
  }
}
