import { SuccessMessage } from "../../components/notification/SuccessMessage";
import { ErrorNotification } from "../../components/notification/ErrorNotification";
import { $authHost } from "../../config/httpConfig";
import { 
    ADD_TYPE_FAIL, ADD_TYPE_LOADING, ADD_TYPE_SUCCESS, DELETE_TYPE_FAIL, 
    DELETE_TYPE_LOADING, DELETE_TYPE_SUCCESS, EDIT_TYPE_FAIL, EDIT_TYPE_LOADING, 
    EDIT_TYPE_SUCCESS, GET_NOTIFICATION, GET_TYPES_FAIL, GET_TYPES_LOADING, GET_TYPES_SUCESS, 
    SET_CURRENT_PAGE_TYPE_FAIL, 
    SET_CURRENT_PAGE_TYPE_LOADING, 
    SET_CURRENT_PAGE_TYPE_SUCCESS, 
    SET_NOTIFICATION, 
    SET_SEARCH_TYPE_FAIL, SET_SEARCH_TYPE_LOADING, SET_SEARCH_TYPE_SUCCESS, SET_SELECTED_TYPE, 
    SET_SELECTED_TYPE_FAIL, SET_SELECTED_TYPE_LOADING, SET_SELECTED_TYPE_SUCCESS 
} from "../reducers/consts";
import { clearErrors, getErrors } from "./errorAction";
import { convertDate } from "../../services/convertDate";
import { addNotification } from "./notificationAction";

export const getTypes = (page, limit, sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_TYPES_LOADING
            })
            const {data} = await $authHost.get(`api/v1/type/`, {
                params: {
                    page,
                    limit,
                    sort
                }
            });
            convertDate(data?.types?.rows);
            await dispatch({
                type: GET_TYPES_SUCESS,
                payload: data.types
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_TYPES_FAIL'));
            await dispatch({
                type: GET_TYPES_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};

export const setSelectedType = (type) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SELECTED_TYPE_LOADING
            });
            localStorage.setItem('selected_type', JSON.stringify(type));
            await dispatch({
                type: SET_SELECTED_TYPE_SUCCESS,
                payload: type
            });
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SELECTED_BRAND_FAIL'));
            await dispatch({
                type: SET_SELECTED_TYPE_FAIL
            });
            await dispatch(clearErrors());
        }
    }
};

export const searchTypes = (searchName, page, limit) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SEARCH_TYPE_LOADING
            })
            const {data} = await $authHost.get(`api/v1/type/search?search=${searchName}`, {
                params: {
                    page,
                    limit
                }
            })
            debugger
            convertDate(data?.types);
            await dispatch({
                type: SET_SEARCH_TYPE_SUCCESS,
                payload: data.types
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_TYPE_FAIL'));
            await dispatch({
                type: SET_SEARCH_TYPE_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const setCurrentPageType = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CURRENT_PAGE_TYPE_LOADING,
            })
            await dispatch({
                type: SET_CURRENT_PAGE_TYPE_SUCCESS,
                payload: page
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_CURRENT_PAGE_TYPE_FAIL'));
            await dispatch({
                type: SET_CURRENT_PAGE_TYPE_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const addType = (name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: ADD_TYPE_LOADING
            })
            const {data} = await $authHost.post(`api/v1/type/`, {
                name
            });
            await dispatch(addNotification(data.message));
            convertDate([data?.type]);
            await dispatch({
                type: ADD_TYPE_SUCCESS,
                payload: data.type
            })
            SuccessMessage(data.message);
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'ADD_TYPE_FAIL'));
            await dispatch({
                type: ADD_TYPE_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'ADD_TYPE_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};

export const editType = (id, name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: EDIT_TYPE_LOADING
            })
            const {data} = await $authHost.put(`api/v1/type/${id}`, {
                name
            });
            await dispatch(addNotification(data.message));
            convertDate([data?.type]);
            await dispatch({
                type: EDIT_TYPE_SUCCESS,
                payload: data.type
            })
            SuccessMessage(data.message)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_TYPE_FAIL'));
            await dispatch({
                type: EDIT_TYPE_FAIL
            });
            ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_TYPE_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};

export const deleteType = (id, name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: DELETE_TYPE_LOADING
            })
            const {data} = await $authHost.delete(`api/v1/type/${id}`);
            await dispatch(addNotification(`${name} тип был удалён!`));
            await dispatch({
                type: DELETE_TYPE_SUCCESS,
                payload: data.id
            })
            SuccessMessage(`${name} тип был удалён!`)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'DELETE_TYPE_FAIL'));
            await dispatch({
                type: DELETE_TYPE_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};


