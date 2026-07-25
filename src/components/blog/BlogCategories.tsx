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
        <div
          className="d-flex flex-nowrap flex-md-wrap gap-2 justify-content-start justify-content-md-center overflow-x-auto pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((item) => (
            <button
              key={item}
              className="btn rounded-pill flex-shrink-0 touch-target"
              style={{
                background: activeCategory === item ? "var(--c-gray-900)" : "transparent",
                color: activeCategory === item ? "#fff" : "var(--c-gray-500)",
                border: activeCategory === item ? "none" : "1px solid var(--c-gray-200)",
                fontWeight: "var(--fw-medium)",
                fontSize: "var(--text-sm)",
                transition: "all var(--duration-fast) var(--easing-default)",
              }}
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