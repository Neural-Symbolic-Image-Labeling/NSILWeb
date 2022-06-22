import { Box, ImageList, ImageListItem, ImageListItemBar, Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Intermediate } from "../../../../components/Intermediate";
import { LabelItem } from "../../../../components/LabelItem";
import { TopActionBar } from "./TopActionBar";

export const ImageGallery = ({ setPage }) => {
  const workspace = useSelector(state => state.gallery.workspace);
  const filterStr = useSelector(state => state.gallery.filter);
  const isLoading = useSelector(state => state.gallery.loading);

  const getType = (image) => { 
    if(image.label === "unlabeled") {
      return "unlabeled";
    } else if (image.manual) {
      return "manual";
    } else {
      return "auto";
    }
  }

  return (
    <>
      <TopActionBar />
      <Paper sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pl: "30px",
      }}>
        {isLoading ? <Intermediate>Loading</Intermediate> : workspace === null ? <Intermediate>No Data</Intermediate> : (
          <ImageList
            sx={{
              width: "100%",
              maxHeight: "720px",
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
            {workspace.images.filter(img => img.name.toLowerCase().includes(filterStr.toLowerCase())).map((image, index) => (
              <ImageListItem key={index}>
                <Box
                  component="img"
                  sx={{ width: "100%", height: "220px", objectFit: "contain" }}
                  src={image.url}
                  alt={image.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={<LabelItem type={getType(image)} label={image.name} />}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Paper>
    </>
  )
}