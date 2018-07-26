import {Injectable} from "@angular/core";
import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {CircleShape} from "./circle-shape";
import {RectangleShape} from "./rectangle-shape";
import {FreeHandShape} from "./free-hand-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {SmileyShape} from "./smiley-shape";

export interface INewableShape<T extends CanvasWhiteboardShape> {
    new(positionPoint: CanvasWhiteboardPoint, options: CanvasWhiteboardShapeOptions, ...args: any[]): T;
}

@Injectable()
export class CanvasWhiteboardShapeService {
    private _registeredShapesSubject: BehaviorSubject<INewableShape<CanvasWhiteboardShape>[]>;
    public registeredShapes$: Observable<INewableShape<CanvasWhiteboardShape>[]>;

    constructor() {
        this._registeredShapesSubject = new BehaviorSubject([FreeHandShape, RectangleShape, CircleShape, SmileyShape]);
        this.registeredShapes$ = this._registeredShapesSubject.asObservable();
    }

    getCurrentRegisteredShapes(): INewableShape<CanvasWhiteboardShape>[] {
        return this._registeredShapesSubject.getValue();
    }

    isRegisteredShape(shape: INewableShape<CanvasWhiteboardShape>) {
        return this.getCurrentRegisteredShapes().indexOf(shape) != -1;
    }

    registerShape(shape: INewableShape<CanvasWhiteboardShape>) {
        let registeredShapes = this.getCurrentRegisteredShapes();
        registeredShapes.push(shape);
        this._registeredShapesSubject.next(registeredShapes);
    }

    registerShapes(shapes: INewableShape<CanvasWhiteboardShape>[]) {
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes().concat(shapes));
    }
}