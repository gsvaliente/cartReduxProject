import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE,
} from './actions';

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map([]) };
  }

  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart); //creates a new instance to mutate
    const itemId = action.payload.id; //creates a variable for ID easier to use
    const item = newCart.get(itemId); //finds the item with .get
    const newItem = { ...item, amount: item.amount + 1 }; // edits the amount of item
    newCart.set(itemId, newItem); // edits the existing ID with the new value
    return { ...state, cart: newCart }; // returns the new cart state
  }

  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(
      action.payload.cart.map((item) => {
        return [item.id, item];
      })
    );

    return { ...state, loading: false, cart: newCart };
  }

  throw new Error(`no matching action type: ${action.type}`);
};
