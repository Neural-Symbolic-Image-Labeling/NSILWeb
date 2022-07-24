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

    }}>
      <Box sx={{
        width: "70vw",
      }}>
        <Workstation />
      </Box>
      <Box sx={{
        width: "30vw",
      }}>
        <ResultSideBar />
      </Box>
    </Box>
  )
}