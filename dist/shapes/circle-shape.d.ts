import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
export declare class CircleShape extends CanvasWhiteboardShape {
    protected radius: number;
    constructor(startingPoint: CanvasWhiteboardPoint, radius: number, options: CanvasWhiteboardShapeOptions);
    draw(context: CanvasRenderingContext2D): void;
    deserialize(json: any): CanvasWhiteboardShape;
    serialize(item: any): any;
}
