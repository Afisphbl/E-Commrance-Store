import { Link, useParams } from "react-router";
import "./ProductDetails.css";
import {
  ArrowLeft,
  Heart,
  Loader,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/constant";
import { currencyCalculator, formatPrice } from "../../utils/helper";
import { useWishlist } from "../../hooks/useWishlist";

function ProductDetails() {
  const { wishlist, addToWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const isInWishlist = wishlist.some((item) => item.id === +id);
  console.log(isInWishlist, id);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const discountedPrice = currencyCalculator(
          data.price,
          data.discountPercentage ?? 0,
        );

        const formattedCurrentPrice = formatPrice(discountedPrice);

        const product = {
          id: data.id,
          brand: data.brand,
          category: data.category,
          description: data.description,
          discount: data.discountPercentage ?? 0,
          images: data.images ?? "",
          originalPrice: formatPrice(data.price),
          currentPrice: formattedCurrentPrice,
          rating: data.rating,
          reviews: data.reviews ?? [],
          title: data.title,
          warranty: data.warrantyInformation ?? "No warranty for this product",

          availability: data.availabilityStatus ?? "Unknown",
          stock: data.stock ?? 0,
        };
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Unable to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [id]);

  if (loading)
    return (
      <div className="loading-container">
        <Loader size={24} className="loading" />
      </div>
    );

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
      </div>
    );
  }
  return (
    <section className="product-details-page container">
      <Link to="/products" className="back-link">
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      <div className="details-layout">
        <div className="gallery-section">
          <div className="main-image-container">
            <img
              src={product?.images?.[imgIndex]}
              alt={product?.title}
              className="main-image"
            />
          </div>

          {product?.images?.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img, index) => {
                const isActive = index === imgIndex;
                return (
                  <button
                    className={`thumbnail-btn ${isActive ? "active" : ""}`}
                    key={index}
                    onClick={() => setImgIndex(index)}
                  >
                    <img
                      src={img}
                      alt={`${product?.title} - Thumbnail ${index + 1}`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="info-section">
          <p className="product-brand">{product?.brand}</p>
          <h1 className="product-title">{product?.title}</h1>

          <div className="product-meta">
            <div className="rating-badge">
              <Star size={16} color="gold" fill="yellow" />
              <p className="product-rating">{product?.rating}</p>
            </div>
            <p className="stock-status text-success">
              {product?.availability} ({product?.stock} available)
            </p>
          </div>

          <div className="price-section">
            <span className="current-price">{product?.currentPrice}</span>
            <span className="original-price">{product?.originalPrice}</span>
            <span className="discount-tag">-{product?.discount}%</span>
          </div>
          <p className="product-description">{product?.description}</p>

          <div className="actions-section">
            <div className="quantity-selector">
              <span className="quantity-label">Quantity</span>

              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="buttons-group">
              <button className="btn-primary flex-1">Add to Cart</button>

              <button
                className="btn-wishlist"
                onClick={() => addToWishlist(product.id)}
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  size={20}
                  fill={isInWishlist ? "#FF0000" : "none"}
                  color={isInWishlist ? "#FF0000" : "currentColor"}
                />
              </button>
            </div>
          </div>

          <div className="delivery-info">
            <div className="info-item">
              <Truck size={20} className="info-icon" />
              <div>
                <strong>Free Delivery</strong>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="info-item">
              <ShieldCheck size={20} className="info-icon" />
              <div>
                <strong>Return Delivery</strong>
                <p>Free 30 days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Customer Reviews</h2>

          <div className="reviews-list">
            {product?.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-name">{review.reviewerName}</div>

        <div className="review-date">
          {new Date(review.date).toLocaleDateString()}
        </div>
      </div>
      <div className="review-rating">
        {Array.from({ length: Math.round(review.rating) }).map((_, index) => (
          <Star key={index} size={16} color="gold" fill="yellow" />
        ))}
      </div>

      <p className="review-comment">{review.comment}</p>
    </div>
  );
}

export default ProductDetails;
