export abstract class Parameter {
  private _type: EffectParameterType;
  private _name: string;

  protected constructor(type: EffectParameterType, name: string) {
    this._type = type;
    this._name = name;
  }

  abstract serialize(): Array<number>;

  get type(): EffectParameterType {
    return this._type;
  }

  set type(value: EffectParameterType) {
    this._type = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}

export enum EffectParameterType {
  NUMBER,
  RANGE,
  COLOR,
  BOOLEAN,
  NUMERAL_OPTION
}
