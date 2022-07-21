import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SmartToy } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, loadWorkspace } from "../../../stores/gallery";
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
        <AppBar position="static" elevation={0}
          sx={{
            color: 'black',
            bgcolor: "rgba(142, 142, 142, 0.32)"
          }}
        >
          <Toolbar>
            <SmartToy />
            <Box sx={{ flexBasis: "50%", display: "flex", alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{ marginLeft: "10px" }}
              >
                Neural-Symbolic Image Labeling
              </Typography>
            </Box>
            <Box sx={{ flexBasis: "50%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "black",
                  mr: "10px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "rgba(142, 142, 142, 1)",
                  },
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
                  sx={{ color: "black" }}
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
  const loadWorkspaceAction = () => {
    new Promise((resolve, reject) => {
      dispatch(loadWorkspace(workspaceName));
      resolve();
    }).then(() => setOpenModal(false));
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
        <Box sx={{ padding: '24px' }}>
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
          <Button disabled={isLoading} onClick={() => loadWorkspaceAction()}>Load</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}