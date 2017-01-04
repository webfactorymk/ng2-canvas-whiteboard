export const DEFAULT_TEMPLATE = `
<div class="canvas_wrapper_div">
     <span class="canvas_whiteboard_buttons">
         <button *ngIf="drawButtonEnabled" (click)="toggleShouldDraw()"
                 class="canvas_whiteboard_button canvas_whiteboard_button-draw">
                <i [class]="drawButtonClass" aria-hidden="true"
                   [class.canvas_whiteboard_button-draw_animated]="getShouldDraw()"></i>
        </button>
        <button *ngIf="clearButtonEnabled" (click)="clearCanvas()" class="canvas_whiteboard_button">
            <i [class]="clearButtonClass" aria-hidden="true"></i>
        </button>
         <button *ngIf="undoButtonEnabled" (click)="undoCanvas()" class="canvas_whiteboard_button">
             <i [class]="undoButtonClass" aria-hidden="true"></i>
        </button>
     </span>
    <canvas #canvas
            (mousedown)="_canvasUserEvents($event)" (mouseup)="_canvasUserEvents($event)"
            (mousemove)="_canvasUserEvents($event)" (mouseout)="_canvasUserEvents($event)"
            (touchstart)="_canvasUserEvents($event)" (touchmove)="_canvasUserEvents($event)"
            (touchend)="_canvasUserEvents($event)" (touchcancel)="_canvasUserEvents($event)"
            (keyup)="_canvasKeyUp($event)">
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

.canvas_whiteboard_buttons {
    position: absolute;
    right: 0%;
    color: #fff;
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

.canvas_whiteboard_button-clear {
    padding-top: 5px;
}


`;