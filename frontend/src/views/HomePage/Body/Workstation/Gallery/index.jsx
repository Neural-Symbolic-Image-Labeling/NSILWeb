import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Intermediate, LabelItem, PaperFrame, StatusBar } from '../../../../../components';
import { adjustedScrollbar } from '../../../../../muiStyles';
import { setCurrentImage, setCurrentLabels} from '../../../../../stores/workstation';
import { findCollection } from '../../../../../utils/workspace';
import { TopActionBar } from './TopActionBar';

const matchLabel = (labels, filterStr) => {
  if (!filterStr) return true;
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].name.toLowerCase().includes(filterStr.toLowerCase())) {
      return true;
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
    } else if (image.manual) {
      return "manual";
    } else {
      return "auto";
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: "100%",
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
        height: "100%",
        p: "15px 0 15px 0"
      }}>
        {isLoading ? <Intermediate>Loading</Intermediate> : workspace === null ? <Intermediate>No Data</Intermediate> : (
          <Box sx={{
            width: "100%",
            height: "100%",
            overflowX: "hidden",
            overflowY: "scroll",
            ...adjustedScrollbar.hidden,
          }}>
            <ImageList
              sx={{
                width: "100%",
                height: "100%",
                justifyItems: "center",
                // gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr)) !important",
              }}
              cols={4}
              // gap={6}
            >
              {getDisplayImages().length === 0 ? <Intermediate>No Result</Intermediate> : getDisplayImages().map((image, index) => (
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
                    onClick={() => {
                      setPage(1);
                      dispatch(setCurrentImage(index));
                      dispatch(setCurrentLabels(imageMetaData.labels[0] === undefined ? "": imageMetaData.labels[0].name[0]))
                    }}
                  />
                  <ImageListItemBar
                    title={<LabelItem type={getType(image)} label={image.name} />}
                    position="below"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </PaperFrame>
    </Box>
  )
}