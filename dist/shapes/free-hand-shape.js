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
var FreeHandShape = (function (_super) {
    __extends(FreeHandShape, _super);
    function FreeHandShape(positionPoint, options) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.linePositions = [];
        return _this;
    }
    FreeHandShape.prototype.draw = function (context) {
        context.lineWidth = this.options.lineWidth;
        context.lineCap = this.options.lineCap;
        context.lineJoin = this.options.lineJoin;
        context.shadowBlur = this.options.shadowBlur;
        context.strokeStyle = this.options.strokeStyle;
        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        // let controlPoint = this.positionPoint;
        this.linePositions.forEach(function (linePosition) {
            context.lineTo(linePosition.x, linePosition.y);
            // let endingPoint: CanvasWhiteboardPoint = this._getBezierControlPoint(controlPoint, linePosition);
            // context.quadraticCurveTo(controlPoint.x, controlPoint.y, endingPoint.x, endingPoint.y);
            // controlPoint = linePosition;
        });
        context.stroke();
    };
    // private _getBezierControlPoint(firstPoint: CanvasWhiteboardPoint, secondPoint: CanvasWhiteboardPoint): CanvasWhiteboardPoint {
    //     return new CanvasWhiteboardPoint(
    //         firstPoint.x + ((secondPoint.x - firstPoint.x) / 2),
    //         firstPoint.y + ((secondPoint.y - firstPoint.y) / 2)
    //     );
    // }
    FreeHandShape.prototype.onUpdateReceived = function (update) {
        this.linePositions.push(new canvas_whiteboard_point_1.CanvasWhiteboardPoint(update.x, update.y));
    };
    FreeHandShape.prototype.onStopReceived = function (update) {
    };
    return FreeHandShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.FreeHandShape = FreeHandShape;
//# sourceMappingURL=free-hand-shape.js.map