export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("fa-IR")} تومان`;
};

export const formatPriceNumber = (price: number): string => {
  return price.toLocaleString("fa-IR");
};
