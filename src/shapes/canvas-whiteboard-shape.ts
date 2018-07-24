import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";

export abstract class CanvasWhiteboardShape {
    protected startingPoint: CanvasWhiteboardPoint;
    protected options: CanvasWhiteboardShapeOptions;

    constructor(startingPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions) {
        this.startingPoint = startingPoint || new CanvasWhiteboardPoint(0, 0);
        this.options = options || new CanvasWhiteboardShapeOptions();
    }

    abstract draw(context: CanvasRenderingContext2D);

    abstract deserialize(json: any): CanvasWhiteboardShape;

    abstract serialize(item: any): any;
}