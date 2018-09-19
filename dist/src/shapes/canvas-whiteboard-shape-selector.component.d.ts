import { ElementRef, EventEmitter } from "@angular/core";
import { CanvasWhiteboardShapeService, INewCanvasWhiteboardShape } from "./canvas-whiteboard-shape.service";
import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
import { Observable } from "rxjs/index";
export declare class CanvasWhiteboardShapeSelectorComponent {
    private _elementRef;
    private _canvasWhiteboardShapeService;
    readonly showShapeSelector: boolean;
    readonly selectedShapeConstructor: INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    readonly shapeOptions: CanvasWhiteboardShapeOptions;
    onToggleShapeSelector: EventEmitter<boolean>;
    onShapeSelected: EventEmitter<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>;
    registeredShapes$: Observable<INewCanvasWhiteboardShape<CanvasWhiteboardShape>[]>;
    constructor(_elementRef: ElementRef, _canvasWhiteboardShapeService: CanvasWhiteboardShapeService);
    selectShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): void;
    closeOnExternalClick(event: any): void;
    toggleShapeSelector(event: Event): void;
}
