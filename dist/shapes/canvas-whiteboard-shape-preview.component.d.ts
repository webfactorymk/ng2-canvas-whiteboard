import { ElementRef, OnDestroy, OnInit, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";
import { INewCanvasWhiteboardShape } from "./canvas-whiteboard-shape.service";
import { CanvasWhiteboardShape } from "./canvas-whiteboard-shape";
export declare class CanvasWhiteboardShapePreviewComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    canvas: ElementRef;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    drawShapePreview(): void;
    ngOnDestroy(): void;
}
