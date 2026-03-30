import { useContext } from "react";
import { WishlistContaxt } from "../context/WishlistContext";

export const useWishlist = () => {
  const context = useContext(WishlistContaxt);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
