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
    <div className="pt">
      <div className="pt-info">
        <span className="pt-count">
          <strong>{totalProducts}</strong> محصول
        </span>
      </div>
      <div className="pt-sort">
        <i className="bi bi-arrow-down-up pt-sort-icon" />
        <select
          className="pt-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="مرتب‌سازی"
        >
          <option value="featured">پیشنهادی</option>
          <option value="newest">جدیدترین</option>
          <option value="best-selling">پرفروش‌ترین</option>
          <option value="cheapest">ارزان‌ترین</option>
          <option value="most-expensive">گران‌ترین</option>
          <option value="highest-rated">بالاترین امتیاز</option>
          <option value="most-popular">محبوب‌ترین</option>
        </select>
      </div>
    </div>
  );
}
