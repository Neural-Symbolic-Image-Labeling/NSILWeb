import { Button, Box, Typography, TextField, InputAdornment } from "@mui/material";
import { fetchImages, labelImage, search } from "../../../stores/gallery";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";


export const TopActionBar = () => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.gallery.displayedImages);
  const isLoading = useSelector(state => state.gallery.loading);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchImages());
  }, []);

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        margin: "20px 0 20px 0",
      }}>
        {/* Left Button */}
        <Button
          variant="outlined"
          onClick={() => dispatch(fetchImages())}
          size="medium"
        >
          Load Images
        </Button>
        {/* Search Bar */}
        <Box sx={{ display: "flex" }}>
          <TextField
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{color: "rgba(25, 118, 210, 0.7)"}} />
                </InputAdornment>
              )
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: "2px" }}
            onClick={() => dispatch(search(searchTerm))}
          >
            Search
          </Button>
        </Box>
        {/* Right Button */}
        <Button variant="outlined" size="medium">
          Auto Label
        </Button>
      </Box>
      <Box>
        <Button onClick={() => dispatch(labelImage({imageId: 1, label: 'lol'}))}>label fisrt</Button>
        <Typography variant="body1">
          {isLoading ? "Loading..." : `${images.length} images showed`}
        </Typography>
      </Box>
    </>
  )
}