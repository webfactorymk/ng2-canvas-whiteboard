import {NgModule} from "@angular/core";
import {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

export {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
export {CanvasWhiteboardUpdate} from "./canvas-whiteboard-update.model";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
    ],
    declarations: [
        CanvasWhiteboardComponent
    ],
    exports: [CanvasWhiteboardComponent]
})
export class CanvasWhiteboardModule {
}
