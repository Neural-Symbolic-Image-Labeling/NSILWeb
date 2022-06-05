import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ImageGallery } from "./ImageGallery";
import { AnnotationTool } from "./AnnotationTool";

export const HomePage = () => {
  return (
    <div>
      <div className="app-bar">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5">
              NSIL
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      {/* <ImageGallery /> */}
      <AnnotationTool />
    </div>
  )
}