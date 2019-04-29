import {
  REMOVE_CART,
  ADD_TO_USER_CART,
  ADD_TO_ENSEMBLE_CART,
  ADD_TO_PUBLISHER_CART,
  ADD_TO_INSTITUTION_CART,
  ADD_TO_CART_ERROR,
  GET_CART_PRODUCTS,
  GET_CART_PRODUCTS_SUCCESS,
  GET_CART_PRODUCTS_FAILED,
  REMOVE_FROM_USER_CART,
  REMOVE_FROM_ENSEMBLE_CART,
  REMOVE_FROM_PUBLISHER_CART,
  SHOW_CHECKOUT_SCREEN,
  HIDE_CHECKOUT_SCREEN,
  CLEAR_USER_CART,
  CLEAR_ENSEMBLE_CART,
  CLEAR_PUBLISHER_CART,
  CLEAR_INSTITUTION_CART
} from '../actionTypes';

export const removeCartAction = () => ({
  type: REMOVE_CART
});

export const addToUserCartAction = payload => ({
  type: ADD_TO_USER_CART,
  payload
});

export const addToEnsembleCartAction = payload => ({
  type: ADD_TO_ENSEMBLE_CART,
  payload
});

export const addToPublisherCartAction = payload => ({
  type: ADD_TO_PUBLISHER_CART,
  payload
});

export const addToInstitutionCartAction = payload => ({
  type: ADD_TO_INSTITUTION_CART,
  payload
});

export const addToCartErrorAction = payload => ({
  type: ADD_TO_CART_ERROR,
  payload
});

export const getCartProductsStartAction = () => ({
  type: GET_CART_PRODUCTS
});

export const getCartProductsSuccessAction = payload => ({
  type: GET_CART_PRODUCTS_SUCCESS,
  payload
});

export const getCartProductsFailedAction = payload => ({
  type: GET_CART_PRODUCTS_FAILED,
  payload
});

export const removeFromUserCartAction = payload => ({
  type: REMOVE_FROM_USER_CART,
  payload
});

export const removeFromEnsembleCartAction = payload => ({
  type: REMOVE_FROM_ENSEMBLE_CART,
  payload
});

export const removeFromPublisherCartAction = payload => ({
  type: REMOVE_FROM_PUBLISHER_CART,
  payload
});

export const showCheckoutScreen = () => ({
  type: SHOW_CHECKOUT_SCREEN
});

export const hideCheckoutScreen = () => ({
  type: HIDE_CHECKOUT_SCREEN
});

export const clearUserCartAction = () => ({
  type: CLEAR_USER_CART
});

export const clearEnsembleCartAction = () => ({
  type: CLEAR_ENSEMBLE_CART
});

export const clearPublisherCartAction = () => ({
  type: CLEAR_PUBLISHER_CART
});

export const clearInstitutionCartAction = () => ({
  type: CLEAR_INSTITUTION_CART
});
