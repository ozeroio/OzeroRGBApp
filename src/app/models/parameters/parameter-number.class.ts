import {EffectParameterType, Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";

export enum NumberSize {
    U32,
    I32,
    U16,
    I16,
    U8,
    I8
}

export class ParameterNumber extends Parameter {

    constructor(name: string, value: number, size: NumberSize = NumberSize.U32) {
        super(EffectParameterType.NUMBER, name);
        this._value = value;
        this._size = size;
    }

    private _value: number;

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    private _size: NumberSize;

    get size(): NumberSize {
        return this._size;
    }

    set size(size: NumberSize) {
        this._size = size;
    }

    override serialize(randomAccess: RandomAccess): void {
        switch (this.size) {
            case NumberSize.U32:
                randomAccess.writeUnsignedInt(this.value);
                break;
            case NumberSize.I32:
                randomAccess.writeInt(this.value);
                break;
            case NumberSize.U16:
                randomAccess.writeUnsignedShort(this.value);
                break;
            case NumberSize.I16:
                randomAccess.writeShort(this.value);
                break;
            case NumberSize.U8:
                randomAccess.writeUnsignedChar(this.value);
                break;
            case NumberSize.I8:
                randomAccess.writeChar(this.value);
                break;
        }
    };

    override deserialize(randomAccess: RandomAccess): void {
        switch (this.size) {
            case NumberSize.U32:
                this.value = randomAccess.readUnsignedInt();
                break;
            case NumberSize.I32:
                this.value = randomAccess.readInt();
                break;
            case NumberSize.U16:
                this.value = randomAccess.readUnsignedShort();
                break;
            case NumberSize.I16:
                this.value = randomAccess.readShort();
                break;
            case NumberSize.U8:
                this.value = randomAccess.readUnsignedChar();
                break;
            case NumberSize.I8:
                this.value = randomAccess.readChar();
                break;
        }
    };

    override getSerializationSize(): number {
        // value(4)
        return 4;
    }
}
