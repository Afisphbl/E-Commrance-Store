import { useEffect, useState } from "react";
import { Clock, MoveRight, ShieldCheck, Truck } from "lucide-react";
import HeroImage from "../../assets/products-img.png";
import { fetchProducts } from "../../api/productApi";
import "./Home.css";
import { Link } from "react-router";
import { currencyCalculator, formatPrice } from "../../utils/helper";
import ProductCard from "../../components/ProductCard/ProductCard";
import Skeleton from "../../components/Skeleton/Skeleton";

const categories = [
  {
    id: 1,
    name: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1580974928064-f0aeef70895a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Laptops",
    image:
      "https://images.unsplash.com/photo-1706101126602-5a6132b98b8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Fragrances",
    image:
      "https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJhZ3JhbmNlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Skincare",
    image:
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNraW5jYXJlJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    name: "Groceries",
    image:
      "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyb2NlcnklMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Home Decoration",
    image:
      "https://plus.unsplash.com/premium_photo-1673203734691-cdebcf12f003?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZSUyMGRlY29yYXRpb25zfGVufDB8fDB8fHww",
  },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        const newProducts = (Array.isArray(data?.products) ? data.products : [])
          .map((product) => {
            return {
              id: product.id,
              brand: product.brand,
              category: product.category,
              description: product.description,
              discount: Math.round(product.discountPercentage ?? 0),
              image: product.thumbnail,
              price: product.price,
              rating: product.rating,
              title: product.title,
            };
          })
          .slice(0, 8);
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <section className="container hero-content">
          <div className="hero-text">
            <h1>Discover Premium Eco-Friendly Products</h1>
            <p>
              Shop the best quality items with sustainable materials. Upgrade
              your lifestyle today with our exclusive collection.
            </p>

            <button className="hero-cta btn-primary">
              <span>Shop Now</span>
              <MoveRight size={20} />
            </button>
          </div>

          <div className="hero-image">
            <img src={HeroImage} alt="Eco-Friendly Products" />
          </div>
        </section>
      </header>

      <section className="features-section container">
        <div className="feature-item">
          <div className="feature-icon">
            <Truck size={20} />
          </div>

          <div>
            <h4>Free Shipping</h4>
            <p>On orders over $50</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <Clock size={20} />
          </div>

          <div>
            <h4>24/7 Support</h4>
            <p>Dedicated support team</p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="category-grid container">
          {categories.map((category) => (
            <div className="category-card" key={category.id}>
              <img className="img" src={category.image} alt={category.name} />
              <div className="category-content">
                <h3>{category.name}</h3>

                <div className="category-link">
                  <span>View Collection</span>
                  <MoveRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Trending Now</h2>

          <Link to="/products" className="view-all-link">
            <span> View All Products</span>
            <MoveRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="product-skeleton-wrapper">
                    <Skeleton height="200px" style={{ marginBottom: "1rem" }} />
                    <Skeleton
                      height="24px"
                      width="80%"
                      style={{ marginBottom: "0.5rem" }}
                    />
                    <Skeleton
                      height="16px"
                      width="40%"
                      style={{ marginBottom: "1rem" }}
                    />
                    <Skeleton height="40px" width="100%" />
                  </div>
                ))
            : products.map((product) => {
                const discountedPrice = currencyCalculator(
                  product.price,
                  product.discount,
                );
                const formattedCurrentPrice = formatPrice(discountedPrice);
                const formattedOriginalPrice = formatPrice(product.price);

                return (
                  <ProductCard
                    key={product.id}
                    {...product}
                    currentPrice={formattedCurrentPrice}
                    originalPrice={formattedOriginalPrice}
                  />
                );
              })}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join Our Newsletter</h2>
          <p>
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
        </div>

        <form className="container newsletter-form">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
          />

          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}

export default Home;
