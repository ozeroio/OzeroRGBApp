import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";
import {ProfilesComponent} from "./components/profiles/profiles.component";
import {DevicesComponent} from "./components/devices/devices.component";
import {PresetsComponent} from "./components/presets/presets.component";
import {AuthenticateComponent} from "./components/authenticate/authenticate.component";

export const APP_ROUTES = {
	AUTHENTICATE: 'authenticate',
	DEVICES: 'devices',
	PRESETS: 'presets',
	PROFILES: 'profiles'
}

const routes: Routes = [{
	path: '',
	redirectTo: APP_ROUTES.AUTHENTICATE,
	pathMatch: 'full'
}, {
	path: APP_ROUTES.AUTHENTICATE,
	component: AuthenticateComponent
}, {
	path: APP_ROUTES.DEVICES,
	component: DevicesComponent
}, {
	path: APP_ROUTES.PRESETS,
	component: PresetsComponent
}, {
	path: APP_ROUTES.PROFILES,
	component: ProfilesComponent
}]

export const routingConfiguration: ExtraOptions = {
	paramsInheritanceStrategy: 'always',
	useHash: true
};

export const routing = RouterModule.forRoot(routes, routingConfiguration);


@NgModule({
	imports: [routing],
	exports: [RouterModule],
	providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {
}
