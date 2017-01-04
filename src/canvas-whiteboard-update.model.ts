export const UPDATE_TYPE = {
    "start": 0,
    "drag": 1,
    "stop": 2
};

export class CanvasWhiteboardUpdate {
    private _x: number;
    private _y: number;
    private _type: number;

    constructor(x: number, y: number, type: number) {
        this._x = x;
        this._y = y;
        this._type = type;
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

    static deserializeJson(json: any) {
        var x = json['x'];
        var y = json['y'];
        var type = json['type'];
        return new CanvasWhiteboardUpdate(x, y, type);
    }

    serializeToJson() {
        var coordinatesJson = `{ "x": ${this._x.toFixed(3)}, "y": ${this._y.toFixed(3)}, "type": ${this._type} }`;
        return coordinatesJson;
    }
}
