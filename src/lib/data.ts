import type { City, Combo, ExtraOption, Order, Product, Review, SizeOption, AppUser } from './types';
import productsFile from '../mock/products.json';
import contentFile from '../mock/content.json';
import usersFile from '../mock/users.json';
import ordersFile from '../mock/orders.json';

interface ProductsDoc { products: Product[]; combos: Combo[] }
interface ContentDoc { cities: City[]; extras: ExtraOption[]; reviews: Review[]; sizes: SizeOption[] }
interface UsersDoc { users: AppUser[] }
interface OrdersDoc { orders: Order[] }

export const PRODUCTS = (productsFile as unknown as ProductsDoc).products;
export const COMBOS = (productsFile as unknown as ProductsDoc).combos;
export const CITIES = (contentFile as unknown as ContentDoc).cities;
export const EXTRAS = (contentFile as unknown as ContentDoc).extras;
export const REVIEWS = (contentFile as unknown as ContentDoc).reviews;
export const SIZES = (contentFile as unknown as ContentDoc).sizes;
export const SEED_USERS = (usersFile as unknown as UsersDoc).users;
export const SEED_ORDERS = (ordersFile as unknown as OrdersDoc).orders;

export const FREE_DELIVERY_THRESHOLD = 150;

export function cityInfo(cityFr: string): City {
  return CITIES.find((c) => c.fr === cityFr) ?? CITIES[0];
}

export function tierFor(points: number): 'rose' | 'gold' | 'ruby' {
  if (points >= 300) return 'ruby';
  if (points >= 150) return 'gold';
  return 'rose';
}

export function nextTierAt(points: number): number | null {
  if (points >= 300) return null;
  if (points >= 150) return 300;
  return 150;
}
