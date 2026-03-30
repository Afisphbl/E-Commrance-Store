import { formatPrice } from "../../utils/helper";
import "./FilterSidebar.css";

function FilterSidebar({
  categories,
  selectedCategory,
  selectedPrice = 2500,
  setCategory,
  setPrice,
}) {
  return (
    <section className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
      </div>

      <div className="filter-section">
        <h4>Category</h4>

        <div className="filter-list">
          <label htmlFor="all" className="filter-label capitalize">
            <input
              type="radio"
              name="filter__product"
              id="all"
              onChange={() => setCategory("all")}
              defaultChecked={selectedCategory === "all"}
            />
            All Categories
          </label>
          {categories.map((category) => (
            <label
              htmlFor={category.slug}
              key={category.slug}
              className="filter-label capitalize"
            >
              <input
                type="radio"
                name="filter__product"
                id={category.slug}
                onChange={() => setCategory(category.slug)}
                defaultChecked={selectedCategory === category.slug}
              />
              {category.name}
            </label>
          ))}
        </div>

        <div className="price-header">
          <span>Max Price</span>
          <p className="price-value">{formatPrice(selectedPrice)}</p>
        </div>

        <input
          className="price-slider"
          type="range"
          name="price"
          id="price"
          value={selectedPrice}
          min={10}
          max={2500}
          onChange={(e) => setPrice({ price: parseInt(e.target.value) })}
        />
        <p className="price-range-labels">
          <span>$10</span>
          <span>$2500</span>
        </p>
      </div>

      <button className="btn-secondary">Clear Filters</button>
    </section>
  );
}

export default FilterSidebar;
