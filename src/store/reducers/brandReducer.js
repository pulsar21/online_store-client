import { 
        ADD_BRAND_LOADING, ADD_BRAND_SUCCESS, ADD_BRAND_FAIL, 
        DELETE_BRAND_LOADING, DELETE_BRAND_SUCCESS, DELETE_BRAND_FAIL, 
        GET_BRANDS_FAIL, GET_BRANDS_LOADING, GET_BRANDS_SUCCESS, 
        EDIT_BRAND_LOADING, EDIT_BRAND_SUCCESS, EDIT_BRAND_FAIL, 
        SET_CURRENT_PAGE_BRAND_LOADING, SET_CURRENT_PAGE_BRAND_FAIL, SET_CURRENT_PAGE_BRAND_SUCCESS,
        SET_SEARCH_BRAND_LOADING, SET_SEARCH_BRAND_SUCCESS, SET_SEARCH_BRAND_FAIL, SET_SORT_LOADING,
        SET_SORT_SUCCESS, SET_SORT_FAIL, SET_SELECTED_BRAND_SUCCESS, SET_SELECTED_BRAND_LOADING, SET_SELECTED_BRAND_FAIL
    } from "./consts";

const initialState = {
    selectedBrand: JSON.parse(localStorage.getItem('selected_brand')),
    brands: null,
    page: 1,
    totalCount: 0,
    limit: 100,
    loading : false,
    loadingBtn: false
};

export const brandReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_BRANDS_LOADING:
        case DELETE_BRAND_LOADING:
        case SET_CURRENT_PAGE_BRAND_LOADING:
        case SET_SEARCH_BRAND_LOADING:
        case SET_SORT_LOADING:
        case SET_SELECTED_BRAND_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ADD_BRAND_LOADING:
        case EDIT_BRAND_LOADING:
            return {
                ...state,
                loading: true,
                loadingBtn: true
            };
        case ADD_BRAND_SUCCESS:
            return {
                ...state,
                brands: [...state.brands, payload],
                loading: false,
                loadingBtn: false
            }
        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                brands: state.brands.filter(({id}) => id !== payload),
                loading: false
            }
        case EDIT_BRAND_SUCCESS:
            return {
                ...state,
                brands: [...state.brands.filter(({id}) => id !== payload.id), payload],
                loading: false,
                loadingBtn: false
            }
        case GET_BRANDS_SUCCESS: 
            return {
                ...state,
                brands: payload.rows,
                totalCount: payload.count,
                loading: false
            }
        case SET_SELECTED_BRAND_SUCCESS: 
            return {
                ...state,
                selectedBrand: payload,
                loading: false
            }
        case SET_CURRENT_PAGE_BRAND_SUCCESS: 
            return {
                ...state,
                page: payload,
                loading: false
            }
        case SET_SEARCH_BRAND_SUCCESS: 
        case SET_SORT_SUCCESS:
            return {
                ...state,
                brands: payload,
                loading: false
            }
        case GET_BRANDS_FAIL:
        case ADD_BRAND_FAIL:
        case DELETE_BRAND_FAIL:
        case EDIT_BRAND_FAIL:
        case SET_CURRENT_PAGE_BRAND_FAIL:
        case SET_SEARCH_BRAND_FAIL:
        case SET_SORT_FAIL:
        case SET_SELECTED_BRAND_FAIL:
            return {
                ...state,
                loading: false,
                loadingBtn: false
            }
        default:
            return state;
    };
};