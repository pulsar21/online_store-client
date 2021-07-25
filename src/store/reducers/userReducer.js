import { 
    AUTH_ERROR, FORGOT_FAIL, FORGOT_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, 
    LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, 
    RESET_FAIL, GET_ADMINS_LOADING,
    RESET_SUCCESS, 
    USER_LOADED, USER_LOADING, LOGIN_LOADING, RESET_LOADING, FORGOT_LOADING, 
    REGISTER_LOADING, GOOGLE_SUCCESS, GOOGLE_LOADING, GOOGLE_FAIL, LOGOUT_FAIL, 
    LOGOUT_LOADING, EDIT_USER_SUCCESS, EDIT_USER_FAIL, GET_ONE_USER_LOADING, 
    GET_ONE_USER_SUCESS, GET_ONE_USER_FAIL, EDIT_USER_LOADING, GET_USERS_LOADING, 
    GET_USERS_SUCESS, GET_USERS_FAIL, DELETE_USER_FAIL, DELETE_USER_LOADING, 
    DELETE_USER_SUCCESS, ADD_USER_FAIL, ADD_USER_LOADING, ADD_USER_SUCCESS, 
    EDIT_USERS_SUCCESS, EDIT_USERS_LOADING, EDIT_USERS_FAIL, GET_ADMINS_SUCCESS, 
    GET_ADMINS_FAIL, SET_TOTAL_COUNT, SET_CURRENT_PAGE_USER_LOADING, SET_CURRENT_PAGE_USER_SUCCESS, 
    SET_CURRENT_PAGE_USER_FAIL,
    SET_SEARCH_USER_LOADING, SET_SEARCH_USER_SUCCESS, SET_SEARCH_USER_FAIL, SET_SORT_FAIL, 
    SET_SORT_SUCCESS, SET_SORT_LOADING, USER_FOLLOW_NOTIFICATION_LOADING, 
    USER_FOLLOW_NOTIFICATION_SUCCESS, USER_FOLLOW_NOTIFICATION_FAIL, GET_FOLLOW_NOTIFICATION_LOADING, 
    GET_FOLLOW_NOTIFICATION_SUCCESS, GET_FOLLOW_NOTIFICATION_FAIL, SET_SEARCH_FOLLOW_NOTIFICATION_LOADING, 
    SET_SEARCH_FOLLOW_NOTIFICATION_SUCCESS, SET_SEARCH_FOLLOW_NOTIFICATION_FAIL, SET_NOTIFICATION, SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_LOADING, SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_SUCCESS, SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_FAIL, VERIFY_LOADING, VERIFY_SUCCESS, VERIFY_FAIL
} from "./consts";

const initialState = {
    page: 1,
    totalCount: 0,
    limit: 10,
    token: localStorage.getItem('token'),
    user : null,
    users: null,
    admins: null,
    isAuth : localStorage.getItem('token') ? true : false,
    loading : false,
    loadingBtn: false,
    loadingGoogleBtn: false,
    next: false,
    send: false,
    verify: false,
    follow_email: null,
    follow_notification: null
};

