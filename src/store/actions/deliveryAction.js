import jwt_decode from 'jwt-decode';
import { ErrorNotification } from '../../components/notification/ErrorNotification';
import { SuccessMessage } from '../../components/notification/SuccessMessage';
import { $authHost } from '../../config/httpConfig';
import { ADD_TO_DELIVERY_LOADING, ADD_TO_DELIVERY_SUCCESS, SET_DELIVERY_LOADING, SET_DELIVERY_SUCCESS } from '../reducers/consts';
import { clearErrors, getErrors } from './errorAction';


export const addToDelivery = (formData, cartItems) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ADD_TO_DELIVERY_LOADING
            })
            const { id } = jwt_decode(localStorage.getItem('token'));
            const { data } = await $authHost.post(`api/v1/delivery/${id}`, formData)
            dispatch({
                type: ADD_TO_DELIVERY_SUCCESS,
                payload: data
            })
            localStorage.setItem('delivery', JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getDelivery = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_DELIVERY_LOADING
            });
            const { id } = jwt_decode(localStorage.getItem('token'));
            const { data } = await $authHost.get(`api/v1/delivery/${id}`);
            dispatch({
                type: SET_DELIVERY_SUCCESS,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    };
};