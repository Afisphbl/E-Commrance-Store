import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import { Routes, Route } from "react-router";

const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products/Products"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const ProductDetails = lazy(
  () => import("../pages/ProductDetails/ProductDetails"),
);
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Compare = lazy(() => import("../pages/Compare/Compare"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
