import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactPictureAnnotation } from "react-picture-annotation";
import { Box } from "@mui/system";
import { ChartSection } from "../HomePage/ChartSection";
import { HomePageHeader } from "../HomePage/Header";
import { TopActionBar } from "../HomePage/TopActionBar";
import { LearningRules } from "../HomePage/LearningRules";
import { WorkStation } from './WorkStation';

export const TestPage = () => {
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Part */}
        <HomePageHeader />

        {/* Body Part*/}
        <Box
          sx={{
            display: "flex",
          }}
        >
          {/* Left Part */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexBasis: "70%",
              border: "1px solid black",
            }}
          >
            {/* Top Action Bar */}
            <TopActionBar />
            {/* Work Station Part */}
            <WorkStation />

          </Box>
          {/* Right Part */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexBasis: "30%",
              border: "1px solid black",
            }}
          >
            {/* Chart Section */}
            <ChartSection />
            {/* Rule List */}
            <LearningRules />
          </Box>
        </Box>
      </Box>
    </>
  );
};
