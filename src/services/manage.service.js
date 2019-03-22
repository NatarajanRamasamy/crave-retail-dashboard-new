import authHeader from '../helpers/auth-header';


function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // if (response.status === 401) {
            //   // location.reload(true);
            //   const error = (data && data.message) || response.statusText;
            //   // return Promise.reject(error);
            //   // return error
            //   return Promise.reject(error);
            // }
            if (response.status === 500) {
                // location.reload(true);
            }
            if (response.status === 422) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(data.metadata);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function addUser(userData) {
    const authData = authHeader();
    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
        body: JSON.stringify({
            id: userData.id,
            customerId: userData.customerId,
            firstName: userData.firstName,
            phoneNumber: userData.phoneNumber,
            lastName: userData.lastName,
            storeId: userData.storeId,
            active: userData.active,
            email: userData.email,
            password: userData.password,
            gender: userData.gender,
            pin: userData.pin,
            role: userData.role,
            allowedStores: userData.allowedStores,
        }),
    };
    return fetch('/user', requestOptions)
        .then(handleResponse)
        .then(user => user);
}

function editUser(userData) {
    const authData = authHeader();
    const requestOptions = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },

        body: JSON.stringify({
            id: userData.id,
            firstName: userData.firstName,
            phoneNumber: userData.phoneNumber,
            lastName: userData.lastName,
            storeId: userData.storeId,
            active: userData.active,
            email: userData.email,
            gender: userData.gender,
            pin: userData.pin,
            role: userData.role,
            allowedStores: userData.allowedStores,
        }),
    };

    return fetch('/user', requestOptions)
        .then(handleResponse)
        .then(user => user);
}

function deleteUser(id) {
    const authData = authHeader();
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
        // body: JSON.stringify({ "id":id })
    };

    return fetch(`/user/${id}`, requestOptions)
        .then(handleResponse)
        .then(user => user);
}

function getAllUserDetails() {
    const authData = authHeader();
    const requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
    };

    return fetch('/user', requestOptions)
        .then(handleResponse)
        .then(user => user);
}

function getAllStoreList() {
    const authData = authHeader();
    const requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
    };

    return fetch('/getAllStores', requestOptions)
        .then(handleResponse)
        .then(store => store);
}

function getChangingRoomGroupByStore(storeId) {
    const authData = authHeader();
    const requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
    };

    return fetch(`/changingRoomGroup/store/${storeId}`, requestOptions)
        .then(handleResponse)
        .then(crGroup => crGroup);
}

function getChangingRoomGroup(groupId) {
    const authData = authHeader();
    const requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
    };

    return fetch(`/changingRoom/changingRoomGroup/${groupId}`, requestOptions)
        .then(handleResponse)
        .then(changingRoomGroup => changingRoomGroup);
}

function makeVacant(roomId) {
    const authData = authHeader();
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
    };

    return fetch(`/changingRoom/${roomId}/shopper`, requestOptions)
        .then(handleResponse)
        .then(changingRoomGroup => changingRoomGroup);
}

function getItemsRequested(shopperId) {
    const authData = authHeader();
    const requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },
    };

    return fetch(`/request/shopper/${shopperId}`, requestOptions)
        .then(handleResponse)
        .then(requestedItems => requestedItems);
}

function getDailyReport(groupId, createdDate) {
    // const authData = authHeader();
    const requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': authData ? `${authData.Authorization}` : ''
        },
    };

    return fetch(`dailyReport/${groupId}/${createdDate}`, requestOptions)
        .then(handleResponse)
        .then(requestedItems => requestedItems);
}

const manageService = {
    addUser,
    editUser,
    deleteUser,
    getAllUserDetails,
    getChangingRoomGroupByStore,
    getChangingRoomGroup,
    makeVacant,
    getItemsRequested,
    getDailyReport,

    getAllStoreList,
};

export default manageService;
