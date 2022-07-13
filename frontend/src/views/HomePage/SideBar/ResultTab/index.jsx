import { Box } from "@mui/material";
import { ChartSection } from "./ChartSection";
import { LearningRules } from "./LearningRules";

export const ResultTab = () => { 

  return (
    <Box sx={{
      mt: '5px'
    }}>
      <ChartSection />
      {/* <LearningRules /> */}
    </Box>
  )
}