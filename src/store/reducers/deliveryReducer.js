import { ADD_TO_CART_LOADING, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL, REMOVE_FROM_CART_LOADING, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_SUCCESS, SET_CART_LOADING, SET_CART_SUCCESS, SET_CART_FAIL, ADD_TO_DELIVERY_LOADING, ADD_TO_DELIVERY_SUCCESS, ADD_TO_DELIVERY_FAIL, SET_DELIVERY_LOADING, SET_DELIVERY_SUCCESS, SET_DELIVERY_FAIL } from './consts';

const initialState = {
    delivery: null,
    loadingDelivery: false,
    loadingDeliveryBtn: false
};

export const deliveryReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ADD_TO_DELIVERY_LOADING:
            return {
                ...state,
                loadingDeliveryBtn: true
            }
        case SET_DELIVERY_LOADING:
            return {
                ...state,
                loadingDelivery: true
            }
        case SET_DELIVERY_SUCCESS:
            return {
                ...state,
                delivery: payload,
                loadingDelivery: false
            }
        case ADD_TO_DELIVERY_SUCCESS:
            return {
                ...state,
                loadingDeliveryBtn: false,
                delivery: payload
            }
        case ADD_TO_DELIVERY_FAIL:
        case SET_DELIVERY_FAIL:
            return {
                ...state,
                loadingDelivery: false,
                loadingCartBtn: false
            }
        default: 
            return state;
    }
};