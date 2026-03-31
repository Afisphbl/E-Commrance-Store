import { createContext, useReducer } from "react";
import { API_BASE_URL } from "../utils/constant";
import { currencyCalculator, formatPrice } from "../utils/helper";

export const CartContext = createContext();

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  shipping: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = [...state.items, action.payload];
      const sumTotalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const sumTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );

      const shippingCost = sumTotalAmount > 100 ? 0 : 10;

      return {
        ...state,
        items: updatedItems,
        totalQuantity: sumTotalQuantity,
        totalAmount: sumTotalAmount,
        shipping: shippingCost,
      };
    }

    case "ADD_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: item.quantity + action.payload.qtn,
              totalPrice:
                item.totalPrice + item.currentPrice * action.payload.qtn,
            }
          : item,
      );
      const sumTotalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const sumTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      return {
        ...state,
        items: updatedItems,
        totalQuantity: sumTotalQuantity,
        totalAmount: sumTotalAmount,
      };
    }

    case "SUB_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity - action.payload.qtn),
              totalPrice:
                item.totalPrice - item.currentPrice * action.payload.qtn,
            }
          : item,
      );

      const sumTotalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const sumTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );

      if (sumTotalQuantity === 0) {
        return {
          ...state,
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
        };
      }

      if (updatedItems.find((item) => item.quantity === 0)) {
        const filteredItems = updatedItems.filter((item) => item.quantity > 0);
        return {
          ...state,
          items: filteredItems,
          totalQuantity: sumTotalQuantity,
          totalAmount: sumTotalAmount,
        };
      }

      return {
        ...state,
        items: updatedItems,
        totalQuantity: sumTotalQuantity,
        totalAmount: sumTotalAmount,
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload,
      );
      const sumTotalQuantity = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const sumTotalAmount = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );

      return {
        ...state,
        items: updatedItems,
        totalQuantity: sumTotalQuantity,
        totalAmount: sumTotalAmount,
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        shipping: 0,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  async function addItemToCart(id, qtn = 1) {
    const existingItem = cartState.items.find((item) => item.id === id);

    if (existingItem) {
      dispatch({
        type: "ADD_QUANTITY",
        payload: {
          id,
          qtn,
        },
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const discountedPrice = currencyCalculator(
        data.price,
        data.discountPercentage ?? 0,
      );

      const product = {
        id: data.id,
        image: data.images[0] ?? "",
        currentPrice: discountedPrice,
        title: data.title,
        quantity: qtn || 1,
        totalPrice: discountedPrice * qtn,
      };
      dispatch({ type: "ADD_ITEM", payload: product });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  }

  function subQuantityFromCart(id, qtn = 1) {
    dispatch({ type: "SUB_QUANTITY", payload: { id, qtn } });
  }

  function removeItemFromCart(id) {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const value = {
    cartState,
    addItemToCart,
    subQuantityFromCart,
    removeItemFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
