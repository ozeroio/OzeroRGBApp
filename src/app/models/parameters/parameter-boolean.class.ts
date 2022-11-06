import {EffectParameterType, Parameter} from "../parameter.class";

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

    set valueNumber(value: number) {
        this._value = value > 0;
    }

    override serialize(): Array<number> {
        return Array.from([this.value ? 1 : 0]);
    }
}
