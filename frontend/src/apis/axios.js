import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8888/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 120000,
  withCredentials: true
});

const axiosConfig = {
  withCredentials: true
};

export function get(url, params = {}, config = {}) {
  config = ({ ...config, params: params });
  return new Promise((resolve, reject) => {
    instance.get(url, {params: params}, Object.assign(axiosConfig, config))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function post(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, Object.assign(axiosConfig, config))
      .then((response) => {
        resolve(response.data);
      },
        (err) => {
          reject(err);
        }
      );
  });
}

export function put(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    instance.put(url, data, Object.assign(axiosConfig, config))
      .then((response) => {
        resolve(response.data);
      },
        (err) => {
          reject(err);
        }
      );
  });
}

export function deleteMethod(url, param = {}, config = {}) {
  return new Promise((resolve, reject) => {
    instance.delete(url, param, Object.assign(axiosConfig, config))
      .then((response) => {
        resolve(response.data);
      },
        (err) => {
          reject(err);
        }
      );
  });
}

export function patch(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    instance.patch(url, data, Object.assign(axiosConfig, config))
      .then((response) => {
        resolve(response.data);
      },
        (err) => {
          reject(err);
        }
      );
  });
}