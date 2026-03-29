import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/productApi";
import { PAGE_SIZE, SORT_OPTIONS } from "../../utils/constant";

import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import "./Products.css";
import { Funnel } from "lucide-react";
import Skeleton from "../../components/Skeleton/Skeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { currencyCalculator, formatPrice } from "../../utils/helper";
import Pagination from "../../components/Pagination/Pagination";

function Products() {
  const [products, setProducts] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  useEffect(() => {
    fetchProducts().then((data) => {
      const categories = new Set(
        data?.products?.map((product) => product.category),
      );
      setGetCategories(Array.from(categories));
    });
  }, []);

  useEffect(() => {
    const skip = (page - 1) * PAGE_SIZE;

    const fetchProduct = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchProducts(PAGE_SIZE, skip);
        const newProducts = (
          Array.isArray(data?.products) ? data.products : []
        ).map((product) => {
          return {
            id: product.id,
            brand: product.brand,
            category: product.category,
            description: product.description,
            discount: product.discountPercentage ?? 0,
            image: product.thumbnail ?? "",
            price: product.price,
            rating: product.rating,
            reviews: product.reviews ?? [],
            title: product.title,
            warranty:
              product.warrantyInformation ?? "No warranty for this product",
          };
        });

        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setError(
          `Error Occurred while fetching products. 💥💥💥ERROR: ${error.message}. Please try again later.`,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [page]);
  return (
    <article className="products-page">
      <div className="mobile-filter-bar container">
        <button
          className="btn-filter"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          <Funnel size={16} />
          <span>Filter</span>
        </button>
      </div>
      <main
        className="products-layout container"
        onClick={() => setFilterOpen(false)}
      >
        <section
          className={`sidebar-container ${filterOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <FilterSidebar getCategories={getCategories} />
        </section>

        <section className="products-main container">
          <h1 className="page-title">All Products</h1>
          <div className="products-header">
            <p className="results-count">Showing {products.length} results</p>

            <div className="sort-container">
              <label htmlFor="sort__products">Sort by:</label>
              <select
                name="sor__products"
                id="sort__products"
                className="sort-select"
              >
                {SORT_OPTIONS.map((sort) => (
                  <option key={sort.label} value={sort.value}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            Array(8)
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
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => {
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
                    discountedPrice={discountedPrice}
                    currentPrice={formattedCurrentPrice}
                    originalPrice={formattedOriginalPrice}
                  />
                );
              })}
            </div>
          )}

          <Pagination page={page} onPageChange={handlePageChange} />
        </section>
      </main>
    </article>
  );
}

export default Products;
