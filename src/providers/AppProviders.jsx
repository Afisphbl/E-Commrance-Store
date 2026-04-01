import { ThemeProvider } from "../context/ThemeContext";
import { WishlistProvider } from "../context/WishlistContext";
import { CartProvider } from "../context/CartContext";
import { CompareProvider } from "../context/CompareContext";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>{children}</CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
