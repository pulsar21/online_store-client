import { 
    GET_ADMINS_FAIL, GET_ADMINS_LOADING, GET_ADMINS_SUCCESS, SET_CURRENT_PAGE_ADMIN_FAIL, 
    SET_CURRENT_PAGE_ADMIN_LOADING, SET_CURRENT_PAGE_ADMIN_SUCCESS, SET_SEARCH_ADMIN_FAIL, 
    SET_SEARCH_ADMIN_LOADING, SET_SEARCH_ADMIN_SUCCESS 
} from "./consts";

const initialState = {
    page: 1,
    totalCount: 0,
    limit: 100,
    admins: null,
    loading : false,
};

export const adminReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ADMINS_LOADING:
        case SET_CURRENT_PAGE_ADMIN_LOADING:
        case SET_SEARCH_ADMIN_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ADMINS_SUCCESS: 
            return {
                ...state,
                admins: payload.rows,
                totalCount: payload.count,
                loading: false
            }
        case SET_CURRENT_PAGE_ADMIN_SUCCESS: 
            return {
                ...state,
                page: payload,
                loading: false
            }
        case SET_SEARCH_ADMIN_SUCCESS:
            return {
                ...state,
                admins: payload,
                loading: false
            }
        case GET_ADMINS_FAIL:
        case SET_CURRENT_PAGE_ADMIN_FAIL:
        case SET_SEARCH_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    };
};