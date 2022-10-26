import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {ParameterBoolean} from "../parameters/parameter-bool.class";

export class WaveEffect extends Effect {

  public static CODE: EffectCode = EffectCode.WAVE;
  public static NAME: string = 'wave';

  constructor() {
    const parameters = [
      new ParameterColor('Color', 255, 0, 0),
      new ParameterRange('Delay', 20, 0, 255, 1),
      new ParameterBoolean('Invert Direction', 0)
    ];
    super(WaveEffect.CODE, WaveEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as ParameterColor).r = payload[0];
    (this.parameters[0] as ParameterColor).g = payload[1];
    (this.parameters[0] as ParameterColor).b = payload[2];
    (this.parameters[1] as ParameterRange).value = payload[3];
    (this.parameters[2] as ParameterBoolean).value = payload[4];
  }

  public static build(): Effect {
    return new WaveEffect();
  }
}
