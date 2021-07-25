import { CLEAR_ERRORS, GET_ERRORS } from "./consts";

const initialState = {
    msg: null,
    status: null,
    statusText: null,
    id: null
};


export const errorReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case GET_ERRORS:
            return {
                msg: payload.msg,
                status: payload.status,
                statusText: payload.statusText,
                id: payload.id
            };
        case CLEAR_ERRORS:
            return {
                msg: null,
                status: null,
                statusText: null,
                id: null
            };
        default: 
            return state;
    };
};