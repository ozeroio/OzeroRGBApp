import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {EffectParameterColor} from "../../models/parameters/effect-parameter-color.class";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Color} from "../../models/color.interface";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit, AfterViewInit {

  @Output() change: EventEmitter<Color>;
  @Input() parameter: EffectParameterColor;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;
  context: CanvasRenderingContext2D | null | undefined;
  image: ImageData | undefined;
  color: Color = {r: 0, g: 0, b: 0};
  dragging: boolean = false;
  padding: number = 30;
  predefinedColors: Array<Color>;

  constructor(public dialogRef: MatDialogRef<ColorPickerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { color: Color }) {
    this.change = new EventEmitter<Color>();
    this.parameter = {} as EffectParameterColor;
    if (data.color) {
      this.color.r = data.color.r;
      this.color.g = data.color.g;
      this.color.b = data.color.b;
    }
    this.predefinedColors = [];
    this.predefinedColors.push({r: 255, g: 0, b: 0});
    this.predefinedColors.push({r: 255, g: 128, b: 0});
    this.predefinedColors.push({r: 255, g: 255, b: 0});
    this.predefinedColors.push({r: 128, g: 255, b: 0});
    this.predefinedColors.push({r: 0, g: 255, b: 0});
    this.predefinedColors.push({r: 0, g: 255, b: 128});
    this.predefinedColors.push({r: 0, g: 255, b: 255});
    this.predefinedColors.push({r: 0, g: 128, b: 255});
    this.predefinedColors.push({r: 0, g: 0, b: 255});
    this.predefinedColors.push({r: 128, g: 0, b: 255});
    this.predefinedColors.push({r: 255, g: 0, b: 255});
    this.predefinedColors.push({r: 255, g: 0, b: 128});
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.context = this.canvas?.nativeElement.getContext('2d');
    if (this.context) {
      const degreesToRadians = function (degrees: number) {
        return degrees * (Math.PI / 180);
      }
      const size = this.canvas?.nativeElement.width || 0;
      const centerColor = 'white';
      const hexCode = [0, 0, 255];
      const colorOffsetByDegree = 4.322;
      const radius = size / 2;

      let angle = 0;
      let pivotPointer = 0;

      // For each degree in circle, perform operation
      while (angle < 360) {

        // find index immediately before and after our pivot
        const pivotPointerBefore = (pivotPointer + 3 - 1) % 3;

        // Modify colors
        if (hexCode[pivotPointer] < 255) {

          // If main points isn't full, add to main pointer
          hexCode[pivotPointer] =
            hexCode[pivotPointer] + colorOffsetByDegree > 255 ?
              255 :
              hexCode[pivotPointer] + colorOffsetByDegree;
        } else if (hexCode[pivotPointerBefore] > 0) {

          // If color before main isn't zero, subtract
          hexCode[pivotPointerBefore] =
            hexCode[pivotPointerBefore] > colorOffsetByDegree ?
              hexCode[pivotPointerBefore] - colorOffsetByDegree :
              0;
        } else if (hexCode[pivotPointer] >= 255) {

          // If main color is full, move pivot
          hexCode[pivotPointer] = 255;
          pivotPointer = (pivotPointer + 1) % 3;
        }

        const rgb = `rgb(${hexCode.map(h => Math.floor(h)).join(',')})`;
        const grad = this.context.createRadialGradient(
          radius,
          radius,
          0,
          radius,
          radius,
          radius
        );
        grad.addColorStop(0, centerColor);
        grad.addColorStop(1, rgb);
        this.context.fillStyle = grad;

        // draw circle portion
        this.context.globalCompositeOperation = 'source-over';
        this.context.beginPath();
        this.context.moveTo(radius, radius);
        this.context.arc(
          radius,
          radius,
          radius,
          degreesToRadians(angle),
          degreesToRadians(360)
        );
        this.context.closePath();
        this.context.fill();
        angle++;
      }
      this.image = this.context.getImageData(0, 0, size, size);
    }
  }

  onCanvasMouseDown(e: MouseEvent): void {
    this.dragging = true;
  }

  onCanvasTouchStart(e: TouchEvent): void {
    this.dragging = true;
  }

  onCanvasMouseUp(e: MouseEvent): void {
    this.dragging = false;
    this.onChange();
  }

  onCanvasTouchEnd(e: TouchEvent): void {
    this.dragging = false;
    this.onChange();
  }

  onCanvasMouseMove(e: MouseEvent): void {
    if (this.dragging) {
      this.onInteract(e.offsetX, e.offsetY);
    }
    e.preventDefault();
  }

  onCanvasClick(e: MouseEvent): void {
    this.onInteract(e.offsetX, e.offsetY);
    e.preventDefault();
  }

  onCanvasTouchMove(e: PointerEvent): void {
    if (this.dragging) {
      this.onInteract(e.offsetX, e.offsetY);
    }
    e.preventDefault();
  }

  onChange(): void {
    this.change.emit(this.color);
  }

  onColorClick(color: Color): void {
    this.color.r = color.r;
    this.color.g = color.g;
    this.color.b = color.b;
    this.onChange();
  }

  private onInteract(x: number, y: number): void {
    x -= this.padding;
    y -= this.padding;
    if (this.context && this.image) {
      this.context.clearRect(0, 0, this.image.width, this.image.height)
      this.context.putImageData(this.image, 0, 0);
      const pixel = this.context.getImageData(x, y, 1, 1)['data'];
      this.color.r = pixel[0];
      this.color.g = pixel[1];
      this.color.b = pixel[2];
      this.context.beginPath();
      this.context.strokeStyle = 'black';
      this.context.arc(x, y, 8, 0, 2 * Math.PI);
      this.context.stroke();
    }
  }
}
