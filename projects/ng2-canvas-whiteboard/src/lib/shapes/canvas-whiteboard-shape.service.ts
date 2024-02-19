import { Injectable } from '@angular/core';
import { CanvasWhiteboardShape } from './canvas-whiteboard-shape';
import { CircleShape } from './circle-shape';
import { RectangleShape } from './rectangle-shape';
import { FreeHandShape } from './free-hand-shape';
import { CanvasWhiteboardShapeOptions } from './canvas-whiteboard-shape-options';
import { CanvasWhiteboardPoint } from '../canvas-whiteboard-point.model';
import { SmileyShape } from './smiley-shape';
import { StarShape } from './star-shape';
import { LineShape } from './line-shape';
import { BehaviorSubject, Observable } from 'rxjs';

export type INewCanvasWhiteboardShape<T extends CanvasWhiteboardShape> =
  new (positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions, ...args: any[]) => T;

@Injectable({
  providedIn: 'root',
})
export class CanvasWhiteboardShapeService {
  private registeredShapesSubject: BehaviorSubject<Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>>;
  public registeredShapes$: Observable<Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>>;

  constructor() {
    this.registeredShapesSubject = new BehaviorSubject([
      FreeHandShape,
      LineShape,
      RectangleShape,
      CircleShape,
      StarShape,
      SmileyShape
    ]);
    this.registeredShapes$ = this.registeredShapesSubject.asObservable();
  }

  getShapeConstructorFromShapeName(shapeName: string): INewCanvasWhiteboardShape<CanvasWhiteboardShape> {
    return this.getCurrentRegisteredShapes().find((shape) =>
      (new shape).getShapeName() === shapeName);
  }

  getCurrentRegisteredShapes(): Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>> {
    return this.registeredShapesSubject.getValue();
  }

  isRegisteredShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): boolean {
    return this.getCurrentRegisteredShapes().indexOf(shape) !== -1;
  }

  registerShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): void {
    if (this.isRegisteredShape(shape)) {
      console.warn(`You tried to register a shape:${shape}, but is has already been registered.`);
      return;
    }

    const registeredShapes = this.getCurrentRegisteredShapes();
    registeredShapes.push(shape);
    this.registeredShapesSubject.next(registeredShapes);
  }

  registerShapes(shapes: Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>): void {
    this.registeredShapesSubject.next(
      this.getCurrentRegisteredShapes()
        .concat(
          shapes.filter((shape) => {
            if (this.isRegisteredShape(shape)) {
              console.warn(`You tried to register a shape:${shape}, but is has already been registered.`);
              return false;
            }

            return true;
          })
        )
    );
  }

  unregisterShape(shape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>): void {
    this.registeredShapesSubject.next(
      this.getCurrentRegisteredShapes().filter(registeredShape => registeredShape !== shape)
    );
  }

  unregisterShapes(shapes: Array<INewCanvasWhiteboardShape<CanvasWhiteboardShape>>): void {
    this.registeredShapesSubject.next(
      this.getCurrentRegisteredShapes().filter(shape => shapes.indexOf(shape) === -1)
    );
  }
}
