import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import ProductPagination from "../components/products/ProductPagination";

import { products } from "../data/products";
import { categories } from "../data/categories";
import type { FilterState } from "../types";

const PRICE_MIN = 0;
const PRICE_MAX = 4000000;

const DEFAULT_FILTERS: FilterState = {
  search: "",
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
  newArrivalsOnly: false,
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get("sort") || "featured";
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [sortBy, setSortBy] = useState(initialSort);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    search: initialSearch,
    categories: initialCategory ? [initialCategory] : [],
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    search: initialSearch,
    categories: initialCategory ? [initialCategory] : [],
  });

  const perPage = 9;

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 992
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile && filterOpen) {
        setFilterOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filterOpen]);

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [filterOpen]);

  const activeFilters = isMobile ? mobileFilters : appliedFilters;

  const filteredProducts = useMemo(() => {
    let result = products;
    const f = activeFilters;

    if (f.search) {
      const q = f.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (f.categories.length > 0) {
      result = result.filter((p) => f.categories.includes(p.category));
    }

    if (f.brands.length > 0) {
      result = result.filter((p) => f.brands.includes(p.brand));
    }

    if (f.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => f.sizes.includes(s))
      );
    }

    if (f.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => f.colors.includes(c))
      );
    }

    if (f.priceRange[0] > PRICE_MIN || f.priceRange[1] < PRICE_MAX) {
      result = result.filter(
        (p) => p.price >= f.priceRange[0] && p.price <= f.priceRange[1]
      );
    }

    if (f.minRating > 0) {
      result = result.filter((p) => p.rating >= f.minRating);
    }

    if (f.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (f.onSaleOnly) {
      result = result.filter((p) => p.discount != null && p.discount > 0);
    }

    if (f.newArrivalsOnly) {
      result = result.filter((p) => p.isNew);
    }

    return result;
  }, [activeFilters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "cheapest":
          return a.price - b.price;
        case "most-expensive":
          return b.price - a.price;
        case "best-selling":
          return b.sold - a.sold;
        case "newest":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
        case "highest-rated":
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        case "most-popular":
          return b.sold - a.sold;
        case "featured":
        default:
          return (
            (b.discount || 0) * 0.3 +
            b.sold * 0.3 +
            b.rating * 20 +
            (b.isNew ? 50 : 0) -
            ((a.discount || 0) * 0.3 + a.sold * 0.3 + a.rating * 20 + (a.isNew ? 50 : 0))
          );
      }
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const pagedProducts = sortedProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleFilterChange = useCallback(
    (partial: Partial<FilterState>) => {
      if (isMobile) {
        setMobileFilters((prev) => ({ ...prev, ...partial }));
      } else {
        setAppliedFilters((prev) => ({ ...prev, ...partial }));
        setPage(1);
      }
    },
    [isMobile]
  );

  const handleApplyMobileFilters = useCallback(() => {
    setAppliedFilters({ ...mobileFilters });
    setFilterOpen(false);
    setPage(1);
  }, [mobileFilters]);

  const handleRemoveFilter = useCallback(
    (partial: Partial<FilterState>) => {
      setAppliedFilters((prev) => ({ ...prev, ...partial }));
      setMobileFilters((prev) => ({ ...prev, ...partial }));
      setPage(1);
    },
    []
  );

  const handleResetFilters = useCallback(() => {
    const reset: FilterState = { ...DEFAULT_FILTERS };
    setMobileFilters(reset);
    setAppliedFilters(reset);
    setSearchParams({});
    setPage(1);
  }, [setSearchParams]);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setPage(1);
  }, []);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];
    const f = appliedFilters;

    f.categories.forEach((cat) => {
      const catObj = categories.find((c) => c.slug === cat);
      chips.push({
        key: `cat-${cat}`,
        label: `دسته: ${catObj?.label || cat}`,
        onRemove: () =>
          handleRemoveFilter({
            categories: f.categories.filter((c) => c !== cat),
          }),
      });
    });

    f.brands.forEach((brand) => {
      chips.push({
        key: `brand-${brand}`,
        label: `برند: ${brand}`,
        onRemove: () =>
          handleRemoveFilter({
            brands: f.brands.filter((b) => b !== brand),
          }),
      });
    });

    f.sizes.forEach((size) => {
      chips.push({
        key: `size-${size}`,
        label: `سایز: ${size}`,
        onRemove: () =>
          handleRemoveFilter({
            sizes: f.sizes.filter((s) => s !== size),
          }),
      });
    });

    f.colors.forEach((color) => {
      chips.push({
        key: `color-${color}`,
        label: `رنگ: ${color}`,
        onRemove: () =>
          handleRemoveFilter({
            colors: f.colors.filter((c) => c !== color),
          }),
      });
    });

    if (f.priceRange[0] > PRICE_MIN || f.priceRange[1] < PRICE_MAX) {
      chips.push({
        key: "price",
        label: `قیمت: ${f.priceRange[0].toLocaleString("fa-IR")} - ${f.priceRange[1].toLocaleString("fa-IR")}`,
        onRemove: () =>
          handleRemoveFilter({ priceRange: [PRICE_MIN, PRICE_MAX] }),
      });
    }

    if (f.minRating > 0) {
      chips.push({
        key: "rating",
        label: `امتیاز: ${f.minRating}+`,
        onRemove: () => handleRemoveFilter({ minRating: 0 }),
      });
    }

    if (f.inStockOnly) {
      chips.push({
        key: "stock",
        label: "موجود",
        onRemove: () => handleRemoveFilter({ inStockOnly: false }),
      });
    }

    if (f.onSaleOnly) {
      chips.push({
        key: "sale",
        label: "حراجی",
        onRemove: () => handleRemoveFilter({ onSaleOnly: false }),
      });
    }

    if (f.newArrivalsOnly) {
      chips.push({
        key: "new",
        label: "جدید",
        onRemove: () => handleRemoveFilter({ newArrivalsOnly: false }),
      });
    }

    return chips;
  }, [appliedFilters, handleRemoveFilter]);

  const hasActiveFilters = activeFilterChips.length > 0;

  return (
    <section className="ps" dir="rtl">
      <div className="container">
        {/* Page Header */}
       

        <ProductToolbar
          totalProducts={sortedProducts.length}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        {/* Mobile Filter Toggle */}
        <div className="d-lg-none mb-3">
          <button
            className="ps-mobile-filter-btn"
            onClick={() => setFilterOpen(true)}
          >
            <i className="bi bi-funnel me-2" />
            فیلترها
            {appliedFilters.categories.length +
              appliedFilters.brands.length +
              appliedFilters.sizes.length +
              appliedFilters.colors.length +
              (appliedFilters.priceRange[0] > PRICE_MIN ||
              appliedFilters.priceRange[1] < PRICE_MAX
                ? 1
                : 0) +
              (appliedFilters.minRating > 0 ? 1 : 0) +
              (appliedFilters.inStockOnly ? 1 : 0) +
              (appliedFilters.onSaleOnly ? 1 : 0) +
              (appliedFilters.newArrivalsOnly ? 1 : 0) >
              0 && (
                <span className="ps-mobile-filter-count">
                  {appliedFilters.categories.length +
                    appliedFilters.brands.length +
                    appliedFilters.sizes.length +
                    appliedFilters.colors.length}
                </span>
              )}
          </button>
        </div>

        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div
                className="ps-filter-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFilterOpen(false)}
              />
              <motion.div
                className="ps-filter-drawer"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <div className="ps-filter-drawer-header">
                  <h5 className="ps-filter-drawer-title">
                    <i className="bi bi-funnel me-2" />
                    فیلترها
                  </h5>
                  <button
                    className="ps-filter-drawer-close"
                    onClick={() => setFilterOpen(false)}
                    aria-label="بستن فیلترها"
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <div className="ps-filter-drawer-body">
                  <ProductFilters
                    filters={mobileFilters}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                    isMobile={true}
                    onApply={handleApplyMobileFilters}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Active Filter Chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              className="ps-chips"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="ps-chips-list">
                {activeFilterChips.map((chip) => (
                  <span key={chip.key} className="ps-chip">
                    {chip.label}
                    <button
                      className="ps-chip-remove"
                      onClick={chip.onRemove}
                      aria-label={`حذف فیلتر ${chip.label}`}
                    >
                      <i className="bi bi-x" />
                    </button>
                  </span>
                ))}
                {hasActiveFilters && (
                  <button
                    className="ps-chips-clear"
                    onClick={handleResetFilters}
                  >
                    <i className="bi bi-x-circle me-1" />
                    پاک کردن همه
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="row g-4">
          {/* Desktop Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="ps-sidebar">
              <ProductFilters
                filters={appliedFilters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                isMobile={false}
              />
            </div>
          </div>

          <div className="col-lg-9">
            {pagedProducts.length > 0 ? (
              <ProductGrid products={pagedProducts} searchQuery={activeFilters.search} />
            ) : (
              <div className="ps-empty">
                <div className="ps-empty-icon">
                  {activeFilters.search ? (
                    <i className="bi bi-search" />
                  ) : hasActiveFilters ? (
                    <i className="bi bi-funnel" />
                  ) : (
                    <i className="bi bi-box" />
                  )}
                </div>
                <h3 className="ps-empty-title">
                  {activeFilters.search
                    ? "نتیجه‌ای یافت نشد"
                    : "محصولی یافت نشد"}
                </h3>
                <p className="ps-empty-desc">
                  {activeFilters.search
                    ? `هیچ محصولی با عبارت "${activeFilters.search}" مطابقت ندارد.`
                    : "هیچ محصولی با فیلترهای انتخابی مطابقت ندارد."}
                </p>
                <div className="ps-empty-actions">
                  {hasActiveFilters && (
                    <button
                      className="btn-vesta-primary rounded-pill"
                      onClick={handleResetFilters}
                    >
                      <i className="bi bi-x-lg me-2" />
                      پاک کردن فیلترها
                    </button>
                  )}
                  <a
                    href="/products"
                    className="btn-vesta-outline rounded-pill"
                    onClick={(e) => {
                      e.preventDefault();
                      handleResetFilters();
                    }}
                  >
                    <i className="bi bi-grid me-2" />
                    مشاهده همه محصولات
                  </a>
                </div>
              </div>
            )}

            {totalPages > 1 && (
              <ProductPagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
