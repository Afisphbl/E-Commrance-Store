import { Link } from "react-router";
import { useCompare } from "../../hooks/useCompare";
import "./Compare.css";
import { Star, Trash2, X } from "lucide-react";

function Compare() {
  const { compareproducts, removeFromCompare, clearCompare } = useCompare();

  if (compareproducts.length === 0) return <EmptyCompare />;
  return (
    <section className="compare-header container">
      <div className="compare-header flex space-between align-center">
        <h1 className="page-title">Product Comparison</h1>
        <button
          className="btn-text flex align-center gap-2"
          aria-label="Clear all Compare"
          onClick={clearCompare}
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      <div className="compare-table-container">
        <table className="compare-table">
          <TableHeader
            products={compareproducts}
            removeFromCompare={removeFromCompare}
          />
          <TableBody products={compareproducts} />
        </table>
      </div>
    </section>
  );
}

function EmptyCompare() {
  return (
    <div className="compare-empty container">
      <div className="compare-empty-content">
        <h2>Your Comparison List is Empty</h2>
        <p>Add up to 4 products to compare their features side-by-side.</p>

        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    </div>
  );
}

function TableHeader({ products, removeFromCompare }) {
  const emptyColumnsCount = Math.max(0, 4 - products.length);

  return (
    <thead>
      <tr>
        <th className="feature-label-cell">PRODUCT</th>

        {products.map((product) => (
          <th key={product.id} className="product-cell">
            <div className="compare-product-header">
              <button
                className="remove-item"
                aria-label={`Remove product from comparison`}
                onClick={() => removeFromCompare(product.id)}
              >
                <X size={16} />
              </button>
              <img
                src={product.image}
                alt={product.title}
                className="compare-img"
              />
              <h3 className="compare-title">{product.title}</h3>
            </div>
          </th>
        ))}

        {Array.from({ length: emptyColumnsCount }).map((_, index) => (
          <th key={`empty-${index}`} className="product-cell empty">
            Add more to compare
            <Link to="/products" className="btn-secondary">
              Add
            </Link>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({ products }) {
  const features = [
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Price", key: "originalPrice" },
    { label: "Rating", key: "rating" },
    { label: "Stock", key: "stock" },
    { label: "Return Policy", key: "returnPolicy" },
    { label: "Warranty", key: "warranty" },
    { label: "Action", key: "action" },
  ];

  const emptyColumnsCount = Math.max(0, 4 - products.length);

  return (
    <tbody>
      {features.map((feature, featureIndex) => (
        <tr key={featureIndex}>
          <td className="feature-label">
            <strong>{feature.label}</strong>
          </td>

          {products.map((product) => (
            <td key={product.id} className="feature-value">
              {feature.key === "action" ? (
                <button className="btn btn-primary">Add to Cart</button>
              ) : product[feature.key] != null ? (
                feature.key === "rating" ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    <Star size={16} color="gold" fill="yellow" />
                    {product[feature.key]}{" "}
                  </span>
                ) : (
                  "" + product[feature.key]
                )
              ) : (
                "-"
              )}
            </td>
          ))}

          {Array.from({ length: emptyColumnsCount }).map((_, index) => (
            <td key={`empty-${index}`} className="feature-value empty">
              -
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default Compare;
