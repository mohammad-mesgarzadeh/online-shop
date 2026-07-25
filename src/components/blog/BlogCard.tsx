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
      className="card border-0 shadow-sm rounded-4 h-100"
      style={{ cursor: "pointer", transition: "transform var(--duration-fast) var(--easing-default), box-shadow var(--duration-fast) var(--easing-default)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
      onClick={() => navigate(`/blog/${id}`)}
    >
      <div
        className="overflow-hidden"
        style={{ aspectRatio: "16/10" }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>

      <div className="card-body">
        <small
          className="d-inline-flex align-items-center gap-1 mb-2"
          style={{ color: "var(--c-gray-400)", fontSize: "var(--text-xs)" }}
        >
          <i className="bi bi-calendar3" />
          {date}
        </small>

        <h5
          className="fw-bold text-truncate-2 mb-2"
          style={{
            lineHeight: "var(--leading-snug)",
            color: "var(--c-gray-800)",
          }}
        >
          {title}
        </h5>

        <span
          className="d-inline-flex align-items-center gap-1"
          style={{ color: "var(--c-primary)", fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)" }}
        >
          ادامه مطلب
          <i className="bi bi-arrow-left" />
        </span>
      </div>
    </div>
  );
}
