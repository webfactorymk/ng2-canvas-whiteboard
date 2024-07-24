import { NgModule } from '@angular/core';
import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';
import { CommonModule } from '@angular/common';
import { CanvasWhiteboardColorPickerComponent } from './canvas-whiteboard-colorpicker.component';
import { CanvasWhiteboardShapeSelectorComponent } from './shapes/canvas-whiteboard-shape-selector.component';
import { CanvasWhiteboardShapePreviewComponent } from './shapes/canvas-whiteboard-shape-preview.component';

@NgModule({
  declarations: [
    CanvasWhiteboardComponent,
    CanvasWhiteboardColorPickerComponent,
    CanvasWhiteboardShapeSelectorComponent,
    CanvasWhiteboardShapePreviewComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [CanvasWhiteboardComponent]
})
export class CanvasWhiteboardModule {

}
