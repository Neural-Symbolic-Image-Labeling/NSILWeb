import { Box } from "@mui/material";
import { ImageGallery } from "./ImageGallery";
import AnnotationTool  from "./AnnotationStation/index";
import { useState } from "react";

export const WorkStation = () => { 
  const [page, setPage] = useState(1);

  return (
    <>
      <Box sx={{}}>
        {page === 0 && (
          <ImageGallery setPage={setPage}/>
        )}
        {page === 1 && (
          <AnnotationTool setPage={setPage}/>
          
        )}
      </Box>
    </>
  )
}