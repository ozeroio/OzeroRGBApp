import {Effect, EffectCode} from "../effect.class";
import {EffectParameterRange} from "../parameters/effect-parameter-range.class";
import {EffectParameterColor} from "../parameters/effect-parameter-color.class";
import {EffectParameterBoolean} from "../parameters/effect-parameter-bool.class";

export class WaveEffect extends Effect {

  public static CODE: EffectCode = EffectCode.WAVE;
  public static NAME: string = 'wave';

  constructor() {
    const parameters = [
      new EffectParameterColor('Color', 255, 0, 0),
      new EffectParameterRange('Delay', 20, 0, 255, 1),
      new EffectParameterBoolean('Invert Direction', 0)
    ];
    super(WaveEffect.CODE, WaveEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as EffectParameterColor).r = payload[0];
    (this.parameters[0] as EffectParameterColor).g = payload[1];
    (this.parameters[0] as EffectParameterColor).b = payload[2];
    (this.parameters[1] as EffectParameterRange).value = payload[3];
    (this.parameters[2] as EffectParameterBoolean).value = payload[4];
  }

  public static build(): Effect {
    return new WaveEffect();
  }
}
