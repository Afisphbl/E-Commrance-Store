import { memo } from "react";
import { ChartNoAxesColumn, Heart, ShoppingCart, Star } from "lucide-react";
import "./ProductCard.css";
import { Link } from "react-router";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { useCompare } from "../../hooks/useCompare";

const ProductCard = memo(function ProductCard({
  id,
  image,
  category,
  title,
  rating,
  discount,
  currentPrice,
  originalPrice,
  brand,
  stock,
  returnPolicy,
  warranty,
}) {
  const { wishlist, addToWishlist } = useWishlist();
  const { compareproducts, addToCompare } = useCompare();
  const { addItemToCart } = useCart();
  const isInWishlist = wishlist.some((item) => item.id === id);
  const isInCompare = compareproducts.some((item) => item.id === id);

  const product = {
    id,
    image,
    title,
    brand,
    category,
    originalPrice,
    rating,
    stock,
    returnPolicy,
    warranty,
    action: "Buy Now",
  };
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/products/${id}`}>
          <img className="product-image" src={image} alt={title} />
        </Link>
        {discount > 0 && (
          <span className="discount-badge">-{Math.floor(discount)}%</span>
        )}
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
            fill={isInWishlist ? "#FF0000" : "none"}
            color={isInWishlist ? "#FF0000" : "currentColor"}
          />
        </button>

        <button
          type="button"
          className={`compare-btn ${isInCompare ? "active" : ""}`}
          aria-label={
            isInCompare ? "Remove from comparison" : "Add to comparison"
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCompare(product);
          }}
        >
          <ChartNoAxesColumn size={16} />
        </button>
      </div>

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
            onClick={() => addItemToCart(id)}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
