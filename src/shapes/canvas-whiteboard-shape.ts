import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export abstract class CanvasWhiteboardShape {
    isVisible: boolean;
    protected positionPoint: CanvasWhiteboardPoint;
    protected options: CanvasWhiteboardShapeOptions;

    constructor(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions) {
        this.positionPoint = positionPoint || new CanvasWhiteboardPoint(0, 0);
        this.options = options || new CanvasWhiteboardShapeOptions();
        this.isVisible = true;
    }

    abstract onUpdateReceived(update: CanvasWhiteboardUpdate);

    abstract onStopReceived(update: CanvasWhiteboardUpdate);

    abstract draw(context: CanvasRenderingContext2D);
}