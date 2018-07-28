import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
import { CanvasWhiteboardUpdate } from "../canvas-whiteboard-update.model";
export declare class FreeHandShape extends CanvasWhiteboardShape {
    linePositions: CanvasWhiteboardPoint[];
    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions);
    draw(context: CanvasRenderingContext2D): void;
    drawPreview(context: CanvasRenderingContext2D): void;
    onUpdateReceived(update: CanvasWhiteboardUpdate): void;
}
