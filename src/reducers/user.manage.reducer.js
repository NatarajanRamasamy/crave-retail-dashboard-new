import manageConstants from '../constants/manage.constants';

const initialState = {
    loader: false,
    success: false,
    // associates: [{
    //   "id": 1,
    //   "role": "ASSOCIATE",
    //   "firstName": "Thanos",
    //   "phoneNumber": "6135550138",
    //   "allChangingRoomGroup": false,
    //   "changingRoomGroupId": null,
    //   "storeId": 5,
    //   "active": true,
    //   "email": "thanos@example.com",
    //   "lastName": 'iron',
    //   "gender": 'male',
    //   "allowedStores": [

    //   ],
    //   "allowAllStores": false,
    //   "notificationToken": null
    //   },
    //   {
    //   "id": 2,
    //   "role": "ASSOCIATE",
    //   "firstName": "Thanos",
    //   "phoneNumber": "6135550138",
    //   "allChangingRoomGroup": false,
    //   "changingRoomGroupId": null,
    //   "storeId": 6,
    //   "active": true,
    //   "email": "thanos@example.com",
    //   "lastName": 'spider',
    //   "gender": 'female',
    //   "allowedStores": [

    //   ],
    //   "allowAllStores": false,
    //   "notificationToken": null
    //   }]
    associates: [],
    stores: [],
    changingRoomGroup: [],
    changingRoomGroupData: [],
};

function userManage(state = initialState, action) {
    let stores = [];
    // let data;
    let edited;
    let deleted;
    let associates = [];
    let allData = [];
    let allRequests = [];
    let requestsPerRoom = [];
    let changingRoomGroup;
    let requestArray;

    switch (action.type) {
    case manageConstants.ADD_USER_REQUEST:
        return {
            ...state,
            loader: true,
            associates: state.associates,
        };
    case manageConstants.ADD_USER_SUCCESS:
        // let newData = state.associates.concat(action.user)
        return {
            ...state,
            associates: [...state.associates, action.user.data],
            // associates: [...state.associates,action.user.data],
            success: true,
            loader: false,
        };
    case manageConstants.ADD_USER_FAILURE:
        return {
            ...state,
            associates: [...state.associates, action.user.errors.length ? action.user.errors[0] : ''],
            loader: false,
        };
    case manageConstants.EDIT_USER_REQUEST:
        return {
            ...state,
            loader: true,
            associates: state.associates,
        };
    case manageConstants.EDIT_USER_SUCCESS:
        // eslint-disable-next-line no-case-declarations
        const { data } = action.user;
        edited = state.associates;
        edited = edited.filter(user => user.id !== data.id);
        edited = [data, ...edited];
        return {
            ...state,
            associates: edited,
            success: true,
            loader: false,
        };
    case manageConstants.EDIT_USER_FAILURE:
        return {
            ...state,
            associates: state.associates,
            loader: false,
        };
    case manageConstants.DELETE_USER_REQUEST:
        return {
            ...state,
            loader: true,
            associates: state.associates,
        };
    case manageConstants.DELETE_USER_SUCCESS:
        deleted = state.associates;
        deleted = deleted.filter(item => item.id !== action.id);
        return {
            ...state,
            associates: deleted,
            success: true,
            loader: false,
        };
    case manageConstants.DELETE_USER_FAILURE:
        return {
            ...state,
            associates: state.associates,
            loader: false,
        };
    case manageConstants.GET_ALL_USER_DETAILS_SUCCESS:
        associates = [];
        if (action.user && action.user.data) {
            associates = action.user.data;
        }
        return {
            ...state,
            associates,
            // associates: state.associates,
            loader: false,
        };
    case manageConstants.GET_ALL_USER_DETAILS_FAILURE:
        return {
            ...state,
            // associates: [],
            associates: state.associates,
            loader: false,
        };
    case manageConstants.GET_ALL_STORE_LIST_SUCCESS:
        if (action.stores && action.stores.data) {
            stores = action.stores.data;
        }
        return {
            ...state,
            stores,
            loader: false,
        };
    case manageConstants.GET_SELECTED_USER:
        return {
            ...state,
            selectedUser: action.user ? action.user : {},
        };
    case manageConstants.GET_CHANGING_ROOM_BY_STORE_SUCCESS:
        return {
            ...state,
            crGroupByStore: action.crGroup ? action.crGroup : [],
        };
    case manageConstants.GET_CHANGING_ROOM_SUCCESS:
        allData = [];
        // let changeRoomIds = [];
        allRequests = [];
        requestsPerRoom = [];
        changingRoomGroup = action.changingRoomGroup.data;
        // eslint-disable-next-line prefer-destructuring
        requestArray = action.requestArray;
        // eslint-disable-next-line no-unused-vars
        requestArray.map((req, key) => {
            allRequests.push(req.data);
            return null;
        });

        // eslint-disable-next-line no-unused-expressions
        changingRoomGroup && changingRoomGroup.map((room, roomKey) => {
            requestsPerRoom = [];
            if (allRequests.length) {
                allRequests.map((req, reqKey) => {
                    req.map((request, key) => {
                        if (req.length && req[key].changingRoom.id === room.id) {
                            requestsPerRoom.push(request);
                        }
                        return null;
                    });
                    return null;
                });
                allData.push({
                    room,
                    request: requestsPerRoom,
                });
            } else {
                allData.push(
                    {
                        room,
                        request: [],
                    },
                );
            }
            return null;
        });
        return {
            ...state,
            // changingRoomGroupData: action.changingRoomGroup && action.requestArray ? allData : []
            changingRoomGroupData: action.changingRoomGroup ? allData : [],
        };
    case manageConstants.MAKE_VACANT_SUCCESS:
        return {
            ...state,
            response: action.response,
        };
    case manageConstants.GET_ITEMS_REQUESTED_SUCCESS:
        return {
            ...state,
            requestedItems: action.requestedItems ? action.requestedItems.data : [],
        };
    case manageConstants.GET_DAILY_REPORT_SUCCESS:
        return {
            ...state,
            dailyReport: action.report ? action.report.data : {},
        };
    default:
        return state;
    }
}

export default userManage;
