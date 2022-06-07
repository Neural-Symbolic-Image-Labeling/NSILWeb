import { useContext, useEffect, useRef, useLayoutEffect } from "react";
import { FabricContext } from "../../context/FabricContext";
import ToolList from "./Tools/ToolList";
import { Container } from "@mui/material";
import { fabric } from "fabric";

export const CanvasField = () => {
  const canvasRef = useRef(null);
  const [canvas, currTool, initCanvas, setTool] = useContext(FabricContext);

  useEffect(() => {
    initCanvas(canvasRef);
    console.log(canvasRef);
  }, []);

  return (
    <>
      <div>
        <p>{`Current Tool: ${currTool}`}</p>
        <button onClick={() => setTool(ToolList.RectangleTool)}>Rect</button>
        <button onClick={() => setTool(ToolList.SelectedTool)}>Select</button>
      </div>
      <Container>
        <canvas ref={canvasRef}></canvas>
      </Container>
    </>
  )
}