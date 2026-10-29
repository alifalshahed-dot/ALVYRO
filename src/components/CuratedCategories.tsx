import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Language, ProductCategory } from '../types';

interface CuratedCategoriesProps {
  language: Language;
  onSelectCategory: (category: ProductCategory) => void;
}

export const CuratedCategories: React.FC<CuratedCategoriesProps> = ({
  language,
  onSelectCategory
}) => {
  const isBn = language === 'bn';

  const categories = [
    {
      id: 't-shirt',
      category: 't-shirt' as ProductCategory,
      title: isBn ? 'ক্যাজুয়াল টি-শার্ট' : 'Casual T-Shirts',
      subtitle: isBn ? '১০০% সুতি ১৮০ জিএসএম ড্রপ-শোল্ডার' : '180 GSM Combed Cotton Drop-Shoulder',
      image: '/src/assets/images/alvyro_hero_banner_1792922471287.jpg',
      badge: isBn ? 'বাজেট ফ্রেন্ডলি' : 'ESSENTIAL'
    },
    {
      id: 'polo-shirt',
      category: 'polo-shirt' as ProductCategory,
      title: isBn ? 'প্রিমিয়াম পোলো শার্ট' : 'Structured Polos',
      subtitle: isBn ? '২২০ জিএসএম ম্যাটি পিকে কলার টি-শার্ট' : '220 GSM Pique Knit Executive Polos',
      image: '/src/assets/images/alvyro_polo_shirt_model_1792922472661.jpg',
      badge: isBn ? 'বেস্টসেলার' : 'BESTSELLER'
    },
    {
      id: 'casual-shirt',
      category: 'casual-shirt' as ProductCategory,
      title: isBn ? 'ক্যাজুয়াল শার্ট' : 'Casual Shirts',
      subtitle: isBn ? 'খাঁটি লিনেন ও কিউবান কলার' : 'Linen Cotton & Cuban Summer Shirts',
      image: '/src/assets/images/alvyro_lookbook_atelier_1792922471816.jpg',
      badge: isBn ? 'জনপ্রিয়' : 'POPULAR'
    },
    {
      id: 'formal-shirt',
      category: 'formal-shirt' as ProductCategory,
      title: isBn ? 'ফরমাল শার্ট' : 'Formal Shirts',
      subtitle: isBn ? 'অফিস ও ইন্টারভিউ উপযোগী অক্সফোর্ড সুতি' : 'Executive Oxford Cotton Office Wear',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'korean-pant',
      category: 'korean-pant' as ProductCategory,
      title: isBn ? 'কোরিয়ান প্যান্ট' : 'Korean Trousers',
      subtitle: isBn ? 'প্লিটেড ওয়াইড-লেগ ট্রেন্ডি ব্যাগি প্যান্ট' : 'Viral Double Pleated Wide-Leg Drape',
      image: '/src/assets/images/alvyro_korean_pants_model_1792922473145.jpg',
      badge: isBn ? 'ট্রেন্ডিং 🔥' : 'TRENDING'
    },
    {
      id: 'formal-pant',
      category: 'formal-pant' as ProductCategory,
      title: isBn ? 'ফরমাল ও গ্যাবার্ডিন প্যান্ট' : 'Formal Gabardine Pants',
      subtitle: isBn ? '৪-ওয়ে স্ট্রেচেবল অফিস ট্রাউজার্স' : '4-Way Stretch Tailored Trousers',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80'
    }
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'পোশাকের প্রধান ক্যাটাগরি' : 'CLOTHING CATEGORIES'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f7f4ed] tracking-tight">
          {isBn ? 'আলভিরোর বিশেষ পোশাক সংগ্রহ' : 'Explore Collections at ALVYRO'}
        </h2>
        <p className="mt-2 text-emerald-200/70 text-xs sm:text-sm">
          {isBn 
            ? 'টি-শার্ট, প্রিমিয়াম পোলো, ক্যাজুয়াল ও ফরমাল শার্ট এবং কোরিয়ান প্যান্টের বিশাল কালেকশন।' 
            : 'Find your signature fit from our handpicked menswear collection in BANGLADESH.'}
        </p>
      </div>

      {/* Grid of 6 categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.category)}
            className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-stone-100 flex flex-col justify-end p-4"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent group-hover:from-amber-900/90 transition-colors duration-300" />

            {cat.badge && (
              <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                {cat.badge}
              </span>
            )}

            <div className="relative z-10 text-white">
              <h3 className="text-sm sm:text-base font-serif font-bold tracking-wide group-hover:text-amber-200 transition-colors">
                {cat.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-300 font-light line-clamp-1 mt-0.5">
                {cat.subtitle}
              </p>
              
              <div className="mt-2 flex items-center text-[10px] uppercase font-bold tracking-wider text-amber-300 opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <span>{isBn ? 'কালেকশন দেখুন' : 'Explore'}</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
