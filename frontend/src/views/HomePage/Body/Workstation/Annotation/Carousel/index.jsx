import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findCollection } from "../../../../../../utils/workspace";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Box } from "@mui/material";
import style from "./style.module.css";
import { setCurrentImage } from "../../../../../../stores/workstation";
import { setCurrentLabels } from "../../../../../../stores/workstation";
import { setImageMetaData } from "../../../../../../stores/workspace";
import { PaperFrame } from "../../../../../../components";
import { updateImageMetaData } from "../../../../../../apis/workspace";
import { loadWorkspace } from "../../../../../../stores/workspace";

export const Carousel = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector((state) => state.workstation.currentImage);
  const workspace = useSelector((state) => state.workspace.workspace);
  const currCollectionId = useSelector(
    (state) => state.workspace.currCollectionId
  );
  const currCollection = findCollection(workspace, currCollectionId);
  const imageSet = currCollection ? currCollection.images : null;
  const length = imageSet.length;
  const [current, setCurrent] = useState(currentImage);
  const imageMetaData = currCollection
    ? currCollection.images[currentImage]
    : null;
  const currentLabels = useSelector((state) => state.workstation.currentLabels);

  const nextSlide = () => {
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

    setCurrent(current === length - 1 ? 0 : current + 1);
    dispatch(setCurrentImage(current === length - 1 ? 0 : current + 1));
    dispatch(
      setCurrentLabels(
        currCollection.images[current === length - 1 ? 0 : current + 1]
          .labels[0] === undefined
          ? ""
          : currCollection.images[current === length - 1 ? 0 : current + 1]
              .labels[0].name[0]
      )
    );
  };

  const prevSlide = () => {
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
    setCurrent(current === 0 ? length - 1 : current - 1);
    dispatch(setCurrentImage(current === 0 ? length - 1 : current - 1));
    dispatch(
      setCurrentLabels(
        currCollection.images[current === 0 ? length - 1 : current - 1]
          .labels[0].name[0]
      )
    );
  };

  return (
    <PaperFrame
      row
      sx={{
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        width: "100%",
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
        }}
      >
        {imageSet.map((slide, index) => {

          const pre = imageSet.find(
            (slide) =>
              imageSet.indexOf(slide) ===
              (current === 0 ? length - 1 : current - 1)
          );
          const next = imageSet.find(
            (slide) =>
              imageSet.indexOf(slide) ===
              (current === length - 1 ? 0 : current + 1)
          );


          return (
            <div
              className={
                index === current ? style["slide active"] : style["slide"]
              }
              key={index}
            >
              {index === current && length >=3 && length <= 4 &&(
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

              {index === current && length >=5 && (
                <div className={style["container"]}>
                  <img
                    src={imageSet.find(
                      (slide) =>
                        imageSet.indexOf(slide) ===
                        (current === 0 ? length - 2 : current === 1 ? length - 1: current - 2)
                    ).url}
                    alt={imageSet.find(
                      (slide) =>
                        imageSet.indexOf(slide) ===
                        (current === 0 ? length - 2 : current === 1 ? length - 1:current - 2)
                    ).name}
                    className={style["image_pre_pre"]}
                  />
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
                  <img
                    src={imageSet.find(
                      (slide) =>
                        imageSet.indexOf(slide) ===
                        (current === length - 1 ? 1 : current === length - 2 ? 0 : current + 2)
                    ).url}
                    alt={imageSet.find(
                      (slide) =>
                        imageSet.indexOf(slide) ===
                        (current === length - 1 ? 1 : current === length - 2 ? 0 : current + 2)
                    ).name}
                    className={style["image_pre_pre"]}
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
    </PaperFrame>
  );
};
