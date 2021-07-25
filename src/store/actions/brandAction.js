import { ErrorNotification } from "../../components/notification/ErrorNotification";
import { SuccessMessage } from "../../components/notification/SuccessMessage";
import { $authHost } from "../../config/httpConfig";
import { convertDate } from "../../services/convertDate";
import { 
    ADD_BRAND_FAIL, ADD_BRAND_LOADING, ADD_BRAND_SUCCESS, DELETE_BRAND_FAIL, 
    DELETE_BRAND_LOADING, DELETE_BRAND_SUCCESS, EDIT_BRAND_FAIL, EDIT_BRAND_LOADING, 
    EDIT_BRAND_SUCCESS, GET_BRANDS_FAIL, GET_BRANDS_LOADING, GET_BRANDS_SUCCESS, 
    SET_CURRENT_PAGE_BRAND_FAIL, 
    SET_CURRENT_PAGE_BRAND_LOADING, 
    SET_CURRENT_PAGE_BRAND_SUCCESS, 
    SET_SEARCH_BRAND_FAIL, SET_SEARCH_BRAND_LOADING, SET_SEARCH_BRAND_SUCCESS, SET_SELECTED_BRAND_FAIL, 
    SET_SELECTED_BRAND_LOADING, SET_SELECTED_BRAND_SUCCESS 
} from "../reducers/consts";
import { clearErrors, getErrors } from "./errorAction";
import { addNotification } from "./notificationAction";

export const getBrands = (page, limit=8, sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_BRANDS_LOADING
            })
            const {data} = await $authHost.get(`api/v1/brand/`, {
                params: {
                    page,
                    limit,
                    sort
                }
            });
            convertDate(data?.brands?.rows);
            await dispatch({
                type: GET_BRANDS_SUCCESS,
                payload: data.brands
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_BRANDS_FAIL'));
            await dispatch({
                type: GET_BRANDS_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};

export const setSelectedBrand = (brand) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SELECTED_BRAND_LOADING
            });
            localStorage.setItem('selected_brand', JSON.stringify(brand));
            await dispatch({
                type: SET_SELECTED_BRAND_SUCCESS,
                payload: brand
            });
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SELECTED_BRAND_FAIL'));
            await dispatch({
                type: SET_SELECTED_BRAND_FAIL
            });
            await dispatch(clearErrors());
        }
    }
};

export const searchBrands = (searchName, page, limit) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SEARCH_BRAND_LOADING
            })
            const {data} = await $authHost.get(`api/v1/brand/search?search=${searchName}`, {
                params: {
                    page,
                    limit
                }
            });
            convertDate(data.brands);
            await dispatch({
                type: SET_SEARCH_BRAND_SUCCESS,
                payload: data.brands
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_BRAND_FAIL'));
            await dispatch({
                type: SET_SEARCH_BRAND_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}


export const setCurrentPageBrand = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CURRENT_PAGE_BRAND_LOADING,
            })
            await dispatch({
                type: SET_CURRENT_PAGE_BRAND_SUCCESS,
                payload: page
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_CURRENT_PAGE_BRAND_FAIL'));
            await dispatch({
                type: SET_CURRENT_PAGE_BRAND_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const addBrand = (name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: ADD_BRAND_LOADING
            })
            const {data} = await $authHost.post(`api/v1/brand/`, {
                name
            });
            await dispatch(addNotification(data.message));
            convertDate([data?.brand]);
            await dispatch({
                type: ADD_BRAND_SUCCESS,
                payload: data.brand
            })
            SuccessMessage(data.message);
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'ADD_BRAND_FAIL'));
            await dispatch({
                type: ADD_BRAND_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'ADD_BRAND_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};

export const editBrand = (id, name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: EDIT_BRAND_LOADING
            })
            const {data} = await $authHost.put(`api/v1/brand/${id}`, {
                name
            });
            await dispatch(addNotification(data.message));
            convertDate([data?.brand]);
            await dispatch({
                type: EDIT_BRAND_SUCCESS,
                payload: data.brand
            })
            SuccessMessage(data.message)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_BRAND_FAIL'));
            await dispatch({
                type: EDIT_BRAND_FAIL
            });
            ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_BRAND_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};

export const deleteBrand = (id, name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: DELETE_BRAND_LOADING
            })
            const {data} = await $authHost.delete(`api/v1/brand/${id}`);
            await dispatch(addNotification(`${name} брэнд был удалён!`));
            await dispatch({
                type: DELETE_BRAND_SUCCESS,
                payload: data.id
            })
            SuccessMessage(`${name} брэнд был удалён!`)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'DELETE_BRAND_FAIL'));
            await dispatch({
                type: DELETE_BRAND_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};