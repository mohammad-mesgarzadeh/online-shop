export default function ProductToolbar() {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h2 className="fw-bold mb-1">
          فروشگاه لباس
        </h2>

        <p className="text-muted mb-0">
          120 محصول
        </p>
      </div>

      <select className="form-select w-auto">
        <option>جدیدترین</option>
        <option>پرفروش‌ترین</option>
        <option>ارزان‌ترین</option>
      </select>

    </div>
  );
}