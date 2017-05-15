import {NgModule} from "@angular/core";
import {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {CanvasWhiteboardColorPickerComponent} from "./canvas-whiteboard-colorpicker.component";

export {CanvasWhiteboardComponent} from "./canvas-whiteboard.component";
export {CanvasWhiteboardUpdate} from "./canvas-whiteboard-update.model";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
    ],
    declarations: [
        CanvasWhiteboardComponent,
        CanvasWhiteboardColorPickerComponent
    ],
    exports: [CanvasWhiteboardComponent]
})
export class CanvasWhiteboardModule {
}
