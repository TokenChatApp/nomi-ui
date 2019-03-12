import axios from "axios";
import Cookies from "js-cookie";
import { Backend } from "./Backend";

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
