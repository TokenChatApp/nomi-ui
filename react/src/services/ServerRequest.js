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
  },
  getOwnProfile: function() {
    return instance.get(Backend.apiUrl + Backend.profileUrl).then(
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
  getAvatar: function(value) {
    return axios
      .post(Backend.apiUrl + "profile/fetch_avatar", qs.stringify(value))
      .then(
        res => {
          return res.data;
        },
        res => {
          return res.response.data;
        }
      );
  },
  uploadAvatar: function(value) {
    return instance({
      method: "post",
      url: Backend.apiUrl + "profile/upload_avatar",
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
        return res.response.data;
      }
    );
  },
  removeAvatar: function() {
    return instance.get(Backend.apiUrl + "profile/remove_avatar").then(
      res => {
        return res.data;
      },
      res => {
        return res.response;
      }
    );
  },
  uploadPhotos: function(value) {
    return instance({
      method: "post",
      url: Backend.apiUrl + "profile/upload_photo",
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
        return res.response.data;
      }
    );
  },
  updateLocation: function(value) {
    return instance
      .post(Backend.apiUrl + "profile/update", qs.stringify(value))
      .then(
        res => {
          return res.data;
        },
        res => {
          return res.response.data;
        }
      );
  },
  getListing: function(value) {
    return axios
      .post(Backend.apiUrl + "profile/search", qs.stringify(value))
      .then(
        res => {
          return res.data;
        },
        res => {
          return res.response.data;
        }
      );
  },
  postBooking: function(value) {
    return instance.put(Backend.apiUrl + "booking", qs.stringify(value)).then(
      res => {
        return res.data;
      },
      res => {
        return res.response.data;
      }
    );
  },
  getOwnBookings: function() {
    return instance.get(Backend.apiUrl + "booking/retrieve").then(
      res => {
        Backend.bookings = res;
        return res.data;
      },
      res => {
        return res.response.data;
      }
    );
  },
  getBookingWithId: function(value) {
    return instance.get(Backend.apiUrl + "booking/" + value).then(
      res => {
        return res.data;
      },
      res => {
        return res.response.data;
      }
    );
  },
  acceptBooking: function(value) {
    return instance
      .post(Backend.apiUrl + "booking/accept", qs.stringify(value))
      .then(
        res => {
          return res.data;
        },
        res => {
          return res.response.data;
        }
      );
  },
  confirmBooking: function(value) {
    return instance
      .post(Backend.apiUrl + "booking/confirm", qs.stringify(value))
      .then(
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
