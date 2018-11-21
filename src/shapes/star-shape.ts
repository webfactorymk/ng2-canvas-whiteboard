import {CanvasWhiteboardShape} from "./canvas-whiteboard-shape";
import {CanvasWhiteboardShapeOptions} from "./canvas-whiteboard-shape-options";
import {CanvasWhiteboardPoint} from "../canvas-whiteboard-point";
import {CanvasWhiteboardUpdate} from "../canvas-whiteboard-update.model";

export class StarShape extends CanvasWhiteboardShape {
    radius: number;
    spikes: number;

    constructor(positionPoint?: CanvasWhiteboardPoint,
                options?: CanvasWhiteboardShapeOptions,
                radius?: number,
                spikes?: number) {
        super(positionPoint, options);
        this.radius = radius || 0;
        this.spikes = spikes || 5;
    }

    getShapeName(): string {
        return 'StarShape';
    }

    draw(context: CanvasRenderingContext2D) {
        Object.assign(context, this.options);

        let rotation = Math.PI / 2 * 3;
        let spikeX = this.positionPoint.x;
        let spikeY = this.positionPoint.y;
        let step = Math.PI / this.spikes;

        context.beginPath();
        context.moveTo(this.positionPoint.x, this.positionPoint.y - this.radius);

        for (let i = 0; i < this.spikes; i++) {
            spikeX = this.positionPoint.x + Math.cos(rotation) * this.radius;
            spikeY = this.positionPoint.y + Math.sin(rotation) * this.radius;
            context.lineTo(spikeX, spikeY);
            rotation += step;

            spikeX = this.positionPoint.x + Math.cos(rotation) * (this.radius * 0.4);
            spikeY = this.positionPoint.y + Math.sin(rotation) * (this.radius * 0.4);
            context.lineTo(spikeX, spikeY);
            rotation += step;
            context.stroke();
        }

        context.lineTo(this.positionPoint.x, this.positionPoint.y - this.radius);
        context.closePath();

        context.stroke();

        if (this.options.shouldFillShape) {
            context.fill();
        }
    }

    drawPreview(context: CanvasRenderingContext2D) {
        this.positionPoint = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
        this.radius = this.calculateRadius(context.canvas.width - 2, context.canvas.height / 2);
        this.draw(context);
    }

    onUpdateReceived(update: CanvasWhiteboardUpdate) {
        this.radius = this.calculateRadius(update.x, update.y);
    }

    calculateRadius(x: number, y: number): number {
        return Math.sqrt(Math.pow(x - this.positionPoint.x, 2) + Math.pow(y - this.positionPoint.y, 2));
    }
}
