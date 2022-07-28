import { PaperFrame } from "../../../../../components";
import { Box, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { Canvas } from "./Canvas/Canvas";
import { Toolbar } from "./Toolbar";
import { Carousel } from "./Carousel";

export const Annotation = (setPage) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "75%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "5%",
            mr: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Toolbar />
        </Box>

        <Box
          sx={{
            width: "95%",
            mr: "12px",
            justifyContent: "center",
            alignItems: "center",
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
