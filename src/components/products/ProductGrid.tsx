import ProductCard from "../ProductCard";
import type { ProductItem } from "../../data/products";

type ProductGridProps = {
  products: ProductItem[];
};

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
