import {EffectParameterType, Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";

export class ParameterNumber extends Parameter {

    constructor(name: string, value: number) {
        super(EffectParameterType.NUMBER, name);
        this._value = value;
    }

    private _value: number;

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    override serialize(randomAccess: RandomAccess): void {
        randomAccess.writeUnsignedInt(this.value);
    };

    override deserialize(randomAccess: RandomAccess): void {
        this.value = randomAccess.readUnsignedInt();
    };

    override getSerializationSize(): number {
        // value(4)
        return 4;
    }
}
