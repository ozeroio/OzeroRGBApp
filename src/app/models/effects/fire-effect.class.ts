import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";

export class FireEffect extends Effect {

    public static CODE: EffectCode = EffectCode.FIRE;
    public static NAME: string = 'fire';

    constructor() {
        const parameters = [
            new ParameterRange('Sparking', 60, 0, 255, 1),
            new ParameterRange('Cooling', 80, 0, 255, 1),
            new ParameterRange('Delay', 20, 0, 255, 1),
            new ParameterRange('Spark Level', 7, 1, 16, 1),
        ];
        super(FireEffect.CODE, FireEffect.NAME, parameters, 'Fire effect.');
    }

    public static build(): Effect {
        return new FireEffect();
    }
}
