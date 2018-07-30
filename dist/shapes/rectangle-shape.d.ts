import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
import { CanvasWhiteboardUpdate } from "../canvas-whiteboard-update.model";
export declare class RectangleShape extends CanvasWhiteboardShape {
    width: number;
    height: number;
    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions, width?: number, height?: number);
    draw(context: CanvasRenderingContext2D): void;
    drawPreview(context: CanvasRenderingContext2D): void;
    onUpdateReceived(update: CanvasWhiteboardUpdate): void;
}
