import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { useAddresses } from "../context/AddressContext";
import { useLanguage } from "../context/LanguageContext";
import { useFormatPrice } from "../utils/formatPrice";
import type { Order, ShippingInfo, Address } from "../types";

const addressSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().min(5),
  address: z.string().min(10),
  city: z.string().min(2),
  postalCode: z.string().min(10),
});

const newAddressSchema = addressSchema.extend({
  country: z.string().min(2),
  province: z.string().min(2),
  label: z.enum(["home", "work", "other"]),
});

type SavedAddressForm = z.infer<typeof addressSchema>;
type NewAddressForm = z.infer<typeof newAddressSchema>;

export default function Checkout() {
  const { items, subtotal, shippingCost, tax, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const { addresses, getDefaultAddress, addAddress } = useAddresses();
  const { t } = useLanguage();
  const { formatPrice, formatPriceNumber } = useFormatPrice();
  const navigate = useNavigate();

  const [addressMode, setAddressMode] = useState<"saved" | "new">("saved");
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    getDefaultAddress()?.id || ""
  );
  const [saveNewAddress, setSaveNewAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultAddress = getDefaultAddress();
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || defaultAddress;

  const {
    register: registerSaved,
    handleSubmit: handleSubmitSaved,
  } = useForm<SavedAddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const {
    register: registerNew,
    handleSubmit: handleSubmitNew,
    formState: { errors: errorsNew },
  } = useForm<NewAddressForm>({
    resolver: zodResolver(newAddressSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      province: "",
      label: "home",
    },
  });

  if (items.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="bi bi-cart-x" />
            </div>
            <h3 className="empty-state-title">{t("checkout.cartEmpty")}</h3>
            <p className="empty-state-desc">{t("checkout.cartEmptyDesc")}</p>
            <Link to="/products" className="btn btn-vesta-primary rounded-pill px-5">
              {t("checkout.viewProducts")}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const submitOrder = async (shipping: ShippingInfo) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

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

  const onSavedSubmit = async (data: SavedAddressForm) => {
    await submitOrder({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
    });
  };

  const onNewSubmit = async (data: NewAddressForm) => {
    if (saveNewAddress) {
      addAddress({
        fullName: data.fullName,
        phone: data.phone,
        country: data.country,
        province: data.province,
        city: data.city,
        postalCode: data.postalCode,
        address: data.address,
        label: data.label,
      });
    }
    await submitOrder({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
    });
  };

  const hasAddresses = addresses.length > 0;

  const AddressCard = ({ addr }: { addr: Address }) => (
    <div className="border rounded-3 p-3 mb-2 bg-light-subtle">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h6 className="fw-bold mb-1">{addr.fullName}</h6>
          <p className="mb-1 small">{addr.phone}</p>
          <p className="mb-1 small text-muted">{addr.address}</p>
          <p className="mb-0 small text-muted">
            {addr.city} - {addr.postalCode}
          </p>
        </div>
        {addr.isDefault && (
          <span className="badge bg-primary rounded-pill">{t("addresses.isDefault")}</span>
        )}
      </div>
    </div>
  );

  const inputClass = (error: boolean) =>
    `form-control rounded-3 ${error ? "is-invalid" : ""}`;

  return (
    <section className="py-5">
      <div className="container">
        <nav className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">{t("nav.home")}</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/cart">{t("nav.cart")}</Link>
            </li>
            <li className="breadcrumb-item active">{t("checkout.title")}</li>
          </ol>
        </nav>

        <h2 className="fw-bold mb-4">{t("checkout.title")}</h2>

        <div className="row g-4">
          <div className="col-lg-7 order-lg-1 order-2">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">
                  <i className="bi bi-geo-alt text-primary me-2" />
                  {t("checkout.shippingInfo")}
                </h5>

                {hasAddresses && (
                  <div className="d-flex gap-2 mb-4">
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 ${
                        addressMode === "saved" ? "btn-primary" : "btn-outline-secondary"
                      }`}
                      onClick={() => setAddressMode("saved")}
                    >
                      {t("checkout.useSavedAddress")}
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 ${
                        addressMode === "new" ? "btn-primary" : "btn-outline-secondary"
                      }`}
                      onClick={() => setAddressMode("new")}
                    >
                      {t("checkout.useNewAddress")}
                    </button>
                  </div>
                )}

                {addressMode === "saved" && hasAddresses && (
                  <div>
                    {addresses.length > 1 && (
                      <div className="mb-3">
                        {addresses.map((addr) => (
                          <label
                            key={addr.id}
                            className={`d-block cursor-pointer border rounded-3 p-3 mb-2 ${
                              selectedAddressId === addr.id
                                ? "border-primary bg-primary-subtle"
                                : ""
                            }`}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex align-items-start gap-3">
                              <input
                                type="radio"
                                name="selectedAddress"
                                className="form-check-input mt-1"
                                checked={selectedAddressId === addr.id}
                                onChange={() => setSelectedAddressId(addr.id)}
                              />
                              <div>
                                <h6 className="fw-bold mb-1">{addr.fullName}</h6>
                                <p className="mb-1 small">{addr.phone}</p>
                                <p className="mb-1 small text-muted">{addr.address}</p>
                                <p className="mb-0 small text-muted">
                                  {addr.city} - {addr.postalCode}
                                </p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}

                    {addresses.length === 1 && selectedAddress && (
                      <AddressCard addr={selectedAddress} />
                    )}

                    {selectedAddress && (
                      <form onSubmit={handleSubmitSaved(onSavedSubmit)}>
                        <input type="hidden" {...registerSaved("fullName")} value={selectedAddress.fullName} />
                        <input type="hidden" {...registerSaved("phone")} value={selectedAddress.phone} />
                        <input type="hidden" {...registerSaved("email")} value={user?.email || ""} />
                        <input type="hidden" {...registerSaved("address")} value={selectedAddress.address} />
                        <input type="hidden" {...registerSaved("city")} value={selectedAddress.city} />
                        <input type="hidden" {...registerSaved("postalCode")} value={selectedAddress.postalCode} />
                        <button
                          type="submit"
                          className="btn btn-primary w-100 rounded-pill py-2 fw-bold touch-target mt-3"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm ms-2" />
                              {t("checkout.processing")}
                            </>
                          ) : (
                            <>
                              <i className="bi bi-shield-check me-2" />
                              {t("checkout.placeOrder")}
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {(addressMode === "new" || !hasAddresses) && (
                  <form onSubmit={handleSubmitNew(onNewSubmit)}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-medium">{t("checkout.fullName")}</label>
                        <input
                          type="text"
                          className={inputClass(!!errorsNew.fullName)}
                          {...registerNew("fullName")}
                        />
                        {errorsNew.fullName && (
                          <div className="invalid-feedback">{errorsNew.fullName.message}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-medium">{t("checkout.phone")}</label>
                        <input
                          type="tel"
                          className={inputClass(!!errorsNew.phone)}
                          dir="ltr"
                          placeholder="09123456789"
                          {...registerNew("phone")}
                        />
                        {errorsNew.phone && (
                          <div className="invalid-feedback">{errorsNew.phone.message}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-medium">{t("checkout.email")}</label>
                        <input
                          type="email"
                          className={inputClass(!!errorsNew.email)}
                          dir="ltr"
                          placeholder="example@email.com"
                          {...registerNew("email")}
                        />
                        {errorsNew.email && (
                          <div className="invalid-feedback">{errorsNew.email.message}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-medium">{t("addresses.country")}</label>
                        <input
                          type="text"
                          className={inputClass(!!errorsNew.country)}
                          {...registerNew("country")}
                        />
                        {errorsNew.country && (
                          <div className="invalid-feedback">{errorsNew.country.message}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-medium">{t("addresses.province")}</label>
                        <input
                          type="text"
                          className={inputClass(!!errorsNew.province)}
                          {...registerNew("province")}
                        />
                        {errorsNew.province && (
                          <div className="invalid-feedback">{errorsNew.province.message}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-medium">{t("checkout.city")}</label>
                        <input
                          type="text"
                          className={inputClass(!!errorsNew.city)}
                          {...registerNew("city")}
                        />
                        {errorsNew.city && (
                          <div className="invalid-feedback">{errorsNew.city.message}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-medium">{t("checkout.postalCode")}</label>
                        <input
                          type="text"
                          className={inputClass(!!errorsNew.postalCode)}
                          dir="ltr"
                          placeholder="1234567890"
                          maxLength={10}
                          {...registerNew("postalCode")}
                        />
                        {errorsNew.postalCode && (
                          <div className="invalid-feedback">{errorsNew.postalCode.message}</div>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-medium">{t("addresses.fullAddress")}</label>
                        <textarea
                          className={inputClass(!!errorsNew.address)}
                          rows={3}
                          {...registerNew("address")}
                        />
                        {errorsNew.address && (
                          <div className="invalid-feedback">{errorsNew.address.message}</div>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-medium">{t("addresses.label")}</label>
                        <select
                          className="form-select rounded-3"
                          {...registerNew("label")}
                        >
                          <option value="home">{t("addresses.labelHome")}</option>
                          <option value="work">{t("addresses.labelWork")}</option>
                          <option value="other">{t("addresses.labelOther")}</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="saveAddress"
                            checked={saveNewAddress}
                            onChange={() => setSaveNewAddress(!saveNewAddress)}
                          />
                          <label className="form-check-label" htmlFor="saveAddress">
                            {t("checkout.saveAddress")}
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill py-2 fw-bold touch-target mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm ms-2" />
                          {t("checkout.processing")}
                        </>
                      ) : (
                        <>
                          <i className="bi bi-shield-check me-2" />
                          {t("checkout.placeOrder")}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-5 order-lg-2 order-1">
            <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: "80px" }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">{t("checkout.summary")}</h5>

                <div className="mb-3" style={{ maxHeight: 250, overflowY: "auto" }}>
                  {items.map((item) => (
                    <div key={item.product.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="rounded-3"
                        style={{ width: 56, height: 56, objectFit: "cover", display: "block" }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="fw-bold mb-0" style={{ fontSize: "0.85rem" }}>
                          {item.product.title}
                        </h6>
                        <span className="text-muted small">
                          {item.quantity} × {formatPriceNumber(item.product.price)} {t("common.toman")}
                        </span>
                      </div>
                      <span className="fw-bold small text-nowrap">
                        {formatPriceNumber(item.product.price * item.quantity)} {t("common.toman")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">{t("checkout.subtotal")}</span>
                  <span className="fw-medium">{formatPriceNumber(subtotal)} {t("common.toman")}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">{t("checkout.shipping")}</span>
                  <span className="fw-medium">
                    {shippingCost === 0 ? (
                      <span className="text-success">{t("common.free")}</span>
                    ) : (
                      `${formatPriceNumber(shippingCost)} ${t("common.toman")}`
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">{t("checkout.tax")}</span>
                  <span className="fw-medium">{formatPriceNumber(tax)} {t("common.toman")}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4 gap-2">
                  <span className="fw-bold fs-5">{t("checkout.total")}</span>
                  <span className="fw-bold fs-5 text-primary text-nowrap">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="bi bi-lock me-1" />
                    {t("checkout.securePayment")}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
