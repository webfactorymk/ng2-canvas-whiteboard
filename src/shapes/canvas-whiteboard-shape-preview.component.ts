import {
    Component,
    ElementRef,
    Input,
    ViewChild,
    AfterViewInit,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import {INewCanvasWhiteboardShape} from "./canvas-whiteboard-shape.service";
import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";

@Component({
    selector: "canvas-whiteboard-shape-preview",
    template: `
        <canvas #canvasWhiteboardShapePreview width="50px" height="50px"
                class="canvas-whiteboard-shape-preview-canvas"></canvas>
    `,
    styles: [`
        .canvas-whiteboard-shape-preview-canvas {
            cursor: pointer;
        }
    `]
})
export class CanvasWhiteboardShapePreviewComponent implements AfterViewInit, OnChanges {
    @Input() readonly shapeConstructor: INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    @Input() readonly shapeOptions: CanvasWhiteboardShapeOptions;

    @ViewChild('canvasWhiteboardShapePreview') canvas: ElementRef;

    ngAfterViewInit() {
        this.drawShapePreview();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.shapeConstructor || changes.shapeOptions) {
            this.drawShapePreview();
        }
    }

    drawShapePreview() {
        if (!this.canvas) { return; }

        let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        let concreteShape = new this.shapeConstructor(
            new CanvasWhiteboardPoint(0, 0),
            Object.assign(new CanvasWhiteboardShapeOptions(), this.shapeOptions)
        );

        concreteShape.drawPreview(context);
    }
}
