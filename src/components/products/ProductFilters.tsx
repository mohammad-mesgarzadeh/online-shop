import { categories } from "../../data/categories";

type ProductFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
};

export default function ProductFilters({
  search,
  onSearchChange,
  selectedCategories,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body" style={{ padding: "var(--space-5)" }}>
        <h5
          className="fw-bold mb-4"
          style={{ fontSize: "var(--text-lg)", color: "var(--c-gray-800)" }}
        >
          <i className="bi bi-funnel text-primary me-2" />
          فیلترها
        </h5>

        <div className="mb-4">
          <div className="position-relative">
            <i
              className="bi bi-search position-absolute"
              style={{
                top: "50%",
                right: "var(--space-3)",
                transform: "translateY(-50%)",
                color: "var(--c-gray-400)",
                fontSize: "var(--text-sm)",
              }}
            />
            <input
              type="text"
              className="form-control"
              style={{
                paddingLeft: "var(--space-3)",
                paddingRight: "var(--space-10)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--c-gray-200)",
                fontSize: "var(--text-sm)",
              }}
              placeholder="جستجوی محصول..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <h6
          className="fw-bold mb-3"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--c-gray-500)",
            textTransform: "uppercase",
            letterSpacing: "var(--ls-wide)",
          }}
        >
          دسته‌بندی
        </h6>

        <div className="d-flex flex-column gap-1">
          {categories.map((cat) => {
            const isActive = selectedCategories.includes(cat.slug);
            return (
              <label
                key={cat.slug}
                className="d-flex align-items-center gap-2 py-2 px-3 rounded-3 touch-target"
                style={{
                  cursor: "pointer",
                  background: isActive ? "rgba(108,99,255,0.06)" : "transparent",
                  transition: "background var(--duration-fast) var(--easing-default)",
                }}
                htmlFor={`cat-${cat.slug}`}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${cat.slug}`}
                  checked={isActive}
                  onChange={() => onCategoryChange(cat.slug)}
                  style={{ cursor: "pointer", marginTop: 0 }}
                />
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    color: isActive ? "var(--c-primary)" : "var(--c-gray-600)",
                    fontWeight: isActive ? "var(--fw-medium)" : "var(--fw-normal)",
                  }}
                >
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
