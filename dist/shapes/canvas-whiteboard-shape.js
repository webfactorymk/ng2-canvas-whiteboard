"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_whiteboard_shape_options_1 = require("./canvas-whiteboard-shape-options");
var canvas_whiteboard_point_1 = require("../canvas-whiteboard-point");
var CanvasWhiteboardShape = (function () {
    function CanvasWhiteboardShape(startingPoint, options) {
        this.startingPoint = startingPoint || new canvas_whiteboard_point_1.CanvasWhiteboardPoint(0, 0);
        this.options = options || new canvas_whiteboard_shape_options_1.CanvasWhiteboardShapeOptions();
    }
    return CanvasWhiteboardShape;
}());
exports.CanvasWhiteboardShape = CanvasWhiteboardShape;
//# sourceMappingURL=canvas-whiteboard-shape.js.map