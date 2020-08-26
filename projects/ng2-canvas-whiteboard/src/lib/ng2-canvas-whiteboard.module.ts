import { NgModule } from '@angular/core';
import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';
import { CommonModule } from '@angular/common';
import { CanvasWhiteboardColorPickerComponent } from './canvas-whiteboard-colorpicker.component';
import { CanvasWhiteboardShapeSelectorComponent } from './shapes/canvas-whiteboard-shape-selector.component';
import { CanvasWhiteboardShapePreviewComponent } from './shapes/canvas-whiteboard-shape-preview.component';
import { CanvasWhiteboardService } from './canvas-whiteboard.service';
import { CanvasWhiteboardShapeService } from './shapes/canvas-whiteboard-shape.service';

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
  providers: [
    CanvasWhiteboardService,
    CanvasWhiteboardShapeService
  ],
  exports: [CanvasWhiteboardComponent]
})
export class CanvasWhiteboardModule {

}
