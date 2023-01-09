import {Component} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Ozero RGB App';
	public navEntries: Array<Array<NavEntry>>;
	test: number;

	constructor() {
		this.test = 88;
		this.navEntries = [[
			{label: 'Devices', icon: 'devices', path: 'devices'}
		], [
			{label: 'Presets', icon: 'bookmark_border', path: 'presets'}
		]];
	}

	public onExitClick(): void {
	}
}

interface NavEntry {
	label: string;
	icon: string;
	path: string;
}
