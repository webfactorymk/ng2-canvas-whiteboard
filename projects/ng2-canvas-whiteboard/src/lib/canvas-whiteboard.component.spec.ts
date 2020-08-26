import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';

describe('Ng2CanvasWhiteboardComponent', () => {
  let component: CanvasWhiteboardComponent;
  let fixture: ComponentFixture<CanvasWhiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasWhiteboardComponent ]
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
