import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import { BrowserRouter, Routes, Route } from "react-router";

const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products/Products"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<h1>Order</h1>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
