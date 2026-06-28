export default function BlogCategories() {
  const categories = [
    "مد و استایل",
    "راهنمای خرید",
    "ترندها",
    "اکسسوری",
    "مراقبت لباس",
  ];

  return (
    <section className="pb-5">
      <div className="container">

        <div className="d-flex flex-wrap gap-2 justify-content-center">

          {categories.map((item) => (
            <button
              key={item}
              className="btn btn-outline-dark rounded-pill"
            >
              {item}
            </button>
          ))}

        </div>

      </div>
    </section>
  );
}