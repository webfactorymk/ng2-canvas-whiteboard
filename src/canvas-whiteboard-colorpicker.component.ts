import {
    Component,
    Output,
    EventEmitter, OnInit, ViewChild, ElementRef, Input
} from '@angular/core';

@Component({
    selector: 'canvas-whiteboard-colorpicker',
    host: {
        '(document:mousedown)': 'closeOnExternalClick($event)',
        '(document:touchstart)': 'closeOnExternalClick($event)',
    },
    template: `
        <div [hidden]="showColorPicker" class="canvas-whiteboard-colorpicker-input"
               (click)="toggleColorPicker($event)">
               <div class="selected-color-type-wrapper"><ng-content></ng-content></div>
               <div class="selected-color-preview" [style.background]="selectedColor"></div>
        </div>
        <div [hidden]="!showColorPicker" class="canvas-whiteboard-colorpicker-wrapper">
            <div (click)="selectColor('transparent')">Transparent</div>
            <canvas #canvaswhiteboardcolorpicker class="canvas-whiteboard-colorpicker" width="284" height="155"
                    (click)="selectColor(determineColorFromCanvas($event))"></canvas>
        </div>
    `,
    styles: [`
        .selected-color-preview {
            width: 100%;
            height: 20%;
            position: absolute;
            bottom: 0;
            left: 0;
        }
        
        .selected-color-type-wrapper {
            display: inline-block;
            height: 100%;
            width: 100%;
            text-align: center;
        }
        
        .canvas-whiteboard-colorpicker-wrapper {
            border: 1px solid #afafaf;
            color: #000;
        }

        @media (min-width: 401px) {
            .canvas-whiteboard-colorpicker-wrapper {
                position: absolute;
                top: 0;
                right: 100%;
            }
        }

        .canvas-whiteboard-colorpicker-input {
            display: inline-block;
            position:relative;
            width: 44px;
            height: 44px;
            margin: 5px;
            cursor: pointer;
            color: #000;
        }
    `]
})
export class CanvasWhiteboardColorPickerComponent implements OnInit {

    @Input() readonly selectedColor: string = 'rgba(0,0,0,1)';
    @ViewChild('canvaswhiteboardcolorpicker') canvas: ElementRef;

    @Input() readonly showColorPicker: boolean = false;
    private _context: CanvasRenderingContext2D;

    @Output() onToggleColorPicker = new EventEmitter<boolean>();
    @Output() onColorSelected = new EventEmitter<string>();
    @Output() onSecondaryColorSelected = new EventEmitter<string>();

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
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);

        gradient = this._context.createLinearGradient(0, 0, 0, this._context.canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }

    closeOnExternalClick(event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showColorPicker) {
            this.onToggleColorPicker.emit(false);
        }
    }

    toggleColorPicker(event: Event) {
        if (event) {
            event.preventDefault();
        }

        this.onToggleColorPicker.emit(!this.showColorPicker);
    }

    determineColorFromCanvas(event: any) {
        let canvasRect = this._context.canvas.getBoundingClientRect();
        let imageData = this._context.getImageData(event.clientX - canvasRect.left, event.clientY - canvasRect.top, 1, 1);

        return `rgba(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]}, ${imageData.data[3]})`;
    }

    selectColor(color: string) {
        this.onColorSelected.emit(color);
        this.toggleColorPicker(null);
    }
}