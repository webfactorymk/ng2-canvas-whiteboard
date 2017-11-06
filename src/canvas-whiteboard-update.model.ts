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
    private _uuid: string;
    private _visible: boolean;

    constructor(x: number, y: number, type: number, strokeColor?: string, uuid?: string, visible?: boolean) {
        this._x = x;
        this._y = y;
        this._type = type;
        this._strokeColor = strokeColor;
        this._uuid = uuid;
        this._visible = visible;
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

    setUUID(uuid: string) {
        this._uuid = uuid;
    }

    getUUID() {
        return this._uuid;
    }

    setVisible(visible: boolean) {
        this._visible = visible;
    }

    getVisible() {
        return this._visible;
    }

    static deserializeJson(json: any) {
        return new CanvasWhiteboardUpdate(json['x'], json['y'], json['type'], json['stroke_color'], json['uuid'], json['visible']);
    }

    /**
     * @deprecated Use the stringify() method
     */
    serializeToJson(onlyShowCoordinatesAndType: boolean = false): string {
        return this.stringify(onlyShowCoordinatesAndType);
    }

    stringify(onlyShowCoordinatesAndType: boolean = false): string {
        let serializedUpdate = "{ \"x\": " + this._x.toFixed(3) + ", \"y\": " + this._y.toFixed(3) + ", \"type\": " + this._type;

        if(!onlyShowCoordinatesAndType) {
            serializedUpdate += this._strokeColor ? (", \"stroke_color\": " + JSON.stringify(this._strokeColor)) : "";
            serializedUpdate += this._uuid ? (", \"uuid\": " + JSON.stringify(this._uuid)) : "";
            serializedUpdate += this._visible != null ? (", \"visible\": " + this._visible ) : "";
        }
        serializedUpdate += " }";

        return serializedUpdate;
    }
}
