import { TestBed } from '@angular/core/testing';

import { CanvasWhiteboardService } from './canvas-whiteboard.service';

describe('CanvasWhiteboardService', () => {
  let service: CanvasWhiteboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasWhiteboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
