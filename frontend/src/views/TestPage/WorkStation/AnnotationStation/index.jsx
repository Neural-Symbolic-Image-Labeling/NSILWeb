import { ReactPictureAnnotation } from "react-picture-annotation";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import style from "./style.module.css";

const AnnotationTool = () => {
  const [data, setData] = React.useState([]);
  const onSelect = (selectedId) => console.log(selectedId);
  const onChange = (data) => {
    data?.map((item) => {
      return setData({
        labelName: item?.comment,
        mark: item?.mark,
      });
    });
  };
  const { comment, mark } = data;
  console.log(data);

  const dataSet = [
    {
      id: 0,
      image:
        "https://drive.google.com/uc?id=1JvoXSE2mbg5LbiAUCoca3nk9Jb2ueI5L",
    },
    {
      id: 1,
      image:
        "https://drive.google.com/uc?id=12r4gW9QIHx-DHozsKG_kU64hsm7WJtdJ",
    },
    {
      id: 2,
      image:
        "https://drive.google.com/uc?id=1xS79tEzFH2X6YegcgHPmx_r_sSF298nI",
    },
    {
      id: 3,
      image:
        "https://drive.google.com/uc?id=1JuMOnfTDYpdBWSIFOAnRpqOji_Nrk2G6",   
     },
    {
      id: 4,
      image:
        "https://drive.google.com/uc?id=1wKo7fNJbXGGUvN6wf41CHW3UuZ8UKUjr",
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = dataSet.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              height: 400,
              width: 500,
              overflow: "visible",
              border: 1,
              padding: 2,
              mb: 1.5,
            }}
          >
            {dataSet.map((slide, index) => {
              return (
                <div key={index}>
                  {index === current && (
                    <ReactPictureAnnotation
                      image={slide.image}
                      onSelect={onSelect}
                      onChange={onChange}
                      width={500}
                      height={400}
                    />
                  )}
                </div>
              );
            })}
          </Box>
          <Box
            sx={{
              height: 400,
              width: 260,
              border: 1,
              padding: 2,
              mb: 1.5,
            }}
          >
            {comment && mark ? (
              <React.Fragment>
                <h3>Properties</h3>
                <p>Label: {comment}</p>
                <p>Type: Bounding Box</p>
                <p>X: {Math.abs(mark?.x?.toFixed(3))} </p>
                <p>Y: {Math.abs(mark?.y?.toFixed(3))}</p>
                <p>Height: {Math.abs(mark?.height?.toFixed(3))}</p>
                <p>Width: {Math.abs(mark?.width?.toFixed(3))}</p>
              </React.Fragment>
            ) : null}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            width: 800,
            border: 1,
            padding: 2,
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
              height: 150,
              width: 700,
              padding: 2,
              mb: 1.5,
            }}
          >
            {dataSet.map((slide, index) => {
              const pre = dataSet.find(
                (slide) =>
                  slide.id === (current === 0 ? length - 1 : current - 1)
              );
              const next = dataSet.find(
                (slide) =>
                  slide.id === (current === length - 1 ? 0 : current + 1)
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
                      <img src={pre.image} className={style["image_pre"]} />
                      <img src={slide.image} className={style["image"]} />
                      <img src={next.image} className={style["image_pre"]} />
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
export default AnnotationTool;
