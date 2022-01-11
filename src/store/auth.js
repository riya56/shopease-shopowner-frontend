import { observable } from "mobx";
import axios from "axios";

class AuthStore {
   @observable userInfo = {};

  constructor() {
    let userInfoLS = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfoLS) {
      this.isLoggedIn = true;
      this.userInfo = userInfoLS;
        this.setCommonHeaders();
    }
  }

  setUserInfo = (userInfo) => {
    this.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    //  this.setCommonHeaders();
  };
  setOwnerInfo = (ownerInfo) => {
    // this.userInfo = userInfo;
    localStorage.setItem("ownerInfo", JSON.stringify(ownerInfo));
    //  this.setCommonHeaders();
  };

  removeUserInfo = () => {
    this.userInfo = {};
    localStorage.removeItem("userInfo");
  };
  setCommonHeaders = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).accessToken
    }`;
  };
}

export default AuthStore;
