"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var canvas_whiteboard_shape_service_1 = require("./canvas-whiteboard-shape.service");
var CanvasWhiteboardShapeSelectorComponent = (function () {
    function CanvasWhiteboardShapeSelectorComponent(_elementRef, _canvasWhiteboardShapeService) {
        this._elementRef = _elementRef;
        this._canvasWhiteboardShapeService = _canvasWhiteboardShapeService;
        this.showShapeSelector = false;
        this.onToggleShapeSelector = new core_1.EventEmitter();
        this.onShapeSelected = new core_1.EventEmitter();
        this.registeredShapes$ = this._canvasWhiteboardShapeService.registeredShapes$;
    }
    CanvasWhiteboardShapeSelectorComponent.prototype.selectShape = function (shape) {
        this.onShapeSelected.emit(shape);
        this.toggleShapeSelector(null);
    };
    CanvasWhiteboardShapeSelectorComponent.prototype.closeOnExternalClick = function (event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showShapeSelector) {
            this.onToggleShapeSelector.emit(false);
        }
    };
    CanvasWhiteboardShapeSelectorComponent.prototype.toggleShapeSelector = function (event) {
        if (event) {
            event.preventDefault();
        }
        this.onToggleShapeSelector.emit(!this.showShapeSelector);
    };
    return CanvasWhiteboardShapeSelectorComponent;
}());
CanvasWhiteboardShapeSelectorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: "canvas-whiteboard-shape-selector",
                host: {
                    '(document:mousedown)': 'closeOnExternalClick($event)',
                    '(document:touchstart)': 'closeOnExternalClick($event)',
                },
                template: "\n        <div *ngIf=\"!showShapeSelector\" (click)=\"toggleShapeSelector($event)\" class=\"canvas-whiteboard-shape-selector-selected-preview\">\n            <canvas-whiteboard-shape-preview [shapeConstructor]=\"selectedShapeConstructor\" [shapeOptions]=\"shapeOptions\"></canvas-whiteboard-shape-preview>\n        </div>\n        <div class=\"canvas-whiteboard-shape-selector-wrapper\" *ngIf=\"showShapeSelector\">\n              <canvas-whiteboard-shape-preview *ngFor=\"let shapeConstructor of registeredShapes$ | async\" \n              [shapeConstructor]=\"shapeConstructor\"\n              [shapeOptions]=\"shapeOptions\"\n              (click)=\"selectShape(shapeConstructor)\"></canvas-whiteboard-shape-preview>\n        </div>\n    ",
                styles: ["\n        .canvas-whiteboard-shape-selector-selected-preview {\n             vertical-align: bottom;\n             display: inline-block;\n        }\n        \n        .canvas-whiteboard-shape-selector-wrapper {\n            display: block;\n            padding: 4px;\n            border: 1px solid #afafaf;\n        }\n\n        @media (min-width: 401px) {\n            .canvas-whiteboard-shape-selector-wrapper {\n            }\n        }\n    "]
            },] },
];
/** @nocollapse */
CanvasWhiteboardShapeSelectorComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: canvas_whiteboard_shape_service_1.CanvasWhiteboardShapeService, },
]; };
CanvasWhiteboardShapeSelectorComponent.propDecorators = {
    'showShapeSelector': [{ type: core_1.Input },],
    'selectedShapeConstructor': [{ type: core_1.Input },],
    'shapeOptions': [{ type: core_1.Input },],
    'onToggleShapeSelector': [{ type: core_1.Output },],
    'onShapeSelected': [{ type: core_1.Output },],
};
exports.CanvasWhiteboardShapeSelectorComponent = CanvasWhiteboardShapeSelectorComponent;
//# sourceMappingURL=canvas-whiteboard-shape-selector.component.js.map