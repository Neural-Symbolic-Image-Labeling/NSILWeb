import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { findCollection } from "../utils/workspace";
import { PaperFrame } from "./index";
import { colorPicker } from "../muiStyles"; 

export const StatusBar = () => {
  const workspace = useSelector(state => state.workspace.workspace);
  const isLoading = useSelector(state => state.workspace.loading);
  const currCollectionId = useSelector(state => state.workspace.currCollectionId);
  const currCollection = findCollection(workspace, currCollectionId);
  const statistics = workspace ? currCollection ? currCollection.statistics : null : null;

  return (
    <PaperFrame sx={{
      justifyContent: "space-evenly",
      alignItems: "center",
      pt: "14px",
      pb: "14px",
    }}>
      <StatusItem
        color={colorPicker.manual}
        label="Manually-Labeled"
        value={statistics ? (statistics.manual / statistics.total) * 100 : null}
        loading={isLoading}
      />
      <StatusItem
        color={colorPicker.auto}
        label="Auto-Labeled"
        value={statistics ? (statistics.autoLabeled / statistics.total) * 100 : null}
        loading={isLoading}
      />
      <StatusItem
        color={colorPicker.unlabeled}
        label="Unlabeled"
        value={statistics ? (statistics.unlabeled / statistics.total) * 100 : null}
        loading={isLoading}
      />
    </PaperFrame>
  )
}

const StatusItem = ({ color, label, value, loading }) => { 
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
    }}>
      <Box sx={{
        bgcolor: color,
        height: "18px",
        width: "18px",
        mr: "10px"
      }} />
      <Typography sx={{fontSize: "14px"}}>{`${label}:`}</Typography>
      <Typography sx={{ml: "5px", fontSize: "14px", fontWeight: "bold"}}>{ loading ? "Loading" : value === null? "N/A" : `${value}%` }</Typography>
    </Box>
  )
}