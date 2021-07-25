import jwt_decode from 'jwt-decode';
import { ErrorNotification } from '../../components/notification/ErrorNotification';
import { SuccessMessage } from '../../components/notification/SuccessMessage';
import { $authHost } from '../../config/httpConfig';
import { ADD_TO_CART_FAIL, ADD_TO_CART_LOADING, ADD_TO_CART_SUCCESS, CART_RESET_LOADING, CART_RESET_SUCCESS, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_LOADING, REMOVE_FROM_CART_SUCCESS, SET_CART_FAIL, SET_CART_LOADING, SET_CART_SUCCESS } from '../reducers/consts';
import { clearErrors, getErrors } from './errorAction';


export const getCart = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_CART_LOADING
            })
            const user = jwt_decode(localStorage.getItem('token'));
            const { data } = await $authHost.get(`api/v1/basket/${user.id}`);

            dispatch({
                type: SET_CART_SUCCESS,
                payload: {
                    basket_device: data.basket_device,
                    total_price: data.total_price
                }
            })
        } catch (error) {
            dispatch({
                type: SET_CART_FAIL
            })
        }
    }
};

export const addToCart = (id, qty=1) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADD_TO_CART_LOADING
            })
            const { data: deviceData } = await $authHost.get(`api/v1/device/${id}`);
            const totalPrice = qty * deviceData.device.price;
            const cartItem = {
                id: deviceData.device.id,
                name: deviceData.device.name,
                img: deviceData.device.img,
                price: deviceData.device.price,
                count: deviceData.device.count,
                rating: deviceData.device.rating,
                quantity: qty,
                totalPrice: totalPrice
            };
            const token = localStorage.getItem('token');
            const user = jwt_decode(token);
            const { data: basketData } = await $authHost.post(`api/v1/basket/`, {
                cartItem,
                userId: user.id
            });
            dispatch({
                type: ADD_TO_CART_SUCCESS,
                payload: basketData
            })
            localStorage.setItem('cart', JSON.stringify(getState().cart.cartItem))
        } catch (error) {
            // await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'ADD_TO_CART_FAIL'));
            await dispatch({
                type: ADD_TO_CART_FAIL
            });
            // await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'ADD_TO_CART_FAIL', error.response.data);
            await dispatch(clearErrors());
            console.log(error);
        };
    };
};

export const removeFromCart = (id, name) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REMOVE_FROM_CART_LOADING
            })
            const { data } = await $authHost.delete(`api/v1/basket/${id}`);
            dispatch({
                type: REMOVE_FROM_CART_SUCCESS,
                payload: data.id
            })
            SuccessMessage(`${name} продукт был удалён из корзины!`);
        } catch (error) {
            // await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'REMOVE_FROM_CART_FAIL'));
            // await dispatch({
            //     type: REMOVE_FROM_CART_FAIL
            // });
            // await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'REMOVE_FROM_CART_FAIL', error.response.data);
            // await dispatch(clearErrors());
        };
    };
};


export const resetCart = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CART_RESET_LOADING
            })
            const { data } = await $authHost.delete(`api/v1/basket/`);
            dispatch({
                type: CART_RESET_SUCCESS,
                payload: data.cartItems
            })
            SuccessMessage(`${data.message}`);
        } catch (error) {
            // await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'REMOVE_FROM_CART_FAIL'));
            // await dispatch({
            //     type: REMOVE_FROM_CART_FAIL
            // });
            // await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'REMOVE_FROM_CART_FAIL', error.response.data);
            // await dispatch(clearErrors());
        };
    };
};