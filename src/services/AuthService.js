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
    this.setUser(user);
    this.setAuthorizationHeader(token);
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
    this.setAuthorizationHeader(token);
  };

  loginMagicLink = (email, campaignId) => {
      this.apiClient.post(config.API_LOGIN_MAGIC_LINK, {
        email: email,
        campaignId: campaignId
    });
  };
    setAuthorizationHeader(token){
      if(token){
         this.api.setAuthorizationHeader(token);
      }
  }

  validateMagicLinkToken = async () => {
    const res = await this.apiClient.get(config.API_VALIDATE_TOKEN_MAGIC_LINK);
    const { user, token } = res.data;
    user.token = token;
    this.setUser(user);
    this.setAuthorizationHeader(token);
  };

    loggedIn() {
    // Checks if there is a saved user, and if it is, is user's token still valid
      const user = this.getUser();
      if(user) {
        const { token } = user;
        return !!token && !this.isTokenExpired(token);
      }
      return false;
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
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('user');
    return  JSON.parse(user);
  
  }

  async logout() {
    // Clear user token and profile data from localStorage
   localStorage.removeItem('user');
  }

}

const authService = new AuthService();
export default authService;
