import {Component, OnInit} from '@angular/core';
import {PresetEntry, PresetsService} from "../../services/presets.service";
import {MqttService} from "ngx-mqtt";
import {Buffer} from "buffer";

@Component({
    selector: 'app-presets',
    templateUrl: './presets.component.html',
    styleUrls: ['./presets.component.scss']
})
export class PresetsComponent implements OnInit {
    entriesMap: Map<string, Array<PresetEntry>>;

    constructor(private presetsService: PresetsService,
                private mqttService: MqttService) {
        this.entriesMap = new Map<string, Array<PresetEntry>>();
    }

    applyBookmark(entries: Array<PresetEntry>) {
        entries.forEach(value => {
            this.mqttService.publish('device/configure', new Buffer(value.configuration)).subscribe(() => {
            });
        })
    }

    ngOnInit(): void {
        const map = this.presetsService.getBookmarks();
        if (map) {
            this.entriesMap = map;
        }
    }
}
