"use strict";
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
CanvasWhiteboardShapePreviewComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: "canvas-whiteboard-shape-preview",
                template: "\n        <canvas #canvasWhiteboardShapePreview width=\"50px\" height=\"50px\" class=\"canvas-whiteboard-shape-preview-canvas\"></canvas>\n    ",
                styles: ["\n        .canvas-whiteboard-shape-preview-canvas {\n            cursor: pointer;\n        }\n    "]
            },] },
];
/** @nocollapse */
CanvasWhiteboardShapePreviewComponent.ctorParameters = function () { return []; };
CanvasWhiteboardShapePreviewComponent.propDecorators = {
    'shapeConstructor': [{ type: core_1.Input },],
    'shapeOptions': [{ type: core_1.Input },],
    'canvas': [{ type: core_1.ViewChild, args: ['canvasWhiteboardShapePreview',] },],
};
exports.CanvasWhiteboardShapePreviewComponent = CanvasWhiteboardShapePreviewComponent;
//# sourceMappingURL=canvas-whiteboard-shape-preview.component.js.map