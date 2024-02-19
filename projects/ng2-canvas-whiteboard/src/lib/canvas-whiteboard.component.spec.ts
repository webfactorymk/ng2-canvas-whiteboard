import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';
import { CanvasWhiteboardColorPickerComponent } from './canvas-whiteboard-colorpicker.component';
import { CanvasWhiteboardShapePreviewComponent, CanvasWhiteboardShapeSelectorComponent } from '../public-api';

describe('Ng2CanvasWhiteboardComponent', () => {
  let component: CanvasWhiteboardComponent;
  let fixture: ComponentFixture<CanvasWhiteboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasWhiteboardComponent, CanvasWhiteboardColorPickerComponent, CanvasWhiteboardShapeSelectorComponent, CanvasWhiteboardShapePreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
