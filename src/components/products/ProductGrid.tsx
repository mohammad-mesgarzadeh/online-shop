import ProductCard from "../ProductCard";
import { formatPriceNumber } from "../../utils/formatPrice";

export type ProductGridItem = {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  sold: number;
  createdAt: string;
  discount?: number;
};

type ProductGridProps = {
  products: ProductGridItem[];
};

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="col-md-6 col-xl-4"
        >
          <ProductCard
            id={product.id}
            title={product.title}
            price={`${formatPriceNumber(product.price)} تومان`}
            image={product.image}
            discount={product.discount}
          />
        </div>
      ))}
    </div>
  );
}
