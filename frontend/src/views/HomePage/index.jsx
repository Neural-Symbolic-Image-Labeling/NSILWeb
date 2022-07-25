import { Box } from "@mui/material";
import { Header } from "./Header";
import { Body } from "./Body";
import { adjustedScrollbar } from "../../muiStyles";

export const HomePage = () => { 
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      bgcolor: "bg.main",
    }}>
      <Header />
      <Body />
    </Box>
  )
}