import {Effect, EffectCode} from "../effect.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {Color} from "../color.interface";

export class ColorEffect extends Effect {

    public static CODE: EffectCode = EffectCode.COLOR;
    public static NAME: string = 'color';

    constructor() {
        const parameters = [
            new ParameterColor('Color', 255, 0, 0)
        ];
        super(ColorEffect.CODE, ColorEffect.NAME, parameters);
    }

    public static build(): Effect {
        return new ColorEffect();
    }

    applyParameters(payload: Uint8Array): void {
        (this.parameters[0] as ParameterColor).r = payload[0];
        (this.parameters[0] as ParameterColor).g = payload[1];
        (this.parameters[0] as ParameterColor).b = payload[2];
    }
}
