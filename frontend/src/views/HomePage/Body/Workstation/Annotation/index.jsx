import { StatusBar } from "../../../../../components";
import { Box } from "@mui/material";
import React from "react";
import { Canvas } from "./Canvas/Canvas";
import { Toolbar } from "./Toolbar";
import { Carousel } from "./Carousel";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector, useDispatch } from "react-redux";
import { findCollection } from "../../../../../utils/workspace";
import { setImageMetaData } from "../../../../../stores/workspace";
import { updateImageMetaData } from "../../../../../apis/workspace";
import { loadWorkspace } from "../../../../../stores/workspace";
import { LabelPanel } from "./LabelPanel";

export const Annotation = ({setPage}) => {
  const dispatch = useDispatch();
  const currentImage = useSelector((state) => state.workstation.currentImage);
  const workspace = useSelector((state) => state.workspace.workspace);
  const currCollectionId = useSelector(
    (state) => state.workspace.currCollectionId
  );
  const currCollection = findCollection(workspace, currCollectionId);
  const imageMetaData = currCollection
    ? currCollection.images[currentImage]
    : null;
  const currentLabels = useSelector((state) => state.workstation.currentLabels);

  const saveLabels = () => {
    if (currentLabels !== "") {
      let temp = JSON.parse(JSON.stringify(imageMetaData));
      temp.labels = [{ name: [currentLabels] }];
      temp.labeled = true;
      if(temp.labels !== imageMetaData.labels){
        temp.manual = true;
      }
      temp.manual = true;
      dispatch(setImageMetaData({ indexI: currentImage, data: temp }));
      updateImageMetaData(currCollectionId, currentImage, temp)
        .then(() => {
          dispatch(loadWorkspace(workspace.name));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        // border: '2px solid red',
      }}
    >
      <StatusBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "75%",
          width: "100%",
          // border: '2px solid red',
        }}
      >
        <Box
          sx={{
            width: "5%",
            mr: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <ArrowBackIosNewIcon  onClick={saveLabels} />
          <Toolbar />
        </Box>

        <Box
          sx={{
            width: "95%",
            mr: "12px",
            justifyContent: "center",
            alignItems: "center",
            mb:"12px",
          }}
        >
          <Canvas />
        </Box>
      </Box>
      {/* <Box sx={{
        display: "flex",
        width: "100%"
      }}>
        <LabelPanel />
      </Box> */}
      <Box
        sx={{
          height: "20%",
          width: "100%",
        }}
      >
        <Carousel />
      </Box>
    </Box>
  );
};
