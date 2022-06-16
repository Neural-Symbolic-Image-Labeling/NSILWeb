import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LabelItem } from "../../../../components/LabelItem";

export const ImageGallery = ({ setPage }) => {
  const images = useSelector(state => state.gallery.images);
  const filterStr = useSelector(state => state.gallery.filter);
  const isLoading = useSelector(state => state.gallery.loading);

  return (
    <>
      <Box sx={{}}>
        {isLoading ? (<div>Loading...</div>) : (
          <ImageList
            sx={{
              maxHeight: "650px",
              paddingRight: "20px",
              overflowX: "hidden",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "0.4em",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#00000",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                height: "3em",
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                height: "3em",
                background: "#555",
                borderRadius: "10px",
                marginRight: "15px",
              },
            }}
            cols={4}
            gap={6}
          >
            {images.filter(img => img.name.toLowerCase().includes(filterStr.toLowerCase())).map((image, index) => (
              <ImageListItem key={index}>
                <Box
                  component="img"
                  sx={{ width: "200px", height: "200px" }}
                  src={image.url}
                  alt={image.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={<LabelItem isLablled={image.label !== "unlabeled"} label={image.name} />}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </>
  )
}