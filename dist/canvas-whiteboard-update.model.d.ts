export declare const UPDATE_TYPE: {
    "start": number;
    "drag": number;
    "stop": number;
};
export declare class CanvasWhiteboardUpdate {
    private _x;
    private _y;
    private _type;
    private _strokeColor;
    constructor(x: number, y: number, type: number, _strokeColor?: string);
    setX(newX: number): void;
    getX(): number;
    setY(newY: number): void;
    getType(): number;
    getY(): number;
    setStrokeColor(strokeColor: string): void;
    getStrokeColor(): string;
    static deserializeJson(json: any): CanvasWhiteboardUpdate;
    serializeToJson(): string;
}
