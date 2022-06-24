import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Box, TextField, Button, Alert, IconButton, FormControl, Paper, Typography, DialogActions } from "@mui/material";
import { authDashboard, autoAuth, deleteAllImages, uploadImage } from "../../apis/image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthed } from "../../stores/gallery";
import { UploadFile } from "@mui/icons-material";
import { Intermediate } from "../../components/Intermediate";

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
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openNotifyModal, setOpenNotifyModal] = useState(false);
  const [notifyData, setNotifyData] = useState({
    variant: "primary",
    title: "",
    content: "",
  });
  const [images, setImages] = useState([]);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    autoAuth()
      .then(res => {
        dispatch(setAuthed(true));
      }).catch(err => {
        if (!authed) {
          setOpenAuthModal(true);
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

    setNotifyData({
      variant: "success",
      title: "Images added",
      content: "Images added successfully, you can upload by clicking the upload button.",
    });
    setOpenNotifyModal(true);
  }

  const handleImageUpload = async () => {
    if (images.length <= 0) {
      return;
    }
    setWaiting(true);
    for (let i = 0; i < images.length; i++) {
      await uploadImage(images[i].name, images[i].data);
    }
    setImages([]);
    setWaiting(false);

    setNotifyData({
      variant: "success",
      title: "Images uploaded",
      content: "Images uploaded successfully.",
    });
    setOpenNotifyModal(true);
  }

  return (
    <Paper sx={{}}>
      <AuthModal openModal={openAuthModal} setOpenModal={setOpenAuthModal} />
      <NotifyModal openModal={openNotifyModal} setOpenModal={setOpenNotifyModal} data={notifyData} />
      {!authed ? <Intermediate>You are not allowed to see this page.</Intermediate> : (
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
            width: "760px",
            height: "300px",
          }}>
            <Button component="label" startIcon={<UploadFile />} disabled={waiting}>
              Add Images
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
              {`Upload (${images.length} images)`}
            </Button>
          </Paper>
          <Paper sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "760px",
            height: "300px",
            mt: '15px'
          }}>
            <KeyValueRow keyName="Delete All Images">
              <Button
                variant="contained"
                onClick={() => {
                  deleteAllImages().then(() => {
                    setNotifyData({
                      variant: "success",
                      title: "Images deleted",
                      content: "Images deleted successfully.",
                    });
                    setOpenNotifyModal(true);
                  })
                }}
              >
                Delete
              </Button>
            </KeyValueRow>
          </Paper>
        </Box>
      )}
    </Paper>
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => navigate("/")}>Go back</Button>
        <Button variant="contained" onClick={() => handleSubmit()}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}

/** @param {{data: {variant: "primary" | "error" | "success"; title: string; content: string;}; [x: string]: any}} param0 */
const NotifyModal = ({ openModal, setOpenModal, data }) => {
  const colorPicker = {
    primary: "",
    error: "rgb(255, 51, 0, 0.8)",
    success: "rgb(0, 153, 51, 0.8)",
  }

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle sx={{ color: colorPicker[data.variant] }}>{data.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {data.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

const KeyValueRow = ({ keyName, children }) => {
  return (
    <Paper sx={{
      display: "flex",
      flexDirection: "row",
      width: '100%',
      p: "2% 0",
      mb: '15px'
    }}>
      <Box sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        pl: '15px'
      }}>
        <Typography variant="h7" sx={{ color: 'black' }}>{keyName}</Typography>
      </Box>
      <Box sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        pr: '15px'
      }}>
        {children}
      </Box>
    </Paper>
  )
}