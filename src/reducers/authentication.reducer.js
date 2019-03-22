import userConstants from '../constants/user.constants';
// eslint-disable-next-line import/no-cycle
import history from '../helpers/history';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    loggedIn: true, loader: true, user,
} : {
    isMaxLoginCountReached: false,
};
// const initialState = {
//     loggedIn: false,
//     loader: false,
// };

function authentication(state = initialState, action) {
    switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user,
            loader: true,
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user.data,
            loader: false,
        };
    case userConstants.LOGIN_FAILURE:
        if (action.loginAttemptCount === 5) {
            return {
                isMaxLoginCountReached: true,
            };
        }
        return {
            loginAttemptCount: action.n,
            isMaxLoginCountReached: false,
        };
    case userConstants.RESET_PASSWORD_REQUEST:
        return {
            user: action.user,
            loading: true,
        };
    case userConstants.RESET_PASSWORD_SUCCESS:
        if (action.user && action.user.data.token) {
            // history.push('/login');
        }
        return {
            data: action.user && action.user.data,
            loading: false,
        };
    case userConstants.RESET_PASSWORD_FAILURE:
        return {
            loading: false,
        };
    case userConstants.RESET_NEW_PASSWORD_REQUEST:
        return {
            user: action.user,
        };
    case userConstants.RESET_NEW_PASSWORD_SUCCESS:
        if (action.user && action.user.data === 'Password updated successfully.') {
            history.push('/login');
            return {};
        }
        return {
            data: action.user && action.user.data,
            message: 'Password updation failed!!.',
        };
    case userConstants.RESET_NEW_PASSWORD_FAILURE:
        return {
            data: action.user && action.user.data,
            message: 'Password updation failed!!.',
        };
    case userConstants.LOGOUT:
        return {};
    default:
        return state;
    }
}

export default authentication;
