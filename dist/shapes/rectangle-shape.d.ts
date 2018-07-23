import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
export declare class RectangleShape extends CanvasWhiteboardShape {
    protected width: number;
    protected height: number;
    constructor(startingPoint: CanvasWhiteboardPoint, width: number, height: number, options: CanvasWhiteboardShapeOptions);
    draw(context: CanvasRenderingContext2D): void;
    deserialize(json: any): CanvasWhiteboardShape;
    serialize(item: any): any;
}
