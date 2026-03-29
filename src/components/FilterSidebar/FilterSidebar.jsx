import "./FilterSidebar.css";

function FilterSidebar({ categories, setCategory }) {
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
              defaultChecked
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
              />
              {category.name}
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
