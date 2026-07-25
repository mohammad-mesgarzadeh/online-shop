import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  image: string;
  date: string;
};

export default function BlogCard({
  id,
  title,
  image,
  date,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="card border-0 shadow-sm rounded-5 h-100"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/blog/${id}`)}
    >
      <img
        src={image}
        alt={title}
        className="card-img-top blog-card-image"
        style={{
          height: "250px",
          objectFit: "cover",
        }}
        loading="lazy"
      />

      <div className="card-body">
        <small className="text-muted">
          {date}
        </small>

        <h5 className="fw-bold mt-2 text-truncate-2" style={{ lineHeight: "1.5" }}>
          {title}
        </h5>

        <button
          className="btn btn-link px-0 touch-target"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/blog/${id}`);
          }}
        >
          ادامه مطلب
        </button>
      </div>
    </div>
  );
}
