import { fabric } from 'fabric';
import { RectangleTool } from '../../../components/CanvasField/Tools/Rectangle/Rectangle';
import { SelectedTool } from '../../../components/CanvasField/Tools/Select/SelectTool';
import ToolList from '../../../components/CanvasField/Tools/ToolList';

const defaultProps = {
    canvasHeight: 500,
    canvasWidth: 500,
    canvasBackgroundColor: "#66ccff",
    lineWidth: 1,
    fillColor: "#bd2b33",
    lineColor: "#000000",
    tool: ToolList.RectangleTool,
};

class FabricCanvas {
    constructor() {
        this.canvas = null;
        this.tools = {};
    }

    /** Initialize fabric canvas
     * @param {import("react").MutableRefObject<any>} canvasRef 
     * @param {any} props 
     */
    initCanvas = (canvasRef, props={}) => {        
        console.log("FabricCanvas._initCanvas");
        this.props = Object.assign(props, defaultProps);
        this.currTool = this.props.tool;

        if (!this.canvas) {
            this.canvas = new fabric.Canvas(canvasRef.current, {
                // preserveObjectStacking: false, 
                // renderOnAddRemove: false,
                // skipTargetFind: true
            });
            this.canvas.setBackgroundColor(this.props.canvasBackgroundColor);
            this.canvas.setDimensions({ width: this.props.canvasWidth, height: this.props.canvasHeight });
            this.canvas.renderAll();

            this.tools[ToolList.RectangleTool] = new RectangleTool(this.canvas, this.props);
            this.tools[ToolList.SelectedTool] = new SelectedTool(this.canvas, this.props);
        }

        if (this.currTool) this.tools[this.currTool].configureCanvas(this.props);

        this.canvas.off();
        this.canvas.on('mouse:down', (e) => { handleEvent(e, _onMouseDown); });
        this.canvas.on('mouse:move', (e) => { handleEvent(e, _onMouseMove); });
        this.canvas.on('mouse:up', (e) => { handleEvent(e, _onMouseUp); });

    }

    setTool = (tool) => { 
        this.currTool = tool;
        this.tools[this.currTool].configureCanvas(this.props);
        fbCanvas.off();
        fbCanvas.on('mouse:down', (e) => { handleEvent(e, _onMouseDown); });
        fbCanvas.on('mouse:move', (e) => { handleEvent(e, _onMouseMove); });
        fbCanvas.on('mouse:up', (e) => { handleEvent(e, _onMouseUp); });
        fbCanvas.renderAll();
    }

    _handleEvent = (e, callback) => {
        if (!this.canvas || !this.currTool) return;
        callback(e);
    }

    _onMouseDown = (e) => {
        this.tools[this.currTool].onMouseDown(e);
        console.log("_onMouseDown", this.currTool);
    }

    _onMouseMove = (e) => {
        this.tools[this.currTool].onMouseMove(e);
        console.log("_onMouseMove", this.currTool);
    }

    _onMouseUp = (e) => {
        this.tools[currTool].onMouseUp(e);
        console.log("_onMouseUp", this.currTool);
    }

}

export const fbCanvas = new FabricCanvas();