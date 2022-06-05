import { fabric } from "fabric";
import { useEffect } from "react";
import { RectangleTool } from "../../components/CanvasField/Tools/Rectangle/Rectangle";
import { SelectedTool } from "../../components/CanvasField/Tools/Select/SelectTool";
import ToolList from "../../components/CanvasField/Tools/ToolList";

const defaultProps = {
  canvasHeight: 600,
  canvasWidth: 1200,
  canvasBackgroundColor: "#66ccff",
  selectedTool: ToolList.SelectedTool,
  lineWidth: 1,
  fillColor: "#bd2b33",
  lineColor: "#000000",
}

export const TestCanvas = () => {
  /**@type {fabric.Canvas} */
  let canvas = null;
  let currTool = null;
  const tools = {};

  const setTool = (tool) => { 
    currTool = tools[tool];
    currTool.configureCanvas(defaultProps);
  }

  useEffect(() => {
    const temp = new fabric.Canvas('x');
    canvas = temp;
    canvas.setBackgroundColor('#66ccff');
    canvas.setDimensions({ width: 500, height: 500 });
    
    const tempRect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: 'green',
      width: 10,
      height: 10,
    });

    canvas.add(tempRect);
    console.log("system added", tempRect);

    tools[ToolList.RectangleTool] = new RectangleTool(canvas);
    tools[ToolList.SelectedTool] = new SelectedTool(canvas);

    currTool = tools[ToolList.SelectedTool];
    canvas.on('mouse:down', (e) => { currTool.onMouseDown(e); });
    canvas.on('mouse:move', (e) => { currTool.onMouseMove(e); });
    canvas.on('mouse:up', (e) => { currTool.onMouseUp(e); });

    canvas.requestRenderAll();
  }, []);


  return (
    <>
      <div>
        <canvas id="x"></canvas>
      </div>
      <button onClick={() => setTool(ToolList.RectangleTool)}>Rect</button>
      <button onClick={() => setTool(ToolList.SelectedTool)}>Select</button>
    </>
  )
}