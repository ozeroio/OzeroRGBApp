import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {ParameterBoolean} from "../parameters/parameter-bool.class";

export class ChaseEffect extends Effect {

    public static CODE: EffectCode = EffectCode.CHASE;
    public static NAME: string = 'chase';

    constructor() {
        const parameters = [
            new ParameterColor('Color', 255, 0, 0),
            new ParameterRange('Delay', 20, 0, 255, 1),
            new ParameterBoolean('Invert Direction', 0),
            new ParameterRange('Gap Len', 3, 1, 32, 1),
            new ParameterRange('Fill Len', 3, 1, 32, 1)
        ];
        super(ChaseEffect.CODE, ChaseEffect.NAME, parameters);
    }

    public static build(): Effect {
        return new ChaseEffect();
    }

    applyParameters(payload: Uint8Array): void {
        (this.parameters[0] as ParameterColor).r = payload[0];
        (this.parameters[0] as ParameterColor).g = payload[1];
        (this.parameters[0] as ParameterColor).b = payload[2];
        (this.parameters[1] as ParameterRange).value = payload[3];
        (this.parameters[2] as ParameterBoolean).value = payload[4];
        (this.parameters[3] as ParameterRange).value = payload[5];
        (this.parameters[4] as ParameterRange).value = payload[6];
    }
}
