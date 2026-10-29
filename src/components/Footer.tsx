import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  CheckCircle2,
  PhoneCall,
  MessageCircle
} from 'lucide-react';
import { Language, ProductCategory, ThemeConfig } from '../types';
import { STORE_INFO } from '../data/storeInfo';

interface FooterProps {
  language: Language;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenReturnPolicy: () => void;
  onOpenDeliveryPolicy: () => void;
  onOpenOrderTracking: () => void;
  onOpenSizeChart: () => void;
  onOpenAdmin: () => void;
  onNavigateCategory: (category: ProductCategory) => void;
  themeConfig?: ThemeConfig;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenAbout,
  onOpenContact,
  onOpenReturnPolicy,
  onOpenDeliveryPolicy,
  onOpenOrderTracking,
  onOpenSizeChart,
  onOpenAdmin,
  onNavigateCategory,
  themeConfig
}) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const isBn = language === 'bn';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubSuccess(true);
      setTimeout(() => {
        setEmailSub('');
        setSubSuccess(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 text-xs border-t border-stone-800">
      
      {/* Top Privilege / Hotline strip */}
      <div className="border-b border-stone-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-[11px] flex items-center justify-center lg:justify-start space-x-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ALVYRO PRIVILEGE</span>
            </span>
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Get 10% Off On Your First Order With Code: ALVYRO10
            </h3>
            <p className="text-stone-400 mt-1 text-xs">
              BANGLADESH • Doorstep Cash on Delivery Nationwide
            </p>
          </div>

          <div className="w-full max-w-md">
            {subSuccess ? (
              <div className="p-3.5 rounded-xl bg-emerald-900/60 border border-emerald-500 text-emerald-200 flex items-center space-x-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! Voucher code ALVYRO10 is now activated.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-600 text-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={themeConfig?.logoUrl || '/assets/aistudio/IMG_3038_704859ab.jpeg'}
                alt={themeConfig?.brandName || 'ALVYRO'}
                className="w-12 h-12 rounded-xl object-cover border border-[#d4af37]/40 shadow-md bg-[#06251b]"
              />
              <div>
                <span className="font-serif tracking-[0.16em] text-2xl font-extrabold text-white block">
                  {themeConfig?.brandName || 'ALVYRO'}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-bold block mt-0.5">
                  {themeConfig?.brandLocation || 'BANGLADESH'}
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed font-light">
              A modern luxury menswear atelier in BANGLADESH offering 180–220 GSM bio-washed tees, structured polos, tailored shirting, and trending Korean pleated trousers.
            </p>

            <div className="space-y-1.5 text-stone-300 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{themeConfig?.brandLocation || 'BANGLADESH'}</span>
              </div>
              <div className="flex items-center space-x-2 font-mono">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-[#d4af37] font-bold">
                  {STORE_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-stone-400">
                <Clock className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Order Anytime • 24/7 Online Available</span>
              </div>
            </div>
          </div>

          {/* Information & Policies */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-4">
              Information & Policies
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us & Hotline
                </button>
              </li>
              <li>
                <button onClick={onOpenReturnPolicy} className="hover:text-white transition-colors cursor-pointer">
                  Return & Exchange Policy (7 Days)
                </button>
              </li>
              <li>
                <button onClick={onOpenDeliveryPolicy} className="hover:text-white transition-colors cursor-pointer">
                  Delivery Policy (Cash on Delivery)
                </button>
              </li>
              <li>
                <button onClick={onOpenOrderTracking} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={onOpenSizeChart} className="hover:text-white transition-colors cursor-pointer">
                  Size & Measurement Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAdmin} 
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>🔐</span>
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Help & Location Box (Selected Element Target) */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm uppercase tracking-wider">
              Customer Assistance
            </h4>
            
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2 text-stone-300">
              <span className="text-amber-500 font-bold block text-xs">📞 Phone Order & Direct Helpline:</span>
              <a href={`tel:${STORE_INFO.phone}`} className="text-base font-mono font-bold text-white block hover:text-amber-400 transition-colors">
                {STORE_INFO.phoneDisplay}
              </a>
              <p className="text-[11px] text-stone-400">
                Call directly for sizing assistance or instant phone orders.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-2">
              <span className="text-emerald-400 font-bold block text-xs">💬 WhatsApp Concierge Hotline:</span>
              <a 
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20ALVYRO,%20I%20have%20an%20inquiry.`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div className="flex items-center space-x-2 flex-wrap text-[11px]">
            <span className="text-stone-400">Accepted Payment Methods:</span>
            <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-200 font-bold border border-stone-800">Cash on Delivery (COD)</span>
            <span className="px-2.5 py-1 rounded-lg bg-pink-950/60 text-pink-300 font-bold border border-pink-700/60">bKash: 01870023718</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-amber-400 transition-colors flex items-center space-x-1 underline decoration-stone-600 underline-offset-4 cursor-pointer"
            >
              <span>🔒 Admin Access</span>
            </button>
            <p className="text-stone-500">
              © 2026 ALVYRO, BANGLADESH. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};
