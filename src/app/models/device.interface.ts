import {Effect, EffectCode} from "./effect.class";

export interface Device {
  id: number;
  name: string;
  pendingPings: number;
  currentEffectCode?: EffectCode;
  availableEffects?: Map<EffectCode, Effect>;

  hidden?: boolean;
}
