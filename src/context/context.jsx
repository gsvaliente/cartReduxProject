import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE,
} from '../actions';
import { reducer } from '../reducer';
import { getTotals } from '../utils';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map([]),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: REMOVE,
      payload: { id },
    });
  };

  const increase = (id) => {
    dispatch({
      type: INCREASE,
      payload: { id },
    });
  };

  const decrease = (id) => {
    dispatch({
      type: DECREASE,
      payload: { id },
    });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const res = await fetch(url);
    const cart = await res.json();

    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
