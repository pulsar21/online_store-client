import { ADD_TO_WISHLIST_FAIL, ADD_TO_WISHLIST_LOADING, ADD_TO_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAIL, REMOVE_FROM_WISHLIST_LOADING, REMOVE_FROM_WISHLIST_SUCCESS, SET_WISHLIST_FAIL, SET_WISHLIST_LOADING, SET_WISHLIST_SUCCESS } from "./consts";

const initialState = {
    wishListItems: [],
    loadingWishList: false,
    loadingWishListBtn: false
};

export const wishListReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ADD_TO_WISHLIST_LOADING:
        case REMOVE_FROM_WISHLIST_LOADING:
            return {
                ...state,
                loadingWishListBtn: true
            }
        case SET_WISHLIST_LOADING: 
            return {
                ...state,
                loadingWishList: true
            }
        case SET_WISHLIST_SUCCESS: 
            return {
                ...state,
                wishListItems: payload,
                loadingWishList: false
            }
        case ADD_TO_WISHLIST_SUCCESS:
            const existItem = state.wishListItems?.find(item => item.id === payload.id)
            if(existItem) {
                return {
                    ...state,
                    wishListItems: state.wishListItems.map(item => item.id === existItem.id ? payload : item),
                    loadingWishListBtn: false
                }
            } else {
                return {
                    ...state,
                    wishListItems: state.wishListItems ? [...state.wishListItems, payload] : [payload],
                    loadingWishListBtn: false
                }
            }
        case REMOVE_FROM_WISHLIST_SUCCESS: 
            return {
                ...state,
                wishListItems: state.wishListItems.filter(item => item.id !== payload)
            }
        case SET_WISHLIST_FAIL:
            return {
                ...state,
                wishListItems: [],
                loadingWishList: false
            }
        case ADD_TO_WISHLIST_FAIL:
        case REMOVE_FROM_WISHLIST_FAIL:
            return {
                ...state,
                loadingWishListBtn: false
            }
        default: 
            return state;
    }
};