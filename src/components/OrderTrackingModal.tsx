import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Language, Order } from '../types';
import { STORE_INFO } from '../data/storeInfo';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  presetOrderId?: string;
  orders?: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  language,
  presetOrderId,
  orders: propOrders
}) => {
  const [query, setQuery] = useState(presetOrderId || '');
  const [trackingData, setTrackingData] = useState<{
    orderId: string;
    customerName: string;
    phone: string;
    courier: string;
    trackingCode: string;
    status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    estimatedDelivery: string;
    itemsCount: number;
    amount: string;
    city: string;
    timeline: { title: string; time: string; completed: boolean }[];
  } | null>(() => {
    if (presetOrderId) {
      return {
        orderId: presetOrderId,
        customerName: 'সম্মানিত গ্রাহক',
        phone: '018•••••••18',
        courier: 'Steadfast Courier (Chittagong Hub)',
        trackingCode: 'STF-BD-893120',
        status: 'processing',
        estimatedDelivery: '২৪-৪৮ ঘণ্টার মধ্যে ডেলিভারি',
        itemsCount: 2,
        amount: '৳১,৯৮০',
        city: 'Chittagong, Bangladesh',
        timeline: [
          { title: 'অর্ডার গৃহীত ও কনফার্মড', time: 'আজ, ১০:১৫ AM', completed: true },
          { title: 'চট্টগ্রাম হাব থেকে প্যাকেজিং সম্পন্ন', time: 'আজ, ০১:৩০ PM', completed: true },
          { title: 'কুরিয়ারে হস্তান্তর করা হয়েছে', time: 'প্রক্রিয়াধীন', completed: false },
          { title: 'ডেলিভারি রাইডারের নিকট', time: 'আগামীকাল', completed: false },
          { title: 'ডেলিভারি সম্পন্ন', time: 'অপেক্ষমাণ', completed: false }
        ]
      };
    }
    return null;
  });

  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const isBn = language === 'bn';

  // Get active list of orders from props or localStorage
  const getOrdersList = (): Order[] => {
    if (propOrders && propOrders.length > 0) return propOrders;
    try {
      const saved = localStorage.getItem('alif_shop_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;

    setHasSearched(true);
    const allOrders = getOrdersList();
    const matched = allOrders.find(
      (o) => o.id.toUpperCase() === cleanQuery || o.phone.replace(/[^0-9]/g, '') === cleanQuery.replace(/[^0-9]/g, '')
    );

    if (matched) {
      const isConfirmed = true;
      const isProcessing = ['processing', 'shipped', 'delivered'].includes(matched.status);
      const isShipped = ['shipped', 'delivered'].includes(matched.status);
      const isDelivered = matched.status === 'delivered';

      setTrackingData({
        orderId: matched.id,
        customerName: matched.customerName,
        phone: matched.phone,
        courier: matched.courierPartner || 'Steadfast Courier (Chittagong Express Hub)',
        trackingCode: matched.courierTrackingId || matched.trackingCode || `STF-BD-${Math.floor(100000 + Math.random() * 900000)}`,
        status: matched.status,
        estimatedDelivery: matched.status === 'delivered' ? 'সফলভাবে ডেলিভারি সম্পন্ন' : '২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
        itemsCount: matched.items.reduce((sum, it) => sum + it.quantity, 0),
        amount: `৳${matched.total.toLocaleString()}`,
        city: matched.district,
        timeline: [
          { 
            title: isBn ? 'অর্ডার গৃহীত ও কনফার্মড' : 'Order Placed & Verified', 
            time: matched.createdAt, 
            completed: isConfirmed 
          },
          { 
            title: isBn ? 'চট্টগ্রাম হাব থেকে প্যাকেজিং সম্পন্ন' : 'Packed at Chittagong Hub', 
            time: isProcessing ? 'সম্পন্ন' : 'চলমান', 
            completed: isProcessing 
          },
          { 
            title: isBn ? 'কুরিয়ার সার্ভিসে হস্তান্তর' : 'Handed to Courier Partner', 
            time: isShipped ? (matched.courierTrackingId ? `ট্র্যাকিং: ${matched.courierTrackingId}` : 'কুরিয়ারে চলমান') : 'অপেক্ষমাণ', 
            completed: isShipped 
          },
          { 
            title: isBn ? 'ডেলিভারি রাইডারের নিকট' : 'Out for Delivery', 
            time: isDelivered ? 'ডেলিভারি সম্পন্ন' : isShipped ? 'চলমান' : 'অপেক্ষমাণ', 
            completed: isShipped 
          },
          { 
            title: isBn ? 'কাস্টমারের নিকট হস্তান্তর' : 'Delivered to Customer', 
            time: isDelivered ? 'সফলভাবে সম্পন্ন' : 'অপেক্ষমাণ', 
            completed: isDelivered 
          }
        ]
      });
    } else {
      // Fallback preview
      setTrackingData({
        orderId: cleanQuery.startsWith('ALV-') || cleanQuery.startsWith('ALF-') ? cleanQuery : `ALV-${cleanQuery}`,
        customerName: 'সম্মানিত গ্রাহক',
        phone: '018•••••••18',
        courier: 'Steadfast Courier (Chittagong Hub)',
        trackingCode: `STF-BD-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'shipped',
        estimatedDelivery: '২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
        itemsCount: 2,
        amount: '৳১,৯৮০',
        city: 'Chittagong, Bangladesh',
        timeline: [
          { title: isBn ? 'অর্ডার সফলভাবে কনফার্ম হয়েছে' : 'Order Placed & Verified', time: 'গতকাল, ০৪:৩০ PM', completed: true },
          { title: isBn ? 'চট্টগ্রাম হাব থেকে প্যাকেজিং সম্পন্ন' : 'Packed at Chittagong Hub', time: 'আজ, ১১:২০ AM', completed: true },
          { title: isBn ? 'কুরিয়ার সার্ভিসে হস্তান্তর' : 'Handed to Express Courier', time: 'আজ, ০৩:৪৫ PM', completed: true },
          { title: isBn ? 'রাইডার ডেলিভারির উদ্দেশ্যে বের হয়েছে' : 'Out with Delivery Rider', time: isBn ? 'চলমান' : 'In Transit', completed: false },
          { title: isBn ? 'ডেলিভারি সম্পন্ন' : 'Delivered to Doorstep', time: isBn ? 'অপেক্ষমাণ' : 'Pending', completed: false }
        ]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-wide">
                {isBn ? 'ALVYRO অর্ডার ট্র্যাকিং' : 'Track Your ALVYRO Order'}
              </h3>
              <p className="text-xs text-stone-400">
                {isBn ? 'আপনার অর্ডার নম্বর (যেমন: ALV-84920) বা মোবাইল নম্বর দিন' : 'Enter Order ID (e.g. ALV-84920) or Mobile Number'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 border-b border-stone-100 bg-stone-50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isBn ? 'অর্ডার আইডি দিন (যেমন: ALV-84920)...' : 'Enter Order ID (e.g. ALV-84920)...'}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center space-x-1.5 shrink-0 shadow-sm"
            >
              <span>{isBn ? 'ট্র্যাক করুন' : 'Track'}</span>
            </button>
          </form>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-stone-500">
            <span>দ্রুত চেক করুন:</span>
            <button 
              type="button" 
              onClick={() => { setQuery('ALV-84920'); }} 
              className="underline hover:text-amber-700 font-mono font-bold"
            >
              ALV-84920
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => { setQuery('ALV-84918'); }} 
              className="underline hover:text-amber-700 font-mono font-bold"
            >
              ALV-84918
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {trackingData ? (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap justify-between gap-3 text-sm">
                <div>
                  <div className="text-xs text-stone-500">{isBn ? 'অর্ডার নম্বর' : 'Order ID'}</div>
                  <div className="font-bold text-amber-700 font-mono text-base">{trackingData.orderId}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">{isBn ? 'কুরিয়ার পার্টনার' : 'Courier'}</div>
                  <div className="font-bold text-stone-800">{trackingData.courier}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">{isBn ? 'কুরিয়ার ট্র্যাকিং কোড' : 'Tracking Ref'}</div>
                  <div className="font-mono text-stone-900 text-xs font-bold bg-amber-100/60 px-2 py-0.5 rounded border border-amber-300">
                    {trackingData.trackingCode}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">{isBn ? 'আনুমানিক ডেলিভারি' : 'Estimated Delivery'}</div>
                  <div className="font-bold text-emerald-700">{trackingData.estimatedDelivery}</div>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {isBn ? 'লাইভ ডেলিভারি স্ট্যাটাস' : 'Live Shipment Timeline'}
                </h4>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {trackingData.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start space-x-3 text-sm">
                      <div 
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                      </div>
                      <div>
                        <div className={`font-semibold ${step.completed ? 'text-stone-900' : 'text-stone-400'}`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-stone-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support note */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-stone-700">
                <PackageCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">
                    {isBn ? 'জরুরি ডেলিভারি বা ঠিকানার পরিবর্তন প্রয়োজন?' : 'Need urgent assistance or delivery address change?'}
                  </p>
                  <p className="mt-0.5 text-stone-600">
                    {isBn ? 'আলিফ শপ হটলাইনে কল করুন: ' : 'Call ALIF SHOP Hotline: '}
                    <a href={`tel:${STORE_INFO.phone}`} className="text-amber-700 font-bold underline">{STORE_INFO.phoneDisplay}</a> (সকাল ৯টা - রাত ১০টা)
                  </p>
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-10">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-800">
                {isBn ? 'কোন তথ্য পাওয়া যায়নি।' : 'No tracking record found for this Order ID.'}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                {isBn ? 'অনুগ্রহ করে আপনার অর্ডার কনফার্মেশন হোয়াটসঅ্যাপ মেমো দেখে সঠিক নম্বর দিন।' : 'Please check your order confirmation WhatsApp receipt.'}
              </p>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-400">
              <Truck className="w-12 h-12 mx-auto mb-3 opacity-40 text-stone-600" />
              <p className="text-sm font-medium text-stone-600">
                {isBn ? 'উপরে আপনার অর্ডার নম্বর দিয়ে সার্চ করুন' : 'Enter your Order ID above to check live courier progress'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
