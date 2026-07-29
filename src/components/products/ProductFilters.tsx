import { useState, useMemo, useCallback } from "react";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import type { FilterState } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

type ProductFiltersProps = {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  isMobile: boolean;
  onApply?: () => void;
};

function getUniqueBrands() {
  const brandSet = new Set(products.map((p) => p.brand));
  return Array.from(brandSet).sort();
}

function getUniqueColors() {
  const colorSet = new Set(products.flatMap((p) => p.colors));
  return Array.from(colorSet).sort();
}

function getUniqueSizes() {
  const sizeSet = new Set(products.flatMap((p) => p.sizes));
  return Array.from(sizeSet).sort();
}

function getPriceBounds() {
  const prices = products.map((p) => p.price);
  return { min: 0, max: Math.ceil(Math.max(...prices) / 100000) * 100000 };
}

const COLOR_MAP: Record<string, string> = {
  مشکی: "#1a1a2e",
  سفید: "#f8f9fa",
  سرمه‌ای: "#1b2a4a",
  خاکستری: "#9ca3af",
  آبی: "#3b82f6",
  "آبی روشن": "#93c5fd",
  "آبی تیره": "#1e3a5f",
  قرمز: "#ef4444",
  صورتی: "#ec4899",
  "زرشکی": "#9f1239",
  "قهوه‌ای": "#92400e",
  "طلایی": "#d4a843",
  "نقره‌ای": "#c0c0c0",
};

