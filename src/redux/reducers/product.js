import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT_SUCCESS,
  CHANGE_ACTIVE_PRODUCT
} from '../actionTypes';

const initialState = {
  loading: false,
  products: [],
  similarScores: [],
  activeProduct: [{}],
  isError: false,
  count: 0,
  nextLink: '',
  prevLink: '',
  currentPage: 1,
  numberPage: 1
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_START:
      return {
        ...state,
        loading: true
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.results,
        isError: false,
        count: payload.number_result,
        nextLink: payload.next_url,
        prevLink: payload.before_url,
        currentPage: payload.current_page,
        numberPage: payload.number_page,
        similarCount: 0
      };

    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
        isError: true
      };

    case GET_PRODUCT_SUCCESS:
      const activeProduct = payload.response.results.filter(
        result => payload.sid === result.sid
      );

      return {
        ...state,
        loading: false,
        similarCount: payload.response.count,
        similarProducts: payload.response.results,
        activeProduct
      };

    case CHANGE_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: state.similarProducts.filter(
          product => payload === product.sid
        )
      };

    default:
      return state;
  }
};
