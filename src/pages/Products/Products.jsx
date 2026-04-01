import { useEffect, useState, useCallback, useMemo } from "react";
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
    categories,
    dummyProductsHolder,
    pagination,
    status,
    filters,
    fetchIntialData,
    setPage,
    setCategory,
    setPrice,
    setSort,
    resetFilters,
  } = useProducts();

  useEffect(() => {
    fetchIntialData();
  }, [fetchIntialData]);

  const handleSidebarClick = useCallback((e) => e.stopPropagation(), []);
  const closeFilter = useCallback(() => setFilterOpen(false), []);
  const toggleFilter = useCallback(() => setFilterOpen((prev) => !prev), []);

  return (
    <article className="products-page">
      <div className="mobile-filter-bar container">
        <button className="btn-filter" onClick={toggleFilter}>
          <Funnel size={16} />
          <span>Filter</span>
        </button>
      </div>
      <main className="products-layout container" onClick={closeFilter}>
        <section
          className={`sidebar-container ${filterOpen ? "open" : ""}`}
          onClick={handleSidebarClick}
        >
          <FilterSidebar
            categories={categories}
            selectedCategory={filters.category}
            selectedPrice={filters.price}
            setCategory={setCategory}
            setPrice={setPrice}
            resetFilters={resetFilters}
            onClose={closeFilter}
          />
        </section>

        <section className="products-main container">
          <h1 className="page-title">
            {filters.category === "all" ? "All Products" : filters.category}
          </h1>
          <div className="products-header">
            <p className="results-count">
              Showing {dummyProductsHolder.length} results
            </p>

            <div className="sort-container">
              <label htmlFor="sort__products">Sort by:</label>
              <select
                name="sor__products"
                id="sort__products"
                className="sort-select"
                value={filters.sort.value}
                onChange={(e) => {
                  setSort(
                    e.target.value,
                    e.target.options[e.target.selectedIndex].dataset.order,
                  );
                }}
              >
                {SORT_OPTIONS.map((sort) => (
                  <option
                    key={sort.label}
                    value={sort.value}
                    data-order={sort.order}
                  >
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
              dummyProductsHolder.map((product) => {
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
