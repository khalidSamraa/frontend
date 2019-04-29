import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducer
import SessionReducer from './account/session/';
import TokenReducer from './account/token/';
import EnsembleReducer from './account/ensemble/';
import InstitutionReducer from './account/institution/';
import PublisherReducer from './account/publisher/';
import SearchReducer from './reducers/SearchReducer.js';
import TrialReducer from './reducers/TrialReducer.js';
import ActiveLanguageReducer from './reducers/ActiveLanguageReducer.js';
import ActiveCurrencyReducer from './reducers/ActiveCurrencyReducer.js';
import ActiveLocationReducer from './reducers/ActiveLocationReducer.js';
import LanguageReducer from './reducers/LanguageReducer.js';
import ActiveIndexReducer from './reducers/ActiveIndexReducer.js';
import PermissionsReducer from './reducers/PermissionsReducer.js';
import InterestsReducer from './reducers/InterestsReducer.js';
import * as profilePageReducers from './reducers/profilePageReducers';
import * as addressesReducer from './reducers/profilePageReducers/addressesReducer';
import Product from './reducers/product';
import * as paymentManagementReducer from './reducers/profilePageReducers/paymentManagementReducer';
import * as contactsReducers from './reducers/profilePageReducers/contactsReducers';
import * as orderHistoryReducers from './reducers/profilePageReducers/orderHistoryReducers';
import * as homeFiltersReducer from './reducers/homeFiltersReducer';
import * as dashBoardReducers from './reducers/dashBoardReducers';
import cart from './reducers/cart';

import CartReducer from './cart';

const allReducers = combineReducers({
  SessionReducer,
  TokenReducer,
  EnsembleReducer,
  InstitutionReducer,
  PublisherReducer,
  SearchReducer,
  TrialReducer,
  ActiveLanguageReducer,
  ActiveCurrencyReducer,
  ActiveLocationReducer,
  LanguageReducer,
  ActiveIndexReducer,
  PermissionsReducer,
  InterestsReducer,
  cart,
  CartReducer,
  Product,
  ...profilePageReducers,
  ...addressesReducer,
  ...paymentManagementReducer,
  ...contactsReducers,
  ...orderHistoryReducers,
  ...homeFiltersReducer,
  ...dashBoardReducers
});

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const allStoreEnhancers = compose(
  applyMiddleware(thunk)
  // window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(allReducers, persistedState, allStoreEnhancers);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
