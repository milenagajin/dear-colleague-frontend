import config from "../config";
import ApiService from "./ApiService";
import authService from "./AuthService";

class UserService extends ApiService {
  constructor(){
    super();
    this.init();
  }

  init(){
    const user = authService.getUser();
    if(user)
      this.api.setAuthorizationHeader(user.token)
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
