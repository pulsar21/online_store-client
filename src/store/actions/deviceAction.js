import { ErrorNotification } from "../../components/notification/ErrorNotification";
import { SuccessMessage } from "../../components/notification/SuccessMessage";
import { $authHost } from "../../config/httpConfig";
import { convertDate } from "../../services/convertDate";
import { 
    ADD_DEVICE_FAIL, ADD_DEVICE_LOADING, ADD_DEVICE_SUCCESS, DELETE_DEVICE_FAIL, 
    DELETE_DEVICE_LOADING, DELETE_DEVICE_SUCCESS, EDIT_DEVICE_FAIL, EDIT_DEVICE_LOADING, 
    EDIT_DEVICE_SUCCESS, FILTER_PRICE_RANGE_FAIL, FILTER_PRICE_RANGE_LOADING, FILTER_PRICE_RANGE_SUCCESS, FILTER_RATING_RANGE_FAIL, FILTER_RATING_RANGE_LOADING, FILTER_RATING_RANGE_SUCCESS, GET_DEVICES_FAIL, GET_DEVICES_LOADING, GET_DEVICES_SUCCESS, 
    GET_ONE_DEVICE_FAIL, GET_ONE_DEVICE_LOADING, GET_ONE_DEVICE_SUCCESS, SET_CURRENT_PAGE, 
    SET_CURRENT_PAGE_DEVICE_FAIL, 
    SET_CURRENT_PAGE_DEVICE_LOADING, 
    SET_CURRENT_PAGE_DEVICE_SUCCESS, 
    SET_CURRENT_PAGE_FAIL, SET_CURRENT_PAGE_LOADING, SET_CURRENT_PAGE_SUCCESS, SET_SEARCH_DEVICE_FAIL, 
    SET_SEARCH_DEVICE_LOADING, SET_SEARCH_DEVICE_SUCCESS 
} from "../reducers/consts";
import { clearErrors, getErrors } from "./errorAction";
import { addNotification } from "./notificationAction";

export const getDevices = (typeId, brandId, page, limit=8, sort) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_DEVICES_LOADING
            })
            
            let {data} = await $authHost.get(`api/v1/device/`, {
                params: {
                    typeId,
                    brandId,
                    page,
                    limit,
                    sort
                }
            });
            convertDate(data?.devices?.rows);
            await dispatch({
                type: GET_DEVICES_SUCCESS,
                payload: data.devices
            })
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_DEVICES_FAIL'));
            await dispatch({
                type: GET_DEVICES_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};


// export const getLaptops = () => {
//     return async (dispatch) => {
//         try {
//             await dispatch({
//                 type: GET_DEVICES_LOADING
//             })
            
//             let {data} = await $authHost.get(`api/v1/device/`);
//             convertDate(data?.devices?.rows);
//             await dispatch({
//                 type: GET_DEVICES_SUCCESS,
//                 payload: data.devices
//             })
//         } catch(error) {
//             await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_DEVICES_FAIL'));
//             await dispatch({
//                 type: GET_DEVICES_FAIL
//             });
//             await dispatch(clearErrors());
//         };
//     };
// };


export const getOneDevice = (id) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_ONE_DEVICE_LOADING
            })
            const {data} = await $authHost.get(`api/v1/device/${id}`);
            await dispatch({
                type: GET_ONE_DEVICE_SUCCESS,
                payload: data.device
            });
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'GET_ONE_DEVICE_FAIL'));
            await dispatch({
                type: GET_ONE_DEVICE_FAIL
            });
            await dispatch(clearErrors());
        }
    };  
}

