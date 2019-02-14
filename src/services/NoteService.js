import ApiService from "./ApiService";
import config from "../config";
import authService from "./AuthService";

class NoteService extends ApiService {
  constructor(){
    super();
    const token = authService.getUser().token;
    const headers = {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    };
    this.api.attachHeaders(headers);
  }

  notesUserSent = async (campaignId, userId) => {
    const response = this.apiClient.get(`campaign/${campaignId}/sent-notes/user/${userId}`);
    return response;
  };

  saveOne = note => {
    const response = this.apiClient.post(config.API_NOTE, note);
    return response;
  };
}

const noteService = new NoteService();
export default noteService;
