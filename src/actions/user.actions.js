import userConstants from '../constants/user.constants';
import userService from '../services/user.service';
import alertActions from './alert.actions';
import history from '../helpers/history';

let loginAtmptCount = 1;
function login(username, password) {
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error, loginAttemptCount) { return { type: userConstants.LOGIN_FAILURE, error, loginAttemptCount }; }

    return (dispatch) => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                (user) => {
                    dispatch(success(user));
                    loginAtmptCount = 0;
                    history.push('/dashboard');
                },
                (error) => {
                    dispatch(failure(error.toString(), loginAtmptCount));
                    loginAtmptCount += 1;
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };
}

function resetPassword(username) {
    function request(user) { return { type: userConstants.RESET_PASSWORD_REQUEST, user }; }
    function success(user) { return { type: userConstants.RESET_PASSWORD_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request({ username }));
        userService.resetPassword(username)
            .then(
                (user) => {
                    dispatch(success(user));
                    // history.push('/');
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function resetNewPassword(newPasswordData) {
    function request(user) { return { type: userConstants.RESET_NEW_PASSWORD_REQUEST, user }; }
    function success(user) { return { type: userConstants.RESET_NEW_PASSWORD_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.RESET_NEW_PASSWORD_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request({ newPasswordData }));
        userService.resetNewPassword(newPasswordData)
            .then(
                (user) => {
                    dispatch(success(user));
                    history.push('/');
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };
}


const userActions = {
    login,
    logout,
    resetPassword,
    resetNewPassword,
};

export default userActions;
