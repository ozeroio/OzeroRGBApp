import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {DevicesComponent} from "./components/devices/devices.component";
import {APP_BASE_HREF} from "@angular/common";

const routes: Routes = [{
  path: '',
  redirectTo: 'devices',
  pathMatch: 'full'
}, {
  path: 'devices',
  component: DevicesComponent
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
