import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
import { CanvasWhiteboardUpdate } from "../canvas-whiteboard-update.model";
export declare class LineShape extends CanvasWhiteboardShape {
    endPosition: CanvasWhiteboardPoint;
    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions, endPosition?: CanvasWhiteboardPoint);
    draw(context: CanvasRenderingContext2D): void;
    drawPreview(context: CanvasRenderingContext2D): void;
    onUpdateReceived(update: CanvasWhiteboardUpdate): void;
}
