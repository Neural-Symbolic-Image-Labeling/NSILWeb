import { Box } from "@mui/material"
import { ResultSideBar } from "./ReusltSideBar"
import { Workstation } from "./Workstation"

/**Body Wrapper
 * The Body section contains the main content of the page. 
 * It seperates the remaining page content into two parts: Workstation and ResultSideBar.
 */
export const Body = () => { 

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      height: "100vh",
      maxHeight: "100vh",
      padding: "10px",
      boxSizing: "border-box",
      // overflow: "hidden",
    }}>
      <Box sx={{
        width: "70vw",
        mr: "12px",
        height: "100%",
        boxSizing: "border-box",
      }}>
        <Workstation />
      </Box>
      <Box sx={{
        width: "30vw",
        boxSizing: "border-box",
        overflow: "hidden",
      }}>
        <ResultSideBar />
      </Box>
    </Box>
  )
}