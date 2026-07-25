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
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-2">
      <div>
        <h2 className="fw-bold mb-1" style={{ fontSize: "clamp(1.2rem, 4vw, 1.75rem)" }}>فروشگاه لباس</h2>

        <p className="text-muted mb-0">
          {totalProducts} محصول
        </p>
      </div>

      <select
        className="form-select flex-shrink-0"
        style={{ width: "auto", minWidth: 140 }}
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
