import { 
    ADD_TYPE_FAIL, ADD_TYPE_LOADING, ADD_TYPE_SUCCESS, DELETE_TYPE_FAIL, 
    DELETE_TYPE_LOADING, DELETE_TYPE_SUCCESS, EDIT_TYPE_FAIL, EDIT_TYPE_LOADING, 
    EDIT_TYPE_SUCCESS, GET_TYPES_FAIL, GET_TYPES_LOADING, GET_TYPES_SUCESS, 
    SET_CURRENT_PAGE_TYPE_FAIL, SET_CURRENT_PAGE_TYPE_LOADING, SET_CURRENT_PAGE_TYPE_SUCCESS, 
    SET_SEARCH_TYPE_FAIL, SET_SEARCH_TYPE_LOADING, SET_SEARCH_TYPE_SUCCESS, SET_SORT_FAIL, 
    SET_SORT_LOADING, SET_SORT_SUCCESS, SET_SELECTED_TYPE_LOADING, SET_SELECTED_TYPE_SUCCESS,
    SET_SELECTED_TYPE_FAIL,
    SET_NOTIFICATION,
    GET_NOTIFICATION
} from "./consts";

const initialState = {
    selectedType: JSON.parse(localStorage.getItem('selected_type')),
    types: null,
    page: 1,
    totalCount: 0,
    limit: 8,
    loading : false,
    loadingBtn: false
};

export const typeReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_TYPE_LOADING:
        case EDIT_TYPE_LOADING:
            return {
                ...state,
                loading : true,
                loadingBtn: true
            }
        case GET_TYPES_LOADING: 
        case DELETE_TYPE_LOADING:
        case SET_CURRENT_PAGE_TYPE_LOADING:
        case SET_SEARCH_TYPE_LOADING:
        case SET_SORT_LOADING:
        case SET_SELECTED_TYPE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_TYPES_SUCESS: 
            return {
                ...state,
                types: payload.rows,
                totalCount: payload.count,
                loading: false
            }
        case SET_SELECTED_TYPE_SUCCESS:
            return {
                ...state,
                selectedType: payload,
                loading: false
            }
        case SET_CURRENT_PAGE_TYPE_SUCCESS: 
            return {
                ...state,
                page: payload,
                loading: false
            }
        case SET_SEARCH_TYPE_SUCCESS: 
        case SET_SORT_SUCCESS:
                return {
                    ...state,
                    types: payload,
                    loading: false
                }
        case ADD_TYPE_SUCCESS:
            return {
                ...state,
                types: [...state.types, payload],
                loading: false,
                loadingBtn: false
            }
        case EDIT_TYPE_SUCCESS:
            return {
                ...state,
                types: [...state.types.filter(({id}) => id !== payload.id), payload],
                loading: false,
                loadingBtn: false
            }
        case DELETE_TYPE_SUCCESS:
            return {
                ...state,
                types: state.types.filter(({id}) => id !== payload),
                loading: false
            }
        case ADD_TYPE_FAIL:
        case DELETE_TYPE_FAIL:
        case GET_TYPES_FAIL:
        case EDIT_TYPE_FAIL:
        case SET_CURRENT_PAGE_TYPE_FAIL:
        case SET_SEARCH_TYPE_FAIL:
        case SET_SORT_FAIL:
        case SET_SELECTED_TYPE_FAIL:
            return {
                ...state,
                loading: false,
                loadingBtn: false
            }
        default:
            return state;
    };
};