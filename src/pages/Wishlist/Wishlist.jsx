import { Link } from "react-router";
import { useWishlist } from "../../hooks/useWishlist";
import ProductCard from "../../components/ProductCard/ProductCard";
import { currencyCalculator, formatPrice } from "../../utils/helper";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist } = useWishlist();
  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }
  return (
    <section className="container wishlist-page">
      <h1>My Wishlist</h1>
      <p className="wishlist-meta">{wishlist.length} items in wishlist</p>
      <div className="product-grid">
        {wishlist.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
}

function EmptyWishlist() {
  return (
    <div className="container wishlist-empty">
      <div className="wishlist-empty-content">
        <h2>Your Wishlist is Empty</h2>
        <p>Save items you love here and check them out later.</p>
        <Link to="/products" className="btn-primary">
          Explore Products
        </Link>
      </div>
    </div>
  );
}

export default Wishlist;
