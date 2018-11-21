import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class RectangleShape extends CanvasWhiteboardShape {
    width: number;
    height: number;

    constructor(positionPoint?: CanvasWhiteboardPoint,
                options?: CanvasWhiteboardShapeOptions,
                width?: number,
                height?: number) {
        super(positionPoint, options);
        this.width = width || 0;
        this.height = height || 0;
    }

    getShapeName(): string {
        return 'RectangleShape';
    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.width || !this.height) {
            return;
        }
        context.beginPath();

        Object.assign(context, this.options);

        context.rect(this.positionPoint.x, this.positionPoint.y, this.width, this.height);

        context.stroke();
        if (this.options.shouldFillShape) {
            context.fill();
        }

        context.closePath();
    }

    drawPreview(context: CanvasRenderingContext2D) {
        this.positionPoint = new CanvasWhiteboardPoint(2, 2);
        this.width = context.canvas.width - 4;
        this.height = context.canvas.height - 4;
        this.draw(context);
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.width = update.x - this.positionPoint.x;
        this.height = update.y - this.positionPoint.y;
    }
}
