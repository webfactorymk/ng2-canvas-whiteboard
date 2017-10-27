"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var CanvasWhiteboardService = (function () {
    function CanvasWhiteboardService() {
        this._canvasDrawSubject = new Subject_1.Subject();
        this.canvasDrawSubject$ = this._canvasDrawSubject.asObservable();
        this._canvasClearSubject = new Subject_1.Subject();
        this.canvasClearSubject$ = this._canvasClearSubject.asObservable();
        this._canvasUndoSubject = new Subject_1.Subject();
        this.canvasUndoSubject$ = this._canvasUndoSubject.asObservable();
        this._canvasRedoSubject = new Subject_1.Subject();
        this.canvasRedoSubject$ = this._canvasRedoSubject.asObservable();
    }
    CanvasWhiteboardService.prototype.drawCanvas = function (updates) {
        this._canvasDrawSubject.next(updates);
    };
    CanvasWhiteboardService.prototype.clearCanvas = function (shouldEmitValue) {
        this._canvasClearSubject.next(shouldEmitValue);
    };
    CanvasWhiteboardService.prototype.undoCanvas = function (uuid) {
        this._canvasUndoSubject.next(uuid);
    };
    CanvasWhiteboardService.prototype.redoCanvas = function (uuid) {
        this._canvasRedoSubject.next(uuid);
    };
    return CanvasWhiteboardService;
}());
exports.CanvasWhiteboardService = CanvasWhiteboardService;
//# sourceMappingURL=canvas-whiteboard.service.js.map