import { ChartNoAxesColumn, Heart, ShoppingCart, Star } from "lucide-react";
import "./ProductCard.css";

function ProductCard({
  image,
  category,
  title,
  rating,
  discount,
  currentPrice,
  originalPrice,
}) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img className="product-image" src={image} alt={title} />

        <span className="discount-badge">-{discount}%</span>
        <button className="wishlist-btn">
          <Heart size={16} />
        </button>

        <button className="compare-btn">
          <ChartNoAxesColumn size={16} />
        </button>
      </div>

      <div className="product-content">
        <p className="product-category">{category}</p>
        <div className="product-title">
          <h3>{title}</h3>
        </div>

        <div className="product-rating">
          <Star size={16} />
          <span>{rating}</span>
        </div>

        <div className="product-footer ">
          <div className="product-price">
            <span className="current-price">{currentPrice}</span>
            <span className="original-price">{originalPrice}</span>
          </div>

          <button className="add-to-cart-btn">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
