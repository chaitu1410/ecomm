import axios from 'axios';

import actionTypes from '../actionTypes';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

        const { data } = await axios.get("/api/products/");

        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}