import { Order } from '../types';
import { PRODUCTS } from './products';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ALV-84920',
    customerName: 'তানভীর আহমেদ',
    phone: '01870023718',
    whatsappNumber: '01870023718',
    email: 'tanvir.ctg@gmail.com',
    address: 'নাসিরাবাদ হাউজিং সোসাইটি, রোড ২, চট্টগ্রাম',
    district: 'Chattogram / চট্টগ্রাম',
    items: [
      {
        id: 'item-1',
        product: PRODUCTS[0],
        selectedSize: 'L',
        selectedColor: 'Carbon Jet Black',
        quantity: 2
      },
      {
        id: 'item-2',
        product: PRODUCTS[1] || PRODUCTS[0],
        selectedSize: 'XL',
        selectedColor: 'Navy Blue',
        quantity: 1
      }
    ],
    subtotal: 1950,
    shippingFee: 60,
    discount: 0,
    total: 2010,
    paymentMethod: 'cod',
    status: 'confirmed',
    createdAt: '১৬ অক্টোবর ২০২৬, সকাল ১০:১৫',
    trackingCode: 'STF-BD-893120'
  },
  {
    id: 'ALV-84918',
    customerName: 'মোহাম্মদ রাশেদুল হক',
    phone: '01712345678',
    whatsappNumber: '01712345678',
    email: 'rashed.ctg@gmail.com',
    address: 'আগ্রাবাদ বাণিজ্যিক এলাকা, এক্সেস রোড, চট্টগ্রাম',
    district: 'Chattogram / চট্টগ্রাম',
    items: [
      {
        id: 'item-3',
        product: PRODUCTS[4] || PRODUCTS[0],
        selectedSize: '32',
        selectedColor: 'Charcoal Black',
        quantity: 1
      }
    ],
    subtotal: 1250,
    shippingFee: 60,
    discount: 100,
    total: 1210,
    paymentMethod: 'bkash',
    paymentStatus: 'verified',
    senderNumber: '01870023718',
    transactionId: 'BK7A92KQ01',
    status: 'processing',
    createdAt: '১৫ অক্টোবর ২০২৬, বিকাল ৪:৩০',
    trackingCode: 'STF-BD-761239'
  },
  {
    id: 'ALV-84915',
    customerName: 'সাইফুল ইসলাম',
    phone: '01988776655',
    whatsappNumber: '01988776655',
    email: 'saiful.dhk@yahoo.com',
    address: 'হাউজ ২৪, রোড ৭, ধানমন্ডি, ঢাকা',
    district: 'Dhaka (ঢাকা)',
    items: [
      {
        id: 'item-4',
        product: PRODUCTS[2] || PRODUCTS[0],
        selectedSize: 'XL',
        selectedColor: 'White',
        quantity: 2
      }
    ],
    subtotal: 2180,
    shippingFee: 0,
    discount: 218,
    total: 1962,
    paymentMethod: 'cod',
    paymentStatus: 'cod',
    status: 'shipped',
    createdAt: '১৪ অক্টোবর ২০২৬, দুপুর ২:১০',
    trackingCode: 'STF-BD-551029'
  },
  {
    id: 'ALV-84902',
    customerName: 'কবির হোসেন',
    phone: '01655443322',
    whatsappNumber: '01655443322',
    email: 'kabir.ctg@gmail.com',
    address: 'জিইসি মোড়, নাসিরাবাদ, চট্টগ্রাম',
    district: 'Chattogram / চট্টগ্রাম',
    items: [
      {
        id: 'item-5',
        product: PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: 'Black',
        quantity: 1
      }
    ],
    subtotal: 480,
    shippingFee: 60,
    discount: 0,
    total: 540,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    senderNumber: '01870023718',
    transactionId: 'BK8821094',
    status: 'delivered',
    createdAt: '১২ অক্টোবর ২০২৬, সকাল ১১:০০',
    trackingCode: 'STF-BD-441298'
  }
];
