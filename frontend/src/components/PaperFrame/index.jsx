import { Paper } from "@mui/material"

const borderStyle = "1.5px solid rgba(193, 193, 193, 1)";

export const PaperFrame = ({
  children,
  noShadow = true,
  left = false,
  right = false,
  top = false,
  bottom = false,
  sx
}) => {

  return (
    <Paper sx={{
      borderRadius: noShadow? "0px" : "5px",
      boxShadow: noShadow ? "none" : "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      borderTop: top ? borderStyle : "none",
      borderLeft: left ? borderStyle : "none",
      borderRight: right ? borderStyle : "none",
      borderBottom: bottom ? borderStyle : "none",   
      ...sx,
    }}>
      {children}
    </Paper>
  )
}