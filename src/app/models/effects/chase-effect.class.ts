import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {ParameterBoolean} from "../parameters/parameter-boolean.class";

export class ChaseEffect extends Effect {

	public static CODE: EffectCode = EffectCode.CHASE;
	public static NAME: string = 'chase';

	constructor() {
		const parameters = [
			new ParameterColor('Color', 255, 0, 0),
			new ParameterRange('Delay', 20, 0, 255, 1),
			new ParameterBoolean('Invert Direction', false),
			new ParameterRange('Gap Len', 3, 1, 32, 1),
			new ParameterRange('Fill Len', 3, 1, 32, 1)
		];
		super(ChaseEffect.CODE, ChaseEffect.NAME, parameters);
	}

	public static build(): Effect {
		return new ChaseEffect();
	}
}
