import type { ProductItem } from "../data/products";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
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
}

export type SortOption = "newest" | "best-selling" | "cheapest" | "most-expensive";
