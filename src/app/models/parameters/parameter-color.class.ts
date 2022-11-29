import {Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";

export class ParameterColor extends Parameter {

    constructor(name: string, r: number = 0, g: number = 0, b: number = 0) {
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

    toRGB(): string {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`
    }

    override serialize(randomAccess: RandomAccess): void {
        randomAccess.writeUnsignedChar(this.r);
        randomAccess.writeUnsignedChar(this.g);
        randomAccess.writeUnsignedChar(this.b);
    };

    override deserialize(randomAccess: RandomAccess): void {
        this.r = randomAccess.readUnsignedChar();
        this.g = randomAccess.readUnsignedChar();
        this.b = randomAccess.readUnsignedChar();
    };

    override getSerializationSize(): number {
        // r(1) + g(1) + b(1)
        return 1 + 1 + 1;
    }
}

export enum EffectParameterType {
    NUMBER,
    RANGE,
    COLOR
}
