import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import {CanvasWhiteboardShapeService, INewCanvasWhiteboardShape} from "./canvas-whiteboard-shape.service";
import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {Observable} from "rxjs/Observable";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";

@Component({
    selector: "canvas-whiteboard-shape-selector",
    host: {
        '(document:mousedown)': 'closeOnExternalClick($event)',
        '(document:touchstart)': 'closeOnExternalClick($event)',
    },
    template: `
        <div *ngIf="!showShapeSelector" (click)="toggleShapeSelector($event)">
            <canvas-whiteboard-shape-preview [shapeConstructor]="selectedShapeConstructor" [shapeOptions]="shapeOptions"></canvas-whiteboard-shape-preview>
        </div>
        <div class="canvas-whiteboard-shape-selector-wrapper" *ngIf="showShapeSelector">
              <canvas-whiteboard-shape-preview *ngFor="let shapeConstructor of registeredShapes$ | async" 
              [shapeConstructor]="shapeConstructor"
              [shapeOptions]="shapeOptions"
              (click)="selectShape(shapeConstructor)"></canvas-whiteboard-shape-preview>
        </div>
    `,
    styles: [`
        .canvas-whiteboard-colorpicker {
            padding: 4px;
            background: #000;
            border: 1px solid #afafaf;
        }

        @media (min-width: 401px) {
            .canvas-whiteboard-colorpicker {
                position: absolute;
                top: 0;
                right: 100%;
            }
        }
    `]
})
export class CanvasWhiteboardShapeSelectorComponent {
    @Input() readonly showShapeSelector: boolean = false;
    @Input() readonly selectedShapeConstructor: INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    @Input() readonly shapeOptions: CanvasWhiteboardShapeOptions;

    @Output() onToggleShapeSelector = new EventEmitter<boolean>();
    @Output() onShapeSelected = new EventEmitter<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>();

    registeredShapes$: Observable<INewCanvasWhiteboardShape<CanvasWhiteboardShape>[]>;

    constructor(private _elementRef: ElementRef,
                private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService) {
        this.registeredShapes$ = this._canvasWhiteboardShapeService.registeredShapes$;
    }

    selectShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>) {
        this.onShapeSelected.emit(shape);
        this.toggleShapeSelector(null);
    }

    closeOnExternalClick(event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showShapeSelector) {
            this.onToggleShapeSelector.emit(false);
        }
    }

    toggleShapeSelector(event: Event) {
        if (event) {
            event.preventDefault();
        }

        this.onToggleShapeSelector.emit(!this.showShapeSelector);
    }
}