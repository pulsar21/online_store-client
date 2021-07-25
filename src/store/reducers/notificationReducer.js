import { 
    SET_NOTIFICATION, GET_NOTIFICATION, GET_NOTIFICATION_LOADING, GET_NOTIFICATION_SUCCESS, 
    GET_NOTIFICATION_FAIL, SET_NOTIFICATION_LOADING, SET_NOTIFICATION_SUCCESS, SET_NOTIFICATION_FAIL, 
    DELETE_ALL_NOTIFICATION_LOADING, DELETE_ALL_NOTIFICATION_SUCCESS, DELETE_ALL_NOTIFICATION_FAIL, SET_CURRENT_PAGE_NOTIFICATION_FAIL,
    SET_CURRENT_PAGE_NOTIFICATION_SUCCESS, SET_CURRENT_PAGE_NOTIFICATION_LOADING, SET_SEARCH_NOTIFICATION_LOADING, SET_SEARCH_NOTIFICATION_SUCCESS,
    SET_SEARCH_NOTIFICATION_FAIL, SET_SORT_NOTIFICATION_LOADING, SET_SORT_NOTIFICATION_SUCCESS, SET_SORT_NOTIFICATION_FAIL, DELETE_NOTIFICATION_LOADING, DELETE_NOTIFICATION_SUCCESS, DELETE_NOTIFICATION_FAIL
} from "./consts";

const initialState = {
    sort: null,
    page: 1,
    totalCount: 0,
    limit: 7,
    notifications: null,
    loading: false
};

export const notificationReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_NOTIFICATION_LOADING: 
        case SET_NOTIFICATION_LOADING:
        case DELETE_NOTIFICATION_LOADING:
        case DELETE_ALL_NOTIFICATION_LOADING:
        case SET_CURRENT_PAGE_NOTIFICATION_LOADING:
        case SET_SEARCH_NOTIFICATION_LOADING:
        case SET_SORT_NOTIFICATION_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: [...state.notifications, payload],
                loading: false
            }
        case SET_SORT_NOTIFICATION_SUCCESS:
            return {
                ...state,
                sort: payload,
                loading: false
            }
        case GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: payload.rows,
                totalCount: payload.count,
                loading: false
            }
        case DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: state.notifications.filter(({id}) => id !== payload),
                loading: false
            }
        case DELETE_ALL_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: payload,
                loading: false
            }
        case SET_CURRENT_PAGE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                page: payload,
                loading: false
            }
        case SET_SEARCH_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: payload,
                loading: false
            }
        case GET_NOTIFICATION_FAIL: 
        case SET_NOTIFICATION_FAIL:
        case DELETE_ALL_NOTIFICATION_FAIL:
        case DELETE_NOTIFICATION_FAIL:
        case SET_CURRENT_PAGE_NOTIFICATION_FAIL:
        case SET_SEARCH_NOTIFICATION_FAIL:
        case SET_SORT_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    };
};