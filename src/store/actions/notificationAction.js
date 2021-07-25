import { $authHost, $host } from "../../config/httpConfig";
import { DELETE_ALL_NOTIFICATION_FAIL, DELETE_ALL_NOTIFICATION_LOADING, DELETE_ALL_NOTIFICATION_SUCCESS, DELETE_NOTIFICATION_FAIL, DELETE_NOTIFICATION_LOADING, DELETE_NOTIFICATION_SUCCESS, GET_NOTIFICATION, GET_NOTIFICATION_FAIL, GET_NOTIFICATION_LOADING, GET_NOTIFICATION_SUCCESS, SET_CURRENT_PAGE_NOTIFICATION_FAIL, SET_CURRENT_PAGE_NOTIFICATION_LOADING, SET_CURRENT_PAGE_NOTIFICATION_SUCCESS, SET_NOTIFICATION, SET_NOTIFICATION_FAIL, SET_NOTIFICATION_LOADING, SET_NOTIFICATION_SUCCESS, SET_SEARCH_NOTIFICATION_FAIL, SET_SEARCH_NOTIFICATION_LOADING, SET_SEARCH_NOTIFICATION_SUCCESS, SET_SORT_NOTIFICATION_FAIL, SET_SORT_NOTIFICATION_LOADING, SET_SORT_NOTIFICATION_SUCCESS } from "../reducers/consts";
import jwtDecode from 'jwt-decode';
import { clearErrors, getErrors } from "./errorAction";
import { convertDate } from "../../services/convertDate";
import { SuccessMessage } from "../../components/notification/SuccessMessage";

export const addNotification = (title) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_NOTIFICATION_LOADING
            })
            const user = jwtDecode(localStorage.getItem('token'));
            const {data} = await $authHost.post(`api/v1/notification/`, {
                title,
                id: user.id,
                full_name: user.full_name
            })
            await dispatch({
                type: SET_NOTIFICATION_SUCCESS,
                payload: data.notification
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_NOTIFICATION_FAIL'));
            await dispatch({
                type: SET_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        }
    };
};

export const getNotification = (page, limit=8, sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_NOTIFICATION_LOADING
            });
            const {data} = await $authHost.get(`api/v1/notification`, {
                params: {
                    page,
                    limit,
                    sort
                }
            });
            await dispatch({
                type: GET_NOTIFICATION_SUCCESS,
                payload: data?.notifications
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_NOTIFICATION_FAIL'));
            await dispatch({
                type: GET_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};

export const searchNotifications = (searchName) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SEARCH_NOTIFICATION_LOADING
            })
            const {data} = await $authHost.get(`api/v1/notification/search?search=${searchName}`);
            convertDate(data.notifications);
            await dispatch({
                type: SET_SEARCH_NOTIFICATION_SUCCESS,
                payload: data.notifications
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_NOTIFICATION_FAIL'));
            await dispatch({
                type: SET_SEARCH_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const setSortNotification = (sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SORT_NOTIFICATION_LOADING
            });
            await dispatch({
                type: SET_SORT_NOTIFICATION_SUCCESS,
                payload: sort
            })   
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SORT_NOTIFICATION_FAIL'));
            await dispatch({
                type: SET_SORT_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        }
    };
};

export const setCurrentPageNotification = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CURRENT_PAGE_NOTIFICATION_LOADING,
            })
            await dispatch({
                type: SET_CURRENT_PAGE_NOTIFICATION_SUCCESS,
                payload: page
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_CURRENT_PAGE_TYPE_FAIL'));
            await dispatch({
                type: SET_CURRENT_PAGE_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const deletAllNotification = () => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: DELETE_ALL_NOTIFICATION_LOADING
            });
            const {data} = await $authHost.delete(`api/v1/notification`);
            await dispatch({
                type: DELETE_ALL_NOTIFICATION_SUCCESS,
                payload: data.notifications
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'DELETE_ALL_NOTIFICATION_FAIL'));
            await dispatch({
                type: DELETE_ALL_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};


export const deleteNotification = (id, title) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: DELETE_NOTIFICATION_LOADING
            });
            const {data} = await $authHost.delete(`api/v1/notification/${id}`);
            await dispatch({
                type: DELETE_NOTIFICATION_SUCCESS,
                payload: data.id
            })
            SuccessMessage(`"${title}" оповещение был удалён!`)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'DELETE_NOTIFICATION_FAIL'));
            await dispatch({
                type: DELETE_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};