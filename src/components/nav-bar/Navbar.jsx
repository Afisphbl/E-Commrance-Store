import {
  ChartNoAxesColumn,
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="container navbar-inner">
        <Link className="navbar-logo" to="/">
          AfisShop
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/orders">Order</Link>

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
          <button className="icon-btn nav-icon">
            <Moon size={20} />
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
