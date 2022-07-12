import { Button, Box, Typography, TextField, InputAdornment, Paper, Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemIcon, ListItemText, DialogActions, CircularProgress } from "@mui/material";
import { Collections } from "@mui/icons-material";
import { fetchWorkspace, labelImage, search, setCurrCollectionId, setFilter, setWorkspace } from "../../../../../stores/gallery";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { getAllSetNames } from "../../../../../apis/image";
import { PaperFrame } from "../../../../../components/PaperFrame";
import { autoLogin, requestAutoLabel, requestNewCollection } from "../../../../../apis/workspace";
import { pullWorkspace } from "../../../../../utils/workspace";


export const TopActionBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [imgSets, setImgSets] = useState([]);
  const [loadSets, setLoadSets] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [autoLabelButtonDisabled, setAutoLabelButtonDisabled] = useState(false);
  const workspace = useSelector(state => state.gallery.workspace);
  const currCollectionId = useSelector(state => state.gallery.currCollectionId);

  useEffect(() => {
    dispatch(fetchWorkspace());
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
        pullWorkspace(workspace._id, dispatch(setWorkspace))
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
    <>
      <ImageSetSelectionModal imgSets={imgSets} openModal={openModal} setOpenModal={setOpenModal} />
      <PaperFrame bottom sx={{
        display: "flex",
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
            bgcolor: 'rgba(57, 125, 192, 1)',
            color: 'white',
          }}
        >
          Load Image Set
        </Button>
        {/* Search Bar */}
        <Box sx={{ display: "flex" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search label name or image name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#505050" }} />
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
            onClick={() => dispatch(setFilter(searchTerm))}
            sx={{
              marginLeft: "2px",
              bgcolor: 'rgba(57, 125, 192, 1)',
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
            bgcolor: 'rgba(217, 56, 132, 1)',
            color: 'white',
          }}
        >
          {autoLabelButtonDisabled ? <CircularProgress /> : "Auto Label"}
        </Button>
      </PaperFrame>
    </>
  )
}

const ImageSetSelectionModal = ({ imgSets, openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  // const currCollectionId = useSelector(state => state.gallery.currCollectionId);
  const workspace = useSelector(state => state.gallery.workspace);
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
      const updated = await autoLogin();
      if (updated) {
        dispatch(setWorkspace(updated));
      }
      else {
        console.log("cannot get new data");
        return;
      }
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