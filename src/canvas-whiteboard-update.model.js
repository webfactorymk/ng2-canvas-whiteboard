"use strict";
exports.UPDATE_TYPE = {
    "start": 0,
    "drag": 1,
    "stop": 2
};
var CanvasWhiteboardUpdate = (function () {
    function CanvasWhiteboardUpdate(x, y, type) {
        this._x = x;
        this._y = y;
        this._type = type;
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
    CanvasWhiteboardUpdate.deserializeJson = function (json) {
        var x = json['x'];
        var y = json['y'];
        var type = json['type'];
        return new CanvasWhiteboardUpdate(x, y, type);
    };
    CanvasWhiteboardUpdate.prototype.serializeToJson = function () {
        var coordinatesJson = "{ \"x\": " + this._x.toFixed(3) + ", \"y\": " + this._y.toFixed(3) + ", \"type\": " + this._type + " }";
        return coordinatesJson;
    };
    return CanvasWhiteboardUpdate;
}());
exports.CanvasWhiteboardUpdate = CanvasWhiteboardUpdate;
