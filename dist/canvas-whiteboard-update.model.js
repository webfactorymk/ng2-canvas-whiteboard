"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasWhiteboardUpdateType;
(function (CanvasWhiteboardUpdateType) {
    CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType["START"] = 0] = "START";
    CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType["DRAG"] = 1] = "DRAG";
    CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType["STOP"] = 2] = "STOP";
})(CanvasWhiteboardUpdateType = exports.CanvasWhiteboardUpdateType || (exports.CanvasWhiteboardUpdateType = {}));
var CanvasWhiteboardUpdate = (function () {
    function CanvasWhiteboardUpdate(x, y, type, UUID, selectedShape, selectedShapeOptions) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.UUID = UUID;
        this.selectedShape = selectedShape;
        this.selectedShapeOptions = selectedShapeOptions;
    }
    CanvasWhiteboardUpdate.deserializeJson = function (json) {
        return JSON.parse(json);
        // r new CanvasWhiteboardUpdate(json['x'], json['y'], json['type'], json['stroke_color'], json['uuid'], json['visible']);
    };
    CanvasWhiteboardUpdate.prototype.stringify = function () {
        var objectToSerialize = {
            x: this.x.toFixed(3),
            y: this.y.toFixed(3),
            type: this.type,
            uuid: this.UUID
        };
        if (this.selectedShape) {
            objectToSerialize["selectedShape"] = this.selectedShape.name;
        }
        if (this.selectedShapeOptions) {
            objectToSerialize["selectedShapeOptions"] = this.selectedShapeOptions;
        }
        return JSON.stringify(objectToSerialize);
        // let serializedUpdate = "{ \"x\": " + this._x.toFixed(3) + ", \"y\": " + this._y.toFixed(3) + ", \"type\": " + this._type;
        //
        // if (!onlyShowCoordinatesAndType) {
        //     serializedUpdate += this._strokeColor ? (", \"stroke_color\": " + JSON.stringify(this._strokeColor)) : "";
        //     serializedUpdate += this._uuid ? (", \"uuid\": " + JSON.stringify(this._uuid)) : "";
        //     serializedUpdate += this._visible != null ? (", \"visible\": " + this._visible) : "";
        // }
        // serializedUpdate += " }";
        //
        // return serializedUpdate;
    };
    return CanvasWhiteboardUpdate;
}());
exports.CanvasWhiteboardUpdate = CanvasWhiteboardUpdate;
//# sourceMappingURL=canvas-whiteboard-update.model.js.map