import { SET_USERS } from "./ActionTypes";
import { ADD_USER } from "./ActionTypes";
import { DELETE_USER } from "./ActionTypes";

export const setUsers = payload => {
    return {
      type: SET_USERS,
      payload
    };
  };

  export const addUser = payload => {
    return {
      type: ADD_USER,
      payload
    };
  };

  export const deleteUser = payload => {
    return {
      type: DELETE_USER,
      payload
    };
  };
  