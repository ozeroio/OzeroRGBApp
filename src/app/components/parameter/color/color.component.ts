import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterColor} from "../../../models/parameters/parameter-color.class";
import {ColorPickerComponent} from "../../color-picker/color-picker.component";
import {MatDialog} from "@angular/material/dialog";
import {Color} from "../../../models/color.interface";
import {Device} from "../../../models/device.class";

@Component({
	selector: 'app-color',
	templateUrl: './color.component.html',
	styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

	@Input() parameter: ParameterColor;
	@Input() device: Device;
	@Output() valueChange: EventEmitter<void>;

	constructor(protected dialog: MatDialog) {
		this.valueChange = new EventEmitter<void>();
		this.parameter = {} as ParameterColor;
		this.device = {} as Device;
	}

	ngOnInit(): void {
	}

	onClick(): void {
		const signUpDialogRef = this.dialog.open(ColorPickerComponent, {
			data: {color: this.parameter},
			closeOnNavigation: true
		});
		signUpDialogRef.componentInstance.valueChange.subscribe((color: Color) => {
			this.parameter.r = color.r;
			this.parameter.g = color.g;
			this.parameter.b = color.b;
			this.onChange();
		});
	}

	onChange(): void {
		this.valueChange.emit();
	}
}
