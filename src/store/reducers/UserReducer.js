import { SET_ACTIVE_USER } from '../actions/ActionTypes';



function userReducer (state = {}, action) {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return {
        user: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;