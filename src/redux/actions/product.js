import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT_SUCCESS,
  CHANGE_ACTIVE_PRODUCT
} from '../actionTypes';

export const getProductsStart = () => ({
  type: GET_PRODUCTS_START
});

export const getProductsSuccess = payload => ({
  type: GET_PRODUCTS_SUCCESS,
  payload
});

export const getProductsFailed = payload => ({
  type: GET_PRODUCTS_FAILED,
  payload
});

export const getProductSuccess = payload => ({
  type: GET_PRODUCT_SUCCESS,
  payload
});

export const changeActiveProduct = payload => ({
  type: CHANGE_ACTIVE_PRODUCT,
  payload
});
