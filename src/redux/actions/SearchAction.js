import { SET_SEARCH_QUERY, REMOVE_SEARCH_QUERY } from '../actionTypes';

export function setSearchQuery(payload) {
  return {
    type: SET_SEARCH_QUERY,
    payload: payload
  };
}

export function removeSearchQuery() {
  return {
    type: REMOVE_SEARCH_QUERY
  };
}
