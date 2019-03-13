import axios from "axios";
import Cookies from "js-cookie";
import AuthenticationService from "./AuthenticationService";
import ServerRequest from "./ServerRequest";

export const Backend = {
  apiUrl: "http://nomi-backend.tokenchatserver.com:8000/api/v1/",
  // apiUrl: "http://192.168.131.2:8000/api/v1/",
  profileUrl: "profile/info",
  user: {},
  selectedCity: "",
  selectedPlace: "",
  firstTimeLoginUsername: "",
  firstTimeLoginPassword: "",
  avatar: null,
  bootstrap: async function() {
    let token = await axios.get(this.apiUrl + "auth/csrf-token", "", {
      withCredentials: true
    });
    Cookies.set("X-CSRF-Token", token.data, { expires: 7 });
    if (this.isAuthenticated()) {
      let profile = ServerRequest.getOwnProfile().then(res => {
        this.setProfile(res);
      });
      await profile;
      ServerRequest.getOwnAvatar();
    }
    return token;
  },
  isAuthenticated: function() {
    if (Cookies.get("nomi-token") != null) {
      return true;
    } else {
      return false;
    }
  },
  isWomen: function() {
    return this.user.gender === "F";
  },
  isMen: function() {
    return this.user.gender === "M";
  },
  setProfile(user) {
    this.user = user;
    console.log(this.user);
  },
  signOut(user) {
    AuthenticationService.logout().then(res => {
      this.user = {};
    });
  }
};
