import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class FreeHandShape extends CanvasWhiteboardShape {
    linePositions: CanvasWhiteboardPoint[];

    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions) {
        super(positionPoint, options);
        this.linePositions = [];
    }

    getShapeName(): string {
        return 'FreeHandShape';
    }

    draw(context: CanvasRenderingContext2D) {
        Object.assign(context, this.options);

        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        // Draw a dot
        context.lineTo(this.positionPoint.x + 1, this.positionPoint.y + 1);

        // Normal fastest free hand drawing
        // this.linePositions.forEach((linePosition) => {
        //     context.lineTo(linePosition.x, linePosition.y);
        // });

        // Quadratic curves drawing
        let i = 0;
        while (i < this.linePositions.length) {
            if (this.linePositions.length - i > 2) {
                let controlPoint1 = this.linePositions[i];
                let controlPoint2 = this.linePositions[i + 1];
                let endPoint = this.linePositions[i + 2];
                context.bezierCurveTo(controlPoint1.x,
                    controlPoint1.y,
                    controlPoint2.x,
                    controlPoint2.y,
                    endPoint.x,
                    endPoint.y);
                i += 2;
            } else {
                let linePosition = this.linePositions[i];
                context.lineTo(linePosition.x, linePosition.y);
                i += 1;
            }
        }

        context.stroke();
    }

    drawPreview(context: CanvasRenderingContext2D) {
        this.positionPoint = new CanvasWhiteboardPoint(2, 2);
        this.linePositions = [
            new CanvasWhiteboardPoint(context.canvas.width - 5, context.canvas.height * 0.3),
            // new CanvasWhiteboardPoint(context.canvas.width * 0.4, context.canvas.height * 0.6),
            new CanvasWhiteboardPoint(context.canvas.width * 0.2, context.canvas.height * 0.4),
            new CanvasWhiteboardPoint(context.canvas.width * 0.6, context.canvas.height * 0.8),
            new CanvasWhiteboardPoint(context.canvas.width, context.canvas.height)
        ];

        this.draw(context);
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.linePositions.push(new CanvasWhiteboardPoint(update.x, update.y));
    }
}
