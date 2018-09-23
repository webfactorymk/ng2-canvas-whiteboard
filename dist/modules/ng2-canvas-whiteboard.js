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
const CanvasWhiteboardUpdateType = {
    START: 0,
    DRAG: 1,
    STOP: 2,
};
CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType.START] = 'START';
CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType.DRAG] = 'DRAG';
CanvasWhiteboardUpdateType[CanvasWhiteboardUpdateType.STOP] = 'STOP';
class CanvasWhiteboardUpdate {
    /**
     * @param {?} json
     * @return {?}
     */
    static deserializeJson(json) {
        /** @type {?} */
        let parsedJson;
        try {
            parsedJson = JSON.parse(json);
            return new CanvasWhiteboardUpdate(parsedJson['x'], parsedJson['y'], parsedJson['type'], parsedJson['uuid'], parsedJson['selectedShape'], parsedJson['selectedShapeOptions']);
        }
        catch (e) {
            console.error("The canvas whiteboard update is not p1" +
                "arseable");
            return null;
        }
    }
    /**
     * @param {?=} x
     * @param {?=} y
     * @param {?=} type
     * @param {?=} UUID
     * @param {?=} selectedShape
     * @param {?=} selectedShapeOptions
     */
    constructor(x, y, type, UUID, selectedShape, selectedShapeOptions) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.UUID = UUID;
        this.selectedShape = selectedShape;
        this.selectedShapeOptions = selectedShapeOptions;
    }
    /**
     * @return {?}
     */
    stringify() {
        /** @type {?} */
        let objectToSerialize = {
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_STYLES = `
.canvas_whiteboard_button {
    display: inline-block;
    outline: 0px;
    padding-top: 7px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}

.canvas_whiteboard_buttons { 
    z-index: 3;
}

@media (max-width: 400px) {
     .canvas_whiteboard_buttons {
            position: absolute;
            z-inde
            top: 0;
            width: 100%;
            text-align: center;
      }
}
        
@media (min-width: 401px) { 
    .canvas_whiteboard_buttons {
        position: absolute;
        right: 0%;
        color: #fff;
    }
}

.canvas_whiteboard_buttons {
    padding: 5px;
}

.canvas_whiteboard_buttons > button {
    margin: 5px;
}

.canvas_whiteboard_button-draw_animated {
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes pulsate {
    0% {
        -webkit-transform: scale(0.1, 0.1);
        opacity: 0.0;
    }
    50% {
        opacity: 1.0;
    }
    100% {
        -webkit-transform: scale(1.2, 1.2);
        opacity: 0.0;
    }
}
.canvas_wrapper_div {
    width: 100%;
    height: 100%;
    border: 0.5px solid #e2e2e2;
}

.canvas_whiteboard_button-clear {
    padding-top: 5px;
}

.canvas_whiteboard {
    position: absolute;
    z-index: 1;
}

.incomplete_shapes_canvas_whiteboard {
    position: absolute;
    z-index: 2;
}

`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CanvasWhiteboardService {
    constructor() {
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
    drawCanvas(updates) {
        this._canvasDrawSubject.next(updates);
    }
    /**
     * @return {?}
     */
    clearCanvas() {
        this._canvasClearSubject.next();
    }
    /**
     * @param {?} updateUUD
     * @return {?}
     */
    undoCanvas(updateUUD) {
        this._canvasUndoSubject.next(updateUUD);
    }
    /**
     * @param {?} updateUUD
     * @return {?}
     */
    redoCanvas(updateUUD) {
        this._canvasRedoSubject.next(updateUUD);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CanvasWhiteboardPoint {
    /**
     * @param {?} x
     * @param {?} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CanvasWhiteboardShapeOptions {
    constructor() {
        this.shouldFillShape = false;
        this.fillStyle = null;
        this.strokeStyle = "rgba(0,0,0,1)";
        this.lineWidth = 2;
        this.lineJoin = "round";
        this.lineCap = "round";
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class CanvasWhiteboardShape {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     */
    constructor(positionPoint, options) {
        this.positionPoint = positionPoint || new CanvasWhiteboardPoint(0, 0);
        this.options = options || new CanvasWhiteboardShapeOptions();
        this.isVisible = true;
    }
    /**
     * @param {?} update
     * @return {?}
     */
    onStopReceived(update) {
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CircleShape extends CanvasWhiteboardShape {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} radius
     */
    constructor(positionPoint, options, radius) {
        super(positionPoint, options);
        this.radius = radius || 0;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    draw(context) {
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);
        Object.assign(context, this.options);
        context.stroke();
        if (this.options.shouldFillShape) {
            context.fill();
        }
        context.closePath();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    drawPreview(context) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    }
    /**
     * @param {?} update
     * @return {?}
     */
    onUpdateReceived(update) {
        this.radius = this.calculateRadius(update.x, update.y);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    calculateRadius(x, y) {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RectangleShape extends CanvasWhiteboardShape {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} width
     * @param {?=} height
     */
    constructor(positionPoint, options, width, height) {
        super(positionPoint, options);
        this.width = width || 0;
        this.height = height || 0;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    draw(context) {
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
    }
    /**
     * @param {?} context
     * @return {?}
     */
    drawPreview(context) {
        this.positionPoint = new CanvasWhiteboardPoint(2, 2);
        this.width = context.canvas.width - 4;
        this.height = context.canvas.height - 4;
        this.draw(context);
    }
    /**
     * @param {?} update
     * @return {?}
     */
    onUpdateReceived(update) {
        this.width = update.x - this.positionPoint.x;
        this.height = update.y - this.positionPoint.y;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FreeHandShape extends CanvasWhiteboardShape {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     */
    constructor(positionPoint, options) {
        super(positionPoint, options);
        this.linePositions = [];
    }
    /**
     * @param {?} context
     * @return {?}
     */
    draw(context) {
        Object.assign(context, this.options);
        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        // Draw a dot
        context.lineTo(this.positionPoint.x + 1, this.positionPoint.y + 1);
        /** @type {?} */
        let i = 0;
        while (i < this.linePositions.length) {
            if (this.linePositions.length - i > 2) {
                /** @type {?} */
                let controlPoint1 = this.linePositions[i];
                /** @type {?} */
                let controlPoint2 = this.linePositions[i + 1];
                /** @type {?} */
                let endPoint = this.linePositions[i + 2];
                context.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endPoint.x, endPoint.y);
                i += 2;
            }
            else {
                /** @type {?} */
                let linePosition = this.linePositions[i];
                context.lineTo(linePosition.x, linePosition.y);
                i += 1;
            }
        }
        context.stroke();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    drawPreview(context) {
        this.positionPoint = new CanvasWhiteboardPoint(2, 2);
        this.linePositions = [
            new CanvasWhiteboardPoint(context.canvas.width - 5, context.canvas.height * 0.3),
            // new CanvasWhiteboardPoint(context.canvas.width * 0.4, context.canvas.height * 0.6),
            new CanvasWhiteboardPoint(context.canvas.width * 0.2, context.canvas.height * 0.4),
            new CanvasWhiteboardPoint(context.canvas.width * 0.6, context.canvas.height * 0.8),
            new CanvasWhiteboardPoint(context.canvas.width, context.canvas.height)
        ];
        this.draw(context);
    }
    /**
     * @param {?} update
     * @return {?}
     */
    onUpdateReceived(update) {
        this.linePositions.push(new CanvasWhiteboardPoint(update.x, update.y));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SmileyShape extends CanvasWhiteboardShape {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} radius
     */
    constructor(positionPoint, options, radius) {
        super(positionPoint, options);
        options.shouldFillShape = true;
        options.fillStyle = options.fillStyle || "yellow";
        this.radius = radius || 0;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    draw(context) {
        context.beginPath();
        Object.assign(context, this.options);
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.stroke();
        context.beginPath();
        /** @type {?} */
        let leftEyeX = this.positionPoint.x - this.radius * 0.3;
        /** @type {?} */
        let rightEyeX = this.positionPoint.x + this.radius * 0.3;
        /** @type {?} */
        const eyesY = this.positionPoint.y - this.radius * 0.2;
        /** @type {?} */
        const eyeSize = this.radius * 0.1;
        context.arc(leftEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.arc(rightEyeX, eyesY, eyeSize, 0, 2 * Math.PI, false);
        context.fillStyle = this.options.strokeStyle;
        context.fill();
        // draw the mouth
        context.beginPath();
        context.arc(this.positionPoint.x, this.positionPoint.y, this.radius * 0.7, 0, Math.PI, false);
        context.stroke();
        context.closePath();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    drawPreview(context) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    }
    /**
     * @param {?} update
     * @return {?}
     */
    onUpdateReceived(update) {
        this.radius = this.calculateRadius(update.x, update.y);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    calculateRadius(x, y) {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StarShape extends CanvasWhiteboardShape {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} radius
     * @param {?=} spikes
     */
    constructor(positionPoint, options, radius, spikes) {
        super(positionPoint, options);
        this.radius = radius || 0;
        this.spikes = this.spikes || 5;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    draw(context) {
        Object.assign(context, this.options);
        /** @type {?} */
        let rotation = Math.PI / 2 * 3;
        /** @type {?} */
        let spikeX = this.positionPoint.x;
        /** @type {?} */
        let spikeY = this.positionPoint.y;
        /** @type {?} */
        let step = Math.PI / this.spikes;
        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y - this.radius);
        for (let i = 0; i < this.spikes; i++) {
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
    }
    /**
     * @param {?} context
     * @return {?}
     */
    drawPreview(context) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    }
    /**
     * @param {?} update
     * @return {?}
     */
    onUpdateReceived(update) {
        this.radius = this.calculateRadius(update.x, update.y);
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    calculateRadius(x, y) {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LineShape extends CanvasWhiteboardShape {
    /**
     * @param {?=} positionPoint
     * @param {?=} options
     * @param {?=} endPosition
     */
    constructor(positionPoint, options, endPosition) {
        super(positionPoint, options);
        this.endPosition = endPosition || new CanvasWhiteboardPoint(this.positionPoint.x, this.positionPoint.y);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    draw(context) {
        if (!this.endPosition) {
            return;
        }
        context.beginPath();
        Object.assign(context, this.options);
        context.moveTo(this.positionPoint.x, this.positionPoint.y);
        context.lineTo(this.endPosition.x, this.endPosition.y);
        context.closePath();
        context.stroke();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    drawPreview(context) {
        this.positionPoint = new CanvasWhiteboardPoint(0, 0);
        this.endPosition = new CanvasWhiteboardPoint(context.canvas.width, context.canvas.height);
        this.draw(context);
    }
    /**
     * @param {?} update
     * @return {?}
     */
    onUpdateReceived(update) {
        this.endPosition = new CanvasWhiteboardPoint(update.x, update.y);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @record
 * @template T
 */

class CanvasWhiteboardShapeService {
    constructor() {
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
    getShapeConstructorFromShapeName(shapeName) {
        return this.getCurrentRegisteredShapes().find((shape) => shape.name === shapeName);
    }
    /**
     * @return {?}
     */
    getCurrentRegisteredShapes() {
        return this._registeredShapesSubject.getValue();
    }
    /**
     * @param {?} shape
     * @return {?}
     */
    isRegisteredShape(shape) {
        return this.getCurrentRegisteredShapes().indexOf(shape) !== -1;
    }
    /**
     * @param {?} shape
     * @return {?}
     */
    registerShape(shape) {
        if (this.isRegisteredShape(shape)) {
            console.warn(`You tried to register a shape:${shape}, but is has already been registered.`);
            return;
        }
        /** @type {?} */
        let registeredShapes = this.getCurrentRegisteredShapes();
        registeredShapes.push(shape);
        this._registeredShapesSubject.next(registeredShapes);
    }
    /**
     * @param {?} shapes
     * @return {?}
     */
    registerShapes(shapes) {
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes()
            .concat(shapes.filter((shape) => {
            if (this.isRegisteredShape(shape)) {
                console.warn(`You tried to register a shape:${shape}, but is has already been registered.`);
                return false;
            }
            return true;
        })));
    }
    /**
     * @param {?} shape
     * @return {?}
     */
    unregisterShape(shape) {
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes().filter((registeredShape) => registeredShape !== shape));
    }
    /**
     * @param {?} shapes
     * @return {?}
     */
    unregisterShapes(shapes) {
        this._registeredShapesSubject.next(this.getCurrentRegisteredShapes().filter((shape) => shapes.indexOf(shape) === -1));
    }
}
CanvasWhiteboardShapeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CanvasWhiteboardShapeService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CanvasWhiteboardComponent {
    /**
     * @param {?} ngZone
     * @param {?} _changeDetector
     * @param {?} _canvasWhiteboardService
     * @param {?} _canvasWhiteboardShapeService
     */
    constructor(ngZone, _changeDetector, _canvasWhiteboardService, _canvasWhiteboardShapeService) {
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
    /**
     * @param {?} imageUrl
     * @return {?}
     */
    set imageUrl(imageUrl) {
        this._imageUrl = imageUrl;
        this._imageElement = null;
        this._redrawHistory();
    }
    /**
     * @return {?}
     */
    get imageUrl() {
        return this._imageUrl;
    }
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     * @return {?}
     */
    ngOnInit() {
        this._initInputsFromOptions(this.options);
        this._initCanvasEventListeners();
        this._initCanvasServiceObservables();
        this.context = this.canvas.nativeElement.getContext("2d");
        this._incompleteShapesCanvasContext = this._incompleteShapesCanvas.nativeElement.getContext("2d");
    }
    /**
     * If an image exists and it's url changes, we need to redraw the new image on the canvas.
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.options && changes.options.currentValue != changes.options.previousValue) {
            this._initInputsFromOptions(changes.options.currentValue);
        }
    }
    /**
     * Recalculate the width and height of the canvas after the view has been fully initialized
     * @return {?}
     */
    ngAfterViewInit() {
        this._calculateCanvasWidthAndHeight();
        this._redrawHistory();
    }
    /**
     * This method reads the options which are helpful since they can be really long when specified in HTML
     * This method is also called everytime the options object changes
     * For security reasons we must check each item on its own since if we iterate the keys
     * we may be injected with malicious values
     *
     * @param {?} options
     * @return {?}
     */
    _initInputsFromOptions(options) {
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
    }
    /**
     * @param {?} property
     * @return {?}
     */
    _isNullOrUndefined(property) {
        return property === null || property === undefined;
    }
    /**
     * Init global window listeners like resize and keydown
     * @return {?}
     */
    _initCanvasEventListeners() {
        this.ngZone.runOutsideAngular(() => {
            this._resizeSubscription = fromEvent(window, 'resize')
                .pipe(debounceTime(200), distinctUntilChanged())
                .subscribe(() => {
                this.ngZone.run(() => {
                    this._redrawCanvasOnResize();
                });
            });
        });
        window.addEventListener("keydown", this._canvasKeyDown.bind(this), false);
    }
    /**
     * Subscribes to new signals in the canvas whiteboard service and executes methods accordingly
     * Because of circular publishing and subscribing, the canvas methods do not use the service when
     * local actions are completed (Ex. clicking undo from the button inside this component)
     * @return {?}
     */
    _initCanvasServiceObservables() {
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasDrawSubject$
            .subscribe(updates => this.drawUpdates(updates)));
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasClearSubject$
            .subscribe(() => this.clearCanvas()));
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasUndoSubject$
            .subscribe((updateUUD) => this._undoCanvas(updateUUD)));
        this._canvasWhiteboardServiceSubscriptions.push(this._canvasWhiteboardService.canvasRedoSubject$
            .subscribe((updateUUD) => this._redoCanvas(updateUUD)));
        this._registeredShapesSubscription = this._canvasWhiteboardShapeService.registeredShapes$.subscribe((shapes) => {
            if (!this.selectedShapeConstructor || !this._canvasWhiteboardShapeService.isRegisteredShape(this.selectedShapeConstructor)) {
                this.selectedShapeConstructor = shapes[0];
            }
        });
    }
    /**
     * Calculate the canvas width and height from it's parent container width and height (use aspect ratio if needed)
     * @return {?}
     */
    _calculateCanvasWidthAndHeight() {
        this.context.canvas.width = this.canvas.nativeElement.parentNode.clientWidth;
        if (this.aspectRatio) {
            this.context.canvas.height = this.canvas.nativeElement.parentNode.clientWidth * this.aspectRatio;
        }
        else {
            this.context.canvas.height = this.canvas.nativeElement.parentNode.clientHeight;
        }
        this._incompleteShapesCanvasContext.canvas.width = this.context.canvas.width;
        this._incompleteShapesCanvasContext.canvas.height = this.context.canvas.height;
    }
    /**
     * Load an image and draw it on the canvas (if an image exists)
     * @param {?=} callbackFn A function that is called after the image loading is finished
     * @return {?} Emits a value when the image has been loaded.
     */
    _loadImage(callbackFn) {
        this._canDraw = false;
        //If we already have the image there is no need to acquire it
        if (this._imageElement) {
            this._canDraw = true;
            callbackFn && callbackFn();
            return;
        }
        this._imageElement = new Image();
        this._imageElement.addEventListener("load", () => {
            this._canDraw = true;
            callbackFn && callbackFn();
            this.onImageLoaded.emit(true);
        });
        this._imageElement.src = this.imageUrl;
    }
    /**
     * Sends a notification after clearing the canvas
     * This method should only be called from the clear button in this component since it will emit an clear event
     * If the client calls this method he may create a circular clear action which may cause danger.
     * @return {?}
     */
    clearCanvasLocal() {
        this.clearCanvas();
        this.onClear.emit(true);
    }
    /**
     * Clears all content on the canvas.
     * @return {?}
     */
    clearCanvas() {
        this._removeCanvasData();
        this._redoStack = [];
    }
    /**
     * This method resets the state of the canvas and redraws it.
     * It calls a callback function after redrawing
     * @param {?=} callbackFn
     * @return {?}
     */
    _removeCanvasData(callbackFn) {
        this._shapesMap = new Map();
        this._clientDragging = false;
        this._updateHistory = [];
        this._undoStack = [];
        this._redrawBackground(callbackFn);
    }
    /**
     * Clears the canvas and redraws the image if the url exists.
     * @param {?=} callbackFn A function that is called after the background is redrawn
     * @return {?} Emits a value when the clearing is finished
     */
    _redrawBackground(callbackFn) {
        if (this.context) {
            if (this.imageUrl) {
                this._loadImage(() => {
                    this.context.save();
                    this._drawImage(this.context, this._imageElement, 0, 0, this.context.canvas.width, this.context.canvas.height, 0.5, 0.5);
                    this.context.restore();
                    this._drawMissingUpdates();
                    callbackFn && callbackFn();
                });
            }
            else {
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                this._drawStartingColor();
                callbackFn && callbackFn();
            }
        }
    }
    /**
     * @return {?}
     */
    _drawStartingColor() {
        /** @type {?} */
        let previousFillStyle = this.context.fillStyle;
        this.context.save();
        this.context.fillStyle = this.startingColor;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = previousFillStyle;
        this.context.restore();
    }
    /**
     * @deprecated Use getDrawingEnabled(): boolean
     * @return {?}
     */
    getShouldDraw() {
        return this.getDrawingEnabled();
    }
    /**
     * Returns a value of whether the user clicked the draw button on the canvas.
     * @return {?}
     */
    getDrawingEnabled() {
        return this.drawingEnabled;
    }
    /**
     * Toggles drawing on the canvas. It is called via the draw button on the canvas.
     * @return {?}
     */
    toggleDrawingEnabled() {
        this.drawingEnabled = !this.drawingEnabled;
    }
    /**
     * Set if drawing is enabled from the client using the canvas
     * @param {?} drawingEnabled
     * @return {?}
     */
    setDrawingEnabled(drawingEnabled) {
        this.drawingEnabled = drawingEnabled;
    }
    /**
     * @deprecated Please use the changeStrokeColor(newStrokeColor: string): void method
     * @param {?} newStrokeColor
     * @return {?}
     */
    changeColor(newStrokeColor) {
        this.changeStrokeColor(newStrokeColor);
    }
    /**
     * Replaces the drawing color with a new color
     * The format should be ("#ffffff" or "rgb(r,g,b,a?)")
     * This method is public so that anyone can access the canvas and change the stroke color
     *
     * @param {?} newStrokeColor The new stroke color
     * @return {?}
     */
    changeStrokeColor(newStrokeColor) {
        this.strokeColor = newStrokeColor;
        this.canvasWhiteboardShapePreviewOptions = this.generateShapePreviewOptions();
        this._changeDetector.detectChanges();
    }
    /**
     * Replaces the fill color with a new color
     * The format should be ("#ffffff" or "rgb(r,g,b,a?)")
     * This method is public so that anyone can access the canvas and change the fill color
     *
     * @param {?} newFillColor The new fill color
     * @return {?}
     */
    changeFillColor(newFillColor) {
        this.fillColor = newFillColor;
        this.canvasWhiteboardShapePreviewOptions = this.generateShapePreviewOptions();
        this._changeDetector.detectChanges();
    }
    /**
     * This method is invoked by the undo button on the canvas screen
     * It calls the global undo method and emits a notification after undoing.
     * This method should only be called from the undo button in this component since it will emit an undo event
     * If the client calls this method he may create a circular undo action which may cause danger.
     * @return {?}
     */
    undoLocal() {
        this.undo((updateUUID) => {
            this._redoStack.push(updateUUID);
            this.onUndo.emit(updateUUID);
        });
    }
    /**
     * This methods selects the last uuid prepares it for undoing (making the whole update sequence invisible)
     * This method can be called if the canvas component is a ViewChild of some other component.
     * This method will work even if the undo button has been disabled
     * @param {?=} callbackFn
     * @return {?}
     */
    undo(callbackFn) {
        if (!this._undoStack.length)
            return;
        /** @type {?} */
        let updateUUID = this._undoStack.pop();
        this._undoCanvas(updateUUID);
        callbackFn && callbackFn(updateUUID);
    }
    /**
     * This method takes an UUID for an update, and redraws the canvas by making all updates with that uuid invisible
     * @param {?} updateUUID
     * @return {?}
     */
    _undoCanvas(updateUUID) {
        if (this._shapesMap.has(updateUUID)) {
            /** @type {?} */
            let shape = this._shapesMap.get(updateUUID);
            shape.isVisible = false;
            this.drawAllShapes();
        }
    }
    /**
     * This method is invoked by the redo button on the canvas screen
     * It calls the global redo method and emits a notification after redoing
     * This method should only be called from the redo button in this component since it will emit an redo event
     * If the client calls this method he may create a circular redo action which may cause danger.
     * @return {?}
     */
    redoLocal() {
        this.redo((updateUUID) => {
            this._undoStack.push(updateUUID);
            this.onRedo.emit(updateUUID);
        });
    }
    /**
     * This methods selects the last uuid prepares it for redoing (making the whole update sequence visible)
     * This method can be called if the canvas component is a ViewChild of some other component.
     * This method will work even if the redo button has been disabled
     * @param {?=} callbackFn
     * @return {?}
     */
    redo(callbackFn) {
        if (!this._redoStack.length)
            return;
        /** @type {?} */
        let updateUUID = this._redoStack.pop();
        this._redoCanvas(updateUUID);
        callbackFn && callbackFn(updateUUID);
    }
    /**
     * This method takes an UUID for an update, and redraws the canvas by making all updates with that uuid visible
     * @param {?} updateUUID
     * @return {?}
     */
    _redoCanvas(updateUUID) {
        if (this._shapesMap.has(updateUUID)) {
            /** @type {?} */
            let shape = this._shapesMap.get(updateUUID);
            shape.isVisible = true;
            this.drawAllShapes();
        }
    }
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
    canvasUserEvents(event) {
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
        let update;
        /** @type {?} */
        let updateType;
        /** @type {?} */
        let eventPosition = this._getCanvasEventPosition(event);
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
    }
    /**
     * Get the coordinates (x,y) from a given event
     * If it is a touch event, get the touch positions
     * If we released the touch, the position will be placed in the changedTouches object
     * If it is not a touch event, use the original mouse event received
     * @param {?} eventData
     * @return {?}
     */
    _getCanvasEventPosition(eventData) {
        /** @type {?} */
        let canvasBoundingRect = this.context.canvas.getBoundingClientRect();
        /** @type {?} */
        let hasTouches = (eventData.touches && eventData.touches.length) ? eventData.touches[0] : null;
        if (!hasTouches)
            hasTouches = (eventData.changedTouches && eventData.changedTouches.length) ? eventData.changedTouches[0] : null;
        /** @type {?} */
        let event = hasTouches ? hasTouches : eventData;
        /** @type {?} */
        const scaleWidth = canvasBoundingRect.width / this.context.canvas.width;
        /** @type {?} */
        const scaleHeight = canvasBoundingRect.height / this.context.canvas.height;
        /** @type {?} */
        let xPosition = (event.clientX - canvasBoundingRect.left);
        /** @type {?} */
        let yPosition = (event.clientY - canvasBoundingRect.top);
        xPosition /= this.scaleFactor ? this.scaleFactor : scaleWidth;
        yPosition /= this.scaleFactor ? this.scaleFactor : scaleHeight;
        return new CanvasWhiteboardPoint(xPosition / this.context.canvas.width, yPosition / this.context.canvas.height);
    }
    /**
     * The update coordinates on the canvas are mapped so that all receiving ends
     * can reverse the mapping and get the same position as the one that
     * was drawn on this update.
     *
     * @param {?} update The CanvasWhiteboardUpdate object.
     * @return {?}
     */
    _prepareToSendUpdate(update) {
        this._prepareUpdateForBatchDispatch(update);
    }
    /**
     * Catches the Key Up events made on the canvas.
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 90 (z), an undo action will be performed
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 89 (y), a redo action will be performed
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 83 (s) or 115(S), a save action will be performed
     *
     * @param {?} event The event that occurred.
     * @return {?}
     */
    _canvasKeyDown(event) {
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
    }
    /**
     * On window resize, recalculate the canvas dimensions and redraw the history
     * @return {?}
     */
    _redrawCanvasOnResize() {
        this._calculateCanvasWidthAndHeight();
        this._redrawHistory();
    }
    /**
     * Redraw the saved history after resetting the canvas state
     * @return {?}
     */
    _redrawHistory() {
        /** @type {?} */
        let updatesToDraw = [].concat(this._updateHistory);
        this._removeCanvasData(() => {
            updatesToDraw.forEach((update) => {
                this._draw(update);
            });
        });
    }
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
    _draw(update) {
        this._updateHistory.push(update);
        //map the canvas coordinates to our canvas size since they are scaled.
        update = Object.assign(new CanvasWhiteboardUpdate(), update, {
            x: update.x * this.context.canvas.width,
            y: update.y * this.context.canvas.height
        });
        if (update.type === CanvasWhiteboardUpdateType.START) {
            /** @type {?} */
            let updateShapeConstructor = this._canvasWhiteboardShapeService.getShapeConstructorFromShapeName(update.selectedShape);
            /** @type {?} */
            let shape = new updateShapeConstructor(new CanvasWhiteboardPoint(update.x, update.y), Object.assign(new CanvasWhiteboardShapeOptions(), update.selectedShapeOptions));
            this._incompleteShapesMap.set(update.UUID, shape);
            this._drawIncompleteShapes();
        }
        else if (update.type === CanvasWhiteboardUpdateType.DRAG) {
            /** @type {?} */
            let shape = this._incompleteShapesMap.get(update.UUID);
            shape && shape.onUpdateReceived(update);
            this._drawIncompleteShapes();
        }
        else if (CanvasWhiteboardUpdateType.STOP) {
            /** @type {?} */
            let shape = this._incompleteShapesMap.get(update.UUID);
            shape && shape.onStopReceived(update);
            this._shapesMap.set(update.UUID, shape);
            this._incompleteShapesMap.delete(update.UUID);
            this._swapCompletedShapeToActualCanvas(shape);
        }
    }
    /**
     * @return {?}
     */
    _drawIncompleteShapes() {
        this._resetIncompleteShapeCanvas();
        this._incompleteShapesMap.forEach((shape) => {
            if (shape.isVisible) {
                shape.draw(this._incompleteShapesCanvasContext);
            }
        });
    }
    /**
     * @param {?} shape
     * @return {?}
     */
    _swapCompletedShapeToActualCanvas(shape) {
        this._drawIncompleteShapes();
        if (shape.isVisible) {
            shape.draw(this.context);
        }
    }
    /**
     * @return {?}
     */
    _resetIncompleteShapeCanvas() {
        this._incompleteShapesCanvasContext.clearRect(0, 0, this._incompleteShapesCanvasContext.canvas.width, this._incompleteShapesCanvasContext.canvas.height);
        this._incompleteShapesCanvasContext.fillStyle = "transparent";
        this._incompleteShapesCanvasContext.fillRect(0, 0, this._incompleteShapesCanvasContext.canvas.width, this._incompleteShapesCanvasContext.canvas.height);
    }
    /**
     * Delete everything from the screen, redraw the background, and then redraw all the shapes from the shapesMap
     * @return {?}
     */
    drawAllShapes() {
        this._redrawBackground(() => {
            this._shapesMap.forEach((shape) => {
                if (shape.isVisible) {
                    shape.draw(this.context);
                }
            });
        });
    }
    /**
     * @param {?} update
     * @return {?}
     */
    _addCurrentShapeDataToAnUpdate(update) {
        if (!update.selectedShape) {
            update.selectedShape = this.selectedShapeConstructor.name;
        }
        if (!update.selectedShapeOptions) {
            //Make a deep copy since we don't want some Shape implementation to change something by accident
            update.selectedShapeOptions = Object.assign(new CanvasWhiteboardShapeOptions(), this.generateShapePreviewOptions(), { lineWidth: this.lineWidth });
        }
    }
    /**
     * @return {?}
     */
    generateShapePreviewOptions() {
        return Object.assign(new CanvasWhiteboardShapeOptions(), {
            shouldFillShape: !!this.fillColor,
            fillStyle: this.fillColor,
            strokeStyle: this.strokeColor,
            lineWidth: 2,
            lineJoin: this.lineJoin,
            lineCap: this.lineCap
        });
    }
    /**
     * Sends the update to all receiving ends as an Event emit. This is done as a batch operation (meaning
     * multiple updates are sent at the same time). If this method is called, after 100 ms all updates
     * that were made at that time will be packed up together and sent to the receiver.
     *
     * @param {?} update The update object.
     * @return {?} Emits an Array of Updates when the batch.
     */
    _prepareUpdateForBatchDispatch(update) {
        this._batchUpdates.push(cloneDeep(update));
        if (!this._updateTimeout) {
            this._updateTimeout = setTimeout(() => {
                this.onBatchUpdate.emit(this._batchUpdates);
                this._batchUpdates = [];
                this._updateTimeout = null;
            }, this.batchUpdateTimeoutDuration);
        }
    }
    ;
    /**
     * Draws an Array of Updates on the canvas.
     *
     * @param {?} updates The array with Updates.
     * @return {?}
     */
    drawUpdates(updates) {
        if (this._canDraw) {
            this._drawMissingUpdates();
            updates.forEach((update) => {
                this._draw(update);
            });
        }
        else {
            this._updatesNotDrawn = this._updatesNotDrawn.concat(updates);
        }
    }
    ;
    /**
     * Draw any missing updates that were received before the image was loaded
     * @return {?}
     */
    _drawMissingUpdates() {
        if (this._updatesNotDrawn.length > 0) {
            /** @type {?} */
            let updatesToDraw = this._updatesNotDrawn;
            this._updatesNotDrawn = [];
            updatesToDraw.forEach((update) => {
                this._draw(update);
            });
        }
    }
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
    _drawImage(context, image, x, y, width, height, offsetX, offsetY) {
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
        let imageWidth = image.width;
        /** @type {?} */
        let imageHeight = image.height;
        /** @type {?} */
        let radius = Math.min(width / imageWidth, height / imageHeight);
        /** @type {?} */
        let newWidth = imageWidth * radius;
        /** @type {?} */
        let newHeight = imageHeight * radius;
        /** @type {?} */
        let finalDrawX;
        /** @type {?} */
        let finalDrawY;
        /** @type {?} */
        let finalDrawWidth;
        /** @type {?} */
        let finalDrawHeight;
        /** @type {?} */
        let aspectRatio = 1;
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
    }
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
    generateCanvasDataUrl(returnedDataType = "image/png", returnedDataQuality = 1) {
        return this.context.canvas.toDataURL(returnedDataType, returnedDataQuality);
    }
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
    generateCanvasBlob(callbackFn, returnedDataType = "image/png", returnedDataQuality = 1) {
        /** @type {?} */
        let toBlobMethod;
        if (typeof this.context.canvas.toBlob !== "undefined") {
            toBlobMethod = this.context.canvas.toBlob.bind(this.context.canvas);
        }
        else if (typeof this.context.canvas.msToBlob !== "undefined") {
            toBlobMethod = (callback) => {
                callback && callback(this.context.canvas.msToBlob());
            };
        }
        toBlobMethod && toBlobMethod((blob) => {
            callbackFn && callbackFn(blob, returnedDataType);
        }, returnedDataType, returnedDataQuality);
    }
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
    downloadCanvasImage(returnedDataType = "image/png", downloadData, customFileName) {
        if (window.navigator.msSaveOrOpenBlob === undefined) {
            /** @type {?} */
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', downloadData ? /** @type {?} */ (downloadData) : this.generateCanvasDataUrl(returnedDataType));
            /** @type {?} */
            let fileName = customFileName ? customFileName
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
    }
    /**
     * Save the canvas blob (IE) locally
     * @param {?} blob
     * @param {?=} returnedDataType
     * @return {?}
     */
    _saveCanvasBlob(blob, returnedDataType = "image/png") {
        window.navigator.msSaveOrOpenBlob(blob, "canvas_drawing_" + new Date().valueOf() + this._generateDataTypeString(returnedDataType));
    }
    /**
     * This method generates a canvas url string or a canvas blob with the presented data type
     * A callback function is then invoked since the blob creation must be done via a callback
     *
     * @param {?} callback
     * @param {?=} returnedDataType
     * @param {?=} returnedDataQuality
     * @return {?}
     */
    generateCanvasData(callback, returnedDataType = "image/png", returnedDataQuality = 1) {
        if (window.navigator.msSaveOrOpenBlob === undefined) {
            callback && callback(this.generateCanvasDataUrl(returnedDataType, returnedDataQuality));
        }
        else {
            this.generateCanvasBlob(callback, returnedDataType, returnedDataQuality);
        }
    }
    /**
     * Local method to invoke saving of the canvas data when clicked on the canvas Save button
     * This method will emit the generated data with the specified Event Emitter
     *
     * @param {?=} returnedDataType
     * @return {?}
     */
    saveLocal(returnedDataType = "image/png") {
        this.generateCanvasData((generatedData) => {
            this.onSave.emit(generatedData);
            if (this.shouldDownloadDrawing) {
                this.downloadCanvasImage(returnedDataType, generatedData);
            }
        });
    }
    /**
     * @param {?} returnedDataType
     * @return {?}
     */
    _generateDataTypeString(returnedDataType) {
        if (returnedDataType) {
            return "." + returnedDataType.split('/')[1];
        }
        return "";
    }
    /**
     * Toggles the color picker window, delegating the showColorPicker Input to the ColorPickerComponent.
     * If no value is supplied (null/undefined) the current value will be negated and used.
     * @param {?} value
     * @return {?}
     */
    toggleStrokeColorPicker(value) {
        this.showStrokeColorPicker = !this._isNullOrUndefined(value) ? value : !this.showStrokeColorPicker;
    }
    /**
     * Toggles the color picker window, delegating the showColorPicker Input to the ColorPickerComponent.
     * If no value is supplied (null/undefined) the current value will be negated and used.
     * @param {?} value
     * @return {?}
     */
    toggleFillColorPicker(value) {
        this.showFillColorPicker = !this._isNullOrUndefined(value) ? value : !this.showFillColorPicker;
    }
    /**
     * Toggles the shape selector window, delegating the showShapeSelector Input to the CanvasWhiteboardShapeSelectorComponent.
     * If no value is supplied (null/undefined) the current value will be negated and used.
     * @param {?} value
     * @return {?}
     */
    toggleShapeSelector(value) {
        this.showShapeSelector = !this._isNullOrUndefined(value) ? value : !this.showShapeSelector;
    }
    /**
     * @param {?} newShapeBlueprint
     * @return {?}
     */
    selectShape(newShapeBlueprint) {
        this.selectedShapeConstructor = newShapeBlueprint;
    }
    /**
     * Returns a deep copy of the current drawing history for the canvas.
     * The deep copy is returned because we don't want anyone to mutate the current history
     * @return {?}
     */
    getDrawingHistory() {
        return cloneDeep(this._updateHistory);
    }
    /**
     * Unsubscribe from a given subscription if it is active
     * @param {?} subscription
     * @return {?}
     */
    _unsubscribe(subscription) {
        if (subscription)
            subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    _generateUUID() {
        return this._random4() + this._random4() + "-" + this._random4() + "-" + this._random4() + "-" +
            this._random4() + "-" + this._random4() + this._random4() + this._random4();
    }
    /**
     * @return {?}
     */
    _random4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    /**
     * Unsubscribe from the service observables
     * @return {?}
     */
    ngOnDestroy() {
        this._unsubscribe(this._resizeSubscription);
        this._unsubscribe(this._registeredShapesSubscription);
        this._canvasWhiteboardServiceSubscriptions.forEach(subscription => this._unsubscribe(subscription));
    }
}
CanvasWhiteboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'canvas-whiteboard',
                template: `
        <div class="canvas_wrapper_div">
            <div class="canvas_whiteboard_buttons">
                <canvas-whiteboard-shape-selector *ngIf="shapeSelectorEnabled"
                                                  [showShapeSelector]="showShapeSelector"
                                                  [selectedShapeConstructor]="selectedShapeConstructor"
                                                  [shapeOptions]="generateShapePreviewOptions()"
                                                  (onToggleShapeSelector)="toggleShapeSelector($event)"
                                                  (onShapeSelected)="selectShape($event)"></canvas-whiteboard-shape-selector>

                <canvas-whiteboard-colorpicker *ngIf="colorPickerEnabled"
                                               [previewText]="'Fill'"
                                               [showColorPicker]="showFillColorPicker"
                                               [selectedColor]="fillColor"
                                               (onToggleColorPicker)="toggleFillColorPicker($event)"
                                               (onColorSelected)="changeFillColor($event)">
                </canvas-whiteboard-colorpicker>

                <canvas-whiteboard-colorpicker *ngIf="colorPickerEnabled"
                                               [previewText]="'Stroke'"
                                               [showColorPicker]="showStrokeColorPicker"
                                               [selectedColor]="strokeColor"
                                               (onToggleColorPicker)="toggleStrokeColorPicker($event)"
                                               (onColorSelected)="changeStrokeColor($event)">
                </canvas-whiteboard-colorpicker>


                <button *ngIf="drawButtonEnabled" (click)="toggleDrawingEnabled()"
                        [class.canvas_whiteboard_button-draw_animated]="getDrawingEnabled()"
                        class="canvas_whiteboard_button canvas_whiteboard_button-draw" type="button">
                    <i [class]="drawButtonClass" aria-hidden="true"></i> {{drawButtonText}}
                </button>

                <button *ngIf="clearButtonEnabled" (click)="clearCanvasLocal()" type="button"
                        class="canvas_whiteboard_button canvas_whiteboard_button-clear">
                    <i [class]="clearButtonClass" aria-hidden="true"></i> {{clearButtonText}}
                </button>

                <button *ngIf="undoButtonEnabled" (click)="undoLocal()" type="button"
                        class="canvas_whiteboard_button canvas_whiteboard_button-undo">
                    <i [class]="undoButtonClass" aria-hidden="true"></i> {{undoButtonText}}
                </button>

                <button *ngIf="redoButtonEnabled" (click)="redoLocal()" type="button"
                        class="canvas_whiteboard_button canvas_whiteboard_button-redo">
                    <i [class]="redoButtonClass" aria-hidden="true"></i> {{redoButtonText}}
                </button>
                <button *ngIf="saveDataButtonEnabled" (click)="saveLocal()" type="button"
                        class="canvas_whiteboard_button canvas_whiteboard_button-save">
                    <i [class]="saveDataButtonClass" aria-hidden="true"></i> {{saveDataButtonText}}
                </button>
            </div>
            <canvas #canvas class="canvas_whiteboard"></canvas>
            <canvas #incompleteShapesCanvas class="incomplete_shapes_canvas_whiteboard"
                    (mousedown)="canvasUserEvents($event)" (mouseup)="canvasUserEvents($event)"
                    (mousemove)="canvasUserEvents($event)" (mouseout)="canvasUserEvents($event)"
                    (touchstart)="canvasUserEvents($event)" (touchmove)="canvasUserEvents($event)"
                    (touchend)="canvasUserEvents($event)" (touchcancel)="canvasUserEvents($event)"></canvas>
        </div>
    `,
                styles: [DEFAULT_STYLES]
            },] },
];
/** @nocollapse */
CanvasWhiteboardComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: CanvasWhiteboardService },
    { type: CanvasWhiteboardShapeService }
];
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
class CanvasWhiteboardShapeSelectorComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _canvasWhiteboardShapeService
     */
    constructor(_elementRef, _canvasWhiteboardShapeService) {
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
    selectShape(shape) {
        this.onShapeSelected.emit(shape);
        this.toggleShapeSelector(null);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    closeOnExternalClick(event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showShapeSelector) {
            this.onToggleShapeSelector.emit(false);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleShapeSelector(event) {
        if (event) {
            event.preventDefault();
        }
        this.onToggleShapeSelector.emit(!this.showShapeSelector);
    }
}
CanvasWhiteboardShapeSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: "canvas-whiteboard-shape-selector",
                host: {
                    '(document:mousedown)': 'closeOnExternalClick($event)',
                    '(document:touchstart)': 'closeOnExternalClick($event)',
                },
                template: `
        <div *ngIf="!showShapeSelector" (click)="toggleShapeSelector($event)"
             class="canvas-whiteboard-shape-selector-selected-preview">
            <canvas-whiteboard-shape-preview [shapeConstructor]="selectedShapeConstructor"
                                             [shapeOptions]="shapeOptions"></canvas-whiteboard-shape-preview>
        </div>
        <div class="canvas-whiteboard-shape-selector-wrapper" *ngIf="showShapeSelector">
            <canvas-whiteboard-shape-preview *ngFor="let shapeConstructor of registeredShapes$ | async"
                                             [shapeConstructor]="shapeConstructor"
                                             [shapeOptions]="shapeOptions"
                                             (click)="selectShape(shapeConstructor)"></canvas-whiteboard-shape-preview>
        </div>
    `,
                styles: [`
        .canvas-whiteboard-shape-selector-selected-preview {
            vertical-align: bottom;
            display: inline-block;
        }

        .canvas-whiteboard-shape-selector-wrapper {
            display: block;
            padding: 4px;
            border: 1px solid #afafaf;
        }

        @media (min-width: 401px) {
            .canvas-whiteboard-shape-selector-wrapper {
            }
        }
    `]
            },] },
];
/** @nocollapse */
CanvasWhiteboardShapeSelectorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: CanvasWhiteboardShapeService }
];
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
class CanvasWhiteboardColorPickerComponent {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
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
    ngOnInit() {
        this._context = this.canvas.nativeElement.getContext("2d");
        this.createColorPalette();
    }
    /**
     * @return {?}
     */
    createColorPalette() {
        /** @type {?} */
        let gradient = this._context.createLinearGradient(0, 0, this._context.canvas.width, 0);
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    closeOnExternalClick(event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showColorPicker) {
            this.onToggleColorPicker.emit(false);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleColorPicker(event) {
        if (event) {
            event.preventDefault();
        }
        this.onToggleColorPicker.emit(!this.showColorPicker);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    determineColorFromCanvas(event) {
        /** @type {?} */
        let canvasRect = this._context.canvas.getBoundingClientRect();
        /** @type {?} */
        let imageData = this._context.getImageData(event.clientX - canvasRect.left, event.clientY - canvasRect.top, 1, 1);
        return `rgba(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]}, ${imageData.data[3]})`;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    selectColor(color) {
        this.onColorSelected.emit(color);
        this.toggleColorPicker(null);
    }
}
CanvasWhiteboardColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'canvas-whiteboard-colorpicker',
                host: {
                    '(document:mousedown)': 'closeOnExternalClick($event)',
                    '(document:touchstart)': 'closeOnExternalClick($event)',
                },
                template: `
        <div [hidden]="showColorPicker" class="canvas-whiteboard-colorpicker-input"
               (click)="toggleColorPicker($event)">
               <div class="selected-color-type-wrapper">{{previewText}}</div>
               <div class="selected-color-preview" [style.background]="selectedColor"></div>
        </div>
        <div [hidden]="!showColorPicker" class="canvas-whiteboard-colorpicker-wrapper">
            <div (click)="selectColor('transparent')" class="transparent-color">Transparent</div>
            <canvas #canvaswhiteboardcolorpicker class="canvas-whiteboard-colorpicker" width="284" height="155"
                    (click)="selectColor(determineColorFromCanvas($event))"></canvas>
        </div>
    `,
                styles: [`
        .selected-color-preview {
            width: 100%;
            height: 20%;
            position: absolute;
            bottom: 0;
            left: 0;
        }
        
        .selected-color-type-wrapper {
            display: inline-block;
            height: 100%;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #000;
        }
        
        .transparent-color {
            font-size: 14px;
        }
        
        .canvas-whiteboard-colorpicker-wrapper {
            border: 1px solid #afafaf;
            color: #000;
        }

        @media (min-width: 401px) {
            .canvas-whiteboard-colorpicker-wrapper {
                position: absolute;
            }
        }

        .canvas-whiteboard-colorpicker-input {
            display: inline-block;
            position:relative;
            width: 44px;
            height: 44px;
            margin: 5px;
            cursor: pointer;
            color: #000;
        }
    `]
            },] },
];
/** @nocollapse */
CanvasWhiteboardColorPickerComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
class CanvasWhiteboardShapePreviewComponent {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.drawShapePreview();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["shapeConstructor"] || changes["shapeOptions"]) {
            this.drawShapePreview();
        }
    }
    /**
     * @return {?}
     */
    drawShapePreview() {
        if (!this.canvas) {
            return;
        }
        /** @type {?} */
        let context = this.canvas.nativeElement.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        /** @type {?} */
        let concreteShape = new this.shapeConstructor(new CanvasWhiteboardPoint(0, 0), Object.assign(new CanvasWhiteboardShapeOptions(), this.shapeOptions));
        concreteShape.drawPreview(context);
    }
}
CanvasWhiteboardShapePreviewComponent.decorators = [
    { type: Component, args: [{
                selector: "canvas-whiteboard-shape-preview",
                template: `
        <canvas #canvasWhiteboardShapePreview width="50px" height="50px"
                class="canvas-whiteboard-shape-preview-canvas"></canvas>
    `,
                styles: [`
        .canvas-whiteboard-shape-preview-canvas {
            cursor: pointer;
        }
    `]
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
class CanvasWhiteboardModule {
}
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
//# sourceMappingURL=ng2-canvas-whiteboard.js.map
