import { Box } from "@mui/material";
import { ImageGallery } from "./ImageGallery";
import { AnnotationTool } from "./AnnotationStation";
import dataset from "./AnnotationStation/dataset.js"
import { setPage } from "../../../stores/workstation";
import { useDispatch, useSelector } from "react-redux";

export const WorkStation = () => { 
  const page = useSelector(state => state.workstation.page);
  const dispatch = useDispatch();

  const setPageNum = (page) => { 
    dispatch(setPage(page));
  }

  return (
    <>
      <Box sx={{width: '100%', height: '100%'}}>
        {page === 0 && (
          <ImageGallery setPage={setPageNum}/>
        )}
        {page === 1 && (
          <AnnotationTool dataSet = {dataset} setPage={setPageNum}/>
        )}
      </Box>
    </>
  )
}