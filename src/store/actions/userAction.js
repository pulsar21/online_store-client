import jwt_decode from "jwt-decode";
import { ErrorNotification } from "../../components/notification/ErrorNotification";
import { SuccessNotification } from "../../components/notification/SuccessNotification";
import { $host, $authHost } from "../../config/httpConfig";
import { 
    ADD_USER_FAIL, ADD_USER_LOADING, ADD_USER_SUCCESS, AUTH_ERROR, 
    DELETE_USER_FAIL, DELETE_USER_LOADING, DELETE_USER_SUCCESS, EDIT_USERS_FAIL, 
    EDIT_USERS_LOADING, EDIT_USERS_SUCCESS, EDIT_USER_FAIL, EDIT_USER_LOADING, 
    EDIT_USER_SUCCESS, FORGOT_FAIL, FORGOT_LOADING, FORGOT_SUCCESS, GET_FOLLOW_NOTIFICATION_FAIL, 
    GET_FOLLOW_NOTIFICATION_LOADING, GET_FOLLOW_NOTIFICATION_SUCCESS, GET_ONE_USER_FAIL, 
    GET_ONE_USER_LOADING, GET_ONE_USER_SUCESS, GET_USERS_FAIL, GET_USERS_LOADING, 
    GET_USERS_SUCESS, GOOGLE_FAIL, GOOGLE_LOADING, GOOGLE_SUCCESS, LOGIN_FAIL, 
    LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_LOADING, LOGOUT_SUCCESS, 
    REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS, RESET_FAIL, RESET_LOADING, 
    RESET_SUCCESS, SET_SEARCH_USER_FAIL, SET_SEARCH_FOLLOW_NOTIFICATION_FAIL, 
    SET_SEARCH_FOLLOW_NOTIFICATION_LOADING, SET_SEARCH_FOLLOW_NOTIFICATION_SUCCESS, 
    SET_SEARCH_USER_LOADING, SET_SEARCH_USER_SUCCESS, SET_SORT_FAIL, SET_SORT_LOADING, 
    SET_SORT_SUCCESS, SET_TOTAL_COUNT, USER_FOLLOW_NOTIFICATION_FAIL, USER_FOLLOW_NOTIFICATION_LOADING, 
    USER_FOLLOW_NOTIFICATION_SUCCESS, USER_LOADED, USER_LOADING, SET_NOTIFICATION, SET_CURRENT_PAGE_USER_LOADING, SET_CURRENT_PAGE_USER_SUCCESS, SET_CURRENT_PAGE_USER_FAIL, SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_LOADING, SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_SUCCESS, SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_FAIL, VERIFY_LOADING, VERIFY_SUCCESS, VERIFY_FAIL 
} from "../reducers/consts";
import { clearErrors, getErrors } from "./errorAction";
import { SuccessMessage } from '../../components/notification/SuccessMessage';
import { convertDate } from "../../services/convertDate";
import { addNotification } from "./notificationAction";


export const signUp = (fullName, email, password, confirmPassword) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: REGISTER_LOADING
            });
            const {data, status, statusText} = await $host.post('api/v1/user/registration/',{
                full_name: fullName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });
            await dispatch({
                type: REGISTER_SUCCESS,
                payload: data.token
            });
            await SuccessNotification(data.message, status, statusText, 'REGISTER_SUCCESS')
        } catch (error) {  
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'REGISTER_FAIL'));
            await dispatch({
                type: REGISTER_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'REGISTER_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};


export const signIn = (email, password) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: LOGIN_LOADING
            });
            const {data, status, statusText} = await $host.post('api/v1/user/login/',{
                email: email,
                password: password
            });
            localStorage.setItem('token', data.token);
            const user = jwt_decode(data.token);
            await dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: data.token,
                    user: {
                        id: user.id,
                        email: user.email,
                        full_name: user.full_name,
                        role: user.role,
                        createdAt: new Date().toISOString(user.iat),
                        updatedAt: new Date().toISOString(user.iat)
                    }
                }
            });
            await SuccessNotification(data.message, status, statusText, 'LOGIN_SUCCESS');
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'LOGIN_FAIL'));
            await dispatch({
                type: LOGIN_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'LOGIN_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};

export const auth = () => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: USER_LOADING
            });
            const { data } = await $authHost.get(`api/v1/user/auth/`);
            const {id} = jwt_decode(data.token);
            const user = await $authHost.get(`api/v1/user/${id}`);
            await dispatch({
                type: USER_LOADED,
                payload: {
                    token: data.token,
                    user: user.data
                }
            });
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'AUTH_ERROR'));
            await dispatch({
                type: AUTH_ERROR
            });
            await dispatch(clearErrors());
        };
    };
};

