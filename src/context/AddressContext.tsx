import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import type { Address } from "../types";

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id" | "isDefault">) => Address;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
  getAddress: (id: string) => Address | undefined;
}

const AddressContext = createContext<AddressContextType | null>(null);
const ADDRESS_KEY = "vesta_addresses";

function getStoredAddresses(): Address[] {
  try {
    const raw = localStorage.getItem(ADDRESS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function storeAddresses(addresses: Address[]) {
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(addresses));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(getStoredAddresses);

  useEffect(() => {
    storeAddresses(addresses);
  }, [addresses]);

  const addAddress = useCallback((data: Omit<Address, "id" | "isDefault">): Address => {
    const newAddr: Address = {
      ...data,
      id: generateId(),
      isDefault: false,
    };
    setAddresses((prev) => [...prev, newAddr]);
    return newAddr;
  }, []);

  const updateAddress = useCallback((id: string, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  }, []);

  const getDefaultAddress = useCallback(() => {
    return addresses.find((a) => a.isDefault) || addresses[0];
  }, [addresses]);

  const getAddress = useCallback(
    (id: string) => addresses.find((a) => a.id === id),
    [addresses]
  );

  const value = useMemo(
    () => ({
      addresses,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress,
      getDefaultAddress,
      getAddress,
    }),
    [addresses, addAddress, updateAddress, removeAddress, setDefaultAddress, getDefaultAddress, getAddress]
  );

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
}

export function useAddresses(): AddressContextType {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddresses must be used within AddressProvider");
  return ctx;
}
