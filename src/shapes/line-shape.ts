import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class LineShape extends CanvasWhiteboardShape {
    endPosition: CanvasWhiteboardPoint;

    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, endPosition?: CanvasWhiteboardPoint) {
        super(positionPoint, options);
        this.endPosition = endPosition || new CanvasWhiteboardPoint(this.positionPoint.x, this.positionPoint.y)
    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.endPosition) return;
        context.beginPath();

        context.lineWidth = this.options.lineWidth;
        context.lineCap = this.options.lineCap;
        context.lineJoin = this.options.lineJoin;
        context.shadowBlur = this.options.shadowBlur;
        context.strokeStyle = this.options.strokeStyle;

        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        context.lineTo(this.endPosition.x, this.endPosition.y);

        context.closePath();
        context.stroke();
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.endPosition = new CanvasWhiteboardPoint(update.x, update.y);
    }

    onStopReceived(update: CanvasWhiteboardUpdate) {
    }
}