import { CLEAR_ERRORS, GET_ERRORS } from "../reducers/consts";

export const getErrors = (msg, status, statusText, id=null) => {
    return async (dispatch) => {
        await dispatch({
            type: GET_ERRORS,
            payload: {msg, status, statusText, id}
        });
    };
};

export const clearErrors = () => {
    return async (dispatch) => {
        await dispatch({
            type: CLEAR_ERRORS
        });
    };
};