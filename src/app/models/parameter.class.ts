import {RandomAccess} from "./randomAccess.interface";

export abstract class Parameter {
	protected constructor(type: EffectParameterType, name: string) {
		this._type = type;
		this._name = name;
	}

	private _type: EffectParameterType;

	get type(): EffectParameterType {
		return this._type;
	}

	set type(value: EffectParameterType) {
		this._type = value;
	}

	private _name: string;

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	abstract getSerializationSize(): number;

	abstract serialize(randomAccess: RandomAccess): void;

	abstract deserialize(randomAccess: RandomAccess): void;
}

export enum EffectParameterType {
	NUMBER,
	RANGE,
	COLOR,
	BOOLEAN,
	NUMERAL_OPTION,
	COLOR_SEGMENT,
	COLOR_SEGMENT_LIST
}
