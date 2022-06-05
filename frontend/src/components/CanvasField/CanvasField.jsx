import { fabric } from "fabric";
import { useEffect, useState } from "react";
import { CanvasManager } from "./CanvasManager";
import ToolList from "./Tools/ToolList";

/**
 * @param {{
 * canvasId: string;
 * tool: string;
 * }} props 
 */
export const CanvasField = (props) => {
  /**@type {CanvasManager}*/
  let manager = null;

  useEffect(() => { 
    manager = new CanvasManager(props.canvasId, { selectedTool: props.tool });
    console.log("Initialize CanvasManager", manager);
  }, []);  

  useEffect(() => {
    console.log(props.tool, manager);
    if (manager) {
      manager.setTool(props.tool);
    }
  }, [props.tool]);

  return (
    <>
      <canvas id={props.canvasId}></canvas>
    </>
  )
}