import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";

export class CircleShape extends CanvasWhiteboardShape {
    protected radius: number;

    constructor(startingPoint: CanvasWhiteboardPoint, radius: number, options: CanvasWhiteboardShapeOptions) {
        super(startingPoint, options);
        this.radius = radius;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.startingPoint.x, this.startingPoint.y, this.radius, 0, Math.PI * 2, false);

        context.strokeStyle = this.options.strokeStyle;
        context.stroke();

        if (this.options.fillShape) {
            context.fillStyle = this.options.fillStyle;
            context.fill();
        }

        context.closePath();
    }

    deserialize(json: any): CanvasWhiteboardShape {
        let point = new CanvasWhiteboardPoint(0, 0);
        let radius = 0;
        return new CircleShape(point, radius, new CanvasWhiteboardShapeOptions());
    }

    serialize(item: any): any {
    }
}