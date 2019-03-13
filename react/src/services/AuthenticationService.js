import axios from "axios";
import Cookies from "js-cookie";
import { Backend } from "./Backend";
import qs from "qs";

const instance = axios.create();
instance.interceptors.request.use(
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
    return instance
      .post(Backend.apiUrl + "auth/login", qs.stringify(value))
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
      url: Backend.apiUrl + "auth/sign-up",
      data: value,
      headers: { "Content-Type": "multipart/form-data" }
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
  logout: function() {
    return instance.post(Backend.apiUrl + "auth/logout").then(
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
