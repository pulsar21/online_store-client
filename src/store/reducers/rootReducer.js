import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { errorReducer } from "./errorReducer";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { typeReducer } from "./typeReducer";
import { brandReducer } from "./brandReducer";
import { deviceReducer } from "./deviceReducer";
import { notificationReducer } from "./notificationReducer";
import { cartReducer } from "./cartReducer";
import { deliveryReducer } from './deliveryReducer';
import { wishListReducer } from "./wishListReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    error: errorReducer,
    admin: adminReducer,
    type: typeReducer,
    brand: brandReducer,
    device: deviceReducer,
    notification: notificationReducer,
    cart: cartReducer,
    delivery: deliveryReducer,
    wishlist: wishListReducer
});
