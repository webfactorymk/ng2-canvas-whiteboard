import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class RectangleShape extends CanvasWhiteboardShape {
    width: number;
    height: number;

    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, width?: number, height?: number) {
        super(positionPoint, options);
        this.width = width || 0;
        this.height = height || 0;
    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.width || !this.height) return;
        context.beginPath();

        Object.assign(context, this.options);
        // context.lineWidth = this.options.lineWidth;
        // context.lineCap = this.options.lineCap;
        // context.lineJoin = this.options.lineJoin;
        // context.shadowBlur = this.options.shadowBlur;
        // context.strokeStyle = this.options.strokeStyle;
        // context.fillStyle = this.options.fillStyle;

        context.rect(this.positionPoint.x, this.positionPoint.y, this.width, this.height);

        context.stroke();

        if (this.options.shouldFillShape) {
            context.fill();
        }

        context.closePath();
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.width = update.x - this.positionPoint.x;
        this.height = update.y - this.positionPoint.y;
    }

    onStopReceived(update: CanvasWhiteboardUpdate) {
    }
}