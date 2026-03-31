import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Navbar from "./components/nav-bar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Navbar />
            <AppRoutes />
            <Footer />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
