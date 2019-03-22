import manageConstants from '../constants/manage.constants';
import manageService from '../services/manage.service';
import alertActions from './alert.actions';

function addUser(userDetails) {
    function request(user) { return { type: manageConstants.ADD_USER_REQUEST, user }; }
    function success(user) { return { type: manageConstants.ADD_USER_SUCCESS, user }; }
    function failure(user) { return { type: manageConstants.ADD_USER_FAILURE, user }; }

    return (dispatch) => {
        dispatch(request(userDetails));
        manageService.addUser(userDetails)
            .then(
                (user) => {
                    if (user.metadata && user.metadata.code === 200) {
                        dispatch(success(user));
                        dispatch(alertActions.success(user));
                    }
                },
                (error) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                },
            );
    };
}

function editUser(userDetails) {
    function request(user) { return { type: manageConstants.EDIT_USER_REQUEST, user }; }
    function success(user) { return { type: manageConstants.EDIT_USER_SUCCESS, user }; }
    function failure(user) { return { type: manageConstants.EDIT_USER_FAILURE, user }; }

    return (dispatch) => {
        dispatch(request(userDetails));
        manageService.editUser(userDetails)
            .then(
                (user) => {
                    console.log('user @action -->', user);
                    if (user.metadata && user.metadata.code === 200) {
                        dispatch(success(user));
                        dispatch(alertActions.success(user));
                    }
                },
                (error) => {
                    console.log('error @action -->', error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                },
            );
    };
}

function deleteUser(userId) {
    function request(user) { return { type: manageConstants.DELETE_USER_REQUEST, user }; }
    function success(id) { return { type: manageConstants.DELETE_USER_SUCCESS, id }; }
    function failure(user) { return { type: manageConstants.DELETE_USER_FAILURE, user }; }

    return (dispatch) => {
        dispatch(request(userId));
        manageService.deleteUser(userId)
            .then(
                (user) => {
                    if (user.metadata && user.metadata.code === 200) {
                        dispatch(success(userId));
                        dispatch(alertActions.success(user));
                    }
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };
}

function getAllUserDetails() {
    // function request(user) { return { type: manageConstants.GET_ALL_USER_DETAILS_REQUEST, user } }
    function success(user) { return { type: manageConstants.GET_ALL_USER_DETAILS_SUCCESS, user }; }
    function failure(user) { return { type: manageConstants.GET_ALL_USER_DETAILS_FAILURE, user }; }

    return (dispatch) => {
        // dispatch(request());
        dispatch(success());
        manageService.getAllUserDetails()
            .then(
                (user) => {
                    if (user.metadata && user.metadata.code === 200) {
                        dispatch(success(user));
                    } else {
                        dispatch(failure(user.toString()));
                        dispatch(alertActions.error(user.toString()));
                    }
                },
            );
    };
}

function getAllStoreList() {
    // function request(store) { return { type: manageConstants.GET_ALL_USER_DETAILS_REQUEST, store } }
    function success(store) { return { type: manageConstants.GET_ALL_STORE_LIST_SUCCESS, store }; }
    function failure(store) { return { type: manageConstants.GET_ALL_STORE_LIST_FAILURE, store }; }

    return (dispatch) => {
        // dispatch(request());
        dispatch(success());
        manageService.getAllStoreList()
            .then(
                (store) => {
                    if (store.metadata.code === 200) {
                        dispatch(success(store));
                    } else {
                        dispatch(failure(store.toString()));
                        dispatch(alertActions.error(store.toString()));
                    }
                },
            );
    };
}

function getChangingRoomGroupByStore(storeId) {
    function success(crGroup) { return { type: manageConstants.GET_CHANGING_ROOM_BY_STORE_SUCCESS, crGroup }; }
    function failure(crGroup) { return { type: manageConstants.GET_CHANGING_ROOM_BY_STORE_FAILURE, crGroup }; }

    return (dispatch) => {
        // dispatch(success());
        manageService.getChangingRoomGroupByStore(storeId)
            .then(
                (crGroup) => {
                    if (crGroup.metadata.code === 200) {
                        dispatch(success(crGroup));
                    } else {
                        dispatch(failure(crGroup.toString()));
                        dispatch(alertActions.error(crGroup.toString()));
                    }
                },
            );
    };
}

function getChangingRoomGroup(groupId) {
    function success(changingRoomGroup, requestArray) { return { type: manageConstants.GET_CHANGING_ROOM_SUCCESS, changingRoomGroup, requestArray }; }
    function failure(changingRoomGroup) { return { type: manageConstants.GET_CHANGING_ROOM_FAILURE, changingRoomGroup }; }

    return (dispatch) => {
        manageService.getChangingRoomGroup(groupId)
            .then(
                (changingRoomGroup) => {
                    const proms = [];
                    if (changingRoomGroup.metadata.code === 200) {
                        // get requests by each shopper
                        // eslint-disable-next-line no-unused-vars
                        changingRoomGroup.data.map((roomGroup, key) => roomGroup.shopper && proms.push(manageService.getItemsRequested(roomGroup.shopper.id)));
                        if (proms.length) {
                            Promise.all(proms)
                                .then(requestArray => dispatch(success(changingRoomGroup, requestArray)));
                        } else {
                            dispatch(success(changingRoomGroup, []));
                        }
                    } else {
                        dispatch(failure(changingRoomGroup.toString()));
                        dispatch(alertActions.error(changingRoomGroup.toString()));
                    }
                },
            );
    };
}

function makeVacant(roomId, groupId) {
    function success(response) { return { type: manageConstants.MAKE_VACANT_SUCCESS, response }; }
    function failure(response) { return { type: manageConstants.MAKE_VACANT_FAILURE, response }; }

    return (dispatch) => {
        manageService.makeVacant(roomId)
            .then(
                (response) => {
                    if (response.metadata.code === 200) {
                        this.getChangingRoomGroup(groupId);
                        dispatch(success(response));
                    } else {
                        dispatch(failure(response.toString()));
                        dispatch(alertActions.error(response.toString()));
                    }
                },
            );
    };
}

function getItemsRequested(shopperId) {
    function success(requestedItems) { return { type: manageConstants.GET_ITEMS_REQUESTED_SUCCESS, requestedItems }; }
    function failure(requestedItems) { return { type: manageConstants.GET_ITEMS_REQUESTED_FAILURE, requestedItems }; }

    return (dispatch) => {
        manageService.getItemsRequested(shopperId)
            .then(
                (requestedItems) => {
                    if (requestedItems.metadata.code === 200) {
                        dispatch(success(requestedItems));
                    } else {
                        dispatch(failure(requestedItems.toString()));
                        dispatch(alertActions.error(requestedItems.toString()));
                    }
                },
            );
    };
}

function getSelectedUser(user) {
    function success(userDetails) { return { type: manageConstants.GET_SELECTED_USER, userDetails }; }
    return (dispatch) => {
        dispatch(success(user));
    };
}

function getDailyReport(groupId, createdDate) {
    function success(report) { return { type: manageConstants.GET_DAILY_REPORT_SUCCESS, report }; }
    function failure(report) { return { type: manageConstants.GET_DAILY_REPORT_FAILURE, report }; }

    return (dispatch) => {
        manageService.getDailyReport(groupId, createdDate)
            .then(
                (dailyReport) => {
                    if (dailyReport.metadata.code === 200) {
                        dispatch(success(dailyReport));
                    } else {
                        dispatch(failure(dailyReport.toString()));
                        dispatch(alertActions.error(dailyReport.toString()));
                    }
                },
            );
    };
}

const userManageActions = {
    addUser,
    editUser,
    deleteUser,
    getAllUserDetails,
    getAllStoreList,
    getChangingRoomGroupByStore,
    getChangingRoomGroup,
    makeVacant,
    getItemsRequested,
    getSelectedUser,
    getDailyReport,
};

export default userManageActions;
