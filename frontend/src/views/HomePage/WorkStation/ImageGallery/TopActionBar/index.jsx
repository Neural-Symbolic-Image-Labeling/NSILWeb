import { Button, Box, Typography, TextField, InputAdornment, Paper } from "@mui/material";
import { fetchWorkspace, labelImage, search, setFilter } from "../../../../../stores/gallery";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";


export const TopActionBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const workspace = useSelector(state => state.gallery.workspace);

  useEffect(() => {
    dispatch(fetchWorkspace());
  }, []);

  return (
    <>
      <Paper sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        padding: "25px 0 25px 0",
      }}>
        {/* Left Button */}
        <Button
          variant="contained"
          onClick={() => dispatch(fetchWorkspace())}
          size="medium"
        >
          Load Images
        </Button>
        {/* Search Bar */}
        <Box sx={{ display: "flex" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search label name or image name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{color: "#505050"}} />
                </InputAdornment>
              )
            }}
            sx={{
              width: "350px"
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: "2px" }}
            onClick={() => dispatch(setFilter(searchTerm))}
          >
            Search
          </Button>
        </Box>
        {/* Right Button */}
        <Button variant="contained" size="medium">
          Auto Label
        </Button>
      </Paper>
      {/* <Box>
        <Button disabled={workspace === null} onClick={() => dispatch(labelImage({imageId: workspace.images.sort(() => .5 - Math.random()).slice(0,1)[0].imageId, label: 'lol'}))}>Label images</Button>
        <Typography variant="body1">
          {isLoading ? "Loading..." : `${images.length} images showed`}
        </Typography>
      </Box> */}
    </>
  )
}