export const setCurrentPageDevice = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CURRENT_PAGE_DEVICE_LOADING,
            })
            await dispatch({
                type: SET_CURRENT_PAGE_DEVICE_SUCCESS,
                payload: page
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_CURRENT_PAGE_DEVICE_FAIL'));
            await dispatch({
                type: SET_CURRENT_PAGE_DEVICE_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}


export const searchDevices = (searchName, typeId, brandId) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SEARCH_DEVICE_LOADING
            })
            const {data} = await $authHost.get(`api/v1/device/search?search=${searchName}`, {
                params: {
                    typeId,
                    brandId
                }
            })
            convertDate(data?.devices);
            await dispatch({
                type: SET_SEARCH_DEVICE_SUCCESS,
                payload: data.devices
            })
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'SET_SEARCH_DEVICE_FAIL'));
            await dispatch({
                type: SET_SEARCH_DEVICE_FAIL
            });
            await dispatch(clearErrors());
        }
    }
}

export const filterPriceRangeDevices = (priceMin, priceMax, brandId) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: FILTER_PRICE_RANGE_LOADING
            })
            console.log(priceMin, priceMax)
            const {data} = await $authHost.get(`api/v1/device/filter-price-range-devices`, {
                params: {
                    priceMin: priceMin,
                    priceMax: priceMax,
                    brandId: brandId
                }
            });
            await dispatch({
                type: FILTER_PRICE_RANGE_SUCCESS,
                payload: {
                    rows: data?.devices,
                    count: data?.devices.length,
                }
            })
            
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'FILTER_PRICE_RANGE_FAIL'));
            await dispatch({
                type: FILTER_PRICE_RANGE_FAIL
            });
            ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'FILTER_PRICE_RANGE_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const filterRatingRangeDevices = (ratingMin, ratingMax, brandId) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: FILTER_RATING_RANGE_LOADING
            })
            const {data} = await $authHost.get(`api/v1/device/filter-rating-range-devices`, {
                params: {
                    ratingMin: ratingMin,
                    ratingMax: ratingMax,
                    brandId: brandId
                }
            });
            debugger
            await dispatch({
                type: FILTER_RATING_RANGE_SUCCESS,
                payload: {
                    rows: data?.devices,
                    count: data?.devices.length,
                }
            })
            
        } catch (error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'FILTER_RATING_RANGE_FAIL'));
            await dispatch({
                type: FILTER_RATING_RANGE_FAIL
            });
            ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'FILTER_PRICE_RANGE_FAIL', error.response.data);
            await dispatch(clearErrors());
        }
    }
}

export const addDevice = (device) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: ADD_DEVICE_LOADING
            })
            const {data} = await $authHost.post(`api/v1/device/`, device);
            await dispatch(addNotification(data.message));
            convertDate([data.device]);
            await dispatch({
                type: ADD_DEVICE_SUCCESS,
                payload: data.device
            })
            SuccessMessage(data.message)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'ADD_DEVICE_FAIL'));
            await dispatch({
                type: ADD_DEVICE_FAIL
            });
            ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_DEVICE_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};

export const editDevice = (id, name, price, count, rating, description) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: EDIT_DEVICE_LOADING
            })
            const {data} = await $authHost.put(`api/v1/device/${id}`, {
                name,
                price,
                count,
                rating,
                description
            });
            await dispatch(addNotification(data.message));
            convertDate([data?.device])
            await dispatch({
                type: EDIT_DEVICE_SUCCESS,
                payload: data.device
            })
            SuccessMessage(data.message)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_DEVICE_FAIL'));
            await dispatch({
                type: EDIT_DEVICE_FAIL
            });
            ErrorNotification(error.response.data.message, error.response.status, error.response.statusText, 'EDIT_DEVICE_FAIL', error.response.data);
            await dispatch(clearErrors());
        };
    };
};

export const deleteDevice = (id, name) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: DELETE_DEVICE_LOADING
            })
            const {data} = await $authHost.delete(`api/v1/device/${id}`);
            await dispatch(addNotification(`${name} устройтсво был удалён!`));
            await dispatch({
                type: DELETE_DEVICE_SUCCESS,
                payload: data.id
            })
            SuccessMessage(`${name} устройтсво был удалён!`)
        } catch(error) {
            await dispatch(getErrors(error.response.data.message, error.response.status, error.response.statusText, 'DELETE_DEVICE_FAIL'));
            await dispatch({
                type: DELETE_DEVICE_FAIL
            });
            await dispatch(clearErrors());
        };
    };
};


