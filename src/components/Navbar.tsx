import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Truck, 
  X, 
  Lock
} from 'lucide-react';
import { Currency, Language, ProductCategory, ThemeConfig } from '../types';
import { formatPrice } from '../utils/currency';
import { STORE_INFO } from '../data/storeInfo';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenReturnPolicy: () => void;
  onOpenDeliveryPolicy: () => void;
  onOpenOrderTracking: () => void;
  onOpenAdmin: () => void;
  onOpenFitCalculator?: () => void;
  activeCategory?: ProductCategory;
  setActiveCategory?: (c: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  themeConfig?: ThemeConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  currency,
  setCurrency,
  onOpenCart,
  onOpenWishlist,
  onOpenOrderTracking,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
  themeConfig
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const logoSrc = themeConfig?.logoUrl || STORE_INFO.logoUrl || '/assets/aistudio/IMG_3038_704859ab.jpeg';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06251b]/95 backdrop-blur-md transition-all border-b border-[#17543f] text-[#f7f4ed]">
      
      {/* Top Bar - Strictly "welcome in ALVYRO" as requested */}
      <div className="bg-[#041a13] text-[#f7f4ed] py-2.5 px-4 border-b border-[#17543f]/60 text-center font-serif">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <span className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#d4af37] select-none">
            welcome in ALVYRO
          </span>
        </div>
      </div>

      {/* Main Bar - Clean, Minimal Header with No Menu or Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative overflow-hidden rounded-xl bg-[#06251b] border border-[#17543f]/60 group-hover:border-[#d4af37] transition-all p-1">
              <img 
                src={logoSrc}
                alt="ALVYRO Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.2em] text-xl sm:text-2xl font-black text-white group-hover:text-[#d4af37] transition-colors leading-none">
                {themeConfig?.brandName || 'ALVYRO'}
              </span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-[#d4af37] font-bold mt-1">
                {themeConfig?.brandLocation || 'BANGLADESH'}
              </span>
            </div>
          </div>

          {/* Action Icons & Utilities (No Menu / No Categories) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Search Input */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-[#093427] rounded-full px-3 py-1.5 border border-[#17543f] w-40 sm:w-56 animate-fadeIn">
                  <Search className="w-4 h-4 text-[#a3b899] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent text-xs w-full focus:outline-none text-white placeholder-stone-400"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchInput(false);
                    }}
                    className="text-[#a3b899] hover:text-white ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-[#f7f4ed] hover:text-[#d4af37] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Search"
                  title="Search Products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Track Order */}
            <button
              onClick={onOpenOrderTracking}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#093427] hover:bg-[#17543f] text-[#f7f4ed] text-xs font-semibold transition-all border border-[#17543f] cursor-pointer"
              title="Track Order"
            >
              <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden md:inline">Track</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#f7f4ed] hover:text-[#d4af37] hover:bg-white/10 rounded-full transition-colors relative cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#d4af37] text-[#06251b] text-[10px] font-extrabold flex items-center justify-center animate-scaleIn">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Currency */}
            <button
              onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
              className="px-2 py-1 rounded-lg bg-[#093427] border border-[#17543f] hover:border-[#d4af37] text-[10px] uppercase font-bold text-white transition-colors cursor-pointer hidden sm:block"
            >
              {currency === 'BDT' ? '৳ BDT' : '$ USD'}
            </button>

            {/* Admin Portal */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#06251b] text-xs font-bold transition-all border border-[#d4af37]/40 cursor-pointer shadow-sm"
              title="Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center space-x-2 bg-[#d4af37] hover:bg-[#c29d2b] text-[#06251b] px-3.5 sm:px-4 py-2 rounded-full transition-all shadow-md group cursor-pointer font-bold"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#06251b] text-[#d4af37] text-[10px] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono tracking-tight font-extrabold">
                {cartTotal > 0 ? formatPrice(cartTotal, currency) : 'Cart'}
              </span>
            </button>

          </div>

        </div>
      </div>

    </header>
  );
};
