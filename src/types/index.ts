import type { ProductItem } from "../data/products";

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  birthDate: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface WishlistItem {
  product: ProductItem;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  label: "home" | "work" | "other";
  isDefault: boolean;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  trackingCode?: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "best-selling"
  | "cheapest"
  | "most-expensive"
  | "highest-rated"
  | "most-popular";

export interface FilterState {
  search: string;
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  newArrivalsOnly: boolean;
}
