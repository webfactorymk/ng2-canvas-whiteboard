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
var RectangleShape = (function (_super) {
    __extends(RectangleShape, _super);
    function RectangleShape(startingPoint, width, height, options) {
        var _this = _super.call(this, startingPoint, options) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    RectangleShape.prototype.draw = function (context) {
        console.log("ABOUT TO DRAW RECTANGLE");
        context.beginPath();
        context.rect(this.startingPoint.x, this.startingPoint.y, this.width, this.height);
        context.strokeStyle = this.options.strokeStyle;
        context.stroke();
        if (this.options.fillShape) {
            context.fillStyle = this.options.fillStyle;
            context.fill();
        }
        context.closePath();
    };
    RectangleShape.prototype.deserialize = function (json) {
        var point = new canvas_whiteboard_point_1.CanvasWhiteboardPoint(0, 0);
        var width = 0;
        var height = 0;
        return new RectangleShape(point, width, height, new canvas_whiteboard_shape_options_1.CanvasWhiteboardShapeOptions());
    };
    RectangleShape.prototype.serialize = function (item) {
    };
    return RectangleShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.RectangleShape = RectangleShape;
//# sourceMappingURL=rectangle-shape.js.map