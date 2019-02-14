import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import usersReducer from './UsersReducer';

const dearColleague = combineReducers({
   user: userReducer,
   users: usersReducer
});

export default dearColleague;
