import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
import { Observable } from "rxjs/index";
export interface INewCanvasWhiteboardShape<T extends CanvasWhiteboardShape> {
    new (positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions, ...args: any[]): T;
}
export declare class CanvasWhiteboardShapeService {
    private _registeredShapesSubject;
    registeredShapes$: Observable<Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>>;
    constructor();
    getShapeConstructorFromShapeName(shapeName: string): INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    getCurrentRegisteredShapes(): Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>;
    isRegisteredShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): boolean;
    registerShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): void;
    registerShapes(shapes: Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>): void;
    unregisterShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): void;
    unregisterShapes(shapes: Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>): void;
}
