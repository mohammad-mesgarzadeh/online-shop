import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import type { ProductItem } from "../data/products";
import "./ProductCard.css";

type ProductCardProps = {
  product: ProductItem;
  index?: number;
  searchQuery?: string;
};

function highlightText(text: string, query: string) {
  if (!query || query.length < 2) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="pc-search-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function ProductCard({ product, index = 0, searchQuery }: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.discount != null && product.discount > 0;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedFeedback(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem(product);
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/products/${product.id}`);
    }
  };

  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
    : 0;

  return (
    <div
      className="pc"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image Container */}
      <div className="pc-img-wrap">
        {/* Badges */}
        <div className="pc-badges">
          {hasDiscount && (
            <span className="pc-badge pc-badge--sale">
              {discountPercent}%-
            </span>
          )}
          {product.isNew && (
            <span className="pc-badge pc-badge--new">جدید</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={`pc-wishlist ${wishlisted ? "pc-wishlist--active" : ""}`}
          onClick={handleWishlist}
          aria-label={
            wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
          }
        >
          <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
        </button>

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="pc-img"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' fill='%23e2e8f0'%3E%3Crect width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='14'%3Eتصویر%3C/text%3E%3C/svg%3E";
          }}
        />

        {/* Quick Actions Overlay */}
        <div className={`pc-overlay ${isHovered ? "pc-overlay--visible" : ""}`}>
          <button
            className="pc-quick-btn"
            onClick={handleAddToCart}
            aria-label="افزودن به سبد خرید"
          >
            <i
              className={`bi ${
                addedFeedback ? "bi-check-lg" : "bi-cart-plus"
              }`}
            />
          </button>
          <button
            className="pc-quick-btn pc-quick-btn--secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
            aria-label="مشاهده محصول"
          >
            <i className="bi bi-eye" />
          </button>
        </div>

        {/* Added feedback toast */}
        {addedFeedback && (
          <div className="pc-added-toast">
            <i className="bi bi-check-circle-fill me-1" />
            افزوده شد
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pc-content">
        <div className="pc-meta">
          <span className="pc-category">{product.categoryLabel}</span>
          <span className="pc-brand">{product.brand}</span>
        </div>

        <h3 className="pc-title">
          {searchQuery ? highlightText(product.title, searchQuery) : product.title}
        </h3>

        {/* Rating */}
        <div className="pc-rating">
          <div className="pc-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`bi ${
                  i < Math.floor(product.rating)
                    ? "bi-star-fill"
                    : i < product.rating
                    ? "bi-star-half"
                    : "bi-star"
                }`}
              />
            ))}
          </div>
          <span className="pc-rating-text">{product.rating}</span>
          <span className="pc-rating-count">({product.reviewCount})</span>
        </div>

        {/* Colors preview */}
        {product.colors.length > 0 && (
          <div className="pc-colors">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="pc-color-dot"
                title={color}
                style={{
                  background:
                    color === "سفید"
                      ? "#f1f5f9"
                      : color === "مشکی"
                      ? "#1a1a2e"
                      : color === "سرمه‌ای"
                      ? "#1b2a4a"
                      : color === "خاکستری"
                      ? "#9ca3af"
                      : color === "آبی"
                      ? "#3b82f6"
                      : color === "آبی روشن"
                      ? "#93c5fd"
                      : color === "آبی تیره"
                      ? "#1e3a5f"
                      : color === "قرمز"
                      ? "#ef4444"
                      : color === "صورتی"
                      ? "#ec4899"
                      : color === "زرشکی"
                      ? "#9f1239"
                      : color === "قهوه‌ای"
                      ? "#92400e"
                      : color === "طلایی"
                      ? "#d4a843"
                      : color === "نقره‌ای"
                      ? "#c0c0c0"
                      : "#9ca3af",
                }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="pc-color-more">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="pc-price">
          {hasDiscount && product.oldPrice && (
            <span className="pc-old-price">
              {product.oldPrice.toLocaleString("fa-IR")}
            </span>
          )}
          <span className="pc-current-price">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* Stock status */}
        {!product.inStock && (
          <span className="pc-out-of-stock">ناموجود</span>
        )}
      </div>
    </div>
  );
}
