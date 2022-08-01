import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Intermediate, LabelItem, PaperFrame, StatusBar } from '../../../../../components';
import { adjustedScrollbar } from '../../../../../muiStyles';
import { setCurrentImage, setCurrentLabels, setManual } from '../../../../../stores/workstation';
import { findCollection } from '../../../../../utils/workspace';
import { TopActionBar } from './TopActionBar';

const borderDict = {
  unlabeled: { borderBottom: '3px solid #757575'},
  manual: { borderBottom: '3px solid #40ab6e' },
  conflict: { border: '3px solid rgba(255, 0, 0, 0.8)' },
  auto: { borderBottom: '3px solid #dc6e25' },
}

const matchLabel = (labels, filterStr) => {
  if (!filterStr) return true;
  for (let i = 0; i < labels.length; i++) {
    for (let j = 0; j < labels[i].name.length; j++) {
      if (labels[i].name[j].toLowerCase().includes(filterStr.toLowerCase())) {
        return true;
      }
    }
  }
  return false;
}

export const Gallery = ({ setPage }) => {
  const dispatch = useDispatch();
  const workspace = useSelector(state => state.workspace.workspace);
  const currCollectionId = useSelector(state => state.workspace.currCollectionId);
  const filterStr = useSelector(state => state.workspace.filter);
  const isLoading = useSelector(state => state.workspace.loading);
  const currCollection = findCollection(workspace, currCollectionId);
  const currentImage = useSelector((state) => state.workstation.currentImage);
  const imageMetaData = currCollection ? currCollection.images[currentImage] : null;

  const getDisplayImages = () => {
    // find collection
    const collection = findCollection(workspace, currCollectionId);
    // find filtered images
    const filteredImages = collection ? collection.images.filter(i => i.name.toLowerCase().includes(filterStr.toLowerCase()) || matchLabel(i.labels, filterStr)) : [];
    return filteredImages;
  }

  const getType = (image) => {
    if (!image.labeled) {
      return "unlabeled";
    }
    for (let l of image.labels) { 
      if (l.name.length > 1) return "conflict";
    }
    if(image.manual) return "manual";
    return "auto";
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: "100%",
      boxSizing: "border-box",
      // overflow: "auto",
      // border: "3px solid red",
    }}>
      <TopActionBar />
      <Box sx={{
        mt: "12px",
        mb: "12px",
      }}>
        <StatusBar />
      </Box>
      <PaperFrame sx={{
        justifyContent: "center",
        alignItems: "center",
        p: "0 0 20px 0",
        boxSizing: "border-box",
        // border: "3px solid blue",
        minHeight: '0'
      }}>
        {isLoading ? <Intermediate>Loading</Intermediate> : workspace === null ? <Intermediate>No Data</Intermediate> : (
          <Box sx={{
            width: "100%",
            maxHeight: "100%",
            height: "100%",
            boxSizing: "border-box",
            // overflowX: "hidden",
            // overflowY: "auto",
            // ...adjustedScrollbar.hidden,
          }}>
            <ImageList
              sx={{
                width: "100%",
                height: "100%",
                justifyItems: "center",
                overflowX: "hidden",
                overflowY: "auto",
                ...adjustedScrollbar.thin,
                boxSizing: "border-box",
                // gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr)) !important",
              }}
              rowHeight={135}
              cols={7}
            // gap={6}
            >
              {getDisplayImages().length === 0 ? <Intermediate>No Result</Intermediate> : getDisplayImages().map((image, index) => (
                <ImageListItem key={index}
                  sx={{
                    width: 'fit-content',
                    height: 'fit-content',
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      objectFit: "cover",
                      width: '120px',
                      height: '120px',
                      ...borderDict[getType(image)],
                      '&:hover': {
                        cursor: "pointer",
                        opacity: 0.5,
                      }
                    }}
                    src={image.url}
                    alt={image.name}
                    loading="lazy"
                    onClick={() => {
                      setPage(1);
                      dispatch(setCurrentImage(index));
                      dispatch(setManual(false));
                      dispatch(setCurrentLabels(currCollection.images[index].labels[0] === undefined ? "" : currCollection.images[index].labels[0].name[0]))
                    }}
                  />
                  {/* <ImageListItemBar
                    title={<LabelItem type={getType(image)} label={image.name} />}
                    position="below"
                  /> */}
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </PaperFrame>
    </Box>
  )
}