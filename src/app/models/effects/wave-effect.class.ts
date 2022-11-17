import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {ParameterBoolean} from "../parameters/parameter-boolean.class";

export class WaveEffect extends Effect {

    public static CODE: EffectCode = EffectCode.WAVE;
    public static NAME: string = 'wave';

    constructor() {
        const parameters = [
            new ParameterColor('Color', 255, 0, 0),
            new ParameterRange('Delay', 20, 0, 255, 1),
            new ParameterBoolean('Invert Direction', false)
        ];
        super(WaveEffect.CODE, WaveEffect.NAME, parameters);
    }

    public static build(): Effect {
        return new WaveEffect();
    }
}