function FilterGroup({
  id,
  title,
  icon,
  children,
  isOpen,
  onToggle,
}: {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div className={`filter-group ${isOpen ? "filter-group--open" : ""}`}>
      <button
        className="filter-group-header"
        onClick={() => onToggle(id)}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`filter-body-${id}`}
      >
        <span>
          <i className={`bi ${icon} me-2`} style={{ color: "var(--c-primary)" }} />
          {title}
        </span>
        <i
          className={`bi bi-chevron-${isOpen ? "up" : "down"} filter-group-chevron`}
        />
      </button>
      <div
        className={`filter-group-body ${isOpen ? "filter-group-body--open" : ""}`}
        id={`filter-body-${id}`}
        role="region"
      >
        {children}
      </div>
    </div>
  );
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  isMobile,
  onApply,
}: ProductFiltersProps) {
  const { t } = useLanguage();
  const brands = useMemo(() => getUniqueBrands(), []);
  const colors = useMemo(() => getUniqueColors(), []);
  const sizes = useMemo(() => getUniqueSizes(), []);
  const { min: priceMin, max: priceMax } = useMemo(() => getPriceBounds(), []);

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const handleToggleGroup = useCallback((id: string) => {
    setOpenGroup((prev) => (prev === id ? null : id));
  }, []);

  const handlePriceMinChange = useCallback(
    (val: string) => {
      const num = parseInt(val, 10);
      if (!isNaN(num) && num >= priceMin && num <= filters.priceRange[1]) {
        onFilterChange({ priceRange: [num, filters.priceRange[1]] });
      }
    },
    [priceMin, filters.priceRange, onFilterChange]
  );

  const handlePriceMaxChange = useCallback(
    (val: string) => {
      const num = parseInt(val, 10);
      if (!isNaN(num) && num <= priceMax && num >= filters.priceRange[0]) {
        onFilterChange({ priceRange: [filters.priceRange[0], num] });
      }
    },
    [priceMax, filters.priceRange, onFilterChange]
  );

  const handleSliderMin = useCallback(
    (val: string) => {
      const num = parseInt(val, 10);
      if (num <= filters.priceRange[1]) {
        onFilterChange({ priceRange: [num, filters.priceRange[1]] });
      }
    },
    [filters.priceRange, onFilterChange]
  );

  const handleSliderMax = useCallback(
    (val: string) => {
      const num = parseInt(val, 10);
      if (num >= filters.priceRange[0]) {
        onFilterChange({ priceRange: [filters.priceRange[0], num] });
      }
    },
    [filters.priceRange, onFilterChange]
  );

  const toggleArrayFilter = useCallback(
    (field: "categories" | "brands" | "sizes" | "colors", value: string) => {
      const current = filters[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onFilterChange({ [field]: next });
    },
    [filters, onFilterChange]
  );

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length) count += filters.categories.length;
    if (filters.brands.length) count += filters.brands.length;
    if (filters.sizes.length) count += filters.sizes.length;
    if (filters.colors.length) count += filters.colors.length;
    if (filters.priceRange[0] > priceMin || filters.priceRange[1] < priceMax)
      count++;
    if (filters.minRating > 0) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.newArrivalsOnly) count++;
    return count;
  }, [filters, priceMin, priceMax]);

  const formatPrice = (val: number) =>
    val.toLocaleString() + " " + t("common.toman");

  return (
    <div className={`pf ${isMobile ? "pf--mobile" : ""}`}>
      <div className="pf-header">
        <h5 className="pf-title">
          <i className="bi bi-funnel me-2" />
          {t("products.filter")}
          {activeCount > 0 && (
            <span className="pf-active-badge">{activeCount}</span>
          )}
        </h5>
        {activeCount > 0 && (
          <button className="pf-reset-btn" onClick={onReset} type="button">
            <i className="bi bi-x-circle me-1" />
            {t("products.clearAll")}
          </button>
        )}
      </div>

      <div className="pf-body">
        {/* Category */}
        <FilterGroup id="category" title={t("filter.category")} icon="bi-tag" isOpen={openGroup === "category"} onToggle={handleToggleGroup}>
          <div className="pf-check-list">
            {categories.map((cat) => {
              const count = products.filter(
                (p) => p.category === cat.slug
              ).length;
              return (
                <label key={cat.slug} className="pf-check-item">
                  <input
                    type="checkbox"
                    className="pf-check-input"
                    checked={filters.categories.includes(cat.slug)}
                    onChange={() => toggleArrayFilter("categories", cat.slug)}
                  />
                  <span className="pf-check-label">{cat.label}</span>
                  <span className="pf-check-count">{count}</span>
                </label>
              );
            })}
          </div>
        </FilterGroup>

        {/* Price Range */}
        <FilterGroup id="price" title={t("filter.price")} icon="bi-cash-stack" isOpen={openGroup === "price"} onToggle={handleToggleGroup}>
          <div className="pf-price-inputs">
            <div className="pf-price-field">
              <label>{t("filter.from")}</label>
              <input
                type="number"
                className="pf-price-input"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceMinChange(e.target.value)}
                min={priceMin}
                max={filters.priceRange[1]}
                placeholder={priceMin.toLocaleString()}
              />
            </div>
            <span className="pf-price-sep">—</span>
            <div className="pf-price-field">
              <label>{t("filter.to")}</label>
              <input
                type="number"
                className="pf-price-input"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceMaxChange(e.target.value)}
                min={filters.priceRange[0]}
                max={priceMax}
                placeholder={priceMax.toLocaleString()}
              />
            </div>
          </div>
          <div className="pf-price-display">
            {formatPrice(filters.priceRange[0])} —{" "}
            {formatPrice(filters.priceRange[1])}
          </div>
          <div className="pf-slider-track">
            <input
              type="range"
              className="pf-slider pf-slider--min"
              min={priceMin}
              max={priceMax}
              step={50000}
              value={filters.priceRange[0]}
              onChange={(e) => handleSliderMin(e.target.value)}
              aria-label={t("filter.minPrice")}
            />
            <input
              type="range"
              className="pf-slider pf-slider--max"
              min={priceMin}
              max={priceMax}
              step={50000}
              value={filters.priceRange[1]}
              onChange={(e) => handleSliderMax(e.target.value)}
              aria-label={t("filter.maxPrice")}
            />
            <div
              className="pf-slider-fill"
              aria-hidden="true"
              style={{
                left: `${(filters.priceRange[0] / priceMax) * 100}%`,
                right: `${100 - (filters.priceRange[1] / priceMax) * 100}%`,
              }}
            />
          </div>
        </FilterGroup>

        {/* Brand */}
        <FilterGroup id="brand" title={t("filter.brand")} icon="bi-award" isOpen={openGroup === "brand"} onToggle={handleToggleGroup}>
          <div className="pf-check-list">
            {brands.map((brand) => {
              const count = products.filter((p) => p.brand === brand).length;
              return (
                <label key={brand} className="pf-check-item">
                  <input
                    type="checkbox"
                    className="pf-check-input"
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleArrayFilter("brands", brand)}
                  />
                  <span className="pf-check-label">{brand}</span>
                  <span className="pf-check-count">{count}</span>
                </label>
              );
            })}
          </div>
        </FilterGroup>

        {/* Size */}
        <FilterGroup id="size" title={t("filter.size")} icon="bi-rulers" isOpen={openGroup === "size"} onToggle={handleToggleGroup}>
          <div className="pf-size-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`pf-size-btn ${
                  filters.sizes.includes(size) ? "pf-size-btn--active" : ""
                }`}
                onClick={() => toggleArrayFilter("sizes", size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* Color */}
        <FilterGroup id="color" title={t("filter.color")} icon="bi-palette" isOpen={openGroup === "color"} onToggle={handleToggleGroup}>
          <div className="pf-color-grid">
            {colors.map((color) => (
              <button
                key={color}
                className={`pf-color-btn ${
                  filters.colors.includes(color) ? "pf-color-btn--active" : ""
                }`}
                onClick={() => toggleArrayFilter("colors", color)}
                type="button"
                title={color}
              >
                <span
                  className="pf-color-swatch"
                  style={{
                    background: COLOR_MAP[color] || "#9ca3af",
                  }}
                />
                <span className="pf-color-label">{color}</span>
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* Rating */}
        <FilterGroup id="rating" title={t("filter.rating")} icon="bi-star-fill" isOpen={openGroup === "rating"} onToggle={handleToggleGroup}>
          <div className="pf-rating-list">
            {[4, 3, 2, 1].map((r) => (
              <button
                key={r}
                className={`pf-rating-btn ${
                  filters.minRating === r ? "pf-rating-btn--active" : ""
                }`}
                onClick={() =>
                  onFilterChange({
                    minRating: filters.minRating === r ? 0 : r,
                  })
                }
                type="button"
              >
                <span className="pf-rating-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${
                        i < r ? "bi-star-fill" : "bi-star"
                      }`}
                    />
                  ))}
                </span>
                <span className="pf-rating-text">{t("filter.andUp")}</span>
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* Toggles */}
        <FilterGroup id="features" title={t("filter.features")} icon="bi-sliders" isOpen={openGroup === "features"} onToggle={handleToggleGroup}>
          <div className="pf-toggle-list">
            <label className="pf-toggle-item">
              <span className="pf-toggle-label">
                <i className="bi bi-box-seam me-2" />
                {t("filter.inStock")}
              </span>
              <div className="pf-toggle-switch">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) =>
                    onFilterChange({ inStockOnly: e.target.checked })
                  }
                />
                <span className="pf-toggle-slider" />
              </div>
            </label>
            <label className="pf-toggle-item">
              <span className="pf-toggle-label">
                <i className="bi bi-tag-fill me-2" style={{ color: "var(--c-danger)" }} />
                {t("filter.onSale")}
              </span>
              <div className="pf-toggle-switch">
                <input
                  type="checkbox"
                  checked={filters.onSaleOnly}
                  onChange={(e) =>
                    onFilterChange({ onSaleOnly: e.target.checked })
                  }
                />
                <span className="pf-toggle-slider" />
              </div>
            </label>
            <label className="pf-toggle-item">
              <span className="pf-toggle-label">
                <i className="bi bi-stars me-2" style={{ color: "var(--c-accent-amber)" }} />
                {t("filter.newArrivals")}
              </span>
              <div className="pf-toggle-switch">
                <input
                  type="checkbox"
                  checked={filters.newArrivalsOnly}
                  onChange={(e) =>
                    onFilterChange({ newArrivalsOnly: e.target.checked })
                  }
                />
                <span className="pf-toggle-slider" />
              </div>
            </label>
          </div>
        </FilterGroup>
      </div>

      {/* Mobile Sticky Footer */}
      {isMobile && (
        <div className="pf-footer">
          <button className="pf-footer-btn pf-footer-btn--reset" onClick={onReset} type="button">
            <i className="bi bi-arrow-counterclockwise me-1" />
            {t("filter.reset")}
          </button>
          <button className="pf-footer-btn pf-footer-btn--apply" onClick={onApply} type="button">
            <i className="bi bi-check-lg me-1" />
            {t("filter.apply")}
          </button>
        </div>
      )}
    </div>
  );
}
