import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/nav-bar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<h1>Shop</h1>} />
          <Route path="/orders" element={<h1>Order</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
