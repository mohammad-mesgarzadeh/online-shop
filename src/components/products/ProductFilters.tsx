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
      <div className="card-body">
        <h5 className="fw-bold mb-4">فیلترها</h5>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="جستجو..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <h6 className="fw-bold mb-3">دسته بندی</h6>

        {categories.map((cat) => (
          <div className="form-check py-1" key={cat.slug}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`cat-${cat.slug}`}
              checked={selectedCategories.includes(cat.slug)}
              onChange={() => onCategoryChange(cat.slug)}
              style={{ cursor: "pointer" }}
            />
            <label className="form-check-label" htmlFor={`cat-${cat.slug}`} style={{ cursor: "pointer" }}>
              {cat.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
