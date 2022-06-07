import { useContext, useEffect, useRef, useLayoutEffect } from "react";
import { FabricContext } from "../../context/FabricContext";
import ToolList from "./Tools/ToolList";
import { fabric } from "fabric";

export const CanvasField = () => {
  const canvasRef = useRef(null);
  const [canvas, currTool, initCanvas, setTool] = useContext(FabricContext);

  useEffect(() => {
    initCanvas(canvasRef);
    // console.log(localCanvas);
  }, []);

  return (
    <>
      <div>
        <p>{`Current Tool: ${currTool}`}</p>
        <button onClick={() => setTool(ToolList.RectangleTool)}>Rect</button>
        <button onClick={() => setTool(ToolList.SelectedTool)}>Select</button>
      </div>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  )
}