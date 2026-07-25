import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import ProductPagination from "../components/products/ProductPagination";

import { products } from "../data/products";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState(searchParam);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const perPage = 9;

  const filteredProducts = useMemo(() => {
    let result = products;

    if (search) {
      result = result.filter((p) =>
        p.title.includes(search)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    return result;
  }, [search, selectedCategories]);

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
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const pagedProducts = sortedProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1);
  };

  return (
    <section className="py-5">
      <div className="container">
        <ProductToolbar
          totalProducts={sortedProducts.length}
          sortBy={sortBy}
          onSortChange={(value) => {
            setSortBy(value);
            setPage(1);
          }}
        />

        {/* Mobile Filter Toggle */}
        <div className="d-lg-none mb-3">
          <button
            className="btn btn-outline-primary rounded-pill w-100 touch-target"
            onClick={() => setFilterOpen(true)}
          >
            <i className="bi bi-funnel me-2" />
            فیلترها
            {selectedCategories.length > 0 && (
              <span className="badge bg-primary ms-2">{selectedCategories.length}</span>
            )}
          </button>
        </div>

        {/* Mobile Filter Overlay */}
        <div
          className={`products-filter-overlay ${filterOpen ? "active" : ""}`}
          onClick={() => setFilterOpen(false)}
        />

        <div className="row g-4">
          <div className="col-lg-3">
            {/* Mobile Filter Close Header */}
            {filterOpen && (
              <div className="d-lg-none d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">فیلترها</h5>
                <button
                  className="btn btn-sm touch-target"
                  onClick={() => setFilterOpen(false)}
                >
                  <i className="bi bi-x-lg fs-5" />
                </button>
              </div>
            )}
            <div className={`products-filter-sidebar ${filterOpen ? "active" : ""}`}>
              <ProductFilters
                search={search}
                onSearchChange={handleSearchChange}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>

          <div className="col-lg-9">
            {pagedProducts.length > 0 ? (
              <ProductGrid products={pagedProducts} />
            ) : (
              <div className="text-center py-5">
                <i
                  className="bi bi-search text-secondary"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="fw-bold mt-3">محصولی یافت نشد</h5>
                <p className="text-muted">
                  هیچ محصولی با معیارهای جستجوی شما مطابقت ندارد.
                </p>
                <button
                  className="btn btn-outline-primary rounded-pill touch-target"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories([]);
                    setSearchParams({});
                  }}
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <ProductPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
