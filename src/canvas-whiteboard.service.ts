import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {CanvasWhiteboardUpdate} from "./canvas-whiteboard-update.model";

export class CanvasWhiteboardService {
    private _canvasDrawSubject: Subject<CanvasWhiteboardUpdate[]> = new Subject();
    canvasDrawSubject$: Observable<CanvasWhiteboardUpdate[]> = this._canvasDrawSubject.asObservable();

    private _canvasClearSubject: Subject<any> = new Subject();
    canvasClearSubject$: Observable<any> = this._canvasClearSubject.asObservable();

    private _canvasUndoSubject: Subject<any> = new Subject();
    canvasUndoSubject$: Observable<any> = this._canvasUndoSubject.asObservable();

    private _canvasRedoSubject: Subject<any> = new Subject();
    canvasRedoSubject$: Observable<any> = this._canvasRedoSubject.asObservable();

    public drawCanvas(updates: CanvasWhiteboardUpdate[]): void {
        this._canvasDrawSubject.next(updates);
    }

    public clearCanvas(): void {
        this._canvasClearSubject.next();
    }

    public undoCanvas(): void {
        this._canvasUndoSubject.next();
    }

    public redoCanvas(): void {
        this._canvasRedoSubject.next();
    }
}