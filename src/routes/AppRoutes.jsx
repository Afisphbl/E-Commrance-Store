import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import { BrowserRouter, Routes, Route } from "react-router";
import Cart from "../pages/Cart/Cart";

const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetails = lazy(
  () => import("../pages/ProductDetails/ProductDetails"),
);
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<h1>Order</h1>} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
