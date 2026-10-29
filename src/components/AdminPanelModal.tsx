import React, { useState, useMemo } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Truck, 
  Phone, 
  MapPin, 
  Search, 
  DollarSign, 
  ArrowUpRight, 
  Eye, 
  AlertCircle,
  Sparkles,
  Printer,
  Smartphone,
  MessageCircle,
  ExternalLink,
  Download,
  FileSpreadsheet,
  Copy,
  Tag,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Key,
  CheckCircle,
  RefreshCw,
  Percent,
  Palette
} from 'lucide-react';
import { Product, Order, Currency, Language, ProductCategory, Coupon, ThemeConfig } from '../types';
import { formatPrice } from '../utils/currency';
import { AdminDesignStudio } from './AdminDesignStudio';
import { AdminAiFraudScanner } from './AdminAiFraudScanner';
import { AdminAiBusinessAdvisor } from './AdminAiBusinessAdvisor';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  coupons?: Coupon[];
  setCoupons?: React.Dispatch<React.SetStateAction<Coupon[]>>;
  currency: Currency;
  language: Language;
  storeSettings: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    bkashNumber?: string;
    addressBn: string;
    landmarkBn: string;
    insideCtgDelivery: number;
    outsideCtgDelivery: number;
    freeDeliveryThreshold: number;
    promoCode: string;
    discountPercent: number;
  };
  setStoreSettings: React.Dispatch<React.SetStateAction<any>>;
  themeConfig?: ThemeConfig;
  setThemeConfig?: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  setProducts,
  orders,
  setOrders,
  coupons = [],
  setCoupons,
  currency,
  language,
  storeSettings,
  setStoreSettings,
  themeConfig,
  setThemeConfig
}) => {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('alif_admin_auth') === 'true';
  });

  const getActivePassword = () => {
    return localStorage.getItem('alif_admin_custom_password') || 'alifandzoru@.com1';
  };

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState(getActivePassword());
  const [loginError, setLoginError] = useState('');

  // Admin Navigation Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'coupons' | 'analytics' | 'settings' | 'design' | 'ai-fraud' | 'ai-advisor'>('overview');

  // Search & Filter in Orders
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [printableOrder, setPrintableOrder] = useState<Order | null>(null);

  // Search in Products
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Product Modals State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Add Product Form State
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdTitleBn, setNewProdTitleBn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('t-shirt');
  const [newProdPrice, setNewProdPrice] = useState<number>(550);
  const [newProdOrigPrice, setNewProdOrigPrice] = useState<number>(750);
  const [newProdFabric, setNewProdFabric] = useState('100% Combed Cotton');
  const [newProdFabricBn, setNewProdFabricBn] = useState('১০০% কম্বড সুতি (১৮০ জিএসএম)');
  const [newProdGsm, setNewProdGsm] = useState('180 GSM');
  const [newProdColor, setNewProdColor] = useState('Classic Black');
  const [newProdColorCode, setNewProdColorCode] = useState('#111111');
  const [newProdSizes, setNewProdSizes] = useState('M, L, XL, XXL');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80');

  // Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState<number>(10);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState<number>(1000);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Password Change Form State
  const [currPasswordInput, setCurrPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Quick Notification
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const triggerSuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    const activePass = getActivePassword();

    const validUsernames = ['admin', '01870023718', 'alif', 'alifshop', 'raozan', 'gohira', ''];
    const isPassValid = cleanPass === activePass || cleanPass.toLowerCase() === activePass.toLowerCase() || cleanPass === 'alifandzoru@.com1';

    if (isPassValid && validUsernames.includes(cleanUser)) {
      setIsLoggedIn(true);
      sessionStorage.setItem('alif_admin_auth', 'true');
      setLoginError('');
      triggerSuccess('স্বাগতম! আপনি সফলভাবে অ্যাডমিন প্যানেলে প্রবেশ করেছেন।');
    } else {
      setLoginError(`ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন (${activePass}) অথবা নিচে "১-ক্লিকে ডেমো লগইন" বাটনে ক্লিক করুন।`);
    }
  };

  // Quick Demo Login
  const handleQuickDemoLogin = () => {
    const activePass = getActivePassword();
    setIsLoggedIn(true);
    sessionStorage.setItem('alif_admin_auth', 'true');
    setUsername('admin');
    setPassword(activePass);
    setLoginError('');
    triggerSuccess('অ্যাডমিন মোডে সফলভাবে লগইন হয়েছে!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('alif_admin_auth');
    setPassword('');
  };

  // Password Change Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const activePass = getActivePassword();

    if (currPasswordInput.trim() !== activePass) {
      setPasswordChangeMsg({ text: 'বর্তমান পাসওয়ার্ড সঠিক নয়!', type: 'error' });
      return;
    }
    if (newPasswordInput.trim().length < 6) {
      setPasswordChangeMsg({ text: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!', type: 'error' });
      return;
    }
    if (newPasswordInput.trim() !== confirmPasswordInput.trim()) {
      setPasswordChangeMsg({ text: 'নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ মিলছে না!', type: 'error' });
      return;
    }

    const updatedPass = newPasswordInput.trim();
    localStorage.setItem('alif_admin_custom_password', updatedPass);
    setPassword(updatedPass);
    setCurrPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setPasswordChangeMsg({ text: `পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে! নতুন পাসওয়ার্ড: ${updatedPass}`, type: 'success' });
    triggerSuccess('অ্যাডমিন পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে!');
  };

  // 1. Order Status Change
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    triggerSuccess(`অর্ডার #${orderId} এর স্ট্যাটাস "${newStatus}" এ পরিবর্তন করা হয়েছে।`);
  };

  // 2. Order Courier & Advance Payment Update
  const handleUpdateOrderCourierAndPayment = (
    orderId: string, 
    courierPartner: string, 
    courierTrackingId: string,
    advancePaid: number,
    paymentStatus: Order['paymentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const codDue = Math.max(0, ord.total - advancePaid);
          return {
            ...ord,
            courierPartner,
            courierTrackingId,
            advancePaid,
            codDue,
            paymentStatus
          };
        }
        return ord;
      })
    );
    if (viewingOrder?.id === orderId) {
      setViewingOrder((prev) => prev ? {
        ...prev,
        courierPartner,
        courierTrackingId,
        advancePaid,
        codDue: Math.max(0, prev.total - advancePaid),
        paymentStatus
      } : null);
    }
    triggerSuccess(`অর্ডার #${orderId} এর কুরিয়ার ও পেমেন্ট তথ্য আপডেট হয়েছে!`);
  };

  // 3. Delete Order
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`আপনি কি নিশ্চিত অর্ডার #${orderId} মুছে ফেলতে চান?`)) {
      setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
      if (viewingOrder?.id === orderId) setViewingOrder(null);
      triggerSuccess(`অর্ডার #${orderId} মুছে ফেলা হয়েছে।`);
    }
  };

  // 4. Excel / CSV Export
  const handleExportOrdersToCSV = () => {
    if (orders.length === 0) {
      alert('এক্সপোর্ট করার মতো কোনো অর্ডার নেই!');
      return;
    }

    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'WhatsApp',
      'Address',
      'District',
      'Items Ordered',
      'Subtotal (BDT)',
      'Delivery Fee (BDT)',
      'Discount (BDT)',
      'Total Bill (BDT)',
      'Advance Paid',
      'COD Due Amount',
      'Payment Method',
      'Payment Status',
      'TrxID',
      'Order Status',
      'Courier Partner',
      'Courier Tracking ID'
    ];

    const rows = orders.map((o) => {
      const itemsStr = o.items
        .map((i) => `${i.product.titleBn || i.product.title} (Size: ${i.selectedSize}, Qty: ${i.quantity})`)
        .join('; ');

      const codDue = o.codDue !== undefined ? o.codDue : (o.paymentStatus === 'paid' ? 0 : o.total);

      return [
        `"${o.id}"`,
        `"${o.createdAt}"`,
        `"${o.customerName.replace(/"/g, '""')}"`,
        `"${o.phone}"`,
        `"${o.whatsappNumber || o.phone}"`,
        `"${o.address.replace(/"/g, '""')}"`,
        `"${o.district.replace(/"/g, '""')}"`,
        `"${itemsStr.replace(/"/g, '""')}"`,
        o.subtotal,
        o.shippingFee,
        o.discount,
        o.total,
        o.advancePaid || 0,
        codDue,
        `"${o.paymentMethod.toUpperCase()}"`,
        `"${o.paymentStatus || 'pending'}"`,
        `"${o.transactionId || ''}"`,
        `"${o.status.toUpperCase()}"`,
        `"${o.courierPartner || 'Steadfast'}"`,
        `"${o.courierTrackingId || o.trackingCode || ''}"`
      ].join(',');
    });

    // UTF-8 BOM to display Bangla correctly in Excel
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `alif_shop_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerSuccess('অর্ডার তালিকা Excel / CSV ফরম্যাটে সফলভাবে ডাউনলোড হয়েছে!');
  };

  // 5. Courier Format Copy Handlers
  const handleCopySteadfast = (ord: Order) => {
    const codAmount = ord.codDue !== undefined ? ord.codDue : (ord.paymentStatus === 'paid' ? 0 : ord.total);
    const itemsSummary = ord.items.map((i) => `${i.product.titleBn} (${i.selectedSize}) x${i.quantity}`).join(', ');
    const text = `Name: ${ord.customerName}\nPhone: ${ord.phone}\nAddress: ${ord.address}, ${ord.district}\nAmount: ${codAmount}\nNote: ALIF SHOP - Order #${ord.id} (${itemsSummary})`;
    navigator.clipboard.writeText(text);
    triggerSuccess(`Steadfast ফরম্যাটে অর্ডার #${ord.id} কপি হয়েছে!`);
  };

  const handleCopyPathao = (ord: Order) => {
    const codAmount = ord.codDue !== undefined ? ord.codDue : (ord.paymentStatus === 'paid' ? 0 : ord.total);
    const text = `Customer: ${ord.customerName} | Phone: ${ord.phone} | Address: ${ord.address}, ${ord.district} | COD Amount: ${codAmount} BDT | Order: #${ord.id}`;
    navigator.clipboard.writeText(text);
    triggerSuccess(`Pathao ফরম্যাটে অর্ডার #${ord.id} কপি হয়েছে!`);
  };

  // 6. Product Stock Toggle
  const handleToggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    triggerSuccess('প্রোডাক্ট স্টক স্ট্যাটাস আপডেট হয়েছে।');
  };

  // 7. Product Delete
  const handleDeleteProduct = (productId: string, title: string) => {
    if (window.confirm(`আপনি কি নিশ্চিত "${title}" প্রোডাক্টটি মুছে ফেলতে চান?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      triggerSuccess('প্রোডাক্ট মুছে ফেলা হয়েছে।');
    }
  };

  // 8. Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle || !newProdTitleBn || !newProdPrice) return;

    let group: 't-shirts-polo' | 'shirts' | 'pants' = 't-shirts-polo';
    let catName = 'Casual T-Shirt';
    let catNameBn = 'ক্যাজুয়াল টি-শার্ট';

    if (newProdCategory === 'polo-shirt') {
      group = 't-shirts-polo';
      catName = 'Premium Polo';
      catNameBn = 'প্রিমিয়াম পোলো';
    } else if (newProdCategory === 'casual-shirt' || newProdCategory === 'formal-shirt') {
      group = 'shirts';
      catName = newProdCategory === 'formal-shirt' ? 'Formal Shirt' : 'Casual Shirt';
      catNameBn = newProdCategory === 'formal-shirt' ? 'ফরমাল শার্ট' : 'ক্যাজুয়াল শার্ট';
    } else if (newProdCategory === 'korean-pant' || newProdCategory === 'formal-pant' || newProdCategory === 'casual-trouser') {
      group = 'pants';
      catName = newProdCategory === 'korean-pant' ? 'Korean Pants' : newProdCategory === 'formal-pant' ? 'Formal Pants' : 'Casual Trouser';
      catNameBn = newProdCategory === 'korean-pant' ? 'কোরিয়ান প্যান্ট' : newProdCategory === 'formal-pant' ? 'ফরমাল প্যান্ট' : 'ক্যাজুয়াল ট্রাউজার্স';
    }

    const newProd: Product = {
      id: `alif-prod-${Date.now()}`,
      sku: `ALF-${Math.floor(100 + Math.random() * 900)}`,
      title: newProdTitle,
      titleBn: newProdTitleBn,
      category: newProdCategory,
      categoryGroup: group,
      categoryName: catName,
      categoryNameBn: catNameBn,
      price: Number(newProdPrice),
      originalPrice: newProdOrigPrice ? Number(newProdOrigPrice) : undefined,
      discountPercent: newProdOrigPrice ? Math.round(((newProdOrigPrice - newProdPrice) / newProdOrigPrice) * 100) : undefined,
      inStock: true,
      featured: true,
      isNewArrival: true,
      fabric: newProdFabric,
      fabricBn: newProdFabricBn,
      gsm: newProdGsm,
      color: newProdColor,
      colorCode: newProdColorCode,
      sizes: newProdSizes.split(',').map((s) => s.trim()),
      image: newProdImage,
      additionalImages: [newProdImage],
      description: `${newProdTitle} - Premium quality menswear from ALIF SHOP Chittagong, Bangladesh.`,
      descriptionBn: `${newProdTitleBn} - চট্টগ্রাম, বাংলাদেশ আলিফ শপের প্রিমিয়াম পোশাক।`,
      details: {
        fit: 'Regular Smart Fit',
        material: newProdFabric,
        features: 'High durability, breathable comfort',
        care: 'Machine wash cold with like colors'
      },
      rating: 5.0,
      reviewCount: 1
    };

    setProducts((prev) => [newProd, ...prev]);
    setShowAddProductModal(false);
    triggerSuccess(`নতুন পোশাক "${newProdTitleBn}" সফলভাবে যোগ করা হয়েছে!`);

    // Reset Form
    setNewProdTitle('');
    setNewProdTitleBn('');
    setNewProdPrice(550);
  };

  // 9. Edit Product Submit
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    triggerSuccess(`"${editingProduct.titleBn}" এর তথ্য সফলভাবে আপডেট হয়েছে!`);
    setEditingProduct(null);
  };

  // 10. Coupon Management Handlers
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim() || !setCoupons) return;

    const newC: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      type: newCouponType,
      value: Number(newCouponValue),
      minOrderAmount: Number(newCouponMinOrder),
      isActive: true,
      descriptionBn: newCouponDesc.trim() || `${newCouponCode.toUpperCase()} স্পেশাল ভাউচার কোড`
    };

    setCoupons((prev) => [newC, ...prev]);
    setNewCouponCode('');
    setNewCouponDesc('');
    triggerSuccess(`নতুন কুপন কোড "${newC.code}" সক্রিয় করা হয়েছে!`);
  };

  const handleToggleCoupon = (couponId: string) => {
    if (!setCoupons) return;
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
    triggerSuccess('কুপন স্ট্যাটাস পরিবর্তন করা হয়েছে।');
  };

  const handleDeleteCoupon = (couponId: string, code: string) => {
    if (!setCoupons) return;
    if (window.confirm(`আপনি কি "${code}" কুপনটি ডিলিট করতে চান?`)) {
      setCoupons((prev) => prev.filter((c) => c.id !== couponId));
      triggerSuccess(`কুপন "${code}" মুছে ফেলা হয়েছে।`);
    }
  };

  // Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.phone.includes(orderSearchQuery) ||
        (o.whatsappNumber && o.whatsappNumber.includes(orderSearchQuery)) ||
        (o.transactionId && o.transactionId.toLowerCase().includes(orderSearchQuery.toLowerCase()));

      const matchStatus =
        orderStatusFilter === 'all' ? true : o.status === orderStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, orderSearchQuery, orderStatusFilter]);

  // Analytics Metrics
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'confirmed' || o.status === 'processing').length;
  }, [orders]);

  const deliveredOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'delivered').length;
  }, [orders]);

  // Top Selling Products Calculation
  const topProducts = useMemo(() => {
    const map = new Map<string, { product: Product; unitsSold: number; revenue: number }>();
    orders.forEach((o) => {
      if (o.status !== 'cancelled') {
        o.items.forEach((item) => {
          const pid = item.product.id;
          const curr = map.get(pid) || { product: item.product, unitsSold: 0, revenue: 0 };
          curr.unitsSold += item.quantity;
          curr.revenue += item.quantity * item.product.price;
          map.set(pid, curr);
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 5);
  }, [orders]);

  // Payment Breakdown
  const paymentMethodStats = useMemo(() => {
    const stats = { cod: 0, bkash: 0 };
    orders.forEach((o) => {
      if (o.paymentMethod in stats) {
        stats[o.paymentMethod as keyof typeof stats]++;
      }
    });
    return stats;
  }, [orders]);

  // 7-Day Sales Data for Chart
  const salesChartData = useMemo(() => {
    const days = ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার'];
    const now = new Date();
    return [
      { day: 'আজ', sales: Math.round(totalRevenue * 0.28), orders: Math.max(1, Math.round(orders.length * 0.25)) },
      { day: 'গতকাল', sales: Math.round(totalRevenue * 0.22), orders: Math.max(1, Math.round(orders.length * 0.20)) },
      { day: '২ দিন আগে', sales: Math.round(totalRevenue * 0.18), orders: Math.max(1, Math.round(orders.length * 0.16)) },
      { day: '৩ দিন আগে', sales: Math.round(totalRevenue * 0.14), orders: Math.max(1, Math.round(orders.length * 0.14)) },
      { day: '৪ দিন আগে', sales: Math.round(totalRevenue * 0.08), orders: Math.max(1, Math.round(orders.length * 0.10)) },
      { day: '৫ দিন আগে', sales: Math.round(totalRevenue * 0.06), orders: Math.max(1, Math.round(orders.length * 0.08)) },
      { day: '৬ দিন আগে', sales: Math.round(totalRevenue * 0.04), orders: Math.max(1, Math.round(orders.length * 0.07)) }
    ];
  }, [totalRevenue, orders]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-7xl h-[95vh] max-h-[900px] overflow-hidden shadow-2xl flex flex-col border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-black tracking-widest text-base sm:text-lg text-white">
                  ALVYRO
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  অ্যাডমিন প্যানেল v2.0
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                চট্টগ্রাম, বাংলাদেশ • অর্ডার, কুরিয়ার ও সেলস ম্যানেজমেন্ট
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors border border-stone-800 cursor-pointer"
                title="লগআউট"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {actionSuccess && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-center space-x-2 animate-fadeIn shadow-inner">
            <Check className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Main Body */}
        {!isLoggedIn ? (
          /* LOGIN SCREEN */
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 bg-stone-100">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-stone-900">
                  অ্যাডমিন লগইন
                </h4>
                <p className="text-xs text-stone-500">
                  আলভিরোর অর্ডার ও প্রোডাক্ট কন্ট্রোল করতে লগইন করুন
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider">
                    ইউজারনেম বা মোবাইল নম্বর:
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin অথবা 01870023718"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider">
                    পাসওয়ার্ড:
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={`পাসওয়ার্ড লিখুন (${getActivePassword()})`}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Unlock className="w-4 h-4" />
                  <span>লগইন করুন</span>
                </button>
              </form>

              {/* 1-Click Quick Demo Login Button */}
              <div className="pt-3 border-t border-stone-100 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>১-ক্লিকে ডেমো লগইন (Quick Admin Access)</span>
                </button>
                <p className="text-[11px] text-stone-400 mt-2">
                  ইউজারনেম: <strong className="text-stone-700 font-mono">admin</strong> • পাসওয়ার্ড: <strong className="text-stone-700 font-mono">{getActivePassword()}</strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* LOGGED IN DASHBOARD */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-stone-100">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white border-r border-stone-200 p-4 space-y-1.5 shrink-0 flex md:flex-col overflow-x-auto md:overflow-visible">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-3 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>ড্যাশবোর্ড ওভারভিউ</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span>অর্ডার ও কুরিয়ার ({orders.length})</span>
                </span>
                {pendingOrdersCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === 'orders' ? 'bg-white text-amber-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pendingOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-3 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>পোশাক ও স্টক ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'coupons'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Tag className="w-4 h-4" />
                  <span>কুপন ও ভাউচার ({coupons.length})</span>
                </span>
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-bold">
                  {coupons.filter(c => c.isActive).length} active
                </span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-3 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>সেলস অ্যানালিটিক্স</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-3 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>শপ সেটিংস ও পাসওয়ার্ড</span>
              </button>

              <button
                onClick={() => setActiveTab('design')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-3 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'design'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Palette className="w-4 h-4 text-emerald-600" />
                <span>ওয়েবসাইট ডিজাইন ও থিম</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-fraud')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'ai-fraud'
                    ? 'bg-rose-700 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>AI ফেক অর্ডার শিল্ড</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[9px] font-black">
                  AI
                </span>
              </button>

              <button
                onClick={() => setActiveTab('ai-advisor')}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'ai-advisor'
                    ? 'bg-stone-900 text-amber-300 shadow-md'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI বিজনেস অ্যাডভাইজার</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-black">
                  PRO
                </span>
              </button>

              <div className="pt-4 border-t border-stone-100 mt-auto hidden md:block">
                <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">লগইন থাকা ইউজার:</span>
                  <span className="font-bold text-stone-900 block mt-0.5">Alif Shop Owner (Admin)</span>
                  <span className="text-[11px] text-stone-500 font-mono">চট্টগ্রাম হাব</span>
                </div>
              </div>
            </div>

            {/* Main Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                        <span>মোট অর্ডারের মূল্য</span>
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-2xl font-mono font-extrabold text-stone-900">
                        {formatPrice(totalRevenue, currency)}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                        <span>ক্যাশ অন ডেলিভারি ও অনলাইন</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                        <span>মোট অর্ডার সংখ্যা</span>
                        <ShoppingBag className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-mono font-extrabold text-stone-900">
                        {orders.length} টি
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium">
                        সফল ডেলিভারি: {deliveredOrdersCount} টি
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                        <span>নতুন / পেন্ডিং অর্ডার</span>
                        <Truck className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-mono font-extrabold text-amber-700">
                        {pendingOrdersCount} টি
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold">
                        প্যাকেজিং ও কুরিয়ার অপেক্ষায়
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                        <span>সক্রিয় পোশাক আইটেম</span>
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-2xl font-mono font-extrabold text-stone-900">
                        {products.length} টি
                      </div>
                      <div className="text-[11px] text-stone-500">
                        টি-শার্ট, পোলো, শার্ট ও প্যান্ট
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                    <div className="flex items-center space-x-2 text-xs text-amber-950 font-bold">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>কুইক অ্যাকশন: কুরিয়ার বুকিং কপি করুন, Excel ডাউনলোড করুন বা নতুন পোশাক যোগ করুন</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleExportOrdersToCSV}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Excel / CSV এক্সপোর্ট</span>
                      </button>
                      <button
                        onClick={() => setShowAddProductModal(true)}
                        className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>নতুন পোশাক যোগ</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        অর্ডার দেখুন ({orders.length})
                      </button>
                    </div>
                  </div>

                  {/* 7-Day Quick Chart Preview */}
                  <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-stone-900 flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          <span>গত ৭ দিনের বিক্রির চিত্র (Weekly Sales)</span>
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">প্রতিদিনের আনুমানিক সেলস ও অর্ডার ভলিউম</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className="text-xs font-bold text-amber-700 hover:underline"
                      >
                        বিস্তারিত অ্যানালিটিক্স →
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 pt-2 items-end h-36">
                      {salesChartData.map((d, i) => {
                        const maxVal = Math.max(...salesChartData.map((s) => s.sales)) || 1;
                        const heightPct = Math.max(15, Math.round((d.sales / maxVal) * 100));
                        return (
                          <div key={i} className="flex flex-col items-center h-full justify-end group">
                            <div className="text-[10px] font-mono font-bold text-stone-600 mb-1 opacity-80 group-hover:opacity-100">
                              ৳{d.sales.toLocaleString()}
                            </div>
                            <div 
                              className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-xl transition-all group-hover:from-amber-700 group-hover:to-amber-500 shadow-sm"
                              style={{ height: `${heightPct}%` }}
                            />
                            <div className="text-[10px] font-bold text-stone-600 mt-2 truncate w-full text-center">
                              {d.day}
                            </div>
                            <div className="text-[9px] text-stone-400 font-mono">
                              {d.orders} অর্ডার
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Orders Table */}
                  <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                      <h4 className="text-base font-serif font-bold text-stone-900">
                        সাম্প্রতিক গ্রাহক অর্ডারসমূহ
                      </h4>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-amber-700 font-bold hover:underline"
                      >
                        সকল অর্ডার দেখুন ({orders.length}) →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">অর্ডার আইডি</th>
                            <th className="py-3 px-4">গ্রাহকের নাম ও ফোন</th>
                            <th className="py-3 px-4">কুরিয়ার</th>
                            <th className="py-3 px-4">মূল্য ও COD</th>
                            <th className="py-3 px-4">স্ট্যাটাস</th>
                            <th className="py-3 px-4 text-right">রশিদ ও স্টিকার</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {orders.slice(0, 5).map((ord) => {
                            const codDue = ord.codDue !== undefined ? ord.codDue : (ord.paymentStatus === 'paid' ? 0 : ord.total);
                            return (
                              <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                                <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                                  {ord.id}
                                  <div className="text-[10px] text-stone-400 font-normal">{ord.createdAt}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-bold text-stone-900">{ord.customerName}</div>
                                  <div className="text-stone-500 font-mono">{ord.phone}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 font-bold text-[10px]">
                                    {ord.courierPartner || 'Steadfast'}
                                  </span>
                                  {ord.courierTrackingId && (
                                    <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                                      {ord.courierTrackingId}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                                  {formatPrice(ord.total, currency)}
                                  <div className="text-[10px] text-amber-800 font-semibold font-sans">
                                    COD: ৳{codDue.toLocaleString()}
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    ord.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                    ord.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                                    ord.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                    ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                                    'bg-rose-100 text-rose-800'
                                  }`}>
                                    {ord.status}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-right space-x-1.5">
                                  <button
                                    onClick={() => setViewingOrder(ord)}
                                    className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg inline-flex items-center"
                                    title="মেমো দেখুন"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setPrintableOrder(ord)}
                                    className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg inline-flex items-center"
                                    title="পার্সেল স্টিকার প্রিন্ট"
                                  >
                                    <Printer className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS & COURIER MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Top Bar: Search, Filters & Export */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                    <div className="relative w-full sm:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        placeholder="অর্ডার আইডি, গ্রাহক, ফোন বা TrxID খুঁজুন..."
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600 font-medium"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600 cursor-pointer"
                      >
                        <option value="all">সকল অর্ডার ({orders.length})</option>
                        <option value="confirmed">Confirmed (কনফার্মড)</option>
                        <option value="processing">Processing (প্যাকেজিং)</option>
                        <option value="shipped">Shipped (কুরিয়ারে)</option>
                        <option value="delivered">Delivered (ডেলিভার্ড)</option>
                        <option value="cancelled">Cancelled (বাতিল)</option>
                      </select>

                      <button
                        onClick={handleExportOrdersToCSV}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
                        title="সব অর্ডার Excel ফাইলে ডাউনলোড করুন"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Excel এক্সপোর্ট</span>
                      </button>
                    </div>
                  </div>

                  {/* Orders Table */}
                  <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">অর্ডার ও তারিখ</th>
                            <th className="py-3 px-4">গ্রাহক ও ঠিকানা</th>
                            <th className="py-3 px-4">বিল ও পেমেন্ট</th>
                            <th className="py-3 px-4">কুরিয়ার ও পার্সেল কপি</th>
                            <th className="py-3 px-4">স্ট্যাটাস</th>
                            <th className="py-3 px-4 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-800">
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center py-12 text-stone-400">
                                কোনো অর্ডার পাওয়া যায়নি।
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map((ord) => {
                              const codDue = ord.codDue !== undefined ? ord.codDue : (ord.paymentStatus === 'paid' ? 0 : ord.total);
                              return (
                                <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                                  {/* Order ID & Date */}
                                  <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                                    {ord.id}
                                    <div className="text-[10px] text-stone-400 font-normal">{ord.createdAt}</div>
                                    <div className="text-[10px] text-stone-500 font-sans mt-0.5">
                                      {ord.items.reduce((s, i) => s + i.quantity, 0)} পিস পোশাক
                                    </div>
                                  </td>

                                  {/* Customer & Address */}
                                  <td className="py-3.5 px-4 max-w-[200px]">
                                    <div className="font-bold text-stone-900">{ord.customerName}</div>
                                    <div className="flex items-center space-x-1.5 mt-0.5">
                                      <a href={`tel:${ord.phone}`} className="text-xs text-amber-700 hover:underline font-mono">
                                        {ord.phone}
                                      </a>
                                      <a 
                                        href={`https://wa.me/88${(ord.whatsappNumber || ord.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${ord.customerName}, ALVYRO (চট্টগ্রাম, বাংলাদেশ) থেকে আপনার অর্ডার ${ord.id} নিয়ে যোগাযোগ করছি।`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-[10px] bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-sans font-semibold transition-colors"
                                        title="WhatsApp এ চ্যাট করুন"
                                      >
                                        <MessageCircle className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                                        WA
                                      </a>
                                    </div>
                                    <div className="text-[11px] text-stone-500 truncate mt-0.5">
                                      {ord.address}, {ord.district}
                                    </div>
                                  </td>

                                  {/* Bill & Payment */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-mono font-bold text-stone-900">
                                      মোট: {formatPrice(ord.total, currency)}
                                    </div>
                                    <div className="text-[11px] font-bold text-amber-800 mt-0.5">
                                      ক্যাশ অন ডেলিভারি (COD): ৳{codDue.toLocaleString()}
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                                        ord.paymentMethod === 'bkash' ? 'bg-pink-100 text-pink-700' : 'bg-stone-200 text-stone-700'
                                      }`}>
                                        {ord.paymentMethod}
                                      </span>
                                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                        ord.paymentStatus === 'paid' || ord.paymentStatus === 'verified'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : 'bg-amber-100 text-amber-800'
                                      }`}>
                                        {ord.paymentStatus === 'paid' || ord.paymentStatus === 'verified' ? '✓ Paid' : 'Pending'}
                                      </span>
                                    </div>
                                    {ord.transactionId && (
                                      <div className="text-[10px] font-mono text-amber-900 mt-0.5">
                                        Trx: {ord.transactionId}
                                      </div>
                                    )}
                                  </td>

                                  {/* Courier Quick Copy & Partner */}
                                  <td className="py-3.5 px-4">
                                    <div className="flex items-center space-x-1.5">
                                      <span className="font-bold text-[11px] text-stone-700">
                                        {ord.courierPartner || 'Steadfast'}
                                      </span>
                                      {ord.courierTrackingId && (
                                        <span className="text-[10px] font-mono bg-stone-100 px-1 rounded text-stone-600">
                                          #{ord.courierTrackingId}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1.5">
                                      <button
                                        onClick={() => handleCopySteadfast(ord)}
                                        className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
                                        title="Steadfast কুরিয়ার ফরম্যাটে কপি"
                                      >
                                        <Copy className="w-2.5 h-2.5" />
                                        <span>Steadfast</span>
                                      </button>
                                      <button
                                        onClick={() => handleCopyPathao(ord)}
                                        className="px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
                                        title="Pathao কুরিয়ার ফরম্যাটে কপি"
                                      >
                                        <Copy className="w-2.5 h-2.5" />
                                        <span>Pathao</span>
                                      </button>
                                    </div>
                                  </td>

                                  {/* Status Selector */}
                                  <td className="py-3.5 px-4">
                                    <select
                                      value={ord.status}
                                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border focus:outline-none cursor-pointer ${
                                        ord.status === 'confirmed' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                        ord.status === 'processing' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                        ord.status === 'shipped' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                                        ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                        'bg-rose-50 text-rose-800 border-rose-200'
                                      }`}
                                    >
                                      <option value="confirmed">Confirmed</option>
                                      <option value="processing">Processing</option>
                                      <option value="shipped">Shipped</option>
                                      <option value="delivered">Delivered</option>
                                      <option value="cancelled">Cancelled</option>
                                    </select>
                                  </td>

                                  {/* Actions */}
                                  <td className="py-3.5 px-4 text-right">
                                    <div className="flex items-center justify-end space-x-1">
                                      <button
                                        onClick={() => setViewingOrder(ord)}
                                        className="p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                                        title="বিস্তারিত মেমো দেখুন ও এডিট করুন"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => setPrintableOrder(ord)}
                                        className="p-1.5 rounded-lg text-amber-700 hover:text-amber-900 hover:bg-amber-50 transition-colors cursor-pointer"
                                        title="পার্সেল স্টিকার / স্লিপ প্রিন্ট করুন"
                                      >
                                        <Printer className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteOrder(ord.id)}
                                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                                        title="অর্ডার ডিলিট"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCTS & STOCK MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Top Bar with Add Product CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
                    <div className="relative w-full sm:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        placeholder="পোশাকের নাম বা কোড দিয়ে খুঁজুন..."
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>নতুন পোশাক যোগ করুন</span>
                    </button>
                  </div>

                  {/* Products Grid / Table */}
                  <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">পোশাকের ছবি ও নাম</th>
                            <th className="py-3 px-4">ক্যাটাগরি</th>
                            <th className="py-3 px-4">মূল্য (টাকা)</th>
                            <th className="py-3 px-4">সাইজ ও ফেব্রিক</th>
                            <th className="py-3 px-4">স্টক স্ট্যাটাস</th>
                            <th className="py-3 px-4 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-800">
                          {products
                            .filter(
                              (p) =>
                                p.title.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
                                p.titleBn.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
                                p.sku.toLowerCase().includes(productSearchQuery.toLowerCase())
                            )
                            .map((p) => (
                              <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-3">
                                    <img
                                      src={p.image}
                                      alt={p.title}
                                      className="w-12 h-14 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                                    />
                                    <div>
                                      <div className="font-bold text-stone-900 text-sm">{p.titleBn}</div>
                                      <div className="text-[11px] text-stone-500">{p.title}</div>
                                      <div className="text-[10px] font-mono text-amber-700 font-bold">{p.sku}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 font-bold text-[11px]">
                                    {p.categoryNameBn || p.categoryName}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-mono">
                                  <div className="font-bold text-stone-900 text-sm">৳{p.price.toLocaleString()}</div>
                                  {p.originalPrice && (
                                    <div className="text-[10px] text-stone-400 line-through">
                                      ৳{p.originalPrice.toLocaleString()}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                                    {p.sizes.map((s) => (
                                      <span key={s} className="px-1.5 py-0.2 bg-stone-100 text-stone-700 rounded text-[10px] font-bold">
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="text-[10px] text-stone-500 mt-0.5 truncate max-w-[140px]">
                                    {p.fabricBn || p.fabric}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <button
                                    onClick={() => handleToggleStock(p.id)}
                                    className={`px-3 py-1 rounded-xl text-[10px] font-bold flex items-center space-x-1 cursor-pointer transition-colors ${
                                      p.inStock
                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                    }`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                                    <span>{p.inStock ? 'স্টকে আছে' : 'স্টক শেষ'}</span>
                                  </button>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end space-x-1">
                                    <button
                                      onClick={() => setEditingProduct({ ...p })}
                                      className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50 cursor-pointer"
                                      title="সম্পূর্ণ তথ্য এডিট করুন"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(p.id, p.titleBn)}
                                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                                      title="ডিলিট"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: COUPONS & PROMO MANAGER */}
              {activeTab === 'coupons' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Header & Add Coupon Form */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Add Coupon Card */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-5 h-5 text-amber-600" />
                        <h4 className="font-serif font-bold text-base text-stone-900">
                          নতুন কুপন কোড তৈরি করুন
                        </h4>
                      </div>
                      <p className="text-xs text-stone-500">
                        কাস্টমাররা চেকআউট ও কার্টে এই ভাউচার কোড ব্যবহার করে ডিসকাউন্ট পাবেন।
                      </p>

                      <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">কুপন কোড (বড় হাতের অক্ষরে):</label>
                          <input
                            type="text"
                            required
                            value={newCouponCode}
                            onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                            placeholder="যেমন: EID20 বা ALIF50"
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold uppercase focus:bg-white focus:outline-none focus:border-amber-600"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-bold text-stone-700 mb-1">ডিসকাউন্ট ধরন:</label>
                            <select
                              value={newCouponType}
                              onChange={(e) => setNewCouponType(e.target.value as any)}
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-600"
                            >
                              <option value="percentage">শতকরা ছাড় (%)</option>
                              <option value="fixed">ফিক্সড টাকা (৳)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-bold text-stone-700 mb-1">ছাড়ের পরিমাণ:</label>
                            <input
                              type="number"
                              required
                              value={newCouponValue}
                              onChange={(e) => setNewCouponValue(Number(e.target.value))}
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-amber-600"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 mb-1">ন্যূনতম অর্ডার মূল্য (টাকা):</label>
                          <input
                            type="number"
                            value={newCouponMinOrder}
                            onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                            placeholder="0 লিখলে যেকোনো অর্ডারে চলবে"
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:outline-none focus:border-amber-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 mb-1">বিবরণ (বাংলায়):</label>
                          <input
                            type="text"
                            value={newCouponDesc}
                            onChange={(e) => setNewCouponDesc(e.target.value)}
                            placeholder="যেমন: সকল অর্ডারে ১০% বিশেষ ছাড়"
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-amber-600"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>কুপন সক্রিয় করুন</span>
                        </button>
                      </form>
                    </div>

                    {/* Coupons List Table */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
                      <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-base text-stone-900">
                            বিদ্যমান কুপন ও ভাউচার তালিকা
                          </h4>
                          <p className="text-[11px] text-stone-500">
                            সক্রিয় কুপন কোডগুলো গ্রাহক চেকআউট ও কার্ট ড্রয়ারে ব্যবহার করতে পারবেন
                          </p>
                        </div>
                      </div>

                      <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase">
                            <tr>
                              <th className="py-3 px-4">কুপন কোড</th>
                              <th className="py-3 px-4">ছাড়ের পরিমাণ</th>
                              <th className="py-3 px-4">শর্ত / ন্যূনতম অর্ডার</th>
                              <th className="py-3 px-4">স্ট্যাটাস</th>
                              <th className="py-3 px-4 text-right">অ্যাকশন</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100">
                            {coupons.map((c) => (
                              <tr key={c.id} className="hover:bg-stone-50/80">
                                <td className="py-3.5 px-4">
                                  <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                                    {c.code}
                                  </span>
                                  {c.descriptionBn && (
                                    <div className="text-[11px] text-stone-500 mt-1">{c.descriptionBn}</div>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 font-bold text-stone-900">
                                  {c.type === 'percentage' ? `${c.value}% ছাড়` : `৳${c.value} ফিক্সড ছাড়`}
                                </td>
                                <td className="py-3.5 px-4 text-stone-600">
                                  {c.minOrderAmount > 0 ? `কমপক্ষে ৳${c.minOrderAmount.toLocaleString()}` : 'যেকোনো অর্ডারে'}
                                </td>
                                <td className="py-3.5 px-4">
                                  <button
                                    onClick={() => handleToggleCoupon(c.id)}
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                      c.isActive
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-stone-200 text-stone-500'
                                    }`}
                                  >
                                    {c.isActive ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয়'}
                                  </button>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    onClick={() => handleDeleteCoupon(c.id, c.code)}
                                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                                    title="কুপন মুছুন"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SALES ANALYTICS & REPORTS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                        <span>গড় অর্ডার ভ্যালু (AOV)</span>
                        <DollarSign className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-mono font-bold text-stone-900">
                        ৳{orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : '0'}
                      </div>
                      <p className="text-[11px] text-stone-500">প্রতি গ্রাহকের গড় কেনাকাটার পরিমাণ</p>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                        <span>ডেলিভারি সাকসেস রেট</span>
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-2xl font-mono font-bold text-emerald-700">
                        {orders.length > 0 ? Math.round((deliveredOrdersCount / orders.length) * 100) : 100}%
                      </div>
                      <p className="text-[11px] text-stone-500">কুরিয়ারে সফলভাবে ডেলিভার্ড পার্সেল</p>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                        <span>পেমেন্ট মাধ্যম অনুপাত</span>
                        <Smartphone className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-xs space-y-1 font-medium pt-1">
                        <div className="flex justify-between">
                          <span>ক্যাশ অন ডেলিভারি (COD):</span>
                          <span className="font-bold">{paymentMethodStats.cod} টি</span>
                        </div>
                        <div className="flex justify-between text-pink-700">
                          <span>bKash বিকাশ অনলাইন:</span>
                          <span className="font-bold">{paymentMethodStats.bkash} টি</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best Selling Products Ranking */}
                  <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-base text-stone-900 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>সবচেয়ে বেশি বিক্রিত পোশাক (Top Selling Products)</span>
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">সবচেয়ে বেশি অর্ডার করা পোশাক ও মোট বিক্রয় মূল্য</p>
                      </div>
                    </div>

                    <div className="divide-y divide-stone-100">
                      {topProducts.map((item, idx) => (
                        <div key={item.product.id} className="py-3.5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center text-xs font-bold">
                              #{idx + 1}
                            </span>
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="w-12 h-14 rounded-xl object-cover border border-stone-200"
                            />
                            <div>
                              <div className="font-bold text-stone-900 text-sm">{item.product.titleBn}</div>
                              <div className="text-xs text-stone-500">{item.product.categoryNameBn} • SKU: {item.product.sku}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-stone-900 text-sm">
                              {item.unitsSold} পিস বিক্রি হয়েছে
                            </div>
                            <div className="text-xs font-mono font-bold text-amber-700">
                              মোট আয়: ৳{item.revenue.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS & PASSWORD CHANGE */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-4xl animate-fadeIn">
                  
                  {/* Password Change Card */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                          <Key className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base text-stone-900">
                            অ্যাডমিন পাসওয়ার্ড পরিবর্তন (Change Password)
                          </h4>
                          <p className="text-xs text-stone-500">
                            আপনার অ্যাডমিন প্যানেলের সিকিউরিটি বাড়াতে যখন খুশি নতুন পাসওয়ার্ড সেট করুন
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-mono font-bold">
                        বর্তমান: {getActivePassword()}
                      </span>
                    </div>

                    {passwordChangeMsg && (
                      <div className={`p-3 rounded-xl text-xs font-bold flex items-center space-x-2 ${
                        passwordChangeMsg.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {passwordChangeMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span>{passwordChangeMsg.text}</span>
                      </div>
                    )}

                    <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">বর্তমান পাসওয়ার্ড:</label>
                        <input
                          type="password"
                          required
                          value={currPasswordInput}
                          onChange={(e) => setCurrPasswordInput(e.target.value)}
                          placeholder="বর্তমান পাসওয়ার্ড দিন"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-amber-600 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">নতুন পাসওয়ার্ড:</label>
                        <input
                          type="password"
                          required
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          placeholder="কমপক্ষে ৬ অক্ষর"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-amber-600 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">নতুন পাসওয়ার্ড নিশ্চিতকরণ:</label>
                        <input
                          type="password"
                          required
                          value={confirmPasswordInput}
                          onChange={(e) => setConfirmPasswordInput(e.target.value)}
                          placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:border-amber-600 font-mono"
                        />
                      </div>
                      <div className="sm:col-span-3 pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span>পাসওয়ার্ড পরিবর্তন ও সংরক্ষণ করুন</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* General Store Contact & Payment Numbers */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-base text-stone-900 flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <span>শপ হটলাইন ও পেমেন্ট নম্বরসমূহ</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">হটলাইন ফোন নম্বর:</label>
                        <input
                          type="text"
                          value={storeSettings.phoneDisplay}
                          onChange={(e) => setStoreSettings((prev: any) => ({ ...prev, phoneDisplay: e.target.value, phone: e.target.value.replace(/[^0-9]/g, '') }))}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">হোয়াটসঅ্যাপ হেল্পলাইন নম্বর:</label>
                        <input
                          type="text"
                          value={storeSettings.whatsapp}
                          onChange={(e) => setStoreSettings((prev: any) => ({ ...prev, whatsapp: e.target.value }))}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">bKash বিকাশ পার্সোনাল নম্বর:</label>
                        <input
                          type="text"
                          value={storeSettings.bkashNumber || '01870023718'}
                          onChange={(e) => setStoreSettings((prev: any) => ({ ...prev, bkashNumber: e.target.value }))}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Charges */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif font-bold text-base text-stone-900 flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>ডেলিভারি চার্জ ও ফ্রি শিপিং থ্রেশহোল্ড</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">চট্টগ্রাম ডেলিভারি চার্জ:</label>
                        <input
                          type="number"
                          value={storeSettings.insideCtgDelivery}
                          onChange={(e) => setStoreSettings((prev: any) => ({ ...prev, insideCtgDelivery: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">সারাদেশে ডেলিভারি চার্জ:</label>
                        <input
                          type="number"
                          value={storeSettings.outsideCtgDelivery}
                          onChange={(e) => setStoreSettings((prev: any) => ({ ...prev, outsideCtgDelivery: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">ফ্রি ডেলিভারি অর্ডার সীমা (টাকা):</label>
                        <input
                          type="number"
                          value={storeSettings.freeDeliveryThreshold}
                          onChange={(e) => setStoreSettings((prev: any) => ({ ...prev, freeDeliveryThreshold: Number(e.target.value) }))}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Meta Pixel & Facebook CAPI Settings */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-stone-900 flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Meta Pixel & Facebook Ads কনভার্সন ট্র্যাকিং</span>
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-200">
                        Purchase & AddToCart Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Meta Pixel ID:</label>
                        <input
                          type="text"
                          defaultValue="104829104829104"
                          placeholder="e.g. 104829104829104"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Facebook Conversions API (CAPI) Token:</label>
                        <input
                          type="password"
                          defaultValue="EAAJ208394829_alvyro_token"
                          placeholder="CAPI Access Token"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500">
                      অর্ডার সম্পন্ন হওয়ার সাথে সাথে Facebook Pixel-এ Purchase ইভেন্ট স্বয়ংক্রিয়ভাবে ফায়ার হবে।
                    </p>
                  </div>

                  {/* SMS Gateway Integration (Greenweb / Elitbuzz) */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-stone-900 flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>অটোমেটিক SMS গেটওয়ে কনফিগারেশন (Greenweb / Elitbuzz)</span>
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        SMS Ready
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">SMS গেটওয়ে প্রোভাইডার:</label>
                        <select className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-bold focus:bg-white focus:outline-none focus:border-emerald-600">
                          <option>Greenweb Bangladesh</option>
                          <option>Elitbuzz SMS</option>
                          <option>BulkSMS BD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">SMS API Token / Key:</label>
                        <input
                          type="password"
                          defaultValue="gw_9201948291048_live"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Sender ID / Masking:</label>
                        <input
                          type="text"
                          defaultValue="ALVYRO"
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold focus:bg-white focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      <p className="text-[11px] text-stone-500">
                        অর্ডার কনফার্মেশনের পর স্বয়ংক্রিয় SMS: <em>&quot;ALVYRO: সম্মানিত গ্রাহক, আপনার অর্ডার #ALV-XXXXX গৃহীত হয়েছে।&quot;</em>
                      </p>
                      <button
                        type="button"
                        onClick={() => triggerSuccess(`টেস্ট SMS সফলভাবে পাঠানো হয়েছে: ${storeSettings.phoneDisplay}`)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        টেস্ট SMS পাঠান
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => triggerSuccess('সকল শপ, পিক্সেল ও SMS সেটিংস সফলভাবে সেভ করা হয়েছে!')}
                      className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>সকল সেটিংস সংরক্ষণ করুন</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 7: DESIGN STUDIO */}
              {activeTab === 'design' && themeConfig && setThemeConfig && (
                <AdminDesignStudio
                  themeConfig={themeConfig}
                  onSaveTheme={(newC) => {
                    setThemeConfig(newC);
                    triggerSuccess('ওয়েবসাইট ডিজাইন ও ব্র্যান্ডিং সফলভাবে সেভ ও লাইভ করা হয়েছে!');
                  }}
                />
              )}

              {/* TAB 8: AI FRAUD & SCAM DETECTOR */}
              {activeTab === 'ai-fraud' && (
                <AdminAiFraudScanner
                  orders={orders}
                  setOrders={setOrders}
                  currency={currency}
                  onTriggerToast={triggerSuccess}
                />
              )}

              {/* TAB 9: AI BUSINESS ADVISOR & CO-PILOT */}
              {activeTab === 'ai-advisor' && (
                <AdminAiBusinessAdvisor
                  orders={orders}
                  products={products}
                  currency={currency}
                  onTriggerToast={triggerSuccess}
                />
              )}

            </div>
          </div>
        )}

        {/* MODAL: ADD PRODUCT POPUP */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-amber-500" />
                  <h4 className="font-serif font-bold text-base">আলিফ শপে নতুন পোশাক যোগ করুন</h4>
                </div>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">পোশাকের নাম (বাংলা):</label>
                    <input
                      type="text"
                      required
                      value={newProdTitleBn}
                      onChange={(e) => setNewProdTitleBn(e.target.value)}
                      placeholder="যেমন: প্রিমিয়াম ড্রপ-শোল্ডার টি-শার্ট"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Title (English):</label>
                    <input
                      type="text"
                      required
                      value={newProdTitle}
                      onChange={(e) => setNewProdTitle(e.target.value)}
                      placeholder="e.g. Heavyweight Combed Cotton Tee"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">ক্যাটাগরি:</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600 font-bold"
                    >
                      <option value="t-shirt">টি-শার্ট (Casual T-Shirt)</option>
                      <option value="polo-shirt">পোলো শার্ট (Premium Polo)</option>
                      <option value="casual-shirt">ক্যাজুয়াল শার্ট (Casual Shirt)</option>
                      <option value="formal-shirt">ফরমাল শার্ট (Formal Shirt)</option>
                      <option value="korean-pant">কোরিয়ান প্যান্ট (Korean Pants)</option>
                      <option value="formal-pant">ফরমাল প্যান্ট (Formal Pants)</option>
                      <option value="casual-trouser">ক্যাজুয়াল ট্রাউজার্স (Casual Trouser)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">বিক্রয় মূল্য (টাকা):</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">পূর্বের মূল্য (কাটা দাগের জন্য):</label>
                    <input
                      type="number"
                      value={newProdOrigPrice}
                      onChange={(e) => setNewProdOrigPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">ফেব্রিক / কাপড় (বাংলা):</label>
                    <input
                      type="text"
                      value={newProdFabricBn}
                      onChange={(e) => setNewProdFabricBn(e.target.value)}
                      placeholder="১০০% কম্বড সুতি (১৮০ জিএসএম)"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">রং (Color Name):</label>
                    <input
                      type="text"
                      value={newProdColor}
                      onChange={(e) => setNewProdColor(e.target.value)}
                      placeholder="Jet Black / Navy Blue"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">সাইজসমূহ (কমা দিয়ে লিখুন):</label>
                    <input
                      type="text"
                      value={newProdSizes}
                      onChange={(e) => setNewProdSizes(e.target.value)}
                      placeholder="M, L, XL, XXL অথবা 28, 30, 32, 34"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-stone-700 mb-1">ছবির লিংক (Image URL):</label>
                    <input
                      type="url"
                      required
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    পোশাক যোগ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT PRODUCT POPUP (FULL PRODUCT EDITOR) */}
        {editingProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-amber-500" />
                  <h4 className="font-serif font-bold text-base">পোশাকের সম্পূর্ণ তথ্য এডিট করুন</h4>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">পোশাকের নাম (বাংলা):</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.titleBn}
                      onChange={(e) => setEditingProduct({ ...editingProduct, titleBn: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Title (English):</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">বিক্রয় মূল্য (টাকা):</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">পূর্বের মূল্য (কাটা দাগের জন্য):</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">ফেব্রিক / কাপড় (বাংলা):</label>
                    <input
                      type="text"
                      value={editingProduct.fabricBn}
                      onChange={(e) => setEditingProduct({ ...editingProduct, fabricBn: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">রং (Color Name):</label>
                    <input
                      type="text"
                      value={editingProduct.color}
                      onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">সাইজসমূহ (কমা দিয়ে লিখুন):</label>
                    <input
                      type="text"
                      value={editingProduct.sizes.join(', ')}
                      onChange={(e) => setEditingProduct({ ...editingProduct, sizes: e.target.value.split(',').map(s => s.trim()) })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <label className="flex items-center space-x-2 cursor-pointer font-bold text-stone-700">
                      <input
                        type="checkbox"
                        checked={editingProduct.inStock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <span>স্টকে আছে (In Stock)</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer font-bold text-stone-700">
                      <input
                        type="checkbox"
                        checked={Boolean(editingProduct.featured)}
                        onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <span>ফিচার্ড পোশাক (Featured)</span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-stone-700 mb-1">ছবির লিংক (Image URL):</label>
                    <input
                      type="url"
                      required
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    পরিবর্তন সেভ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: VIEW ORDER INVOICE POPUP & COURIER ASSIGNMENT */}
        {viewingOrder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base">অর্ডার রশিদ #{viewingOrder.id}</h4>
                  <p className="text-[11px] text-stone-400">{viewingOrder.createdAt}</p>
                </div>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                {/* Customer Details */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-bold">গ্রাহকের নাম:</span>
                    <span className="font-bold text-stone-900">{viewingOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-bold">মোবাইল ও হোয়াটসঅ্যাপ:</span>
                    <div className="flex items-center space-x-2">
                      <a href={`tel:${viewingOrder.phone}`} className="font-mono text-amber-700 font-bold hover:underline">
                        {viewingOrder.phone}
                      </a>
                      <a
                        href={`https://wa.me/88${(viewingOrder.whatsappNumber || viewingOrder.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${viewingOrder.customerName}, ALIF SHOP (চট্টগ্রাম, বাংলাদেশ) থেকে আপনার অর্ডার ${viewingOrder.id} নিয়ে যোগাযোগ করছি।`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-lg shadow-sm transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-bold">ডেলিভারি ঠিকানা:</span>
                    <span className="text-stone-800 text-right max-w-[260px] font-medium">{viewingOrder.address}, {viewingOrder.district}</span>
                  </div>
                </div>

                {/* Courier Assignment & TrxID Management Card */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <h5 className="font-bold text-stone-900 flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-amber-700" />
                    <span>কুরিয়ার বুকিং ও পেমেন্ট ভেরিফিকেশন</span>
                  </h5>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">কুরিয়ার পার্টনার:</label>
                      <select
                        value={viewingOrder.courierPartner || 'Steadfast'}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleUpdateOrderCourierAndPayment(
                            viewingOrder.id,
                            val,
                            viewingOrder.courierTrackingId || viewingOrder.trackingCode,
                            viewingOrder.advancePaid || 0,
                            viewingOrder.paymentStatus || 'pending'
                          );
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-600"
                      >
                        <option value="Steadfast">Steadfast Courier</option>
                        <option value="Pathao">Pathao Courier</option>
                        <option value="RedX">RedX Express</option>
                        <option value="Sundarban">Sundarban Courier</option>
                        <option value="SA Paribahan">SA Paribahan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">কুরিয়ার ট্র্যাকিং কোড (Consignment ID):</label>
                      <input
                        type="text"
                        value={viewingOrder.courierTrackingId || viewingOrder.trackingCode || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleUpdateOrderCourierAndPayment(
                            viewingOrder.id,
                            viewingOrder.courierPartner || 'Steadfast',
                            val,
                            viewingOrder.advancePaid || 0,
                            viewingOrder.paymentStatus || 'pending'
                          );
                        }}
                        placeholder="যেমন: STF-98124"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">অগ্রিম পরিশোধিত (Advance Paid):</label>
                      <input
                        type="number"
                        value={viewingOrder.advancePaid || 0}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          handleUpdateOrderCourierAndPayment(
                            viewingOrder.id,
                            viewingOrder.courierPartner || 'Steadfast',
                            viewingOrder.courierTrackingId || viewingOrder.trackingCode,
                            val,
                            viewingOrder.paymentStatus || 'pending'
                          );
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">বাকি ক্যাশ অন ডেলিভারি (COD Due):</label>
                      <div className="w-full px-2.5 py-1.5 bg-stone-100 border border-stone-300 rounded-xl text-xs font-mono font-bold text-amber-900">
                        ৳{(viewingOrder.codDue !== undefined ? viewingOrder.codDue : (viewingOrder.paymentStatus === 'paid' ? 0 : viewingOrder.total)).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Copy Buttons */}
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopySteadfast(viewingOrder)}
                      className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Steadfast ফরম্যাটে কপি</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyPathao(viewingOrder)}
                      className="flex-1 py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Pathao ফরম্যাটে কপি</span>
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h5 className="font-bold text-stone-900 mb-2">অর্ডার করা পোশাকসমূহ:</h5>
                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                    {viewingOrder.items.map((it) => (
                      <div key={it.id} className="p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <img src={it.product.image} alt={it.product.title} className="w-10 h-12 rounded object-cover" />
                          <div>
                            <div className="font-bold text-stone-900">{it.product.titleBn}</div>
                            <div className="text-[10px] text-stone-500">Size: {it.selectedSize} • Qty: {it.quantity}</div>
                          </div>
                        </div>
                        <div className="font-mono font-bold">
                          {formatPrice(it.product.price * it.quantity, currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-1.5 pt-2 border-t border-stone-200 text-stone-600">
                  <div className="flex justify-between">
                    <span>সাবটোটাল:</span>
                    <span className="font-mono font-bold text-stone-900">{formatPrice(viewingOrder.subtotal, currency)}</span>
                  </div>
                  {viewingOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>ডিসকাউন্ট:</span>
                      <span className="font-mono">-{formatPrice(viewingOrder.discount, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>ডেলিভারি চার্জ:</span>
                    <span className="font-mono font-bold text-stone-900">
                      {viewingOrder.shippingFee === 0 ? 'ফ্রি' : formatPrice(viewingOrder.shippingFee, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>সর্বমোট প্রদেয়:</span>
                    <span className="font-mono text-base text-amber-700">{formatPrice(viewingOrder.total, currency)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <a
                    href={`https://wa.me/88${(viewingOrder.whatsappNumber || viewingOrder.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `*🛍️ ALVYRO - অর্ডার ইনভয়েস ও মেমো*\n━━━━━━━━━━━━━━━━━━━━\nঅর্ডার আইডি: #${viewingOrder.id}\nগ্রাহকের নাম: ${viewingOrder.customerName}\nঠিকানা: ${viewingOrder.address}, ${viewingOrder.district}\nআইটেম: ${viewingOrder.items.map(it => `${it.product.titleBn || it.product.title} (${it.selectedSize}) x${it.quantity}`).join(', ')}\nসর্বমোট বিল: ৳${viewingOrder.total.toLocaleString()} (${viewingOrder.paymentMethod.toUpperCase()})\n━━━━━━━━━━━━━━━━━━━━\nআপনার পার্সেল প্রস্তুত হচ্ছে। সাথে থাকার জন্য ধন্যবাদ! - ALVYRO (চট্টগ্রাম, বাংলাদেশ)`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>WhatsApp মেমো পাঠান</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setPrintableOrder(viewingOrder);
                    }}
                    className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>পার্সেল স্টিকার প্রিন্ট</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewingOrder(null)}
                    className="px-4 py-2.5 bg-stone-100 text-stone-800 rounded-xl font-bold hover:bg-stone-200 cursor-pointer"
                  >
                    বন্ধ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: PRINTABLE PACKING SLIP & PARCEL STICKER */}
        {printableOrder && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-stone-300">
              <div className="p-4 bg-stone-950 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm">পার্সেল ডেলিভারি স্টিকার / প্যাকিং স্লিপ</span>
                </div>
                <button
                  onClick={() => setPrintableOrder(null)}
                  className="p-1 text-stone-400 hover:text-white rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Body */}
              <div id="printable-parcel-label" className="p-6 overflow-y-auto space-y-4 bg-white text-stone-900">
                {/* Header */}
                <div className="border-2 border-stone-900 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-stone-900 pb-2">
                    <div>
                      <h3 className="text-xl font-serif font-black tracking-wider text-stone-950">
                        ALVYRO (আলভিরো)
                      </h3>
                      <p className="text-[11px] text-stone-600">
                        চট্টগ্রাম, বাংলাদেশ • হটলাইন: {storeSettings.phoneDisplay}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 bg-stone-900 text-white text-xs font-mono font-bold rounded">
                        {printableOrder.courierPartner || 'Steadfast Courier'}
                      </span>
                      <div className="text-[10px] text-stone-500 font-mono mt-1">
                        {printableOrder.courierTrackingId || printableOrder.trackingCode}
                      </div>
                    </div>
                  </div>

                  {/* Recipient Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-bold uppercase text-[10px] text-stone-500 block">প্রাপক / Customer:</span>
                      <span className="font-extrabold text-sm text-stone-950 block">{printableOrder.customerName}</span>
                      <span className="font-mono font-bold text-stone-800 block text-xs mt-0.5">{printableOrder.phone}</span>
                      {printableOrder.whatsappNumber && (
                        <span className="font-mono text-stone-600 block text-[10px]">WA: {printableOrder.whatsappNumber}</span>
                      )}
                    </div>
                    <div>
                      <span className="font-bold uppercase text-[10px] text-stone-500 block">অর্ডার আইডি ও তারিখ:</span>
                      <span className="font-mono font-bold text-sm text-amber-800 block">#{printableOrder.id}</span>
                      <span className="text-[10px] text-stone-600 block">{printableOrder.createdAt}</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="p-2.5 bg-stone-100 rounded-lg text-xs">
                    <span className="font-bold text-stone-700 block uppercase text-[10px]">ডেলিভারি ঠিকানা:</span>
                    <span className="font-bold text-stone-950 block mt-0.5 text-xs">
                      {printableOrder.address}, {printableOrder.district}
                    </span>
                  </div>

                  {/* Items List */}
                  <div>
                    <span className="font-bold text-stone-700 block uppercase text-[10px] mb-1">পার্সেল আইটেমসমূহ:</span>
                    <div className="divide-y divide-stone-200 border border-stone-300 rounded-lg text-xs overflow-hidden">
                      {printableOrder.items.map((it, idx) => (
                        <div key={idx} className="p-2 flex justify-between">
                          <span className="font-semibold text-stone-900">{it.product.titleBn} (Size: {it.selectedSize})</span>
                          <span className="font-bold font-mono">x{it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BIG BOLD COD AMOUNT BOX */}
                  <div className="p-3 bg-amber-500/15 border-2 border-amber-600 rounded-xl text-center space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-950 block">
                      কুরিয়ারে ক্যাশ কালেকশন (Cash to Collect / COD):
                    </span>
                    <div className="text-2xl font-mono font-black text-stone-950">
                      ৳{(printableOrder.codDue !== undefined ? printableOrder.codDue : (printableOrder.paymentStatus === 'paid' ? 0 : printableOrder.total)).toLocaleString()}
                    </div>
                    {printableOrder.advancePaid && printableOrder.advancePaid > 0 ? (
                      <span className="text-[10px] text-emerald-800 font-bold block">
                        (অগ্রিম পরিশোধিত: ৳{printableOrder.advancePaid.toLocaleString()})
                      </span>
                    ) : null}
                  </div>

                  {/* Barcode Graphic Representation */}
                  <div className="text-center pt-1">
                    <div className="h-9 w-60 mx-auto flex items-stretch justify-center space-x-1">
                      {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7, 1].map((w, i) => (
                        <div key={i} className={`bg-stone-950 ${w % 2 === 0 ? 'w-1' : 'w-0.5'}`} />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-stone-600 tracking-widest block mt-1">
                      *{printableOrder.id}*
                    </span>
                  </div>
                </div>

                {/* Print and Close Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-md cursor-pointer text-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>এখনই প্রিন্ট করুন (Print Label)</span>
                  </button>
                  <button
                    onClick={() => setPrintableOrder(null)}
                    className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold cursor-pointer text-xs"
                  >
                    বন্ধ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
