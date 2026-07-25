export default function Countdown() {
  return (
    <section className="pb-5">
      <div className="container">

        <div className="bg-dark text-white rounded-4 p-3 p-md-4">

          <div className="row text-center">

            <div className="col">
              <h2 className="fw-bold mb-0" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>02</h2>
              <small>روز</small>
            </div>

            <div className="col">
              <h2 className="fw-bold mb-0" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>14</h2>
              <small>ساعت</small>
            </div>

            <div className="col">
              <h2 className="fw-bold mb-0" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>36</h2>
              <small>دقیقه</small>
            </div>

            <div className="col">
              <h2 className="fw-bold mb-0" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>22</h2>
              <small>ثانیه</small>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}