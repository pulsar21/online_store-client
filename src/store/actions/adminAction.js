import { $authHost } from "../../config/httpConfig";
import { convertDate } from "../../services/convertDate";

import { 
    GET_ADMINS_FAIL, GET_ADMINS_LOADING, GET_ADMINS_SUCCESS, SET_SEARCH_ADMIN_LOADING, 
    SET_SEARCH_ADMIN_SUCCESS, SET_SEARCH_ADMIN_FAIL, SET_CURRENT_PAGE_ADMIN_LOADING, 
    SET_CURRENT_PAGE_ADMIN_SUCCESS, SET_CURRENT_PAGE_ADMIN_FAIL 
} from "../reducers/consts";

import { clearErrors, getErrors } from "./errorAction";

export const getAdmins = (page, limit=100, sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_ADMINS_LOADING
            })
            const {data} = await $authHost.get(`api/v1/user/admin`, {
                params: {
                    page,
                    limit,
                    sort
                }
            });
            convertDate(data?.admins?.rows);
            const admins = data?.admins?.rows.filter(admin => admin.role === 'ADMIN' && admin);
            await dispatch({
                type: GET_ADMINS_SUCCESS,
                payload: {
                    count: admins.length,
                    rows: admins
                }
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_ADMINS_FAIL'));
            await dispatch({
                type: GET_ADMINS_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};

export const searchAdmins = (searchName) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SEARCH_ADMIN_LOADING
            })
            const {data} = await $authHost.get(`api/v1/user/admin/search?search=${searchName}`);
            convertDate(data.admins);
            await dispatch({
                type: SET_SEARCH_ADMIN_SUCCESS,
                payload: data.admins
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_ADMIN_FAIL'));
            await dispatch({
                type: SET_SEARCH_ADMIN_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const setCurrentPageAdmin = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CURRENT_PAGE_ADMIN_LOADING,
            })
            await dispatch({
                type: SET_CURRENT_PAGE_ADMIN_SUCCESS,
                payload: page
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_CURRENT_PAGE_ADMIN_FAIL'));
            await dispatch({
                type: SET_CURRENT_PAGE_ADMIN_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}