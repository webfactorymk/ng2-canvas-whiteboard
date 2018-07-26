import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { Observable } from "rxjs/Observable";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
export interface INewableShape<T extends CanvasWhiteboardShape> {
    new (positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, ...args: any[]): T;
}
export declare class CanvasWhiteboardShapeService {
    private _registeredShapesSubject;
    registeredShapes$: Observable<INewableShape<CanvasWhiteboardShape>[]>;
    constructor();
    getCurrentRegisteredShapes(): INewableShape<CanvasWhiteboardShape>[];
    isRegisteredShape(shape: INewableShape<CanvasWhiteboardShape>): boolean;
    registerShape(shape: INewableShape<CanvasWhiteboardShape>): void;
    registerShapes(shapes: INewableShape<CanvasWhiteboardShape>[]): void;
}
