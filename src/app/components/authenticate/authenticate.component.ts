import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../app-routing.module";
import {LocalStorageService} from "../../services/local-storage.service";
import {AppComponent} from "../../app.component";

@Component({
	selector: 'app-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

	environment = environment;

	constructor(private router: Router,
				private storageService: LocalStorageService) {
	}

	ngOnInit(): void {
	}

	onLoginButtonClick(): void {
		if (this.environment.mqtt.password !== '') {
			this.storageService.set(AppComponent.STORAGE_PASS_KEY, this.environment.mqtt.password);
			this.router.navigate([APP_ROUTES.DEVICES]);
		}
	}
}
