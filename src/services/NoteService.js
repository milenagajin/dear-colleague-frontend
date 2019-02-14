import ApiService from "./ApiService";
import config from "../config";

class NoteService extends ApiService {

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
