import { Box, ImageList, ImageListItem, ImageListItemBar, Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Intermediate } from "../../../../components/Intermediate";
import { LabelItem } from "../../../../components/LabelItem";
import { findCollection } from "../../../../utils/workspace";
import { TopActionBar } from "./TopActionBar";

const matchLabel = (labels, filterStr) => {
  if (!filterStr) return true;
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].label.toLowerCase().includes(filterStr.toLowerCase())) {
      return true;
    }
  }
  return false;
}

export const ImageGallery = ({ setPage }) => {
  const workspace = useSelector(state => state.gallery.workspace);
  const currCollectionId = useSelector(state => state.gallery.currCollectionId);
  const filterStr = useSelector(state => state.gallery.filter);
  const isLoading = useSelector(state => state.gallery.loading);

  const getDisplayImages = () => {
    // find collection
    const collection = findCollection(workspace, currCollectionId);
    // find filtered images
    const filteredImages = collection ? collection.images.filter(i => i.name.toLowerCase().includes(filterStr.toLowerCase()) || matchLabel(i.labels, filterStr)) : [];
    return filteredImages;
  }

  const getType = (image) => {
    if (image.labels.length === 0) {
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
            {getDisplayImages().map((image, index) => (
              <ImageListItem key={index}
                sx={{
                  width: '220px',
                  minHeight: '220px',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    objectFit: "cover",
                    width: '220px',
                    height: '220px',
                  }}
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