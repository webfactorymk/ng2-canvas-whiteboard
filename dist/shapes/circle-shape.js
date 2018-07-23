"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_whiteboard_shape_1 = require("./canvas-whiteboard-shape");
var canvas_whiteboard_shape_options_1 = require("./canvas-whiteboard-shape-options");
var canvas_whiteboard_point_1 = require("../canvas-whiteboard-point");
var CircleShape = (function (_super) {
    __extends(CircleShape, _super);
    function CircleShape(startingPoint, radius, options) {
        var _this = _super.call(this, startingPoint, options) || this;
        _this.radius = radius;
        return _this;
    }
    CircleShape.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.startingPoint.x, this.startingPoint.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = this.options.strokeStyle;
        context.stroke();
        if (this.options.fillShape) {
            context.fillStyle = this.options.fillStyle;
            context.fill();
        }
        context.closePath();
    };
    CircleShape.prototype.deserialize = function (json) {
        var point = new canvas_whiteboard_point_1.CanvasWhiteboardPoint(0, 0);
        var radius = 0;
        return new CircleShape(point, radius, new canvas_whiteboard_shape_options_1.CanvasWhiteboardShapeOptions());
    };
    CircleShape.prototype.serialize = function (item) {
    };
    return CircleShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.CircleShape = CircleShape;
//# sourceMappingURL=circle-shape.js.map