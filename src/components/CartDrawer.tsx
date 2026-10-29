import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Check, 
  Truck,
  ShieldCheck,
  MessageCircle 
} from 'lucide-react';
import { CartItem, Currency, Language } from '../types';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  language: Language;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  setAppliedPromo: (promo: string) => void;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  setAppliedPromo,
  discountAmount
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const isBn = language === 'bn';

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    // Check store coupons from localStorage
    let allCoupons: any[] = [
      { code: 'ALIF10', isActive: true },
      { code: 'EID50', isActive: true },
      { code: 'WELCOME100', isActive: true },
      { code: 'FREESHIP', isActive: true }
    ];
    try {
      const saved = localStorage.getItem('alif_coupons');
      if (saved) allCoupons = JSON.parse(saved);
    } catch {}

    const matched = allCoupons.find((c: any) => c.code?.toUpperCase() === clean && (c.isActive !== false));

    if (matched || clean === 'ALIF10' || clean === 'ALIFSHOP') {
      setAppliedPromo(clean);
      setPromoSuccess(isBn ? `ভাউচার কোড "${clean}" সফলভাবে যুক্ত হয়েছে!` : `Voucher "${clean}" applied!`);
      setPromoError('');
    } else {
      setPromoError(isBn ? 'ভুল ভাউচার কোড! ব্যবহার করুন: ALIF10 অথবা EID50' : 'Invalid code. Try using: ALIF10 or EID50');
      setPromoSuccess('');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setPromoSuccess('');
    setPromoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#782333]/10 flex items-center justify-center text-[#782333]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {isBn ? 'আপনার শপিং ব্যাগ' : 'Your Shopping Bag'}
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} {isBn ? 'টি আইটেম' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Flat Rate Delivery Notice (Free Delivery Removed) */}
          <div className="p-3.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-950 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="font-semibold text-[11px]">
                Nationwide Delivery Charge: <strong>৳160</strong> (Advance bKash payment required)
              </span>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-stone-800">
                  {isBn ? 'আপনার ব্যাগ খালি' : 'Your bag is empty'}
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  {isBn 
                    ? 'আমাদের নতুন কালেকশন ঘুরে দেখুন এবং পছন্দের পোশাক ব্যাগে যোগ করুন।' 
                    : 'Discover our newest festive collections and add iconic styles to your bag.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#782333] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#601927] transition-all"
                >
                  {isBn ? 'শপিং শুরু করুন' : 'Start Shopping'}
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4 first:pt-0 last:pb-0">
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-26 rounded-xl object-cover object-top border border-stone-200 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-serif font-bold text-stone-900 line-clamp-1">
                          {isBn ? item.product.titleBn : item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-stone-500 mt-1">
                        <span className="bg-stone-100 px-2 py-0.5 rounded font-mono font-bold text-stone-800">
                          Size: {item.selectedSize}
                        </span>
                        <span className="truncate max-w-[120px]">{item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 px-2 text-stone-600 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 px-2 text-stone-600 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="text-sm font-bold font-mono text-stone-900">
                        {formatPrice(item.product.price * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              {/* Promo voucher input */}
              <div>
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder={isBn ? 'ভাউচার কোড (ALIF10)' : 'Promo Code (ALIF10)'}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-[#782333]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 hover:bg-[#782333] text-white rounded-xl text-xs font-bold uppercase transition-colors"
                    >
                      {isBn ? 'যোগ' : 'Apply'}
                    </button>
                  </form>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                    <span className="flex items-center space-x-1.5 font-bold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{appliedPromo} (-10%)</span>
                    </span>
                    <button
                      onClick={handleRemovePromo}
                      className="text-emerald-700 hover:text-rose-600 underline font-semibold"
                    >
                      {isBn ? 'বাতিল' : 'Remove'}
                    </button>
                  </div>
                )}
                {promoError && <p className="text-[11px] text-rose-600 mt-1 font-medium">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-700 mt-1 font-medium">{promoSuccess}</p>}
              </div>

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                  <span className="font-mono font-semibold text-stone-900">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{isBn ? 'প্রমো ডিসকাউন্ট' : 'Voucher Privilege (-10%)'}</span>
                    <span className="font-mono">
                      -{formatPrice(discountAmount, currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Delivery Fee</span>
                  <span className="font-semibold text-stone-900 font-mono">
                    ৳160 (Flat Rate)
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Bill:</span>
                  <span className="font-mono text-xl text-amber-700">
                    {formatPrice(Math.max(0, subtotal - discountAmount + 160), currency)}
                  </span>
                </div>
                <div className="text-[11px] text-pink-700 font-medium">
                  • ৳160 delivery fee payable in advance via bKash. Remaining ৳{Math.max(0, subtotal - discountAmount).toLocaleString()} paid on delivery.
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#e2136e] hover:bg-[#c20f5e] text-white rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* WhatsApp Memo Assurance */}
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-950 text-center font-bold flex items-center justify-center space-x-1.5 shadow-xs">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 animate-pulse" />
                <span>Order confirmation & cash memo will be automatically sent to your WhatsApp</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Advance Delivery Fee (৳160 via bKash) • Remaining on Delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
