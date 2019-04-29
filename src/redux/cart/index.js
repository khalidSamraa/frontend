import { ADD_CART, UPDATE_CART, REMOVE_CART } from '../actionTypes';

function WriteStorage(data) {
  localStorage.setItem('books', JSON.stringify(data));
}

function GetStorage(name) {
  let items = JSON.parse(localStorage.getItem('books'));

  if (items === null || items === undefined || items === '') {
    return {
      count: 0,
      books: []
    };
  }

  for (let key in items) {
    if (key === name) {
      items = items[key];
    }
  }

  return items;
}

function RemoveStorage() {
  localStorage.removeItem('books');
}

const CartReducer = (state = GetStorage(), action) => {
  switch (action.type) {
    case ADD_CART:
      state = {
        count: 1,
        books: {
          ...action.payload
        }
      };
      WriteStorage(state);
      break;

    case UPDATE_CART:
      state = {
        count: GetStorage(),
        books: {
          ...action.payload
        }
      };
      WriteStorage(state);
      break;

    case REMOVE_CART:
      state = {
        count: 0,
        books: []
      };
      RemoveStorage(state);
      break;

    default:
      break;
  }
  return state;
};
export default CartReducer;
