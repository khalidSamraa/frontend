import { SET_SEARCH_QUERY, REMOVE_SEARCH_QUERY } from '../actionTypes';

const SearchReducer = (state = { query: '' }, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      state.query = action.payload;
      break;

    case REMOVE_SEARCH_QUERY:
      state = {
        query: ''
      };

    default:
      break;
  }
  return state;
};
export default SearchReducer;
