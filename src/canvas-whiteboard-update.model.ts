import {CanvasWhiteboardShape} from "./shapes/canvas-whiteboard-shape";
import {INewCanvasWhiteboardShape} from "./shapes/canvas-whiteboard-shape.service";
import {CanvasWhiteboardShapeOptions} from "./shapes/canvas-whiteboard-shape-options";

export enum CanvasWhiteboardUpdateType {
    START = 0,
    DRAG = 1,
    STOP = 2
}

export class CanvasWhiteboardUpdate {
    x: number;
    y: number;
    type: CanvasWhiteboardUpdateType;
    UUID: string;

    selectedShape: INewCanvasWhiteboardShape<CanvasWhiteboardShape>;
    selectedShapeOptions: CanvasWhiteboardShapeOptions;

    constructor(x?: number, y?: number, type?: CanvasWhiteboardUpdateType, UUID?: string, selectedShape?: INewCanvasWhiteboardShape<CanvasWhiteboardShape>, selectedShapeOptions?: CanvasWhiteboardShapeOptions) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.UUID = UUID;
        this.selectedShape = selectedShape;
        this.selectedShapeOptions = selectedShapeOptions;
    }

    static deserializeJson(json: any): CanvasWhiteboardUpdate {
        return JSON.parse(json);
        // r new CanvasWhiteboardUpdate(json['x'], json['y'], json['type'], json['stroke_color'], json['uuid'], json['visible']);
    }

    stringify(): string {
        let objectToSerialize = {
            x: this.x.toFixed(3),
            y: this.y.toFixed(3),
            type: this.type,
            uuid: this.UUID
        };

        if (this.selectedShape) {
            objectToSerialize["selectedShape"] = this.selectedShape.name;
        }

        if (this.selectedShapeOptions) {
            objectToSerialize["selectedShapeOptions"] = this.selectedShapeOptions;
        }

        return JSON.stringify(objectToSerialize);
        // let serializedUpdate = "{ \"x\": " + this._x.toFixed(3) + ", \"y\": " + this._y.toFixed(3) + ", \"type\": " + this._type;
        //
        // if (!onlyShowCoordinatesAndType) {
        //     serializedUpdate += this._strokeColor ? (", \"stroke_color\": " + JSON.stringify(this._strokeColor)) : "";
        //     serializedUpdate += this._uuid ? (", \"uuid\": " + JSON.stringify(this._uuid)) : "";
        //     serializedUpdate += this._visible != null ? (", \"visible\": " + this._visible) : "";
        // }
        // serializedUpdate += " }";
        //
        // return serializedUpdate;
    }
}
