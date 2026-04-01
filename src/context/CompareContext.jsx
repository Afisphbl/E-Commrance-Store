import { createContext, useReducer } from "react";

export const CompareContext = createContext();

const initialCompareState = {
  compareproducts: [],
};

const compareReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_COMPARE": {
      const isAlreadyInCompare = state.compareproducts.some(
        (item) => item.id === action.payload.id,
      );
      if (isAlreadyInCompare) {
        return {
          ...state,
          compareproducts: state.compareproducts.filter(
            (item) => item.id !== action.payload.id,
          ),
        };
      }

      if (state.compareproducts.length >= 4) {
        alert("You can only compare up to 4 products.");
        return state;
      }
      return {
        ...state,
        compareproducts: [...state.compareproducts, action.payload],
      };
    }

    case "REMOVE_FROM_COMPARE": {
      return {
        ...state,
        compareproducts: state.compareproducts.filter(
          (item) => item.id !== action.payload,
        ),
      };
    }

    case "CLEAR_COMPARE": {
      return {
        ...state,
        compareproducts: [],
      };
    }
    default:
      return state;
  }
};

export function CompareProvider({ children }) {
  const [{ compareproducts }, dispatch] = useReducer(
    compareReducer,
    initialCompareState,
  );

  function addToCompare(product) {
    dispatch({ type: "ADD_TO_COMPARE", payload: product });
  }

  function removeFromCompare(productId) {
    dispatch({ type: "REMOVE_FROM_COMPARE", payload: productId });
  }

  function clearCompare() {
    dispatch({ type: "CLEAR_COMPARE" });
  }

  const value = {
    compareproducts,
    addToCompare,
    removeFromCompare,
    clearCompare,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
