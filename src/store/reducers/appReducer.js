import { INITIALIZE_APP_FAIL, INITIALIZE_APP_LOADING, INITIALIZE_APP_SUCCESS, SET_PAGE_TRANSITION_PROGRESS_BAR_FAIL, SET_PAGE_TRANSITION_PROGRESS_BAR_LOADING, SET_PAGE_TRANSITION_PROGRESS_BAR_SUCCESS } from "./consts";

const initialState = {
    initialized: false,
    progress: 0
};


export const appReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case INITIALIZE_APP_LOADING:
            return {
                ...state,
                initialized: false
            }
        case INITIALIZE_APP_SUCCESS:
            return {
               ...state,
               initialized: true
            };
        case SET_PAGE_TRANSITION_PROGRESS_BAR_SUCCESS:
            return {
                ...state,
                progress: payload
            }
        case INITIALIZE_APP_FAIL:
            return {
                ...state,
                initialized: false
            }
        default: 
            return state;
    };
};