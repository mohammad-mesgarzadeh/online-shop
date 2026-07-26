import ProductCard from "../ProductCard";
import type { ProductItem } from "../../data/products";

type ProductGridProps = {
  products: ProductItem[];
  searchQuery?: string;
};

export default function ProductGrid({ products, searchQuery }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
