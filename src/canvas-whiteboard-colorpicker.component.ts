import {
    Component,
    Output,
    EventEmitter, OnInit, ViewChild, ElementRef, Input
} from '@angular/core';

@Component({
    selector: 'canvas-whiteboard-colorpicker',
    host: {
        '(document:mousedown)': '_closeOnExternalClick($event)',
        '(document:touchstart)': '_closeOnExternalClick($event)',
    },
    template: `
        <input [style.background]="selectedColor" [hidden]="_showColorPicker" class="canvas-whiteboard-colorpicker-input" (click)="toggleColorPicker($event)"/>
        <canvas #canvaswhiteboardcolorpicker [hidden]="!_showColorPicker" class="canvas-whiteboard-colorpicker" width="284" height="155"
          (click)="_selectColor($event)"></canvas>
    `,
    styles: [`
        .canvas-whiteboard-colorpicker {
            position: absolute;
            top: 0;
            right: 100%;
        }
        .canvas-whiteboard-colorpicker-input {
            width: 30px;
            height: 30px;
        }
    `]
})
export class CanvasWhiteboardColorPickerComponent implements OnInit {

    @Input() selectedColor: string = "rgb(0,0,0)";
    @ViewChild('canvaswhiteboardcolorpicker') canvas: ElementRef;

    private _showColorPicker: boolean = false;
    private _context: CanvasRenderingContext2D;

    @Output() onColorSelected = new EventEmitter<string>();

    constructor(private _elementRef: ElementRef) {
    }

    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    ngOnInit() {
        this._context = this.canvas.nativeElement.getContext("2d");
        this.createColorPalette();
    }

    createColorPalette() {
        let gradient = this._context.createLinearGradient(0, 0, this._context.canvas.width, 0);
        gradient.addColorStop(0, "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");
        gradient.addColorStop(0.49, "rgb(0,   255, 255)");
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1, "rgb(255,   0,   0)");

        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);

        //Add white -> transparent -> black
        gradient = this._context.createLinearGradient(0, 0, 0, this._context.canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1, "rgba(0,     0,   0, 1)");

        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }

    private _closeOnExternalClick(event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this._showColorPicker) {
            this._showColorPicker = false;
        }
    }

    toggleColorPicker(event: any) {
        if (event) {
            event.preventDefault();
        }

        this._showColorPicker = !this._showColorPicker;
    }

    private _getColor(event: any) {
        let canvasRect = this._context.canvas.getBoundingClientRect();
        let imageData = this._context.getImageData(event.clientX - canvasRect.left, event.clientY - canvasRect.top, 1, 1);
        let selectedColor = 'rgb(' + imageData.data[0] + ', ' + imageData.data[1] + ', ' + imageData.data[2] + ')';
        console.log(imageData);
        console.log(selectedColor);

        return selectedColor;
    }

    private _selectColor(event: any) {
        console.log(event);
        this.selectedColor = this._getColor(event);
        this.onColorSelected.emit(this.selectedColor);
        this.toggleColorPicker(null);
    }
}