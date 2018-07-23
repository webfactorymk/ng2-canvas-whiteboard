export class CanvasWhiteboardShapeOptions {
    fillShape: boolean;
    fillStyle: string;

    strokeStyle: string;
    lineWidth: number;

    constructor() {
        this.fillShape = false;
        this.fillStyle = null;
        this.strokeStyle = "rgba(0,0,0,1)";
        this.lineWidth = 2;
    }
}