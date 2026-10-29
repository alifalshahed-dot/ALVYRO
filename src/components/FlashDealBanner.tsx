import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../types';

interface FlashDealBannerProps {
  language: Language;
  onExploreDeals: () => void;
  onOpenPromo: () => void;
}

export const FlashDealBanner: React.FC<FlashDealBannerProps> = ({
  language,
  onExploreDeals,
  onOpenPromo
}) => {
  const isBn = language === 'bn';

  // Countdown timer initialized to 11 hours 45 mins from now
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 11,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-[#141210] text-stone-200 border-b border-[#2A241F] relative overflow-hidden py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs tracking-wide">
        
        {/* Left: Privilege Notice */}
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
            {isBn ? 'আলভিরো অফার' : 'ATELIER PRIVILEGE'}
          </span>
          <div className="text-stone-300">
            <span className="font-medium text-white">
              {isBn ? 'সকল অর্ডারে ১০% বিশেষ ছাড়' : 'Enjoy 10% Complimentary Savings Across All Collections'}
            </span>
            <span className="text-stone-400 ml-2">
              · {isBn ? 'কোড:' : 'Code:'} <strong className="text-amber-300 font-mono tracking-wider">ALVYRO10</strong>
            </span>
          </div>
        </div>

        {/* Center: Subtle Countdown */}
        <div className="flex items-center space-x-2 text-[11px] text-stone-400">
          <Clock className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
          <span className="tracking-wider uppercase text-[10px]">
            {isBn ? 'বাকি সময়:' : 'PRIVILEGE WINDOW:'}
          </span>
          <div className="flex items-center space-x-1 font-mono font-medium text-amber-200">
            <span>{formatNumber(timeLeft.hours)}h</span>
            <span className="text-stone-600">:</span>
            <span>{formatNumber(timeLeft.minutes)}m</span>
            <span className="text-stone-600">:</span>
            <span className="w-6 text-center">{formatNumber(timeLeft.seconds)}s</span>
          </div>
        </div>

        {/* Right: Action */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onExploreDeals}
            className="px-3.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-[11px] font-semibold tracking-wider uppercase rounded transition-colors flex items-center space-x-1.5 cursor-pointer border border-stone-700"
          >
            <span>{isBn ? 'কালেকশন দেখুন' : 'Explore Edit'}</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>
          <span className="text-[11px] text-stone-400 hidden xl:inline">
            {isBn ? 'সারা দেশে ক্যাশ অন ডেলিভারি' : 'Cash On Delivery Nationwide'}
          </span>
        </div>

      </div>
    </div>
  );
};
