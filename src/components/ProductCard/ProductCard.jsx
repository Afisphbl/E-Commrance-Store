import { ChartNoAxesColumn, Heart, ShoppingCart, Star } from "lucide-react";
import "./ProductCard.css";
import { Link } from "react-router";
import { useWishlist } from "../../hooks/useWishlist";

function ProductCard({
  id,
  image,
  category,
  title,
  rating,
  discount,
  currentPrice,
  originalPrice,
}) {
  const { wishlist, addToWishlist } = useWishlist();
  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-image-wrapper">
        <img className="product-image" src={image} alt={title} />

        <span className="discount-badge">-{Math.floor(discount)}%</span>
        <button
          type="button"
          className="wishlist-btn"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToWishlist(id);
          }}
        >
          <Heart
            size={16}
            fill={wishlist.some((item) => item.id === id) ? "#FF0000" : "none"}
            color={
              wishlist.some((item) => item.id === id)
                ? "#FF0000"
                : "currentColor"
            }
          />
        </button>

        <button
          type="button"
          className="compare-btn"
          aria-label="Compare product"
        >
          <ChartNoAxesColumn size={16} />
        </button>
      </Link>

      <div className="product-content">
        <div className="product-category-rating">
          <p className="product-category">{category}</p>
          <div className="product-rating">
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span>{rating}</span>
          </div>
        </div>

        <Link to={`/products/${id}`} className="product-title">
          <h3>{title}</h3>
        </Link>

        <div className="product-footer ">
          <div className="product-price">
            <span className="current-price">{currentPrice}</span>
            <span className="original-price">{originalPrice}</span>
          </div>

          <button
            type="button"
            className="add-to-cart-btn"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
