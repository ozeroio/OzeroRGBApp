import {Effect, EffectCode} from "./effect.class";
import {ParameterNumber} from "./parameters/parameter-number.class";
import {ParameterBoolean} from "./parameters/parameter-boolean.class";
import {Buffer} from "buffer";
import {RandomAccess} from "./randomAccess.interface";

export class Device {

    public static DEFAULT_BRIGHTNESS: number = 180;
    public static DEVICE_FLAG_ON_BIT: number = 0x01;

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

    getSerializationSize(): number {
        // id(4) + flags(4) + brightness(1) + effectCode(4)
        let size = 4 + 4 + 1 + 4;
        if (this.currentEffect) {
            size += this.currentEffect.getSerializationSize();
        }
        return size;
    }

    serialize(randomAccess: RandomAccess): void {
        randomAccess.writeUnsignedInt(this.id);
        randomAccess.writeUnsignedInt(this.getFlags());
        randomAccess.writeUnsignedChar(this.brightness.value);
        if (this.currentEffect) {
            randomAccess.writeUnsignedInt(this.currentEffect.code);
            this.currentEffect.serialize(randomAccess);
        } else {
            randomAccess.writeUnsignedInt(EffectCode.NONE);
        }
    }

    deserialize(randomAccess: RandomAccess): void {

        // ID was already read from randomAccess.
        this.setFlags(randomAccess.readUnsignedInt());
        this.brightness.value = randomAccess.readUnsignedChar();
        const effectCode = randomAccess.readUnsignedInt()
        if (effectCode != EffectCode.NONE && this.availableEffects?.has(effectCode)) {
            const effect = this.availableEffects?.get(effectCode);
            effect?.deserialize(randomAccess);
            this.currentEffect = effect;
        }
    }

    private getFlags(): number {
        let flags: number = 0;
        flags |= this.on.value ? Device.DEVICE_FLAG_ON_BIT : 0;
        return flags;
    }

    private setFlags(flags: number): void {
        this.on.value = (flags & Device.DEVICE_FLAG_ON_BIT) > 0;
    }
}
