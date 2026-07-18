import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  id: string;
  title: string;
  price: string;
  image: string;
  discount?: number;
};

export default function ProductCard({ id, title, price, image, discount }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden"
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/products/${id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/products/${id}`);
        }
      }}
    >
      <div
        style={{
          height: "250px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {discount ? (
          <span
            className="badge bg-danger position-absolute top-0 start-0 m-2"
            style={{ zIndex: 2 }}
          >
            {discount}%-
          </span>
        ) : null}
        <img
          src={image}
          alt={title}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="fw-bold mb-2">{title}</h6>

        <p className="text-primary fw-bold mb-0">{price}</p>

        <span
          className="btn btn-outline-primary rounded-pill mt-2"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${id}`);
          }}
        >
          مشاهده محصول
        </span>
      </div>
    </div>
  );
}
