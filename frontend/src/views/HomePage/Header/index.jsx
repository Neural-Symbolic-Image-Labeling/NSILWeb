import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SmartToy } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../apis/workspace";
import { setLoading, setWorkspace } from "../../../stores/gallery";
import { useState } from "react";

const navigations = [
  { title: "Tutorial", link: "/tutorial" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

export const HomePageHeader = () => {
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <LoadWorkspace workspaceName={workspaceName} setLoading={setLoading} openModal={openModal} setOpenModal={setOpenModal} setWorkspaceName={setWorkspaceName} />
      <Box>
        <AppBar position="static" sx={{ bgcolor: "rgba(0, 0, 0, 0.8)" }}>
          <Toolbar>
            <SmartToy />
            <Box sx={{ flexBasis: "50%", display: "flex", alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{ marginLeft: "10px" }}
              >
                Neural-Symbolic Image Labeling
              </Typography>
              {/* <Box sx={{ml: '10px', display: 'flex', alignItems: 'center'}}>
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={e => setWorkspaceName(e.target.value)}
                  sx={{backgroundColor: 'white'}}
                />
                <Button sx={{color: 'white'}} onClick={() => loadWorkspace() }>Load Workspace</Button>
              </Box> */}
            </Box>
            <Box sx={{ flexBasis: "50%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#6E6E6E",
                  mr: "10px"
                }}
                onClick={() => setOpenModal(true)}
              >
                Login
              </Button>
              {navigations.map((link, index) => (
                <Button
                  key={index}
                  onClick={() => navigate(link.link)}
                  variant="text"
                  sx={{ color: "white" }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

const LoadWorkspace = ({ openModal, setOpenModal, setLoading, setWorkspaceName, workspaceName }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.gallery.loading);
  const loadWorkspace = async () => {
    dispatch(setLoading(true));
    const ws = await login(workspaceName);
    dispatch(setWorkspace(ws));
    dispatch(setLoading(false));
    setOpenModal(false);
  }

  return (
    <div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Load Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter workspace name to load your workspace. You can also create a new workspace by providing a custom name.
          </DialogContentText>
        </DialogContent>
        <Box sx={{padding: '24px'}}>
          <TextField
            autoFocus
            margin="dense"
            label="Workspace Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setWorkspaceName(e.target.value)}
          />
        </Box>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button disabled={isLoading} onClick={() => loadWorkspace()}>Load</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}