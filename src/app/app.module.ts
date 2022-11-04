import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {BrowserModule} from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";

import {DevicesComponent} from './components/devices/devices.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTabsModule} from "@angular/material/tabs";
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";
import {environment} from "../environments/environment";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule
} from "@angular-material-components/color-picker";
import {ParameterComponent} from './components/parameter/parameter.component';
import {RangeComponent} from './components/parameter/range/range.component';
import {ColorComponent} from './components/parameter/color/color.component';
import {NumberComponent} from './components/parameter/number/number.component';
import {EffectComponent} from './components/effect/effect.component';
import {ColorPickerComponent} from './components/color-picker/color-picker.component';
import {DeviceEditComponent} from './components/devices/edit/device-edit.component';
import {BooleanComponent} from './components/parameter/boolean/boolean.component';
import {NumeralOptionComponent} from './components/parameter/numeral-option/numeral-option.component';


@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    ParameterComponent,
    RangeComponent,
    ColorComponent,
    NumberComponent,
    EffectComponent,
    ColorPickerComponent,
    DeviceEditComponent,
    BooleanComponent,
    NumeralOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSliderModule,
    NgxMatColorPickerModule,
    MqttModule.forRoot(environment.mqtt as IMqttServiceOptions),
    MatButtonToggleModule
  ],
  providers: [
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ColorPickerComponent
  ]
})
export class AppModule {
}
