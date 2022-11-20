import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";
import {DevicesComponent} from "./components/devices/devices.component";
import {ProfilesComponent} from "./components/profiles/profiles.component";
import {BookmarksComponent} from "./components/bookmarks/bookmarks.component";

const routes: Routes = [{
    path: '',
    redirectTo: 'devices',
    pathMatch: 'full'
}, {
    path: 'devices',
    component: DevicesComponent
}, {
    path: 'bookmarks',
    component: BookmarksComponent
}, {
    path: 'profiles',
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
