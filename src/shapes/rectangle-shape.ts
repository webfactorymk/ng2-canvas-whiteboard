import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class RectangleShape extends CanvasWhiteboardShape {
    width: number;
    height: number;

    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, width?: number, height?: number) {
        super(positionPoint, options);
        this.width = width;
        this.height = height;
    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.width || !this.height) return;
        context.save();
        context.beginPath();
        context.rect(this.positionPoint.x, this.positionPoint.y, this.width, this.height);

        context.strokeStyle = this.options.strokeStyle;
        context.stroke();

        if (this.options.shouldFillShape) {
            context.fillStyle = this.options.fillStyle;
            context.fill();
        }

        context.closePath();
        context.restore();
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        console.log(update, this.positionPoint);
        this.width = update.x - this.positionPoint.x;
        this.height = update.y - this.positionPoint.y;
    }

    onStopReceived(update: CanvasWhiteboardUpdate) {
    }
}