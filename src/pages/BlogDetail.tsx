import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogArticles } from "../data/blog";
import { useLanguage } from "../context/LanguageContext";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const article = blogArticles.find((a) => a.id === id);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const headings = useMemo(() => {
    if (!article) return [];
    const lines = article.content.split("\n");
    const result: { text: string; index: number }[] = [];
    lines.forEach((line, i) => {
      if (line.trim() === "") return;
      if (line.match(/^[\d۰-۹]+\./) || (line.startsWith("۱.") || line.startsWith("۲.") || line.startsWith("۳.") || line.startsWith("۴.") || line.startsWith("۵."))) {
        result.push({ text: line.replace(/^[\d۰-۹]+\.\s*/, ""), index: i });
      }
    });
    return result;
  }, [article]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return blogArticles
      .filter((a) => a.id !== article.id && a.category === article.category)
      .slice(0, 3);
  }, [article]);

  const otherArticles = useMemo(() => {
    if (!article) return [];
    return blogArticles.filter((a) => a.id !== article.id).slice(0, 3);
  }, [article]);

  const displayRelated = relatedArticles.length > 0 ? relatedArticles : otherArticles;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = useCallback(() => {
    const url = window.location.href;
    const title = article?.title || "";
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  }, [article]);

  if (!article) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="bi bi-exclamation-circle" />
          </div>
          <h3 className="empty-state-title">{t("blogDetail.notFound")}</h3>
          <p className="empty-state-desc">{t("blogDetail.notFoundDesc")}</p>
          <Link to="/blog" className="btn btn-vesta-primary rounded-pill">
            {t("blogDetail.backToBlog")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "var(--c-gray-200)",
        zIndex: "var(--z-toast)",
      }}>
        <motion.div
          style={{
            height: "100%",
            background: "var(--c-primary)",
            borderRadius: "0 2px 2px 0",
          }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Hero Image */}
      <section style={{
        position: "relative",
        width: "100%",
        maxHeight: 500,
        overflow: "hidden",
        background: "var(--c-gray-900)",
      }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            maxHeight: 500,
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        }} />
      </section>

      {/* Article Content */}
      <section style={{ paddingBottom: "var(--space-20)" }}>
        <div className="container">
          <div className="row" style={{ gap: "var(--space-8)" }}>
            {/* Main Content */}
            <div className="col-lg-8" ref={contentRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ marginTop: "calc(-1 * var(--space-12))", position: "relative", zIndex: 2 }}
              >
                {/* Meta */}
                <div style={{ marginBottom: "var(--space-5)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)", flexWrap: "wrap" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 14px",
                      borderRadius: "var(--radius-full)",
                      background: "var(--c-primary-bg)",
                      color: "var(--c-primary)",
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--font-bold)",
                    }}>
                      {article.category}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "var(--text-sm)", color: "var(--c-gray-400)" }}>
                      <i className="bi bi-clock" />
                      {article.readingTime} {t("blogDetail.minRead")}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 style={{
                  fontSize: "clamp(var(--text-2xl), 4vw, var(--text-4xl))",
                  fontWeight: "var(--font-black)",
                  color: "var(--c-gray-900)",
                  lineHeight: "var(--leading-tight)",
                  marginBottom: "var(--space-6)",
                }}>
                  {article.title}
                </h1>

                {/* Author + Date + Share */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-4) 0",
                  borderTop: "1px solid var(--c-border-light)",
                  borderBottom: "1px solid var(--c-border-light)",
                  marginBottom: "var(--space-8)",
                  flexWrap: "wrap",
                  gap: "var(--space-3)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    {article.authorAvatar && (
                      <img
                        src={article.authorAvatar}
                        alt={article.author}
                        style={{ width: 44, height: 44, borderRadius: "var(--radius-full)", objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-bold)", color: "var(--c-gray-800)" }}>
                        {article.author}
                      </div>
                      {article.authorRole && (
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
                          {article.authorRole}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--c-gray-400)" }}>
                      <i className="bi bi-calendar3 me-1" />
                      {article.date}
                    </span>
                    <button
                      onClick={handleShare}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 14px",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--c-gray-200)",
                        background: "var(--c-surface)",
                        color: "var(--c-gray-600)",
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-semibold)",
                        cursor: "pointer",
                        transition: "all var(--duration-fast)",
                        fontFamily: "var(--font-primary)",
                      }}
                    >
                      <i className="bi bi-share" />
                      {t("blogDetail.share")}
                    </button>
                  </div>
                </div>

                {/* Article Body */}
                <div style={{
                  fontSize: "var(--text-lg)",
                  lineHeight: "2",
                  color: "var(--c-gray-700)",
                }}>
                  {article.content.split("\n").map((line, i) => {
                    if (line.trim() === "") {
                      return <div key={i} style={{ height: "var(--space-4)" }} />;
                    }
                    const isHeading = line.match(/^[\d۰-۹]+\./) || (line.startsWith("۱.") || line.startsWith("۲.") || line.startsWith("۳.") || line.startsWith("۴.") || line.startsWith("۵."));
                    const isBullet = line.startsWith("- ");

                    if (isHeading) {
                      return (
                        <h3
                          key={i}
                          id={`heading-${i}`}
                          style={{
                            fontSize: "var(--text-xl)",
                            fontWeight: "var(--font-bold)",
                            color: "var(--c-gray-900)",
                            marginTop: "var(--space-8)",
                            marginBottom: "var(--space-3)",
                            lineHeight: "var(--leading-tight)",
                          }}
                        >
                          {line}
                        </h3>
                      );
                    }

                    if (isBullet) {
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "var(--space-2)",
                            padding: "var(--space-1) 0",
                            paddingRight: "var(--space-4)",
                          }}
                        >
                          <i className="bi bi-dot" style={{ color: "var(--c-primary)", fontSize: "var(--text-2xl)", lineHeight: 1, marginTop: -2 }} />
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }

                    return <p key={i} style={{ marginBottom: "var(--space-3)" }}>{line}</p>;
                  })}
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-2)",
                    marginTop: "var(--space-8)",
                    paddingTop: "var(--space-6)",
                    borderTop: "1px solid var(--c-border-light)",
                  }}>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "var(--radius-full)",
                          background: "var(--c-gray-100)",
                          color: "var(--c-gray-600)",
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--font-medium)",
                        }}
                      >
                        # {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Back Link */}
                <div style={{ marginTop: "var(--space-8)" }}>
                  <Link
                    to="/blog"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 24px",
                      borderRadius: "var(--radius-full)",
                      border: "1.5px solid var(--c-gray-200)",
                      color: "var(--c-gray-700)",
                      fontWeight: "var(--font-semibold)",
                      fontSize: "var(--text-sm)",
                      textDecoration: "none",
                      transition: "all var(--duration-fast)",
                    }}
                  >
                    <i className="bi bi-arrow-right" />
                    {t("blogDetail.backToBlogBtn")}
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Sticky TOC */}
            <div className="col-lg-4">
              <div style={{
                position: "sticky",
                top: "calc(var(--navbar-height) + 24px)",
              }}>
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div style={{
                    padding: "var(--space-5)",
                    borderRadius: "var(--radius-xl)",
                    background: "var(--c-surface)",
                    border: "1px solid var(--c-border-light)",
                    marginBottom: "var(--space-6)",
                  }}>
                    <h4 style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-bold)",
                      color: "var(--c-gray-800)",
                      marginBottom: "var(--space-3)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <i className="bi bi-list-nested" style={{ color: "var(--c-primary)" }} />
                      {t("blogDetail.tableOfContents")}
                    </h4>
                    <nav>
                      {headings.map((h, i) => (
                        <a
                          key={h.index}
                          href={`#heading-${h.index}`}
                          style={{
                            display: "block",
                            padding: "8px 12px",
                            borderRadius: "var(--radius-md)",
                            fontSize: "var(--text-sm)",
                            color: activeHeading === i ? "var(--c-primary)" : "var(--c-gray-500)",
                            fontWeight: activeHeading === i ? "var(--font-semibold)" : "var(--font-medium)",
                            background: activeHeading === i ? "var(--c-primary-bg)" : "transparent",
                            textDecoration: "none",
                            transition: "all var(--duration-fast)",
                            marginBottom: 2,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveHeading(i);
                            document.getElementById(`heading-${h.index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Newsletter CTA */}
                <div style={{
                  padding: "var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  background: "linear-gradient(135deg, var(--c-gray-900) 0%, var(--c-primary-dark) 100%)",
                  textAlign: "center",
                }}>
                  <i className="bi bi-envelope-paper" style={{ fontSize: "var(--text-3xl)", color: "var(--c-primary-light)", marginBottom: "var(--space-3)", display: "block" }} />
                  <h4 style={{
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-bold)",
                    color: "var(--c-white)",
                    marginBottom: "var(--space-2)",
                  }}>
                    {t("blogDetail.newsletterTitle")}
                  </h4>
                  <p style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--c-gray-400)",
                    marginBottom: "var(--space-4)",
                  }}>
                    {t("blogDetail.newsletterDesc")}
                  </p>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      placeholder={t("blogDetail.emailPlaceholder")}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.08)",
                        color: "var(--c-white)",
                        fontSize: "var(--text-sm)",
                        fontFamily: "var(--font-primary)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <button
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "var(--radius-lg)",
                      border: "none",
                      background: "var(--c-primary)",
                      color: "var(--c-white)",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-bold)",
                      fontFamily: "var(--font-primary)",
                      cursor: "pointer",
                      marginTop: "var(--space-2)",
                      transition: "background var(--duration-fast)",
                    }}
                  >
                    {t("blogDetail.subscribe")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {displayRelated.length > 0 && (
        <section style={{ paddingBottom: "var(--space-20)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">
                <i className="bi bi-journal-text" />
                {t("blogDetail.relatedArticles")}
              </span>
              <h2>{t("blogDetail.similarArticles")}</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
              {displayRelated.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    style={{
                      borderRadius: "var(--radius-xl)",
                      overflow: "hidden",
                      background: "var(--c-surface)",
                      border: "1px solid var(--c-border-light)",
                      cursor: "pointer",
                      transition: "all var(--duration-normal) var(--ease-default)",
                      height: "100%",
                    }}
                    className="hover-lift"
                    onClick={() => navigate(`/blog/${related.id}`)}
                  >
                    <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                      <img
                        src={related.image}
                        alt={related.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "var(--space-4)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
                          {related.category}
                        </span>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-300)" }}>·</span>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--c-gray-400)" }}>
                          {related.readingTime} {t("blogDetail.min")}
                        </span>
                      </div>
                      <h4 style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-bold)",
                        color: "var(--c-gray-800)",
                        lineHeight: "var(--leading-snug)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                        {related.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
