import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Device} from "../../../models/device.class";
import {MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'app-edit',
  templateUrl: './preset-edit.component.html',
  styleUrls: ['./preset-edit.component.scss']
})
export class PresetEditComponent implements OnInit {

    @Output() save: EventEmitter<PresetSelection>;
    @Output() cancel: EventEmitter<void>;
    name: string;
    devices: Array<Device>;
    chosenDevices: Array<Device>;

    constructor(public dialogRef: MatDialogRef<PresetEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { devices: Array<Device> }) {
        this.save = new EventEmitter<PresetSelection>();
        this.cancel = new EventEmitter<void>();
        this.name = '';
        this.devices = data.devices;
        this.chosenDevices = new Array<Device>();
    }

    ngOnInit(): void {
    }

    public onSaveButtonClick(): void {
        const selections: PresetSelection = {
            name: this.name,
            devices: this.chosenDevices
        }
        this.save.emit(selections);
    }

    public onCancelButtonClick(): void {
        this.cancel.emit();
    }
}

export interface PresetSelection {
    name: string,
    devices: Array<Device>
}
