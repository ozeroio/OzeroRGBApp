import {Effect, EffectCode} from "./effect.class";
import {ParameterNumber} from "./parameters/parameter-number.class";
import {ParameterBoolean} from "./parameters/parameter-boolean.class";

export class Device {

    public static DEFAULT_BRIGHTNESS: number = 180;

    constructor(id: number, on: ParameterBoolean, brightness: ParameterNumber, name: string, pendingPings: number, currentEffect?: Effect, availableEffects?: Map<EffectCode, Effect>, hidden?: boolean) {
        this._id = id;
        this._on = on;
        this._brightness = brightness;
        this._name = name;
        this._pendingPings = pendingPings;
        this._currentEffect = currentEffect;
        this._availableEffects = availableEffects;
        this._hidden = hidden;
    }

    private _id: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _on: ParameterBoolean;

    get on(): ParameterBoolean {
        return this._on;
    }

    set on(value: ParameterBoolean) {
        this._on = value;
    }

    private _brightness: ParameterNumber;

    get brightness(): ParameterNumber {
        return this._brightness;
    }

    set brightness(value: ParameterNumber) {
        this._brightness = value;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _pendingPings: number;

    get pendingPings(): number {
        return this._pendingPings;
    }

    set pendingPings(value: number) {
        this._pendingPings = value;
    }

    private _currentEffect?: Effect;

    get currentEffect(): Effect | undefined {
        return this._currentEffect;
    }

    set currentEffect(value: Effect | undefined) {
        this._currentEffect = value;
    }

    private _availableEffects?: Map<EffectCode, Effect>;

    get availableEffects(): Map<EffectCode, Effect> | undefined {
        return this._availableEffects;
    }

    set availableEffects(value: Map<EffectCode, Effect> | undefined) {
        this._availableEffects = value;
    }

    private _hidden?: boolean;

    get hidden(): boolean | undefined {
        return this._hidden;
    }

    set hidden(value: boolean | undefined) {
        this._hidden = value;
    }

    serialize(): Array<number> {
        const data = Array.from([this.id, this.on.value ? 1 : 0, this.brightness.value]);
        if (this.currentEffect) {
            data.push(...this.currentEffect.serialize());
        }
        return data;
    }
}
