import { createContext, useReducer } from "react";
import { API_BASE_URL } from "../utils/constant";
import { currencyCalculator, formatPrice } from "../utils/helper";

export const WishlistContext = createContext();

const initialState = {
  wishlist: [],
  removedWishlist: [],
  status: "idle",
  error: null,
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, status: "loading" };

    case "ADD_TO_WISHLIST": {
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
        status: "success",
        error: null,
      };
    }

    case "REMOVE_FROM_WISHLIST": {
      const removedItem = state.wishlist.find(
        (item) => item.id === action.payload,
      );

      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
        removedWishlist: [
          ...state.removedWishlist,
          { ...removedItem, isInWishlist: false },
        ],
        error: null,
      };
    }

    case "ADD_BACK_TO_WISHLIST": {
      const addedBackItem = state.removedWishlist.find(
        (item) => item.id === action.payload,
      );
      return {
        ...state,
        wishlist: [...state.wishlist, { ...addedBackItem, isInWishlist: true }],
        removedWishlist: state.removedWishlist.filter(
          (item) => item.id !== action.payload,
        ),
        error: null,
      };
    }

    case "ERROR":
      return { ...state, status: "error", error: action.payload };

    default:
      return state;
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  async function addToWishlist(id) {
    const isAlreadyInWishlist = state.wishlist.some((item) => item.id === id);

    const isAlreadyRemoved = state.removedWishlist.some(
      (item) => item.id === id,
    );

    if (isAlreadyInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
      return;
    }

    if (isAlreadyRemoved) {
      dispatch({ type: "ADD_BACK_TO_WISHLIST", payload: id });
      return;
    }

    try {
      dispatch({ type: "START" });
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const discountedPrice = currencyCalculator(
        data.price,
        data.discountPercentage ?? 0,
      );

      const formattedCurrentPrice = formatPrice(discountedPrice);
      const product = {
        id: data.id,
        brand: data.brand,
        category: data.category,
        description: data.description,
        discount: data.discountPercentage ?? 0,
        image: data.images[0] ?? "",
        originalPrice: formatPrice(data.price),
        currentPrice: formattedCurrentPrice,
        rating: data.rating,
        reviews: data.reviews ?? [],
        title: data.title,
        warranty: data.warrantyInformation ?? "No warranty for this product",
        quantity: 1,
        availability: data.availabilityStatus ?? "Unknown",
        stock: data.stock ?? 0,
        returnPolicy: data.returnPolicy ?? "No return policy for this product",
        isInWishlist: true,
      };
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  }

  const value = {
    wishlist: state.wishlist,
    removedWishlist: state.removedWishlist,
    status: state.status,
    addToWishlist,
  };
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
