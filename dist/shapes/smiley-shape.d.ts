import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
import { CanvasWhiteboardUpdate } from "../canvas-whiteboard-update.model";
export declare class SmileyShape extends CanvasWhiteboardShape {
    radius: number;
    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions, radius?: number);
    draw(context: CanvasRenderingContext2D): void;
    drawPreview(context: CanvasRenderingContext2D): void;
    onUpdateReceived(update: CanvasWhiteboardUpdate): void;
    calculateRadius(x: number, y: number): number;
}
