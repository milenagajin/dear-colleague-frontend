import decode from "jwt-decode";
import config from "../config";
import ApiService from "./ApiService";

class AuthService extends ApiService {
  // Initializing important variables
  constructor() {
    super();
    this.getProfile = this.getProfile.bind(this);
  }

  login = async (email, password) => {
    const response = await this.apiClient.post(config.API_LOGIN_URL, {
      email,
      password
    });
    let { token, user } = response.data;
    user.token = token;
    await this.setUser(user);
    return response;
  };

  register = async (name, email, password) => {
    const response = await this.apiClient.post(config.API_REGISTER_URL, {
      name,
      email,
      password
    });

    const { token } = response.data.token;
    await this.setToken(token);
    return response;
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
    await this.apiClient.get(config.API_VALIDATE_TOKEN_MAGIC_LINK);
    this.setToken(tokenFromUrl);
  };

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const { token } = this.getUser(); // GEtting token from localstorage
    console.log(token);
    return !!token && !this.isTokenExpired(token);
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

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }
}

const authService = new AuthService();
export default authService;
