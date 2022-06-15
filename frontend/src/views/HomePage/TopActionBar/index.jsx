import { Button, Box, Typography, TextField, InputAdornment } from "@mui/material";
import { fetchImages, search } from "../../../stores/gallery";
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
          size="large"
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
                  <Search />
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
        <Button variant="outlined" size="large">
          Auto Label
        </Button>
      </Box>
      <Box>
        <Typography variant="body1">
          {isLoading ? "Loading..." : `${images.length} images loaded`}
        </Typography>
      </Box>
    </>
  )
}