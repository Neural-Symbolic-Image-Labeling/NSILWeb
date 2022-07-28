import { Box } from "@mui/material";
import { Header } from "./Header";
import { Body } from "./Body";
import { adjustedScrollbar } from "../../muiStyles";
import { fetchWorkspace } from "../../stores/workspace";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const HomePage = () => { 
  const dispatch = useDispatch();
  const workspace = useSelector(state => state.workspace.workspace);

  useEffect(() => { 
    if (!workspace) {
      alert("load workspace");
      dispatch(fetchWorkspace());
    }
  });

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