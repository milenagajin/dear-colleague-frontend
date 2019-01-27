import axios from "axios";

const ENDPOINTS = {
  BASE_URL: "http://localhost:8000/api"
};

class UserService {
  getAll = companyId => {
    return axios.get(`${ENDPOINTS.BASE_URL}/campaigns/${companyId}/users`);
  };

  getOne = userId => {
    return axios.get(`${ENDPOINTS.BASE_URL}/users/${userId}`);
  };

  saveOne = user => {
    if (user.id) {
      return axios.put(`${ENDPOINTS.BASE_URL}/users/edit/${user.id}`, user);
    }

    return axios.post(`${ENDPOINTS.BASE_URL}/users`, user);
  };

  delete = id => {
    return axios.delete(`${ENDPOINTS.BASE_URL}/users/${id}`);
  };
}

export default new UserService();
