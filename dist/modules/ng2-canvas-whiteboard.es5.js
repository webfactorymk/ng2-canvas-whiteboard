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
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Injectable, Input, NgModule, NgZone, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs/index';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { CommonModule } from '@angular/common';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var CanvasWhiteboardUpdateType = {
    START: 0,
    DRAG: 1,
    STOP: 2,
};
CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType.START] = 'START';
CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType.DRAG] = 'DRAG';
CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType.STOP] = 'STOP';
var CanvasWhiteboardUpdate = /** @class */ (function () {
    /**
     * @param {?=} x
     * @param {?=} y
     * @param {?=} type
     * @param {?=} UUID
     * @param {?=} selectedShape
     * @param {?=} selectedShapeOptions
     */
    function CanvasWhiteboardUpdate(x, y, type, UUID, selectedShape, selectedShapeOptions) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.UUID = UUID;
        this.selectedShape = selectedShape;
        this.selectedShapeOptions = selectedShapeOptions;
    }
    /**
     * @param {?} json
     * @return {?}
     */
    CanvasWhiteboardUpdate.deserializeJson = function (json) {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    CanvasWhiteboardUpdate.prototype.stringify = function () {
        /** @type {?} */
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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_STYLES = "\n.canvas_whiteboard_button {\n    display: inline-block;\n    outline: 0px;\n    padding-top: 7px;\n    margin-bottom: 0;\n    font-size: 14px;\n    font-weight: 400;\n    line-height: 1.42857143;\n    text-align: center;\n    white-space: nowrap;\n    vertical-align: middle;\n    -ms-touch-action: manipulation;\n    touch-action: manipulation;\n    cursor: pointer;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    background-image: none;\n    border: 1px solid transparent;\n    border-radius: 4px;\n}\n\n.canvas_whiteboard_buttons { \n    z-index: 3;\n}\n\n@media (max-width: 400px) {\n     .canvas_whiteboard_buttons {\n            position: absolute;\n            z-inde\n            top: 0;\n            width: 100%;\n            text-align: center;\n      }\n}\n        \n@media (min-width: 401px) { \n    .canvas_whiteboard_buttons {\n        position: absolute;\n        right: 0%;\n        color: #fff;\n    }\n}\n\n.canvas_whiteboard_buttons {\n    padding: 5px;\n}\n\n.canvas_whiteboard_buttons > button {\n    margin: 5px;\n}\n\n.canvas_whiteboard_button-draw_animated {\n    -webkit-animation: pulsate 1s ease-out;\n    -webkit-animation-iteration-count: infinite;\n}\n\n@-webkit-keyframes pulsate {\n    0% {\n        -webkit-transform: scale(0.1, 0.1);\n        opacity: 0.0;\n    }\n    50% {\n        opacity: 1.0;\n    }\n    100% {\n        -webkit-transform: scale(1.2, 1.2);\n        opacity: 0.0;\n    }\n}\n.canvas_wrapper_div {\n    width: 100%;\n    height: 100%;\n    border: 0.5px solid #e2e2e2;\n}\n\n.canvas_whiteboard_button-clear {\n    padding-top: 5px;\n}\n\n.canvas_whiteboard {\n    position: absolute;\n    z-index: 1;\n}\n\n.incomplete_shapes_canvas_whiteboard {\n    position: absolute;\n    z-index: 2;\n}\n\n";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardService = /** @class */ (function () {
    function CanvasWhiteboardService() {
        this._canvasDrawSubject = new Subject();
        this.canvasDrawSubject$ = this._canvasDrawSubject.asObservable();
        this._canvasClearSubject = new Subject();
        this.canvasClearSubject$ = this._canvasClearSubject.asObservable();
        this._canvasUndoSubject = new Subject();
        this.canvasUndoSubject$ = this._canvasUndoSubject.asObservable();
        this._canvasRedoSubject = new Subject();
        this.canvasRedoSubject$ = this._canvasRedoSubject.asObservable();
    }
    /**
     * @param {?} updates
     * @return {?}
     */
    CanvasWhiteboardService.prototype.drawCanvas = function (updates) {
        this._canvasDrawSubject.next(updates);
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardService.prototype.clearCanvas = function () {
        this._canvasClearSubject.next();
    };
    /**
     * @param {?} updateUUD
     * @return {?}
     */
    CanvasWhiteboardService.prototype.undoCanvas = function (updateUUD) {
        this._canvasUndoSubject.next(updateUUD);
    };
    /**
     * @param {?} updateUUD
     * @return {?}
     */
    CanvasWhiteboardService.prototype.redoCanvas = function (updateUUD) {
        this._canvasRedoSubject.next(updateUUD);
    };
    return CanvasWhiteboardService;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardPoint = /** @class */ (function () {
    /**
     * @param {?} x
     * @param {?} y
     */
    function CanvasWhiteboardPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return CanvasWhiteboardPoint;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardShapeOptions = /** @class */ (function () {
    function CanvasWhiteboardShapeOptions() {
        this.shouldFillShape = false;
        this.fillStyle = null;
        this.strokeStyle = "rgba(0,0,0,1)";
        this.lineWidth = 2;
        this.lineJoin = "round";
        this.lineCap = "round";
    }
    return CanvasWhiteboardShapeOptions;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var CanvasWhiteboardShape = /** @class */ (function () {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     */
    function CanvasWhiteboardShape(positionPoint, options) {
        this.positionPoint = positionPoint || new CanvasWhiteboardPoint(0, 0);
        this.options = options || new CanvasWhiteboardShapeOptions();
        this.isVisible = true;
    }
    /**
     * @param {?} update
     * @return {?}
     */
    CanvasWhiteboardShape.prototype.onStopReceived = function (update) {
    };
    return CanvasWhiteboardShape;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CircleShape = /** @class */ (function (_super) {
    __extends(CircleShape, _super);
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} radius
     */
    function CircleShape(positionPoint, options, radius) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.radius = radius || 0;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    CircleShape.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);
        Object.assign(context, this.options);
        context.stroke();
        if (this.options.shouldFillShape) {
            context.fill();
        }
        context.closePath();
    };
    /**
     * @param {?} context
     * @return {?}
     */
    CircleShape.prototype.drawPreview = function (context) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    };
    /**
     * @param {?} update
     * @return {?}
     */
    CircleShape.prototype.onUpdateReceived = function (update) {
        this.radius = this.calculateRadius(update.x, update.y);
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    CircleShape.prototype.calculateRadius = function (x, y) {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    };
    return CircleShape;
}(CanvasWhiteboardShape));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RectangleShape = /** @class */ (function (_super) {
    __extends(RectangleShape, _super);
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} width
     * @param {?=} height
     */
    function RectangleShape(positionPoint, options, width, height) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.width = width || 0;
        _this.height = height || 0;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    RectangleShape.prototype.draw = function (context) {
        if (!this.width || !this.height) {
            return;
        }
        context.beginPath();
        Object.assign(context, this.options);
        context.rect(this.positionPoint.x, this.positionPoint.y, this.width, this.height);
        context.stroke();
        if (this.options.shouldFillShape) {
            context.fill();
        }
        context.closePath();
    };
    /**
     * @param {?} context
     * @return {?}
     */
    RectangleShape.prototype.drawPreview = function (context) {
        this.positionPoint = new CanvasWhiteboardPoint(2, 2);
        this.width = context.canvas.width - 4;
        this.height = context.canvas.height - 4;
        this.draw(context);
    };
    /**
     * @param {?} update
     * @return {?}
     */
    RectangleShape.prototype.onUpdateReceived = function (update) {
        this.width = update.x - this.positionPoint.x;
        this.height = update.y - this.positionPoint.y;
    };
    return RectangleShape;
}(CanvasWhiteboardShape));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FreeHandShape = /** @class */ (function (_super) {
    __extends(FreeHandShape, _super);
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     */
    function FreeHandShape(positionPoint, options) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.linePositions = [];
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    FreeHandShape.prototype.draw = function (context) {
        Object.assign(context, this.options);
        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        // Draw a dot
        context.lineTo(this.positionPoint.x + 1, this.positionPoint.y + 1);
        /** @type {?} */
        var i = 0;
        while (i < this.linePositions.length) {
            if (this.linePositions.length - i > 2) {
                /** @type {?} */
                var controlPoint1 = this.linePositions[i];
                /** @type {?} */
                var controlPoint2 = this.linePositions[i + 1];
                /** @type {?} */
                var endPoint = this.linePositions[i + 2];
                context.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endPoint.x, endPoint.y);
                i += 2;
            }
            else {
                /** @type {?} */
                var linePosition = this.linePositions[i];
                context.lineTo(linePosition.x, linePosition.y);
                i += 1;
            }
        }
        context.stroke();
    };
    /**
     * @param {?} context
     * @return {?}
     */
    FreeHandShape.prototype.drawPreview = function (context) {
        this.positionPoint = new CanvasWhiteboardPoint(2, 2);
        this.linePositions = [
            new CanvasWhiteboardPoint(context.canvas.width - 5, context.canvas.height * 0.3),
            // new CanvasWhiteboardPoint(context.canvas.width * 0.4, context.canvas.height * 0.6),
            new CanvasWhiteboardPoint(context.canvas.width * 0.2, context.canvas.height * 0.4),
            new CanvasWhiteboardPoint(context.canvas.width * 0.6, context.canvas.height * 0.8),
            new CanvasWhiteboardPoint(context.canvas.width, context.canvas.height)
        ];
        this.draw(context);
    };
    /**
     * @param {?} update
     * @return {?}
     */
    FreeHandShape.prototype.onUpdateReceived = function (update) {
        this.linePositions.push(new CanvasWhiteboardPoint(update.x, update.y));
    };
    return FreeHandShape;
}(CanvasWhiteboardShape));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SmileyShape = /** @class */ (function (_super) {
    __extends(SmileyShape, _super);
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} radius
     */
    function SmileyShape(positionPoint, options, radius) {
        var _this = _super.call(this, positionPoint, options) || this;
        options.shouldFillShape = true;
        options.fillStyle = options.fillStyle || "yellow";
        _this.radius = radius || 0;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    SmileyShape.prototype.draw = function (context) {
        context.beginPath();
        Object.assign(context, this.options);
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.stroke();
        context.beginPath();
        /** @type {?} */
        var leftEyeX = this.positionPoint.x - this.radius * 0.3;
        /** @type {?} */
        var rightEyeX = this.positionPoint.x + this.radius * 0.3;
        /** @type {?} */
        var eyesY = this.positionPoint.y - this.radius * 0.2;
        /** @type {?} */
        var eyeSize = this.radius * 0.1;
        context.arc(leftEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.arc(rightEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.fillStyle = this.options.strokeStyle;
        context.fill();
        // draw the mouth
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius * 0.7, 0, Math.PI, false);
        context.stroke();
        context.closePath();
    };
    /**
     * @param {?} context
     * @return {?}
     */
    SmileyShape.prototype.drawPreview = function (context) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    };
    /**
     * @param {?} update
     * @return {?}
     */
    SmileyShape.prototype.onUpdateReceived = function (update) {
        this.radius = this.calculateRadius(update.x, update.y);
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    SmileyShape.prototype.calculateRadius = function (x, y) {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    };
    return SmileyShape;
}(CanvasWhiteboardShape));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StarShape = /** @class */ (function (_super) {
    __extends(StarShape, _super);
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} radius
     * @param {?=} spikes
     */
    function StarShape(positionPoint, options, radius, spikes) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.radius = radius || 0;
        _this.spikes = _this.spikes || 5;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    StarShape.prototype.draw = function (context) {
        Object.assign(context, this.options);
        /** @type {?} */
        var rotation = Math.PI / 2 * 3;
        /** @type {?} */
        var spikeX = this.positionPoint.x;
        /** @type {?} */
        var spikeY = this.positionPoint.y;
        /** @type {?} */
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
    /**
     * @param {?} context
     * @return {?}
     */
    StarShape.prototype.drawPreview = function (context) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    };
    /**
     * @param {?} update
     * @return {?}
     */
    StarShape.prototype.onUpdateReceived = function (update) {
        this.radius = this.calculateRadius(update.x, update.y);
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    StarShape.prototype.calculateRadius = function (x, y) {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    };
    return StarShape;
}(CanvasWhiteboardShape));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LineShape = /** @class */ (function (_super) {
    __extends(LineShape, _super);
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} endPosition
     */
    function LineShape(positionPoint, options, endPosition) {
        var _this = _super.call(this, positionPoint, options) || this;
        _this.endPosition = endPosition || new CanvasWhiteboardPoint(_this.positionPoint.x, _this.positionPoint.y);
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
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
    /**
     * @param {?} context
     * @return {?}
     */
    LineShape.prototype.drawPreview = function (context) {
        this.positionPoint = new CanvasWhiteboardPoint(0, 0);
        this.endPosition = new CanvasWhiteboardPoint(context.canvas.width, context.canvas.height);
        this.draw(context);
    };
    /**
     * @param {?} update
     * @return {?}
     */
    LineShape.prototype.onUpdateReceived = function (update) {
        this.endPosition = new CanvasWhiteboardPoint(update.x, update.y);
    };
    return LineShape;
}(CanvasWhiteboardShape));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @record
 * @template T
 */
var CanvasWhiteboardShapeService = /** @class */ (function () {
    function CanvasWhiteboardShapeService() {
        this._registeredShapesSubject = new BehaviorSubject([
            FreeHandShape,
            LineShape,
            RectangleShape,
            CircleShape,
            StarShape,
            SmileyShape
        ]);
        this.registeredShapes$ = this._registeredShapesSubject.asObservable();
    }
    /**
     * @param {?} shapeName
     * @return {?}
     */
    CanvasWhiteboardShapeService.prototype.getShapeConstructorFromShapeName = function (shapeName) {
        return this.getCurrentRegisteredShapes().find(function (shape) { return shape.name === shapeName; });
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardShapeService.prototype.getCurrentRegisteredShapes = function () {
        return this._registeredShapesSubject.getValue();
    };
    /**
     * @param {?} shape
     * @return {?}
     */
    CanvasWhiteboardShapeService.prototype.isRegisteredShape = function (shape) {
        return this.getCurrentRegisteredShapes().indexOf(shape) !== -1;
    };
    /**
     * @param {?} shape
     * @return {?}
     */
    CanvasWhiteboardShapeService.prototype.registerShape = function (shape) {
        if (this.isRegisteredShape(shape)) {
            console.warn("You tried to register a shape:" + shape + ", but is has already been registered.");
            return;
        }
        /** @type {?} */
        var registeredShapes = this.getCurrentRegisteredShapes();
        registeredShapes.push(shape);
        this._registeredShapesSubject.next(registeredShapes);
    };
    /**
     * @param {?} shapes
     * @return {?}
     */
    CanvasWhiteboardShapeService.prototype.registerShapes = function (shapes) {
        var _this = this;
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes()
            .concat(shapes.filter(function (shape) {
            if (_this.isRegisteredShape(shape)) {
                console.warn("You tried to register a shape:" + shape + ", but is has already been registered.");
                return false;
            }
            return true;
        })));
    };
    /**
     * @param {?} shape
     * @return {?}
     */
    CanvasWhiteboardShapeService.prototype.unregisterShape = function (shape) {
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes().filter(function (registeredShape) { return registeredShape !== shape; }));
    };
    /**
     * @param {?} shapes
     * @return {?}
     */
    CanvasWhiteboardShapeService.prototype.unregisterShapes = function (shapes) {
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes().filter(function (shape) { return shapes.indexOf(shape) === -1; }));
    };
    return CanvasWhiteboardShapeService;
}());
CanvasWhiteboardShapeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CanvasWhiteboardShapeService.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardComponent = /** @class */ (function () {
    /**
     * @param {?} ngZone
     * @param {?} _changeDetector
     * @param {?} _canvasWhiteboardService
     * @param {?} _canvasWhiteboardShapeService
     */
    function CanvasWhiteboardComponent(ngZone, _changeDetector, _canvasWhiteboardService, _canvasWhiteboardShapeService) {
        this.ngZone = ngZone;
        this._changeDetector = _changeDetector;
        this._canvasWhiteboardService = _canvasWhiteboardService;
        this._canvasWhiteboardShapeService = _canvasWhiteboardShapeService;
        // Number of ms to wait before sending out the updates as an array
        this.batchUpdateTimeoutDuration = 100;
        this.drawButtonText = "";
        this.clearButtonText = "";
        this.undoButtonText = "";
        this.redoButtonText = "";
        this.saveDataButtonText = "";
        this.drawButtonEnabled = true;
        this.clearButtonEnabled = true;
        this.undoButtonEnabled = false;
        this.redoButtonEnabled = false;
        this.saveDataButtonEnabled = false;
        this.shouldDownloadDrawing = true;
        this.colorPickerEnabled = false;
        this.lineWidth = 2;
        this.strokeColor = "rgba(0, 0, 0, 1)";
        this.startingColor = "#fff";
        this.scaleFactor = 0;
        this.drawingEnabled = false;
        this.showStrokeColorPicker = false;
        this.showFillColorPicker = false;
        this.lineJoin = "round";
        this.lineCap = "round";
        this.shapeSelectorEnabled = true;
        this.showShapeSelector = false;
        this.fillColor = "rgba(0,0,0,0)";
        this.onClear = new EventEmitter();
        this.onUndo = new EventEmitter();
        this.onRedo = new EventEmitter();
        this.onBatchUpdate = new EventEmitter();
        this.onImageLoaded = new EventEmitter();
        this.onSave = new EventEmitter();
        this._canDraw = true;
        this._clientDragging = false;
        this._updateHistory = [];
        this._undoStack = [];
        this._redoStack = [];
        this._batchUpdates = [];
        this._updatesNotDrawn = [];
        this._canvasWhiteboardServiceSubscriptions = [];
        this._shapesMap = new Map();
        this._incompleteShapesMap = new Map();
        this.canvasWhiteboardShapePreviewOptions = this.generateShapePreviewOptions();
    }
    Object.defineProperty(CanvasWhiteboardComponent.prototype, "imageUrl", {
        /**
         * @return {?}
         */
        get: function () {
            return this._imageUrl;
        },
        /**
         * @param {?} imageUrl
         * @return {?}
         */
        set: function (imageUrl) {
            this._imageUrl = imageUrl;
            this._imageElement = null;
            this._redrawHistory();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.ngOnInit = function () {
        this._initInputsFromOptions(this.options);
        this._initCanvasEventListeners();
        this._initCanvasServiceObservables();
        this.context = this.canvas.nativeElement.getContext("2d");
        this._incompleteShapesCanvasContext = this._incompleteShapesCanvas.nativeElement.getContext("2d");
    };
    /**
     * If an image exists and it's url changes, we need to redraw the new image on the canvas.
     * @param {?} changes
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.ngOnChanges = function (changes) {
        if (changes.options && changes.options.currentValue != changes.options.previousValue) {
            this._initInputsFromOptions(changes.options.currentValue);
        }
    };
    /**
     * Recalculate the width and height of the canvas after the view has been fully initialized
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.ngAfterViewInit = function () {
        this._calculateCanvasWidthAndHeight();
        this._redrawHistory();
    };
    /**
     * This method reads the options which are helpful since they can be really long when specified in HTML
     * This method is also called everytime the options object changes
     * For security reasons we must check each item on its own since if we iterate the keys
     * we may be injected with malicious values
     *
     * @param {?} options
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._initInputsFromOptions = function (options) {
        if (options) {
            if (!this._isNullOrUndefined(options.batchUpdateTimeoutDuration))
                this.batchUpdateTimeoutDuration = options.batchUpdateTimeoutDuration;
            if (!this._isNullOrUndefined(options.imageUrl))
                this.imageUrl = options.imageUrl;
            if (!this._isNullOrUndefined(options.aspectRatio))
                this.aspectRatio = options.aspectRatio;
            if (!this._isNullOrUndefined(options.drawButtonClass))
                this.drawButtonClass = options.drawButtonClass;
            if (!this._isNullOrUndefined(options.clearButtonClass))
                this.clearButtonClass = options.clearButtonClass;
            if (!this._isNullOrUndefined(options.undoButtonClass))
                this.undoButtonClass = options.undoButtonClass;
            if (!this._isNullOrUndefined(options.redoButtonClass))
                this.redoButtonClass = options.redoButtonClass;
            if (!this._isNullOrUndefined(options.saveDataButtonClass))
                this.saveDataButtonClass = options.saveDataButtonClass;
            if (!this._isNullOrUndefined(options.drawButtonText))
                this.drawButtonText = options.drawButtonText;
            if (!this._isNullOrUndefined(options.clearButtonText))
                this.clearButtonText = options.clearButtonText;
            if (!this._isNullOrUndefined(options.undoButtonText))
                this.undoButtonText = options.undoButtonText;
            if (!this._isNullOrUndefined(options.redoButtonText))
                this.redoButtonText = options.redoButtonText;
            if (!this._isNullOrUndefined(options.saveDataButtonText))
                this.saveDataButtonText = options.saveDataButtonText;
            if (!this._isNullOrUndefined(options.drawButtonEnabled))
                this.drawButtonEnabled = options.drawButtonEnabled;
            if (!this._isNullOrUndefined(options.clearButtonEnabled))
                this.clearButtonEnabled = options.clearButtonEnabled;
            if (!this._isNullOrUndefined(options.undoButtonEnabled))
                this.undoButtonEnabled = options.undoButtonEnabled;
            if (!this._isNullOrUndefined(options.redoButtonEnabled))
                this.redoButtonEnabled = options.redoButtonEnabled;
            if (!this._isNullOrUndefined(options.saveDataButtonEnabled))
                this.saveDataButtonEnabled = options.saveDataButtonEnabled;
            if (!this._isNullOrUndefined(options.colorPickerEnabled))
                this.colorPickerEnabled = options.colorPickerEnabled;
            if (!this._isNullOrUndefined(options.lineWidth))
                this.lineWidth = options.lineWidth;
            if (!this._isNullOrUndefined(options.strokeColor))
                this.strokeColor = options.strokeColor;
            if (!this._isNullOrUndefined(options.shouldDownloadDrawing))
                this.shouldDownloadDrawing = options.shouldDownloadDrawing;
            if (!this._isNullOrUndefined(options.startingColor))
                this.startingColor = options.startingColor;
            if (!this._isNullOrUndefined(options.scaleFactor))
                this.scaleFactor = options.scaleFactor;
            if (!this._isNullOrUndefined(options.drawingEnabled))
                this.drawingEnabled = options.drawingEnabled;
            if (!this._isNullOrUndefined(options.downloadedFileName))
                this.downloadedFileName = options.downloadedFileName;
            if (!this._isNullOrUndefined(options.lineJoin))
                this.lineJoin = options.lineJoin;
            if (!this._isNullOrUndefined(options.lineCap))
                this.lineCap = options.lineCap;
            if (!this._isNullOrUndefined(options.shapeSelectorEnabled))
                this.shapeSelectorEnabled = options.shapeSelectorEnabled;
            if (!this._isNullOrUndefined(options.showShapeSelector))
                this.showShapeSelector = options.showShapeSelector;
            if (!this._isNullOrUndefined(options.fillColor))
                this.fillColor = options.fillColor;
            if (!this._isNullOrUndefined(options.showStrokeColorPicker))
                this.showStrokeColorPicker = options.showStrokeColorPicker;
            if (!this._isNullOrUndefined(options.showFillColorPicker))
                this.showFillColorPicker = options.showFillColorPicker;
        }
    };
    /**
     * @param {?} property
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._isNullOrUndefined = function (property) {
        return property === null || property === undefined;
    };
    /**
     * Init global window listeners like resize and keydown
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._initCanvasEventListeners = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this._resizeSubscription = fromEvent(window, 'resize')
                .pipe(debounceTime(200), distinctUntilChanged())
                .subscribe(function () {
                _this.ngZone.run(function () {
                    _this._redrawCanvasOnResize();
                });
            });
        });
        window.addEventListener("keydown", this._canvasKeyDown.bind(this), false);
    };
    /**
     * Subscribes to new signals in the canvas whiteboard service and executes methods accordingly
     * Because of circular publishing and subscribing, the canvas methods do not use the service when
     * local actions are completed (Ex. clicking undo from the button inside this component)
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._initCanvasServiceObservables = function () {
        var _this = this;
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasDrawSubject$
            .subscribe(function (updates) { return _this.drawUpdates(updates); }));
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasClearSubject$
            .subscribe(function () { return _this.clearCanvas(); }));
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasUndoSubject$
            .subscribe(function (updateUUD) { return _this._undoCanvas(updateUUD); }));
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasRedoSubject$
            .subscribe(function (updateUUD) { return _this._redoCanvas(updateUUD); }));
        this._registeredShapesSubscription = this._canvasWhiteboardShapeService.registeredShapes$.subscribe(function (shapes) {
            if (!_this.selectedShapeConstructor || !_this._canvasWhiteboardShapeService.isRegisteredShape(_this.selectedShapeConstructor)) {
                _this.selectedShapeConstructor = shapes[0];
            }
        });
    };
    /**
     * Calculate the canvas width and height from it's parent container width and height (use aspect ratio if needed)
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._calculateCanvasWidthAndHeight = function () {
        this.context.canvas.width = this.canvas.nativeElement.parentNode.clientWidth;
        if (this.aspectRatio) {
            this.context.canvas.height = this.canvas.nativeElement.parentNode.clientWidth * this.aspectRatio;
        }
        else {
            this.context.canvas.height = this.canvas.nativeElement.parentNode.clientHeight;
        }
        this._incompleteShapesCanvasContext.canvas.width = this.context.canvas.width;
        this._incompleteShapesCanvasContext.canvas.height = this.context.canvas.height;
    };
    /**
     * Load an image and draw it on the canvas (if an image exists)
     * @param {?=} callbackFn A function that is called after the image loading is finished
     * @return {?} Emits a value when the image has been loaded.
     */
    CanvasWhiteboardComponent.prototype._loadImage = function (callbackFn) {
        var _this = this;
        this._canDraw = false;
        //If we already have the image there is no need to acquire it
        if (this._imageElement) {
            this._canDraw = true;
            callbackFn && callbackFn();
            return;
        }
        this._imageElement = new Image();
        this._imageElement.addEventListener("load", function () {
            _this._canDraw = true;
            callbackFn && callbackFn();
            _this.onImageLoaded.emit(true);
        });
        this._imageElement.src = this.imageUrl;
    };
    /**
     * Sends a notification after clearing the canvas
     * This method should only be called from the clear button in this component since it will emit an clear event
     * If the client calls this method he may create a circular clear action which may cause danger.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.clearCanvasLocal = function () {
        this.clearCanvas();
        this.onClear.emit(true);
    };
    /**
     * Clears all content on the canvas.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.clearCanvas = function () {
        this._removeCanvasData();
        this._redoStack = [];
    };
    /**
     * This method resets the state of the canvas and redraws it.
     * It calls a callback function after redrawing
     * @param {?=} callbackFn
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._removeCanvasData = function (callbackFn) {
        this._shapesMap = new Map();
        this._clientDragging = false;
        this._updateHistory = [];
        this._undoStack = [];
        this._redrawBackground(callbackFn);
    };
    /**
     * Clears the canvas and redraws the image if the url exists.
     * @param {?=} callbackFn A function that is called after the background is redrawn
     * @return {?} Emits a value when the clearing is finished
     */
    CanvasWhiteboardComponent.prototype._redrawBackground = function (callbackFn) {
        var _this = this;
        if (this.context) {
            if (this.imageUrl) {
                this._loadImage(function () {
                    _this.context.save();
                    _this._drawImage(_this.context, _this._imageElement, 0, 0, _this.context.canvas.width, _this.context.canvas.height, 0.5, 0.5);
                    _this.context.restore();
                    _this._drawMissingUpdates();
                    callbackFn && callbackFn();
                });
            }
            else {
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                this._drawStartingColor();
                callbackFn && callbackFn();
            }
        }
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._drawStartingColor = function () {
        /** @type {?} */
        var previousFillStyle = this.context.fillStyle;
        this.context.save();
        this.context.fillStyle = this.startingColor;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = previousFillStyle;
        this.context.restore();
    };
    /**
     * @deprecated Use getDrawingEnabled(): boolean
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.getShouldDraw = function () {
        return this.getDrawingEnabled();
    };
    /**
     * Returns a value of whether the user clicked the draw button on the canvas.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.getDrawingEnabled = function () {
        return this.drawingEnabled;
    };
    /**
     * Toggles drawing on the canvas. It is called via the draw button on the canvas.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.toggleDrawingEnabled = function () {
        this.drawingEnabled = !this.drawingEnabled;
    };
    /**
     * Set if drawing is enabled from the client using the canvas
     * @param {?} drawingEnabled
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.setDrawingEnabled = function (drawingEnabled) {
        this.drawingEnabled = drawingEnabled;
    };
    /**
     * @deprecated Please use the changeStrokeColor(newStrokeColor: string): void method
     * @param {?} newStrokeColor
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.changeColor = function (newStrokeColor) {
        this.changeStrokeColor(newStrokeColor);
    };
    /**
     * Replaces the drawing color with a new color
     * The format should be ("#ffffff" or "rgb(r,g,b,a?)")
     * This method is public so that anyone can access the canvas and change the stroke color
     *
     * @param {?} newStrokeColor The new stroke color
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.changeStrokeColor = function (newStrokeColor) {
        this.strokeColor = newStrokeColor;
        this.canvasWhiteboardShapePreviewOptions = this.generateShapePreviewOptions();
        this._changeDetector.detectChanges();
    };
    /**
     * Replaces the fill color with a new color
     * The format should be ("#ffffff" or "rgb(r,g,b,a?)")
     * This method is public so that anyone can access the canvas and change the fill color
     *
     * @param {?} newFillColor The new fill color
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.changeFillColor = function (newFillColor) {
        this.fillColor = newFillColor;
        this.canvasWhiteboardShapePreviewOptions = this.generateShapePreviewOptions();
        this._changeDetector.detectChanges();
    };
    /**
     * This method is invoked by the undo button on the canvas screen
     * It calls the global undo method and emits a notification after undoing.
     * This method should only be called from the undo button in this component since it will emit an undo event
     * If the client calls this method he may create a circular undo action which may cause danger.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.undoLocal = function () {
        var _this = this;
        this.undo(function (updateUUID) {
            _this._redoStack.push(updateUUID);
            _this.onUndo.emit(updateUUID);
        });
    };
    /**
     * This methods selects the last uuid prepares it for undoing (making the whole update sequence invisible)
     * This method can be called if the canvas component is a ViewChild of some other component.
     * This method will work even if the undo button has been disabled
     * @param {?=} callbackFn
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.undo = function (callbackFn) {
        if (!this._undoStack.length)
            return;
        /** @type {?} */
        var updateUUID = this._undoStack.pop();
        this._undoCanvas(updateUUID);
        callbackFn && callbackFn(updateUUID);
    };
    /**
     * This method takes an UUID for an update, and redraws the canvas by making all updates with that uuid invisible
     * @param {?} updateUUID
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._undoCanvas = function (updateUUID) {
        if (this._shapesMap.has(updateUUID)) {
            /** @type {?} */
            var shape = this._shapesMap.get(updateUUID);
            shape.isVisible = false;
            this.drawAllShapes();
        }
    };
    /**
     * This method is invoked by the redo button on the canvas screen
     * It calls the global redo method and emits a notification after redoing
     * This method should only be called from the redo button in this component since it will emit an redo event
     * If the client calls this method he may create a circular redo action which may cause danger.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.redoLocal = function () {
        var _this = this;
        this.redo(function (updateUUID) {
            _this._undoStack.push(updateUUID);
            _this.onRedo.emit(updateUUID);
        });
    };
    /**
     * This methods selects the last uuid prepares it for redoing (making the whole update sequence visible)
     * This method can be called if the canvas component is a ViewChild of some other component.
     * This method will work even if the redo button has been disabled
     * @param {?=} callbackFn
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.redo = function (callbackFn) {
        if (!this._redoStack.length)
            return;
        /** @type {?} */
        var updateUUID = this._redoStack.pop();
        this._redoCanvas(updateUUID);
        callbackFn && callbackFn(updateUUID);
    };
    /**
     * This method takes an UUID for an update, and redraws the canvas by making all updates with that uuid visible
     * @param {?} updateUUID
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._redoCanvas = function (updateUUID) {
        if (this._shapesMap.has(updateUUID)) {
            /** @type {?} */
            var shape = this._shapesMap.get(updateUUID);
            shape.isVisible = true;
            this.drawAllShapes();
        }
    };
    /**
     * Catches the Mouse and Touch events made on the canvas.
     * If drawing is disabled (If an image exists but it's not loaded, or the user did not click Draw),
     * this function does nothing.
     *
     * If a "mousedown | touchstart" event is triggered, dragging will be set to true and an CanvasWhiteboardUpdate object
     * of type "start" will be drawn and then sent as an update to all receiving ends.
     *
     * If a "mousemove | touchmove" event is triggered and the client is dragging, an CanvasWhiteboardUpdate object
     * of type "drag" will be drawn and then sent as an update to all receiving ends.
     *
     * If a "mouseup, mouseout | touchend, touchcancel" event is triggered, dragging will be set to false and
     * an CanvasWhiteboardUpdate object of type "stop" will be drawn and then sent as an update to all receiving ends.
     *
     * @param {?} event
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.canvasUserEvents = function (event) {
        //Ignore all if we didn't click the _draw! button or the image did not load
        if (!this.drawingEnabled || !this._canDraw) {
            return;
        }
        // Ignore mouse move Events if we're not dragging
        if (!this._clientDragging
            && (event.type === 'mousemove'
                || event.type === 'touchmove'
                || event.type === 'mouseout'
                || event.type === 'touchcancel'
                || event.type === 'mouseup'
                || event.type === 'touchend'
                || event.type === 'mouseout')) {
            return;
        }
        if (event.target == this._incompleteShapesCanvas.nativeElement || event.target == this.canvas.nativeElement) {
            event.preventDefault();
        }
        /** @type {?} */
        var update;
        /** @type {?} */
        var updateType;
        /** @type {?} */
        var eventPosition = this._getCanvasEventPosition(event);
        update = new CanvasWhiteboardUpdate(eventPosition.x, eventPosition.y);
        switch (event.type) {
            case 'mousedown':
            case 'touchstart':
                this._clientDragging = true;
                this._lastUUID = this._generateUUID();
                updateType = CanvasWhiteboardUpdateType.START;
                this._redoStack = [];
                this._addCurrentShapeDataToAnUpdate(update);
                break;
            case 'mousemove':
            case 'touchmove':
                if (!this._clientDragging) {
                    return;
                }
                updateType = CanvasWhiteboardUpdateType.DRAG;
                break;
            case 'touchcancel':
            case 'mouseup':
            case 'touchend':
            case 'mouseout':
                this._clientDragging = false;
                updateType = CanvasWhiteboardUpdateType.STOP;
                this._undoStack.push(this._lastUUID);
                break;
        }
        update.UUID = this._lastUUID;
        update.type = updateType;
        this._draw(update);
        this._prepareToSendUpdate(update);
    };
    /**
     * Get the coordinates (x,y) from a given event
     * If it is a touch event, get the touch positions
     * If we released the touch, the position will be placed in the changedTouches object
     * If it is not a touch event, use the original mouse event received
     * @param {?} eventData
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._getCanvasEventPosition = function (eventData) {
        /** @type {?} */
        var canvasBoundingRect = this.context.canvas.getBoundingClientRect();
        /** @type {?} */
        var hasTouches = (eventData.touches && eventData.touches.length) ? eventData.touches[0] : null;
        if (!hasTouches)
            hasTouches = (eventData.changedTouches && eventData.changedTouches.length) ? eventData.changedTouches[0] : null;
        /** @type {?} */
        var event = hasTouches ? hasTouches : eventData;
        /** @type {?} */
        var scaleWidth = canvasBoundingRect.width / this.context.canvas.width;
        /** @type {?} */
        var scaleHeight = canvasBoundingRect.height / this.context.canvas.height;
        /** @type {?} */
        var xPosition = (event.clientX - canvasBoundingRect.left);
        /** @type {?} */
        var yPosition = (event.clientY - canvasBoundingRect.top);
        xPosition /= this.scaleFactor ? this.scaleFactor : scaleWidth;
        yPosition /= this.scaleFactor ? this.scaleFactor : scaleHeight;
        return new CanvasWhiteboardPoint(xPosition / this.context.canvas.width, yPosition / this.context.canvas.height);
    };
    /**
     * The update coordinates on the canvas are mapped so that all receiving ends
     * can reverse the mapping and get the same position as the one that
     * was drawn on this update.
     *
     * @param {?} update The CanvasWhiteboardUpdate object.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._prepareToSendUpdate = function (update) {
        this._prepareUpdateForBatchDispatch(update);
    };
    /**
     * Catches the Key Up events made on the canvas.
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 90 (z), an undo action will be performed
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 89 (y), a redo action will be performed
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 83 (s) or 115(S), a save action will be performed
     *
     * @param {?} event The event that occurred.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._canvasKeyDown = function (event) {
        if (event.ctrlKey || event.metaKey) {
            if (event.keyCode === 90 && this.undoButtonEnabled) {
                event.preventDefault();
                this.undo();
            }
            if (event.keyCode === 89 && this.redoButtonEnabled) {
                event.preventDefault();
                this.redo();
            }
            if (event.keyCode === 83 || event.keyCode === 115) {
                event.preventDefault();
                this.saveLocal();
            }
        }
    };
    /**
     * On window resize, recalculate the canvas dimensions and redraw the history
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._redrawCanvasOnResize = function () {
        this._calculateCanvasWidthAndHeight();
        this._redrawHistory();
    };
    /**
     * Redraw the saved history after resetting the canvas state
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._redrawHistory = function () {
        var _this = this;
        /** @type {?} */
        var updatesToDraw = [].concat(this._updateHistory);
        this._removeCanvasData(function () {
            updatesToDraw.forEach(function (update) {
                _this._draw(update);
            });
        });
    };
    /**
     * Draws a CanvasWhiteboardUpdate object on the canvas.
     * The coordinates are first reverse mapped so that they can be drawn in the proper place. The update
     * is afterwards added to the undoStack so that it can be
     *
     * If the CanvasWhiteboardUpdate Type is "start", a new "selectedShape" is created.
     * If the CanvasWhiteboardUpdate Type is "drag", the shape is taken from the shapesMap and then it's updated.
     * Afterwards the context is used to draw the shape on the canvas.
     * This function saves the last X and Y coordinates that were drawn.
     *
     * @param {?} update The update object.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._draw = function (update) {
        this._updateHistory.push(update);
        //map the canvas coordinates to our canvas size since they are scaled.
        update = Object.assign(new CanvasWhiteboardUpdate(), update, {
            x: update.x * this.context.canvas.width,
            y: update.y * this.context.canvas.height
        });
        if (update.type === CanvasWhiteboardUpdateType.START) {
            /** @type {?} */
            var updateShapeConstructor = this._canvasWhiteboardShapeService.getShapeConstructorFromShapeName(update.selectedShape);
            /** @type {?} */
            var shape = new updateShapeConstructor(new CanvasWhiteboardPoint(update.x, update.y), Object.assign(new CanvasWhiteboardShapeOptions(), update.selectedShapeOptions));
            this._incompleteShapesMap.set(update.UUID, shape);
            this._drawIncompleteShapes();
        }
        else if (update.type === CanvasWhiteboardUpdateType.DRAG) {
            /** @type {?} */
            var shape = this._incompleteShapesMap.get(update.UUID);
            shape && shape.onUpdateReceived(update);
            this._drawIncompleteShapes();
        }
        else if (CanvasWhiteboardUpdateType.STOP) {
            /** @type {?} */
            var shape = this._incompleteShapesMap.get(update.UUID);
            shape && shape.onStopReceived(update);
            this._shapesMap.set(update.UUID, shape);
            this._incompleteShapesMap.delete(update.UUID);
            this._swapCompletedShapeToActualCanvas(shape);
        }
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._drawIncompleteShapes = function () {
        var _this = this;
        this._resetIncompleteShapeCanvas();
        this._incompleteShapesMap.forEach(function (shape) {
            if (shape.isVisible) {
                shape.draw(_this._incompleteShapesCanvasContext);
            }
        });
    };
    /**
     * @param {?} shape
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._swapCompletedShapeToActualCanvas = function (shape) {
        this._drawIncompleteShapes();
        if (shape.isVisible) {
            shape.draw(this.context);
        }
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._resetIncompleteShapeCanvas = function () {
        this._incompleteShapesCanvasContext.clearRect(0, 0, this._incompleteShapesCanvasContext.canvas.width, this._incompleteShapesCanvasContext.canvas.height);
        this._incompleteShapesCanvasContext.fillStyle = "transparent";
        this._incompleteShapesCanvasContext.fillRect(0, 0, this._incompleteShapesCanvasContext.canvas.width, this._incompleteShapesCanvasContext.canvas.height);
    };
    /**
     * Delete everything from the screen, redraw the background, and then redraw all the shapes from the shapesMap
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.drawAllShapes = function () {
        var _this = this;
        this._redrawBackground(function () {
            _this._shapesMap.forEach(function (shape) {
                if (shape.isVisible) {
                    shape.draw(_this.context);
                }
            });
        });
    };
    /**
     * @param {?} update
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._addCurrentShapeDataToAnUpdate = function (update) {
        if (!update.selectedShape) {
            update.selectedShape = this.selectedShapeConstructor.name;
        }
        if (!update.selectedShapeOptions) {
            //Make a deep copy since we don't want some Shape implementation to change something by accident
            update.selectedShapeOptions = Object.assign(new CanvasWhiteboardShapeOptions(), this.generateShapePreviewOptions(), { lineWidth: this.lineWidth });
        }
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.generateShapePreviewOptions = function () {
        return Object.assign(new CanvasWhiteboardShapeOptions(), {
            shouldFillShape: !!this.fillColor,
            fillStyle: this.fillColor,
            strokeStyle: this.strokeColor,
            lineWidth: 2,
            lineJoin: this.lineJoin,
            lineCap: this.lineCap
        });
    };
    /**
     * Sends the update to all receiving ends as an Event emit. This is done as a batch operation (meaning
     * multiple updates are sent at the same time). If this method is called, after 100 ms all updates
     * that were made at that time will be packed up together and sent to the receiver.
     *
     * @param {?} update The update object.
     * @return {?} Emits an Array of Updates when the batch.
     */
    CanvasWhiteboardComponent.prototype._prepareUpdateForBatchDispatch = function (update) {
        var _this = this;
        this._batchUpdates.push(cloneDeep(update));
        if (!this._updateTimeout) {
            this._updateTimeout = setTimeout(function () {
                _this.onBatchUpdate.emit(_this._batchUpdates);
                _this._batchUpdates = [];
                _this._updateTimeout = null;
            }, this.batchUpdateTimeoutDuration);
        }
    };
    ;
    /**
     * Draws an Array of Updates on the canvas.
     *
     * @param {?} updates The array with Updates.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.drawUpdates = function (updates) {
        var _this = this;
        if (this._canDraw) {
            this._drawMissingUpdates();
            updates.forEach(function (update) {
                _this._draw(update);
            });
        }
        else {
            this._updatesNotDrawn = this._updatesNotDrawn.concat(updates);
        }
    };
    ;
    /**
     * Draw any missing updates that were received before the image was loaded
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._drawMissingUpdates = function () {
        var _this = this;
        if (this._updatesNotDrawn.length > 0) {
            /** @type {?} */
            var updatesToDraw = this._updatesNotDrawn;
            this._updatesNotDrawn = [];
            updatesToDraw.forEach(function (update) {
                _this._draw(update);
            });
        }
    };
    /**
     * Draws an image on the canvas
     *
     * @param {?} context The context used to draw the image on the canvas.
     * @param {?} image The image to draw.
     * @param {?} x The X coordinate for the starting draw position.
     * @param {?} y The Y coordinate for the starting draw position.
     * @param {?} width The width of the image that will be drawn.
     * @param {?} height The height of the image that will be drawn.
     * @param {?} offsetX The offsetX if the image size is larger than the canvas (aspect Ratio)
     * @param {?} offsetY The offsetY if the image size is larger than the canvas (aspect Ratio)
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._drawImage = function (context, image, x, y, width, height, offsetX, offsetY) {
        if (arguments.length === 2) {
            x = y = 0;
            width = context.canvas.width;
            height = context.canvas.height;
        }
        offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
        offsetY = typeof offsetY === 'number' ? offsetY : 0.5;
        if (offsetX < 0)
            offsetX = 0;
        if (offsetY < 0)
            offsetY = 0;
        if (offsetX > 1)
            offsetX = 1;
        if (offsetY > 1)
            offsetY = 1;
        /** @type {?} */
        var imageWidth = image.width;
        /** @type {?} */
        var imageHeight = image.height;
        /** @type {?} */
        var radius = Math.min(width / imageWidth, height / imageHeight);
        /** @type {?} */
        var newWidth = imageWidth * radius;
        /** @type {?} */
        var newHeight = imageHeight * radius;
        /** @type {?} */
        var finalDrawX;
        /** @type {?} */
        var finalDrawY;
        /** @type {?} */
        var finalDrawWidth;
        /** @type {?} */
        var finalDrawHeight;
        /** @type {?} */
        var aspectRatio = 1;
        // decide which gap to fill
        if (newWidth < width)
            aspectRatio = width / newWidth;
        if (Math.abs(aspectRatio - 1) < 1e-14 && newHeight < height)
            aspectRatio = height / newHeight;
        newWidth *= aspectRatio;
        newHeight *= aspectRatio;
        // calculate source rectangle
        finalDrawWidth = imageWidth / (newWidth / width);
        finalDrawHeight = imageHeight / (newHeight / height);
        finalDrawX = (imageWidth - finalDrawWidth) * offsetX;
        finalDrawY = (imageHeight - finalDrawHeight) * offsetY;
        // make sure the source rectangle is valid
        if (finalDrawX < 0)
            finalDrawX = 0;
        if (finalDrawY < 0)
            finalDrawY = 0;
        if (finalDrawWidth > imageWidth)
            finalDrawWidth = imageWidth;
        if (finalDrawHeight > imageHeight)
            finalDrawHeight = imageHeight;
        // fill the image in destination rectangle
        context.drawImage(image, finalDrawX, finalDrawY, finalDrawWidth, finalDrawHeight, x, y, width, height);
    };
    /**
     * The HTMLCanvasElement.toDataURL() method returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
     * The returned image is in a resolution of 96 dpi.
     * If the height or width of the canvas is 0, the string "data:," is returned.
     * If the requested type is not image/png, but the returned value starts with data:image/png, then the requested type is not supported.
     * Chrome also supports the image/webp type.
     *
     * @param {?=} returnedDataType A DOMString indicating the image format. The default format type is image/png.
     * @param {?=} returnedDataQuality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
     * If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.generateCanvasDataUrl = function (returnedDataType, returnedDataQuality) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (returnedDataQuality === void 0) { returnedDataQuality = 1; }
        return this.context.canvas.toDataURL(returnedDataType, returnedDataQuality);
    };
    /**
     * Generate a Blob object representing the content drawn on the canvas.
     * This file may be cached on the disk or stored in memory at the discretion of the user agent.
     * If type is not specified, the image type is image/png. The created image is in a resolution of 96dpi.
     * The third argument is used with image/jpeg images to specify the quality of the output.
     *
     * @param {?} callbackFn The function that should be executed when the blob is created. Should accept a parameter Blob (for the result).
     * @param {?=} returnedDataType A DOMString indicating the image format. The default type is image/png.
     * @param {?=} returnedDataQuality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
     * If this argument is anything else, the default value for image quality is used. Other arguments are ignored.
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.generateCanvasBlob = function (callbackFn, returnedDataType, returnedDataQuality) {
        var _this = this;
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (returnedDataQuality === void 0) { returnedDataQuality = 1; }
        /** @type {?} */
        var toBlobMethod;
        if (typeof this.context.canvas.toBlob !== "undefined") {
            toBlobMethod = this.context.canvas.toBlob.bind(this.context.canvas);
        }
        else if (typeof this.context.canvas.msToBlob !== "undefined") {
            toBlobMethod = function (callback) {
                callback && callback(_this.context.canvas.msToBlob());
            };
        }
        toBlobMethod && toBlobMethod(function (blob) {
            callbackFn && callbackFn(blob, returnedDataType);
        }, returnedDataType, returnedDataQuality);
    };
    /**
     * Generate a canvas image representation and download it locally
     * The name of the image is canvas_drawing_ + the current local Date and Time the image was created
     * Methods for standalone creation of the images in this method are left here for backwards compatibility
     *
     * @param {?=} returnedDataType A DOMString indicating the image format. The default type is image/png.
     * @param {?=} downloadData
     * @param {?=} customFileName
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.downloadCanvasImage = function (returnedDataType, downloadData, customFileName) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (window.navigator.msSaveOrOpenBlob === undefined) {
            /** @type {?} */
            var downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', downloadData ? /** @type {?} */ (downloadData) : this.generateCanvasDataUrl(returnedDataType));
            /** @type {?} */
            var fileName = customFileName ? customFileName
                : (this.downloadedFileName ? this.downloadedFileName : "canvas_drawing_" + new Date().valueOf());
            downloadLink.setAttribute('download', fileName + this._generateDataTypeString(returnedDataType));
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        else {
            // IE-specific code
            if (downloadData) {
                this._saveCanvasBlob(/** @type {?} */ (downloadData), returnedDataType);
            }
            else {
                this.generateCanvasBlob(this._saveCanvasBlob.bind(this), returnedDataType);
            }
        }
    };
    /**
     * Save the canvas blob (IE) locally
     * @param {?} blob
     * @param {?=} returnedDataType
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._saveCanvasBlob = function (blob, returnedDataType) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        window.navigator.msSaveOrOpenBlob(blob, "canvas_drawing_" + new Date().valueOf() + this._generateDataTypeString(returnedDataType));
    };
    /**
     * This method generates a canvas url string or a canvas blob with the presented data type
     * A callback function is then invoked since the blob creation must be done via a callback
     *
     * @param {?} callback
     * @param {?=} returnedDataType
     * @param {?=} returnedDataQuality
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.generateCanvasData = function (callback, returnedDataType, returnedDataQuality) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (returnedDataQuality === void 0) { returnedDataQuality = 1; }
        if (window.navigator.msSaveOrOpenBlob === undefined) {
            callback && callback(this.generateCanvasDataUrl(returnedDataType, returnedDataQuality));
        }
        else {
            this.generateCanvasBlob(callback, returnedDataType, returnedDataQuality);
        }
    };
    /**
     * Local method to invoke saving of the canvas data when clicked on the canvas Save button
     * This method will emit the generated data with the specified Event Emitter
     *
     * @param {?=} returnedDataType
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.saveLocal = function (returnedDataType) {
        var _this = this;
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        this.generateCanvasData(function (generatedData) {
            _this.onSave.emit(generatedData);
            if (_this.shouldDownloadDrawing) {
                _this.downloadCanvasImage(returnedDataType, generatedData);
            }
        });
    };
    /**
     * @param {?} returnedDataType
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._generateDataTypeString = function (returnedDataType) {
        if (returnedDataType) {
            return "." + returnedDataType.split('/')[1];
        }
        return "";
    };
    /**
     * Toggles the color picker window, delegating the showColorPicker Input to the ColorPickerComponent.
     * If no value is supplied (null/undefined) the current value will be negated and used.
     * @param {?} value
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.toggleStrokeColorPicker = function (value) {
        this.showStrokeColorPicker = !this._isNullOrUndefined(value) ? value : !this.showStrokeColorPicker;
    };
    /**
     * Toggles the color picker window, delegating the showColorPicker Input to the ColorPickerComponent.
     * If no value is supplied (null/undefined) the current value will be negated and used.
     * @param {?} value
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.toggleFillColorPicker = function (value) {
        this.showFillColorPicker = !this._isNullOrUndefined(value) ? value : !this.showFillColorPicker;
    };
    /**
     * Toggles the shape selector window, delegating the showShapeSelector Input to the CanvasWhiteboardShapeSelectorComponent.
     * If no value is supplied (null/undefined) the current value will be negated and used.
     * @param {?} value
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.toggleShapeSelector = function (value) {
        this.showShapeSelector = !this._isNullOrUndefined(value) ? value : !this.showShapeSelector;
    };
    /**
     * @param {?} newShapeBlueprint
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.selectShape = function (newShapeBlueprint) {
        this.selectedShapeConstructor = newShapeBlueprint;
    };
    /**
     * Returns a deep copy of the current drawing history for the canvas.
     * The deep copy is returned because we don't want anyone to mutate the current history
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.getDrawingHistory = function () {
        return cloneDeep(this._updateHistory);
    };
    /**
     * Unsubscribe from a given subscription if it is active
     * @param {?} subscription
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._unsubscribe = function (subscription) {
        if (subscription)
            subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._generateUUID = function () {
        return this._random4() + this._random4() + "-" + this._random4() + "-" + this._random4() + "-" +
            this._random4() + "-" + this._random4() + this._random4() + this._random4();
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype._random4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    /**
     * Unsubscribe from the service observables
     * @return {?}
     */
    CanvasWhiteboardComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this._unsubscribe(this._resizeSubscription);
        this._unsubscribe(this._registeredShapesSubscription);
        this._canvasWhiteboardServiceSubscriptions.forEach(function (subscription) { return _this._unsubscribe(subscription); });
    };
    return CanvasWhiteboardComponent;
}());
CanvasWhiteboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'canvas-whiteboard',
                template: "\n        <div class=\"canvas_wrapper_div\">\n            <div class=\"canvas_whiteboard_buttons\">\n                <canvas-whiteboard-shape-selector *ngIf=\"shapeSelectorEnabled\"\n                                                  [showShapeSelector]=\"showShapeSelector\"\n                                                  [selectedShapeConstructor]=\"selectedShapeConstructor\"\n                                                  [shapeOptions]=\"generateShapePreviewOptions()\"\n                                                  (onToggleShapeSelector)=\"toggleShapeSelector($event)\"\n                                                  (onShapeSelected)=\"selectShape($event)\"></canvas-whiteboard-shape-selector>\n\n                <canvas-whiteboard-colorpicker *ngIf=\"colorPickerEnabled\"\n                                               [previewText]=\"'Fill'\"\n                                               [showColorPicker]=\"showFillColorPicker\"\n                                               [selectedColor]=\"fillColor\"\n                                               (onToggleColorPicker)=\"toggleFillColorPicker($event)\"\n                                               (onColorSelected)=\"changeFillColor($event)\">\n                </canvas-whiteboard-colorpicker>\n\n                <canvas-whiteboard-colorpicker *ngIf=\"colorPickerEnabled\"\n                                               [previewText]=\"'Stroke'\"\n                                               [showColorPicker]=\"showStrokeColorPicker\"\n                                               [selectedColor]=\"strokeColor\"\n                                               (onToggleColorPicker)=\"toggleStrokeColorPicker($event)\"\n                                               (onColorSelected)=\"changeStrokeColor($event)\">\n                </canvas-whiteboard-colorpicker>\n\n\n                <button *ngIf=\"drawButtonEnabled\" (click)=\"toggleDrawingEnabled()\"\n                        [class.canvas_whiteboard_button-draw_animated]=\"getDrawingEnabled()\"\n                        class=\"canvas_whiteboard_button canvas_whiteboard_button-draw\" type=\"button\">\n                    <i [class]=\"drawButtonClass\" aria-hidden=\"true\"></i> {{drawButtonText}}\n                </button>\n\n                <button *ngIf=\"clearButtonEnabled\" (click)=\"clearCanvasLocal()\" type=\"button\"\n                        class=\"canvas_whiteboard_button canvas_whiteboard_button-clear\">\n                    <i [class]=\"clearButtonClass\" aria-hidden=\"true\"></i> {{clearButtonText}}\n                </button>\n\n                <button *ngIf=\"undoButtonEnabled\" (click)=\"undoLocal()\" type=\"button\"\n                        class=\"canvas_whiteboard_button canvas_whiteboard_button-undo\">\n                    <i [class]=\"undoButtonClass\" aria-hidden=\"true\"></i> {{undoButtonText}}\n                </button>\n\n                <button *ngIf=\"redoButtonEnabled\" (click)=\"redoLocal()\" type=\"button\"\n                        class=\"canvas_whiteboard_button canvas_whiteboard_button-redo\">\n                    <i [class]=\"redoButtonClass\" aria-hidden=\"true\"></i> {{redoButtonText}}\n                </button>\n                <button *ngIf=\"saveDataButtonEnabled\" (click)=\"saveLocal()\" type=\"button\"\n                        class=\"canvas_whiteboard_button canvas_whiteboard_button-save\">\n                    <i [class]=\"saveDataButtonClass\" aria-hidden=\"true\"></i> {{saveDataButtonText}}\n                </button>\n            </div>\n            <canvas #canvas class=\"canvas_whiteboard\"></canvas>\n            <canvas #incompleteShapesCanvas class=\"incomplete_shapes_canvas_whiteboard\"\n                    (mousedown)=\"canvasUserEvents($event)\" (mouseup)=\"canvasUserEvents($event)\"\n                    (mousemove)=\"canvasUserEvents($event)\" (mouseout)=\"canvasUserEvents($event)\"\n                    (touchstart)=\"canvasUserEvents($event)\" (touchmove)=\"canvasUserEvents($event)\"\n                    (touchend)=\"canvasUserEvents($event)\" (touchcancel)=\"canvasUserEvents($event)\"></canvas>\n        </div>\n    ",
                styles: [DEFAULT_STYLES]
            },] },
];
/** @nocollapse */
CanvasWhiteboardComponent.ctorParameters = function () { return [
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: CanvasWhiteboardService },
    { type: CanvasWhiteboardShapeService }
]; };
CanvasWhiteboardComponent.propDecorators = {
    options: [{ type: Input }],
    batchUpdateTimeoutDuration: [{ type: Input }],
    imageUrl: [{ type: Input }],
    aspectRatio: [{ type: Input }],
    drawButtonClass: [{ type: Input }],
    clearButtonClass: [{ type: Input }],
    undoButtonClass: [{ type: Input }],
    redoButtonClass: [{ type: Input }],
    saveDataButtonClass: [{ type: Input }],
    drawButtonText: [{ type: Input }],
    clearButtonText: [{ type: Input }],
    undoButtonText: [{ type: Input }],
    redoButtonText: [{ type: Input }],
    saveDataButtonText: [{ type: Input }],
    drawButtonEnabled: [{ type: Input }],
    clearButtonEnabled: [{ type: Input }],
    undoButtonEnabled: [{ type: Input }],
    redoButtonEnabled: [{ type: Input }],
    saveDataButtonEnabled: [{ type: Input }],
    shouldDownloadDrawing: [{ type: Input }],
    colorPickerEnabled: [{ type: Input }],
    lineWidth: [{ type: Input }],
    strokeColor: [{ type: Input }],
    startingColor: [{ type: Input }],
    scaleFactor: [{ type: Input }],
    drawingEnabled: [{ type: Input }],
    showStrokeColorPicker: [{ type: Input }],
    showFillColorPicker: [{ type: Input }],
    downloadedFileName: [{ type: Input }],
    lineJoin: [{ type: Input }],
    lineCap: [{ type: Input }],
    shapeSelectorEnabled: [{ type: Input }],
    showShapeSelector: [{ type: Input }],
    fillColor: [{ type: Input }],
    onClear: [{ type: Output }],
    onUndo: [{ type: Output }],
    onRedo: [{ type: Output }],
    onBatchUpdate: [{ type: Output }],
    onImageLoaded: [{ type: Output }],
    onSave: [{ type: Output }],
    canvas: [{ type: ViewChild, args: ['canvas',] }],
    _incompleteShapesCanvas: [{ type: ViewChild, args: ['incompleteShapesCanvas',] }]
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardShapeSelectorComponent = /** @class */ (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _canvasWhiteboardShapeService
     */
    function CanvasWhiteboardShapeSelectorComponent(_elementRef, _canvasWhiteboardShapeService) {
        this._elementRef = _elementRef;
        this._canvasWhiteboardShapeService = _canvasWhiteboardShapeService;
        this.showShapeSelector = false;
        this.onToggleShapeSelector = new EventEmitter();
        this.onShapeSelected = new EventEmitter();
        this.registeredShapes$ = this._canvasWhiteboardShapeService.registeredShapes$;
    }
    /**
     * @param {?} shape
     * @return {?}
     */
    CanvasWhiteboardShapeSelectorComponent.prototype.selectShape = function (shape) {
        this.onShapeSelected.emit(shape);
        this.toggleShapeSelector(null);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasWhiteboardShapeSelectorComponent.prototype.closeOnExternalClick = function (event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showShapeSelector) {
            this.onToggleShapeSelector.emit(false);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasWhiteboardShapeSelectorComponent.prototype.toggleShapeSelector = function (event) {
        if (event) {
            event.preventDefault();
        }
        this.onToggleShapeSelector.emit(!this.showShapeSelector);
    };
    return CanvasWhiteboardShapeSelectorComponent;
}());
CanvasWhiteboardShapeSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: "canvas-whiteboard-shape-selector",
                host: {
                    '(document:mousedown)': 'closeOnExternalClick($event)',
                    '(document:touchstart)': 'closeOnExternalClick($event)',
                },
                template: "\n        <div *ngIf=\"!showShapeSelector\" (click)=\"toggleShapeSelector($event)\"\n             class=\"canvas-whiteboard-shape-selector-selected-preview\">\n            <canvas-whiteboard-shape-preview [shapeConstructor]=\"selectedShapeConstructor\"\n                                             [shapeOptions]=\"shapeOptions\"></canvas-whiteboard-shape-preview>\n        </div>\n        <div class=\"canvas-whiteboard-shape-selector-wrapper\" *ngIf=\"showShapeSelector\">\n            <canvas-whiteboard-shape-preview *ngFor=\"let shapeConstructor of registeredShapes$ | async\"\n                                             [shapeConstructor]=\"shapeConstructor\"\n                                             [shapeOptions]=\"shapeOptions\"\n                                             (click)=\"selectShape(shapeConstructor)\"></canvas-whiteboard-shape-preview>\n        </div>\n    ",
                styles: ["\n        .canvas-whiteboard-shape-selector-selected-preview {\n            vertical-align: bottom;\n            display: inline-block;\n        }\n\n        .canvas-whiteboard-shape-selector-wrapper {\n            display: block;\n            padding: 4px;\n            border: 1px solid #afafaf;\n        }\n\n        @media (min-width: 401px) {\n            .canvas-whiteboard-shape-selector-wrapper {\n            }\n        }\n    "]
            },] },
];
/** @nocollapse */
CanvasWhiteboardShapeSelectorComponent.ctorParameters = function () { return [
    { type: ElementRef },
    { type: CanvasWhiteboardShapeService }
]; };
CanvasWhiteboardShapeSelectorComponent.propDecorators = {
    showShapeSelector: [{ type: Input }],
    selectedShapeConstructor: [{ type: Input }],
    shapeOptions: [{ type: Input }],
    onToggleShapeSelector: [{ type: Output }],
    onShapeSelected: [{ type: Output }]
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardColorPickerComponent = /** @class */ (function () {
    /**
     * @param {?} _elementRef
     */
    function CanvasWhiteboardColorPickerComponent(_elementRef) {
        this._elementRef = _elementRef;
        this.selectedColor = 'rgba(0,0,0,1)';
        this.showColorPicker = false;
        this.onToggleColorPicker = new EventEmitter();
        this.onColorSelected = new EventEmitter();
        this.onSecondaryColorSelected = new EventEmitter();
    }
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     * @return {?}
     */
    CanvasWhiteboardColorPickerComponent.prototype.ngOnInit = function () {
        this._context = this.canvas.nativeElement.getContext("2d");
        this.createColorPalette();
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardColorPickerComponent.prototype.createColorPalette = function () {
        /** @type {?} */
        var gradient = this._context.createLinearGradient(0, 0, this._context.canvas.width, 0);
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
        gradient = this._context.createLinearGradient(0, 0, 0, this._context.canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasWhiteboardColorPickerComponent.prototype.closeOnExternalClick = function (event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showColorPicker) {
            this.onToggleColorPicker.emit(false);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasWhiteboardColorPickerComponent.prototype.toggleColorPicker = function (event) {
        if (event) {
            event.preventDefault();
        }
        this.onToggleColorPicker.emit(!this.showColorPicker);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CanvasWhiteboardColorPickerComponent.prototype.determineColorFromCanvas = function (event) {
        /** @type {?} */
        var canvasRect = this._context.canvas.getBoundingClientRect();
        /** @type {?} */
        var imageData = this._context.getImageData(event.clientX - canvasRect.left, event.clientY - canvasRect.top, 1, 1);
        return "rgba(" + imageData.data[0] + ", " + imageData.data[1] + ", " + imageData.data[2] + ", " + imageData.data[3] + ")";
    };
    /**
     * @param {?} color
     * @return {?}
     */
    CanvasWhiteboardColorPickerComponent.prototype.selectColor = function (color) {
        this.onColorSelected.emit(color);
        this.toggleColorPicker(null);
    };
    return CanvasWhiteboardColorPickerComponent;
}());
CanvasWhiteboardColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'canvas-whiteboard-colorpicker',
                host: {
                    '(document:mousedown)': 'closeOnExternalClick($event)',
                    '(document:touchstart)': 'closeOnExternalClick($event)',
                },
                template: "\n        <div [hidden]=\"showColorPicker\" class=\"canvas-whiteboard-colorpicker-input\"\n               (click)=\"toggleColorPicker($event)\">\n               <div class=\"selected-color-type-wrapper\">{{previewText}}</div>\n               <div class=\"selected-color-preview\" [style.background]=\"selectedColor\"></div>\n        </div>\n        <div [hidden]=\"!showColorPicker\" class=\"canvas-whiteboard-colorpicker-wrapper\">\n            <div (click)=\"selectColor('transparent')\" class=\"transparent-color\">Transparent</div>\n            <canvas #canvaswhiteboardcolorpicker class=\"canvas-whiteboard-colorpicker\" width=\"284\" height=\"155\"\n                    (click)=\"selectColor(determineColorFromCanvas($event))\"></canvas>\n        </div>\n    ",
                styles: ["\n        .selected-color-preview {\n            width: 100%;\n            height: 20%;\n            position: absolute;\n            bottom: 0;\n            left: 0;\n        }\n        \n        .selected-color-type-wrapper {\n            display: inline-block;\n            height: 100%;\n            width: 100%;\n            text-align: center;\n            font-size: 14px;\n            color: #000;\n        }\n        \n        .transparent-color {\n            font-size: 14px;\n        }\n        \n        .canvas-whiteboard-colorpicker-wrapper {\n            border: 1px solid #afafaf;\n            color: #000;\n        }\n\n        @media (min-width: 401px) {\n            .canvas-whiteboard-colorpicker-wrapper {\n                position: absolute;\n            }\n        }\n\n        .canvas-whiteboard-colorpicker-input {\n            display: inline-block;\n            position:relative;\n            width: 44px;\n            height: 44px;\n            margin: 5px;\n            cursor: pointer;\n            color: #000;\n        }\n    "]
            },] },
];
/** @nocollapse */
CanvasWhiteboardColorPickerComponent.ctorParameters = function () { return [
    { type: ElementRef }
]; };
CanvasWhiteboardColorPickerComponent.propDecorators = {
    previewText: [{ type: Input }],
    selectedColor: [{ type: Input }],
    canvas: [{ type: ViewChild, args: ['canvaswhiteboardcolorpicker',] }],
    showColorPicker: [{ type: Input }],
    onToggleColorPicker: [{ type: Output }],
    onColorSelected: [{ type: Output }],
    onSecondaryColorSelected: [{ type: Output }]
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardShapePreviewComponent = /** @class */ (function () {
    function CanvasWhiteboardShapePreviewComponent() {
    }
    /**
     * @return {?}
     */
    CanvasWhiteboardShapePreviewComponent.prototype.ngAfterViewInit = function () {
        this.drawShapePreview();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CanvasWhiteboardShapePreviewComponent.prototype.ngOnChanges = function (changes) {
        if (changes["shapeConstructor"] || changes["shapeOptions"]) {
            this.drawShapePreview();
        }
    };
    /**
     * @return {?}
     */
    CanvasWhiteboardShapePreviewComponent.prototype.drawShapePreview = function () {
        if (!this.canvas) {
            return;
        }
        /** @type {?} */
        var context = this.canvas.nativeElement.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        /** @type {?} */
        var concreteShape = new this.shapeConstructor(new CanvasWhiteboardPoint(0, 0), Object.assign(new CanvasWhiteboardShapeOptions(), this.shapeOptions));
        concreteShape.drawPreview(context);
    };
    return CanvasWhiteboardShapePreviewComponent;
}());
CanvasWhiteboardShapePreviewComponent.decorators = [
    { type: Component, args: [{
                selector: "canvas-whiteboard-shape-preview",
                template: "\n        <canvas #canvasWhiteboardShapePreview width=\"50px\" height=\"50px\"\n                class=\"canvas-whiteboard-shape-preview-canvas\"></canvas>\n    ",
                styles: ["\n        .canvas-whiteboard-shape-preview-canvas {\n            cursor: pointer;\n        }\n    "]
            },] },
];
CanvasWhiteboardShapePreviewComponent.propDecorators = {
    shapeConstructor: [{ type: Input }],
    shapeOptions: [{ type: Input }],
    canvas: [{ type: ViewChild, args: ['canvasWhiteboardShapePreview',] }]
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasWhiteboardModule = /** @class */ (function () {
    function CanvasWhiteboardModule() {
    }
    return CanvasWhiteboardModule;
}());
CanvasWhiteboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CanvasWhiteboardComponent,
                    CanvasWhiteboardColorPickerComponent,
                    CanvasWhiteboardShapeSelectorComponent,
                    CanvasWhiteboardShapePreviewComponent
                ],
                providers: [
                    CanvasWhiteboardService,
                    CanvasWhiteboardShapeService
                ],
                exports: [CanvasWhiteboardComponent]
            },] },
];
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */
export { CanvasWhiteboardComponent, CanvasWhiteboardUpdate, CanvasWhiteboardService, CanvasWhiteboardPoint, CanvasWhiteboardShape, CanvasWhiteboardShapeOptions, CanvasWhiteboardShapeService, RectangleShape, CircleShape, CanvasWhiteboardShapeSelectorComponent, CanvasWhiteboardColorPickerComponent, CanvasWhiteboardShapePreviewComponent, CanvasWhiteboardModule, DEFAULT_STYLES };
//# sourceMappingURL=ng2-canvas-whiteboard.es5.js.map
