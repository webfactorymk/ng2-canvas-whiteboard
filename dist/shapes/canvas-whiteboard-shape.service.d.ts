import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { Observable } from "rxjs/Observable";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { CanvasWhiteboardPoint } from "../canvas-whiteboard-point";
export interface INewCanvasWhiteboardShape<T extends CanvasWhiteboardShape> {
    new (positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, ...args: any[]): T;
}
export declare class CanvasWhiteboardShapeService {
    private _registeredShapesSubject;
    registeredShapes$: Observable<INewCanvasWhiteboardShape<CanvasWhiteboardShape>[]>;
    constructor();
    getShapeConstructorFromShapeName(shapeName: string): INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    getCurrentRegisteredShapes(): INewCanvasWhiteboardShape<CanvasWhiteboardShape>[];
    isRegisteredShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): boolean;
    registerShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): void;
    registerShapes(shapes: INewCanvasWhiteboardShape<CanvasWhiteboardShape>[]): void;
}
