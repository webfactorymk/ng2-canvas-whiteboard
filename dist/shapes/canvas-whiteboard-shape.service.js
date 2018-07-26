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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var circle_shape_1 = require("./circle-shape");
var rectangle_shape_1 = require("./rectangle-shape");
var free_hand_shape_1 = require("./free-hand-shape");
var smiley_shape_1 = require("./smiley-shape");
var CanvasWhiteboardShapeService = (function () {
    function CanvasWhiteboardShapeService() {
        this._registeredShapesSubject = new BehaviorSubject_1.BehaviorSubject([free_hand_shape_1.FreeHandShape, rectangle_shape_1.RectangleShape, circle_shape_1.CircleShape, smiley_shape_1.SmileyShape]);
        this.registeredShapes$ = this._registeredShapesSubject.asObservable();
    }
    CanvasWhiteboardShapeService.prototype.getCurrentRegisteredShapes = function () {
        return this._registeredShapesSubject.getValue();
    };
    CanvasWhiteboardShapeService.prototype.isRegisteredShape = function (shape) {
        return this.getCurrentRegisteredShapes().indexOf(shape) != -1;
    };
    CanvasWhiteboardShapeService.prototype.registerShape = function (shape) {
        var registeredShapes = this.getCurrentRegisteredShapes();
        registeredShapes.push(shape);
        this._registeredShapesSubject.next(registeredShapes);
    };
    CanvasWhiteboardShapeService.prototype.registerShapes = function (shapes) {
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes().concat(shapes));
    };
    return CanvasWhiteboardShapeService;
}());
CanvasWhiteboardShapeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CanvasWhiteboardShapeService);
exports.CanvasWhiteboardShapeService = CanvasWhiteboardShapeService;
//# sourceMappingURL=canvas-whiteboard-shape.service.js.map