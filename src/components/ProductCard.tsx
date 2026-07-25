import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import type { ProductItem } from "../data/products";
import "./ProductCard.css";

type ProductCardProps = {
  product: ProductItem;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleItem, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.discount != null && product.discount > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
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
      {/* Image Container - consistent 3:4 ratio */}
      <div className="pc-img-wrap">
        {hasDiscount && (
          <span className="pc-discount">{product.discount}%</span>
        )}

        <button
          className={`pc-wishlist ${wishlisted ? "pc-wishlist--active" : ""}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        >
          <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
        </button>

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="pc-img"
        />

        {/* Quick Actions Overlay */}
        <div className={`pc-overlay ${isHovered ? "pc-overlay--visible" : ""}`}>
          <button
            className="pc-quick-btn"
            onClick={handleAddToCart}
            aria-label="افزودن به سبد خرید"
          >
            <i className={`bi ${addedFeedback ? "bi-check-lg" : "bi-cart-plus"}`} />
          </button>
          <button
            className="pc-quick-btn pc-quick-btn--secondary"
            onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
            aria-label="مشاهده سریع"
          >
            <i className="bi bi-eye" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pc-content">
        <span className="pc-category">{product.categoryLabel}</span>
        <h3 className="pc-title">{product.title}</h3>

        <div className="pc-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`bi ${
                i < Math.min(5, Math.floor(product.sold / 50) + 3)
                  ? "bi-star-fill"
                  : "bi-star"
              }`}
            />
          ))}
          <span className="pc-rating-count">({product.sold})</span>
        </div>

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
      </div>
    </div>
  );
}
