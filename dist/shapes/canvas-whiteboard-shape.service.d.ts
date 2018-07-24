import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { Observable } from "rxjs/Observable";
export interface INewableShape<T extends CanvasWhiteboardShape> {
    new (...args: any[]): T;
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
