import {EffectParameterType, Parameter} from "../parameter.class";

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

    override serialize(): Array<number> {
        return Array.from([this.value]);
    };
}
