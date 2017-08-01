"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var canvas_whiteboard_update_model_1 = require("./canvas-whiteboard-update.model");
var template_1 = require("./template");
var CanvasWhiteboardComponent = (function () {
    function CanvasWhiteboardComponent() {
        //Number of ms to wait before sending out the updates as an array
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
        this.colorPickerEnabled = false;
        this.onClear = new core_1.EventEmitter();
        this.onUndo = new core_1.EventEmitter();
        this.onRedo = new core_1.EventEmitter();
        this.onBatchUpdate = new core_1.EventEmitter();
        this.onImageLoaded = new core_1.EventEmitter();
        this.strokeColor = "rgb(216, 184, 0)";
        this._shouldDraw = false;
        this._canDraw = true;
        this._clientDragging = false;
        this._undoStack = []; //Stores the value of start and count for each continuous stroke
        this._redoStack = [];
        this._drawHistory = [];
        this._batchUpdates = [];
        this._updatesNotDrawn = [];
    }
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    CanvasWhiteboardComponent.prototype.ngOnInit = function () {
        this._initCanvasEventListeners();
        this.context = this.canvas.nativeElement.getContext("2d");
        this._calculateCanvasWidthAndHeight();
    };
    CanvasWhiteboardComponent.prototype._initCanvasEventListeners = function () {
        window.addEventListener("resize", this._redrawCanvasOnResize.bind(this), false);
        window.addEventListener("keydown", this._canvasKeyDown.bind(this), false);
    };
    CanvasWhiteboardComponent.prototype._calculateCanvasWidthAndHeight = function () {
        this.context.canvas.width = this.canvas.nativeElement.parentNode.clientWidth;
        if (this.aspectRatio) {
            this.context.canvas.height = this.canvas.nativeElement.parentNode.clientWidth * this.aspectRatio;
        }
        else {
            this.context.canvas.height = this.canvas.nativeElement.parentNode.clientHeight;
        }
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
            _this.context.save();
            _this._drawImage(_this.context, _this._imageElement, 0, 0, _this.context.canvas.width, _this.context.canvas.height, 0.5, 0.5);
            _this.context.restore();
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
        this._removeCanvasData();
        this._redoStack = [];
        this.onClear.emit(true);
    };
    CanvasWhiteboardComponent.prototype._removeCanvasData = function (callbackFn) {
        this._clientDragging = false;
        this._drawHistory = [];
        this._undoStack = [];
        this._redrawBackground(callbackFn);
    };
    /**
     * Clears the canvas and redraws the image if the url exists.
     * @param callbackFn A function that is called after the background is redrawn
     * @return Emits a value when the clearing is finished
     */
    CanvasWhiteboardComponent.prototype._redrawBackground = function (callbackFn) {
        if (this.context) {
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            if (this.imageUrl) {
                this._loadImage(function () {
                    callbackFn && callbackFn();
                });
            }
            else {
                callbackFn && callbackFn();
            }
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
     * Replaces the drawing color with a new color
     * The format should be ("#ffffff" or "rgb(r,g,b,a?)")
     * This method is public so that anyone can access the canvas and change the stroke color
     *
     * @param {string} newStrokeColor The new stroke color
     */
    CanvasWhiteboardComponent.prototype.changeColor = function (newStrokeColor) {
        this.strokeColor = newStrokeColor;
    };
    CanvasWhiteboardComponent.prototype.undo = function () {
        if (!this._undoStack.length || !this.undoButtonEnabled)
            return;
        var updateUUID = this._undoStack.pop();
        this._undoCanvas(updateUUID);
        this.onUndo.emit(updateUUID);
    };
    CanvasWhiteboardComponent.prototype._undoCanvas = function (updateUUID) {
        this._redoStack.push(updateUUID);
        this._drawHistory.forEach(function (update) {
            if (update.getUUID() === updateUUID) {
                update.setVisible(false);
            }
        });
        this._redrawHistory();
    };
    CanvasWhiteboardComponent.prototype.redo = function () {
        if (!this._redoStack.length || !this.redoButtonEnabled)
            return;
        var updateUUID = this._redoStack.pop();
        this._redoCanvas(updateUUID);
        this.onRedo.emit(updateUUID);
    };
    CanvasWhiteboardComponent.prototype._redoCanvas = function (updateUUID) {
        this._undoStack.push(updateUUID);
        this._drawHistory.forEach(function (update) {
            if (update.getUUID() === updateUUID) {
                update.setVisible(true);
            }
        });
        this._redrawHistory();
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
    CanvasWhiteboardComponent.prototype.canvasUserEvents = function (event) {
        if (!this._shouldDraw || !this._canDraw) {
            //Ignore all if we didn't click the _draw! button or the image did not load
            return;
        }
        if ((event.type === 'mousemove' || event.type === 'touchmove' || event.type === 'mouseout') && !this._clientDragging) {
            // Ignore mouse move Events if we're not dragging
            return;
        }
        if (event.target == this.canvas.nativeElement) {
            event.preventDefault();
        }
        var update;
        var updateType;
        var eventPosition = this._getCanvasEventPosition(event);
        switch (event.type) {
            case 'mousedown':
            case 'touchstart':
                this._clientDragging = true;
                this._lastUUID = eventPosition.x + eventPosition.y + Math.random().toString(36);
                updateType = canvas_whiteboard_update_model_1.UPDATE_TYPE.start;
                break;
            case 'mousemove':
            case 'touchmove':
                if (!this._clientDragging) {
                    return;
                }
                updateType = canvas_whiteboard_update_model_1.UPDATE_TYPE.drag;
                break;
            case 'touchcancel':
            case 'mouseup':
            case 'touchend':
            case 'mouseout':
                this._clientDragging = false;
                updateType = canvas_whiteboard_update_model_1.UPDATE_TYPE.stop;
                break;
        }
        update = new canvas_whiteboard_update_model_1.CanvasWhiteboardUpdate(eventPosition.x, eventPosition.y, updateType, this.strokeColor, this._lastUUID, true);
        this._draw(update);
        this._prepareToSendUpdate(update, eventPosition.x, eventPosition.y);
    };
    CanvasWhiteboardComponent.prototype._getCanvasEventPosition = function (event) {
        var canvasBoundingRect = this.context.canvas.getBoundingClientRect();
        return {
            x: event.touches && event.touches[0] ? event.touches[0].clientX - canvasBoundingRect.left : event.clientX - canvasBoundingRect.left,
            y: event.touches && event.touches[0] ? event.touches[0].clientY - canvasBoundingRect.top : event.clientY - canvasBoundingRect.top
        };
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
    CanvasWhiteboardComponent.prototype._prepareToSendUpdate = function (update, eventX, eventY) {
        update.setX(eventX / this.context.canvas.width);
        update.setY(eventY / this.context.canvas.height);
        this.sendUpdate(update);
    };
    /**
     * Catches the Key Up events made on the canvas.
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 90 (z), an undo action will be performed
     *If the ctrlKey or commandKey(macOS) was held and the keyCode is 89 (y), a redo action will be performed
     *
     * @param event The event that occurred.
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
                this.downloadCanvasImage();
            }
        }
    };
    CanvasWhiteboardComponent.prototype._redrawCanvasOnResize = function (event) {
        this._calculateCanvasWidthAndHeight();
        this._redrawHistory();
    };
    CanvasWhiteboardComponent.prototype._redrawHistory = function () {
        var _this = this;
        var updatesToDraw = this._drawHistory;
        this._removeCanvasData(function () {
            updatesToDraw.forEach(function (update) {
                _this._draw(update, true);
            });
        });
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
        var xToDraw = (mappedCoordinates) ? (update.getX() * this.context.canvas.width) : update.getX();
        var yToDraw = (mappedCoordinates) ? (update.getY() * this.context.canvas.height) : update.getY();
        if (update.getType() === canvas_whiteboard_update_model_1.UPDATE_TYPE.drag) {
            this.context.save();
            this.context.beginPath();
            this.context.lineWidth = 2;
            if (update.getVisible()) {
                this.context.strokeStyle = update.getStrokeColor() || this.strokeColor;
            }
            else {
                this.context.strokeStyle = "rgba(0,0,0,0)";
            }
            this.context.lineJoin = "round";
            this.context.moveTo(this._lastX, this._lastY);
            this.context.lineTo(xToDraw, yToDraw);
            this.context.closePath();
            this.context.stroke();
            this.context.restore();
        }
        else if (update.getType() === canvas_whiteboard_update_model_1.UPDATE_TYPE.stop && update.getVisible()) {
            this._undoStack.push(update.getUUID());
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
            }, this.batchUpdateTimeoutDuration);
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
    /**
     * The HTMLCanvasElement.toDataURL() method returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
     * The returned image is in a resolution of 96 dpi.
     * If the height or width of the canvas is 0, the string "data:," is returned.
     * If the requested type is not image/png, but the returned value starts with data:image/png, then the requested type is not supported.
     * Chrome also supports the image/webp type.
     *
     * @param {string} returnedDataType A DOMString indicating the image format. The default format type is image/png.
     * @param {number} returnedDataQuality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
     If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
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
     * @param {any} callbackFn The function that should be executed when the blob is created. Should accept a parameter Blob (for the result).
     * @param {string} returnedDataType A DOMString indicating the image format. The default type is image/png.
     * @param {number} returnedDataQuality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
     If this argument is anything else, the default value for image quality is used. Other arguments are ignored.
     */
    CanvasWhiteboardComponent.prototype.generateCanvasBlob = function (callbackFn, returnedDataType, returnedDataQuality) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (returnedDataQuality === void 0) { returnedDataQuality = 1; }
        this.context.canvas.toBlob(function (blob) {
            callbackFn && callbackFn(blob);
        }, returnedDataType, returnedDataQuality);
    };
    /**
     * Generate a canvas image representation and download it locally
     * The name of the image is canvas_drawing_ + the current local Date and Time the image was created
     *
     * @param {string} returnedDataType A DOMString indicating the image format. The default type is image/png.
     */
    CanvasWhiteboardComponent.prototype.downloadCanvasImage = function (returnedDataType) {
        var _this = this;
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (window.navigator.msSaveOrOpenBlob === undefined) {
            var downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', this.generateCanvasDataUrl(returnedDataType));
            console.log(this._generateDataTypeString(returnedDataType));
            downloadLink.setAttribute('download', "canvas_drawing_" + new Date().valueOf() + this._generateDataTypeString(returnedDataType));
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        else {
            // IE-specific code
            this.generateCanvasBlob(function (blob) {
                window.navigator.msSaveOrOpenBlob(blob, "canvas_drawing_" + new Date().valueOf() + _this._generateDataTypeString(returnedDataType));
            }, returnedDataType);
        }
    };
    CanvasWhiteboardComponent.prototype._generateDataTypeString = function (returnedDataType) {
        if (returnedDataType) {
            return "." + returnedDataType.split('/')[1];
        }
        return "";
    };
    return CanvasWhiteboardComponent;
}());
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "batchUpdateTimeoutDuration", void 0);
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
], CanvasWhiteboardComponent.prototype, "clearButonClass", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "undoButtonClass", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "redoButtonClass", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "saveDataButtonClass", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "drawButtonText", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "clearButtonText", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "undoButtonText", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "redoButtonText", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "saveDataButtonText", void 0);
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
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "redoButtonEnabled", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "saveDataButtonEnabled", void 0);
__decorate([
    core_1.Input()
], CanvasWhiteboardComponent.prototype, "colorPickerEnabled", void 0);
__decorate([
    core_1.Output()
], CanvasWhiteboardComponent.prototype, "onClear", void 0);
__decorate([
    core_1.Output()
], CanvasWhiteboardComponent.prototype, "onUndo", void 0);
__decorate([
    core_1.Output()
], CanvasWhiteboardComponent.prototype, "onRedo", void 0);
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
exports.CanvasWhiteboardComponent = CanvasWhiteboardComponent;
