import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "../../context/LanguageContext";
import { useAddresses } from "../../context/AddressContext";
import type { Address } from "../../types";

const addressSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(10),
  country: z.string().min(1),
  province: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(10),
  address: z.string().min(1),
  label: z.enum(["home", "work", "other"]),
});

type AddressForm = z.infer<typeof addressSchema>;

const labelColors: Record<Address["label"], string> = {
  home: "bg-success",
  work: "bg-primary",
  other: "bg-secondary",
};

const labelIcons: Record<Address["label"], string> = {
  home: "bi-house-door",
  work: "bi-briefcase",
  other: "bi-geo-alt",
};

const emptyDefaults: AddressForm = {
  fullName: "",
  phone: "",
  country: "ایران",
  province: "",
  city: "",
  postalCode: "",
  address: "",
  label: "home",
};

export default function AccountAddresses() {
  const { t } = useLanguage();
  const {
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  } = useAddresses();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: emptyDefaults,
  });

  const currentLabel = watch("label");

  function handleAdd() {
    setEditingId(null);
    reset(emptyDefaults);
    setShowForm(true);
  }

  function handleEdit(addr: Address) {
    setEditingId(addr.id);
    setShowForm(true);
    reset({
      fullName: addr.fullName,
      phone: addr.phone,
      country: addr.country,
      province: addr.province,
      city: addr.city,
      postalCode: addr.postalCode,
      address: addr.address,
      label: addr.label,
    });
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    reset(emptyDefaults);
  }

  function onSubmit(data: AddressForm) {
    if (editingId) {
      updateAddress(editingId, data);
    } else {
      addAddress(data);
    }
    setShowForm(false);
    setEditingId(null);
    reset(emptyDefaults);
  }

  function handleDeleteConfirm(id: string) {
    removeAddress(id);
    setDeletingId(null);
  }

  const labelTranslationMap: Record<Address["label"], string> = {
    home: t("addresses.labelHome"),
    work: t("addresses.labelWork"),
    other: t("addresses.labelOther"),
  };

  if (addresses.length === 0 && !showForm) {
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="empty-state" style={{ padding: "var(--space-12) var(--space-4)" }}>
            <div className="empty-state-icon" style={{ width: "80px", height: "80px" }}>
              <i className="bi bi-geo-alt" style={{ fontSize: "2rem" }} />
            </div>
            <h4 className="empty-state-title">{t("addresses.empty")}</h4>
            <p className="empty-state-desc">{t("addresses.emptyDesc")}</p>
            <button
              className="btn btn-vesta-primary rounded-pill px-5"
              onClick={handleAdd}
            >
              <i className="bi bi-plus-lg me-2" />
              {t("addresses.addNew")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-geo-alt text-primary me-2" />
            {t("addresses.title")}
          </h5>
          {!showForm && (
            <button
              className="btn btn-primary rounded-pill px-3"
              onClick={handleAdd}
            >
              <i className="bi bi-plus-lg me-1" />
              {t("addresses.addNew")}
            </button>
          )}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="border rounded-4 p-3 p-md-4 bg-light">
                <h6 className="fw-bold mb-3">
                  <i className={`bi ${editingId ? "bi-pencil-square" : "bi-plus-circle"} text-primary me-2`} />
                  {editingId ? t("addresses.editAddress") : t("addresses.addNew")}
                </h6>

                {/* eslint-disable-next-line react-hooks/refs */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">{t("addresses.fullName")}</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.fullName ? "is-invalid" : ""}`}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <div className="invalid-feedback">{t("addresses.nameRequired")}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">{t("addresses.mobile")}</label>
                      <input
                        type="tel"
                        className={`form-control rounded-3 ${errors.phone ? "is-invalid" : ""}`}
                        dir="ltr"
                        placeholder="09123456789"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{t("addresses.phoneRequired")}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">{t("addresses.country")}</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.country ? "is-invalid" : ""}`}
                        {...register("country")}
                      />
                      {errors.country && (
                        <div className="invalid-feedback">{t("addresses.country")}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">{t("addresses.province")}</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.province ? "is-invalid" : ""}`}
                        {...register("province")}
                      />
                      {errors.province && (
                        <div className="invalid-feedback">{t("addresses.province")}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">{t("addresses.city")}</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.city ? "is-invalid" : ""}`}
                        {...register("city")}
                      />
                      {errors.city && (
                        <div className="invalid-feedback">{t("addresses.cityRequired")}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-medium">{t("addresses.postalCode")}</label>
                      <input
                        type="text"
                        className={`form-control rounded-3 ${errors.postalCode ? "is-invalid" : ""}`}
                        dir="ltr"
                        placeholder="1234567890"
                        {...register("postalCode")}
                      />
                      {errors.postalCode && (
                        <div className="invalid-feedback">{t("addresses.postalCodeRequired")}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium">{t("addresses.fullAddress")}</label>
                      <textarea
                        className={`form-control rounded-3 ${errors.address ? "is-invalid" : ""}`}
                        rows={3}
                        {...register("address")}
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{t("addresses.addressRequired")}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium">{t("addresses.label")}</label>
                      <div className="d-flex gap-2">
                        {(["home", "work", "other"] as const).map((lbl) => (
                          <button
                            key={lbl}
                            type="button"
                            className={`btn rounded-pill px-3 ${
                              currentLabel === lbl
                                ? `${labelColors[lbl]} text-white`
                                : "btn-outline-secondary"
                            }`}
                            onClick={() => setValue("label", lbl, { shouldValidate: true })}
                          >
                            <i className={`bi ${labelIcons[lbl]} me-1`} />
                            {labelTranslationMap[lbl]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                      <i className="bi bi-check-lg me-1" />
                      {t("addresses.saveAddress")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-pill px-4"
                      onClick={handleCancel}
                    >
                      <i className="bi bi-x-lg me-1" />
                      {t("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="row g-3">
          {addresses.map((addr, index) => (
            <div key={addr.id} className="col-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-4 p-3 p-md-4 ${
                  addr.isDefault ? "border-primary border-2" : "border"
                }`}
              >
                <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className={`badge ${labelColors[addr.label]}`}>
                      <i className={`bi ${labelIcons[addr.label]} me-1`} />
                      {labelTranslationMap[addr.label]}
                    </span>
                    {addr.isDefault && (
                      <span className="badge bg-primary-subtle text-primary">
                        <i className="bi bi-star-fill me-1" style={{ fontSize: "0.6rem" }} />
                        {t("addresses.isDefault")}
                      </span>
                    )}
                  </div>
                </div>

                <h6 className="fw-bold mb-1">{addr.fullName}</h6>
                <div className="text-muted small mb-1" dir="ltr">
                  <i className="bi bi-telephone me-1" />
                  {addr.phone}
                </div>
                <p className="text-muted small mb-2">
                  {addr.address} — {addr.city}، {addr.province}
                  {addr.country && `، ${addr.country}`}
                </p>
                <div className="text-muted small mb-3" dir="ltr">
                  <i className="bi bi-hash me-1" />
                  {addr.postalCode}
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-sm btn-outline-primary rounded-pill"
                    onClick={() => handleEdit(addr)}
                  >
                    <i className="bi bi-pencil me-1" />
                    {t("common.edit")}
                  </button>

                  {!addr.isDefault && (
                    <button
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                      onClick={() => setDefaultAddress(addr.id)}
                    >
                      <i className="bi bi-star me-1" />
                      {t("addresses.setDefault")}
                    </button>
                  )}

                  {deletingId === addr.id ? (
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-danger small fw-medium">
                        {t("addresses.confirmDelete")}
                      </span>
                      <button
                        className="btn btn-sm btn-danger rounded-pill"
                        onClick={() => handleDeleteConfirm(addr.id)}
                      >
                        <i className="bi bi-check-lg me-1" />
                        {t("common.yes")}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary rounded-pill"
                        onClick={() => setDeletingId(null)}
                      >
                        <i className="bi bi-x-lg me-1" />
                        {t("common.cancel")}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => setDeletingId(addr.id)}
                    >
                      <i className="bi bi-trash3 me-1" />
                      {t("common.delete")}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
