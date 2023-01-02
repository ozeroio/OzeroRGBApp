import {EffectParameterType, Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";

export class ParameterFireSegment extends Parameter {

	constructor(name: string, start: number = 0, length: number = 0, inverted: number = 0, sparking: number = 0, cooling: number = 0, sparkLevel: number = 0) {
		super(EffectParameterType.FIRE_SEGMENT, name);
		this._start = start;
		this._length = length;
		this._inverted = inverted;
		this._sparking = sparking;
		this._cooling = cooling;
		this._sparkLevel = sparkLevel;
	}

	private _start: number;

	get start(): number {
		return this._start;
	}

	set start(value: number) {
		this._start = value;
	}

	private _length: number;

	get length(): number {
		return this._length;
	}

	set length(value: number) {
		this._length = value;
	}

	private _inverted: number;

	get inverted(): number {
		return this._inverted;
	}

	set inverted(value: number) {
		this._inverted = value;
	}

	private _sparking: number;

	get sparking(): number {
		return this._sparking;
	}

	set sparking(value: number) {
		this._sparking = value;
	}

	private _cooling: number;

	get cooling(): number {
		return this._cooling;
	}

	set cooling(value: number) {
		this._cooling = value;
	}

	private _sparkLevel: number;

	get sparkLevel(): number {
		return this._sparkLevel;
	}

	set sparkLevel(value: number) {
		this._sparkLevel = value;
	}

	static createFromDeserialize(randomAccess: RandomAccess): ParameterFireSegment {
		const instance = new ParameterFireSegment('Fire segment');
		instance.deserialize(randomAccess);
		return instance;
	}

	getSerializationSize(): number {

		//    uint32_t start;
		//    uint32_t length;
		//    uint8_t inverted;
		//    uint8_t sparking;
		//    uint8_t cooling;
		//    uint8_t sparkLevel;
		return 2 * 4 + 4;
	}

	deserialize(randomAccess: RandomAccess): void {
		this.start = randomAccess.readUnsignedInt();
		this.length = randomAccess.readUnsignedInt();
		this.inverted = randomAccess.readUnsignedChar();
		this.sparking = randomAccess.readUnsignedChar();
		this.cooling = randomAccess.readUnsignedChar();
		this.sparkLevel = randomAccess.readUnsignedChar();
	}

	serialize(randomAccess: RandomAccess): void {
		randomAccess.writeUnsignedInt(this.start);
		randomAccess.writeUnsignedInt(this.length);
		randomAccess.writeUnsignedChar(this.inverted);
		randomAccess.writeUnsignedChar(this.sparking);
		randomAccess.writeUnsignedChar(this.cooling);
		randomAccess.writeUnsignedChar(this.sparkLevel);
	}
}
