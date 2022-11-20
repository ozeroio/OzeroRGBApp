import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit',
  templateUrl: './preset-edit.component.html',
  styleUrls: ['./preset-edit.component.scss']
})
export class PresetEditComponent implements OnInit {

    @Output() save: EventEmitter<string>;
    @Output() cancel: EventEmitter<void>;
    name: string;

    constructor(public dialogRef: MatDialogRef<PresetEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {  }) {
        this.save = new EventEmitter<string>();
        this.cancel = new EventEmitter<void>();
        this.name = '';
    }

    ngOnInit(): void {
    }

    public onSaveButtonClick(): void {
        this.save.emit(this.name);
    }

    public onCancelButtonClick(): void {
        this.cancel.emit();
    }
}
