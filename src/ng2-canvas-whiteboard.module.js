"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var canvas_whiteboard_component_1 = require("./canvas-whiteboard.component");
var common_1 = require("@angular/common");
var canvas_whiteboard_colorpicker_component_1 = require("./canvas-whiteboard-colorpicker.component");
var canvas_whiteboard_service_1 = require("./canvas-whiteboard.service");
var canvas_whiteboard_shape_service_1 = require("./shapes/canvas-whiteboard-shape.service");
var canvas_whiteboard_shape_selector_component_1 = require("./shapes/canvas-whiteboard-shape-selector.component");
var canvas_whiteboard_shape_preview_component_1 = require("./shapes/canvas-whiteboard-shape-preview.component");
var CanvasWhiteboardModule = /** @class */ (function () {
    function CanvasWhiteboardModule() {
    }
    CanvasWhiteboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                canvas_whiteboard_component_1.CanvasWhiteboardComponent,
                canvas_whiteboard_colorpicker_component_1.CanvasWhiteboardColorPickerComponent,
                canvas_whiteboard_shape_selector_component_1.CanvasWhiteboardShapeSelectorComponent,
                canvas_whiteboard_shape_preview_component_1.CanvasWhiteboardShapePreviewComponent
            ],
            providers: [
                canvas_whiteboard_service_1.CanvasWhiteboardService,
                canvas_whiteboard_shape_service_1.CanvasWhiteboardShapeService
            ],
            exports: [canvas_whiteboard_component_1.CanvasWhiteboardComponent]
        })
    ], CanvasWhiteboardModule);
    return CanvasWhiteboardModule;
}());
exports.CanvasWhiteboardModule = CanvasWhiteboardModule;
//# sourceMappingURL=ng2-canvas-whiteboard.module.js.map