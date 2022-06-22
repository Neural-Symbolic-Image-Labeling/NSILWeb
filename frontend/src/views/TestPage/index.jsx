import { useState } from "react"; 
import { CanvasField } from "../../components/CanvasField";
import ToolList from "../../context/FabricContext/Tools/ToolList";
import { FabricProvider } from "../../context/FabricContext";
import React from 'react';


export const TestPage = () => { 

  return (
    <>
      <p>Test Page Header</p>
      <FabricProvider>
        <CanvasField />
      </FabricProvider>
      <p>Test Page Footer</p>
    </>
  );
}