import {ParameterNumber} from "./parameter-number.class";
import {EffectParameterType} from "../parameter.class";

export class ParameterNumeralOption extends ParameterNumber {
    constructor(name: string, value: number, options: Map<number, string>) {
        super(name, value);
        this._options = options;
        this.type = EffectParameterType.NUMERAL_OPTION;
    }

    private _options: Map<number, string>;

    get options(): Map<number, string> {
        return this._options;
    }

    set options(value: Map<number, string>) {
        this._options = value;
    }
}
