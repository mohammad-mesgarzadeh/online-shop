import { useLanguage } from "../../context/LanguageContext";

type ProductToolbarProps = {
  totalProducts: number;
  sortBy: string;
  onSortChange: (value: string) => void;
};

export default function ProductToolbar({
  totalProducts,
  sortBy,
  onSortChange,
}: ProductToolbarProps) {
  const { t } = useLanguage();
  return (
    <div className="pt">
      <div className="pt-info">
        <span className="pt-count">
          <strong>{totalProducts}</strong> {t("products.count")}
        </span>
      </div>
      <div className="pt-sort">
        <i className="bi bi-arrow-down-up pt-sort-icon" />
        <select
          className="pt-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label={t("products.sort")}
        >
          <option value="featured">{t("products.sortFeatured")}</option>
          <option value="newest">{t("products.sortNewest")}</option>
          <option value="best-selling">{t("products.sortBestSelling")}</option>
          <option value="cheapest">{t("products.sortCheapest")}</option>
          <option value="most-expensive">{t("products.sortExpensive")}</option>
          <option value="highest-rated">{t("products.sortHighestRated")}</option>
          <option value="most-popular">{t("products.sortMostPopular")}</option>
        </select>
      </div>
    </div>
  );
}
