"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CanvasWhiteboardColorPickerComponent = (function () {
    function CanvasWhiteboardColorPickerComponent(_elementRef) {
        this._elementRef = _elementRef;
        this.selectedColor = 'rgba(0,0,0,1)';
        this.showColorPicker = false;
        this.onToggleColorPicker = new core_1.EventEmitter();
        this.onColorSelected = new core_1.EventEmitter();
        this.onSecondaryColorSelected = new core_1.EventEmitter();
    }
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    CanvasWhiteboardColorPickerComponent.prototype.ngOnInit = function () {
        this._context = this.canvas.nativeElement.getContext("2d");
        this.createColorPalette();
    };
    CanvasWhiteboardColorPickerComponent.prototype.createColorPalette = function () {
        var gradient = this._context.createLinearGradient(0, 0, this._context.canvas.width, 0);
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
        gradient = this._context.createLinearGradient(0, 0, 0, this._context.canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        this._context.fillStyle = gradient;
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    };
    CanvasWhiteboardColorPickerComponent.prototype.closeOnExternalClick = function (event) {
        if (!this._elementRef.nativeElement.contains(event.target) && this.showColorPicker) {
            this.onToggleColorPicker.emit(false);
        }
    };
    CanvasWhiteboardColorPickerComponent.prototype.toggleColorPicker = function (event) {
        if (event) {
            event.preventDefault();
        }
        this.onToggleColorPicker.emit(!this.showColorPicker);
    };
    CanvasWhiteboardColorPickerComponent.prototype.determineColorFromCanvas = function (event) {
        var canvasRect = this._context.canvas.getBoundingClientRect();
        var imageData = this._context.getImageData(event.clientX - canvasRect.left, event.clientY - canvasRect.top, 1, 1);
        return "rgba(" + imageData.data[0] + ", " + imageData.data[1] + ", " + imageData.data[2] + ", " + imageData.data[3] + ")";
    };
    CanvasWhiteboardColorPickerComponent.prototype.selectColor = function (color) {
        this.onColorSelected.emit(color);
        this.toggleColorPicker(null);
    };
    return CanvasWhiteboardColorPickerComponent;
}());
CanvasWhiteboardColorPickerComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'canvas-whiteboard-colorpicker',
                host: {
                    '(document:mousedown)': 'closeOnExternalClick($event)',
                    '(document:touchstart)': 'closeOnExternalClick($event)',
                },
                template: "\n        <div [hidden]=\"showColorPicker\" class=\"canvas-whiteboard-colorpicker-input\"\n               (click)=\"toggleColorPicker($event)\">\n               <div class=\"selected-color-type-wrapper\">{{previewText}}</div>\n               <div class=\"selected-color-preview\" [style.background]=\"selectedColor\"></div>\n        </div>\n        <div [hidden]=\"!showColorPicker\" class=\"canvas-whiteboard-colorpicker-wrapper\">\n            <div (click)=\"selectColor('transparent')\" class=\"transparent-color\">Transparent</div>\n            <canvas #canvaswhiteboardcolorpicker class=\"canvas-whiteboard-colorpicker\" width=\"284\" height=\"155\"\n                    (click)=\"selectColor(determineColorFromCanvas($event))\"></canvas>\n        </div>\n    ",
                styles: ["\n        .selected-color-preview {\n            width: 100%;\n            height: 20%;\n            position: absolute;\n            bottom: 0;\n            left: 0;\n        }\n        \n        .selected-color-type-wrapper {\n            display: inline-block;\n            height: 100%;\n            width: 100%;\n            text-align: center;\n            font-size: 14px;\n            color: #000;\n        }\n        \n        .transparent-color {\n            font-size: 14px;\n        }\n        \n        .canvas-whiteboard-colorpicker-wrapper {\n            border: 1px solid #afafaf;\n            color: #000;\n        }\n\n        @media (min-width: 401px) {\n            .canvas-whiteboard-colorpicker-wrapper {\n                position: absolute;\n            }\n        }\n\n        .canvas-whiteboard-colorpicker-input {\n            display: inline-block;\n            position:relative;\n            width: 44px;\n            height: 44px;\n            margin: 5px;\n            cursor: pointer;\n            color: #000;\n        }\n    "]
            },] },
];
/** @nocollapse */
CanvasWhiteboardColorPickerComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
CanvasWhiteboardColorPickerComponent.propDecorators = {
    'previewText': [{ type: core_1.Input },],
    'selectedColor': [{ type: core_1.Input },],
    'canvas': [{ type: core_1.ViewChild, args: ['canvaswhiteboardcolorpicker',] },],
    'showColorPicker': [{ type: core_1.Input },],
    'onToggleColorPicker': [{ type: core_1.Output },],
    'onColorSelected': [{ type: core_1.Output },],
    'onSecondaryColorSelected': [{ type: core_1.Output },],
};
exports.CanvasWhiteboardColorPickerComponent = CanvasWhiteboardColorPickerComponent;
//# sourceMappingURL=canvas-whiteboard-colorpicker.component.js.map