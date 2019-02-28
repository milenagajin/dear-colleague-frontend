import config from "../config";
import ApiService from "./ApiService";
import authService from "./AuthService";


class CampaignService extends ApiService {
  constructor(){
    super();
    this.init();
  }
  init(){
    const user = authService.getUser();
    if(user)
      this.api.setAuthorizationHeader(user.token)
  }
  
  getOne = id => {
    return this.apiClient.get(`${config.API_CAMPAIGNS}/${id}`);
  };

  getAll(){
    return this.apiClient.get(`${config.API_CAMPAIGNS}`);
  };

  saveOne = campaign => {
    if (campaign.id) {
      return this.apiClient.put(
        `${config.API_CAMPAIGNS}/edit/${campaign.id}`,
        campaign
      );
    }

    return this.apiClient.post(`${config.API_CAMPAIGNS}`, campaign);
  };

  delete = id => {
    return this.apiClient.delete(`${config.API_CAMPAIGNS}/${id}`);
  };
}

export default new CampaignService();
