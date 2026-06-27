import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-xl bg-white border-bottom sticky-top shadow-sm">
      <div className="container py-1">

        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 text-white fs-5"
            style={{ width: 36, height: 36, background: "linear-gradient(135deg,#6C63FF,#a78bfa)" }}
          >
            🛍️
          </div>
          <span className="fw-bold fs-5 text-dark">
            شاپی<span className="text-primary">نو</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler d-xl-none border rounded-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#shopinoNav"
          aria-controls="shopinoNav"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="shopinoNav">

          {/* Nav Links */}
          <ul className="navbar-nav mx-auto gap-1 my-2 my-xl-0" style={{ direction: "rtl" }}>
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) =>
                `nav-link fw-medium px-3 rounded-2 ${isActive ? "text-primary bg-primary bg-opacity-10" : "text-secondary"}`
              }>خانه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={({ isActive }) =>
                `nav-link fw-medium px-3 rounded-2 ${isActive ? "text-primary bg-primary bg-opacity-10" : "text-secondary"}`
              }>فروشگاه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className={({ isActive }) =>
                `nav-link fw-medium px-3 rounded-2 ${isActive ? "text-primary bg-primary bg-opacity-10" : "text-secondary"}`
              }>دسته‌بندی‌ها</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/offers" className={({ isActive }) =>
                `nav-link fw-medium px-3 rounded-2 ${isActive ? "text-primary bg-primary bg-opacity-10" : "text-secondary"}`
              }>پیشنهاد ویژه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className={({ isActive }) =>
                `nav-link fw-medium px-3 rounded-2 ${isActive ? "text-primary bg-primary bg-opacity-10" : "text-secondary"}`
              }>وبلاگ</NavLink>
            </li>
          </ul>

          {/* Search + Actions */}
          <div className="d-flex flex-column flex-xl-row align-items-stretch align-items-xl-center gap-2 mt-2 mt-xl-0">

            {/* Search */}
            <div className="input-group" style={{ direction: "rtl" }}>
              <span className="input-group-text bg-light border-0 rounded-end-3">
                <i className="bi bi-search text-secondary"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0 rounded-start-3"
                placeholder="جستجو در محصولات..."
                style={{ direction: "rtl", minWidth: 0 }}
              />
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="btn btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center gap-2 fw-medium"
              style={{ whiteSpace: "nowrap" }}
            >
              <i className="bi bi-person"></i>
              ورود / ثبت‌نام
            </Link>

            {/* Cart */}
           <Link
  to="/cart"
  className="btn btn-primary rounded-3 d-flex align-items-center justify-content-center gap-2 fw-medium position-relative"
>
  <i className="bi bi-bag"></i>

  <span className="d-xl-none">سبد خرید</span>

  <span
    className="
      position-absolute
      top-0
      start-0
      translate-middle
      badge
      bg-danger
      rounded-circle
      d-inline-flex
      align-items-center
      justify-content-center
      p-0
    "
    style={{
      width: "20px",
      height: "20px",
      fontSize: "11px",
    }}
  >
    0
  </span>
</Link>
          </div>
        </div>
      </div>
    </nav>

  );
}




// import { Link, NavLink } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <>
//       <style>{`
//         .shopino-nav-link::after {
//           content: '';
//           position: absolute;
//           bottom: 2px;
//           left: 50%;
//           transform: translateX(-50%) scaleX(0);
//           width: 60%;
//           height: 2px;
//           background: #0d6efd;
//           border-radius: 2px;
//           transition: transform 0.25s ease;
//         }
//         .shopino-nav-link:hover::after { transform: translateX(-50%) scaleX(1); }
//         .shopino-nav-link.active-link::after { transform: translateX(-50%) scaleX(1); }
//         .shopino-nav-link:hover { color: #0d6efd !important; background: rgba(13,110,253,0.08) !important; }
//       `}</style>

//       <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
//         <div className="container py-2">

//           {/* لوگو + toggle در یک ردیف */}
//           <div className="d-flex align-items-center justify-content-between w-100 d-lg-contents">

//             <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
//               <div
//                 className="d-flex align-items-center justify-content-center rounded-3 text-white"
//                 style={{ width: 36, height: 36, background: "linear-gradient(135deg,#6C63FF,#a78bfa)", flexShrink: 0, fontSize: 18 }}
//               >
//                 🛍️
//               </div>
//               <span className="fw-bold fs-5 text-dark">
//                 شاپی<span className="text-primary">نو</span>
//               </span>
//             </Link>

//             {/* Toggle فقط موبایل، کنار لوگو */}
//             <button
//               className="navbar-toggler d-lg-none border rounded-3"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#shopinoNav"
//               aria-controls="shopinoNav"
//               aria-expanded="false"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//           </div>

//           <div className="collapse navbar-collapse mt-2 mt-lg-0" id="shopinoNav">

//             <hr className="d-lg-none mt-0 mb-2" />

//             {/* لینک‌ها */}
//             <ul className="navbar-nav mx-lg-auto gap-1 mb-2 mb-lg-0" dir="rtl">
//               {[
//                 { to: "/", label: "خانه", end: true },
//                 { to: "/products", label: "فروشگاه" },
//                 { to: "/categories", label: "دسته‌بندی‌ها" },
//                 { to: "/offers", label: "پیشنهاد ویژه" },
//                 { to: "/blog", label: "وبلاگ" },
//               ].map(({ to, label, end }) => (
//                 <li className="nav-item" key={to}>
//                   <NavLink
//                     to={to}
//                     end={end}
//                     className={({ isActive }) =>
//                       `nav-link shopino-nav-link fw-medium px-3 py-2 rounded-2 position-relative text-decoration-none
//                        ${isActive ? "text-primary bg-primary bg-opacity-10 active-link" : "text-secondary"}`
//                     }
//                   >
//                     {label}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>

//             <hr className="d-lg-none my-2" />

//             {/* سرچ + دکمه‌ها */}
//             <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2">

//               <div className="input-group" dir="rtl">
//                 <span className="input-group-text bg-light border-0 rounded-end-3">
//                   <i className="bi bi-search text-secondary"></i>
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control bg-light border-0 rounded-start-3"
//                   placeholder="جستجو در محصولات..."
//                   dir="rtl"
//                 />
//               </div>

//               <Link
//                 to="/login"
//                 className="btn btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center gap-2 fw-medium text-nowrap"
//               >
//                 <i className="bi bi-person"></i>
//                 ورود / ثبت‌نام
//               </Link>

//               <Link
//                 to="/cart"
//                 className="btn btn-primary rounded-3 d-flex align-items-center justify-content-center gap-2 fw-medium position-relative"
//               >
//                 <i className="bi bi-bag"></i>
//                 <span className="d-lg-none">سبد خرید</span>
//                 <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
//                   0
//                 </span>
//               </Link>

//             </div>

//             <div className="pb-1 d-lg-none" />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }