export type ProductCategory =
  | 'all'
  | 't-shirt'
  | 'polo-shirt'
  | 'casual-shirt'
  | 'formal-shirt'
  | 'formal-pant'
  | 'korean-pant'
  | 'casual-trouser';

export interface Product {
  id: string;
  sku: string;
  title: string;
  titleBn: string;
  category: ProductCategory;
  categoryGroup: 't-shirts-polo' | 'shirts' | 'pants';
  categoryName: string;
  categoryNameBn: string;
  price: number; // in BDT
  originalPrice?: number;
  discountPercent?: number;
  inStock: boolean;
  featured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  fabric: string;
  fabricBn: string;
  gsm?: string;
  color: string;
  colorCode: string;
  sizes: string[];
  image: string;
  additionalImages: string[];
  description: string;
  descriptionBn: string;
  details: {
    fit: string;
    material: string;
    features: string;
    care: string;
  };
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  whatsappNumber?: string;
  email?: string;
  address: string;
  district: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'bkash';
  paymentStatus?: 'pending' | 'verified' | 'paid' | 'cod';
  senderNumber?: string;
  transactionId?: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  trackingCode: string;
  courierPartner?: string;
  courierTrackingId?: string;
  advancePaid?: number;
  codDue?: number;
  adminNote?: string;
  aiFraudRisk?: 'LOW' | 'MEDIUM' | 'HIGH';
  aiFraudScore?: number;
  aiFraudReason?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  isActive: boolean;
  descriptionBn?: string;
}

export interface ThemeConfig {
  preset: 'emerald-noir' | 'obsidian-gold' | 'midnight-navy' | 'alabaster-light';
  bgColor: string; // e.g. '#06251b'
  cardBgColor: string; // e.g. '#093427'
  accentColor: string; // e.g. '#d4af37'
  textColor: string; // e.g. '#f7f4ed'
  logoUrl: string; // default '/assets/aistudio/IMG_3038_704859ab.jpeg'
  brandName: string; // 'ALVYRO'
  brandLocation: string; // 'BANGLADESH'
  heroHeadline: string;
  heroSubheadline: string;
  announcementText: string;
  requireAdvanceDeliveryFee: boolean;
  insideCtgDelivery: number;
  outsideCtgDelivery: number;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  preset: 'emerald-noir',
  bgColor: '#06251b',
  cardBgColor: '#093427',
  accentColor: '#d4af37',
  textColor: '#f7f4ed',
  logoUrl: '/assets/aistudio/IMG_3038_704859ab.jpeg',
  brandName: 'ALVYRO',
  brandLocation: 'BANGLADESH',
  heroHeadline: 'ELEVATED LUXURY MENSWEAR',
  heroSubheadline: 'Tailored for Modern Sophistication in Bangladesh',
  announcementText: 'Nationwide Flat Delivery ৳160 across BANGLADESH • Advance Delivery Fee Required via bKash',
  requireAdvanceDeliveryFee: true,
  insideCtgDelivery: 160,
  outsideCtgDelivery: 160
};

export type Currency = 'BDT' | 'USD';
export type Language = 'bn' | 'en';

