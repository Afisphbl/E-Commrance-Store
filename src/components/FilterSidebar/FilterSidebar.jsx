import "./FilterSidebar.css";

function FilterSidebar({ getCategories }) {
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
              defaultChecked
            />
            All Categories
          </label>
          {getCategories.map((category) => (
            <label
              htmlFor={category}
              key={category}
              className="filter-label capitalize"
            >
              <input type="radio" name="filter__product" id={category} />
              {category}
            </label>
          ))}
        </div>

        <div className="price-header">
          <span>Max Price</span>
          <p className="price-value">$2000</p>
        </div>

        <input
          className="price-slider"
          type="range"
          name="price"
          id="price"
          value={2000}
          min={10}
          max={2000}
        />

        <p className="price-range-labels">
          <span>$10</span>
          <span>$2000</span>
        </p>
      </div>

      <button className="btn-secondary">Clear Filters</button>
    </section>
  );
}

export default FilterSidebar;
