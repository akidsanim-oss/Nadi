import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppUser, CartItem, City, Order } from './types';
import { CITIES, SEED_ORDERS, SEED_USERS, cityInfo } from './data';
import type { Lang } from './i18n';
import { D } from './i18n';

export interface Toast { id: number; msg: string; tone: 'gold' | 'pink' | 'green'; }
export interface Coupon { labelAr: string; labelFr: string; amount: number; }

export interface OrderDraft {
  name: string;
  phone: string;
  cityFr: string;
  district: string;
  address: string;
  notes: string;
}

interface Store {
  lang: Lang;
  isAr: boolean;
  t: (ar: string, fr: string) => string;
  tr: (k: keyof typeof D) => string;
  toggleLang: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  user: AppUser | null;
  login: (email: string, password: string) => boolean;
  register: (u: AppUser) => boolean;
  logout: () => void;
  updateUser: (patch: Partial<AppUser>) => void;
  useDemo: () => void;
  orders: Order[];
  placeOrder: (draft: OrderDraft, deliveryFee: number, discount: number) => Order;
  toasts: Toast[];
  toast: (msg: string, tone?: Toast['tone']) => void;
  cityFr: string;
  setCityFr: (c: string) => void;
  city: City;
  coupon: Coupon | null;
  setCoupon: (c: Coupon | null) => void;
}

const Ctx = createContext<Store | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function write(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ }
}

let toastId = 1;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => read<Lang>('jawhara_lang', 'ar'));
  const [cart, setCart] = useState<CartItem[]>(() => read<CartItem[]>('jawhara_cart', []));
  const [users, setUsers] = useState<AppUser[]>(() => {
    const u = read<AppUser[]>('jawhara_users', []);
    return u.length ? u : SEED_USERS;
  });
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => read<string | null>('jawhara_session', null));
  const [orders, setOrders] = useState<Order[]>(() => read<Order[]>('jawhara_orders', SEED_ORDERS));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cityFr, setCityFrState] = useState<string>(() => read<string>('jawhara_city', 'Casablanca'));
  const [coupon, setCouponState] = useState<Coupon | null>(() => read<Coupon | null>('jawhara_coupon', null));
  const timers = useRef<number[]>([]);

  const isAr = lang === 'ar';
  const user = useMemo(() => users.find((u) => u.email === sessionEmail) ?? null, [users, sessionEmail]);
  const city = useMemo(() => cityInfo(cityFr), [cityFr]);

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; }, [lang]);
  useEffect(() => { write('jawhara_cart', cart); }, [cart]);
  useEffect(() => { write('jawhara_users', users); }, [users]);
  useEffect(() => { write('jawhara_orders', orders); }, [orders]);
  useEffect(() => { write('jawhara_lang', lang); }, [lang]);
  useEffect(() => { write('jawhara_city', cityFr); }, [cityFr]);
  useEffect(() => { write('jawhara_coupon', coupon); }, [coupon]);
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); }, []);

  const toast = useCallback((msg: string, tone: Toast['tone'] = 'gold') => {
    const id = toastId++;
    setToasts((p) => [...p.slice(-3), { id, msg, tone }]);
    const h = window.setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3000);
    timers.current.push(h);
  }, []);

  const t = useCallback((ar: string, fr: string) => (lang === 'ar' ? ar : fr), [lang]);
  const tr = useCallback((k: keyof typeof D) => D[k][lang], [lang]);

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next = l === 'ar' ? 'fr' : 'ar';
      window.setTimeout(() => {
        const id = toastId++;
        setToasts((p) => [...p.slice(-3), { id, msg: next === 'ar' ? 'تم التحويل إلى العربية ✨' : 'Langue changée en Français 🇫🇷', tone: 'gold' as const }]);
        const h = window.setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3000);
        timers.current.push(h);
      }, 50);
      return next;
    });
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((p) => {
      const ex = p.find((x) => x.key === item.key);
      if (ex) return p.map((x) => (x.key === item.key ? { ...x, qty: x.qty + item.qty } : x));
      return [...p, item];
    });
  }, []);
  const updateQty = useCallback((key: string, delta: number) => {
    setCart((p) => p.map((x) => (x.key === key ? { ...x, qty: Math.max(1, Math.min(20, x.qty + delta)) } : x)));
  }, []);
  const removeItem = useCallback((key: string) => setCart((p) => p.filter((x) => x.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const cartCount = useMemo(() => cart.reduce((s, x) => s + x.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((s, x) => s + x.qty * x.unitPrice, 0), [cart]);

  const login = useCallback((email: string, password: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && (u.password ?? '') === password);
    if (!found) return false;
    setSessionEmail(found.email);
    write('jawhara_session', found.email);
    return true;
  }, [users]);

  const register = useCallback((u: AppUser) => {
    const exists = users.some((x) => x.email.toLowerCase() === u.email.trim().toLowerCase());
    if (exists) return false;
    const withBonus = { ...u, points: (u.points ?? 0) + 20 };
    setUsers((p) => [...p, withBonus]);
    setSessionEmail(withBonus.email);
    write('jawhara_session', withBonus.email);
    return true;
  }, [users]);

  const logout = useCallback(() => {
    setSessionEmail(null);
    try { localStorage.removeItem('jawhara_session'); } catch { /* noop */ }
  }, []);

  const updateUser = useCallback((patch: Partial<AppUser>) => {
    setUsers((p) => p.map((u) => (u.email === sessionEmail ? { ...u, ...patch } : u)));
  }, [sessionEmail]);

  const useDemo = useCallback(() => {
    const demo = users[0];
    if (!demo) return;
    setSessionEmail(demo.email);
    write('jawhara_session', demo.email);
  }, [users]);

  const placeOrder = useCallback((draft: OrderDraft, deliveryFee: number, discount: number): Order => {
    const itemsTotal = cart.reduce((s, x) => s + x.qty * x.unitPrice, 0);
    const total = Math.max(0, Math.round(itemsTotal + deliveryFee - discount));
    const earned = Math.floor(total / 10) * 2;
    const id = `JW-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().slice(0, 10);
    void draft;
    void deliveryFee;
    void discount;
    const order: Order = {
      id,
      date: today,
      items: cart.map((x) => `${x.name} / ${x.name_fr} ×${x.qty}`),
      total,
      status: 'تم الاستلام — قيد التحضير',
      status_fr: 'Reçue — en préparation',
      earnedPoints: earned,
    };
    setOrders((p) => [order, ...p]);
    setCart([]);
    setCouponState(null);
    if (sessionEmail) {
      const em = sessionEmail;
      setUsers((p) => p.map((u) => (u.email === em ? { ...u, points: u.points + earned } : u)));
    }
    return order;
  }, [cart, sessionEmail]);

  const setCityFr = useCallback((c: string) => {
    if (CITIES.some((x) => x.fr === c)) setCityFrState(c);
  }, []);
  const setCoupon = useCallback((c: Coupon | null) => setCouponState(c), []);

  const value: Store = {
    lang, isAr, t, tr, toggleLang,
    cart, addToCart, updateQty, removeItem, clearCart, cartCount, subtotal,
    user, login, register, logout, updateUser, useDemo,
    orders, placeOrder,
    toasts, toast,
    cityFr, setCityFr, city, coupon, setCoupon,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}
