import { Box } from "@mui/material"
import { Header } from "./Header"

export const HomePage = () => { 
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    }}>
      <Header />
    </Box>
  )
}