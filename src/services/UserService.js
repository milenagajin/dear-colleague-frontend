import axios from "axios";

const ENDPOINTS = {
  BASE_URL: "http://localhost:8000/api"
};

class UserService {
  getAll(company_id) {
    return axios.get(`${ENDPOINTS.BASE_URL}/campaigns/${company_id}/users`);
  }

  getOne = user_id => {
    return axios.get(`${ENDPOINTS.BASE_URL}/users/${user_id}`);
  };

  saveOne = user => {
    if (user.id) {
      return axios.put(`${ENDPOINTS.BASE_URL}/users/${user.id}`, user);
    }

    return axios.post(`${ENDPOINTS.BASE_URL}/users`, user);
  };

  delete = id => {
    return axios.delete(`${ENDPOINTS.BASE_URL}/users/${id}`);
  };
}

export default new UserService();
