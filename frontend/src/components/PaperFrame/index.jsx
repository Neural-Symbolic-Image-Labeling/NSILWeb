import { Paper } from "@mui/material"

export const PaperFrame = ({children, noFrame, sx}) => { 

  return (
    <Paper sx={{
      ...sx,
      borderRadius: noFrame ? "0px" : "4px",
      boxShadow: noFrame ? "none" : "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    }}>
      { children }
    </Paper>
  )
}