export const userfollowNotification = (email) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: USER_FOLLOW_NOTIFICATION_LOADING
            });
            const {data} = await $host.post(`api/v1/user/follow-notification/`, {
                email
            });
            await dispatch({
                type: USER_FOLLOW_NOTIFICATION_SUCCESS,
                payload: data.follow_email
            })
            SuccessMessage(data.message);
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'USER_FOLLOW_NOTIFICATION_FAIL'));
            await dispatch({
                type: USER_FOLLOW_NOTIFICATION_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'USER_FOLLOW_NOTIFICATION_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    };
};

export const getfollowNotification = (page, limit=8, sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_FOLLOW_NOTIFICATION_LOADING
            });
            const {data} = await $authHost.get(`api/v1/user/follow-notification/all/`, {
                params: {
                    page, 
                    limit,
                    sort
                }
            });
            data?.follow_notification?.rows?.map(user => user.createdAt = new Date(user.createdAt).toLocaleString());
            data?.follow_notification?.rows?.map(user => user.updatedAt = new Date(user.updatedAt).toLocaleString());
            await dispatch({
                type: GET_FOLLOW_NOTIFICATION_SUCCESS,
                payload: data.follow_notification
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_FOLLOW_NOTIFICATION_FAIL'));
            await dispatch({
                type: GET_FOLLOW_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        }
    };
};

export const searchFollowNotification = (searchName) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SEARCH_FOLLOW_NOTIFICATION_LOADING
            });
            const {data} = await $authHost.get(`api/v1/user/follow-notification/search?search=${searchName}`);
            convertDate(data?.follow_notification);
            await dispatch({
                type: SET_SEARCH_FOLLOW_NOTIFICATION_SUCCESS,
                payload: data.follow_notification
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_FOLLOW_NOTIFICATION_FAIL'));
            await dispatch({
                type: SET_SEARCH_FOLLOW_NOTIFICATION_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_FOLLOW_NOTIFICATION_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    };
};

export const getUsers = (page, limit, sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_USERS_LOADING
            })
            const {data} = await $authHost.get(`api/v1/user/`, {
                params: {
                    page,
                    limit,
                    sort
                }
            });
            convertDate(data?.users?.rows);
            await dispatch({
                type: GET_USERS_SUCESS,
                payload: data.users
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_USERS_FAIL'));
            await dispatch({
                type: GET_USERS_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};

export const searchUsers = (searchName) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SEARCH_USER_LOADING
            })
            const {data} = await $authHost.get(`api/v1/user/search?search=${searchName}`);
            convertDate(data.users);
            await dispatch({
                type: SET_SEARCH_USER_SUCCESS,
                payload: data.users
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_USER_FAIL'));
            await dispatch({
                type: SET_SEARCH_USER_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const sortUsers = (sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SORT_LOADING
            })
            const {data} = await $authHost.get(`api/v1/user/sort?sort=${sort}`)
            await dispatch({
                type: SET_SORT_SUCCESS,
                payload: data.users
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SORT_FAIL'));
            await dispatch({
                type: SET_SORT_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const getOneUser = (id) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_ONE_USER_LOADING
            })
            const {data} = await $authHost.get(`api/v1/user/${id}/`);
            convertDate([data]);
            await dispatch({
                type: GET_ONE_USER_SUCESS,
                payload: data
            });
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_ONE_USER_FAIL'));
            await dispatch({
                type: GET_ONE_USER_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};

export const setCurrentPageUser = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CURRENT_PAGE_USER_LOADING,
            })
            await dispatch({
                type: SET_CURRENT_PAGE_USER_SUCCESS,
                payload: page
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_CURRENT_PAGE_USER_FAIL'));
            await dispatch({
                type: SET_CURRENT_PAGE_USER_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const setCurrentPageFollowNotification = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_LOADING,
            })
            await dispatch({
                type: SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_SUCCESS,
                payload: page
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_FAIL'));
            await dispatch({
                type: SET_CURRENT_PAGE_FOLLOW_NOTIFICATION_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const addUser = (email, full_name, password, confirmPassword) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: ADD_USER_LOADING
            });
            const {data} = await $authHost.post(`api/v1/user/`, {
                email,
                full_name,
                password,
                confirmPassword
            })
            await dispatch(addNotification(data.message));
            convertDate([data?.user]);
            await dispatch({
                type: ADD_USER_SUCCESS,
                payload: data.user
            })
            SuccessMessage(data.message)
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'ADD_USER_FAIL'));
            await dispatch({
                type: ADD_USER_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'ADD_USER_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const editUser = (id, email, full_name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: EDIT_USER_LOADING
            })
            const {data} = await $authHost.patch(`api/v1/user/${id}/`, {
                email,
                full_name
            });
            await dispatch(addNotification(data.message));
            convertDate([data?.user]);
            await dispatch({
                type: EDIT_USER_SUCCESS,
                payload: data.user
            })
            SuccessMessage(data.message)
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_USER_FAIL'));
            await dispatch({
                type: EDIT_USER_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_USER_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const editUsers = (id, email, full_name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: EDIT_USERS_LOADING
            })
            const {data} = await $authHost.patch(`api/v1/user/${id}/`, {
                email,
                full_name
            })
            await dispatch(addNotification(data.message));
            convertDate([data?.user]);
            await dispatch({
                type: EDIT_USERS_SUCCESS,
                payload: data.user
            })
            SuccessMessage(data.message)
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_USERS_FAIL'));
            await dispatch({
                type: EDIT_USERS_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_USERS_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const deleteUser = (id, email) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: DELETE_USER_LOADING
            })
            const {data} = await $authHost.delete(`api/v1/user/${id}`);
            await dispatch(addNotification(`${email} пользователь был удалён!`));
            await dispatch({
                type: DELETE_USER_SUCCESS,
                payload: data.id
            })
            SuccessMessage(`${email} пользователь был удалён!`)
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'DELETE_USER_FAIL'));
            await dispatch({
                type: DELETE_USER_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'DELETE_USER_FAIL');
            await dispatch(clearErrors());
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: LOGOUT_LOADING
            });
            localStorage.removeItem('token');
            localStorage.removeItem('selected_brand');
            localStorage.removeItem('selected_type');
            localStorage.removeItem('cart');
            localStorage.removeItem('filterByPrice');
            localStorage.removeItem('filterByRating')
            await dispatch({
                type: LOGOUT_SUCCESS
            });
            SuccessMessage("Вы вышли");
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'LOGOUT_FAIL'));
            await dispatch({
                type: LOGOUT_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'LOGOUT_FAIL');
            await dispatch(clearErrors());
        }
    };
};


export const forgot = (email) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: FORGOT_LOADING
            });
            const {data} = await $host.post(`api/v1/user/forgot-password`, {
                email: email
            });
            await dispatch({
                type: FORGOT_SUCCESS
            })
            SuccessMessage(data.message);
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'FORGOT_FAIL'));
            await dispatch({
                type: FORGOT_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'FORGOT_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const reset = (id, token, password, confirmPassword) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: RESET_LOADING
            });
            const {data, status, statusText} = await $host.patch(`api/v1/user/reset-password/${id}/${token}`, {
                password,
                confirmPassword
            });
            await dispatch({
                type: RESET_SUCCESS
            })
            await SuccessNotification(data.message, status, statusText, 'RESET_SUCCESS');
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'RESET_FAIL'));
            await dispatch({
                type: RESET_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'RESET_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const verifyAccount = (id, token, code) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: VERIFY_LOADING
            });
            const {data, status, statusText} = await $host.post(`api/v1/user/verify/${id}/${token}`, {
                currentCode: code
            });
            localStorage.setItem('token', data.token);
            await dispatch({
                type: VERIFY_SUCCESS
            })
            await SuccessNotification(data.message, status, statusText, 'VERIFY_SUCCESS');
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'VERIFY_FAIL'));
            await dispatch({
                type: VERIFY_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'VERIFY_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const google = (id, token) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GOOGLE_LOADING
            });
            const {data, status, statusText} = await $host.post(`api/v1/user/google/`, {
                id,
                token
            });
            localStorage.setItem('token', data.token);
            const user = jwt_decode(data.token);
            await dispatch({
                type: GOOGLE_SUCCESS,
                payload: {
                    token: data.token,
                    user: user
                }
            })
            await SuccessNotification(data.message, status, statusText, 'GOOGLE_SUCCESS');
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GOOGLE_FAIL'));
            await dispatch({
                type: GOOGLE_FAIL
            });
            await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'GOOGLE_FAIL');
            await dispatch(clearErrors());
        }
    }
}
