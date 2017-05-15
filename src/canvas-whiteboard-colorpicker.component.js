"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CanvasWhiteboardColorpickerComponent = (function () {
    function CanvasWhiteboardColorpickerComponent() {
        this.onColorSelected = new core_1.EventEmitter();
    }
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    CanvasWhiteboardColorpickerComponent.prototype.ngOnInit = function () {
        this._context = this.canvas.nativeElement.getContext("2d");
        this.createColorPalette();
    };
    CanvasWhiteboardColorpickerComponent.prototype.createColorPalette = function () {
        var gradient = this._context.createLinearGradient(0, 0, this._context.canvas.width, 0);
        gradient.addColorStop(0, "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");
        gradient.addColorStop(0.49, "rgb(0,   255, 255)");
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1, "rgb(255,   0,   0)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
        //Add white -> transparent -> black
        gradient = this._context.createLinearGradient(0, 0, 0, this._context.canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1, "rgba(0,     0,   0, 1)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    };
    CanvasWhiteboardColorpickerComponent.prototype._colorPickerEvents = function (event) {
        event.preventDefault();
        console.log(this);
        console.log(event);
        // let colorEventX = event.pageX - this.canvas.
    };
    CanvasWhiteboardColorpickerComponent.prototype._selectColor = function (event) {
        console.log(event);
        var imageData = this._context.getImageData(event.pageX, event.pageY, 1, 1);
        var selectedColor = "#ffffff";
        this.onColorSelected.emit(selectedColor);
    };
    return CanvasWhiteboardColorpickerComponent;
}());
__decorate([
    core_1.ViewChild('canvas-whiteboard-colorpicker')
], CanvasWhiteboardColorpickerComponent.prototype, "canvas", void 0);
__decorate([
    core_1.Output()
], CanvasWhiteboardColorpickerComponent.prototype, "onColorSelected", void 0);
CanvasWhiteboardColorpickerComponent = __decorate([
    core_1.Component({
        selector: 'canvas-whiteboard-colorpicker',
        template: "\n        <canvas #canvas-whiteboard-colorpicker class=\"canvas-whiteboard-colorpicker\" width=\"284\" height=\"155\"\n          (click)=\"_selectColor($event)\" \n          (mousemove)=\"_colorPickerEvents($event)\" \n          (touchmove)=\"_colorPickerEvents($event)\"\n        ></canvas>\n        \n        <div class=\"controls\">\n            <div><label>R</label> <input type=\"text\" id=\"rVal\" /></div>\n            <div><label>G</label> <input type=\"text\" id=\"gVal\" /></div>\n            <div><label>B</label> <input type=\"text\" id=\"bVal\" /></div>\n            <div><label>RGB</label> <input type=\"text\" id=\"rgbVal\" /></div>\n            <div><label>HEX</label> <input type=\"text\" id=\"hexVal\" /></div>\n        </div>\n    ",
        styles: ["\n\n    "]
    })
], CanvasWhiteboardColorpickerComponent);
exports.CanvasWhiteboardColorpickerComponent = CanvasWhiteboardColorpickerComponent;
