import React, { createContext, useEffect, useState } from "react";
import { fabric } from "fabric";
import ToolList from "../../components/CanvasField/Tools/ToolList";
import { RectangleTool } from "../../components/CanvasField/Tools/Rectangle/Rectangle";
import { SelectedTool } from "../../components/CanvasField/Tools/Select/SelectTool";
/** @type {React.Context<[fabric.Canvas, string, (c: fabric.Canvas) => void, (t: any) => void]>}*/
export const FabricContext = createContext([null, null, (c) => { }, (t) => { }]);


const defaultProps = {
    canvasHeight: 600,
    canvasWidth: 1200,
    canvasBackgroundColor: "#66ccff",
    lineWidth: 1,
    fillColor: "#bd2b33",
    lineColor: "#000000",
};
const tools = {};
export const FabricProvider = (props) => {
    /**@type {[fabric.Canvas, (c: fabric.Canvas) => void]} */
    const [fbCanvas, setFbCnavas] = useState(null);
    /**@type {[string, (t: string) => void]} */
    const [currTool, setCurrTool] = useState(ToolList.RectangleTool);

    /** Initialize fabric canvas
     * @param {fabric.Canvas} canvas 
     */
    const initCanvas = (canvasRef) => {
        setFbCnavas(new fabric.Canvas(canvasRef.current, {
            // preserveObjectStacking: false, 
            // renderOnAddRemove: false,
            // skipTargetFind: true
          }));
    }

    const setTool = (tool) => {
        if (!fbCanvas) return;
        setCurrTool(tool);
    }

    const handleEvent = (e, callback) => {
        if (!fbCanvas || !currTool) return;
        callback(e);
    }

    const _onMouseDown = (e) => {
        tools[currTool].onMouseDown(e);
        console.log("_onMouseDown", currTool);
    }

    const _onMouseMove = (e) => {
        tools[currTool].onMouseMove(e);
        console.log("_onMouseMove", currTool);
    }

    const _onMouseUp = (e) => {
        tools[currTool].onMouseUp(e);
        console.log("_onMouseUp", currTool);
    }

    useEffect(() => {
        if (!fbCanvas) return;

        console.log("create canvas", fbCanvas);
        fbCanvas.setBackgroundColor('#66ccff');
        fbCanvas.setDimensions({ width: 500, height: 500 });
        fbCanvas.renderTop();

        tools[ToolList.RectangleTool] = new RectangleTool(fbCanvas);
        tools[ToolList.SelectedTool] = new SelectedTool(fbCanvas);

        if (currTool) tools[currTool].configureCanvas(defaultProps);

        fbCanvas.on('mouse:down', (e) => { handleEvent(e, _onMouseDown); });
        fbCanvas.on('mouse:move', (e) => { handleEvent(e, _onMouseMove); });
        fbCanvas.on('mouse:up', (e) => { handleEvent(e, _onMouseUp); });


        return () => {
            fbCanvas.dispose();
        }
    }, [fbCanvas]);

    useEffect(() => {
        if (!fbCanvas) return;
        console.log("setTool", currTool);
        tools[currTool].configureCanvas(defaultProps);
        fbCanvas.off();
        fbCanvas.on('mouse:down', (e) => { handleEvent(e, _onMouseDown); });
        fbCanvas.on('mouse:move', (e) => { handleEvent(e, _onMouseMove); });
        fbCanvas.on('mouse:up', (e) => { handleEvent(e, _onMouseUp); });
        fbCanvas.renderAll();
    }, [currTool])



    return (
        <FabricContext.Provider value={[fbCanvas, currTool, initCanvas, setTool]}>
            {props.children}
        </FabricContext.Provider>
    )

};