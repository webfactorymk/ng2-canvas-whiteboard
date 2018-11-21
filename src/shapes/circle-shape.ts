import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class CircleShape extends CanvasWhiteboardShape {
    radius: number;

    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions, radius?: number) {
        super(positionPoint, options);
        this.radius = radius || 0;
    }

    getShapeName(): string {
        return 'CircleShape';
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);

        Object.assign(context, this.options);

        context.stroke();
        if (this.options.shouldFillShape) {
            context.fill();
        }

        context.closePath();
    }

    drawPreview(context: CanvasRenderingContext2D) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.radius = this.calculateRadius(update.x, update.y);
    }

    calculateRadius(x: number, y: number): number {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    }
}
