export type Locale = 'ar' | 'fr';
export type Category = 'milkshake' | 'jus' | 'signature' | 'healthy';

export interface ProductSize {
  id: string;
  labelAr: string;
  labelFr: string;
  delta: number;
}

export interface ProductExtra {
  id: string;
  labelAr: string;
  labelFr: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badgeAr?: string;
  badgeFr?: string;
  image: string;
  gradient: string;
  glow: string;
  nameAr: string;
  nameFr: string;
  shortAr: string;
  shortFr: string;
  descAr: string;
  descFr: string;
  ingredientsAr: string[];
  ingredientsFr: string[];
  kcal: number;
  prepMin: number;
  tags: string[];
  sizes: ProductSize[];
  extras: ProductExtra[];
}

export interface CartItem {
  productId: string;
  sizeId: string;
  extrasIds: string[];
  qty: number;
  note?: string;
  key: string;
}

export interface OrderItem extends CartItem {
  nameAr: string;
  nameFr: string;
  unitPrice: number;
  image: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'onway' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  code: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  status: OrderStatus;
  name: string;
  phone: string;
  city: string;
  address: string;
  payment: 'cod' | 'card' | 'mobile';
  notes?: string;
  pointsEarned: number;
}

export interface User {
  name: string;
  phone: string;
  email?: string;
  city: string;
  points: number;
}
