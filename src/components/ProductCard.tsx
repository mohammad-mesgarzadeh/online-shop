import "./ProductCard.css";
type ProductCardProps = {
    title: string;
    price: string;
    image: string;
};

export default function ProductCard({
    title,
    price,
    image,
}: ProductCardProps) {
    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 product-card">

            <img
                src={image}
                alt={title}
                className="card-img-top p-4"
            />

            <div className="card-body">

                <h6 className="card-title">
                    {title}
                </h6>

                <div className="text-warning mb-2">
                    ★★★★★
                </div>

                <p className="fw-bold text-primary">
                    {price}
                </p>

                <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-cart-plus"></i>
                </button>

            </div>

        </div>
    );
}