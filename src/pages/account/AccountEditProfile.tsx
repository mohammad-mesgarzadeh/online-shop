import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

function createAvatar(name: string): string {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6C63FF&color=fff&bold=true&size=128`;
}

export default function AccountEditProfile() {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const profileSchema = z.object({
    firstName: z.string().min(3, t("profile.nameRequired")),
    lastName: z.string().optional(),
    email: z.email(t("profile.emailInvalid")),
    phone: z.string().min(10, t("profile.phoneInvalid")),
    birthDate: z.string().optional(),
  });

  type ProfileForm = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      birthDate: user?.birthDate || "",
    },
  });

  const handleChangePhoto = () => {
    const newName = user?.firstName || "User";
    setAvatar(createAvatar(newName + " " + Date.now()));
  };

  const onSubmit = (data: ProfileForm) => {
    updateProfile({
      firstName: data.firstName,
      lastName: data.lastName || "",
      name: `${data.firstName} ${data.lastName || ""}`.trim(),
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate || "",
      avatar,
    });
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
          {t("account.sidebar.editProfile")}
        </h5>

        {saved && (
          <div className="alert alert-success d-flex align-items-center gap-2 py-2 rounded-3 mb-3">
            <i className="bi bi-check-circle-fill" />
            {t("profile.saved")}
          </div>
        )}

        <div className="text-center mb-4">
          <img
            src={avatar}
            alt={user?.name}
            className="rounded-circle mb-2"
            style={{ width: 80, height: 80, objectFit: "cover" }}
          />
          <div>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary rounded-pill"
              onClick={handleChangePhoto}
            >
              <i className="bi bi-camera me-1" />
              {t("profile.avatarChange")}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium">{t("profile.firstName")}</label>
              <input
                type="text"
                className={`form-control rounded-3 ${errors.firstName ? "is-invalid" : ""}`}
                {...register("firstName")}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName.message}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">{t("profile.lastName")}</label>
              <input
                type="text"
                className={`form-control rounded-3 ${errors.lastName ? "is-invalid" : ""}`}
                {...register("lastName")}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName.message}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">{t("profile.email")}</label>
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
              <label className="form-label fw-medium">{t("profile.phone")}</label>
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

            <div className="col-12">
              <label className="form-label fw-medium">{t("profile.birthDate")}</label>
              <input
                type="date"
                className="form-control rounded-3"
                {...register("birthDate")}
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4"
              disabled={!isDirty}
            >
              <i className="bi bi-check-lg me-2" />
              {t("profile.saveChanges")}
            </button>
            <Link
              to="/account/profile"
              className="btn btn-outline-secondary rounded-pill px-4"
            >
              {t("common.cancel")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
