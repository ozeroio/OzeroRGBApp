import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
	providedIn: 'root'
})
export class PresetsService {

	static storageEntry: string = 'presets';

	entriesMap: Map<string, Array<PresetEntry>>;

	constructor(private storageService: LocalStorageService) {
		this.entriesMap = new Map<string, Array<PresetEntry>>();
		this.deserialize(storageService.get(PresetsService.storageEntry));
	}

	addPreset(name: string, entries: Array<PresetEntry>): void {
		this.entriesMap.set(name, entries);
		this.persist();
	}

	removePreset(name: string): void {
		this.entriesMap.delete(name);
		this.persist();
	}

	getBookmarks(): Map<string, Array<PresetEntry>> {
		return this.entriesMap;
	}

	persist(): void {
		this.storageService.set(PresetsService.storageEntry, this.serialize());
	}

	private serialize(): string {
		const json = JSON.stringify(Array.from(this.entriesMap.entries()));
		return json;
	}

	private deserialize(data: string): void {
		try {
			const m: Map<string, Array<PresetEntry>> = new Map(JSON.parse(data));
			if (m) {
				this.entriesMap = m;
			}
		} catch (e) {
			console.log(e);
		}
	}
}

export interface PresetEntry {
	deviceName: string;
	configuration: Array<number>;
}
