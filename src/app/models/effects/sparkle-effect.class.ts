import {Effect, EffectCode} from "../effect.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {Color} from "../color.interface";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterBoolean} from "../parameters/parameter-bool.class";

export class SparkleEffect extends Effect {

  public static CODE: EffectCode = EffectCode.SPARKLE;
  public static NAME: string = 'sparkle';

  constructor() {
    const parameters = [
      new ParameterColor('Color', 255, 0, 0),
      new ParameterRange('Delay', 20, 0, 255, 1),
      new ParameterRange('Num LEDs', 1, 0, 255, 1),
      new ParameterBoolean('Randomize Color', 0),
    ];
    super(SparkleEffect.CODE, SparkleEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as ParameterColor).r = payload[0];
    (this.parameters[0] as ParameterColor).g = payload[1];
    (this.parameters[0] as ParameterColor).b = payload[2];
    (this.parameters[1] as ParameterRange).value = payload[3];
    (this.parameters[2] as ParameterRange).value = payload[4];
    (this.parameters[3] as ParameterBoolean).value = payload[5];
  }

  public static build(): Effect {
    return new SparkleEffect();
  }
}
