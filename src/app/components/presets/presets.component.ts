import {Component, OnInit} from '@angular/core';
import {PresetEntry, PresetsService} from "../../services/presets.service";
import {DeviceService} from "../../services/device.service";
import {Buffer} from "buffer";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
	selector: 'app-presets',
	templateUrl: './presets.component.html',
	styleUrls: ['./presets.component.scss']
})
export class PresetsComponent implements OnInit {
	entriesMap: Map<string, Array<PresetEntry>>;

	constructor(private presetsService: PresetsService,
	            private deviceService: DeviceService,
	            private snackBar: MatSnackBar) {
		this.entriesMap = new Map<string, Array<PresetEntry>>();
	}

	applyBookmark(entries: Array<PresetEntry>) {
		entries.forEach(value => {
			this.deviceService.sendConfiguration(new Buffer(value.configuration));
		});
		this.snackBar.open('Preset sent to device(s).', 'OK', {
			duration: 3000
		});
	}

	deleteBookmark(key: string) {
		this.presetsService.removePreset(key);
		this.snackBar.open('Preset deleted.', 'OK', {
			duration: 3000
		});
	}

	ngOnInit(): void {
		const map = this.presetsService.getBookmarks();
		if (map) {
			this.entriesMap = map;
		}
	}
}
