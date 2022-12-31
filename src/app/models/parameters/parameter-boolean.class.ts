import {EffectParameterType, Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";

export class ParameterBoolean extends Parameter {

	constructor(name: string, value: boolean) {
		super(EffectParameterType.BOOLEAN, name);
		this._value = value;
	}

	private _value: boolean;

	get value(): boolean {
		return this._value;
	}

	set value(value: boolean) {
		this._value = value;
	}

	get valueNumber(): number {
		return this._value ? 1 : 0;
	}

	set valueNumber(value: number) {
		this._value = value > 0;
	}

	override serialize(randomAccess: RandomAccess): void {
		randomAccess.writeUnsignedChar(this.valueNumber);
	};

	override deserialize(randomAccess: RandomAccess): void {
		this.valueNumber = randomAccess.readUnsignedChar();
	};

	override getSerializationSize(): number {
		// value(1)
		return 1;
	}
}
