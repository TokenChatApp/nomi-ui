import axios from "axios";
import Cookies from "js-cookie";
import AuthenticationService from "./AuthenticationService";
import ServerRequest from "./ServerRequest";

export const Backend = {
  apiUrl: "https://api.nomitime.com/api/v1/",
  imgUrl: "https://api.nomitime.com/storage/",
  profileUrl: "profile/info",
  user: {},
  selectedCity: "",
  selectedPlace: "",
  selectedPlaceId: 0,
  selectedListing: 0,
  selectedBooking: 0,
  cameFromPendingPage: false,
  selectedDate: Date(),
  firstTimeLoginUsername: "",
  firstTimeLoginPassword: "",
  listings: [],
  isShowingNearbyGirls: false,
  bookings: [],
  successfulBooking: {},
  editProfile: {},
  whichImageUploading: 0,
  photoPositionsToDelete: [],
  bootstrap: async function() {
    let token = await axios.get(this.apiUrl + "auth/csrf-token", "", {
      withCredentials: true
    });
    Cookies.set("X-CSRF-Token", token.data, { expires: 7 });
    if (this.isAuthenticated()) {
      let profile = ServerRequest.getOwnProfile().then(res => {
        this.setProfile(res);
      });
      let bookings = ServerRequest.getOwnBookings();
      await profile;
      await bookings;
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
