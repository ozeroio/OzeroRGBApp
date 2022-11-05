import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterColor} from "../../../models/parameters/parameter-color.class";
import {ColorPickerComponent} from "../../color-picker/color-picker.component";
import {MatDialog} from "@angular/material/dialog";
import {Color} from "../../../models/color.interface";

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

    @Input() parameter: ParameterColor;
    @Output() change: EventEmitter<void>;

    constructor(protected dialog: MatDialog) {
        this.change = new EventEmitter<void>();
        this.parameter = {} as ParameterColor;
    }

    ngOnInit(): void {
    }

    onClick(): void {
        const signUpDialogRef = this.dialog.open(ColorPickerComponent, {
            data: {color: this.parameter},
            closeOnNavigation: true
        });
        signUpDialogRef.componentInstance.change.subscribe((color: Color) => {
            this.parameter.r = color.r;
            this.parameter.g = color.g;
            this.parameter.b = color.b;
            this.onChange();
        });
    }

    onChange(): void {
        this.change.emit();
    }
}
