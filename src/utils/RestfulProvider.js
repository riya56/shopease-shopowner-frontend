import axios from "axios";
import { endpoint } from "./../config/devConfig";

class RestfulProvider {
  constructor() {
    if (localStorage.getItem("userInfo")) {
      this.setCommonHeaders();
    }
  }

  setCommonHeaders = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).token
    }`;
    // axios.defaults.headers.common['Authorization'] = `Bearer 1234567890puiitury`;
  };

  get = (url, headers) => {
    //this.setCommonHeaders();
    // if (localStorage.getItem("userInfo")) {
    //   this.setCommonHeaders();
    // }
    return new Promise((resolve, reject) => {
      axios
        .get(`${endpoint}/${url}`, headers)
        .then((res) => resolve(res.data))
        .catch((error) => {
          reject(error);
        });
    });
  };

  post = (url, data) => {
    //this.setCommonHeaders();
    // if (localStorage.getItem("userInfo")) {
    //   this.setCommonHeaders();
    // }
    return new Promise((resolve, reject) => {
      axios
        .post(`${endpoint}/${url}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          //alert(error.response.data.error);
          reject(error);
        });
    });
  };
  put = (url, data) => {
    // this.setCommonHeaders();
    return new Promise((resolve, reject) => {
      axios
        .put(`${endpoint}/${url}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  delete = (url) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${endpoint}/${url}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  patch = (url, data) => {
    // this.setCommonHeaders();
    return new Promise((resolve, reject) => {
      axios
        .patch(`${endpoint}/${url}`, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default new RestfulProvider();
