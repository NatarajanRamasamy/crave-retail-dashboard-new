import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-cycle
import authentication from './authentication.reducer';
import users from './users.reducer';
import alert from './alert.reducer';
import userManage from './user.manage.reducer';
import feedback from './feedback.reducer';

const rootReducer = combineReducers({
    authentication,
    users,
    alert,
    userManage,
    feedback,
});

export default rootReducer;
