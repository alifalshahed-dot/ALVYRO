import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  language: Language;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  language,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quickSizeSelect, setQuickSizeSelect] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isBn = language === 'bn';

  const handleQuickAdd = (size: string) => {
    onAddToCart(product, size, product.color);
    setQuickSizeSelect(false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const images = product.additionalImages && product.additionalImages.length > 0 
    ? product.additionalImages 
    : [product.image];

  // Dual flip logic: show image 1 on hover if available
  const displayedImage = isHovered && images.length > 1 
    ? images[activeImageIndex === 0 ? 1 : activeImageIndex] 
    : images[activeImageIndex] || product.image;

  return (
    <div 
      className="group relative flex flex-col bg-[#093427] rounded-2xl overflow-hidden border border-[#17543f] hover:border-[#d4af37]/70 hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickSizeSelect(false);
        setActiveImageIndex(0);
      }}
    >
      {/* Image Container with Dual Image Hover Transition */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#06251b] cursor-pointer" 
        onClick={() => onQuickView(product)}
      >
        <img
          src={displayedImage}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
          loading="lazy"
        />

        {/* Clean Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestseller && (
            <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-200" />
              <span>Bestseller</span>
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              New Arrival
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-amber-600'
          }`}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Dual Image Indicator Dots when more than 1 image is available */}
        {images.length > 1 && (
          <div className="absolute bottom-14 inset-x-0 flex justify-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.slice(0, 3).map((_, idx) => (
              <span
                key={idx}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  (isHovered && idx === 1 && activeImageIndex === 0) || activeImageIndex === idx
                    ? 'w-4 bg-amber-500'
                    : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!quickSizeSelect ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="flex-1 py-2.5 bg-white/95 hover:bg-white text-stone-900 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-1.5 backdrop-blur-sm cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (product.sizes.length === 1) {
                    handleQuickAdd(product.sizes[0]);
                  } else {
                    setQuickSizeSelect(true);
                  }
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer ${
                  addedAnimation 
                    ? 'bg-emerald-700 text-white' 
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {addedAnimation ? (
                  <Check className="w-4 h-4 animate-scaleIn" />
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Quick Size Selector Panel */
            <div 
              className="bg-stone-900/95 backdrop-blur-md p-3 rounded-xl shadow-xl text-white animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300 mb-1.5 text-center">
                Select Your Size
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleQuickAdd(sz)}
                    className="px-2.5 py-1 bg-white/10 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg border border-white/20 transition-all hover:border-amber-600 cursor-pointer"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#093427]">
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="uppercase tracking-widest font-bold text-[#d4af37]">
              {product.categoryName}
            </span>
            <span className="font-mono text-emerald-300/60 text-[10px]">{product.sku}</span>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-serif font-bold text-[#f7f4ed] hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-xs text-emerald-200/70 line-clamp-1 mt-1 font-light">
            {product.fabric}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-[#17543f] flex items-center justify-between">
          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-bold font-mono text-[#f7f4ed]">
              {formatPrice(product.price, currency)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono">
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
          </div>

          {/* Color swatch indicator */}
          <div className="flex items-center space-x-1.5" title={product.color}>
            <span 
              className="w-3.5 h-3.5 rounded-full border border-emerald-400/40 shadow-inner" 
              style={{ backgroundColor: product.colorCode }} 
            />
            <span className="text-[10px] text-emerald-200/70 truncate max-w-[65px]">
              {product.color.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Mobile-Only Quick Buy & Bag Button */}
        <div className="mt-2.5 sm:hidden flex items-center gap-1.5 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 bg-[#d4af37] active:bg-[#c49e29] text-[#06251b] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1 shadow-sm cursor-pointer"
          >
            <span>Order Now</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleQuickAdd(product.sizes[0] || 'M');
            }}
            className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
              addedAnimation ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-[#06251b] active:bg-black text-[#d4af37] border-[#17543f]'
            }`}
            title="Add to Bag"
          >
            {addedAnimation ? <Check className="w-4 h-4 animate-scaleIn" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
