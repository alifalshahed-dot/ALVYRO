import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Copy, 
  ArrowRight,
  Smartphone,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { CartItem, Currency, Language, Order } from '../types';
import { formatPrice } from '../utils/currency';
import { STORE_INFO } from '../data/storeInfo';
import { BkashPaymentModal } from './BkashPaymentModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  language: Language;
  discountAmount: number;
  appliedPromo: string;
  onOrderSuccess: (order: Order) => void;
  onOpenOrderTracking: (orderId: string) => void;
  insideCtgFee?: number;
  outsideCtgFee?: number;
}

const BD_DISTRICTS = [
  'Chattogram (চট্টগ্রাম)',
  'Dhaka (ঢাকা)',
  'Sylhet (সিলেট)',
  'Cox’s Bazar (কক্সবাজার)',
  'Cumilla (কুমিল্লা)',
  'Noakhali (নোয়াখালী)',
  'Feni (ফেনী)',
  'Gazipur (গাজীপুর)',
  'Narayanganj (নারায়ণগঞ্জ)',
  'Rajshahi (রাজশাহী)',
  'Khulna (খুলনা)',
  'Barishal (বরিশাল)',
  'Rangpur (রংপুর)',
  'Mymensingh (ময়মনসিংহ)',
  'Bogura (বগুড়া)'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  language,
  discountAmount,
  appliedPromo,
  onOrderSuccess,
  onOpenOrderTracking,
  insideCtgFee = 160,
  outsideCtgFee = 160
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Chattogram (চট্টগ্রাম)');
  const [address, setAddress] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  
  // bKash Modal State
  const [showBkashModal, setShowBkashModal] = useState(false);

  if (!isOpen) return null;
  const isBn = language === 'bn';

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Delivery charge is flat ৳160 everywhere in Bangladesh (free delivery removed as requested)
  const shippingFee = 160;

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleStartCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (cleanPhone.length < 11) {
      setValidationError('Please enter a valid 11-digit mobile number (e.g. 018XXXXXXXX).');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setValidationError('Please provide full delivery address (House/Road/Area).');
      return;
    }

    // COD is disabled; ৳160 advance delivery fee is strictly required via bKash to confirm order
    setShowBkashModal(true);
  };

  const finalizeOrder = (advanceAmount: number = 0, bkashTrxId?: string) => {
    setIsSubmitting(true);
    setShowBkashModal(false);

    setTimeout(() => {
      const orderId = `ALV-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingCode = `BD-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: orderId,
        customerName: customerName.trim(),
        phone: phone.trim(),
        whatsappNumber: phone.trim(),
        address: address.trim(),
        district,
        items: [...cartItems],
        subtotal,
        shippingFee,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod: advanceAmount > 0 ? 'bkash' : 'cod',
        paymentStatus: advanceAmount > 0 ? 'verified' : 'cod',
        transactionId: bkashTrxId,
        advancePaid: advanceAmount,
        codDue: Math.max(0, grandTotal - advanceAmount),
        courierPartner: 'Steadfast Courier / Pathao',
        courierTrackingId: trackingCode,
        status: 'confirmed',
        createdAt: new Date().toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        trackingCode
      };

      setCompletedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      // NOTE: PER USER REQUEST, DO NOT AUTO-REDIRECT OR AUTO-SEND MESSAGE TO WHATSAPP!
    }, 600);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div 
          className="bg-[#06251b] text-[#f7f4ed] rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#17543f] flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#17543f] bg-[#041d15] flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#093427] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                  {completedOrder ? 'Order Placed • ALVYRO' : 'Simple & Quick Checkout'}
                </h3>
                <p className="text-[11px] text-[#a3b899]">
                  ALVYRO Contemporary Menswear • BANGLADESH
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {completedOrder ? (
              /* CLEAN LUXURY SUCCESS VIEW - NO FORCED WHATSAPP REDIRECT */
              <div className="text-center py-4 space-y-5 animate-scaleIn">
                <div className="w-16 h-16 rounded-full bg-[#093427] border-2 border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37] block mb-1">
                    ORDER CONFIRMED
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Thank You, {completedOrder.customerName}!
                  </h4>
                  <p className="text-xs text-[#a3b899] mt-1 max-w-md mx-auto">
                    Your order is confirmed. Our atelier team in Bangladesh will pack your parcel carefully.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-5 rounded-2xl bg-[#093427] border border-[#17543f] text-left space-y-3.5 text-xs max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-[#17543f]">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#a3b899] block">Order Reference</span>
                      <span className="font-mono text-base font-bold text-white">{completedOrder.id}</span>
                    </div>
                    <button
                      onClick={() => handleCopyId(completedOrder.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#06251b] border border-[#17543f] hover:border-[#d4af37] text-[11px] font-mono text-[#d4af37] flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#a3b899] block text-[11px]">Recipient</span>
                      <strong className="text-white">{completedOrder.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-[#a3b899] block text-[11px]">Phone</span>
                      <strong className="font-mono text-white">{completedOrder.phone}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#a3b899] block text-[11px]">Delivery Destination</span>
                      <strong className="text-white">{completedOrder.address}, {completedOrder.district}</strong>
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="pt-3 border-t border-[#17543f] space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-[#a3b899]">
                      <span>Items Subtotal:</span>
                      <span>৳{completedOrder.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#a3b899]">
                      <span>Delivery Charge:</span>
                      <span>৳{completedOrder.shippingFee}</span>
                    </div>
                    {completedOrder.advancePaid && completedOrder.advancePaid > 0 ? (
                      <div className="flex justify-between text-[#d4af37] font-bold">
                        <span>Advance Delivery Paid (bKash):</span>
                        <span>-৳{completedOrder.advancePaid}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#17543f]">
                      <span>Cash Due on Delivery:</span>
                      <span className="text-[#d4af37]">৳{completedOrder.codDue?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOrderTracking(completedOrder.id);
                    }}
                    className="flex-1 py-3 bg-[#d4af37] hover:bg-[#c29d2b] text-[#06251b] font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Track Order</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="py-3 px-6 bg-[#093427] hover:bg-[#0c3e2f] border border-[#17543f] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              /* CLEAN, EFFORTLESS 1-PAGE CHECKOUT */
              <form onSubmit={handleStartCheckout} className="space-y-5">
                {validationError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Form Inputs */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Customer & Delivery Details</span>
                  </h4>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#a3b899] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-4 py-3 bg-[#093427] border border-[#17543f] rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-[#d4af37] text-sm font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#a3b899] mb-1">
                      Mobile Phone Number *
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-[#a3b899] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        inputMode="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="018XXXXXXXX"
                        className="w-full pl-10 pr-4 py-3 bg-[#093427] border border-[#17543f] rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-[#d4af37] text-sm font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-xs font-bold text-[#a3b899] mb-1">
                      District / City *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-4 py-3 bg-[#093427] border border-[#17543f] rounded-xl text-white focus:outline-none focus:border-[#d4af37] text-sm font-semibold cursor-pointer"
                    >
                      {BD_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist} className="bg-[#06251b] text-white">
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#a3b899] mb-1">
                      Complete Delivery Address (House / Road / Area) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House 14, Road 5, Nasirabad, Chattogram"
                      className="w-full px-4 py-2.5 bg-[#093427] border border-[#17543f] rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-[#d4af37] text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Payment Selection: Advance bKash Delivery Fee (Mandatory) */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                    Payment Mode (Advance Delivery Fee Required)
                  </h4>

                  <div className="w-full p-4 rounded-2xl border-2 border-[#e2136e] bg-pink-950/40 text-white shadow-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#e2136e] bg-[#e2136e] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white flex items-center space-x-2">
                          <span>Advance Delivery Fee: ৳{shippingFee} (bKash)</span>
                          <span className="text-[10px] bg-[#e2136e] text-white px-2 py-0.5 rounded font-bold uppercase">
                            Required
                          </span>
                        </div>
                        <div className="text-xs text-pink-200 mt-1 font-light leading-relaxed">
                          Pay only <strong>৳{shippingFee}</strong> now with bKash OTP to confirm your order. Pay the remaining product price of <strong>৳{Math.max(0, subtotal - discountAmount).toLocaleString()}</strong> upon parcel delivery!
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Anti-Fake Order Policy Notice */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
                    <span className="font-bold">⚠️ Notice:</span>
                    <span>Pure COD is turned off to prevent fake orders. All orders require ৳160 advance delivery fee via bKash.</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-[#093427] border border-[#17543f] space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-[#a3b899]">
                    <span>Items Total ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} pcs):</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#d4af37]">
                      <span>Discount ({appliedPromo}):</span>
                      <span>-৳{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#a3b899]">
                    <span>Nationwide Delivery Fee:</span>
                    <span>৳{shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#17543f]">
                    <span>Total Bill:</span>
                    <span className="text-[#d4af37] text-lg">৳{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#e2136e] hover:bg-[#c20f5e] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Pay ৳{shippingFee} via bKash & Confirm Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] text-[#a3b899] flex items-center justify-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Guaranteed authentic ALVYRO menswear with easy 7-day size exchange.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Interactive bKash Gateway Modal */}
      <BkashPaymentModal
        isOpen={showBkashModal}
        onClose={() => setShowBkashModal(false)}
        deliveryAmount={shippingFee}
        customerPhone={phone}
        onPaymentSuccess={(trxId) => {
          finalizeOrder(shippingFee, trxId);
        }}
      />
    </>
  );
};
