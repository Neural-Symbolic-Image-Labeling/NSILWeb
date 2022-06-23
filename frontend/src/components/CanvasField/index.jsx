import { useContext, useEffect, useRef } from "react";
import { FabricContext } from "../../context/FabricContext";
import ToolList from "../../context/FabricContext/Tools/ToolList";
import { Box, Button, Container } from "@mui/material";

export const CanvasField = () => {
  const canvasRef = useRef(null);
  const [canvas, currTool, initCanvas, setTool, setProps] =
  useContext(FabricContext);

  useEffect(() => {
    initCanvas(canvasRef);
    console.log(canvasRef);
  }, []);

  const test = () => {
    setProps({ canvasBackgroundColor: "#a8e4f7" });
  };

  return (
    <>
      {/* <div>
          {canvas && JSON.stringify(canvas.toJSON())}
        </div> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box>
          <canvas ref={canvasRef}></canvas>
        </Box>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "20px",
          }}
        >
          <Box m={2} pt={3}>
            <Button
              variant="contained"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                minWidth: "100px",
                minHeight: "100px",
              }}
              onClick={() => setTool(ToolList.RectangleTool)}
            >
              Bounding Box
            </Button>
          </Box>

          <Button
            variant="contained"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              minWidth: "100px",
              minHeight: "100px",
            }}
            onClick={() => setTool(ToolList.SelectedTool)}
          >
            Select
          </Button>
        </Container>
      </Box>
    </>
  );
};
