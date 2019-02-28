import axios from "axios";

class HttpService {
  
  constructor(options = {}) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(
      response => {
        console.log(`response ${response}`);
        return response;
      },
      error => {
        console.log(`error ${error}`);
        return Promise.reject(error);
      }
    );
  }

  setAuthorizationHeader(token) {
    this.client.defaults.headers.common['Authorization'] =  "Bearer " + token;
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key]);
  }
}

const API_BASE_URL = `http://localhost:8000/api`;

const options = {
  baseURL: API_BASE_URL,
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*"
};

const httpService = new HttpService(options);

export default httpService;
