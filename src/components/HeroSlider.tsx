import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, MapPin, Truck, RotateCcw } from 'lucide-react';
import { Language, ProductCategory, ThemeConfig } from '../types';
import { STORE_INFO } from '../data/storeInfo';

interface HeroSliderProps {
  language: Language;
  onExplore: (category?: ProductCategory) => void;
  onOpenContact: () => void;
  themeConfig?: ThemeConfig;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  language,
  onExplore,
  onOpenContact,
  themeConfig
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isBn = language === 'bn';

  const slides = [
    {
      id: 1,
      badge: isBn ? `✦ ${themeConfig?.brandName || 'ALVYRO'} কৌতূহলোদ্দীপক কালেকশন • ২০২৬` : `✦ ${themeConfig?.brandName || 'ALVYRO'} LUXURY CAMPAIGN 2026`,
      tag: isBn ? 'ড্রপ-শোল্ডার টি-শার্ট ও কোরিয়ান ট্রাউজার্স' : 'DROP-SHOULDER TEES & PLEATED TROUSERS',
      headline: isBn 
        ? (themeConfig?.heroHeadline ? themeConfig.heroHeadline : 'আধুনিক আভিজাত্য ও সমসাময়িক পুরুষদের ফ্যাশন')
        : (themeConfig?.heroHeadline ? themeConfig.heroHeadline : 'Modern Luxury & Refined Contemporary Menswear'),
      subline: isBn 
        ? (themeConfig?.heroSubheadline ? themeConfig.heroSubheadline : '১৮০ জিএসএম অরগানিক কম্বড কটন ড্রপ-শোল্ডার টি-শার্ট এবং নিখুঁত ড্র্যাপে নির্মিত কোরিয়ান প্লিটেড ট্রাউজার্স।')
        : (themeConfig?.heroSubheadline ? themeConfig.heroSubheadline : 'Precision tailored heavyweight 180 GSM bio-washed tees and fluid-draped double-pleated trousers.'),
      image: '/src/assets/images/alvyro_hero_banner_1792922471287.jpg',
      primaryBtn: isBn ? 'কালেকশন এক্সপ্লোর করুন' : 'Explore Collection',
      secondaryBtn: isBn ? 'সকল পোশাক' : 'View All Items',
      category: 't-shirt' as ProductCategory
    },
    {
      id: 2,
      badge: isBn ? '✦ ভাইরাল কালেকশন' : '✦ TAILORED DRAPE EDIT',
      headline: isBn 
        ? 'কোরিয়ান প্লিটেড প্যান্ট ও ক্যাজুয়াল ট্রাউজার্স' 
        : 'Korean Double-Pleated Wide-Leg Pants',
      tag: isBn ? 'প্যান্ট ও ট্রাউজার্স কালেকশন' : 'PANTS & TROUSERS COLLECTION',
      subline: isBn 
        ? 'তরুণদের পছন্দের ভাইরাল কোরিয়ান ব্যাগি প্লিটেড প্যান্ট, ড্রস্ট্রিং কার্গো এবং সফট চিনো ট্রাউজার্স।' 
        : 'Fluid draped Korean double-pleated wide pants, comfort stretch chinos, and multi-pocket cargos.',
      image: '/src/assets/images/alvyro_korean_pants_model_1792922473145.jpg',
      primaryBtn: isBn ? 'কোরিয়ান প্যান্ট দেখুন' : 'View Korean Pants',
      secondaryBtn: isBn ? 'ট্রাউজার্স সংগ্রহ' : 'Casual Trousers',
      category: 'korean-pant' as ProductCategory
    },
    {
      id: 3,
      badge: isBn ? '✦ এক্সিকিউটিভ ক্লাসিক' : '✦ EXECUTIVE KNITWEAR',
      headline: isBn 
        ? 'ম্যাটি পিকে পোলো ও লাক্সারি শার্ট কালেকশন' 
        : 'Structured Pique Polos & Linen Shirts',
      tag: isBn ? 'পোলো ও শার্ট কালেকশন' : 'POLOS & LUXURY SHIRTS',
      subline: isBn 
        ? '২২০ জিএসএম ম্যাটি পিকে এক্সিকিউটিভ পোলো এবং ব্রিদেবল লিনেন কটন ক্যাজুয়াল শার্ট।' 
        : 'Tailored 220 GSM heavyweight knit collars, breathable Cuban camp linens, and Oxford cottons.',
      image: '/src/assets/images/alvyro_polo_shirt_model_1792922472661.jpg',
      primaryBtn: isBn ? 'পোলো শার্ট দেখুন' : 'Shop Polos',
      secondaryBtn: isBn ? 'চট্টগ্রাম আউটলেট' : 'Store Location',
      category: 'polo-shirt' as ProductCategory
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden bg-stone-950 text-white">
      {/* Slides Track */}
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 relative min-h-[500px] md:min-h-[620px] flex items-center">
            
            {/* Background Image with dark gradient for readability */}
            <div className="absolute inset-0 z-0">
              <img 
                src={slide.image} 
                alt={slide.headline}
                className="w-full h-full object-cover object-center filter brightness-[0.65]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
            </div>

            {/* Slide Text Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 w-full">
              <div className="max-w-2xl space-y-5">
                
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-amber-600/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30 text-xs font-bold uppercase tracking-widest text-amber-300">
                  <span>{slide.badge}</span>
                </div>

                {/* Subtag */}
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-stone-300">
                  {slide.tag}
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-[1.15]">
                  {slide.headline}
                </h1>

                {/* Subline */}
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light max-w-xl">
                  {slide.subline}
                </p>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => onExplore(slide.category)}
                    className="px-7 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-600/30 flex items-center space-x-2 cursor-pointer"
                  >
                    <span>{slide.primaryBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onExplore('all')}
                    className="px-6 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all border border-white/20 cursor-pointer"
                  >
                    <span>{slide.secondaryBtn}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Highlights Bar: Location, Cash on Delivery, Return Policy */}
      <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-md py-3.5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-200">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{themeConfig?.brandLocation || 'BANGLADESH'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isBn ? 'সারা দেশে ক্যাশ অন ডেলিভারি' : 'Cash on Delivery Nationwide'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isBn ? '৭ দিনে সহজ পণ্য এক্সচেঞ্জ সুবিধা' : 'Complimentary 7-Day Exchange'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isBn ? '২,০০০ টাকার অর্ডারে ফ্রি ডেলিভারি' : 'Free Shipping Over ৳2,000'}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
