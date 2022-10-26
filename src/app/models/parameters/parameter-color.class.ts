import {Parameter} from "../parameter.class";

export class ParameterColor extends Parameter {

  private _r: number;
  private _g: number;
  private _b: number;

  constructor(name: string, r: number, g: number, b: number) {
    super(EffectParameterType.COLOR, name);
    this._r = r;
    this._g = g;
    this._b = b;
  }

  override serialize(): Array<number> {
    return Array.from([this.r, this.g, this.b]);
  };


  get r(): number {
    return this._r;
  }

  set r(value: number) {
    this._r = value;
  }

  get g(): number {
    return this._g;
  }

  set g(value: number) {
    this._g = value;
  }

  get b(): number {
    return this._b;
  }

  set b(value: number) {
    this._b = value;
  }
}

export enum EffectParameterType {
  NUMBER,
  RANGE,
  COLOR
}
