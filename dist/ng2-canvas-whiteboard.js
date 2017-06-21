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
var canvas_whiteboard_component_2 = require("./canvas-whiteboard.component");
exports.CanvasWhiteboardComponent = canvas_whiteboard_component_2.CanvasWhiteboardComponent;
var canvas_whiteboard_update_model_1 = require("./canvas-whiteboard-update.model");
exports.CanvasWhiteboardUpdate = canvas_whiteboard_update_model_1.CanvasWhiteboardUpdate;
var CanvasWhiteboardModule = (function () {
    function CanvasWhiteboardModule() {
    }
    return CanvasWhiteboardModule;
}());
CanvasWhiteboardModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            canvas_whiteboard_component_1.CanvasWhiteboardComponent,
            canvas_whiteboard_colorpicker_component_1.CanvasWhiteboardColorPickerComponent
        ],
        exports: [canvas_whiteboard_component_1.CanvasWhiteboardComponent]
    })
], CanvasWhiteboardModule);
exports.CanvasWhiteboardModule = CanvasWhiteboardModule;
//# sourceMappingURL=ng2-canvas-whiteboard.js.map