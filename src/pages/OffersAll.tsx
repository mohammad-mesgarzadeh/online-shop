import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductFilters from "../components/products/ProductFilters";
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
  onSaleOnly: true,
  newArrivalsOnly: false,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function OffersAll() {
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });

  const perPage = 9;

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 992
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile && filterOpen) setFilterOpen(false);
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
    return () => { document.body.style.overflow = ""; };
  }, [filterOpen]);

  const activeFilters = isMobile ? mobileFilters : appliedFilters;

  const saleProducts = useMemo(() => products.filter((p) => p.discount && p.discount > 0), []);

  const filteredProducts = useMemo(() => {
    let result = saleProducts;
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
      result = result.filter((p) => p.sizes.some((s) => f.sizes.includes(s)));
    }
    if (f.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => f.colors.includes(c)));
    }
    if (f.priceRange[0] > PRICE_MIN || f.priceRange[1] < PRICE_MAX) {
      result = result.filter((p) => p.price >= f.priceRange[0] && p.price <= f.priceRange[1]);
    }
    if (f.minRating > 0) {
      result = result.filter((p) => p.rating >= f.minRating);
    }
    if (f.newArrivalsOnly) {
      result = result.filter((p) => p.isNew);
    }

    return result;
  }, [activeFilters, saleProducts]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "cheapest": return a.price - b.price;
        case "most-expensive": return b.price - a.price;
        case "best-selling": return b.sold - a.sold;
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "highest-rated": return b.rating - a.rating || b.reviewCount - a.reviewCount;
        case "most-popular": return b.sold - a.sold;
        case "featured":
        default:
          return ((b.discount || 0) * 0.5 + b.sold * 0.3 + b.rating * 20) -
                 ((a.discount || 0) * 0.5 + a.sold * 0.3 + a.rating * 20);
      }
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const pagedProducts = sortedProducts.slice((page - 1) * perPage, page * perPage);

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

  const handleRemoveFilter = useCallback((partial: Partial<FilterState>) => {
    setAppliedFilters((prev) => ({ ...prev, ...partial }));
    setMobileFilters((prev) => ({ ...prev, ...partial }));
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    const reset: FilterState = { ...DEFAULT_FILTERS };
    setMobileFilters(reset);
    setAppliedFilters(reset);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setPage(1);
  }, []);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];
    const f = appliedFilters;
    f.categories.forEach((cat) => {
      const catObj = categories.find((c) => c.slug === cat);
      chips.push({ key: `cat-${cat}`, label: `دسته: ${catObj?.label || cat}`, onRemove: () => handleRemoveFilter({ categories: f.categories.filter((c) => c !== cat) }) });
    });
    f.brands.forEach((brand) => {
      chips.push({ key: `brand-${brand}`, label: `برند: ${brand}`, onRemove: () => handleRemoveFilter({ brands: f.brands.filter((b) => b !== brand) }) });
    });
    if (f.priceRange[0] > PRICE_MIN || f.priceRange[1] < PRICE_MAX) {
      chips.push({ key: "price", label: `قیمت: ${f.priceRange[0].toLocaleString("fa-IR")} - ${f.priceRange[1].toLocaleString("fa-IR")}`, onRemove: () => handleRemoveFilter({ priceRange: [PRICE_MIN, PRICE_MAX] }) });
    }
    if (f.minRating > 0) {
      chips.push({ key: "rating", label: `امتیاز: ${f.minRating}+`, onRemove: () => handleRemoveFilter({ minRating: 0 }) });
    }
    return chips;
  }, [appliedFilters, handleRemoveFilter]);

  const hasActiveFilters = activeFilterChips.length > 0;

  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--c-gray-900) 0%, #1a1035 100%)",
        padding: "var(--space-16) 0 var(--space-12)",
      }}>
        <div className="container">
          <motion.div
            dir="rtl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <nav style={{ marginBottom: "var(--space-4)" }}>
              <ol style={{ display: "flex", alignItems: "center", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                <li><Link to="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "var(--text-sm)", textDecoration: "none" }}>خانه</Link></li>
                <li style={{ color: "rgba(255,255,255,0.3)" }}>/</li>
                <li><Link to="/offers" style={{ color: "rgba(255,255,255,0.5)", fontSize: "var(--text-sm)", textDecoration: "none" }}>پیشنهادات ویژه</Link></li>
                <li style={{ color: "rgba(255,255,255,0.3)" }}>/</li>
                <li style={{ color: "var(--c-white)", fontSize: "var(--text-sm)", fontWeight: "var(--font-semibold)" }}>همه محصولات تخفیف‌دار</li>
              </ol>
            </nav>
            <h1 style={{
              color: "var(--c-white)",
              fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))",
              fontWeight: "var(--font-extrabold)",
              marginBottom: "var(--space-2)",
            }}>
              <i className="bi bi-tag-fill me-2" style={{ color: "var(--c-danger)" }} />
              همه محصولات تخفیف‌دار
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "var(--text-base)" }}>
              {saleProducts.length} محصول با تخفیف ویژه
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section dir="rtl" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}>
        <div className="container">
          <ProductToolbar
            totalProducts={sortedProducts.length}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          <div className="d-lg-none mb-3">
            <button className="ps-mobile-filter-btn" onClick={() => setFilterOpen(true)}>
              <i className="bi bi-funnel me-2" />
              فیلترها
              {hasActiveFilters && (
                <span className="ps-mobile-filter-count">{activeFilterChips.length}</span>
              )}
            </button>
          </div>

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
                    <button className="ps-filter-drawer-close" onClick={() => setFilterOpen(false)} aria-label="بستن فیلترها">
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>
                  <div className="ps-filter-drawer-body">
                    <ProductFilters filters={mobileFilters} onFilterChange={handleFilterChange} onReset={handleResetFilters} isMobile={true} onApply={handleApplyMobileFilters} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div className="ps-chips" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <div className="ps-chips-list">
                  {activeFilterChips.map((chip) => (
                    <span key={chip.key} className="ps-chip">
                      {chip.label}
                      <button className="ps-chip-remove" onClick={chip.onRemove} aria-label={`حذف فیلتر ${chip.label}`}>
                        <i className="bi bi-x" />
                      </button>
                    </span>
                  ))}
                  <button className="ps-chips-clear" onClick={handleResetFilters}>
                    <i className="bi bi-x-circle me-1" />
                    پاک کردن همه
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="row g-4">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="ps-sidebar">
                <ProductFilters filters={appliedFilters} onFilterChange={handleFilterChange} onReset={handleResetFilters} isMobile={false} />
              </div>
            </div>

            <div className="col-lg-9">
              {pagedProducts.length > 0 ? (
                <motion.div className="product-grid" variants={containerVariants} initial="hidden" animate="visible" key={`page-${page}-${sortBy}`}>
                  {pagedProducts.map((product, index) => (
                    <motion.div key={product.id} variants={cardVariants}>
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="ps-empty">
                  <div className="ps-empty-icon">
                    <i className="bi bi-tag" />
                  </div>
                  <h3 className="ps-empty-title">محصول تخفیف‌داری یافت نشد</h3>
                  <p className="ps-empty-desc">هیچ محصولی با فیلترهای انتخابی مطابقت ندارد.</p>
                  <div className="ps-empty-actions">
                    <button className="btn-vesta-primary rounded-pill" onClick={handleResetFilters}>
                      <i className="bi bi-x-lg me-2" />
                      پاک کردن فیلترها
                    </button>
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
    </>
  );
}
