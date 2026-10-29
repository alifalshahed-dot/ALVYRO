import React from 'react';

interface RunningMarqueeProps {
  language: 'bn' | 'en';
}

export const RunningMarquee: React.FC<RunningMarqueeProps> = ({ language }) => {
  const isBn = language === 'bn';

  const items = isBn
    ? [
        '১০০% প্রিমিয়াম কম্বড সুতি',
        'চট্টগ্রাম, বাংলাদেশ',
        'সারা দেশে ক্যাশ অন ডেলিভারি',
        '৭ দিনে সহজ এক্সচেঞ্জ পলিসি',
        '২,০০০ টাকার অর্ডারে ফ্রি ডেলিভারি',
        'চট্টগ্রামে ২৪-৪৮ ঘণ্টায় ফাস্ট ডেলিভারি',
        'আলভিরো এক্সক্লুসিভ ফ্যাশন',
        'বিকাশে সহজ পেমেন্ট সুবিধা'
      ]
    : [
        '100% COMBED COTTON',
        'CHITTAGONG, BANGLADESH',
        'CASH ON DELIVERY NATIONWIDE',
        '7-DAY EASY EXCHANGE',
        'FREE DELIVERY ON ৳2000+',
        '24-48 HR CHITTAGONG DISPATCH',
        'ALVYRO SIGNATURE MENSWEAR',
        'PREMIUM TAILORED FITS'
      ];

  // Repeat items for seamless continuous ticker
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full bg-stone-900 border-y border-stone-800 overflow-hidden py-2.5 sm:py-3 select-none">
      <div className="flex w-max animate-marquee space-x-6 sm:space-x-8 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-stone-300">
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-6 sm:space-x-8">
            <span className="hover:text-amber-400 transition-colors cursor-default whitespace-nowrap">
              {item}
            </span>
            <span className="text-amber-500 font-bold opacity-80" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
