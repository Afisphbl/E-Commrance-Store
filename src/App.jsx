import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/nav-bar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<h1>Home</h1>} />
          <Route path="/products" element={<h1>Shop</h1>} />
          <Route path="/orders" element={<h1>Order</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
