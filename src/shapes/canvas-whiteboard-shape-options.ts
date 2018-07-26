export class CanvasWhiteboardShapeOptions {
    shouldFillShape?: boolean;
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;
    lineJoin?: string;
    lineCap?: string;
    shadowBlur?: number;

    constructor() {
        this.shouldFillShape = false;
        this.fillStyle = null;
        this.strokeStyle = "rgba(0,0,0,1)";
        this.lineWidth = 2;
        this.lineJoin = "round";
        this.lineCap = "round";
        this.shadowBlur = 10;
    }

    // stringify() {
    //     let objectToSerialize = {
    //         shouldFillShape: this.shouldFillShape,
    //         fillStyle: this.fillStyle,
    //         strokeStyle: this.strokeStyle,
    //         lineWidth: this.lineWidth.toString(),
    //         lineJoin: this.lineWidth,
    //         lineCap: this.lineWidth,
    //         shadowBlur: this.shadowBlur.toString()
    //     };
    //
    //     return JSON.stringify(objectToSerialize);
    // }
}