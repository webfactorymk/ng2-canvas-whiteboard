export declare const UPDATE_TYPE: {
    "start": number;
    "drag": number;
    "stop": number;
};
export declare class CanvasWhiteboardUpdate {
    private _x;
    private _y;
    private _type;
    constructor(x: number, y: number, type: number);
    setX(newX: number): void;
    getX(): number;
    setY(newY: number): void;
    getType(): number;
    getY(): number;
    static deserializeJson(json: any): CanvasWhiteboardUpdate;
    serializeToJson(): string;
}
