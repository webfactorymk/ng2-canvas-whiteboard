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
var StarShape = (function (_super) {
    __extends(StarShape, _super);
    function StarShape(positionPoint, options, radius, spikes) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.radius = radius || 0;
        _this.spikes = _this.spikes || 5;
        return _this;
    }
    StarShape.prototype.draw = function (context) {
        Object.assign(context, this.options);
        // context.lineWidth = this.options.lineWidth;
        // context.lineCap = this.options.lineCap;
        // context.lineJoin = this.options.lineJoin;
        // context.shadowBlur = this.options.shadowBlur;
        // context.strokeStyle = this.options.strokeStyle;
        // context.fillStyle = this.options.fillStyle;
        var rotation = Math.PI / 2 * 3;
        var spikeX = this.positionPoint.x;
        var spikeY = this.positionPoint.y;
        var step = Math.PI / this.spikes;
        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y - this.radius);
        for (var i = 0; i < this.spikes; i++) {
            spikeX = this.positionPoint.x + Math.cos(rotation) * this.radius;
            spikeY = this.positionPoint.y + Math.sin(rotation) * this.radius;
            context.lineTo(spikeX, spikeY);
            rotation += step;
            spikeX = this.positionPoint.x + Math.cos(rotation) * (this.radius * 0.4);
            spikeY = this.positionPoint.y + Math.sin(rotation) * (this.radius * 0.4);
            context.lineTo(spikeX, spikeY);
            rotation += step;
            context.stroke();
        }
        context.lineTo(this.positionPoint.x, this.positionPoint.y - this.radius);
        context.closePath();
        context.stroke();
        if (this.options.shouldFillShape) {
            context.fill();
        }
    };
    StarShape.prototype.onUpdateReceived = function (update) {
        this.radius = Math.sqrt(Math.pow(update.x - this.positionPoint.x, 2) + Math.pow(update.y - this.positionPoint.y, 2));
    };
    StarShape.prototype.onStopReceived = function (update) {
    };
    return StarShape;
}(canvas_whiteboard_shape_1.CanvasWhiteboardShape));
exports.StarShape = StarShape;
//# sourceMappingURL=star-shape.js.map