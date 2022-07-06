import { Button, Box, Typography, TextField, InputAdornment, Paper, Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemIcon, ListItemText, DialogActions } from "@mui/material";
import { Collections } from "@mui/icons-material";
import { fetchWorkspace, labelImage, search, setCurrCollectionId, setFilter, setWorkspace } from "../../../../../stores/gallery";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { getAllSetNames } from "../../../../../apis/image";
import { autoLogin, requestAutoLabel, requestNewCollection } from "../../../../../apis/workspace";


export const TopActionBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [imgSets, setImgSets] = useState([]);
  const [loadSets, setLoadSets] = useState(true);
  const [openModal, setOpenModal] = useState(false);
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
    requestAutoLabel(workspace._id, currCollectionId)
      .then(() => {
        dispatch(fetchWorkspace());
      })
      .catch(err => { 
        console.log(err);
      });
  }

  return (
    <>
      <ImageSetSelectionModal imgSets={imgSets} openModal={openModal} setOpenModal={setOpenModal} />
      <Paper sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        padding: "25px 0 25px 0",
      }}>
        {/* Left Button */}
        <Button
          variant="contained"
          disabled={loadSets}
          onClick={() => setOpenModal(true)}
          size="medium"
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
                  <Search sx={{color: "#505050"}} />
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
            sx={{ marginLeft: "2px" }}
            onClick={() => dispatch(setFilter(searchTerm))}
          >
            Search
          </Button>
        </Box>
        {/* Right Button */}
        <Button variant="contained" size="medium" onClick={() => handleAutoLabel()}>
          Auto Label
        </Button>
      </Paper>
    </>
  )
}

const ImageSetSelectionModal = ({imgSets, openModal, setOpenModal}) => { 
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