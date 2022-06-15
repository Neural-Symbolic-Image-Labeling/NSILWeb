import { AppBar, Button, List, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SmartToy } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const navigations = [
  { title: "Tutorial", link: "/tutorial" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

export const HomePageHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <SmartToy />
            <Box sx={{flexBasis: "50%"}}>
              <Typography
                variant="h6"
                sx={{ marginLeft: "10px" }}
              >
                NSIL
              </Typography>
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