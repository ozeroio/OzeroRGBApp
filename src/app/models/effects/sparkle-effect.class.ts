import {Effect, EffectCode} from "../effect.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {Color} from "../color.interface";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterBoolean} from "../parameters/parameter-boolean.class";

export class SparkleEffect extends Effect {

    public static CODE: EffectCode = EffectCode.SPARKLE;
    public static NAME: string = 'sparkle';

    constructor() {
        const parameters = [
            new ParameterColor('Color', 255, 0, 0),
            new ParameterRange('Delay', 20, 0, 255, 1),
            new ParameterRange('Num LEDs', 1, 0, 255, 1),
            new ParameterBoolean('Randomize Color', false)
        ];
        super(SparkleEffect.CODE, SparkleEffect.NAME, parameters);
    }

    public static build(): Effect {
        return new SparkleEffect();
    }
}
