import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './devices.component';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//
//
// import {Component, OnInit} from '@angular/core';
// import {IMqttMessage, MqttService} from "ngx-mqtt";
// import {Subscription} from "rxjs";
// import {Color} from "../../models/color.interface";
// import {Device} from "../../models/device.interface";
// import {FireEffect} from "../../models/effects/fireEffect.class";
// import {Effect} from "../../models/effect.class";
// import {ColorEffect} from "../../models/effects/colorEffect.class";
//
// @Component({
//   selector: 'app-devices',
//   templateUrl: './devices.component.html',
//   styleUrls: ['./devices.component.scss']
// })
// export class DevicesComponent implements OnInit {
//
//   private static DEVICE_DISCOVERY: string = 'device/discovery';
//   private static DEVICE_PRESENCE: string = 'device/presence';
//   private static DEVICE_CONFIGURE: string = 'device/configure';
//   private static DEVICE_CONFIGURATION: string = 'device/configuration';
//   //
//   private subscription: Subscription;
//   // public device: DeviceEnum;
//   // public on: boolean;
//   // public brightness: number;
//   // public effect: Effect;
//   // public sparking: number;
//   // public cooling: number;
//   // public speed: number;
//   // public sparkLevel: number;
//   // public color: Color;
//   //
//   // public Device = DeviceEnum;
//   // public Effect = Effect;
//
//   // devices: Array<Device>;
//   Effect = Effect;
//
//   constructor(private mqttService: MqttService) {
//     this.subscription = this.mqttService.observe(DevicesComponent.DEVICE_PRESENCE).subscribe((message: IMqttMessage) => {
//       console.log(message.payload.toString());
//     });
//     this.subscription = this.mqttService.observe(DevicesComponent.DEVICE_CONFIGURATION).subscribe((message: IMqttMessage) => {
//       console.log(message.payload.toString());
//     });
//     // this.mqttService.publish(DevicesComponent.DEVICE_DISCOVERY, '', {retain: false}).subscribe();
//     // this.mqttService.publish(DevicesComponent.DEVICE_CONFIGURE, "3", {retain: false}).subscribe();
//
//
//     // this.message = '';
//     // this.device = DeviceEnum.OFFICE;
//     // this.on = true;
//     // this.brightness = 255;
//     // this.effect = Effect.FIRE;
//     // this.sparking = 60;
//     // this.cooling = 120;
//     // this.speed = 15;
//     // this.sparkLevel = 7;
//     // this.color = {r: 0, g: 0, b: 0};
//     // this.devices = new Array<Device>();
//
//     Effect.registerEffect(FireEffect.getInstance());
//     Effect.registerEffect(ColorEffect.getInstance());
//   }
//
//   public ngOnInit(): void {
//   }
//
//   //
//   // public onSetClick(): void {
//   //   this.sendPackage();
//   // }
//   //
//   // public onChange(): void {
//   //   this.sendPackage();
//   // }
//   //
//   // public buildMessage(): string {
//   //   const message: Array<string> = [
//   //     this.device,
//   //     this.on ? '1' : '0',
//   //     this.brightness.toString(),
//   //     this.effect.toString()
//   //   ]
//   //   if (this.effect == Effect.COLOR) {
//   //     message.push(this.color.r.toString());
//   //     message.push(this.color.g.toString());
//   //     message.push(this.color.b.toString());
//   //   } else if (this.effect == Effect.FIRE) {
//   //     message.push(this.sparking.toString());
//   //     message.push(this.cooling.toString());
//   //     message.push(this.speed.toString());
//   //     message.push(this.sparkLevel.toString());
//   //   }
//   //   return message.join(',');
//   // }
//   //
//   // private sendPackage(): void {
//   //   this.mqttService.publish('rgb_windows', this.buildMessage(), {retain: false}).subscribe();
//   // }
// }
//
// //
// // enum Effect {
// //   FIRE = '0',
// //   COLOR = '1'
// // }
// //
// // enum DeviceEnum {
// //   OFFICE = '0',
// //   SUITE = '1',
// //   LUCAS = '2',
// //   TEST = '3'
// // }
