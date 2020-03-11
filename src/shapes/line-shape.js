"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_whiteboard_shape_1 = require("./canvas-whiteboard-shape");
var canvas_whiteboard_point_1 = require("../canvas-whiteboard-point");
var LineShape = /** @class */ (function (_super) {
    __extends(LineShape, _super);
    function LineShape(positionPoint, options, endPosition) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.endPosition = endPosition || new canvas_whiteboard_point_1.CanvasWhiteboardPoint(_this.positionPoint.x, _this.positionPoint.y);
        return _this;
    }
    LineShape.prototype.getShapeName = function () {
        return 'LineShape';
    };
    LineShape.prototype.draw = function (context) {
        if (!this.endPosition) {
            return;
        }
        context.beginPath();
        Object.assign(context, this.options);
        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        context.lineTo(this.endPosition.x, this.endPosition.y);
        context.closePath();
        context.stroke();
    };
    LineShape.prototype.drawPreview = function (context) {
        this.positionPoint = new canvas_whiteboard_point_1.CanvasWhiteboardPoint(0, 0);
        this.endPosition = new canvas_whiteboard_point_1.CanvasWhiteboardPoint(context.canvas.width, context.canvas.height);
        this.draw(context);
    };
    LineShape.prototype.onUpdateReceived = function (update) {
        this.endPosition = new canvas_whiteboard_point_1.CanvasWhiteboardPoint(update.x, update.y);
    };
    return LineShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.LineShape = LineShape;
//# sourceMappingURL=line-shape.js.map