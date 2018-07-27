"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var canvas_whiteboard_shape_service_1 = require("./canvas-whiteboard-shape.service");
var canvas_whiteboard_shape_options_1 = require("./canvas-whiteboard-shape-options");
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CanvasWhiteboardShapeSelectorComponent.prototype, "showShapeSelector", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CanvasWhiteboardShapeSelectorComponent.prototype, "selectedShapeConstructor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", canvas_whiteboard_shape_options_1.CanvasWhiteboardShapeOptions)
], CanvasWhiteboardShapeSelectorComponent.prototype, "shapeOptions", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CanvasWhiteboardShapeSelectorComponent.prototype, "onToggleShapeSelector", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CanvasWhiteboardShapeSelectorComponent.prototype, "onShapeSelected", void 0);
CanvasWhiteboardShapeSelectorComponent = __decorate([
    core_1.Component({
        selector: "canvas-whiteboard-shape-selector",
        host: {
            '(document:mousedown)': 'closeOnExternalClick($event)',
            '(document:touchstart)': 'closeOnExternalClick($event)',
        },
        template: "\n        <div *ngIf=\"!showShapeSelector\" (click)=\"toggleShapeSelector($event)\" class=\"canvas-whiteboard-shape-selector-selected-preview\">\n            <canvas-whiteboard-shape-preview [shapeConstructor]=\"selectedShapeConstructor\" [shapeOptions]=\"shapeOptions\"></canvas-whiteboard-shape-preview>\n        </div>\n        <div class=\"canvas-whiteboard-shape-selector-wrapper\" *ngIf=\"showShapeSelector\">\n              <canvas-whiteboard-shape-preview *ngFor=\"let shapeConstructor of registeredShapes$ | async\" \n              [shapeConstructor]=\"shapeConstructor\"\n              [shapeOptions]=\"shapeOptions\"\n              (click)=\"selectShape(shapeConstructor)\"></canvas-whiteboard-shape-preview>\n        </div>\n    ",
        styles: ["\n        .canvas-whiteboard-shape-selector-selected-preview {\n             vertical-align: bottom;\n             display: inline-block;\n        }\n        \n        .canvas-whiteboard-shape-selector-wrapper {\n            display: inline-block;\n            padding: 4px;\n            border: 1px solid #afafaf;\n        }\n\n        @media (min-width: 401px) {\n            .canvas-whiteboard-shape-selector-wrapper {\n                position: absolute;\n                top: 0;\n                right: 100%;\n            }\n        }\n    "]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        canvas_whiteboard_shape_service_1.CanvasWhiteboardShapeService])
], CanvasWhiteboardShapeSelectorComponent);
exports.CanvasWhiteboardShapeSelectorComponent = CanvasWhiteboardShapeSelectorComponent;
//# sourceMappingURL=canvas-whiteboard-shape-selector.component.js.map