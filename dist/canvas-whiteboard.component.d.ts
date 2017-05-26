import { EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
import { CanvasWhiteboardUpdate } from "./canvas-whiteboard-update.model";
export declare class CanvasWhiteboardComponent implements OnInit, OnChanges {
    batchUpdateTimeoutDuration: number;
    imageUrl: string;
    aspectRatio: number;
    drawButtonClass: string;
    clearButtonClass: string;
    undoButtonClass: string;
    redoButtonClass: string;
    drawButtonText: string;
    clearButtonText: string;
    undoButtonText: string;
    redoButtonText: string;
    drawButtonEnabled: boolean;
    clearButtonEnabled: boolean;
    undoButtonEnabled: boolean;
    redoButtonEnabled: boolean;
    colorPickerEnabled: boolean;
    onClear: EventEmitter<any>;
    onUndo: EventEmitter<any>;
    onRedo: EventEmitter<any>;
    onBatchUpdate: EventEmitter<CanvasWhiteboardUpdate[]>;
    onImageLoaded: EventEmitter<any>;
    canvas: ElementRef;
    private _strokeColor;
    private _context;
    private _imageElement;
    private _shouldDraw;
    private _canDraw;
    private _lastX;
    private _lastUUID;
    private _lastY;
    private _clientDragging;
    private _undoStack;
    private _redoStack;
    private _drawHistory;
    private _batchUpdates;
    private _updatesNotDrawn;
    private _updateTimeout;
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    ngOnInit(): void;
    private _initCanvasEventListeners();
    private _calculateCanvasWidthAndHeight();
    /**
     * If an image exists and it's url changes, we need to redraw the new image on the canvas.
     */
    ngOnChanges(changes: any): void;
    /**
     * Load an image and draw it on the canvas (if an image exists)
     * @constructor
     * @param callbackFn A function that is called after the image loading is finished
     * @return Emits a value when the image has been loaded.
     */
    private _loadImage(callbackFn?);
    /**
     * Clears all content on the canvas.
     * @return Emits a value when the clearing is finished
     */
    clearCanvas(): void;
    private _removeCanvasData(callbackFn?);
    /**
     * Clears the canvas and redraws the image if the url exists.
     * @param callbackFn A function that is called after the background is redrawn
     * @return Emits a value when the clearing is finished
     */
    private _redrawBackground(callbackFn?);
    /**
     * Returns a value of whether the user clicked the draw button on the canvas.
     */
    getShouldDraw(): boolean;
    /**
     * Toggles drawing on the canvas. It is called via the draw button on the canvas.
     */
    toggleShouldDraw(): void;
    /**
     * Replaces the drawing color with a new color
     * The format should be ("#ffffff" or "rgb(r,g,b,a?)")
     * This method is public so that anyone can access the canvas and change the stroke color
     *
     * @param {string} newStrokeColor The new stroke color
     */
    changeColor(newStrokeColor: string): void;
    undo(): void;
    private _undoCanvas(updateUUID);
    redo(): void;
    private _redoCanvas(updateUUID);
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
    private _canvasUserEvents(event);
    private _getCanvasEventPosition(event);
    /**
     * The update coordinates on the canvas are mapped so that all receiving ends
     * can reverse the mapping and get the same position as the one that
     * was drawn on this update.
     *
     * @param {CanvasWhiteboardUpdate} update The CanvasWhiteboardUpdate object.
     * @param {number} eventX The offsetX that needs to be mapped
     * @param {number} eventY The offsetY that needs to be mapped
     */
    private _prepareToSendUpdate(update, eventX, eventY);
    /**
     * Catches the Key Up events made on the canvas.
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 90 (z), an undo action will be performed
     *If the ctrlKey or commandKey(macOS) was held and the keyCode is 89 (y), a redo action will be performed
     *
     * @param event The event that occurred.
     */
    private _canvasKeyDown(event);
    private _redrawCanvasOnResize(event);
    private _redrawHistory();
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
    private _draw(update, mappedCoordinates?);
    /**
     * Sends the update to all receiving ends as an Event emit. This is done as a batch operation (meaning
     * multiple updates are sent at the same time). If this method is called, after 100 ms all updates
     * that were made at that time will be packed up together and sent to the receiver.
     *
     * @param {CanvasWhiteboardUpdate} update The update object.
     * @return Emits an Array of Updates when the batch.
     */
    sendUpdate(update: CanvasWhiteboardUpdate): void;
    /**
     * Draws an Array of Updates on the canvas.
     *
     * @param {CanvasWhiteboardUpdate[]} updates The array with Updates.
     */
    drawUpdates(updates: CanvasWhiteboardUpdate[]): void;
    /**
     * Draw any missing updates that were received before the image was loaded
     *
     */
    drawMissingUpdates(): void;
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
    private _drawImage(context, image, x, y, width, height, offsetX, offsetY);
}
