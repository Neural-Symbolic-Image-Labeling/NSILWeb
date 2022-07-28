import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaperFrame } from "../../../../../components";
import { adjustedScrollbar } from "../../../../../muiStyles";
import { setImageMetaData } from "../../../../../stores/workspace";
import { findCollection } from "../../../../../utils/workspace";

export const LabelPanel = () => {
  const currImgIndex = useSelector(state => state.workstation.currentImage);
  const workspace = useSelector(state => state.workspace.workspace);
  const currCollectionId = useSelector(state => state.workspace.currCollectionId);
  const currCollection = findCollection(workspace, currCollectionId);
  const imageMetaData = currCollection ? currCollection.images[currImgIndex] : null;
  const mode = imageMetaData ? imageMetaData.mode : "";

  const getPanel = () => {
    switch (mode) {
      case 'segmentation':
      // return <SegmentationPanel imageMetaData={imageMetaData} />
      default:
        return <ClassificationPanel imageMetaData={imageMetaData} />
    }
  }

  return (
    <Fragment>
      {imageMetaData && getPanel()}
    </Fragment>
  )
}

const ClassificationPanel = ({ imageMetaData }) => {
  const dispatch = useDispatch();

  const detectMode = () => {
    if (imageMetaData.labels.length <= 1) {
      if (imageMetaData.manual) {
        return 'confirmed';
      }
      return 'normal';
    }
    return 'conflict';
  }

  const handleClick = (indexL) => { 
    // only keep indexL-th label
    const newLabels = imageMetaData.labels.filter((_, index) => index !== indexL);
    // update imageMetaData
    let oldType = imageMetaData.labeled ? imageMetaData.manual ? "manual" : "autoLabeled" : 'unlabeled';
    let temp = JSON.parse(JSON.stringify(imageMetaData));
    temp.labels = newLabels;
    temp.labeled = true;
    temp.manual = true;
    dispatch(setImageMetaData({ indexI: currImgIndex, data: temp }));
    // TODO: update statistics
    temp = JSON.parse(JSON.stringify(currCollection));
    temp.statistics[oldType] -= 1;
    temp.statistics["manual"] += 1;
  }

  return (
    <PaperFrame sx={{
      width: '100%',
      alignContent: 'center',
      overflowX: 'scroll',
      ...adjustedScrollbar.thin
    }}>
      <Typography sx={{
        mr: '8px',
        color: 'purple.dark',
        fontSize: '20px',
        lineHeight: '26px',
      }}>
        Image Class:
      </Typography>
      {imageMetaData.labels.map((label, index) => (
        <Fragment key={index}>
          {index !== 0 && (
            <Typography sx={{
              ml: '10px',
              mr: '10px',
              fontWeight: '700',
              fontSize: '22px',
              lineHeight: '26px',
              letterSpacing: '0.15px',
            }}>
              OR
            </Typography>
          )}
          <LabelChip label={label.name} indexL={index} mode={detectMode()} handleClick={handleClick} />
        </Fragment>
      ))}

    </PaperFrame>
  )
}

const LabelChip = ({ label, handleClick, indexL, mode }) => {

  const getBorderStyle = () => {
    switch (mode) {
      case 'confirmed':
        return '3px solid #0BA436';
      case 'conflict':
        return '3px solid rgba(255, 0, 0, 0.6)';
      case 'normal':
      default:
        return 'rgba(229, 235, 244, 1)'
    }
  }

  const clickHandler = () => { 
    if (mode === 'confirmed') return;
    handleClick(indexL);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '5px 24px',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: getBorderStyle(),
        '&:hover': {
          cursor: mode === conflict ? 'pointer' : 'default',
          backgroundColor: mode === conflict ? 'bg.main' : 'white',
        },
      }}
      onClick={clickHandler}
    >
      <Typography sx={{
        fontSize: '17px',
        lineHeight: '26px',
        letterSpacing: '0.15px',
      }}>
        {label}
      </Typography>
    </Box>
  )
}