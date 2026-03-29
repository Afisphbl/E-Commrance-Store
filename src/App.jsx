import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Navbar from "./components/nav-bar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<h1>Order</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
