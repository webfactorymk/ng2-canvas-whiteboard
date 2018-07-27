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
        <input [style.background]="selectedColor" [hidden]="showColorPicker" class="canvas-whiteboard-colorpicker-input"
               (click)="toggleColorPicker($event)"/>
        <div [hidden]="!showColorPicker" class="canvas-whiteboard-colorpicker-wrapper">
            <canvas #canvaswhiteboardcolorpicker class="canvas-whiteboard-colorpicker" width="284" height="155"
                    (click)="selectColor($event)"></canvas>
        </div>
    `,
    styles: [`
        .canvas-whiteboard-colorpicker {
            padding: 4px;
            background: #000;
            border: 1px solid #afafaf;
        }

        @media (min-width: 401px) {
            .canvas-whiteboard-colorpicker {
                position: absolute;
                top: 0;
                right: 100%;
            }
        }

        .canvas-whiteboard-colorpicker-input {
            width: 44px;
            height: 44px;
            border: 2px solid black;
            margin: 5px;
        }
    `]
})
export class CanvasWhiteboardColorPickerComponent implements OnInit {

    @Input() selectedColor: string = "rgb(0,0,0)";
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

    private _getColor(event: any) {
        let canvasRect = this._context.canvas.getBoundingClientRect();
        let imageData = this._context.getImageData(event.clientX - canvasRect.left, event.clientY - canvasRect.top, 1, 1);

        return 'rgb(' + imageData.data[0] + ', ' + imageData.data[1] + ', ' + imageData.data[2] + ')';
    }

    selectColor(event: any) {
        this.selectedColor = this._getColor(event);

        // if(event.) {
        this.onColorSelected.emit(this.selectedColor);

        // } else {
        //     this.onSecondaryColorSelected.emit(this.selectedColor);
        // }
        this.toggleColorPicker(null);
    }
}