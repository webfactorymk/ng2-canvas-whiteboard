import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class FreeHandShape extends CanvasWhiteboardShape {
    linePositions: CanvasWhiteboardPoint[];

    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions) {
        super(positionPoint, options);
        this.linePositions = [];
    }

    draw(context: CanvasRenderingContext2D) {
        Object.assign(context, this.options);
        // context.lineWidth = this.options.lineWidth;
        // context.lineCap = this.options.lineCap;
        // context.lineJoin = this.options.lineJoin;
        // context.shadowBlur = this.options.shadowBlur;
        // context.strokeStyle = this.options.strokeStyle;

        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y);

        // let controlPoint = this.positionPoint;
        this.linePositions.forEach((linePosition) => {
            context.lineTo(linePosition.x, linePosition.y);
            // let endingPoint: CanvasWhiteboardPoint = this._getBezierControlPoint(controlPoint, linePosition);
            // context.quadraticCurveTo(controlPoint.x, controlPoint.y, endingPoint.x, endingPoint.y);
            // controlPoint = linePosition;
        });

        context.stroke();
    }

    // private _getBezierControlPoint(firstPoint: CanvasWhiteboardPoint, secondPoint: CanvasWhiteboardPoint): CanvasWhiteboardPoint {
    //     return new CanvasWhiteboardPoint(
    //         firstPoint.x + ((secondPoint.x - firstPoint.x) / 2),
    //         firstPoint.y + ((secondPoint.y - firstPoint.y) / 2)
    //     );
    // }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.linePositions.push(new CanvasWhiteboardPoint(update.x, update.y));
    }

    onStopReceived(update: CanvasWhiteboardUpdate) {
    }
}