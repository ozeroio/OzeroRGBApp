import {Parameter} from "./parameter.class";
import {RandomAccess} from "./randomAccess.interface";

export type Builder = () => Effect;

export abstract class Effect {

	protected constructor(code: number, name: string, parameters: Array<Parameter>, description: string = '') {
		this._code = code;
		this._name = name;
		this._parameters = parameters;
		this._description = description;
	}

	private static _registeredEffects: Map<EffectCode, Builder> = new Map<EffectCode, Builder>();

	static get registeredEffects(): Map<EffectCode, Builder> {
		return this._registeredEffects;
	}

	static set registeredEffects(value: Map<EffectCode, Builder>) {
		this._registeredEffects = value;
	}

	private _code: EffectCode;

	get code(): EffectCode {
		return this._code;
	}

	set code(value: EffectCode) {
		this._code = value;
	}

	private _name: string;

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	private _parameters: Array<Parameter>;

	get parameters(): Array<Parameter> {
		return this._parameters;
	}

	set parameters(value: Array<Parameter>) {
		this._parameters = value;
	}

	private _description: string;

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	static registerEffect(code: EffectCode, deserializer: Builder): void {
		this._registeredEffects.set(code, deserializer);
	}

	static registeredEffect(code: EffectCode): Builder | undefined {
		return this._registeredEffects.get(code);
	}

	getSerializationSize(): number {
		let size = 0;
		this.parameters.forEach((parameter: Parameter) => {
			size += parameter.getSerializationSize();
		});
		return size;
	}

	serialize(randomAccess: RandomAccess): void {
		this.parameters.forEach((parameter: Parameter) => {
			parameter.serialize(randomAccess);
		});
	}

	deserialize(randomAccess: RandomAccess): void {
		this.parameters.forEach((parameter: Parameter) => {
			parameter.deserialize(randomAccess);
		});
	}
}


export enum EffectCode {
	NONE,
	COLOR,
	FIRE,
	WAVE,
	CHASE,
	SPARKLE,
	BREATHING,
	SHIFT
}
