import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {NumberSize} from "../parameters/parameter-number.class";
import {ParameterFireSegmentList} from "../parameters/parameter-fire-segment-list.class";
import {RandomAccess} from "../randomAccess.interface";

export class FireEffect extends Effect {

	public static CODE: EffectCode = EffectCode.FIRE;
	public static NAME: string = 'fire';
	public static FIRE_MAX_NUM_SEGMENTS: number = 8;
	public static FIRE_MIN_SEGMENT_SIZE: number = 4;
	public static FIRE_MIN_SPARK_LEVEL: number = 3;
	public static DEFAULT_SPARKING: number = 127;
	public static DEFAULT_COOLING: number = 75;

	constructor() {
		const parameters = [
			new ParameterFireSegmentList('Fire segments'),
			new ParameterRange('Delay', 20, 0, 255, 1, NumberSize.U8)
		];
		super(FireEffect.CODE, FireEffect.NAME, parameters, 'Fire effect.');
	}

	public static build(): Effect {
		return new FireEffect();
	}
}
