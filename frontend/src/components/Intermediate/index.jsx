import { Paper } from "@mui/material"

export const Intermediate = ({children}) => { 
  return (
    <Paper sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    }}>
      {children}
    </Paper>
  )
}