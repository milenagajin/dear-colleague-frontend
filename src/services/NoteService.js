import ApiService from "./ApiService";
import config from "../config";

class NoteService extends ApiService {
  constructor() {
    super();
  }

  notesUserSent = async (idUser, campaignId) => {
    const response = this.apiClient.get(`sent-notes/${idUser}/${campaignId}`);
    return response;
  };

  saveOne = note => {
    const response = this.apiClient.post(config.API_NOTE, note);
    return response;
  };
}

const noteService = new NoteService();
export default noteService;
