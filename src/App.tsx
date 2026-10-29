import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeChartModal } from './components/SizeChartModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AboutUsModal } from './components/AboutUsModal';
import { ContactModal } from './components/ContactModal';
import { ReturnPolicyModal } from './components/ReturnPolicyModal';
import { DeliveryPolicyModal } from './components/DeliveryPolicyModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FitCalculatorModal } from './components/FitCalculatorModal';
import { AddReviewModal, UserReview } from './components/AddReviewModal';

import { PRODUCTS } from './data/products';
import { STORE_INFO } from './data/storeInfo';
import { INITIAL_ORDERS } from './data/initialOrders';
import { Product, CartItem, Currency, Language, ProductCategory, Order, Coupon, ThemeConfig, DEFAULT_THEME_CONFIG } from './types';
import { MessageCircle, ArrowUp, Check } from 'lucide-react';

export default function App() {
  // Theme & Visual Customizer (Configurable from Admin Panel)
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('alvyro_theme_config');
      return saved ? { ...DEFAULT_THEME_CONFIG, ...JSON.parse(saved) } : DEFAULT_THEME_CONFIG;
    } catch {
      return DEFAULT_THEME_CONFIG;
    }
  });

  // Global Preferences (English by default as requested)
  const [currency, setCurrency] = useState<Currency>('BDT');
  const [language, setLanguage] = useState<Language>('en');

  // Sync Dynamic Theme to Root CSS
  useEffect(() => {
    try {
      localStorage.setItem('alvyro_theme_config', JSON.stringify(themeConfig));
      document.documentElement.style.setProperty('--bg-primary', themeConfig.bgColor);
      document.documentElement.style.setProperty('--bg-secondary', themeConfig.cardBgColor);
      document.documentElement.style.setProperty('--accent-gold', themeConfig.accentColor);
      document.documentElement.style.setProperty('--text-main', themeConfig.textColor);
    } catch (e) {
      console.error(e);
    }
  }, [themeConfig]);


  // Navigation & Category Filter
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alif_shop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alif_shop_wishlist');
      return saved ? JSON.parse(saved) : ['alif-ts-01', 'alif-kp-01'];
    } catch {
      return ['alif-ts-01', 'alif-kp-01'];
    }
  });

  // Voucher Promo Code (e.g. ALIF10)
  const [appliedPromo, setAppliedPromo] = useState<string>('');

  // Product Inventory State (Synced with localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('alif_shop_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Orders State (Synced with localStorage)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('alif_shop_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Coupons State (Synced with localStorage)
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const defaultCoupons: Coupon[] = [
      { id: 'c-0', code: 'ALVYRO10', type: 'percentage', value: 10, minOrderAmount: 0, isActive: true, descriptionBn: 'সকল অর্ডারে ১০% বিশেষ ছাড়' },
      { id: 'c-1', code: 'ALIF10', type: 'percentage', value: 10, minOrderAmount: 0, isActive: true, descriptionBn: 'সকল অর্ডারে ১০% বিশেষ ছাড়' },
      { id: 'c-2', code: 'EID50', type: 'fixed', value: 50, minOrderAmount: 1000, isActive: true, descriptionBn: '১,০০০ টাকার অর্ডারে ৫০ টাকা ফ্ল্যাট ছাড়' },
      { id: 'c-3', code: 'WELCOME100', type: 'fixed', value: 100, minOrderAmount: 1500, isActive: true, descriptionBn: '১,৫০০ টাকার অর্ডারে ১০০ টাকা ফ্ল্যাট ছাড়' },
      { id: 'c-4', code: 'FREESHIP', type: 'fixed', value: 60, minOrderAmount: 1200, isActive: true, descriptionBn: '১,২০০ টাকার অর্ডারে ফ্রি ডেলিভারি (৳৬০ ছাড়)' }
    ];
    try {
      const saved = localStorage.getItem('alif_coupons');
      return saved ? JSON.parse(saved) : defaultCoupons;
    } catch {
      return defaultCoupons;
    }
  });

  // Store Settings State
  const [storeSettings, setStoreSettings] = useState(() => {
    const defaults = {
      phone: STORE_INFO.phone,
      phoneDisplay: STORE_INFO.phoneDisplay,
      whatsapp: STORE_INFO.whatsapp,
      bkashNumber: STORE_INFO.payment.bkash,
      addressBn: STORE_INFO.addressBn,
      landmarkBn: STORE_INFO.landmarkBn,
      insideCtgDelivery: 160,
      outsideCtgDelivery: 160,
      freeDeliveryThreshold: 0,
      promoCode: 'ALIF10',
      discountPercent: 10
    };
    try {
      const saved = localStorage.getItem('alif_store_settings');
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
      return defaults;
    }
  });

  // Admin Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
  const [isDeliveryPolicyOpen, setIsDeliveryPolicyOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [sizeChartGroup, setSizeChartGroup] = useState<'t-shirts-polo' | 'shirts' | 'pants'>('t-shirts-polo');
  const [orderTrackingState, setOrderTrackingState] = useState<{ isOpen: boolean; orderId?: string }>({
    isOpen: false
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // New Features: Fit Quiz, Live Show & UGC Reviews
  const [isFitCalculatorOpen, setIsFitCalculatorOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [customReviews, setCustomReviews] = useState<UserReview[]>(() => {
    try {
      const saved = localStorage.getItem('alvyro_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Floating Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to Top
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync Cart
  useEffect(() => {
    try {
      localStorage.setItem('alif_shop_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('alif_shop_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Sync Products
  useEffect(() => {
    try {
      localStorage.setItem('alif_shop_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync Orders
  useEffect(() => {
    try {
      localStorage.setItem('alif_shop_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync Coupons
  useEffect(() => {
    try {
      localStorage.setItem('alif_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  // Sync Settings
  useEffect(() => {
    try {
      localStorage.setItem('alif_store_settings', JSON.stringify(storeSettings));
    } catch (e) {
      console.error(e);
    }
  }, [storeSettings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, size: string, color: string, qty = 1) => {
    const existingIdx = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingIdx > -1) {
      const updated = [...cartItems];
      updated[existingIdx].quantity += qty;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: qty
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    showToast(language === 'bn' ? `"${product.titleBn}" ব্যাগে যোগ হয়েছে!` : `Added "${product.title}" to your bag!`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(language === 'bn' ? 'উইশলিস্ট থেকে সরানো হয়েছে' : 'Removed from wishlist');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(language === 'bn' ? 'উইশলিস্টে যুক্ত করা হয়েছে' : 'Saved to your wishlist');
    }
  };

  const handleBuyNow = (product: Product, size: string, color: string, qty = 1) => {
    handleAddToCart(product, size, color, qty);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Dynamic Discount from Coupons
  const discountAmount = (() => {
    if (!appliedPromo) return 0;
    const clean = appliedPromo.trim().toUpperCase();
    const matched = coupons.find((c) => c.code.toUpperCase() === clean && c.isActive);
    if (matched) {
      if (cartSubtotal >= matched.minOrderAmount) {
        return matched.type === 'percentage'
          ? Math.round((cartSubtotal * matched.value) / 100)
          : Math.min(matched.value, cartSubtotal);
      }
      return 0;
    }
    if (clean === 'ALIF10' || clean === storeSettings.promoCode?.toUpperCase()) {
      return Math.round((cartSubtotal * (storeSettings.discountPercent || 10)) / 100);
    }
    return Math.round(cartSubtotal * 0.1);
  })();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setAppliedPromo('');
    showToast(language === 'bn' ? `অর্ডার #${order.id} সফল হয়েছে!` : `Order #${order.id} placed!`);
  };

  const handleSelectCategory = (cat?: ProductCategory) => {
    setActiveCategory(cat || 'all');
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      style={{ backgroundColor: themeConfig.bgColor, color: themeConfig.textColor }} 
      className="min-h-screen flex flex-col selection:bg-amber-600 selection:text-white relative transition-colors duration-300"
    >
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-scaleIn border border-stone-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={Math.max(0, cartSubtotal - discountAmount)}
        wishlistCount={wishlistIds.length}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenReturnPolicy={() => setIsReturnPolicyOpen(true)}
        onOpenDeliveryPolicy={() => setIsDeliveryPolicyOpen(true)}
        onOpenOrderTracking={() => setOrderTrackingState({ isOpen: true })}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenFitCalculator={() => setIsFitCalculatorOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        themeConfig={themeConfig}
      />

      {/* Main Page: Direct Luxury Product Showcase */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* Product Catalog */}
        <ProductGrid
          products={products}
          currency={currency}
          language={language}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={(p, size, color) => handleAddToCart(p, size, color, 1)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenReturnPolicy={() => setIsReturnPolicyOpen(true)}
        onOpenDeliveryPolicy={() => setIsDeliveryPolicyOpen(true)}
        onOpenOrderTracking={() => setOrderTrackingState({ isOpen: true })}
        onOpenSizeChart={() => {
          setSizeChartGroup('t-shirts-polo');
          setIsSizeChartOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateCategory={handleSelectCategory}
        themeConfig={themeConfig}
      />

      {/* Mobile Bottom Navigation Bar (Hidden when modals are active for clean ergonomics) */}
      {!isCheckoutOpen && !selectedProduct && !isAdminOpen && (
        <MobileBottomNav
          language={language}
          cartCount={cartCount}
          wishlistCount={wishlistIds.length}
          onGoHome={() => {
            setActiveCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCategories={() => handleSelectCategory('all')}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenTracking={() => setOrderTrackingState({ isOpen: true })}
        />
      )}



      {/* Floating Action Buttons: WhatsApp & Scroll to top */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 flex flex-col space-y-2.5">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white text-stone-800 shadow-xl border border-stone-200 hover:bg-stone-50 flex items-center justify-center transition-all animate-fadeIn"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}


        {/* Direct WhatsApp Concierge to Chittagong Store */}
        <a
          href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20ALVYRO,%20I%20have%20an%20inquiry.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-13 md:h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 group relative"
          aria-label="WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-stone-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            {language === 'bn' ? 'হোয়াটসঅ্যাপে যোগাযোগ করুন' : 'Chat on WhatsApp'}
          </span>
        </a>
      </div>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        language={language}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        setAppliedPromo={setAppliedPromo}
        discountAmount={discountAmount}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        language={language}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p, sz, col) => handleAddToCart(p, sz, col, 1)}
        onQuickView={(p) => {
          setIsWishlistOpen(false);
          setSelectedProduct(p);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        language={language}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onOpenSizeChart={(group) => {
          if (group) setSizeChartGroup(group);
          setIsSizeChartOpen(true);
        }}
        onOpenFitCalculator={() => setIsFitCalculatorOpen(true)}
      />

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        language={language}
        initialTab={sizeChartGroup}
      />

      {/* About Us Modal */}
      <AboutUsModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        language={language}
      />

      {/* Contact & Hotline Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        language={language}
      />

      {/* Return & Exchange Policy Modal */}
      <ReturnPolicyModal
        isOpen={isReturnPolicyOpen}
        onClose={() => setIsReturnPolicyOpen(false)}
        language={language}
      />

      {/* Delivery Policy Modal */}
      <DeliveryPolicyModal
        isOpen={isDeliveryPolicyOpen}
        onClose={() => setIsDeliveryPolicyOpen(false)}
        language={language}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={orderTrackingState.isOpen}
        onClose={() => setOrderTrackingState({ isOpen: false })}
        language={language}
        presetOrderId={orderTrackingState.orderId}
        orders={orders}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        language={language}
        discountAmount={discountAmount}
        appliedPromo={appliedPromo}
        onOrderSuccess={handleOrderSuccess}
        onOpenOrderTracking={(id) => setOrderTrackingState({ isOpen: true, orderId: id })}
        insideCtgFee={themeConfig.insideCtgDelivery}
        outsideCtgFee={themeConfig.outsideCtgDelivery}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
        coupons={coupons}
        setCoupons={setCoupons}
        currency={currency}
        language={language}
        storeSettings={storeSettings}
        setStoreSettings={setStoreSettings}
        themeConfig={themeConfig}
        setThemeConfig={setThemeConfig}
      />


      {/* Smart Fit Calculator / Size Quiz Modal */}
      <FitCalculatorModal
        isOpen={isFitCalculatorOpen}
        onClose={() => setIsFitCalculatorOpen(false)}
        language={language}
        onApplySize={(sz) => {
          setToastMessage(language === 'bn' ? `"${sz}" সাইজ নির্বাচন করা হয়েছে।` : `Size "${sz}" selected.`);
          setTimeout(() => setToastMessage(null), 2500);
        }}
      />

      {/* Add Review & Photo Upload Modal (UGC) */}
      <AddReviewModal
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        language={language}
        onAddReview={(newRev) => {
          const updated = [newRev, ...customReviews];
          setCustomReviews(updated);
          try {
            localStorage.setItem('alvyro_reviews', JSON.stringify(updated));
          } catch (_) {}
          setToastMessage(language === 'bn' ? 'আপনার রিভিউটি যোগ করা হয়েছে!' : 'Your review has been posted!');
          setTimeout(() => setToastMessage(null), 2500);
        }}
      />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center space-x-2 border border-stone-700 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
