export default function Countdown() {
  const items = [
    { value: "02", label: "روز" },
    { value: "14", label: "ساعت" },
    { value: "36", label: "دقیقه" },
    { value: "22", label: "ثانیه" },
  ];

  return (
    <section className="pb-5">
      <div className="container">

        <div
          className="rounded-4 overflow-hidden"
          style={{
            background: "var(--c-gray-900)",
            padding: "var(--space-5) var(--space-4)",
          }}
        >
          <div className="d-flex justify-content-center align-items-center gap-3 gap-md-5">
            {items.map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-white fw-bold mb-1"
                  style={{
                    fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "var(--ls-tight)",
                    lineHeight: "var(--leading-none)",
                  }}
                >
                  {item.value}
                </div>
                <small className="text-white-50" style={{ fontSize: "var(--text-sm)" }}>{item.label}</small>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}