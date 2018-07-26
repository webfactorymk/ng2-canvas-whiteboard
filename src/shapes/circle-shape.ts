import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class CircleShape extends CanvasWhiteboardShape {
    radius: number;

    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, radius?: number) {
        super(positionPoint, options);
        this.radius = radius || 0;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);

        context.strokeStyle = this.options.strokeStyle;
        context.stroke();

        if (this.options.shouldFillShape) {
            context.fillStyle = this.options.fillStyle;
            context.fill();
        }

        context.closePath();
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.radius = Math.sqrt(Math.pow(update.x - this.positionPoint.x, 2) + Math.pow(update.y - this.positionPoint.y, 2));
    }

    onStopReceived(update: CanvasWhiteboardUpdate) {
    }
}