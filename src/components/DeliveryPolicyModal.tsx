import React from 'react';
import { X, Truck, CheckCircle, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';
import { Language } from '../types';

interface DeliveryPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DeliveryPolicyModal: React.FC<DeliveryPolicyModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const isBn = language === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-wide">
                {isBn ? 'ডেলিভারি পলিসি ও চার্জ' : 'Delivery Policy & Shipping'}
              </h3>
              <p className="text-xs text-stone-300">
                {isBn ? 'সারা দেশে বিশ্বস্ত ক্যাশ অন ডেলিভারি • আলভিরো' : 'Cash on Delivery Across Bangladesh • ALVYRO'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-stone-700 leading-relaxed">
          {/* Policy Banner */}
          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-pink-950 flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-[#e2136e] shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-[#e2136e]">
                Flat Rate Delivery ৳160 Across BANGLADESH
              </h4>
              <p className="text-[11px] text-pink-800 mt-0.5">
                Delivery charge of ৳160 is required in advance via bKash to confirm orders and protect against fake bookings.
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          <div>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-3">
              Delivery Rates & Coverage:
            </h4>
            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs">All 64 Districts (Nationwide)</span>
                <span className="font-mono font-bold text-[#e2136e] text-base">৳160 (Flat Fee)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-stone-600">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>24 to 48 Hours Express Doorstep Delivery</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Covering Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, Mymensingh, and all sub-districts across Bangladesh.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-stone-900 text-xs">
              Payment & Dispatch Terms:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px]">
              <li><strong>Advance Delivery Fee:</strong> Customers must pay ৳160 via bKash to confirm the order.</li>
              <li><strong>Balance On Delivery:</strong> The remaining product cost is paid directly to the delivery courier upon doorstep handover.</li>
              <li><strong>Couriers:</strong> Shipped via Steadfast Courier, Pathao, and RedX with live SMS and tracking code.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
