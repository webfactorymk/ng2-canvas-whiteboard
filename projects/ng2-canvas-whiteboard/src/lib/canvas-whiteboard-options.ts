export interface CanvasWhiteboardOptions {
  batchUpdateTimeoutDuration?: number;
  imageUrl?: string;
  aspectRatio?: number;
  strokeColor?: string;
  lineWidth?: number;
  drawButtonEnabled?: boolean;
  drawButtonClass?: string;
  drawButtonText?: string;
  clearButtonEnabled?: boolean;
  clearButtonClass?: string;
  clearButtonText?: string;
  undoButtonEnabled?: boolean;
  undoButtonClass?: string;
  undoButtonText?: string;
  redoButtonEnabled?: boolean;
  redoButtonClass?: string;
  redoButtonText?: string;
  saveDataButtonEnabled?: boolean;
  saveDataButtonClass?: string;
  saveDataButtonText?: string;
  /** @deprecated. Replaced with strokeColorPickerEnabled and fillColorPickerEnabled inputs */
  colorPickerEnabled?: boolean;
  strokeColorPickerEnabled?: boolean;
  fillColorPickerEnabled?: boolean;
  shouldDownloadDrawing?: boolean;
  startingColor?: string;
  scaleFactor?: number;
  drawingEnabled?: boolean;
  showStrokeColorPicker?: boolean;
  showFillColorPicker?: boolean;
  downloadedFileName?: string;
  lineJoin?: string;
  lineCap?: string;
  shapeSelectorEnabled?: boolean;
  showShapeSelector?: boolean;
  fillColor?: string;
}
