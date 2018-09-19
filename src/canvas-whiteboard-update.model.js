"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasWhiteboardUpdateType;
(function (CanvasWhiteboardUpdateType) {
    CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType["START"] = 0] = "START";
    CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType["DRAG"] = 1] = "DRAG";
    CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType["STOP"] = 2] = "STOP";
})(CanvasWhiteboardUpdateType = exports.CanvasWhiteboardUpdateType || (exports.CanvasWhiteboardUpdateType = {}));
var CanvasWhiteboardUpdate = /** @class */ (function () {
    function CanvasWhiteboardUpdate(x, y, type, UUID, selectedShape, selectedShapeOptions) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.UUID = UUID;
        this.selectedShape = selectedShape;
        this.selectedShapeOptions = selectedShapeOptions;
    }
    CanvasWhiteboardUpdate.deserializeJson = function (json) {
        var parsedJson;
        try {
            parsedJson = JSON.parse(json);
            return new CanvasWhiteboardUpdate(parsedJson['x'], parsedJson['y'], parsedJson['type'], parsedJson['uuid'], parsedJson['selectedShape'], parsedJson['selectedShapeOptions']);
        }
        catch (e) {
            console.error("The canvas whiteboard update is not p1" +
                "arseable");
            return null;
        }
    };
    CanvasWhiteboardUpdate.prototype.stringify = function () {
        var objectToSerialize = {
            x: this.x.toFixed(3),
            y: this.y.toFixed(3),
            type: this.type,
            uuid: this.UUID,
            selectedShape: this.selectedShape
        };
        if (this.selectedShapeOptions) {
            objectToSerialize["selectedShapeOptions"] = this.selectedShapeOptions;
        }
        return JSON.stringify(objectToSerialize);
    };
    return CanvasWhiteboardUpdate;
}());
exports.CanvasWhiteboardUpdate = CanvasWhiteboardUpdate;
//# sourceMappingURL=canvas-whiteboard-update.model.js.map