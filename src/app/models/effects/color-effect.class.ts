import {Effect, EffectCode} from "../effect.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {Color} from "../color.interface";
import {ParameterBoolean} from "../parameters/parameter-boolean.class";

export class ColorEffect extends Effect {

    public static CODE: EffectCode = EffectCode.COLOR;
    public static NAME: string = 'color';

    constructor() {
        const parameters = [
            new ParameterColor('Color', 255, 0, 0),
            new ParameterBoolean('Randomize', false)
        ];
        super(ColorEffect.CODE, ColorEffect.NAME, parameters);
    }

    public static build(): Effect {
        return new ColorEffect();
    }
}
