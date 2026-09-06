import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { byId } from './products';

export interface CartItem {
  productId: string;
  size: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (productId: string, size: string, qty?: number) => void;
  remove: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('atlas-cart');
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('atlas-cart', JSON.stringify(items));
  }, [items]);

  const add = (productId: string, size: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.productId === productId && i.size === size);
      if (found) {
        return prev.map((i) =>
          i.productId === productId && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { productId, size, qty }];
    });
    setIsOpen(true);
  };

  const remove = (productId: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));

  const setQty = (productId: string, size: string, qty: number) => {
    if (qty <= 0) return remove(productId, size);
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.size === size ? { ...i, qty } : i))
    );
  };

  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const i of items) {
      const p = byId(i.productId);
      if (!p) continue;
      c += i.qty;
      s += p.price * i.qty;
    }
    return { count: c, subtotal: s };
  }, [items]);

  return (
    <Ctx.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        count,
        subtotal,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart outside provider');
  return ctx;
}
