"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var circle_shape_1 = require("./circle-shape");
var rectangle_shape_1 = require("./rectangle-shape");
var free_hand_shape_1 = require("./free-hand-shape");
var smiley_shape_1 = require("./smiley-shape");
var star_shape_1 = require("./star-shape");
var CanvasWhiteboardShapeService = (function () {
    function CanvasWhiteboardShapeService() {
        this._registeredShapesSubject = new BehaviorSubject_1.BehaviorSubject([free_hand_shape_1.FreeHandShape, rectangle_shape_1.RectangleShape, circle_shape_1.CircleShape, star_shape_1.StarShape, smiley_shape_1.SmileyShape]);
        this.registeredShapes$ = this._registeredShapesSubject.asObservable();
    }
    CanvasWhiteboardShapeService.prototype.getShapeConstructorFromShapeName = function (shapeName) {
        return this.getCurrentRegisteredShapes().find(function (shape) { return shape.name == shapeName; });
    };
    CanvasWhiteboardShapeService.prototype.getCurrentRegisteredShapes = function () {
        return this._registeredShapesSubject.getValue();
    };
    CanvasWhiteboardShapeService.prototype.isRegisteredShape = function (shape) {
        return this.getCurrentRegisteredShapes().indexOf(shape) != -1;
    };
    CanvasWhiteboardShapeService.prototype.registerShape = function (shape) {
        if (this.isRegisteredShape(shape)) {
            console.warn("You tried to register a shape:" + shape + ", but is has already been registered.");
            return;
        }
        var registeredShapes = this.getCurrentRegisteredShapes();
        registeredShapes.push(shape);
        this._registeredShapesSubject.next(registeredShapes);
    };
    CanvasWhiteboardShapeService.prototype.registerShapes = function (shapes) {
        var _this = this;
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes()
            .concat(shapes.filter(function (shape) {
            if (_this.isRegisteredShape(shape)) {
                console.warn("You tried to register a shape:" + shape + ", but is has already been registered.");
                return false;
            }
            return true;
        })));
    };
    return CanvasWhiteboardShapeService;
}());
CanvasWhiteboardShapeService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
CanvasWhiteboardShapeService.ctorParameters = function () { return []; };
exports.CanvasWhiteboardShapeService = CanvasWhiteboardShapeService;
//# sourceMappingURL=canvas-whiteboard-shape.service.js.map