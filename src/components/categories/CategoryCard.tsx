type Props = {
  title: string;
  image: string;
};

export default function CategoryCard({
  title,
  image,
}: Props) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">

      <img
        src={image}
        alt={title}
        className="card-img-top"
        style={{
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div className="card-body text-center">

        <h5 className="fw-bold">
          {title}
        </h5>

        <button className="btn btn-outline-primary rounded-pill">
          مشاهده محصولات
        </button>

      </div>

    </div>
  );
}