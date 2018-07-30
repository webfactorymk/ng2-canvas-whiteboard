import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
import { CanvasWhiteboardUpdate } from "../canvas-whiteboard-update.model";
export declare abstract class CanvasWhiteboardShape {
    isVisible: boolean;
    protected positionPoint: CanvasWhiteboardPoint;
    protected options: CanvasWhiteboardShapeOptions;
    constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions);
    abstract onUpdateReceived(update: CanvasWhiteboardUpdate): any;
    onStopReceived(update: CanvasWhiteboardUpdate): void;
    abstract draw(context: CanvasRenderingContext2D): any;
    abstract drawPreview(context: CanvasRenderingContext2D): any;
}
