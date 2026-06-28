import CategoriesHero from "../components/categories/CategoriesHero";
import CategorySection from "../components/categories/CategorySection";

export default function Categories() {
  return (
    <>
      <CategoriesHero />

      <CategorySection
        title="مردانه"
        categories={[
          "تیشرت",
          "هودی",
          "پیراهن",
          "شلوار",
          "کفش"
        ]}
      />

      <CategorySection
        title="زنانه"
        categories={[
          "مانتو",
          "شومیز",
          "دامن",
          "کیف",
          "کفش"
        ]}
      />

      <CategorySection
        title="اکسسوری"
        categories={[
          "ساعت",
          "عینک",
          "کمربند",
          "کلاه"
        ]}
      />
    </>
  );
}