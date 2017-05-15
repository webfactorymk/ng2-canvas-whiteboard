"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_TYPE = {
    "start": 0,
    "drag": 1,
    "stop": 2
};
var CanvasWhiteboardUpdate = (function () {
    function CanvasWhiteboardUpdate(x, y, type, _strokeColor) {
        this._x = x;
        this._y = y;
        this._type = type;
        this._strokeColor = _strokeColor;
    }
    CanvasWhiteboardUpdate.prototype.setX = function (newX) {
        this._x = newX;
    };
    CanvasWhiteboardUpdate.prototype.getX = function () {
        return this._x;
    };
    CanvasWhiteboardUpdate.prototype.setY = function (newY) {
        this._y = newY;
    };
    CanvasWhiteboardUpdate.prototype.getType = function () {
        return this._type;
    };
    CanvasWhiteboardUpdate.prototype.getY = function () {
        return this._y;
    };
    CanvasWhiteboardUpdate.prototype.setStrokeColor = function (strokeColor) {
        this._strokeColor = strokeColor;
    };
    CanvasWhiteboardUpdate.prototype.getStrokeColor = function () {
        return this._strokeColor;
    };
    CanvasWhiteboardUpdate.deserializeJson = function (json) {
        return new CanvasWhiteboardUpdate(json['x'], json['y'], json['type'], json['stroke_color']);
    };
    CanvasWhiteboardUpdate.prototype.serializeToJson = function () {
        return "{ \"x\": " + this._x.toFixed(3) + ", \"y\": " + this._y.toFixed(3) + ", \"type\": " + this._type + this._strokeColor ? (", \"stroke_color\":" + this._strokeColor) : "";
    };
    return CanvasWhiteboardUpdate;
}());
exports.CanvasWhiteboardUpdate = CanvasWhiteboardUpdate;
//# sourceMappingURL=canvas-whiteboard-update.model.js.map