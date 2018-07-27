import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import {INewCanvasWhiteboardShape} from "./canvas-whiteboard-shape.service";
import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardUpdate, CanvasWhiteboardUpdateType} from "../canvas-whiteboard-update.model";

@Component({
    selector: "canvas-whiteboard-shape-preview",
    template: `
        <canvas #canvasWhiteboardShapePreview width="60px" height="60px" class="canvas-whiteboard-shape-preview-canvas"></canvas>
    `,
    styles: [`
        .canvas-whiteboard-shape-preview-canvas {
            cursor: pointer;
        }
    `]
})
export class CanvasWhiteboardShapePreviewComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() readonly shapeConstructor: INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    @Input() readonly shapeOptions: CanvasWhiteboardShapeOptions;

    @ViewChild('canvasWhiteboardShapePreview') canvas: ElementRef;

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.drawShapePreview();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.shapeConstructor || changes.shapeOptions) {
            this.drawShapePreview();
        }
    }

    drawShapePreview() {
        if (!this.canvas) return;

        let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
        console.log(context);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        let concreteShape = new this.shapeConstructor(
            new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2),
            Object.assign(new CanvasWhiteboardShapeOptions(), this.shapeOptions)
        );

        let update = new CanvasWhiteboardUpdate(context.canvas.width - 2, context.canvas.height / 2);
        concreteShape.onUpdateReceived(update);

        concreteShape.draw(context);
    }

    ngOnDestroy(): void {
    }
}