import { StatusBar } from "../../../../../components";
import { Box } from "@mui/material";
import React from "react";
import { Canvas } from "./Canvas/Canvas";
import { Toolbar } from "./Toolbar";
import { Carousel } from "./Carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector, useDispatch } from "react-redux";
import { findCollection } from "../../../../../utils/workspace";
import {
  setImageMetaData,
  setStatistics,
} from "../../../../../stores/workspace";
import {
  updateImageMetaData,
  updateStatistics,
} from "../../../../../apis/workspace";
import { setManual, setCurrentInput } from "../../../../../stores/workstation";
import { loadWorkspace } from "../../../../../stores/workspace";
import { LabelPanel } from "./LabelPanel";

export const Annotation = ({ setPage }) => {
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
  const manual = useSelector((state) => state.workstation.manual);

  const saveLabels = () => {
    let temp = JSON.parse(JSON.stringify(imageMetaData));
    let statistic = JSON.parse(JSON.stringify(currCollection.statistics));
    if (manual === true) {
      let oldType = imageMetaData.labeled
        ? imageMetaData.manual
          ? "manual"
          : "autoLabeled"
        : "unlabeled";
      temp.labels = [{ name: [currentLabels] }];
      temp.labeled = true;
      temp.manual = true;
      dispatch(setImageMetaData({ indexI: currentImage, data: temp }));
      statistic[oldType]--;
      statistic.manual++;
      dispatch(setStatistics(statistic));
      updateStatistics(currCollectionId, statistic).catch((err) => {
        console.log(err);
      });
      updateImageMetaData(currCollectionId, currentImage, temp)
        .then(() => {
          dispatch(loadWorkspace(workspace.name));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    dispatch(setCurrentInput(""));
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
            mt: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <ArrowBackIosNewIcon onClick={saveLabels} />
          <Box
            sx={{
              mt:"140px"
            }}
          >
          <Toolbar />
          </Box>

        </Box>

        <Box
          sx={{
            width: "95%",
            justifyContent: "center",
            alignItems: "center",
            mb: "12px",
          }}
        >
          <Canvas />
        </Box>
      </Box>

      <Box
        sx={{
          height: "25%",
          width: "100%",
        }}
      >
        <Carousel />
      </Box>

    </Box>
  );
};
