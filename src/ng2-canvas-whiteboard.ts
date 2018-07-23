import {NgModule} from "@angular/core";
import {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
import {CommonModule} from "@angular/common";
import {CanvasWhiteboardColorPickerComponent} from "./canvas-whiteboard-colorpicker.component";
import {CanvasWhiteboardService} from "./canvas-whiteboard.service";

export {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
export {CanvasWhiteboardUpdate} from "./canvas-whiteboard-update.model";
export {CanvasWhiteboardService} from "./canvas-whiteboard.service";
export {CanvasWhiteboardOptions} from "./canvas-whiteboard-options";
export {CanvasWhiteboardShape} from "./shapes/canvas-whiteboard-shape";
export {CanvasWhiteboardShapeOptions} from "./shapes/canvas-whiteboard-shape-options";
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
        CanvasWhiteboardService
    ],
    exports: [CanvasWhiteboardComponent]
})
export class CanvasWhiteboardModule {
}
