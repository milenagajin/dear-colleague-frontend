import axios from "axios";

const ENDPOINTS = {
  BASE_URL_CAMPAIGNS: "http://localhost:8000/api/campaigns"
};

class CampaignService {
  getOne = id => {
    return axios.get(`${ENDPOINTS.BASE_URL_CAMPAIGNS}/${id}`);
  };

  getAll = () => {
    return axios.get(`${ENDPOINTS.BASE_URL_CAMPAIGNS}`);
  };

  saveOne = campaign => {
    if (campaign.id) {
      return axios.put(
        `${ENDPOINTS.BASE_URL_CAMPAIGNS}/edit/${campaign.id}`,
        campaign
      );
    }

    return axios.post(`${ENDPOINTS.BASE_URL_CAMPAIGNS}`, campaign);
  };

  delete = id => {
    return axios.delete(`${ENDPOINTS.BASE_URL_CAMPAIGNS}/${id}`);
  };
}

export default new CampaignService();
