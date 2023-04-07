import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageService} from "./services/local-storage.service";
import {environment} from "../environments/environment";
import {APP_ROUTES} from "./app-routing.module";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public static STORAGE_PASS_KEY: string = 'key/password';
	public navEntries: Array<Array<NavEntry>>;
	title = 'Ozero RGB App';

	constructor(private router: Router,
				private storageService: LocalStorageService) {
		this.navEntries = [[
			{label: 'Devices', icon: 'devices', path: 'devices'}
		], [
			{label: 'Presets', icon: 'bookmark_border', path: 'presets'}
		]];
		const storedPassword = this.storageService.get(AppComponent.STORAGE_PASS_KEY);
		if (storedPassword) {
			environment.mqtt.password = storedPassword;
		}
	}

	public onExitClick(): void {
		environment.mqtt.password = '';
		this.storageService.set(AppComponent.STORAGE_PASS_KEY, '');
		this.router.navigate([APP_ROUTES.AUTHENTICATE]);
	}
}

interface NavEntry {
	label: string;
	icon: string;
	path: string;
}
