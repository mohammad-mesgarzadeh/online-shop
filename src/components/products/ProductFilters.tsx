export default function ProductFilters() {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body">

        <h5 className="fw-bold mb-4">
          فیلترها
        </h5>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="جستجو..."
        />

        <h6 className="fw-bold mb-3">
          دسته بندی
        </h6>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" />
          <label className="form-check-label">
            تیشرت
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" />
          <label className="form-check-label">
            هودی
          </label>
        </div>

      </div>
    </div>
  );
}