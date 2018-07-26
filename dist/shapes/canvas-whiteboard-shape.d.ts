import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
import { CanvasWhiteboardUpdate } from "../canvas-whiteboard-update.model";
export declare abstract class CanvasWhiteboardShape {
    isVisible: boolean;
    protected positionPoint: CanvasWhiteboardPoint;
    protected options: CanvasWhiteboardShapeOptions;
    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions);
    abstract onUpdateReceived(update: CanvasWhiteboardUpdate): any;
    abstract onStopReceived(update: CanvasWhiteboardUpdate): any;
    abstract draw(context: CanvasRenderingContext2D): any;
}
