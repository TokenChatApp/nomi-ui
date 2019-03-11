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

const ServerRequest = {
  getCities: function() {
    return axios.get(Backend.apiUrl + "cities").then(
      res => {
        return res.data;
      },
      res => {
        return res.response.data;
      }
    );
  },
  getPlaces: function(value) {
    return axios.get(Backend.apiUrl + "places/" + value).then(
      res => {
        return res.data;
      },
      res => {
        return res.response.data;
      }
    );
  }
};

export default ServerRequest;
