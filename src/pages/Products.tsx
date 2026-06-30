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

        <div className="row g-4">
          <div className="col-lg-3">
            <ProductFilters
              search={search}
              onSearchChange={handleSearchChange}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
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
                  className="btn btn-outline-primary rounded-pill"
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
