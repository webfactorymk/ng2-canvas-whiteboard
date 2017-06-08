"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_TYPE = {
    "start": 0,
    "drag": 1,
    "stop": 2
};
var CanvasWhiteboardUpdate = (function () {
    function CanvasWhiteboardUpdate(x, y, type, strokeColor, uuid, visible) {
        this._x = x;
        this._y = y;
        this._type = type;
        this._strokeColor = strokeColor;
        this._uuid = uuid;
        this._visible = visible;
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
    CanvasWhiteboardUpdate.prototype.setUUID = function (uuid) {
        this._uuid = uuid;
    };
    CanvasWhiteboardUpdate.prototype.getUUID = function () {
        return this._uuid;
    };
    CanvasWhiteboardUpdate.prototype.setVisible = function (visible) {
        this._visible = visible;
    };
    CanvasWhiteboardUpdate.prototype.getVisible = function () {
        return this._visible;
    };
    CanvasWhiteboardUpdate.deserializeJson = function (json) {
        return new CanvasWhiteboardUpdate(json['x'], json['y'], json['type'], json['stroke_color'], json['uuid'], json['visible']);
    };
    /**
     * @deprecated Use the stringify() method
     */
    CanvasWhiteboardUpdate.prototype.serializeToJson = function (onlyShowCoordinatesAndType) {
        if (onlyShowCoordinatesAndType === void 0) { onlyShowCoordinatesAndType = false; }
        return this.stringify(onlyShowCoordinatesAndType);
    };
    CanvasWhiteboardUpdate.prototype.stringify = function (onlyShowCoordinatesAndType) {
        if (onlyShowCoordinatesAndType === void 0) { onlyShowCoordinatesAndType = false; }
        var serializedUpdate = "{ \"x\": " + this._x.toFixed(3) + ", \"y\": " + this._y.toFixed(3) + ", \"type\": " + this._type;
        if (!onlyShowCoordinatesAndType) {
            serializedUpdate += this._strokeColor ? (", \"stroke_color\": " + this._strokeColor) : "";
            serializedUpdate += this._uuid ? (", \"uuid\": " + this._uuid) : "";
            serializedUpdate += this._visible != null ? (", \"visible\": " + this._visible) : "";
        }
        serializedUpdate += " }";
        return serializedUpdate;
    };
    return CanvasWhiteboardUpdate;
}());
exports.CanvasWhiteboardUpdate = CanvasWhiteboardUpdate;
//# sourceMappingURL=canvas-whiteboard-update.model.js.map