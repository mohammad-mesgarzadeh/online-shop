import { useLanguage } from "../../context/LanguageContext";

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
  const { t } = useLanguage();
  return (
    <nav className="mt-5" aria-label={t("common.pagination")}>
      <ul className="pagination justify-content-center flex-wrap gap-1">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link touch-target"
            onClick={() => onPageChange(page - 1)}
          >
            {t("common.previous")}
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li
            key={p}
            className={`page-item ${p === page ? "active" : ""}`}
          >
            <button
              className="page-link touch-target"
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link touch-target"
            onClick={() => onPageChange(page + 1)}
          >
            {t("common.next")}
          </button>
        </li>
      </ul>
    </nav>
  );
}
