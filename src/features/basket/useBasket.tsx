import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Product } from '../product/product.types';

type BasketItem = {
  id: number;
  quantity: number;
  product: Product;
};

type ClearAction = {
  type: 'CLEAR';
};
type AddProductAction = {
  type: 'ADD_PRODUCT';
  product: Product;
};
type RemoveProductAction = {
  type: 'REMOVE_PRODUCT';
  productId: number;
};
type RemoveProductOnceAction = {
  type: 'REMOVE_PRODUCT_ONCE';
  productId: number;
};

type BasketAction =
  | ClearAction
  | AddProductAction
  | RemoveProductAction
  | RemoveProductOnceAction;

function basketReducer(state: BasketItem[], action: BasketAction) {
  switch (action.type) {
    case 'CLEAR':
      return [];

    case 'ADD_PRODUCT': {
      const isInBasket = state.some(
        item => item.product.id === action.product.id
      );

      return isInBasket
        ? state.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : state.concat({
            id: Date.now(),
            quantity: 1,
            product: action.product,
          });
    }

    case 'REMOVE_PRODUCT_ONCE': {
      const isInBasket = state.some(
        item => item.product.id === action.productId
      );

      return isInBasket
        ? state.map(item =>
            item.product.id === action.productId
              ? {
                  ...item,
                  quantity:
                    item.quantity > 1 ? item.quantity - 1 : item.quantity,
                }
              : item
          )
        : state;
    }

    case 'REMOVE_PRODUCT': {
      return state.filter(item => item.product.id !== action.productId);
    }

    default:
      return state;
  }
}

export const getBasketTotal = (basket: BasketItem[]) =>
  basket.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

const BasketCtx = createContext<BasketItem[]>([]);
const DispatchBasketCtx = createContext<React.Dispatch<BasketAction>>(
  null as any
);

const LOCAL_STORAGE_KEY = 'basket';

export const BasketCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(basketReducer, [], initialValue => {
    const persistedValue = localStorage.getItem(LOCAL_STORAGE_KEY);

    return persistedValue ? JSON.parse(persistedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <DispatchBasketCtx.Provider value={dispatch}>
      <BasketCtx.Provider value={state}>{children}</BasketCtx.Provider>
    </DispatchBasketCtx.Provider>
  );
};

export const useBasketDispatch = () => useContext(DispatchBasketCtx);
export const useBasket = () => useContext(BasketCtx);
