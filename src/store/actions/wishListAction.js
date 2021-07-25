import jwt_decode from 'jwt-decode';
import { ErrorNotification } from '../../components/notification/ErrorNotification';
import { SuccessMessage } from '../../components/notification/SuccessMessage';
import { $authHost } from '../../config/httpConfig';
import { ADD_TO_CART_FAIL, ADD_TO_CART_LOADING, ADD_TO_CART_SUCCESS, ADD_TO_WISHLIST_FAIL, ADD_TO_WISHLIST_LOADING, ADD_TO_WISHLIST_SUCCESS, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_LOADING, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_WISHLIST_LOADING, REMOVE_FROM_WISHLIST_SUCCESS, SET_CART_FAIL, SET_CART_LOADING, SET_CART_SUCCESS, SET_WISHLIST_FAIL, SET_WISHLIST_LOADING, SET_WISHLIST_SUCCESS } from '../reducers/consts';
import { clearErrors, getErrors } from './errorAction';


export const getWishList = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_WISHLIST_LOADING
            })
            const user = jwt_decode(localStorage.getItem('token'));
            const { data } = await $authHost.get(`api/v1/wishlist/${user.id}`);
            dispatch({
                type: SET_WISHLIST_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: SET_WISHLIST_FAIL
            })
        }
    }
};

export const addToWishList = (id, qty=1) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADD_TO_WISHLIST_LOADING
            })
            const { data: deviceData } = await $authHost.get(`api/v1/device/${id}`);
            const wishListItem = {
                id: deviceData.device.id,
                name: deviceData.device.name,
                img: deviceData.device.img,
                rating: deviceData.device.rating,
                description: deviceData.device.description
            };
            const token = localStorage.getItem('token');
            const user = jwt_decode(token);
            const { data: wishListData } = await $authHost.post(`api/v1/wishlist/`, {
                wishListItem,
                userId: user.id
            });
            dispatch({
                type: ADD_TO_WISHLIST_SUCCESS,
                payload: wishListData
            })
            localStorage.setItem('cart', JSON.stringify(getState().cart.cartItem))
        } catch (error) {
            // await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'ADD_TO_CART_FAIL'));
            await dispatch({
                type: ADD_TO_WISHLIST_FAIL
            });
            // await ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'ADD_TO_CART_FAIL', error.response.data);
            await dispatch(clearErrors());
            console.log(error);
        };
    };
};

export const removeFromWishList = (id, name) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REMOVE_FROM_WISHLIST_LOADING
            })
            const { data } = await $authHost.delete(`api/v1/wishlist/${id}`);
            dispatch({
                type: REMOVE_FROM_WISHLIST_SUCCESS,
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