const { get, post } = require("./axios")

const autoAuth = () => { 
  return get("/img/auto");
}

const authDashboard = (token) => {
  return post("/img/auth", { token: token });
}

const uploadImage = (name, imageData) => { 
  return post("/img", { name: name, data: imageData });
}

module.exports = {
  authDashboard,
  autoAuth,
  uploadImage
}