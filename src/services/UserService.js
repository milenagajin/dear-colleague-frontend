import config from "../config";
import authService from "./AuthService";
import ApiService from "./ApiService";

class UserService extends ApiService {

  constructor(){
    super();
    const token = authService.getUser().token;
    const headers = {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    };
    this.api.attachHeaders(headers);
  }

  getAll = companyId => {
    return this.apiClient.get(`${config.API_CAMPAIGNS}/${companyId}/users`);
  };

  getOne = userId => {
    return this.apiClient.get(`${config.API_USERS}/${userId}`);
  };

  saveOne = user => {
    if (user.id) {
      return this.apiClient.put(`${config.API_USERS}/edit/${user.id}`, user);
    }

    return this.apiClient.post(`${config.API_USERS}`, user);
  };

  delete = id => {
    return this.apiClient.delete(`${config.API_USERS}/${id}`);
  };
}

export default new UserService();
