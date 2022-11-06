import {Effect, EffectCode} from "../effect.class";
import {ParameterNumeralOption} from "../parameters/parameter-numeral-option.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {ParameterBoolean} from "../parameters/parameter-boolean.class";
import {ParameterRange} from "../parameters/parameter-range.class";

export class BreathingEffect extends Effect {

    public static CODE: EffectCode = EffectCode.BREATHING;
    public static NAME: string = 'breathing';

    constructor() {
        const parameters = [
            new ParameterColor('Color', 255, 0, 0),
            new ParameterNumeralOption('Wave', 0, new Map([
                [0, 'Triangle'],
                [1, 'Circle'],
                [2, 'Gaussian']
            ])),
            new ParameterRange('Beta', 5, 0, 255, 1),
            new ParameterRange('Gama', 5, 0, 255, 1),
            new ParameterRange('Delay', 5, 0, 255, 1),
            new ParameterBoolean('Randomize Color', false),
        ];
        super(BreathingEffect.CODE, BreathingEffect.NAME, parameters);
    }

    public static build(): Effect {
        return new BreathingEffect();
    }

    applyParameters(payload: Uint8Array): void {
        (this.parameters[0] as ParameterColor).r = payload[0];
        (this.parameters[0] as ParameterColor).g = payload[1];
        (this.parameters[0] as ParameterColor).b = payload[2];
        (this.parameters[1] as ParameterNumeralOption).value = payload[3];
        (this.parameters[2] as ParameterRange).value = payload[4];
        (this.parameters[3] as ParameterRange).value = payload[5];
        (this.parameters[4] as ParameterRange).value = payload[6];
        (this.parameters[5] as ParameterBoolean).valueNumber = payload[7];
    }
}
