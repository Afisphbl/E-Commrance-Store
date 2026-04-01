import { createContext, useReducer, useMemo, useCallback } from "react";

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

  const addToCompare = useCallback((product) => {
    dispatch({ type: "ADD_TO_COMPARE", payload: product });
  }, []);

  const removeFromCompare = useCallback((productId) => {
    dispatch({ type: "REMOVE_FROM_COMPARE", payload: productId });
  }, []);

  const clearCompare = useCallback(() => {
    dispatch({ type: "CLEAR_COMPARE" });
  }, []);

  const value = useMemo(() => {
    return {
      compareproducts,
      addToCompare,
      removeFromCompare,
      clearCompare,
    };
  }, [compareproducts, addToCompare, removeFromCompare, clearCompare]);

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
