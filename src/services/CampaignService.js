import axios from "axios";

const ENDPOINTS = {
  BASE_URL: "http://localhost:8000",
  CAMPAIGNS: "/api/campaigns"
};

class CampaignService {
  getOne = id => {
    return axios.get(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CAMPAIGNS}/${id}`);
  };

  getAll = () => {
    return axios.get(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CAMPAIGNS}`);
  };

  saveOne = campaign => {
    if (campaign.id) {
      return axios.put(
        `${ENDPOINTS.BASE_URL}${ENDPOINTS.CAMPAIGNS}/edit/${campaign.id}`,
        campaign
      );
    }

    return axios.post(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CAMPAIGNS}`, campaign);
  };

  delete = id => {
    return axios.delete(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CAMPAIGNS}/${id}`);
  };
}

export default new CampaignService();
