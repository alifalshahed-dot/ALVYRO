import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { formatPrice } from '../utils/currency';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: Currency;
  language: Language;
  onRemoveFromWishlist: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
  onQuickView: (p: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  language,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
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
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {isBn ? 'আপনার উইশলিস্ট' : 'Saved Wishlist'}
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  {wishlistProducts.length} {isBn ? 'টি সংরক্ষিত পণ্য' : 'saved items'}
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

          {/* List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-stone-100">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-stone-800">
                  {isBn ? 'উইশলিস্টে কোন পণ্য নেই' : 'Your wishlist is empty'}
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  {isBn 
                    ? 'যেকোন পোশাকে থাকা হার্ট আইকনে ক্লিক করে পছন্দের পোশাক সংরক্ষণ করুন।' 
                    : 'Click the heart icon on any style to save it for later.'}
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div key={p.id} className="py-4 flex space-x-4 first:pt-0 last:pb-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-20 h-26 rounded-xl object-cover object-top border border-stone-200 shrink-0 cursor-pointer"
                    onClick={() => onQuickView(p)}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 
                          onClick={() => onQuickView(p)}
                          className="text-sm font-serif font-bold text-stone-900 hover:text-[#782333] cursor-pointer line-clamp-1"
                        >
                          {isBn ? p.titleBn : p.title}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(p)}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-stone-900 mt-1">
                        {formatPrice(p.price, currency)}
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(p, p.sizes[0] || '38', p.color);
                        }}
                        className="flex-1 py-2 bg-[#782333] hover:bg-[#601927] text-white rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isBn ? 'ব্যাগে নিন' : 'Move to Bag'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200">
            <button
              onClick={onClose}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {isBn ? 'ব্রাউজিং চালিয়ে যান' : 'Continue Browsing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
