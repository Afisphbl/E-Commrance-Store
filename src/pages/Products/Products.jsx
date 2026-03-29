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
import { useProducts } from "../../hooks/useProducts";

function Products() {
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    products,
    categories,
    pagination,
    status,
    fetchIntialData,
    setPage,
    setCategory,
  } = useProducts();

  useEffect(() => {
    fetchIntialData();
  }, [fetchIntialData]);

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
          <FilterSidebar categories={categories} setCategory={setCategory} />
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

          <div className="product-grid">
            {status === "loading" ? (
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
            ) : status === "failed" ? (
              <p className="error-message">Failed to fetch products.</p>
            ) : (
              products.map((product) => {
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
              })
            )}
          </div>

          <Pagination pagination={pagination} setPage={setPage} />
        </section>
      </main>
    </article>
  );
}

export default Products;
