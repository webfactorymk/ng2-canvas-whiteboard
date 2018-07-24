import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
export declare abstract class CanvasWhiteboardShape {
    protected startingPoint: CanvasWhiteboardPoint;
    protected options: CanvasWhiteboardShapeOptions;
    constructor(startingPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions);
    abstract draw(context: CanvasRenderingContext2D): any;
    abstract deserialize(json: any): CanvasWhiteboardShape;
    abstract serialize(item: any): any;
}
