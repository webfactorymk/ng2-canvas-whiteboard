export const UPDATE_TYPE = {
    "start": 0,
    "drag": 1,
    "stop": 2
};

export class CanvasWhiteboardUpdate {
    private _x: number;
    private _y: number;
    private _type: number;
    private _strokeColor: string;

    constructor(x: number, y: number, type: number, _strokeColor?: string) {
        this._x = x;
        this._y = y;
        this._type = type;
        this._strokeColor = _strokeColor;
    }

    setX(newX: number) {
        this._x = newX;
    }

    getX() {
        return this._x;
    }

    setY(newY: number) {
        this._y = newY;
    }

    getType() {
        return this._type;
    }

    getY() {
        return this._y;
    }

    setStrokeColor(strokeColor: string) {
        this._strokeColor = strokeColor;
    }

    getStrokeColor() {
        return this._strokeColor;
    }

    static deserializeJson(json: any) {
        return new CanvasWhiteboardUpdate(json['x'], json['y'], json['type'], json['stroke_color']);
    }

    serializeToJson() {
        return `{ "x": ${this._x.toFixed(3)}, "y": ${this._y.toFixed(3)}, "type": ${this._type}` + this._strokeColor ? (`, "stroke_color":${this._strokeColor}`) : "";
    }
}
