import history from '../helpers/history';

function handleResponse(response) {
    if (response.headers && response.headers.get('Authorization')) {
        localStorage.setItem('token', response.headers.get('Authorization'));
    }
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // eslint-disable-next-line no-use-before-define
                logout();
                // location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function logout() {
    if (localStorage.getItem('user')) {
        const userData = localStorage.getItem('user');
        const userId = JSON.parse(userData).id;

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        return fetch(`logout/${userId}`, requestOptions)
            .then(handleResponse)
            .then((user) => {
                // remove user from local storage to log user out
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                history.push('/login');
                return user;
            });
    }
    return null;
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
    };

    return fetch('login/', requestOptions)
        .then(handleResponse)
        .then((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            return user;
        });
}

function resetPassword(username) {
    const requestOptions = {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username }),
    };

    return fetch('/user/changePassword', requestOptions)
        .then(handleResponse)
        .then(user => user);
}

function resetNewPassword(NewPassword) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: NewPassword.token.key,
            newPassword: NewPassword.newPassword,
        }),
    };

    // return fetch('/passwordReset', requestOptions)
    return fetch('/user/resetPassword', requestOptions)
        .then(handleResponse)
        .then((user) => {
            console.log('user -->',user);
            return user;
        });
}

const userService = {
    login,
    logout,
    resetPassword,
    resetNewPassword,
};

export default userService;
