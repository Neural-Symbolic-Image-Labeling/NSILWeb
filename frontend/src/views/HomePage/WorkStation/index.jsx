import { Box } from "@mui/material";
import { ImageGallery } from "./ImageGallery";
import { AnnotationTool } from "./AnnotationTool";
import { useState } from "react";
import React from 'react';


export const WorkStation = () => { 
  const [page, setPage] = useState(0);

  return (
    <>
      <Box sx={{}}>
        {page == 0 && (
          <ImageGallery setPage={setPage}/>
        )}
        {page == 1 && (
          <AnnotationTool setPage={setPage}/>
        )}
      </Box>
    </>
  )
}