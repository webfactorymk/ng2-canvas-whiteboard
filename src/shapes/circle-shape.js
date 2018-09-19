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
var canvas_whiteboard_point_1 = require("../canvas-whiteboard-point");
var CircleShape = /** @class */ (function (_super) {
    __extends(CircleShape, _super);
    function CircleShape(positionPoint, options, radius) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.radius = radius || 0;
        return _this;
    }
    CircleShape.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);
        Object.assign(context, this.options);
        context.stroke();
        if (this.options.shouldFillShape) {
            context.fill();
        }
        context.closePath();
    };
    CircleShape.prototype.drawPreview = function (context) {
        this.positionPoint = new canvas_whiteboard_point_1.CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    };
    CircleShape.prototype.onUpdateReceived = function (update) {
        this.radius = this.calculateRadius(update.x, update.y);
    };
    CircleShape.prototype.calculateRadius = function (x, y) {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    };
    return CircleShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.CircleShape = CircleShape;
//# sourceMappingURL=circle-shape.js.map