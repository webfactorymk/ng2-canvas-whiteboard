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
var canvas_whiteboard_point_1 = require("../canvas-whiteboard-point");
var canvas_whiteboard_shape_options_1 = require("./canvas-whiteboard-shape-options");
var CanvasWhiteboardShapePreviewComponent = (function () {
    function CanvasWhiteboardShapePreviewComponent() {
    }
    CanvasWhiteboardShapePreviewComponent.prototype.ngOnInit = function () {
    };
    CanvasWhiteboardShapePreviewComponent.prototype.ngAfterViewInit = function () {
        this.drawShapePreview();
    };
    CanvasWhiteboardShapePreviewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.shapeConstructor || changes.shapeOptions) {
            this.drawShapePreview();
        }
    };
    CanvasWhiteboardShapePreviewComponent.prototype.drawShapePreview = function () {
        if (!this.canvas)
            return;
        var context = this.canvas.nativeElement.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        var concreteShape = new this.shapeConstructor(new canvas_whiteboard_point_1.CanvasWhiteboardPoint(0, 0), Object.assign(new canvas_whiteboard_shape_options_1.CanvasWhiteboardShapeOptions(), this.shapeOptions));
        concreteShape.drawPreview(context);
    };
    CanvasWhiteboardShapePreviewComponent.prototype.ngOnDestroy = function () {
    };
    return CanvasWhiteboardShapePreviewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CanvasWhiteboardShapePreviewComponent.prototype, "shapeConstructor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", canvas_whiteboard_shape_options_1.CanvasWhiteboardShapeOptions)
], CanvasWhiteboardShapePreviewComponent.prototype, "shapeOptions", void 0);
__decorate([
    core_1.ViewChild('canvasWhiteboardShapePreview'),
    __metadata("design:type", core_1.ElementRef)
], CanvasWhiteboardShapePreviewComponent.prototype, "canvas", void 0);
CanvasWhiteboardShapePreviewComponent = __decorate([
    core_1.Component({
        selector: "canvas-whiteboard-shape-preview",
        template: "\n        <canvas #canvasWhiteboardShapePreview width=\"50px\" height=\"50px\" class=\"canvas-whiteboard-shape-preview-canvas\"></canvas>\n    ",
        styles: ["\n        .canvas-whiteboard-shape-preview-canvas {\n            cursor: pointer;\n        }\n    "]
    })
], CanvasWhiteboardShapePreviewComponent);
exports.CanvasWhiteboardShapePreviewComponent = CanvasWhiteboardShapePreviewComponent;
//# sourceMappingURL=canvas-whiteboard-shape-preview.component.js.map