import {Parameter} from "./parameter.class";
import {BreathingEffect} from "./effects/breathing-effect.class";

export type Builder = () => Effect;

export abstract class Effect {

  private _code: EffectCode;
  private _name: string;
  private _parameters: Array<Parameter>;

  private static _registeredEffects: Map<EffectCode, Builder> = new Map<EffectCode, Builder>();

  protected constructor(code: number, name: string, parameters: Array<Parameter>) {
    this._code = code;
    this._name = name;
    this._parameters = parameters;
  }

  abstract applyParameters(payload: Uint8Array): void;

  serialize(): Array<number> {
    const serializedParams = Array.from(this.parameters.values()).map((param: Parameter) => {
      return param.serialize();
    });
    return [this.code, ...serializedParams.flat()];
  }

  static registerEffect(code: EffectCode, deserializer: Builder): void {
    this._registeredEffects.set(code, deserializer);
  }

  static registeredEffect(code: EffectCode): Builder | undefined {
    return this._registeredEffects.get(code);
  }

  get code(): EffectCode {
    return this._code;
  }

  set code(value: EffectCode) {
    this._code = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get parameters(): Array<Parameter> {
    return this._parameters;
  }

  set parameters(value: Array<Parameter>) {
    this._parameters = value;
  }

  static get registeredEffects(): Map<EffectCode, Builder> {
    return this._registeredEffects;
  }

  static set registeredEffects(value: Map<EffectCode, Builder>) {
    this._registeredEffects = value;
  }
}

export enum EffectCode {
  FIRE,
  COLOR,
  WAVE,
  CHASE,
  SPARKLE,
  BREATHING
}
