"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var circle_shape_1 = require("./circle-shape");
var rectangle_shape_1 = require("./rectangle-shape");
var CanvasWhiteboardShapeService = (function () {
    function CanvasWhiteboardShapeService() {
        this._registeredShapesSubject = new BehaviorSubject_1.BehaviorSubject([rectangle_shape_1.RectangleShape, circle_shape_1.CircleShape]);
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
CanvasWhiteboardShapeService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
CanvasWhiteboardShapeService.ctorParameters = function () { return []; };
exports.CanvasWhiteboardShapeService = CanvasWhiteboardShapeService;
//# sourceMappingURL=canvas-whiteboard-shape.service.js.map