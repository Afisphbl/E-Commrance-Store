import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

function Pagination({ pagination, setPage }) {
  if (pagination.pageRange === 1) return null;
  return (
    <ul className="pagination-container">
      <li>
        <button
          className={`pagination-item ${pagination.currentPage === 1 ? "disabled" : ""}`}
          onClick={() => setPage(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
      </li>
      {Array.from({ length: pagination.pageRange }, (_, index) => (
        <li key={index}>
          <button
            className={`pagination-item ${index === pagination.currentPage - 1 ? "selected" : ""}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          className={`pagination-item ${pagination.currentPage === pagination.pageRange ? "disabled" : ""}`}
          onClick={() => setPage(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.pageRange}
        >
          <ChevronRight size={16} />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
