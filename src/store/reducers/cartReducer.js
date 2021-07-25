import { ADD_TO_CART_LOADING, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL, REMOVE_FROM_CART_LOADING, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_SUCCESS, SET_CART_LOADING, SET_CART_SUCCESS, SET_CART_FAIL, CART_RESET_LOADING, CART_RESET_SUCCESS, CART_RESET_FAIL } from './consts';

const initialState = {
    cartItems: [],
    cartTotalPrice: 0,
    loadingCart: false,
    loadingCartBtn: false
};

export const cartReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ADD_TO_CART_LOADING:
        case REMOVE_FROM_CART_LOADING:
            return {
                ...state,
                loadingCartBtn: true
            }
        case SET_CART_LOADING: 
        case CART_RESET_LOADING:
            return {
                ...state,
                loadingCart: true
            }
        case CART_RESET_SUCCESS: 
            return {
                ...state,
                loadingCart: false,
                cartItems: payload,
                cartTotalPrice: 0
            }
        case SET_CART_SUCCESS: 
            return {
                ...state,
                cartItems: payload.basket_device,
                cartTotalPrice: payload.total_price,
                loadingCart: false
            }
        case ADD_TO_CART_SUCCESS:
            const existItem = state.cartItems?.find(item => item.id === payload.id)
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.id === existItem.id ? payload : item),
                    loadingCartBtn: false
                }
            } else {
                return {
                    ...state,
                    cartItems: state.cartItems ? [...state.cartItems, payload] : [payload],
                    loadingCartBtn: false
                }
            }
        case REMOVE_FROM_CART_SUCCESS: 
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== payload)
            }
        case SET_CART_FAIL:
            return {
                ...state,
                cartItems: [],
                loadingCart: false
            }
        case ADD_TO_CART_FAIL:
        case REMOVE_FROM_CART_FAIL:
        case CART_RESET_FAIL:
            return {
                ...state,
                loadingCartBtn: false
            }
        default: 
            return state;
    }
};