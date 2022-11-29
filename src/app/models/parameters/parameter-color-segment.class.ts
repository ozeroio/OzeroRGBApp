import {EffectParameterType, Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";
import {ParameterColor} from "./parameter-color.class";

export class ParameterColorSegment extends Parameter {

    constructor(name: string, length: number = 0, color: ParameterColor = new ParameterColor('Color')) {
        super(EffectParameterType.COLOR_SEGMENT, name);
        this._length = length;
        this._color = color;
    }

    static createFromDeserialize(randomAccess: RandomAccess): ParameterColorSegment {
        const instance = new ParameterColorSegment('Color Segment');
        instance.deserialize(randomAccess);
        return instance;
    }

    private _length: number;

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
    }

    private _color: ParameterColor;

    get color(): ParameterColor {
        return this._color;
    }

    set color(value: ParameterColor) {
        this._color = value;
    }

    deserialize(randomAccess: RandomAccess): void {
        this.length = randomAccess.readUnsignedInt();
        this.color.deserialize(randomAccess);
    }

    getSerializationSize(): number {

        // 4 for length + color
        return 4 + this.color.getSerializationSize();
    }

    serialize(randomAccess: RandomAccess): void {
        randomAccess.writeUnsignedInt(this.length);
        this.color.serialize(randomAccess);
    }
}
