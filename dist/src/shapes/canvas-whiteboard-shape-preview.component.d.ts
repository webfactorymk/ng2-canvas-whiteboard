import { ElementRef, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";
import { INewCanvasWhiteboardShape } from "./canvas-whiteboard-shape.service";
import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
import { CanvasWhiteboardShapeOptions } from "./canvas-whiteboard-shape-options";
export declare class CanvasWhiteboardShapePreviewComponent implements AfterViewInit, OnChanges {
    readonly shapeConstructor: INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    readonly shapeOptions: CanvasWhiteboardShapeOptions;
    canvas: ElementRef;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    drawShapePreview(): void;
}
