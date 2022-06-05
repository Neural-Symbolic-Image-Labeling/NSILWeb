import { fabric } from "fabric";
import { RectangleTool } from "./Tools/Rectangle/Rectangle";
import { SelectedTool } from "./Tools/Select/SelectTool";
import ToolList from "./Tools/ToolList";

const defaultProps = {
    canvasHeight: 600,
    canvasWidth: 1200,
    canvasBackgroundColor: "#66ccff",
    selectedTool: ToolList.SelectedTool,
    lineWidth: 1,
    fillColor: "#bd2b33",
    lineColor: "#000000",
}

export class CanvasManager {
    /**
     * @param {string} canvasId
     */
    constructor(canvasId, props = {}) {
        this.props = Object.assign(defaultProps, props);

        this.canvasId = canvasId;
        this.props = defaultProps;
        this._initCanvas(canvasId);
    }

    setTool = (tool) => { 
        if (this._tools[tool] === this._selectedTool) return;
        this._selectedTool = this._tools[tool];
        this._selectedTool.configureCanvas(this.props);
        alert(`Tool changed to ${this._selectedTool}`);
    }

    _initCanvas = (canvasId) => {
        // setup canvas
        const temp = new fabric.Canvas(canvasId, {
            preserveObjectStacking: false,
            renderOnAddRemove: false,
            skipTargetFind: true
        });
        temp.setHeight(this.props.canvasHeight);
        temp.setWidth(this.props.canvasWidth);
        temp.setBackgroundColor(this.props.canvasBackgroundColor);
        this.fbCanvas = temp;

        // init tools
        this._initTools(this.fbCanvas);

        // disable touch scrolling
        this._disableTouchScroll();

        // bind events
        this._eventBinding();

        // render canvas
        this.fbCanvas.requestRenderAll();
    }

    _initTools = (c) => { 
        this._tools = {};
        this._tools[ToolList.RectangleTool] = new RectangleTool(c);
        this._tools[ToolList.SelectedTool] = new SelectedTool(c);
        this._selectedTool = this._tools[this.props.selectedTool];
        if(this._selectedTool) {
            this._selectedTool.configureCanvas(this.props);
        }
    }

    _disableTouchScroll = () => {
        let canvas = this.fbCanvas;
        if (canvas.allowTouchScrolling) {
            canvas.allowTouchScrolling = false;
        }
    }
    _eventBinding = () => { 
        let canvas = this.fbCanvas;

        // canvas.removeListeners();
        // canvas related events
        canvas.on('object:added', (o) => { console.log('object:added'); });

        // mouse related events
        canvas.on('mouse:down', (o) => this._handleEvent(o, this._onMouseDown));
        canvas.on('mouse:move', (o) => this._handleEvent(o, this._onMouseMove));
        canvas.on('mouse:up', (o) => this._handleEvent(o, this._onMouseUp));
        canvas.on('mouse:leave', (o) => this._handleEvent(o, this._onMouseLeave));
    }
    _handleEvent = (e, handler) => {
        if (this._selectedTool) handler(e);
    }

    _onMouseDown = (o) =>  this._selectedTool.onMouseDown(o);

    _onMouseMove = (o) => this._selectedTool.onMouseMove(o);

    _onMouseUp = (o) => this._selectedTool.onMouseUp(o);

    _onMouseLeave = (o) => this._selectedTool.onMouseLeave(o);
}