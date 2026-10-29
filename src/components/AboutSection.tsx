import React from 'react';
import { Sparkles, MapPin, Truck, RotateCcw, ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
  onOpenContact: () => void;
  onOpenReturnPolicy: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  language,
  onOpenContact,
  onOpenReturnPolicy
}) => {
  const isBn = language === 'bn';

  return (
    <section id="about-section" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-800/30 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-600/20 px-3.5 py-1.5 rounded-full border border-amber-500/30 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'আলভিরোর পরিচিতি ও অঙ্গীকার' : 'ABOUT ALVYRO'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight">
              {isBn 
                ? 'বাংলাদেশে আধুনিক ও মানসম্মত পুরুষদের পোশাকের নির্ভরযোগ্য প্রতিষ্ঠান' 
                : 'Premier Contemporary Menswear & Tailored Streetwear • BANGLADESH'}
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              {isBn ? (
                <>
                  <strong>বাংলাদেশ</strong>-এ অবস্থিত <strong>ALVYRO (আলভিরো)</strong>। আমরা পুরুষদের প্রতিটি প্রয়োজনকে প্রাধান্য দিয়ে প্রিমিয়াম কম্বড টি-শার্ট, এক্সিকিউটিভ পোলো, ক্যাজুয়াল ও ফরমাল শার্ট এবং ট্রেন্ডি কোরিয়ান প্যান্ট সংগ্রহে রেখেছি।
                </>
              ) : (
                <>
                  Crafted and headquartered in <strong>BANGLADESH</strong>, <strong>ALVYRO</strong> delivers handpicked, heavyweight 180–220 GSM bio-washed combed cotton t-shirts, executive polo shirts, formal office attire, and viral Korean pleated trousers nationwide.
                </>
              )}
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-stone-200">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>{isBn ? 'টি-শার্ট ও পোলো:' : 'Heavyweight Knitwear:'}</strong>{' '}
                  {isBn ? 'খাঁটি ১৮০-২২০ জিএসএম কটন, কালারফেড প্রতিরোধী কাপড়।' : '180–220 GSM bio-washed combed cotton & mercerized pique.'}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>{isBn ? 'শার্ট কালেকশন:' : 'Tailored Shirting:'}</strong>{' '}
                  {isBn ? 'লিনেন ক্যাজুয়াল ও কর্পোরেট রিঙ্কেল-ফ্রি অক্সফোর্ড ফরমাল শার্ট।' : 'Pure Irish-weave linens and crease-resistant Oxford cottons.'}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>{isBn ? 'প্যান্ট কালেকশন:' : 'Tailored Trousers:'}</strong>{' '}
                  {isBn ? 'সোশ্যাল মিডিয়া ট্রেন্ডিং কোরিয়ান প্লিটেড ব্যাগি প্যান্ট ও গ্যাবার্ডিন ট্রাউজার্স।' : 'Viral double-pleated Korean drape pants and 4-way stretch gabardines.'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{isBn ? 'শোরুম লোকেশন (চট্টগ্রাম, বাংলাদেশ)' : 'Visit Atelier (Chittagong)'}</span>
              </button>

              <button
                onClick={onOpenReturnPolicy}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all border border-white/20 cursor-pointer"
              >
                <span>{isBn ? 'রিটার্ন পলিসি দেখুন' : 'Return & Exchange Policy'}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-800 shadow-xl border border-white/10">
                <img
                  src="/src/assets/images/alvyro_lookbook_atelier_1792922471816.jpg"
                  alt="ALVYRO Atelier Showroom"
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300">
                <span className="text-amber-400 font-bold block mb-1">
                  {isBn ? '📍 আউটলেট লোকেশন' : '📍 Atelier Showroom'}
                </span>
                {isBn ? STORE_INFO.landmarkBn : 'Chattogram Atelier & Showroom, Bangladesh'}
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300">
                <span className="text-emerald-400 font-bold block mb-1">
                  {isBn ? '🚚 সারা দেশে ডেলিভারি' : '🚚 Nationwide Shipping'}
                </span>
                {isBn ? 'ক্যাশ অন ডেলিভারি ও ২,০০০ টাকায় ফ্রি শিপিং।' : 'Doorstep Cash on Delivery & Free shipping over ৳2,000.'}
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-800 shadow-xl border border-white/10">
                <img
                  src="/src/assets/images/alvyro_korean_pants_model_1792922473145.jpg"
                  alt="Korean Pleated Trousers"
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature Badges */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">{isBn ? 'সারা দেশে ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">{isBn ? 'পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা।' : 'Pay cash at your doorstep.'}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">{isBn ? '৭ দিনে সহজ এক্সচেঞ্জ' : '7-Day Easy Exchange'}</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">{isBn ? 'সাইজ পরিবর্তন করতে কোনো ঝামেলা নেই।' : 'Hassle-free size exchange.'}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">{isBn ? '১০০% সেরা কোয়ালিটি' : 'Top Quality Fabric'}</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">{isBn ? 'প্রিমিয়াম সুতি ও আরামদায়ক ফিটিং।' : 'Combed cotton & durable weaves.'}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">{isBn ? 'সরাসরি শপ হটলাইন' : 'Dedicated Hotline'}</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">{STORE_INFO.phoneDisplay} (সকাল ৯টা-রাত ১০টা)</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
