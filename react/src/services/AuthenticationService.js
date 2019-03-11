import axios from "axios";
import Cookies from "js-cookie";
import { Backend } from "./Backend";
import qs from "qs";

axios.interceptors.request.use(
  function(config) {
    const token = Cookies.get("X-CSRF-Token");
    config.withCredentials = true;
    if (token != null) {
      config.headers["X-CSRF-Token"] = token;
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const bearerToken = Cookies.get("nomi-token");
    if (bearerToken != null) {
      config.headers["nomi-token"] = bearerToken;
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

const AuthenticationService = {
  login: function(value) {
    return axios
      .post(Backend.apiUrl + Backend.authUrl + "login", qs.stringify(value))
      .then(
        res => {
          if (res.data.status) {
            Cookies.set("nomi-token", res.data.session);
          }
          return res.data;
        },
        res => {
          Cookies.remove("nomi-token");
          return res.response.data;
        }
      );
  },
  signUp: function(value) {
    return axios({
      method: "post",
      url: Backend.apiUrl + Backend.authUrl + "sign-up",
      data: qs.stringify(value),
      config: {
        headers: { "Content-Type": "multipart/form-data" }
      }
    }).then(
      res => {
        if (res.data.status) {
          Cookies.set("nomi-token", res.data.session);
        }
        return res.data;
      },
      res => {
        Cookies.remove("nomi-token");
        return res.response.data;
      }
    );
  },
  profile: function() {
    return axios.get(Backend.apiUrl + Backend.profileUrl).then(
      res => {
        Cookies.set("nomi-profile", JSON.stringify(res.data));
        return res.data;
      },
      res => {
        Cookies.remove("nomi-token");
        return res.response.data;
      }
    );
  },
  logout: function() {
    return axios.post(Backend.apiUrl + Backend.authUrl + "logout").then(
      res => {
        Cookies.remove("nomi-token");
        Cookies.remove("nomi-profile");
        return res.data;
      },
      res => {
        return res.response.data;
      }
    );
  }
};

export default AuthenticationService;
