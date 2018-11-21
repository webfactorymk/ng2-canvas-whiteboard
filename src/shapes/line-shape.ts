import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class LineShape extends CanvasWhiteboardShape {
    endPosition: CanvasWhiteboardPoint;

    constructor(positionPoint?: CanvasWhiteboardPoint,
                options?: CanvasWhiteboardShapeOptions,
                endPosition?: CanvasWhiteboardPoint) {
        super(positionPoint, options);
        this.endPosition = endPosition || new CanvasWhiteboardPoint(this.positionPoint.x, this.positionPoint.y);
    }

    getShapeName(): string {
        return 'LineShape';
    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.endPosition) {
            return;
        }
        context.beginPath();
        Object.assign(context, this.options);

        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        context.lineTo(this.endPosition.x, this.endPosition.y);

        context.closePath();
        context.stroke();
    }

    drawPreview(context: CanvasRenderingContext2D) {
        this.positionPoint = new CanvasWhiteboardPoint(0, 0);
        this.endPosition = new CanvasWhiteboardPoint(context.canvas.width, context.canvas.height);
        this.draw(context);
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.endPosition = new CanvasWhiteboardPoint(update.x, update.y);
    }
}
