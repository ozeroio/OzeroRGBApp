import {Effect, EffectCode} from "./effect.class";

export class Device {

  private static DEFAULT_BRIGHTNESS: number = 180;

  private _id: number;
  private _brightness: number;
  private _name: string;
  private _pendingPings: number;
  private _currentEffect?: Effect;
  private _availableEffects?: Map<EffectCode, Effect>;
  private _hidden?: boolean;

  constructor(id: number, brightness: number, name: string, pendingPings: number, currentEffect?: Effect, availableEffects?: Map<EffectCode, Effect>, hidden?: boolean) {
    this._id = id;
    this._brightness = brightness || Device.DEFAULT_BRIGHTNESS;
    this._name = name;
    this._pendingPings = pendingPings;
    this._currentEffect = currentEffect;
    this._availableEffects = availableEffects;
    this._hidden = hidden;
  }

  serialize(): Array<number> {
    const data = Array.from([this.id, this.brightness]);
    if (this.currentEffect) {
      data.push(...this.currentEffect.serialize());
    }
    return data;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get brightness(): number {
    return this._brightness;
  }

  set brightness(value: number) {
    this._brightness = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get pendingPings(): number {
    return this._pendingPings;
  }

  set pendingPings(value: number) {
    this._pendingPings = value;
  }

  get currentEffect(): Effect | undefined {
    return this._currentEffect;
  }

  set currentEffect(value: Effect | undefined) {
    this._currentEffect = value;
  }

  get availableEffects(): Map<EffectCode, Effect> | undefined {
    return this._availableEffects;
  }

  set availableEffects(value: Map<EffectCode, Effect> | undefined) {
    this._availableEffects = value;
  }

  get hidden(): boolean | undefined {
    return this._hidden;
  }

  set hidden(value: boolean | undefined) {
    this._hidden = value;
  }
}
