import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import { BrowserRouter, Routes, Route } from "react-router";

const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetails = lazy(
  () => import("../pages/ProductDetails/ProductDetails"),
);

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<h1>Order</h1>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
