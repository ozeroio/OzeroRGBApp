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
			new ParameterNumeralOption('Velocity', 1, new Map([
				[1, 'Normal'],
				[2, 'Fast'],
				[3, 'Faster'],
				[4, 'Fastest']
			]))
		];
		super(BreathingEffect.CODE, BreathingEffect.NAME, parameters);
	}

	public static build(): Effect {
		return new BreathingEffect();
	}
}
