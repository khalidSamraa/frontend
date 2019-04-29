import { removeSearchQuery } from '../actions/SearchAction';

export const clearSearchQuery = () => dispatch => {
  dispatch(removeSearchQuery);
};
