import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  endDate: Date;
  onExpired?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(endDate: Date): TimeLeft {
  const now = new Date().getTime();
  const end = endDate.getTime();
  const diff = Math.max(0, end - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function Countdown({ endDate, onExpired }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(endDate));
  const [expired, setExpired] = useState(false);

  const tick = useCallback(() => {
    const next = calculateTimeLeft(endDate);
    setTimeLeft(next);
    if (next.days === 0 && next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
      setExpired(true);
      onExpired?.();
    }
  }, [endDate, onExpired]);

  useEffect(() => {
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  if (expired) {
    return (
      <section style={{ paddingBottom: "var(--space-8)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              borderRadius: "var(--radius-xl)",
              background: "var(--c-gray-100)",
              padding: "var(--space-8) var(--space-4)",
              textAlign: "center",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "var(--space-3)" }}>
              <i className="bi bi-clock-history" style={{ fontSize: "var(--text-2xl)", color: "var(--c-gray-400)" }} />
              <span style={{ fontSize: "var(--text-xl)", fontWeight: "var(--font-bold)", color: "var(--c-gray-600)" }}>
                کمپین به پایان رسید
              </span>
            </div>
            <p style={{ color: "var(--c-gray-400)", fontSize: "var(--text-sm)", margin: 0 }}>
              پیشنهادات ویژه تمام شده است. منتظر کمپین بعدی باشید.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const blocks = [
    { value: pad(timeLeft.days), label: "روز" },
    { value: pad(timeLeft.hours), label: "ساعت" },
    { value: pad(timeLeft.minutes), label: "دقیقه" },
    { value: pad(timeLeft.seconds), label: "ثانیه" },
  ];

  return (
    <section style={{ paddingBottom: "var(--space-8)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "var(--radius-xl)",
            background: "var(--c-gray-900)",
            padding: "var(--space-6) var(--space-4)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--space-4)" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              background: "rgba(239, 68, 68, 0.15)",
              color: "#f87171",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-bold)",
            }}>
              <i className="bi bi-lightning-charge-fill" />
              زمان باقی‌مانده
            </span>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--space-3) var(--space-6)",
          }}>
            {blocks.map((item, i) => (
              <div key={item.label} style={{ textAlign: "center", minWidth: 60 }}>
                <div style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-3) var(--space-2)",
                  marginBottom: "var(--space-2)",
                  backdropFilter: "blur(4px)",
                }}>
                  <motion.span
                    key={item.value}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "block",
                      color: "var(--c-white)",
                      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                      fontWeight: "var(--font-extrabold)",
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: "var(--leading-none)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.value}
                  </motion.span>
                </div>
                <small style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-medium)",
                }}>
                  {item.label}
                </small>
                {i < blocks.length - 1 && (
                  <span style={{
                    position: "absolute",
                    right: -12,
                    top: "35%",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "var(--text-xl)",
                    fontWeight: "var(--font-bold)",
                  }}>
                  :
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
