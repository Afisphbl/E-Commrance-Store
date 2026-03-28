import { Link, NavLink } from "react-router";
import { useTheme } from "../../hooks/useTheme";
import {
  ChartNoAxesColumn,
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
} from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="navbar-container">
      <div className="container navbar-inner">
        <Link className="navbar-logo" to="/">
          AfisShop
        </Link>

        <div className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/orders">Order</NavLink>

          <div className="navbar-search">
            <input
              type="search"
              name="search_products"
              placeholder="Search products..."
              id="search_products"
            />
            <button className="search-btn">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn nav-icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="icon-btn nav-icon">
            <Heart size={20} />
          </button>

          <button className="icon-btn nav-icon">
            <ChartNoAxesColumn size={20} />
          </button>

          <button className="icon-btn nav-icon">
            <ShoppingCart size={20} />
          </button>

          <button className="icon-btn mobile-toggle">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
