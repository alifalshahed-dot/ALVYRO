import React from 'react';
import { Home, Grid, Heart, ShoppingBag, Truck } from 'lucide-react';
import { Language } from '../types';

interface MobileBottomNavProps {
  language: Language;
  cartCount: number;
  wishlistCount: number;
  onGoHome: () => void;
  onOpenCategories: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  activeTab?: 'home' | 'shop' | 'wishlist' | 'cart' | 'tracking';
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  cartCount,
  wishlistCount,
  onGoHome,
  onOpenCategories,
  onOpenWishlist,
  onOpenCart,
  onOpenTracking,
  activeTab = 'home'
}) => {
  const isBn = language === 'bn';

  return (
    <nav 
      aria-label="Mobile Navigation" 
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 text-stone-300 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.35)]"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={onGoHome}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-[#d4af37]' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">
            {isBn ? 'হোম' : 'Home'}
          </span>
        </button>

        {/* Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-stone-400 hover:text-stone-200 transition-all cursor-pointer"
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-950 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">
            {isBn ? 'পছন্দ' : 'Saved'}
          </span>
        </button>

        {/* Shopping Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-stone-400 hover:text-stone-200 transition-all cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-600 text-white text-[9px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">
            {isBn ? 'ব্যাগ' : 'Cart'}
          </span>
        </button>

        {/* Order Tracking */}
        <button
          onClick={onOpenTracking}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-stone-400 hover:text-stone-200 transition-all cursor-pointer"
        >
          <Truck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">
            {isBn ? 'ট্র্যাকিং' : 'Track'}
          </span>
        </button>
      </div>
    </nav>
  );
};
