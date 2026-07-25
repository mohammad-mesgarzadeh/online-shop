type Props = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function BlogCategories({
  categories,
  activeCategory,
  onCategoryChange,
}: Props) {
  return (
    <section className="pb-5">
      <div className="container">
        <div className="d-flex flex-nowrap flex-md-wrap gap-2 justify-content-start justify-content-md-center overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: "touch" }}>
          {categories.map((item) => (
            <button
              key={item}
              className={`btn rounded-pill flex-shrink-0 ${
                activeCategory === item
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() => onCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}