import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";
import {environment} from "../environments/environment";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatBadgeModule} from "@angular/material/badge";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {DevicesComponent} from "./components/devices/devices.component";
import {ParameterComponent} from "./components/parameter/parameter.component";
import {RangeComponent} from "./components/parameter/range/range.component";
import {ColorComponent} from "./components/parameter/color/color.component";
import {NumberComponent} from "./components/parameter/number/number.component";
import {EffectComponent} from "./components/effect/effect.component";
import {ColorPickerComponent} from "./components/color-picker/color-picker.component";
import {DeviceEditComponent} from "./components/devices/edit/device-edit.component";
import {BooleanComponent} from "./components/parameter/boolean/boolean.component";
import {NumeralOptionComponent} from "./components/parameter/numeral-option/numeral-option.component";
import {ProfilesComponent} from "./components/profiles/profiles.component";
import {PresetsComponent} from "./components/presets/presets.component";
import {PresetSaveComponent} from "./components/presets/save/preset-save.component";
import {EffectReplicateComponent} from "./components/effect/replicate/effect-replicate.component";
import {ColorSegmentComponent} from "./components/parameter/color-segment/color-segment.component";
import {ColorSegmentListComponent} from "./components/parameter/color-segment-list/color-segment-list.component";
import {FireSegmentComponent} from "./components/parameter/fire-segment/fire-segment.component";
import {FireSegmentListComponent} from "./components/parameter/fire-segment-list/fire-segment-list.component";

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
		NumeralOptionComponent,
		ProfilesComponent,
		PresetsComponent,
		PresetSaveComponent,
		EffectReplicateComponent,
		ColorSegmentComponent,
		ColorSegmentListComponent,
		FireSegmentComponent,
		FireSegmentListComponent
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
		MqttModule.forRoot(environment.mqtt as IMqttServiceOptions),
		MatButtonToggleModule,
		MatSlideToggleModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
