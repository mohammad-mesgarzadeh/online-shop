import ProductToolbar from "../components/products/ProductToolbar";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import ProductPagination from "../components/products/ProductPagination";

export default function Products() {
  return (
    <section className="py-5">
      <div className="container">

        <ProductToolbar />

        <div className="row g-4">

          <div className="col-lg-3">
            <ProductFilters />
          </div>

          <div className="col-lg-9">
            <ProductGrid />
            <ProductPagination />
          </div>

        </div>

      </div>
    </section>
  );
}