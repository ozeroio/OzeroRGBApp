# RGBWindowApp

## ops

Deploy with:
```angular2html
./ops/deploy.sh
```

## How to enable support for a new effect. 

- Create you unique code into ```app/models/effect.class.ts``` by adding a new entry into the following enum:

```angular2html
export enum EffectCode {
  ...,
  MY_AWESOME_EFFECT_CODE
}
```

- Create a new class into ```app/models/effects/my-awesome-effect.class.ts``` with the following template:

```angular2html
import {Effect, EffectCode} from "../effect.class";
import {ParameterRange} from "../parameters/parameter-range.class";
import {ParameterColor} from "../parameters/parameter-color.class";
import {ParameterBoolean} from "../parameters/parameter-bool.class";

export class MyAwesomeEffect extends Effect {

  public static CODE: EffectCode = EffectCode.MY_AWESOME_EFFECT_CODE;
  public static NAME: string = 'my awesome effect';

  constructor() {
    const parameters = [
      new ParameterColor('Color', 255, 0, 0),
      new ParameterRange('Delay', 20, 0, 255, 1),
      new ParameterBoolean('Invert Direction', 0)
    ];
    super(MyAwesomeEffect.CODE, MyAwesomeEffect.NAME, parameters);
  }

  applyParameters(payload: Uint8Array): void {
    (this.parameters[0] as ParameterColor).r = payload[0];
    (this.parameters[0] as ParameterColor).g = payload[1];
    (this.parameters[0] as ParameterColor).b = payload[2];
    (this.parameters[1] as ParameterRange).value = payload[3];
    (this.parameters[2] as ParameterBoolean).value = payload[4];
  }

  public static build(): Effect {
    return new MyAwesomeEffect();
  }
}
```

```applyParameters``` should receive the current device's config and recreate your effect's state.
```build``` should create an instance of your effect.

In your constructor you should call ```super(MyAwesomeEffect.CODE, MyAwesomeEffect.NAME, parameters);``` with code, name and the parameters of your effect.

- Register your effect by adding your effect into the file ```app/components/devices/devices.component.ts```. Adding the following line into the constructor:
```
Effect.registerEffect(MyAwesomeEffect.CODE, MyAwesomeEffect.build);
```

## Message protocol

Each message type should be exchanged at the appropriated topic.

The MAX_CONFIGURATION_SIZE = 64 is the max length of a message. 

### Topics:

- **Discovery**: device/discovery. Host broadcasting to device message. On a device receives this message, it should schedule a **Presence** message. 
- **Presence**: device/presence. Device to host messages indicating the device is available.
- **Configure**: device/configure. Host to device messages. The host wants the device to receive a new configuration.
- **Description**: device/description. Device to host messages. The device is reporting its configuration to the host.
- **Describe**: device/describe. Host to device messages. The host wants the device to describe itself - its configuration.
- **Ping**: device/ping. Host to device requesting acknowledgement.
- **Pong**: device/pong. Device to host reporting ping.

### Discovery message

MESSAGE: `""`

Discovery is broadcast with no payload.

### Presence message

MESSAGE: `"DEVICE_ID:NUMBER_OF_AVAILABLE_EFFECTS[:EFFEC_0_CODE:...:EFFECT_N_CODE]"`

Ex:
- `0:2:0:1`, meaning device 0 with 2 available effects, 0 and 1.
- `1:1:1`, meaning device 1 with 1 available effect, 1.
- `2:0`, meaning device 2 with 0 available effects.

### Configure message

MESSAGE: `"DEVICE_ID:EFFECT_CODE[:EFFEC_PARAM_0:...:EFFEC_PARAM_N]"`

Ex:
- `{0,2,255,1}`, meaning device 0, effect 2 with 255 and 1 as parameters.
- `{0,1,1}`, meaning device 0, effect 1 with 1 as parameter.
- `{0,0}`, meaning device 0, effect 0 with no params.

### Description message

MESSAGE: `"DEVICE_ID:BRIGHTNESS:EFFECT_CODE[:EFFEC_PARAM_0:...:EFFEC_PARAM_N]"`

Ex:
- `{0,255,2,255,1}`, meaning device 0, full (255) brightness, effect 2 with 255 and 1 as parameters.
- `{0,255,1,1}`, meaning device 0, full (255) brightness, effect 1 with 1 as parameter.
- `{0,0,0}`, meaning device 0, off (brightness 0), effect 0 with no params.

### Describe message

MESSAGE: `"DEVICE_ID"`

Only contains the DEVICE ID.

### Ping message

MESSAGE: `"DEVICE_ID"`

Only contains the DEVICE ID.

### Pong message

MESSAGE: `"DEVICE_ID"`

Only contains the DEVICE ID.


---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
