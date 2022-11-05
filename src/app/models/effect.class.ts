import {Parameter} from "./parameter.class";

export type Builder = () => Effect;

export abstract class Effect {

    protected constructor(code: number, name: string, parameters: Array<Parameter>) {
        this._code = code;
        this._name = name;
        this._parameters = parameters;
    }

    private static _registeredEffects: Map<EffectCode, Builder> = new Map<EffectCode, Builder>();

    static get registeredEffects(): Map<EffectCode, Builder> {
        return this._registeredEffects;
    }

    static set registeredEffects(value: Map<EffectCode, Builder>) {
        this._registeredEffects = value;
    }

    private _code: EffectCode;

    get code(): EffectCode {
        return this._code;
    }

    set code(value: EffectCode) {
        this._code = value;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _parameters: Array<Parameter>;

    get parameters(): Array<Parameter> {
        return this._parameters;
    }

    set parameters(value: Array<Parameter>) {
        this._parameters = value;
    }

    static registerEffect(code: EffectCode, deserializer: Builder): void {
        this._registeredEffects.set(code, deserializer);
    }

    static registeredEffect(code: EffectCode): Builder | undefined {
        return this._registeredEffects.get(code);
    }

    abstract applyParameters(payload: Uint8Array): void;

    serialize(): Array<number> {
        const serializedParams = Array.from(this.parameters.values()).map((param: Parameter) => {
            return param.serialize();
        });
        return [this.code, ...serializedParams.flat()];
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
