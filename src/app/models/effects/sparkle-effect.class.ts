import {Effect, EffectCode} from "../effect.class";
import {EffectParameterColor} from "../parameters/effect-parameter-color.class";
import {Color} from "../color.interface";
import {EffectParameterRange} from "../parameters/effect-parameter-range.class";
import {EffectParameterBoolean} from "../parameters/effect-parameter-bool.class";

export class SparkleEffect extends Effect {

  public static CODE: EffectCode = EffectCode.SPARKLE;
  public static NAME: string = 'sparkle';

  constructor() {
    const parameters = [
      new EffectParameterColor('Color', 255, 0, 0),
      new EffectParameterRange('Delay', 20, 0, 255, 1),
      new EffectParameterRange('Num LEDs', 1, 0, 255, 1),
      new EffectParameterBoolean('Randomize Color', 0),
    ];
    super(SparkleEffect.CODE, SparkleEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as EffectParameterColor).r = payload[0];
    (this.parameters[0] as EffectParameterColor).g = payload[1];
    (this.parameters[0] as EffectParameterColor).b = payload[2];
    (this.parameters[1] as EffectParameterRange).value = payload[3];
    (this.parameters[2] as EffectParameterRange).value = payload[4];
    (this.parameters[3] as EffectParameterBoolean).value = payload[5];
  }

  public static build(): Effect {
    return new SparkleEffect();
  }
}
