import { motion } from "framer-motion";

const shapes = [
  { size: 120, x: "10%", y: "20%", delay: 0, duration: 18 },
  { size: 80, x: "80%", y: "15%", delay: 2, duration: 22 },
  { size: 60, x: "25%", y: "70%", delay: 4, duration: 20 },
  { size: 100, x: "70%", y: "65%", delay: 1, duration: 25 },
  { size: 40, x: "50%", y: "30%", delay: 3, duration: 16 },
  { size: 90, x: "90%", y: "50%", delay: 5, duration: 21 },
];

export default function CategoriesHero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--c-gray-900) 0%, #2d2b6b 50%, var(--c-primary-dark) 100%)",
        padding: "var(--space-24) var(--space-4)",
      }}
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: i % 2 === 0 ? "var(--radius-full)" : "var(--radius-lg)",
            transform: `rotate(${i * 30}deg)`,
            animation: `heroFloat ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(108,99,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: "var(--radius-full)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "var(--space-6)",
            }}
          >
            <i className="bi bi-grid-3x3-gap-fill" style={{ color: "var(--c-primary-light)" }} />
            <span
              style={{
                color: "var(--c-gray-300)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-semibold)",
              }}
            >
              فروشگاه وستا
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: "var(--c-white)",
            fontSize: "clamp(2rem, 6vw, var(--text-6xl))",
            fontWeight: "var(--font-extrabold)",
            lineHeight: "var(--leading-tight)",
            marginBottom: "var(--space-4)",
          }}
        >
          دسته بندی محصولات
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: "var(--c-gray-400)",
            fontSize: "clamp(var(--text-base), 2.5vw, var(--text-xl))",
            maxWidth: 520,
            marginInline: "auto",
            lineHeight: "var(--leading-relaxed)",
          }}
        >
          مجموعه‌ای متنوع از بهترین برندهای جهان
        </motion.p>
      </div>

      <style>{`
        @keyframes heroFloat {
          from { transform: rotate(var(--rot, 0deg)) translateY(0) scale(1); }
          to { transform: rotate(var(--rot, 0deg)) translateY(-20px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
