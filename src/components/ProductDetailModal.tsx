import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  Minus, 
  Plus, 
  Check, 
  Share2,
  MessageCircle
} from 'lucide-react';
import { Product, Currency, Language } from '../types';
import { formatPrice } from '../utils/currency';
import { STORE_INFO } from '../data/storeInfo';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  language: Language;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string, qty: number) => void;
  onBuyNow: (p: Product, size: string, color: string, qty: number) => void;
  onOpenSizeChart: (group?: 't-shirts-polo' | 'shirts' | 'pants') => void;
  onOpenFitCalculator?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  language,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onOpenSizeChart,
  onOpenFitCalculator
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'fit' | 'care'>('details');
  const [citySelect, setCitySelect] = useState<'chattogram' | 'nationwide'>('chattogram');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      setActiveImageIdx(0);
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const isBn = language === 'bn';
  const allImages = [product.image, ...product.additionalImages.filter(img => img !== product.image)];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, product.color, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedSize, product.color, quantity);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-stone-50 flex flex-col justify-between border-r border-stone-200">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-200 shadow-inner group">
            <img
              src={allImages[activeImageIdx] || product.image}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            {product.isBestseller && (
              <span className="absolute top-3 left-3 bg-stone-900 text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ALVYRO Bestseller</span>
              </span>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIdx === idx ? 'border-amber-600 shadow-md scale-102' : 'border-stone-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Purchase */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="uppercase tracking-widest font-bold text-amber-700">
                {isBn ? product.categoryNameBn : product.categoryName}
              </span>
              <span className="font-mono text-stone-400">SKU: {product.sku}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
              {isBn ? product.titleBn : product.title}
            </h2>

            {/* Ratings & Share */}
            <div className="flex items-center justify-between mt-2 pt-1">
              <div className="flex items-center space-x-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-700">
                  {product.rating} ({product.reviewCount} {isBn ? 'রিভিউ' : 'reviews'})
                </span>
              </div>

              <button
                onClick={handleShare}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center space-x-1"
                title="Share product link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? (isBn ? 'কপি হয়েছে!' : 'Link Copied!') : (isBn ? 'শেয়ার' : 'Share')}</span>
              </button>
            </div>

            {/* Price Box */}
            <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-baseline justify-between">
              <div>
                <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  {isBn ? 'মূল্য' : 'Price'}
                </div>
                <div className="flex items-baseline space-x-3 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900">
                    {formatPrice(product.price, currency)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-stone-400 line-through">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      -{product.discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3 mr-1" />
                  {isBn ? 'স্টকে বিদ্যমান' : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Fabric & Color info */}
            <div className="mt-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-500 font-bold block">{isBn ? 'ফ্যাব্রিক / কাপড়:' : 'Fabric:'}</span>
                <span className="font-semibold text-stone-800">{isBn ? product.fabricBn : product.fabric}</span>
              </div>

              <div className="text-right">
                <span className="text-stone-500 font-bold block">{isBn ? 'রং:' : 'Color:'}</span>
                <div className="flex items-center space-x-1.5 justify-end mt-0.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: product.colorCode }} />
                  <span className="font-medium text-stone-800">{product.color}</span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  {isBn ? 'সাইজ বেছে নিন:' : 'Select Size:'}
                </label>
                <div className="flex items-center space-x-3">
                  {onOpenFitCalculator && (
                    <button
                      type="button"
                      onClick={onOpenFitCalculator}
                      className="text-xs text-emerald-700 hover:underline font-bold flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isBn ? 'স্মার্ট সাইজ ফাইন্ডার' : 'Fit Finder'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onOpenSizeChart(product.categoryGroup)}
                    className="text-xs text-amber-700 hover:underline font-bold flex items-center space-x-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{isBn ? 'সাইজ চার্ট' : 'Size Chart'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedSize === sz
                        ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center space-x-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {isBn ? 'পরিমাণ:' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold font-mono text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag + Buy Now + Wishlist */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToast ? (isBn ? 'ব্যাগে যোগ হয়েছে!' : 'Added!') : (isBn ? 'ব্যাগে যোগ করুন' : 'Add to Bag')}</span>
              </button>

              <button
                onClick={handleBuy}
                className="flex-1 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isBn ? 'এখনই অর্ডার করুন' : 'Order Now'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted
                    ? 'bg-amber-50 text-amber-700 border-amber-600'
                    : 'border-stone-300 text-stone-700 hover:border-stone-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-amber-600' : ''}`} />
              </button>
            </div>

            {/* WhatsApp Cash Memo Trust Note */}
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
              <span>Order confirmation & cash memo will be automatically sent to your WhatsApp</span>
            </div>

            {/* Flat Rate Delivery Notice */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 font-bold text-stone-900">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Nationwide Delivery Charge</span>
                </div>
                <span className="px-2.5 py-0.5 rounded font-mono font-bold text-white bg-[#e2136e] text-xs">
                  ৳160 Flat Rate
                </span>
              </div>

              <p className="text-stone-700 leading-relaxed text-[11px]">
                Flat delivery charge of <strong>৳160</strong> across all 64 districts of Bangladesh. To eliminate fake orders, the ৳160 delivery fee must be paid in advance via bKash. The remaining balance is payable on doorstep delivery.
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-5 pt-3 border-t border-stone-200">
              <div className="flex border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'details' ? 'border-amber-700 text-amber-700' : 'border-transparent hover:text-stone-800'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('fit')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'fit' ? 'border-amber-700 text-amber-700' : 'border-transparent hover:text-stone-800'
                  }`}
                >
                  Fit & Material
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'care' ? 'border-amber-700 text-amber-700' : 'border-transparent hover:text-stone-800'
                  }`}
                >
                  Wash Care
                </button>
              </div>

              <div className="py-3 text-xs text-stone-600 leading-relaxed">
                {activeTab === 'details' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'fit' && (
                  <div className="space-y-1">
                    <p><strong className="text-stone-900">Fit:</strong> {product.details.fit}</p>
                    <p><strong className="text-stone-900">Material:</strong> {product.details.material}</p>
                    <p><strong className="text-stone-900">Features:</strong> {product.details.features}</p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <p>{product.details.care}</p>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-3 text-[11px] text-stone-600">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-amber-700" />
                <span>7-Day Easy Exchange Policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>BANGLADESH • 100% Quality Guaranteed</span>
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Bottom Action Bar on Mobile */}
        <div className="md:hidden sticky bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-2xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2.5">
            <div>
              <div className="text-[10px] text-stone-500 font-medium">Price:</div>
              <div className="text-base font-bold font-mono text-stone-900 leading-tight">
                {formatPrice(product.price * quantity, currency)}
              </div>
              {selectedSize && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1 rounded">
                  Size: {selectedSize}
                </span>
              )}
            </div>
            <div className="flex gap-2 flex-1 justify-end">
              <button
                onClick={handleAdd}
                className="px-3 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{addedToast ? 'Added' : 'Bag'}</span>
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1 shadow-md cursor-pointer"
              >
                <span>Order Now</span>
              </button>
            </div>
          </div>
          <div className="text-[10px] text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded text-center font-bold flex items-center justify-center space-x-1">
            <MessageCircle className="w-3 h-3 text-emerald-600 shrink-0 animate-pulse" />
            <span>Order confirmation & cash memo will be automatically sent to your WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
};
