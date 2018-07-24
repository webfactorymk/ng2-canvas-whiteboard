export declare enum CanvasWhiteboardUpdateType {
    START = 0,
    DRAG = 1,
    STOP = 2,
    SHAPE = 3,
}
export declare class CanvasWhiteboardUpdate {
    private _x;
    private _y;
    private readonly _type;
    private _strokeColor;
    private _uuid;
    private _visible;
    constructor(x: number, y: number, type: CanvasWhiteboardUpdateType, strokeColor?: string, uuid?: string, visible?: boolean);
    setX(newX: number): void;
    getX(): number;
    setY(newY: number): void;
    getType(): CanvasWhiteboardUpdateType;
    getY(): number;
    setStrokeColor(strokeColor: string): void;
    getStrokeColor(): string;
    setUUID(uuid: string): void;
    getUUID(): string;
    setVisible(visible: boolean): void;
    getVisible(): boolean;
    static deserializeJson(json: any): CanvasWhiteboardUpdate;
    /**
     * @deprecated Use the stringify() method
     */
    serializeToJson(onlyShowCoordinatesAndType?: boolean): string;
    stringify(onlyShowCoordinatesAndType?: boolean): string;
}
