import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Order, User } from './types';
import { priceOf, productById, PROMOS } from './data';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch { return fallback; }
}
function save(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ }
}

export interface Toast { id: number; msg: string; icon?: string }

interface StoreCtx {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'key'>) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  favs: string[];
  toggleFav: (id: string) => boolean;
  orders: Order[];
  placeOrder: (o: Omit<Order, 'id' | 'code' | 'date' | 'status' | 'pointsEarned'>) => Order;
  reorder: (order: Order) => void;
  advanceOrder: (id: string) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  addPoints: (n: number) => void;
  promo: string;
  setPromo: (c: string) => void;
  promoPct: number;
  toasts: Toast[];
  pushToast: (msg: string, icon?: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);
let toastId = 1;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load('jawhara-cart', []));
  const [favs, setFavs] = useState<string[]>(() => load('jawhara-fav', []));
  const [orders, setOrders] = useState<Order[]>(() => load('jawhara-orders', []));
  const [user, setUserState] = useState<User | null>(() => load('jawhara-user', null));
  const [promo, setPromo] = useState<string>(() => load('jawhara-promo', ''));
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => save('jawhara-cart', cart), [cart]);
  useEffect(() => save('jawhara-fav', favs), [favs]);
  useEffect(() => save('jawhara-orders', orders), [orders]);
  useEffect(() => save('jawhara-user', user), [user]);
  useEffect(() => save('jawhara-promo', promo), [promo]);

  const pushToast = useCallback((msg: string, icon = '✦') => {
    const id = toastId++;
    setToasts(t => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'key'>) => {
    const key = `${item.productId}|${item.sizeId}|${[...item.extrasIds].sort().join(',')}|${item.note ?? ''}`;
    setCart(prev => {
      const found = prev.find(c => c.key === key);
      if (found) return prev.map(c => (c.key === key ? { ...c, qty: c.qty + item.qty } : c));
      return [...prev, { ...item, key }];
    });
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setCart(prev => (qty <= 0 ? prev.filter(c => c.key !== key) : prev.map(c => (c.key === key ? { ...c, qty } : c))));
  }, []);
  const removeItem = useCallback((key: string) => setCart(prev => prev.filter(c => c.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const subtotal = useMemo(() => cart.reduce((sum, c) => {
    const p = productById(c.productId);
    if (!p) return sum;
    return sum + priceOf(p, c.sizeId, c.extrasIds) * c.qty;
  }, 0), [cart]);

  const cartCount = useMemo(() => cart.reduce((a, c) => a + c.qty, 0), [cart]);

  const toggleFav = useCallback((id: string) => {
    let added = false;
    setFavs(prev => {
      if (prev.includes(id)) { added = false; return prev.filter(f => f !== id); }
      added = true; return [...prev, id];
    });
    return added;
  }, []);

  const setUser = useCallback((u: User | null) => setUserState(u), []);
  const addPoints = useCallback((n: number) => {
    setUserState(prev => {
      if (!prev) return prev;
      const next = { ...prev, points: prev.points + n };
      save('jawhara-user', next);
      return next;
    });
  }, []);

  const placeOrder = useCallback((o: Omit<Order, 'id' | 'code' | 'date' | 'status' | 'pointsEarned'>) => {
    const code = `JW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const order: Order = {
      ...o,
      id: `ord-${Date.now()}`,
      code,
      date: new Date().toISOString(),
      status: 'pending',
      pointsEarned: Math.floor(o.total / 10),
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    // auto-simulate progress: pending -> preparing -> onway (mock local backend)
    setTimeout(() => setOrders(prev => prev.map(x => (x.id === order.id && x.status === 'pending' ? { ...x, status: 'preparing' } : x))), 12000);
    setTimeout(() => setOrders(prev => prev.map(x => (x.id === order.id && x.status === 'preparing' ? { ...x, status: 'onway' } : x))), 30000);
    return order;
  }, []);

  const reorder = useCallback((order: Order) => {
    setCart(prev => {
      let next = [...prev];
      for (const it of order.items) {
        const key = `${it.productId}|${it.sizeId}|${[...it.extrasIds].sort().join(',')}|${it.note ?? ''}`;
        const found = next.find(c => c.key === key);
        if (found) next = next.map(c => (c.key === key ? { ...c, qty: c.qty + it.qty } : c));
        else next.push({ productId: it.productId, sizeId: it.sizeId, extrasIds: it.extrasIds, qty: it.qty, note: it.note, key });
      }
      return next;
    });
  }, []);

  const advanceOrder = useCallback((id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const flow = ['pending', 'preparing', 'onway', 'delivered'] as const;
      const i = flow.indexOf(o.status as (typeof flow)[number]);
      if (i < 0 || i >= flow.length - 1) return o;
      return { ...o, status: flow[i + 1] };
    }));
  }, []);

  const promoPct = useMemo(() => (promo && PROMOS[promo.toUpperCase()] ? PROMOS[promo.toUpperCase()].pct : 0), [promo]);

  const value: StoreCtx = {
    cart, addToCart, updateQty, removeItem, clearCart, cartCount, subtotal,
    favs, toggleFav, orders, placeOrder, reorder, advanceOrder,
    user, setUser, addPoints, promo, setPromo, promoPct, toasts, pushToast,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): StoreCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore outside provider');
  return v;
}
