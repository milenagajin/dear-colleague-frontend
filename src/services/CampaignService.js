import axios from "axios";
import ApiService from "./ApiService";
import config from "../config";
import authService from "./AuthService";

class CampaignService extends ApiService {

  constructor(){
    super();
    const token = authService.getUser().token;
    const headers = {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    };
    this.api.attachHeaders(headers);
  }

  getOne = id => {
    return this.apiClient.get(`${config.API_CAMPAIGNS}/${id}`);
  };

  getAll = () => {
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
