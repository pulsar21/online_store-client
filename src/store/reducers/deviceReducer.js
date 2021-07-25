import { 
    ADD_DEVICE_FAIL, ADD_DEVICE_LOADING, ADD_DEVICE_SUCCESS, DELETE_DEVICE_FAIL, 
    DELETE_DEVICE_LOADING, DELETE_DEVICE_SUCCESS, EDIT_DEVICE_FAIL, EDIT_DEVICE_LOADING, 
    EDIT_DEVICE_SUCCESS, FILTER_PRICE_RANGE_FAIL, FILTER_PRICE_RANGE_LOADING, FILTER_PRICE_RANGE_SUCCESS, 
    FILTER_RATING_RANGE_FAIL, 
    FILTER_RATING_RANGE_LOADING, 
    FILTER_RATING_RANGE_SUCCESS, 
    GET_DEVICES_FAIL, GET_DEVICES_LOADING, GET_DEVICES_SUCCESS, GET_ONE_DEVICE_FAIL, 
    GET_ONE_DEVICE_LOADING, GET_ONE_DEVICE_SUCCESS, SET_CURRENT_PAGE_DEVICE_FAIL, SET_CURRENT_PAGE_DEVICE_LOADING, 
    SET_CURRENT_PAGE_DEVICE_SUCCESS, SET_SEARCH_DEVICE_FAIL, SET_SEARCH_DEVICE_LOADING, SET_SEARCH_DEVICE_SUCCESS,
    SET_SORT_FAIL, SET_SORT_LOADING, SET_SORT_SUCCESS 
} from "./consts";

const initialState = {
    devices: null,
    device: null,
    page: 1,
    totalCount: 0,
    limit: 8,
    loading : false,
    loadingBtn: false
};

export const deviceReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_DEVICE_LOADING:
        case EDIT_DEVICE_LOADING:    
            return {
                ...state,
                loading: true,
                loadingBtn: true
            }
        case DELETE_DEVICE_LOADING:
        case GET_DEVICES_LOADING:
        case SET_CURRENT_PAGE_DEVICE_LOADING:
        case GET_ONE_DEVICE_LOADING:
        case SET_SEARCH_DEVICE_LOADING:
        case SET_SORT_LOADING:
        case FILTER_PRICE_RANGE_LOADING:
        case FILTER_RATING_RANGE_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_DEVICE_SUCCESS:
            return {
                ...state,
                devices: [...state.devices, payload],
                loading: false,
                loadingBtn: false
            }
        case EDIT_DEVICE_SUCCESS:
            return {
                ...state,
                devices: [...state.devices.filter(({id}) => id !== payload.id), payload],
                loading: false,
                loadingBtn: false
            }
        case DELETE_DEVICE_SUCCESS:
            return {
                ...state,
                devices: state.devices.filter(({id}) => id !== payload),
                loading: false
            }
        case GET_ONE_DEVICE_SUCCESS:
            return {
                ...state,
                device: payload,
                loading: false
            }
        case GET_DEVICES_SUCCESS: 
        case FILTER_PRICE_RANGE_SUCCESS:
        case FILTER_RATING_RANGE_SUCCESS:
            return {
                ...state,
                devices: payload.rows,
                totalCount: payload.count,
                loading: false
            };
        case SET_CURRENT_PAGE_DEVICE_SUCCESS:
            return {
                ...state,
                page: payload,
                loading: false
            }
        case SET_SEARCH_DEVICE_SUCCESS: 
        case SET_SORT_SUCCESS:
            return {
                ...state,
                devices: payload,
                loading: false
            }
        case GET_DEVICES_FAIL:
            return {
                ...state,
                devices: null,
                loading: false
            }
        case GET_ONE_DEVICE_FAIL:
            return {
                ...state,   
                device: null,
                loading: false
            }
        case ADD_DEVICE_FAIL:
        case DELETE_DEVICE_FAIL:
        case EDIT_DEVICE_FAIL:
        case SET_CURRENT_PAGE_DEVICE_FAIL:
        case SET_SEARCH_DEVICE_FAIL:
        case SET_SORT_FAIL:
        case FILTER_PRICE_RANGE_FAIL:
        case FILTER_RATING_RANGE_FAIL:
            return {
                ...state,
                loading: false,
                loadingBtn: false
            }
        default:
            return state;
    };
};