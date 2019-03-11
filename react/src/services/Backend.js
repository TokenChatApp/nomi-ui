import axios from "axios";
import Cookies from "js-cookie";
import AuthenticationService from "./AuthenticationService";

export const Backend = {
  // apiURL: "http://nomi-backend.tokenchatserver.com/api/v1/",
  apiUrl: "http://192.168.131.2:8000/api/v1/",
  // apiUrl: "http://api.nomi.gm.design/api/v0/",
  //apiUrl: "http://playground.nomi.com/api/v0/",
  authUrl: "auth/",
  profileUrl: "profile/info",
  user: {},
  cities: [],
  places: [],
  bootstrap: async function() {
    console.log("Nomi user bootstrap");
    let token = await axios.get(this.apiUrl + this.authUrl + "csrf-token", "", {
      withCredentials: true
    });
    Cookies.set("X-CSRF-Token", token.data, { expires: 7 });
    if (this.isAuthenticated()) {
      let profile = AuthenticationService.profile().then(res => {
        this.setProfile(res);
      });
      await profile;
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
    return this.user.gender === "Women";
  },
  isMen: function() {
    return this.user.gender === "Men";
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
