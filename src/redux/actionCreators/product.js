import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
  getProductSuccess,
  changeActiveProduct as changeActiveProductAction
} from '../actions/product';

import { RemoveUserSession } from '../account/session/presenter';
import { RemoveInstitutionSession } from '../account/institution/presenter.js';
import { RemoveToken } from '../account/token/presenter.js';
import { RemoveEnsembleSession } from '../account/ensemble/presenter.js';
import { UpdatedCurrency } from '../actions/ActiveCurrencyAction';

import Request from '../../utils/Request';

export const getProducts = data => dispatch => {
  dispatch(getProductsStart());
  Request(
    'get',
    'get-scores',
    {},
    data,
    [],
    response => {
      if (response && response.data) {
        dispatch(getProductsSuccess(response.data));
        dispatch(UpdatedCurrency(false));
      }
    },
    response => {
      dispatch(getProductsFailed(response.data));
    }
  );
};

export const getProduct = (data, token) => dispatch => {
  Request(
    'get',
    'get-score',
    { Authorization: 'Token ' + token },
    data,
    [],
    response => {
      dispatch(getProductSuccess({ response: response.data, sid: data.q }));
    },
    response => {
      dispatch(getProductsFailed(response.data));
      dispatch(RemoveUserSession());
      dispatch(RemoveInstitutionSession());
      dispatch(RemoveEnsembleSession());
      dispatch(RemoveToken());
      window.history.push('/');
    }
  );
};

export const changeActiveProduct = data => dispatch => {
  dispatch(changeActiveProductAction(data));
};
