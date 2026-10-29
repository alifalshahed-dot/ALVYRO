import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Sparkles, RotateCcw, X, Filter } from 'lucide-react';
import { Product, Currency, Language, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';

interface ProductGridProps {
  products: Product[];
  currency: Currency;
  language: Language;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
  activeCategory: ProductCategory;
  setActiveCategory: (c: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  language,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery
}) => {
  const [activeGroup, setActiveGroup] = useState<'all' | 't-shirts-polo' | 'shirts' | 'pants'>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [onlySale, setOnlySale] = useState(false);

  const isBn = language === 'bn';

  const sizes = ['all', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Group filter
      if (activeGroup !== 'all' && p.categoryGroup !== activeGroup) {
        return false;
      }

      // Specific Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize) && !p.sizes.some(s => s.includes(selectedSize))) {
        return false;
      }

      // Sale filter
      if (onlySale && !p.discountPercent) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q) || p.titleBn.includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesFabric = p.fabric.toLowerCase().includes(q);
        const matchesCategory = p.categoryName.toLowerCase().includes(q) || p.categoryNameBn.includes(q);
        if (!matchesTitle && !matchesSku && !matchesFabric && !matchesCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeGroup, activeCategory, selectedSize, onlySale, searchQuery, sortBy]);

  const hasActiveFilters = activeGroup !== 'all' || activeCategory !== 'all' || selectedSize !== 'all' || onlySale || searchQuery !== '';

  const handleResetFilters = () => {
    setActiveGroup('all');
    setActiveCategory('all');
    setSelectedSize('all');
    setOnlySale(false);
    setSearchQuery('');
  };

  return (
    <section id="catalog-section" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#17543f]">
        <div>
          <div className="flex items-center space-x-2 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALVYRO COLLECTION • BANGLADESH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f7f4ed] tracking-tight">
            All Collections
          </h2>
          <p className="text-emerald-200/70 text-xs sm:text-sm mt-1">
            Displaying {filteredProducts.length} luxury menswear pieces ready to dispatch across BANGLADESH
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-2 flex items-center justify-between flex-wrap gap-4 bg-[#093427] p-4 rounded-2xl border border-[#17543f] text-xs">
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          <button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider flex items-center space-x-2 transition-all border cursor-pointer ${
              showFiltersPanel
                ? 'bg-[#d4af37] text-[#06251b] border-[#d4af37]'
                : 'bg-[#06251b] text-stone-200 border-[#17543f] hover:border-[#d4af37]/50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Size Filter</span>
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
          </button>

          <button
            onClick={() => setOnlySale(!onlySale)}
            className={`px-3 py-2 rounded-xl font-semibold transition-all border cursor-pointer ${
              onlySale
                ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                : 'bg-[#06251b] text-stone-200 border-[#17543f] hover:border-[#d4af37]/50'
            }`}
          >
            🔥 Sale Offers
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-stone-400 hover:text-[#d4af37] flex items-center space-x-1 py-1 px-2 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-emerald-200/80 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#06251b] border border-[#17543f] rounded-xl px-3 py-2 text-[#f7f4ed] font-semibold focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer"
          >
            <option value="featured">Featured & New</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Expanded Size Filter */}
      {showFiltersPanel && (
        <div className="mt-3 p-5 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-3 animate-fadeIn">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            Select Size (Tees / Shirts / Pants):
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSize === sz
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {sz === 'all' ? 'All Sizes' : sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 mt-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400 mb-4">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-800">
            No matching items found
          </h3>
          <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
            Try clearing your filter or selecting another size.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-6 px-6 py-2.5 bg-amber-600 text-white rounded-full text-xs uppercase font-bold tracking-wider hover:bg-amber-700 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              language={language}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

    </section>
  );
};
