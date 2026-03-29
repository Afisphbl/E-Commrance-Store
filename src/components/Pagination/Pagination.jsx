import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

function Pagination({ page, onPageChange }) {
  return (
    <ul className="pagination-container">
      <li>
        <button
          className={`pagination-item ${page === 1 ? "disabled" : ""}`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft size={16} />
        </button>
      </li>
      {Array.from({ length: 13 }, (_, index) => (
        <li key={index}>
          <button
            className={`pagination-item ${index === page - 1 ? "selected" : ""}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          className={`pagination-item ${page === 13 ? "disabled" : ""}`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === 13}
        >
          <ChevronRight size={16} />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
