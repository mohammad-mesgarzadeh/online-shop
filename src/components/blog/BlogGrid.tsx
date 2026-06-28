import BlogCard from "./BlogCard";

export default function BlogGrid() {
  const posts = [
    {
      title: "چگونه لباس مناسب اندام خود انتخاب کنیم؟",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
      date: "12 خرداد 1405",
    },
    {
      title: "راهنمای خرید کفش اسپرت",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      date: "10 خرداد 1405",
    },
    {
      title: "اکسسوری‌های ضروری برای استایل مردانه",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      date: "8 خرداد 1405",
    },
    {
      title: "بهترین رنگ‌های لباس تابستانی",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
      date: "5 خرداد 1405",
    },
  ];

  return (
    <section className="pb-5">
      <div className="container">

        <div className="row g-4">

          {posts.map((post) => (
            <div
              key={post.title}
              className="col-md-6 col-xl-3"
            >
              <BlogCard {...post} />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}