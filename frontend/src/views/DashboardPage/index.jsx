import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Box, TextField, Button, Alert, IconButton, FormControl, Paper } from "@mui/material";
import { authDashboard, autoAuth, uploadImage } from "../../apis/image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthed } from "../../stores/gallery";
import { UploadFile } from "@mui/icons-material";

const readerProcess = (file) => {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = () => {
      resolve({
        data: fr.result,
        name: file.name,
      });
    }
    fr.onerror = () => {
      reject(fr.error);
    }

    fr.readAsDataURL(file);
  })
}

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const authed = useSelector(state => state.gallery.authed);
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState([]);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    autoAuth()
      .then(res => {
        dispatch(setAuthed(true));
      }).catch(err => {
        if (!authed) {
          setOpenModal(true);
        }
      })
  }, []);

  /**
   * @param {import("react").ChangeEvent<HTMLInputElement>} e 
   */
  const handleImageRead = async (e) => {
    if (!e.target.files) {
      return;
    }
    setWaiting(true);
    const readers = [];

    for (let i = 0; i < e.target.files.length; i++) {
      readers.push(readerProcess(e.target.files[i]));
    }

    const results = await Promise.all(readers);
    setImages(images.concat(results));
    setWaiting(false);
  }

  const handleImageUpload = async () => { 
    if(images.length <= 0) {
      return;
    }
    setWaiting(true);
    for (let i = 0; i < images.length; i++) { 
      await uploadImage(images[i].name, images[i].data);
    }
    setImages([]);
    setWaiting(false);
  }

  return (
    <Box>
      <AuthModal openModal={openModal} setOpenModal={setOpenModal} />
      {!authed ? <div>You are not allowed to see this page.</div> : (
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}>
          <Paper sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: "50%",
          }}>
            <Button component="label" startIcon={<UploadFile />} disabled={waiting}>
              Upload Images
              <input
                accept="image/*"
                type="file"
                multiple
                id="upload-image-button"
                hidden
                onChange={e => handleImageRead(e)}
              />
            </Button>
            <Button
              variant="contained"
              onClick={async () => await handleImageUpload()}
              sx={{ mt: "5%" }}
              disabled={waiting}
            >
              {`Upload(${images.length} images)`}
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  )
}

const AuthModal = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 10000);
    }
  }, [showError]);

  const handleSubmit = () => {
    authDashboard(token)
      .then(res => {
        dispatch(setAuthed(true));
        setOpenModal(false);
      })
      .catch(err => {
        setShowError(true);
      });
  }

  return (
    <Dialog open={openModal}>
      <DialogTitle>Authentication Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You must be admin to view this page.
        </DialogContentText>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          m: "5%"
        }}>
          {showError && (
            <Alert severity="error" sx={{
              width: "80%",
              m: "1%"
            }}>
              Invalid token.
            </Alert>
          )}
          <Box component="form" sx={{
            m: "10px"
          }}>
            <TextField size="small" type="password" required label="Token" defaultValue="" onChange={e => setToken(e.target.value)} />
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Button color="info" onClick={() => navigate("/")}>Go back</Button>
            <Button variant="outlined" onClick={() => handleSubmit()}>Confirm</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}