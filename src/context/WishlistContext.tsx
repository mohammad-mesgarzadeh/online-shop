import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import type { WishlistItem } from "../types";
import type { ProductItem } from "../data/products";

const WISHLIST_KEY = "vesta_wishlist";

interface WishlistContextType {
  items: WishlistItem[];
  toggleItem: (product: ProductItem) => void;
  isWishlisted: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

function loadWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(loadWishlist);

  useEffect(() => {
    saveWishlist(items);
  }, [items]);

  const toggleItem = useCallback((product: ProductItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.product.id === product.id);
      if (exists) {
        return prev.filter((i) => i.product.id !== product.id);
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const value = useMemo(
    () => ({
      items,
      toggleItem,
      isWishlisted,
      removeItem,
      itemCount: items.length,
    }),
    [items, toggleItem, isWishlisted, removeItem]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
