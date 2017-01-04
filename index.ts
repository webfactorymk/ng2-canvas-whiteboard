import {NgModule} from "@angular/core";
import {CanvasWhiteboardComponent} from "./src/canvas-whiteboard.component";


export {CanvasWhiteboardComponent} from "./src/canvas-whiteboard.component";
export {CanvasWhiteboardUpdate} from "./src/canvas-whiteboard-update.model";

@NgModule({
    declarations: [
        CanvasWhiteboardComponent
    ],
})
export class CanvasWhiteboardModule {
}
