import {Parameter} from "../parameter.class";

export class ParameterColor extends Parameter {

    constructor(name: string, r: number, g: number, b: number) {
        super(EffectParameterType.COLOR, name);
        this._r = r;
        this._g = g;
        this._b = b;
    }

    private _r: number;

    get r(): number {
        return this._r;
    }

    set r(value: number) {
        this._r = value;
    }

    private _g: number;

    get g(): number {
        return this._g;
    }

    set g(value: number) {
        this._g = value;
    }

    private _b: number;

    get b(): number {
        return this._b;
    }

    set b(value: number) {
        this._b = value;
    }

    override serialize(): Array<number> {
        return Array.from([this.r, this.g, this.b]);
    };
}

export enum EffectParameterType {
    NUMBER,
    RANGE,
    COLOR
}
