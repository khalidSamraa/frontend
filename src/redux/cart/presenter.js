import * as actionTypes from '../actionTypes';

export const ADD_CART = payload => ({
  type: actionTypes.ADD_CART,
  payload: payload
});

export const UPDATE_CART = payload => ({
  type: actionTypes.UPDATE_CART,
  payload: payload
});

export const REMOVE_CART = () => ({
  type: actionTypes.REMOVE_CART,
  payload: {}
});
