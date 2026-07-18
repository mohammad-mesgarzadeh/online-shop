import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";

const profileSchema = z.object({
  name: z.string().min(3, "نام حداقل ۳ کاراکتر باشد"),
  email: z.email("ایمیل معتبر وارد کنید"),
  phone: z.string().min(10, "شماره تلفن معتبر وارد کنید"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function AccountEditProfile() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    updateProfile(data);
    setSaved(true);
    setTimeout(() => {
      if (mountedRef.current) setSaved(false);
    }, 3000);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4">
          <i className="bi bi-pencil-square text-primary me-2" />
          ویرایش پروفایل
        </h5>

        {saved && (
          <div className="alert alert-success d-flex align-items-center gap-2 py-2 rounded-3 mb-3">
            <i className="bi bi-check-circle-fill" />
            تغییرات با موفقیت ذخیره شد!
          </div>
        )}

        {/* eslint-disable-next-line react-hooks/refs */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-medium">نام و نام خانوادگی</label>
              <input
                type="text"
                className={`form-control rounded-3 ${errors.name ? "is-invalid" : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">ایمیل</label>
              <input
                type="email"
                className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
                dir="ltr"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
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
          </div>

          <button
            type="submit"
            className="btn btn-primary rounded-pill px-4 mt-4"
            disabled={!isDirty}
          >
            <i className="bi bi-check-lg me-2" />
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  );
}
