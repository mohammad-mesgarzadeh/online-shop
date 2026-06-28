import ProductCard from "../ProductCard";

export default function ProductGrid() {
  const products = Array(12).fill({
    title: "هودی مردانه",
    price: "890,000 تومان",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  });

  return (
    <div className="row g-4">

      {products.map((product, index) => (
        <div
          key={index}
          className="col-md-6 col-xl-4"
        >
          <ProductCard {...product} />
        </div>
      ))}

    </div>
  );
}