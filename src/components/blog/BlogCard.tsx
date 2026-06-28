type Props = {
  title: string;
  image: string;
  date: string;
};

export default function BlogCard({
  title,
  image,
  date,
}: Props) {
  return (
    <div className="card border-0 shadow-sm rounded-5 h-100">

      <img
        src={image}
        alt={title}
        className="card-img-top"
        style={{
          height: "250px",
          objectFit: "cover",
        }}
      />

      <div className="card-body">

        <small className="text-muted">
          {date}
        </small>

        <h5 className="fw-bold mt-2">
          {title}
        </h5>

        <button className="btn btn-link px-0">
          ادامه مطلب
        </button>

      </div>

    </div>
  );
}