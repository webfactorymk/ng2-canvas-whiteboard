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
    z-index: 3;
}

@media (max-width: 400px) {
     .canvas_whiteboard_buttons {
            position: absolute;
            z-inde
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
}

.canvas_whiteboard {
    position: absolute;
    z-index: 1;
}

.incomplete_shapes_canvas_whiteboard {
    position: absolute;
    z-index: 2;
}

`;
