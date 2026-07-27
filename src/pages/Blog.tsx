import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogArticles } from "../data/blog";
import { useLanguage } from "../context/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Blog() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogArticles.map((a) => a.category)));
    return ["همه", ...cats];
  }, []);

  const filteredArticles = useMemo(() => {
    let result = blogArticles;
    if (activeCategory !== "همه") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const featured = blogArticles[0];

  return (
    <>
      {/* Hero */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--c-gray-900) 0%, #1a1a2e 50%, var(--c-gray-800) 100%)",
        minHeight: 380,
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 50%, rgba(108,99,255,0.15) 0%, transparent 60%)",
        }} />

        {/* Decorative dots */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(108,99,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "var(--space-20) var(--space-4)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: "var(--radius-full)",
                background: "rgba(108,99,255,0.12)",
                border: "1px solid rgba(108,99,255,0.2)",
                color: "var(--c-primary-light)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-bold)",
                marginBottom: "var(--space-5)",
              }}
            >
              <i className="bi bi-pencil-square" />
               {t("blog.title")}
            </motion.span>

            <h1 style={{
              color: "var(--c-white)",
              fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
              fontWeight: "var(--font-black)",
              lineHeight: "var(--leading-tight)",
              marginBottom: "var(--space-4)",
            }}>
               {t("blog.heroTitle")}
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "var(--text-lg)",
              marginBottom: "var(--space-8)",
            }}>
               {t("blog.heroDesc")}
            </p>

            {/* Search */}
            <div style={{
              maxWidth: 480,
              margin: "0 auto",
              position: "relative",
            }}>
              <i className="bi bi-search" style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--c-gray-400)",
                fontSize: "var(--text-lg)",
              }} />
              <input
                type="text"
                placeholder={t("blog.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 20px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.06)",
                  color: "var(--c-white)",
                  fontSize: "var(--text-base)",
                  fontFamily: "var(--font-primary)",
                  backdropFilter: "blur(8px)",
                  outline: "none",
                  transition: "border-color var(--duration-fast)",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--c-primary)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section style={{ paddingBottom: "var(--space-12)" }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-border-light)",
                  cursor: "pointer",
                  transition: "box-shadow var(--duration-normal) var(--ease-default)",
                }}
                className="hover-lift"
                onClick={() => navigate(`/blog/${featured.id}`)}
              >
                <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s var(--ease-default)" }}
                    onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = ""; }}
                  />
                </div>
                <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      background: "var(--c-primary-bg)",
                      color: "var(--c-primary)",
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--font-bold)",
                    }}>
                      <i className="bi bi-star-fill" style={{ fontSize: 10 }} />
                      {t("blog.featuredArticle")}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
                      <i className="bi bi-clock" />
                      {featured.readingTime} {t("blog.readTime")}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: "clamp(var(--text-xl), 3vw, var(--text-2xl))",
                    fontWeight: "var(--font-extrabold)",
                    color: "var(--c-gray-900)",
                    lineHeight: "var(--leading-tight)",
                    marginBottom: "var(--space-3)",
                  }}>
                    {featured.title}
                  </h2>

                  <p style={{
                    color: "var(--c-gray-500)",
                    lineHeight: "var(--leading-relaxed)",
                    marginBottom: "var(--space-4)",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {featured.excerpt}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "auto" }}>
                    {featured.authorAvatar && (
                      <img
                        src={featured.authorAvatar}
                        alt={featured.author}
                        style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-semibold)", color: "var(--c-gray-700)" }}>
                        {featured.author}
                      </div>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
                        {featured.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section style={{ paddingBottom: "var(--space-8)" }}>
        <div className="container">
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            justifyContent: "center",
          }}>
            {categories.map((item) => (
              <button
                key={item}
                className="touch-target"
                style={{
                  padding: "8px 20px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid",
                  borderColor: activeCategory === item ? "var(--c-primary)" : "var(--c-gray-200)",
                  background: activeCategory === item ? "var(--c-primary)" : "var(--c-surface)",
                  color: activeCategory === item ? "#fff" : "var(--c-gray-500)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-semibold)",
                  cursor: "pointer",
                  transition: "all var(--duration-fast) var(--ease-default)",
                  fontFamily: "var(--font-primary)",
                }}
                onClick={() => setActiveCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ paddingBottom: "var(--space-20)" }}>
        <div className="container">
          {filteredArticles.length > 0 ? (
            <motion.div
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              key={activeCategory}
            >
              {filteredArticles.map((article) => (
                <motion.div key={article.id} variants={cardVariants}>
                  <BlogCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="bi bi-journal-text" />
              </div>
              <h4 className="empty-state-title">{t("blog.noArticles")}</h4>
              <p className="empty-state-desc">{t("blog.noArticlesDesc")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function BlogCard({ article }: { article: typeof blogArticles[0] }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--c-surface)",
        border: "1px solid var(--c-border-light)",
        cursor: "pointer",
        transition: "all var(--duration-normal) var(--ease-default)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="hover-lift"
      onClick={() => navigate(`/blog/${article.id}`)}
    >
      <div style={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s var(--ease-default)" }}
          onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = ""; }}
        />
        <span style={{
          position: "absolute",
          top: 12,
          right: 12,
          padding: "4px 10px",
          borderRadius: "var(--radius-full)",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          color: "white",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-semibold)",
        }}>
          {article.category}
        </span>
      </div>

      <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
            <i className="bi bi-clock" />
             {article.readingTime} {t("blog.readTime")}
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
            {article.date}
          </span>
        </div>

        <h3 style={{
          fontSize: "var(--text-base)",
          fontWeight: "var(--font-bold)",
          color: "var(--c-gray-900)",
          lineHeight: "var(--leading-snug)",
          marginBottom: "var(--space-2)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {article.title}
        </h3>

        <p style={{
          fontSize: "var(--text-sm)",
          color: "var(--c-gray-500)",
          lineHeight: "var(--leading-relaxed)",
          marginBottom: "var(--space-4)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}>
          {article.excerpt}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginTop: "auto" }}>
          {article.authorAvatar && (
            <img
              src={article.authorAvatar}
              alt={article.author}
              style={{ width: 28, height: 28, borderRadius: "var(--radius-full)", objectFit: "cover" }}
            />
          )}
          <div>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--font-semibold)", color: "var(--c-gray-700)" }}>
              {article.author}
            </span>
            {article.authorRole && (
              <span style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)", display: "block" }}>
                {article.authorRole}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
