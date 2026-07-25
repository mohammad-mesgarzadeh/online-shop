import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { formatPriceNumber } from "../utils/formatPrice";
import type { Order, ShippingInfo } from "../types";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "نام حداقل ۳ کاراکتر باشد"),
  phone: z.string().min(10, "شماره تلفن معتبر وارد کنید"),
  email: z.email("ایمیل معتبر وارد کنید"),
  address: z.string().min(10, "آدرس حداقل ۱۰ کاراکتر باشد"),
  city: z.string().min(2, "نام شهر را وارد کنید"),
  postalCode: z.string().min(10, "کد پستی ۱۰ رقمی وارد کنید"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, subtotal, shippingCost, tax, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  if (items.length === 0) {
    return (
      <section className="py-5" dir="rtl">
        <div className="container text-center py-5">
          <i className="bi bi-cart-x text-secondary" style={{ fontSize: "3rem" }} />
          <h4 className="fw-bold mt-3">سبد خرید شما خالی است</h4>
          <p className="text-muted">برای ادامه خرید ابتدا محصولی به سبد اضافه کنید.</p>
          <Link to="/products" className="btn btn-primary rounded-pill px-4">
            مشاهده محصولات
          </Link>
        </div>
      </section>
    );
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

    const shipping: ShippingInfo = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
    };

    const orderId = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
    const order: Order = {
      id: orderId,
      items: [...items],
      shipping,
      subtotal,
      shippingCost,
      tax,
      total: grandTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <section className="py-5" dir="rtl">
      <div className="container">
        <nav className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">خانه</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/cart">سبد خرید</Link>
            </li>
            <li className="breadcrumb-item active">تکمیل خرید</li>
          </ol>
        </nav>

        <h2 className="fw-bold mb-4">تکمیل خرید</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4">
            <div className="col-lg-7 order-lg-1 order-2">
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-geo-alt text-primary me-2" />
                    اطلاعات ارسال
                  </h5>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-medium">نام و نام خانوادگی</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.fullName ? "is-invalid" : ""}`}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <div className="invalid-feedback">{errors.fullName.message}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">شماره تلفن</label>
                      <input
                        type="tel"
                        className={`form-control rounded-3 ${errors.phone ? "is-invalid" : ""}`}
                        dir="ltr"
                        placeholder="09123456789"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone.message}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">ایمیل</label>
                      <input
                        type="email"
                        className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
                        dir="ltr"
                        placeholder="example@email.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium">آدرس</label>
                      <textarea
                        className={`form-control rounded-3 ${errors.address ? "is-invalid" : ""}`}
                        rows={3}
                        placeholder="آدرس کامل پستی"
                        {...register("address")}
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address.message}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">شهر</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.city ? "is-invalid" : ""}`}
                        placeholder="تهران"
                        {...register("city")}
                      />
                      {errors.city && (
                        <div className="invalid-feedback">{errors.city.message}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">کد پستی</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.postalCode ? "is-invalid" : ""}`}
                        dir="ltr"
                        placeholder="1234567890"
                        maxLength={10}
                        {...register("postalCode")}
                      />
                      {errors.postalCode && (
                        <div className="invalid-feedback">{errors.postalCode.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 order-lg-2 order-1">
              <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: "80px" }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">خلاصه سفارش</h5>

                  <div className="mb-3" style={{ maxHeight: 250, overflowY: "auto" }}>
                    {items.map((item) => (
                      <div key={item.product.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="rounded-3"
                          style={{ width: 56, height: 56, objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-0" style={{ fontSize: "0.85rem" }}>
                            {item.product.title}
                          </h6>
                          <span className="text-muted small">
                            {item.quantity} × {formatPriceNumber(item.product.price)} تومان
                          </span>
                        </div>
                        <span className="fw-bold small text-nowrap">
                          {formatPriceNumber(item.product.price * item.quantity)} تومان
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">جمع کل</span>
                    <span className="fw-medium">{formatPriceNumber(subtotal)} تومان</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">هزینه ارسال</span>
                    <span className="fw-medium">
                      {shippingCost === 0 ? (
                        <span className="text-success">رایگان</span>
                      ) : (
                        `${formatPriceNumber(shippingCost)} تومان`
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">مالیات (۹٪)</span>
                    <span className="fw-medium">{formatPriceNumber(tax)} تومان</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-4 gap-2">
                    <span className="fw-bold fs-5">مبلغ قابل پرداخت</span>
                    <span className="fw-bold fs-5 text-primary text-nowrap">
                      {formatPriceNumber(grandTotal)} تومان
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-pill py-2 fw-bold touch-target"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm ms-2" />
                        در حال پردازش...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-shield-check me-2" />
                        تأیید و پرداخت
                      </>
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      <i className="bi bi-lock me-1" />
                      پرداخت شما از طریق درگاه امن انجام می‌شود
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
