import { Box } from "@mui/material";
import { ChartSection } from "./ChartSection";
import { RuleSection } from "./RuleSection";

/**ResultSideBar Wrapper
 * The ResultSideBar section acts as a wrapper for ChartSection and RuleSection.
 */
export const ResultSideBar = () => { 

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
    }}>
      <ChartSection />
      <RuleSection />
    </Box>
  )
}