export const userReducer = (state=initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADING:
        case GET_ONE_USER_LOADING:
        case GET_USERS_LOADING:
        case GET_ADMINS_LOADING:
        case SET_CURRENT_PAGE_USER_LOADING:
        case SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_LOADING:
        case SET_SEARCH_USER_LOADING:
        case SET_SORT_LOADING:
        case GET_FOLLOW_NOTIFICATION_LOADING:
        case SET_SEARCH_FOLLOW_NOTIFICATION_LOADING:
            return {
                ...state,
                loading: true
            };
        case GOOGLE_LOADING:
            return {
                ...state,
                loadingGoogleBtn: true
            }
        case LOGIN_LOADING:
        case REGISTER_LOADING:
        case FORGOT_LOADING:
        case RESET_LOADING:
        case VERIFY_LOADING:
        case LOGOUT_LOADING:
        case EDIT_USER_LOADING:
        case USER_FOLLOW_NOTIFICATION_LOADING:
            return {
                ...state,
                loadingBtn: true
            }
        
        case DELETE_USER_LOADING:
        case ADD_USER_LOADING:
        case EDIT_USERS_LOADING: 
            return {
                ...state,
                loading: true,
                loadingBtn: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: payload.user,
                token: payload.token
            };
        case GET_USERS_SUCESS: 
            return {
                ...state,
                users: payload.rows,
                totalCount: payload.count,
                loading: false
            }
        case GET_FOLLOW_NOTIFICATION_SUCCESS: 
            return {
                ...state,
                follow_notification: payload.rows,
                totalCount: payload.count,
                loading: false
            }
        case USER_FOLLOW_NOTIFICATION_SUCCESS: 
            return {
                ...state,
                follow_email: payload,
                loadingBtn: false
            }
        case SET_SEARCH_FOLLOW_NOTIFICATION_SUCCESS:
            return {
                ...state,
                follow_notification: payload,
                loading: false
            }
        case SET_SEARCH_USER_SUCCESS: 
        case SET_SORT_SUCCESS:
            return {
                ...state,
                users: payload,
                loading: false
            }
        case SET_CURRENT_PAGE_USER_SUCCESS: 
        case SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_SUCCESS:
            return {
                ...state,
                page: payload,
                loading: false
            }
        case GET_ADMINS_SUCCESS: 
            return {
                ...state,
                admins: payload,
                loading: false
            }
        case GET_ONE_USER_SUCESS: 
            return {
                ...state,
                user: payload,
                loading: false
            }
        case LOGIN_SUCCESS:
        case GOOGLE_SUCCESS:
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                isAuth: true,
                loadingBtn: false,
                loadingGoogleBtn: false,
                next: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                token: payload,
                isAuth: false,
                loadingBtn: false,
                next: true
            };
        case FORGOT_SUCCESS:
            return {
                ...state,
                send: false,
                loadingBtn: false,
            }
        case RESET_SUCCESS:
            return {
                ...state,
                send: true,
                loadingBtn: false,
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                verify: true,
                loadingBtn: false,
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                loadingBtn: false,
                users: [...state.users, payload]
            }
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loadingBtn: false,
                user: payload
            }
        case EDIT_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                loadingBtn: false,
                users: [...state.users.filter(({id}) => id !== payload.id), payload]
            }
        case DELETE_USER_SUCCESS: 
            return {    
                ...state,
                loading: false,
                loadingBtn: false,
                users: state.users.filter(({id}) => id !== payload)
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGOUT_FAIL:
        case LOGIN_FAIL:
        case GOOGLE_FAIL:
        case REGISTER_FAIL:
        case FORGOT_FAIL:
        case RESET_FAIL: 
        case VERIFY_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false,
                loading: false,
                loadingBtn: false,
                loadingGoogleBtn: false,
                next: false,
                send: false,
                verify: false
            };
        case EDIT_USER_FAIL:
        case EDIT_USERS_FAIL:
        case GET_USERS_FAIL:
        case GET_ADMINS_FAIL:
        case GET_ONE_USER_FAIL:
        case DELETE_USER_FAIL:
        case ADD_USER_FAIL:
        case SET_SEARCH_USER_FAIL:
        case SET_SORT_FAIL:
        case SET_SEARCH_FOLLOW_NOTIFICATION_FAIL:
        case SET_CURRENT_PAGE_USER_FAIL:
        case SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                loadingBtn: false,
                loadingGoogleBtn: false,
            }
        case USER_FOLLOW_NOTIFICATION_FAIL:
            return {
                ...state,
                loadingBtn: false,
                follow_email: null
            }
        case GET_FOLLOW_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                follow_notification: null
            }
        default:
            return state;
    };
};