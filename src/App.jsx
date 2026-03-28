import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/nav-bar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<h1>Home</h1>} />
        <Route path="/products" element={<h1>Shop</h1>} />
        <Route path="/orders" element={<h1>Order</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
