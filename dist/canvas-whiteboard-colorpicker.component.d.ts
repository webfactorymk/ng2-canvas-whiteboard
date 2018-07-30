import { EventEmitter, OnInit, ElementRef } from '@angular/core';
export declare class CanvasWhiteboardColorPickerComponent implements OnInit {
    private _elementRef;
    previewText: string;
    readonly selectedColor: string;
    canvas: ElementRef;
    readonly showColorPicker: boolean;
    private _context;
    onToggleColorPicker: EventEmitter<boolean>;
    onColorSelected: EventEmitter<string>;
    onSecondaryColorSelected: EventEmitter<string>;
    constructor(_elementRef: ElementRef);
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    ngOnInit(): void;
    createColorPalette(): void;
    closeOnExternalClick(event: any): void;
    toggleColorPicker(event: Event): void;
    determineColorFromCanvas(event: any): string;
    selectColor(color: string): void;
}
