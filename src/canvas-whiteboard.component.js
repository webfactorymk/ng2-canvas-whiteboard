"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var canvas_whiteboard_update_model_1 = require("./canvas-whiteboard-update.model");
var template_1 = require("./template");
var CanvasWhiteboardComponent = (function () {
    function CanvasWhiteboardComponent() {
        this.drawButtonEnabled = true;
        this.clearButtonEnabled = true;
        this.undoButtonEnabled = true;
        this.onClear = new core_1.EventEmitter();
        this.onUndo = new core_1.EventEmitter();
        this.onBatchUpdate = new core_1.EventEmitter();
        this.onImageLoaded = new core_1.EventEmitter();
        this._shouldDraw = false;
        this._canDraw = true;
        this._clientDragging = false;
        this._undoStack = []; //Stores the value of start and count for each continuous stroke
        this._pathStack = [];
        this._drawHistory = [];
        this._batchUpdates = [];
        this._updatesNotDrawn = [];
    }
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    CanvasWhiteboardComponent.prototype.ngOnInit = function () {
        this._context = this.canvas.nativeElement.getContext("2d");
        this._context.canvas.width = this.canvas.nativeElement.parentNode.clientWidth;
        if (this.aspectRatio) {
            this._context.canvas.height = this.canvas.nativeElement.parentNode.clientWidth * this.aspectRatio;
        }
        else {
            this._context.canvas.height = this.canvas.nativeElement.parentNode.clientHeight;
        }
    };
    CanvasWhiteboardComponent.prototype.ngAfterViewInit = function () {
        this._drawHistory = [];
    };
    /**
     * If an image exists and it's url changes, we need to redraw the new image on the canvas.
     */
    CanvasWhiteboardComponent.prototype.ngOnChanges = function (changes) {
        if (changes.imageUrl && changes.imageUrl.currentValue != changes.imageUrl.previousValue) {
            if (changes.imageUrl.currentValue != null) {
                this._loadImage();
            }
            else {
                this._canDraw = false;
                this._redrawBackground();
            }
        }
    };
    /**
     * Load an image and draw it on the canvas (if an image exists)
     * @constructor
     * @param callbackFn A function that is called after the image loading is finished
     * @return Emits a value when the image has been loaded.
     */
    CanvasWhiteboardComponent.prototype._loadImage = function (callbackFn) {
        var _this = this;
        this._canDraw = false;
        this._imageElement = new Image();
        this._imageElement.addEventListener("load", function () {
            _this._context.save();
            _this._drawImage(_this._context, _this._imageElement, 0, 0, _this._context.canvas.width, _this._context.canvas.height, 0.5, 0.5);
            _this._context.restore();
            _this.drawMissingUpdates();
            _this._canDraw = true;
            callbackFn && callbackFn();
            _this.onImageLoaded.emit(true);
        });
        this._imageElement.src = this.imageUrl;
    };
    /**
     * Clears all content on the canvas.
     * @return Emits a value when the clearing is finished
     */
    CanvasWhiteboardComponent.prototype.clearCanvas = function () {
        this._clientDragging = false;
        this._redrawBackground();
        this._drawHistory = [];
        this._pathStack = [];
        this._undoStack = [];
        this.onClear.emit(true);
    };
    /**
     * Clears the canvas and redraws the image if the url exists.
     * @param callbackFn A function that is called after the background is redrawn
     * @return Emits a value when the clearing is finished
     */
    CanvasWhiteboardComponent.prototype._redrawBackground = function (callbackFn) {
        this._context.setTransform(1, 0, 0, 1, 0, 0);
        this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
        if (this.imageUrl) {
            this._loadImage(function () {
                callbackFn && callbackFn();
            });
        }
    };
    /**
     * Returns a value of whether the user clicked the draw button on the canvas.
     */
    CanvasWhiteboardComponent.prototype.getShouldDraw = function () {
        return this._shouldDraw;
    };
    /**
     * Toggles drawing on the canvas. It is called via the draw button on the canvas.
     */
    CanvasWhiteboardComponent.prototype.toggleShouldDraw = function () {
        this._shouldDraw = !this._shouldDraw;
    };
    /**
     * Undo a drawing action on the canvas.
     * All drawings made after the last Start Draw (mousedown | touchstart) event are removed.
     * @return Emits a value when an Undo is created.
     */
    CanvasWhiteboardComponent.prototype.undoCanvas = function () {
        var _this = this;
        if (this._undoStack.length === 0)
            return;
        var update = this._undoStack.pop();
        var lastDoodleIndex = this._drawHistory.lastIndexOf(update);
        if (lastDoodleIndex != -1) {
            this._drawHistory = this._drawHistory.filter(function (update, index) {
                return index < lastDoodleIndex;
            });
            this._redrawBackground(function () {
                var updatesToDraw = _this._drawHistory;
                _this._drawHistory = [];
                updatesToDraw.forEach(function (update) {
                    _this._draw(update);
                });
            });
            this.onUndo.emit(true);
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
     */
    CanvasWhiteboardComponent.prototype._canvasUserEvents = function (event) {
        if (!this._shouldDraw || !this._canDraw) {
            //Ignore all if we didn't click the _draw! button or the image did not load
            return;
        }
        if ((event.type === 'mousemove' || event.type === 'touchmove' || event.type === 'mouseout') && !this._clientDragging) {
            // Ignore mouse move Events if we're not dragging
            return;
        }
        event.preventDefault();
        switch (event.type) {
            case 'mousedown':
            case 'touchstart':
                this._clientDragging = true;
                var update = new canvas_whiteboard_update_model_1.CanvasWhiteboardUpdate(event.offsetX, event.offsetY, canvas_whiteboard_update_model_1.UPDATE_TYPE.start);
                this._draw(update);
                this._createUpdate(update, event.offsetX, event.offsetY);
                break;
            case 'mousemove':
            case 'touchmove':
                if (this._clientDragging) {
                    var update = new canvas_whiteboard_update_model_1.CanvasWhiteboardUpdate(event.offsetX, event.offsetY, canvas_whiteboard_update_model_1.UPDATE_TYPE.drag);
                    this._draw(update);
                    this._createUpdate(update, event.offsetX, event.offsetY);
                }
                break;
            case 'touchcancel':
            case 'mouseup':
            case 'touchend':
            case 'mouseout':
                this._clientDragging = false;
                var update = new canvas_whiteboard_update_model_1.CanvasWhiteboardUpdate(event.offsetX, event.offsetY, canvas_whiteboard_update_model_1.UPDATE_TYPE.stop);
                this._createUpdate(update, event.offsetX, event.offsetY);
                break;
        }
    };
    /**
     * The update coordinates on the canvas are mapped so that all receiving ends
     * can reverse the mapping and get the same position as the one that
     * was drawn on this update.
     *
     * @param {CanvasWhiteboardUpdate} update The CanvasWhiteboardUpdate object.
     * @param {number} eventX The offsetX that needs to be mapped
     * @param {number} eventY The offsetY that needs to be mapped
     */
    CanvasWhiteboardComponent.prototype._createUpdate = function (update, eventX, eventY) {
        update.setX(eventX / this._context.canvas.width);
        update.setY(eventY / this._context.canvas.height);
        this.sendUpdate(update);
    };
    /**
     * Catches the Key Up events made on the canvas.
     * If the ctrlKey was held and the keyCode is 90 (z), an undo action will be performed
     *
     * @param event The event that occured.
     */
    CanvasWhiteboardComponent.prototype._canvasKeyUp = function (event) {
        if (event.ctrlKey && event.keyCode === 90) {
        }
    };
    /**
     * Draws an CanvasWhiteboardUpdate object on the canvas. if mappedCoordinates? is set, the coordinates
     * are first reverse mapped so that they can be drawn in the proper place. The update
     * is afterwards added to the undoStack so that it can be
     *
     * If the CanvasWhiteboardUpdate Type is "drag", the context is used to draw on the canvas.
     * This function saves the last X and Y coordinates that were drawn.
     *
     * @param {CanvasWhiteboardUpdate} update The update object.
     * @param {boolean} mappedCoordinates? The offsetX that needs to be mapped
     */
    CanvasWhiteboardComponent.prototype._draw = function (update, mappedCoordinates) {
        this._drawHistory.push(update);
        var xToDraw = update.getX();
        var yToDraw = update.getY();
        if (mappedCoordinates != null) {
            xToDraw = update.getX() * this._context.canvas.width;
            yToDraw = update.getY() * this._context.canvas.height;
        }
        if (update.getType() === canvas_whiteboard_update_model_1.UPDATE_TYPE.start) {
            this._undoStack.push(update);
        }
        if (update.getType() === canvas_whiteboard_update_model_1.UPDATE_TYPE.drag) {
            this._context.save();
            this._context.beginPath();
            this._context.lineWidth = 2;
            this._context.strokeStyle = "rgb(216, 184, 0)";
            this._context.lineJoin = "round";
            this._context.moveTo(this._lastX, this._lastY);
            this._context.lineTo(xToDraw, yToDraw);
            this._context.closePath();
            this._context.stroke();
            this._context.restore();
        }
        this._lastX = xToDraw;
        this._lastY = yToDraw;
    };
    /**
     * Sends the update to all receiving ends as an Event emit. This is done as a batch operation (meaning
     * multiple updates are sent at the same time). If this method is called, after 100 ms all updates
     * that were made at that time will be packed up together and sent to the receiver.
     *
     * @param {CanvasWhiteboardUpdate} update The update object.
     * @return Emits an Array of Updates when the batch.
     */
    CanvasWhiteboardComponent.prototype.sendUpdate = function (update) {
        var _this = this;
        this._batchUpdates.push(update);
        if (!this._updateTimeout) {
            this._updateTimeout = setTimeout(function () {
                _this.onBatchUpdate.emit(_this._batchUpdates);
                _this._batchUpdates = [];
                _this._updateTimeout = null;
            }, 100);
        }
    };
    ;
    /**
     * Draws an Array of Updates on the canvas.
     *
     * @param {CanvasWhiteboardUpdate[]} updates The array with Updates.
     */
    CanvasWhiteboardComponent.prototype.drawUpdates = function (updates) {
        var _this = this;
        if (this._canDraw) {
            this.drawMissingUpdates();
            updates.forEach(function (update) {
                _this._draw(update, true);
            });
        }
        else {
            this._updatesNotDrawn = this._updatesNotDrawn.concat(updates);
        }
    };
    ;
    /**
     * Draw any missing updates that were received before the image was loaded
     *
     */
    CanvasWhiteboardComponent.prototype.drawMissingUpdates = function () {
        var _this = this;
        if (this._updatesNotDrawn.length > 0) {
            var updatesToDraw = [].concat(this._updatesNotDrawn);
            this._updatesNotDrawn = [];
            updatesToDraw.forEach(function (update) {
                _this._draw(update, true);
            });
        }
    };
    /**
     * Draws an image on the canvas
     *
     * @param {CanvasRenderingContext2D} context The context used to draw the image on the canvas.
     * @param {HTMLImageElement} image The image to draw.
     * @param {number} x The X coordinate for the starting draw position.
     * @param {number} y The Y coordinate for the starting draw position.
     * @param {number} width The width of the image that will be drawn.
     * @param {number} height The height of the image that will be drawn.
     * @param {number} offsetX The offsetX if the image size is larger than the canvas (aspect Ratio)
     * @param {number} offsetY The offsetY if the image size is larger than the canvas (aspect Ratio)
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
        var imageWidth = image.width;
        var imageHeight = image.height;
        var radius = Math.min(width / imageWidth, height / imageHeight);
        var newWidth = imageWidth * radius;
        var newHeight = imageHeight * radius;
        var finalDrawX;
        var finalDrawY;
        var finalDrawWidth;
        var finalDrawHeight;
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
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "imageUrl", void 0);
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "aspectRatio", void 0);
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "drawButtonClass", void 0);
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "clearButtonClass", void 0);
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "undoButtonClass", void 0);
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "drawButtonEnabled", void 0);
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "clearButtonEnabled", void 0);
    __decorate([
        core_1.Input()
    ], CanvasWhiteboardComponent.prototype, "undoButtonEnabled", void 0);
    __decorate([
        core_1.Output()
    ], CanvasWhiteboardComponent.prototype, "onClear", void 0);
    __decorate([
        core_1.Output()
    ], CanvasWhiteboardComponent.prototype, "onUndo", void 0);
    __decorate([
        core_1.Output()
    ], CanvasWhiteboardComponent.prototype, "onBatchUpdate", void 0);
    __decorate([
        core_1.Output()
    ], CanvasWhiteboardComponent.prototype, "onImageLoaded", void 0);
    __decorate([
        core_1.ViewChild('canvas')
    ], CanvasWhiteboardComponent.prototype, "canvas", void 0);
    CanvasWhiteboardComponent = __decorate([
        core_1.Component({
            selector: 'canvas-whiteboard',
            template: template_1.DEFAULT_TEMPLATE,
            styles: [template_1.DEFAULT_STYLES]
        })
    ], CanvasWhiteboardComponent);
    return CanvasWhiteboardComponent;
}());
exports.CanvasWhiteboardComponent = CanvasWhiteboardComponent;
