import {get, post, deleteMethod, put} from "./axios";

export const autoAuth = () => { 
  return get("/img/auto");
}

export const authDashboard = (token) => {
  return post("/img/auth", { token: token });
}

export const uploadImage = (name, imageData) => { 
  return post("/img", { name: name, data: imageData });
}

export const deleteAllImages = () => { 
  return deleteMethod("/img/all");
}