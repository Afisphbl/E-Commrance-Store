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
  X,
} from "lucide-react";

import "./Navbar.css";
import { useState } from "react";
import { useWishlist } from "../../hooks/useWishlist";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();
  return (
    <div className="navbar-container">
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      <div className="container navbar-inner">
        <Link className="navbar-logo" to="/">
          AfisShop
        </Link>

        <div className={`navbar-links  ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-header">
            <Link className="navbar-logo" to="/">
              AfisShop
            </Link>
            <button
              className="icon-btn mobile-toggle nav-icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <NavLink className="nav" to="/">
            Home
          </NavLink>
          <NavLink className="nav" to="/products">
            Shop
          </NavLink>
          <NavLink className="nav" to="/orders">
            Order
          </NavLink>

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

          <NavLink className="icon-btn nav-icon" to="/wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="badge">{wishlist.length}</span>
            )}
          </NavLink>

          <button className="icon-btn nav-icon">
            <ChartNoAxesColumn size={20} />
          </button>

          <button className="icon-btn nav-icon">
            <ShoppingCart size={20} />
          </button>

          <button
            className="icon-btn mobile-toggle nav-icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
