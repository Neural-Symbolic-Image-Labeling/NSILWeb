import { PaperFrame } from "../../../../../components";
import { Box, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { Canvas } from "./Canvas/Canvas";
import { Toolbar } from "./Toolbar";

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
          height: "74%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "5vw",
            mr: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Toolbar/>
        </Box>

        <PaperFrame
          sx={{
            width: "90vw",
            mr: "12px",
            height: "92%",
            p: "15px 0 15px 0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Canvas />
        </PaperFrame>

        </Box>
    </Box>
  );
};
