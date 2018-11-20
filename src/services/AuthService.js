import decode from "jwt-decode";
export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || "http://localhost:8000/api"; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff 1
    this.getProfile = this.getProfile.bind(this);
  }

  login(email, password) {
    // Get a token from api server using the fetch api
    console.log("login");
    return this.fetch(`${this.domain}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      console.log(res.token);
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  register(name, email, password) {
    return this.fetch(`${this.domain}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      })
    }).then(res => {
      console.log(res);
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
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

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
