import { Button, Box, Typography, TextField, InputAdornment, Paper, Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemIcon, ListItemText, DialogActions, CircularProgress } from "@mui/material";
import { Collections } from "@mui/icons-material";
import { loadWorkspace, search, setCurrCollectionId, setFilter, setWorkspace } from "../../../../../stores/workspace";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { getAllSetNames } from "../../../../../apis/image";
import { PaperFrame } from "../../../../../components/PaperFrame";
import { autoLogin, requestAutoLabel, requestNewCollection } from "../../../../../apis/workspace";


export const TopActionBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [imgSets, setImgSets] = useState([]);
  const [loadSets, setLoadSets] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [autoLabelButtonDisabled, setAutoLabelButtonDisabled] = useState(false);
  const workspace = useSelector(state => state.workspace.workspace);
  const currCollectionId = useSelector(state => state.workspace.currCollectionId);

  useEffect(() => {
    getAllSetNames()
      .then(sets => {
        setImgSets(sets);
        setLoadSets(false);
      })
  }, []);

  const handleAutoLabel = () => {
    setAutoLabelButtonDisabled(true);
    requestAutoLabel(workspace._id, currCollectionId)
      .then(() => {
        dispatch(loadWorkspace(workspace.name))
          .then(() => setAutoLabelButtonDisabled(false))
          .catch(err => {
            console.log(err);
            setAutoLabelButtonDisabled(false);
          });
      })
      .catch(err => {
        console.log(err);
        setAutoLabelButtonDisabled(false);
      });
  }

  return (
    <Fragment>
      <ImageSetSelectionModal imgSets={imgSets} openModal={openModal} setOpenModal={setOpenModal} />
      <PaperFrame sx={{
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        padding: "16px 0 16px 0",
      }}>
        {/* Left Button */}
        <Button
          variant="contained"
          disabled={loadSets}
          onClick={() => setOpenModal(true)}
          size="medium"
          sx={{
            bgcolor: 'purple.dark',
            color: 'white',
          }}
        >
          Load Images
        </Button>
        {/* Search Bar */}
        <Box sx={{
          display: "flex"
        }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search label name or image name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "purple.dark" }} />
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
            size="medium"
            onClick={() => dispatch(setFilter(searchTerm))}
            sx={{
              marginLeft: "5px",
              bgcolor: 'purple.dark',
              color: 'white',
            }}
          >
            Search
          </Button>
        </Box>
        {/* Right Button */}
        <Button
          variant="contained"
          size="medium"
          onClick={() => handleAutoLabel()}
          disabled={autoLabelButtonDisabled}
          sx={{
            bgcolor: 'purple.dark',
            color: 'white',
          }}
        >
          {autoLabelButtonDisabled ? <CircularProgress /> : "Auto Label"}
        </Button>
      </PaperFrame>
    </Fragment>
  )
}

const ImageSetSelectionModal = ({ imgSets, openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  // const currCollectionId = useSelector(state => state.gallery.currCollectionId);
  const workspace = useSelector(state => state.workspace.workspace);
  const [seletedSet, setSeletedSet] = useState("");

  const handleLoadSet = async () => {
    if (seletedSet === "") return;
    // collection already exists
    let targetCollection = workspace.collections.find(c => c.name === seletedSet);
    if (targetCollection) {
      dispatch(setCurrCollectionId(targetCollection._id));
      setOpenModal(false);
      return;
    }
    try {
      // request for new collection
      const newCollectionId = await requestNewCollection(seletedSet, workspace._id);
      // update workspace
      dispatch(loadWorkspace(workspace.name));
      // set curr collection id
      dispatch(setCurrCollectionId(newCollectionId));
      setOpenModal(false);
      return;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog onClose={() => setOpenModal(false)} open={openModal}>
      <DialogTitle>Select An Image Set</DialogTitle>
      <DialogContent>
        <Box sx={{
          maxHeight: "500px",
          overflowY: "auto",
        }}>
          <List component="nav">
            {imgSets.map((set, index) => (
              <ListItemButton key={index} selected={set === seletedSet} onClick={() => setSeletedSet(set)}>
                <ListItemIcon>
                  <Collections />
                </ListItemIcon>
                <ListItemText primary={set} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => setOpenModal(false)}>Cancel</Button>
        <Button variant="outlined" onClick={() => handleLoadSet()}>Load</Button>
      </DialogActions>
    </Dialog>
  )
}