import { Box } from "@mui/material"
import { ChartSection } from "../Workstation/ChartSection"

/**ResultSideBar Wrapper
 * The ResultSideBar section acts as a wrapper for ChartSection and RuleSection.
 */
export const ResultSideBar = () => { 

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
    }}>
      <ChartSection />
    </Box>
  )
}