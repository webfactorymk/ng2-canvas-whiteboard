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
var FreeHandShape = /** @class */ (function (_super) {
    __extends(FreeHandShape, _super);
    function FreeHandShape(positionPoint, options) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.linePositions = [];
        return _this;
    }
    FreeHandShape.prototype.draw = function (context) {
        Object.assign(context, this.options);
        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        // Draw a dot
        context.lineTo(this.positionPoint.x + 1, this.positionPoint.y + 1);
        // Normal fastest free hand drawing
        // this.linePositions.forEach((linePosition) => {
        //     context.lineTo(linePosition.x, linePosition.y);
        // });
        // Quadratic curves drawing
        var i = 0;
        while (i < this.linePositions.length) {
            if (this.linePositions.length - i > 2) {
                var controlPoint1 = this.linePositions[i];
                var controlPoint2 = this.linePositions[i + 1];
                var endPoint = this.linePositions[i + 2];
                context.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endPoint.x, endPoint.y);
                i += 2;
            }
            else {
                var linePosition = this.linePositions[i];
                context.lineTo(linePosition.x, linePosition.y);
                i += 1;
            }
        }
        context.stroke();
    };
    FreeHandShape.prototype.drawPreview = function (context) {
        this.positionPoint = new canvas_whiteboard_point_1.CanvasWhiteboardPoint(2, 2);
        this.linePositions = [
            new canvas_whiteboard_point_1.CanvasWhiteboardPoint(context.canvas.width - 5, context.canvas.height * 0.3),
            // new CanvasWhiteboardPoint(context.canvas.width * 0.4, context.canvas.height * 0.6),
            new canvas_whiteboard_point_1.CanvasWhiteboardPoint(context.canvas.width * 0.2, context.canvas.height * 0.4),
            new canvas_whiteboard_point_1.CanvasWhiteboardPoint(context.canvas.width * 0.6, context.canvas.height * 0.8),
            new canvas_whiteboard_point_1.CanvasWhiteboardPoint(context.canvas.width, context.canvas.height)
        ];
        this.draw(context);
    };
    FreeHandShape.prototype.onUpdateReceived = function (update) {
        this.linePositions.push(new canvas_whiteboard_point_1.CanvasWhiteboardPoint(update.x, update.y));
    };
    return FreeHandShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.FreeHandShape = FreeHandShape;
//# sourceMappingURL=free-hand-shape.js.map