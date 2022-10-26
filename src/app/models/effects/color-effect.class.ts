import {Effect, EffectCode} from "../effect.class";
import {EffectParameterColor} from "../parameters/effect-parameter-color.class";
import {Color} from "../color.interface";
import {EffectParameterRange} from "../parameters/effect-parameter-range.class";

export class ColorEffect extends Effect {

  public static CODE: EffectCode = EffectCode.COLOR;
  public static NAME: string = 'color';

  constructor() {
    const parameters = [
      new EffectParameterColor('Color', 255, 0, 0)
    ];
    super(ColorEffect.CODE, ColorEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as EffectParameterColor).r = payload[0];
    (this.parameters[0] as EffectParameterColor).g = payload[1];
    (this.parameters[0] as EffectParameterColor).b = payload[2];
  }

  public static build(): Effect {
    return new ColorEffect();
  }
}
