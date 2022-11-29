import {Effect, EffectCode} from "../effect.class";
import {ParameterColorSegmentList} from "../parameters/parameter-color-segment-list.class";
import {NumberSize} from "../parameters/parameter-number.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterNumeralOption} from "../parameters/parameter-numeral-option.class";
import {ParameterBoolean} from "../parameters/parameter-boolean.class";

export class RainbowEffect extends Effect {

    public static CODE: EffectCode = EffectCode.RAINBOW;
    public static NAME: string = 'rainbow';

    constructor() {
        const parameters = [
            new ParameterColorSegmentList('Colors'),
            new ParameterNumeralOption('Shift Type', 1, new Map([
                [0, 'None'],
                [1, 'Right'],
                [2, 'Left'],
                [3, 'Bounce']
            ]), NumberSize.U8),
            new ParameterRange('Delay', 0, 0, 1024, 1, NumberSize.U32),
            new ParameterRange('Bounce Every', 1, 1, 1024, 1, NumberSize.U32),
            new ParameterRange('Skipping', 1, 1, 128, 1, NumberSize.U32),
            new ParameterBoolean('Repeat', false)
        ];
        super(RainbowEffect.CODE, RainbowEffect.NAME, parameters);
    }

    public static build(): Effect {
        return new RainbowEffect();
    }
}
