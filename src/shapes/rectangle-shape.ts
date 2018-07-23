import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";

export class RectangleShape extends CanvasWhiteboardShape {
    protected width: number;
    protected height: number;

    constructor(startingPoint: CanvasWhiteboardPoint, width: number, height: number, options: CanvasWhiteboardShapeOptions) {
        super(startingPoint, options);
        this.width = width;
        this.height = height;
    }

    draw(context: CanvasRenderingContext2D) {
        console.log("ABOUT TO DRAW RECTANGLE");
        context.beginPath();
        context.rect(this.startingPoint.x, this.startingPoint.y, this.width, this.height);

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
        let width = 0;
        let height = 0;
        return new RectangleShape(point, width, height, new CanvasWhiteboardShapeOptions());
    }

    serialize(item: any): any {
    }
}