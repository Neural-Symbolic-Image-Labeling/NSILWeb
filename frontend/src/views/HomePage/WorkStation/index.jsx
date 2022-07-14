import { Box } from "@mui/material";
import { ImageGallery } from "./ImageGallery";
import { AnnotationTool } from "./AnnotationStation";
import dataset from "./AnnotationStation/dataset.js"
import { setPage } from "../../../stores/workstation";
import { useDispatch, useSelector } from "react-redux";
import { findCollection } from "../../../utils/workspace";

export const WorkStation = () => { 
  const page = useSelector(state => state.workstation.page);
  const dispatch = useDispatch();

  const setPageNum = (page) => { 
    dispatch(setPage(page));
  }

  const workspace = useSelector(state => state.gallery.workspace);
  const currCollectionId = useSelector(state => state.gallery.currCollectionId);
  const getDisplayImages = () => {
    const collection = findCollection(workspace, currCollectionId);
    return collection.images;
  }

  return (
    <>
      <Box sx={{width: '100%', height: '100%'}}>
        {page === 0 && (
          <ImageGallery setPage={setPageNum}/>
        )}
        {page === 1 && (
          <AnnotationTool dataSet = {getDisplayImages()} setPage={setPageNum}/>
        )}
      </Box>
    </>
  )
}