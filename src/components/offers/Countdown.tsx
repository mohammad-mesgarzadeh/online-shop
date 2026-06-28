export default function Countdown() {
  return (
    <section className="pb-5">
      <div className="container">

        <div className="bg-dark text-white rounded-4 p-4">

          <div className="row text-center">

            <div className="col">
              <h2 className="fw-bold">02</h2>
              <small>روز</small>
            </div>

            <div className="col">
              <h2 className="fw-bold">14</h2>
              <small>ساعت</small>
            </div>

            <div className="col">
              <h2 className="fw-bold">36</h2>
              <small>دقیقه</small>
            </div>

            <div className="col">
              <h2 className="fw-bold">22</h2>
              <small>ثانیه</small>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}