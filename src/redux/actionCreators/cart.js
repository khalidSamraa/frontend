import {
  removeCartAction,
  addToCartErrorAction,
  addToUserCartAction,
  addToEnsembleCartAction,
  addToPublisherCartAction,
  addToInstitutionCartAction,
  getCartProductsStartAction,
  getCartProductsSuccessAction,
  getCartProductsFailedAction,
  removeFromUserCartAction,
  removeFromEnsembleCartAction,
  removeFromPublisherCartAction,
  clearUserCartAction,
  clearEnsembleCartAction,
  clearPublisherCartAction,
  clearInstitutionCartAction
} from '../actions/cart';

import Request from '../../utils/Request';

export const emptyCart = () => dispatch => {
  dispatch(removeCartAction());
};

export const clearAllCartItems = type => dispatch => {
  switch (type) {
    case 'user':
      dispatch(clearUserCartAction());
      break;
    case 'ensemble':
      dispatch(clearEnsembleCartAction());
      break;
    case 'publisher':
      dispatch(clearPublisherCartAction());
      break;
    case 'institution':
      dispatch(clearInstitutionCartAction());
      break;
  }
};

export const removeCartItem = (sid, cart, type) => dispatch => {
  const newCart = cart.filter(item => item.sid != sid);

  // console.log({ cart, newCart });
  // don't forget institution

  switch (type) {
    case 'user':
      dispatch(removeFromUserCartAction({ newCart, sid }));
      break;
    case 'ensemble':
      dispatch(removeFromEnsembleCartAction({ newCart, sid }));
      break;
    case 'publisher':
      dispatch(removeFromPublisherCartAction({ newCart, sid }));
      break;
  }
};

export const addToCart = (type, newScore, prevCart, callbacks) => dispatch => {
  const found = prevCart.filter(item => item.sid === newScore.sid);
  if (found[0]) {
    // item already exists
    callbacks.onFailed('Item Already Exists');
    dispatch(addToCartErrorAction('Score already in the cart'));
    return;
  }
  // don't forget institution

  let action, onSuccess;
  switch (type) {
    case 'user':
      action = addToUserCartAction;
      break;
    case 'ensemble':
      action = addToEnsembleCartAction;
      break;
    case 'publisher':
      action = addToPublisherCartAction;
      break;
    default:
      action = () => {};
  }
  if (callbacks.onSuccess) callbacks.onSuccess();
  dispatch(action(newScore));
};

export const getCartProducts = (cart, token) => dispatch => {
  dispatch(getCartProductsStartAction());

  const data = {
    scores: JSON.stringify(
      cart.map(item => ({
        sid: item.sid,
        start: item.start,
        is_lifetime: item.isLifeTime
      }))
    )
  };

  Request(
    'post',
    'get-cart-scores',
    { Authorization: 'Token ' + token },
    data,
    [],
    response => {
      dispatch(getCartProductsSuccessAction(response.data));
    },
    response => {
      dispatch(getCartProductsFailedAction(response.data));
    }
  );
};
