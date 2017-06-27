export const DEFAULT_TEMPLATE = `
<div class="canvas_wrapper_div">
     <span class="canvas_whiteboard_buttons">
         <canvas-whiteboard-colorpicker *ngIf="colorPickerEnabled" [selectedColor]="_strokeColor" (onColorSelected)="changeColor($event)"></canvas-whiteboard-colorpicker>
         <button *ngIf="drawButtonEnabled" (click)="toggleShouldDraw()"
                 [class.canvas_whiteboard_button-draw_animated]="getShouldDraw()"
                 class="canvas_whiteboard_button canvas_whiteboard_button-draw" type="button">
                <i [class]="drawButtonClass" aria-hidden="true"></i>
                   {{drawButtonText}}
        </button>
        
        <button *ngIf="clearButtonEnabled" (click)="clearCanvas()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-clear">
            <i [class]="clearButtonClass" aria-hidden="true"></i>
                    {{clearButtonText}}
        </button>
        
         <button *ngIf="undoButtonEnabled" (click)="undo()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-undo">
             <i [class]="undoButtonClass" aria-hidden="true"></i>
                    {{undoButtonText}} 
         </button>
         
         <button *ngIf="redoButtonEnabled" (click)="redo()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-redo">
             <i [class]="redoButtonClass" aria-hidden="true"></i>
                    {{redoButtonText}}
         </button> 
         <button *ngIf="saveDataButtonEnabled" (click)="downloadCanvasImage()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-save">
             <i [class]="saveDataButtonClass" aria-hidden="true"></i>
                    {{saveDataButtonText}}
         </button>
     </span>
    <canvas #canvas
            (mousedown)="_canvasUserEvents($event)" (mouseup)="_canvasUserEvents($event)"
            (mousemove)="_canvasUserEvents($event)" (mouseout)="_canvasUserEvents($event)"
            (touchstart)="_canvasUserEvents($event)" (touchmove)="_canvasUserEvents($event)"
            (touchend)="_canvasUserEvents($event)" (touchcancel)="_canvasUserEvents($event)">
    </canvas>
</div>
    `;

export const DEFAULT_STYLES = `
.canvas_whiteboard_button {
    display: inline-block;
    outline: 0px;
    padding-top: 7px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
@media (max-width: 400px) {
     .canvas_whiteboard_buttons {
            position: absolute;
            top: 0;
            width: 100%;
            text-align: center;
      }
}
        
@media (min-width: 401px) { 
    .canvas_whiteboard_buttons {
        position: absolute;
        right: 0%;
        color: #fff;
    }
}

.canvas_whiteboard_buttons {
    padding: 5px;
}

.canvas_whiteboard_buttons > button {
    margin: 5px;
}

.canvas_whiteboard_button-draw_animated {
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes pulsate {
    0% {
        -webkit-transform: scale(0.1, 0.1);
        opacity: 0.0;
    }
    50% {
        opacity: 1.0;
    }
    100% {
        -webkit-transform: scale(1.2, 1.2);
        opacity: 0.0;
    }
}
.canvas_wrapper_div {
    width: 100%;
    height: 100%;
    border: 0.5px solid #e2e2e2;
}

.canvas_whiteboard_button-clear {
    padding-top: 5px;
}`;