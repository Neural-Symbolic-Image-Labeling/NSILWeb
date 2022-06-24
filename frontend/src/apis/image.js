import {get, post, deleteMethod, put} from "./axios";

export const autoAuth = () => { 
  return get("/img/auto");
}
export const authDashboard = (token) => {
  return post("/img/auth", { token: token });
}
export const createImageSet = (name) => { 
  return post("/img/set", { name: name });
}
export const getAllSetNames = () => { 
  return get("/img/setNames");
}
export const uploadImage = (name, imageData, imgSetName) => { 
  return post("/img", { name: name, data: imageData, imageSetName: imgSetName });
}
export const deleteAllImages = () => { 
  return deleteMethod("/img/all");
}