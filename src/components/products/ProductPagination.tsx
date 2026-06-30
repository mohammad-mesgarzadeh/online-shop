type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <nav className="mt-5">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page - 1)}
          >
            قبلی
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li
            key={p}
            className={`page-item ${p === page ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page + 1)}
          >
            بعدی
          </button>
        </li>
      </ul>
    </nav>
  );
}
