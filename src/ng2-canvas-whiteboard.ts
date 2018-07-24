import {NgModule} from "@angular/core";
import {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
import {CommonModule} from "@angular/common";
import {CanvasWhiteboardColorPickerComponent} from "./canvas-whiteboard-colorpicker.component";
import {CanvasWhiteboardService} from "./canvas-whiteboard.service";
import {CanvasWhiteboardShapeService} from "./shapes/canvas-whiteboard-shape.service";
import {RectangleShape} from "./shapes/rectangle-shape";
import {CircleShape} from "./shapes/circle-shape";

export {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
export {CanvasWhiteboardUpdate} from "./canvas-whiteboard-update.model";
export {CanvasWhiteboardService} from "./canvas-whiteboard.service";
export {CanvasWhiteboardOptions} from "./canvas-whiteboard-options";
export {CanvasWhiteboardPoint} from "./canvas-whiteboard-point";
export {CanvasWhiteboardShape} from "./shapes/canvas-whiteboard-shape";
export {CanvasWhiteboardShapeOptions} from "./shapes/canvas-whiteboard-shape-options";
export {CanvasWhiteboardShapeService} from "./shapes/canvas-whiteboard-shape.service";
export {RectangleShape} from "./shapes/rectangle-shape";
export {CircleShape} from "./shapes/circle-shape";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CanvasWhiteboardColorPickerComponent,
        CanvasWhiteboardComponent
    ],
    providers: [
        CanvasWhiteboardService,
        CanvasWhiteboardShapeService
    ],
    exports: [CanvasWhiteboardComponent]
})
export class CanvasWhiteboardModule {
}
