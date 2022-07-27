import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { PaperFrame } from "../../../../../components";

export const LabelPanel = ({ mode, imageMetaData }) => { 
  
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
      {getPanel()}
    </Fragment>
  )
}

const ClassificationPanel = ({ imageMetaData }) => {

  return (
    <PaperFrame sx={{

    }}>
      <Typography sx={{
        mr: '8px',
        color: 'purple.dark',
        fontSize: '20px',
        lineHeight: '26px',
      }}>
        Image Class:
      </Typography>


    </PaperFrame>
  )
}

const LabelChip = ({ label, onClick, indexL, mode }) => {

  const getBorderStyle = () => { 
    switch (mode) { 
      case 'confirmed':
        return '3px solid #0BA436';
      case 'conflict':
        return '3px solid rgba(255, 0, 0, 0.6)';
      default: 
        return '1px solid purple.dark'
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: '5px 24px',
      backgroundColor: 'white',
      borderRadius: '16px',
      border: '1px solid purple.dark',
    }}>

    </Box>
  )
}