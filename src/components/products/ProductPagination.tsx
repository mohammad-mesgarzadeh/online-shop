export default function ProductPagination() {
  return (
    <nav className="mt-5">
      <ul className="pagination justify-content-center">

        <li className="page-item">
          <button className="page-link">
            قبلی
          </button>
        </li>

        <li className="page-item active">
          <button className="page-link">
            1
          </button>
        </li>

        <li className="page-item">
          <button className="page-link">
            2
          </button>
        </li>

        <li className="page-item">
          <button className="page-link">
            بعدی
          </button>
        </li>

      </ul>
    </nav>
  );
}