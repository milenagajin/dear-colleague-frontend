import axios from "axios";

// import * as Sentry from "@sentry/browser";

// Sentry.init({
//   //  dsn: "https://<key>@sentry.io/<project>"
//   // });

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

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key]);
  }
}

const API_BASE_URL = `http://localhost:8000/api`;

const options = {
  baseURL: API_BASE_URL,
  Accept: "application/json"
};

const httpService = new HttpService(options);

export default httpService;
