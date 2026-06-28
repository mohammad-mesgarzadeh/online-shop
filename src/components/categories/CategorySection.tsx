import CategoryCard from "./CategoryCard";

type Props = {
  title: string;
  categories: string[];
};

export default function CategorySection({
  title,
  categories,
}: Props) {
  return (
    <section className="pb-5">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h3 className="fw-bold">
            {title}
          </h3>

          <button className="btn btn-link">
            مشاهده همه
          </button>

        </div>

        <div className="row g-4">

          {categories.map((item) => (
            <div
              key={item}
              className="col-sm-6 col-lg-3"
            >
              <CategoryCard
                title={item}
                image={`https://picsum.photos/400/300?random=${item}`}
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}