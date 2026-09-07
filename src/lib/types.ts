export type Category = 'milkshakes' | 'smoothies' | 'juices';

export interface Product {
  id: string;
  category: Category;
  name: string;
  name_fr: string;
  price: number;
  oldPrice?: number;
  tag: string;
  tag_fr: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  description_fr: string;
  calories: string;
  jewelColor: string;
  customizable: boolean;
}

export interface Combo {
  id: string;
  name: string;
  name_fr: string;
  desc: string;
  desc_fr: string;
  price: number;
  oldPrice: number;
  save: string;
  save_fr: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  text_fr: string;
  product: string;
}

export interface City {
  ar: string;
  fr: string;
  quartiers: string[];
  fee: number;
  time: string;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  name_fr: string;
  image: string;
  size: string;
  size_fr: string;
  extras: string[];
  unitPrice: number;
  qty: number;
}

export interface AppUser {
  name: string;
  phone: string;
  email: string;
  city: string;
  quartier: string;
  address: string;
  points: number;
  password?: string;
}

export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: string;
  status_fr: string;
  earnedPoints: number;
}

export interface ExtraOption {
  id: string;
  ar: string;
  fr: string;
  price: number;
}

export interface SizeOption {
  id: string;
  ar: string;
  fr: string;
  delta: number;
}
