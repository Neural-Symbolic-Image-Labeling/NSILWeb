const axios = require('axios').default;

const instance = axios.create({
  baseURL: process.env.NSILAI_URL || "http://localhost:7000/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 60000,
});

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, {params: params})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const post = (url, data) => { 
  return new Promise((resolve, reject) => {
    instance.post(url, data)
      .then((response) => {
        resolve(response.data);
      },
        (err) => {
          reject(err);
        }
      );
  });
}

module.exports = {
  get,
  post,
}