import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class SmileyShape extends CanvasWhiteboardShape {
    radius: number;

    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, radius?: number) {
        super(positionPoint, options);
        options.shouldFillShape = true;
        options.fillStyle = "yellow";

        this.radius = radius || 0;
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.options.fillStyle;
        context.fill();
        context.lineWidth = this.options.lineWidth;
        context.strokeStyle = this.options.strokeStyle;
        context.stroke();

        context.beginPath();
        let leftEyeX = this.positionPoint.x - this.radius * 0.3;
        let rightEyeX = this.positionPoint.x + this.radius * 0.3;
        const eyesY = this.positionPoint.y - this.radius * 0.2;
        const eyeSize = this.radius * 0.1;

        context.arc(leftEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.arc(rightEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();

        // draw the mouth
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius * 0.7, 0, Math.PI, false);
        context.stroke();

        context.closePath();
        context.restore();
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.radius = Math.sqrt(Math.pow(update.x - this.positionPoint.x, 2) + Math.pow(update.y - this.positionPoint.y, 2));
    }

    onStopReceived(update: CanvasWhiteboardUpdate) {
    }
}