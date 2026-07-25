type ProductToolbarProps = {
  totalProducts: number;
  sortBy: string;
  onSortChange: (value: string) => void;
};

export default function ProductToolbar({
  totalProducts,
  sortBy,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
      <div>
        <h2
          className="fw-bold mb-1"
          style={{
            fontSize: "clamp(1.2rem, 4vw, 1.75rem)",
            color: "var(--c-gray-800)",
            letterSpacing: "var(--ls-tight)",
          }}
        >
          فروشگاه لباس
        </h2>

        <p
          className="mb-0"
          style={{ color: "var(--c-gray-400)", fontSize: "var(--text-sm)" }}
        >
          {totalProducts} محصول
        </p>
      </div>

      <select
        className="form-select flex-shrink-0"
        style={{
          width: "auto",
          minWidth: 160,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--c-gray-200)",
          fontSize: "var(--text-sm)",
          padding: "var(--space-2) var(--space-3)",
          color: "var(--c-gray-600)",
        }}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="مرتب‌سازی"
      >
        <option value="newest">جدیدترین</option>
        <option value="best-selling">پرفروش‌ترین</option>
        <option value="cheapest">ارزان‌ترین</option>
        <option value="most-expensive">گران‌ترین</option>
      </select>
    </div>
  );
}
