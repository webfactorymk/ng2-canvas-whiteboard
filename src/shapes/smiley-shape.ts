import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class SmileyShape extends CanvasWhiteboardShape {
    radius: number;

    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions, radius?: number) {
        super(positionPoint, options);
        this.options.shouldFillShape = true;
        this.options.fillStyle = this.options.fillStyle || "yellow";

        this.radius = radius || 0;
    }

    getShapeName(): string {
        return 'SmileyShape';
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();

        Object.assign(context, this.options);

        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.stroke();

        context.beginPath();
        let leftEyeX = this.positionPoint.x - this.radius * 0.3;
        let rightEyeX = this.positionPoint.x + this.radius * 0.3;
        const eyesY = this.positionPoint.y - this.radius * 0.2;
        const eyeSize = this.radius * 0.1;

        context.arc(leftEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.arc(rightEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.fillStyle = this.options.strokeStyle;
        context.fill();

        // draw the mouth
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius * 0.7, 0, Math.PI, false);
        context.stroke();

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
