/* This is a sample commented demo on how a canvas can be used

import {Component, ViewEncapsulation} from '@angular/core';
import {CanvasWhiteboardUpdate} from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {


  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    console.log(updates);
  }

  onCanvasClear() {
    console.log("The canvas was cleared");
  }

  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);
  }

  onCanvasRedo(updateUUID: string) {
    console.log(`REDO with uuid: ${updateUUID}`);
  }
}
*/