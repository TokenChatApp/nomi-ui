import axios from 'axios';
import Cookies from 'js-cookie';
import AuthenticationService from './AuthenticationService';

export const Backend = {
    apiUrl: "http://playground.nomi.com/api/v0/",
    authUrl: "auth/",
    profileUrl: "profile/",
    user: {},
    bootstrap: async function(){
        console.log("Nomi user bootstrap");
        let token = await axios.get(this.apiUrl + this.authUrl + 'csrf-token', '', {
            withCredentials: true,
        });
        Cookies.set("X-CSRF-Token", token.data, { expires: 7 });
        if (this.isAuthenticated()){
            let profile = AuthenticationService.profile().then(res => {
               this.setProfile(res);
            });
            await profile;
        }
        return token;
    },
    isAuthenticated: function(){
        if (Cookies.get('nomi-token') != null) {
            return true;
        }else{
            return false;
        }
    },
    isWomen: function(){
        return this.user.Gender === "Women";
    },
    isMen: function(){
        return this.user.Gender === "Men";
    },
    setProfile(user) {
        this.user = user;
        console.log(this.user);
    },
    signOut(user) {
        AuthenticationService.logout().then( res => {
            this.user = {};
        });
    }
};
