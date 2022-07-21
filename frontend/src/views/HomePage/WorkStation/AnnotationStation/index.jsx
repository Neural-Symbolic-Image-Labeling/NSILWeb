import { ReactPictureAnnotation } from "react-picture-annotation";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import TitleIcon from "@mui/icons-material/Title";
import style from "./style.module.css";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import dataset from "./dataset";
import { setPage } from "../../../../stores/workstation";
import { updateLabels } from "../../../../apis/workspace";
import { findCollection } from "../../../../utils/workspace";


export const AnnotationTool = ({ dataSet, ...props }) => {
  const length = dataSet.length;
  const dispatch = useDispatch();
  const [currentTool, setCurrentTool] = useState();
  const currentImage = useSelector((state) => state.workstation.currentImage);
  const [data, setData] = useState([]);
  const {comment, mark } = data;
  const [label, setLabel] = useState(dataset[currentImage].labels);
  const [current, setCurrent] = useState(currentImage);
  const currCollectionId = useSelector((state) => state.gallery.currCollectionId);

  const nextSlide = () => {
    const newLabels = [];
    label.map((item, index) => {
      return newLabels.push({"name":[item.comment],"canvasId":item.id, "mark":item.mark})
    });
    const editableLabel = JSON.parse(JSON.stringify(newLabels));
    updateLabels(currCollectionId,current,editableLabel).catch(err => console.log(err));
   
    dataSet[current].labels = [...label];
    setLabel(dataSet[current === length - 1 ? 0 : current + 1].labels);
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  
  const prevSlide = () => {
    const newLabels = [];
    label.map((item, index) => {
      return newLabels.push({"name":[item.comment],"canvasId":item.id, "mark":item.mark})
    });
    const editableLabel = JSON.parse(JSON.stringify(newLabels));
    updateLabels(currCollectionId,current,editableLabel).catch(err => console.log(err));
    dataSet[current].labels = [...label];  
    setLabel(dataSet[current === 0 ? length - 1 : current - 1].labels);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(dataSet) || dataSet.length <= 0) {
    return null;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: 0.5,
            mb: 3.5,
          }}
        >
          <Box
            sx={{
              height: 80,
              width: "2%",
              overflow: "visible",
              border: 0,
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              padding: 0.5,
              mb: 3.5,
            }}
          >
            <ArrowBackIosNewIcon
              className={style["back-arrow"]}
              sx={{
                "&:hover": {
                  padding: 0.1,
                  borderRadius: 2,
                  backgroundColor: "rgba(150, 150, 150, 0.80)",
                },
              }}
              onClick={() => {
                dispatch(setPage(0));
              }}
            />
          </Box>

          <Box
            sx={{
              height: 540,
              width: "80%",
              overflow: "visible",
              border: 0,
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              padding: 0.5,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                height: 540,
                width: 960,
                overflow: "visible",
              }}
            >
              {dataSet.map((slide, index) => {
                return (
                  <div key={index}>
                    {dataSet.indexOf(slide) === current && (
                      <ReactPictureAnnotation
                        image={slide.url}
                        annotationData={label}
                        onSelect={(selectedId) => {}}
                        onChange={(labelData) => {
                          labelData?.map((item) => {
                            return setData({
                              comment: item?.comment,
                              mark: item?.mark,
                            });
                          });
                          setLabel(labelData);
                        }}
                        height={540}
                        width={960}
                      />
                    )}
                  </div>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              height: 540,
              width: "18%",
              border: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 0.5,
                mb: 1.5,
              }}
            >
              <h3> Labeling Tools </h3>
              {currentTool === "Text" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0.5,
                    mb: 1.5,
                  }}
                >
                  <TextField required id="outlined-required" label="Text" />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0.3,
                    paddingLeft: 1.5,
                    paddingRight: 1.5,
                    mb: 1.5,
                    border: 1,
                    borderRadius: 1,
                    borderColor: "rgba(142, 142, 142, 0.80)",
                    "&:hover": {
                      backgroundColor: "rgba(142, 142, 142, 0.80)",
                    },
                  }}
                  onClick={() => {
                    setCurrentTool("Text");
                  }}
                >
                  <TitleIcon sx={{ fontSize: 48 }} />
                  <Typography variant="h13" sx={{ marginLeft: "11px" }}>
                     Annotate Text
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0.3,
                  paddingLeft: 1.5,
                  paddingRight: 1.5,
                  mb: 1.5,
                  border: 1,
                  borderRadius: 1,
                  borderColor: "rgba(142, 142, 142, 0.80)",
                  "&:hover": {
                    backgroundColor: "rgba(142, 142, 142, 0.80)",
                  },
                }}
                onClick={() => {
                  setCurrentTool("Bounding Box");
                }}
              >
                <HighlightAltIcon sx={{ fontSize: 50 }} />
                <Typography variant="h13" sx={{ marginLeft: "10px" }}>
                  Bounding Box
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {comment && mark ? (
                  <React.Fragment>
                    <h3> Label Properties</h3>
                    <p>Label: {comment}</p>
                    <p>Type: Bounding Box</p>
                    <p>X: {Math.abs(mark?.x?.toFixed(3))} </p>
                    <p>Y: {Math.abs(mark?.y?.toFixed(3))}</p>
                    <p>Height: {Math.abs(mark?.height?.toFixed(3))}</p>
                    <p>Width: {Math.abs(mark?.width?.toFixed(3))}</p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <h3> Label Properties</h3>
                    <p>Please select a label</p>
                  </React.Fragment>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            boxShadow: "0px 4px 4px  rgba(0, 0, 0, 0.25)",
            height: 180,
            width: "100%",
            padding: 0.5,
            mb: 1.5,
          }}
        >
          <FaArrowAltCircleLeft
            className={style["left-arrow"]}
            onClick={prevSlide}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
              width: 700,
              padding: 10,
              mb: 1,
            }}
          >
            {dataSet.map((slide, index) => {
              const pre = dataSet.find(
                (slide) =>
                  dataSet.indexOf(slide) ===
                  (current === 0 ? length - 1 : current - 1)
              );
              const next = dataSet.find(
                (slide) =>
                  dataSet.indexOf(slide) ===
                  (current === length - 1 ? 0 : current + 1)
              );
              return (
                <div
                  className={
                    index === current ? style["slide active"] : style["slide"]
                  }
                  key={index}
                >
                  {index === current && (
                    <div className={style["container"]}>
                      <img
                        src={pre.url}
                        alt={pre.name}
                        className={style["image_pre"]}
                      />
                      <img
                        src={slide.url}
                        alt={slide.name}
                        className={style["image"]}
                      />
                      <img
                        src={next.url}
                        alt={next.name}
                        className={style["image_pre"]}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </Box>
          <FaArrowAltCircleRight
            className={style["right-arrow"]}
            onClick={nextSlide}
          />
        </Box>
      </Box>
    </div>
  );
};
