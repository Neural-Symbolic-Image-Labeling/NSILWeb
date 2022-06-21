import { AppBar, Button, List, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SmartToy } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  const loadWorkspace = async () => {
    dispatch(setLoading(true));
    const ws = await login(workspaceName);
    dispatch(setWorkspace(ws));
    dispatch(setLoading(false));
  }

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <SmartToy />
            <Box sx={{ flexBasis: "50%", display: "flex", alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{ marginLeft: "10px" }}
              >
                NSIL
              </Typography>
              <Box sx={{ml: '10px', display: 'flex', alignItems: 'center'}}>
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={e => setWorkspaceName(e.target.value)}
                  sx={{backgroundColor: 'white'}}
                />
                <Button sx={{color: 'white'}} onClick={() => loadWorkspace() }>Load Workspace</Button>
              </Box>
            </Box>
            <Box sx={{ flexBasis: "50%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
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