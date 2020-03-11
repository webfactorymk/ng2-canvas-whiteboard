"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var CanvasWhiteboardService = /** @class */ (function () {
    function CanvasWhiteboardService() {
        this._canvasDrawSubject = new rxjs_1.Subject();
        this.canvasDrawSubject$ = this._canvasDrawSubject.asObservable();
        this._canvasClearSubject = new rxjs_1.Subject();
        this.canvasClearSubject$ = this._canvasClearSubject.asObservable();
        this._canvasUndoSubject = new rxjs_1.Subject();
        this.canvasUndoSubject$ = this._canvasUndoSubject.asObservable();
        this._canvasRedoSubject = new rxjs_1.Subject();
        this.canvasRedoSubject$ = this._canvasRedoSubject.asObservable();
    }
    CanvasWhiteboardService.prototype.drawCanvas = function (updates) {
        this._canvasDrawSubject.next(updates);
    };
    CanvasWhiteboardService.prototype.clearCanvas = function () {
        this._canvasClearSubject.next();
    };
    CanvasWhiteboardService.prototype.undoCanvas = function (updateUUD) {
        this._canvasUndoSubject.next(updateUUD);
    };
    CanvasWhiteboardService.prototype.redoCanvas = function (updateUUD) {
        this._canvasRedoSubject.next(updateUUD);
    };
    return CanvasWhiteboardService;
}());
exports.CanvasWhiteboardService = CanvasWhiteboardService;
//# sourceMappingURL=canvas-whiteboard.service.js.map