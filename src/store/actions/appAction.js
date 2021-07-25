import { INITIALIZE_APP_FAIL, INITIALIZE_APP_LOADING, INITIALIZE_APP_SUCCESS, SET_PAGE_TRANSITION_PROGRESS_BAR_SUCCESS } from "../reducers/consts";
import { auth } from "./userAction";

export const initializeApp = () => {
    return async(dispatch) => {
        try {
            await dispatch({
                type: INITIALIZE_APP_LOADING
            })
            await dispatch(auth());
            await dispatch({
                type: INITIALIZE_APP_SUCCESS,
                
            });
        } catch (error) {
            await dispatch({    
                type: INITIALIZE_APP_FAIL
            });
        };
    };
};

export const setPageTranstitonProgressBar = (progress) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_PAGE_TRANSITION_PROGRESS_BAR_SUCCESS,
                payload: progress
            })
        } catch (error) {
            console.log(error);
        }
    }
} 