import React from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import { Box } from "@mui/material";

const AnnotationTool = () => {
  const [data, setData] = React.useState([]);

  const onSelect = (selectedId) => console.log(selectedId);
  const onChange = (data) => {
    data?.map((item) => {
      return setData({
        comment: item?.comment,
        mark: item?.mark,
      });
    });
  };
  const { comment, mark } = data;
  console.log(mark);
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
            <ReactPictureAnnotation
              image="https://source.unsplash.com/random/800x600"
              onSelect={onSelect}
              onChange={onChange}
              width={500}
              height={400}
            />
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
            height: 100,
            width: 800,

            border: 1,
            padding: 2,
            mb: 1.5,
          }}
        ></Box>
      </Box>
    </div>
  );
};
export default AnnotationTool;
