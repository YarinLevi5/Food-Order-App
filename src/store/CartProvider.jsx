import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const actionsEnum = {
  ADD_CART_ITEM: "ADD_CART_ITEM",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  CLEAR_CART_ITEMS: "CLEAR_CART_ITEMS",
};

const cartReducer = (state, action) => {
  if (action.type === actionsEnum.ADD_CART_ITEM) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems;

    const existingCartItem = state.items[existItemIndex];
    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === actionsEnum.REMOVE_CART_ITEM) {
    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems = [];

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === actionsEnum.CLEAR_CART_ITEMS) {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: actionsEnum.ADD_CART_ITEM, item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: actionsEnum.REMOVE_CART_ITEM, id });
  };

  const clearCartItemsHandler = () => {
    dispatchCartAction({ type: actionsEnum.CLEAR_CART_ITEMS });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
