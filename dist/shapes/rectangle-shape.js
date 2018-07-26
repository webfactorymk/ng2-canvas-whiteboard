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
var RectangleShape = (function (_super) {
    __extends(RectangleShape, _super);
    function RectangleShape(positionPoint, options, width, height) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.width = width || 0;
        _this.height = height || 0;
        return _this;
    }
    RectangleShape.prototype.draw = function (context) {
        if (!this.width || !this.height)
            return;
        context.save();
        context.beginPath();
        context.rect(this.positionPoint.x, this.positionPoint.y, this.width, this.height);
        context.strokeStyle = this.options.strokeStyle;
        context.stroke();
        if (this.options.shouldFillShape) {
            context.fillStyle = this.options.fillStyle;
            context.fill();
        }
        context.closePath();
        context.restore();
    };
    RectangleShape.prototype.onUpdateReceived = function (update) {
        this.width = update.x - this.positionPoint.x;
        this.height = update.y - this.positionPoint.y;
    };
    RectangleShape.prototype.onStopReceived = function (update) {
    };
    return RectangleShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.RectangleShape = RectangleShape;
//# sourceMappingURL=rectangle-shape.js.map