import { SET_USERS } from '../actions/ActionTypes';
import { ADD_USER } from '../actions/ActionTypes';
import { DELETE_USER } from '../actions/ActionTypes';



function usersReducer (state = [], action) {
    switch (action.type) {
        case SET_USERS:
            return  action.payload;
        case ADD_USER:
            return {users: [...state.users, action.payload]}
        case DELETE_USER:
            const users = state.users.filter(user => user.id !== action.payload);
            return { users: users }
        default:
            return state;
        }
    };



export default usersReducer;
