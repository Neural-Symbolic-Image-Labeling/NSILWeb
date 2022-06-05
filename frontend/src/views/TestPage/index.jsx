import { useState } from "react";
import { CanvasField } from "../../components/CanvasField/CanvasField"; 
import ToolList from "../../components/CanvasField/Tools/ToolList";
import { TestCanvas } from "./TestCanvas";

export const TestPage = () => { 
  const [currTool, setCurrTool] = useState(ToolList.RectangleTool);

  return (
    <>
      <p>Test Page Header</p>
      {/* <CanvasField canvasId="canvas" tool={currTool} />
      <button onClick={() => setCurrTool(ToolList.RectangleTool)}>Rect</button>
      <button onClick={() => setCurrTool(ToolList.SelectedTool)}>Select</button> */}
      <TestCanvas />
      <p>Test Page Footer</p>
    </>
  );
}