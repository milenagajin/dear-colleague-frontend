import decode from "jwt-decode";
import config from "../config";
import ApiService from "./ApiService";

class AuthService extends ApiService {


  login = async (email, password) => {
    const response = await this.apiClient.post(config.API_LOGIN_URL, {
      email,
      password
    });
    let { token, user } = response.data;
    user.token = token;
    await this.setUser(user);
    return user;
  };

  register = async (name, email, password) => {
    const response = await this.apiClient.post(config.API_REGISTER_URL, {
      name,
      email,
      password
    });

    const { user, token } = response.data;
    user.token = token;
    this.setUser(user);
  };

  loginMagicLink = (email, campaignId) => {
    return this.apiClient.post(config.API_LOGIN_MAGIC_LINK, {
      email: email,
      campaignId: campaignId
    });
  };

  validateMagicLinkToken = async tokenFromUrl => {
    const headers = {
      Authorization: "Bearer " + tokenFromUrl,
      "Access-Control-Allow-Origin": "*"
    };

    this.api.attachHeaders(headers);
    const res = await this.apiClient.get(config.API_VALIDATE_TOKEN_MAGIC_LINK);
    const {user} = res.data;
    user.token = tokenFromUrl;
    this.setUser(user);
  };

  loggedIn() {
    // Checks if there is a saved user, and if it is, is user's token still valid
      const user = this.getUser();
      if(user) {
      const { token } = user;
      return !!token && !this.isTokenExpired(token);
      }
      return false
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.  
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("user");
  }

}

const authService = new AuthService();
export default authService;
