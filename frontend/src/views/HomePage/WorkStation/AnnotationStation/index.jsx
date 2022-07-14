import { ReactPictureAnnotation } from "react-picture-annotation";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import style from "./style.module.css";
import { setLabels } from "../../../../stores/gallery";
import { useDispatch, useSelector } from "react-redux";
import { findCollection } from "../../../../utils/workspace";
import dataset from "./dataset";
import { updateLabels } from "../../../../apis/workspace";

export const AnnotationTool = ({ dataSet, ...props }) => {
  const length = dataSet.length;
  const dispatch = useDispatch();
  const currCollectionId = useSelector(
    (state) => state.gallery.currCollectionId
  );
  const currentImage = useSelector((state) => state.workstation.currentImage);
  const [data, setData] = useState([]);
  const { comment, mark } = data;
  const [label, setLabel] = useState([]);
  const [current, setCurrent] = useState(currentImage);

  const nextSlide = () => {
    setLabel(dataSet[current === length - 1 ? 0 : current + 1].labels);
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setLabel(dataSet[current === 0 ? length - 1 : current - 1].labels);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(dataSet) || dataSet.length <= 0) {
    return null;
  }

  const tools = [
    {
      name: "Bounding Box",
      svg: (
        <svg
          width="80"
          height="80"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 39.5C3.76561 39.5 3.53708 39.477 3.31639 39.4334L3.21935 39.9239C2.69457 39.82 2.2067 39.6136 1.77754 39.3263L2.0557 38.9108C1.6738 38.6551 1.3449 38.3262 1.08922 37.9443L0.673738 38.2225C0.386418 37.7933 0.179953 37.3054 0.076136 36.7806L0.56663 36.6836C0.52297 36.4629 0.5 36.2344 0.5 36V35H0V33H0.5V31H0V29H0.5V27H0V25H0.5V23H0V21H0.5V19H0V17H0.5V15H0V13H0.5V11H0V9H0.5V7H0V5H0.5V4C0.5 3.76561 0.52297 3.53708 0.56663 3.31639L0.0761362 3.21935C0.179953 2.69457 0.386419 2.2067 0.673739 1.77754L1.08922 2.0557C1.3449 1.6738 1.6738 1.3449 2.0557 1.08922L1.77754 0.673738C2.2067 0.386419 2.69457 0.179953 3.21935 0.0761362L3.31639 0.56663C3.53708 0.52297 3.76561 0.5 4 0.5H5V0H7V0.5H9V0H11V0.5H13V0H15V0.5H17V0H19V0.5H21V0H23V0.5H25V0H27V0.5H29V0H31V0.5H33V0H35V0.5H36C36.2344 0.5 36.4629 0.52297 36.6836 0.56663L36.7806 0.0761362C37.3054 0.179953 37.7933 0.386419 38.2225 0.673738L37.9443 1.08922C38.3262 1.3449 38.6551 1.6738 38.9108 2.0557L39.3263 1.77754C39.6136 2.2067 39.82 2.69457 39.9239 3.21935L39.4334 3.31639C39.477 3.53708 39.5 3.76561 39.5 4V5H40V7H39.5V9H40V11H39.5V13H40V15H39.5V17H40V19H39.5V21H40V23H39.5V25H40V27H39.5V29H40V31H39.5V33H40V35H39.5V36C39.5 36.2344 39.477 36.4629 39.4334 36.6836L39.9239 36.7806C39.82 37.3054 39.6136 37.7933 39.3263 38.2225L38.9108 37.9443C38.6551 38.3262 38.3262 38.6551 37.9443 38.9108L38.2225 39.3263C37.7933 39.6136 37.3054 39.82 36.7806 39.9239L36.6836 39.4334C36.4629 39.477 36.2344 39.5 36 39.5H35V40H33V39.5H31V40H29V39.5H27V40H25V39.5H23V40H21V39.5H19V40H17V39.5H15V40H13V39.5H11V40H9V39.5H7V40H5V39.5H4Z"
            fill="transparent"
            stroke="#1976D2"
            strokeLinejoin="round"
            strokeDasharray="2 2"
          />
        </svg>
      ),
    },
    {
      name: "Circle",
      svg: (
        <svg
          width="80"
          height="80"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="19.5"
            fill="transparent"
            stroke="#0BA436"
            strokeDasharray="2 2"
          />
        </svg>
      ),
    },
    {
      name: "Segment",
      svg: (
        <svg
          width="100"
          height="100"
          viewBox="0 0 47 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18H14.0769L21.6154 2L29.6923 18H44L29.6923 29.5L35.6154 44L21.6154 35L9.23077 44L14.0769 29.5"
            stroke="#F3A40A"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      ),
    },
  ];

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
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            height: 700,
            width: "100%",
            overflow: "visible",
            border: 0,
            padding: 0.5,
            mb: 1.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 648,
              width: 1152,
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
                      height={648}
                      width={1152}
                    />
                  )}
                </div>
              );
            })}
          </Box>
        </Box>

        {/* <Box
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              height: 400,
              width: 265,
              border: 0,
              padding: 2,
              mb: 1.5,
            }}
          >
            {comment && mark ? (
              <React.Fragment>
                <h3> Properties</h3>
                <p>Label: {comment}</p>
                <p>Type: Bounding Box</p>
                <p>X: {Math.abs(mark?.x?.toFixed(3))} </p>
                <p>Y: {Math.abs(mark?.y?.toFixed(3))}</p>
                <p>Height: {Math.abs(mark?.height?.toFixed(3))}</p>
                <p>Width: {Math.abs(mark?.width?.toFixed(3))}</p>
              </React.Fragment>
            ) : (
              <Box
                sx={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3> Choose Labeling Tool </h3>
                <div className={style["label-tools"]}>
                  {tools.map((tool, index) => (
                    <div className={style["tool-container"]} key={index}>
                      {tool.svg}
                      <Typography variant="body1">{tool.name}</Typography>
                    </div>
                  ))}
                </div>
              </Box>
            )}
          </Box> */}

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
