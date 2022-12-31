import {Injectable} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Injectable({
	providedIn: 'root'
})
export class IconRegistryService {

	constructor(private iconRegistry: MatIconRegistry,
	            private domSanitizer: DomSanitizer) {
	}

	public registerIcons() {
		this.iconRegistry.addSvgIcon('bullet', this.sanitize('assets/custom-icons/bullet.svg'));
		this.iconRegistry.addSvgIcon('ammunition', this.sanitize('assets/custom-icons/ammunition.svg'));
		this.iconRegistry.addSvgIcon('bullseye', this.sanitize('assets/custom-icons/bullseye.svg'));
		this.iconRegistry.addSvgIcon('bullseye-arrow', this.sanitize('assets/custom-icons/bullseye-arrow.svg'));
		this.iconRegistry.addSvgIcon('pistol', this.sanitize('assets/custom-icons/pistol.svg'));
		this.iconRegistry.addSvgIcon('target-variant', this.sanitize('assets/custom-icons/target-variant.svg'));
	}

	private sanitize(url: string): SafeResourceUrl {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
