import React from 'react';
import { ArrowUpRight, Sparkles, Tag } from 'lucide-react';
import { Language, ProductCategory } from '../types';

interface LookbookSectionProps {
  language: Language;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ language, onSelectCategory }) => {
  const isBn = language === 'bn';

  const looks = [
    {
      id: 1,
      title: isBn ? 'মিনিমাল ড্রপ-শোল্ডার স্টাইল' : 'The Minimalist Drop-Shoulder',
      subtitle: isBn ? '১৮০ জিএসএম বায়ো-ওয়াশড কটন টি-শার্ট + কোরিয়ান ট্রাউজার্স' : '180 GSM Combed Tee + Pleated Korean Pants',
      location: 'Chittagong City Center',
      tag: isBn ? 'ক্যাজুয়াল ড্রপ' : 'STREETWEAR',
      category: 't-shirt' as ProductCategory,
      image: '/src/assets/images/alvyro_hero_banner_1792922471287.jpg',
      priceGuide: '৳৫৫০ - ৳৯৫০'
    },
    {
      id: 2,
      title: isBn ? 'এক্সিকিউটিভ ম্যাটি পিকে পোলো' : 'The Executive Pique Polo',
      subtitle: isBn ? '২২০ জিএসএম প্রিমিয়াম পোলো + ৪-ওয়ে স্ট্রেচ ফর্মাল প্যান্ট' : '220 GSM Pique Polo + Formal Stretch Trousers',
      location: 'Agrabad Business District',
      tag: isBn ? 'এক্সিকিউটিভ লুক' : 'SMART CASUAL',
      category: 'polo-shirt' as ProductCategory,
      image: '/src/assets/images/alvyro_polo_shirt_model_1792922472661.jpg',
      priceGuide: '৳৬৫০ - ৳১,০৫০'
    },
    {
      id: 3,
      title: isBn ? 'ভাইরাল কোরিয়ান প্লিটেড ব্যাগি' : 'Korean Draped Pleated Slacks',
      subtitle: isBn ? 'ডাবল প্লিট ওয়াইড লেগ ট্রাউজার্স + স্লিম কলার শার্ট' : 'Double Pleated Wide Trouser + Minimal Shirt',
      location: 'GEC Circle, Chittagong',
      tag: isBn ? 'ট্রেন্ডিং কাট' : 'TRENDING FIT',
      category: 'korean-pant' as ProductCategory,
      image: '/src/assets/images/alvyro_korean_pants_model_1792922473145.jpg',
      priceGuide: '৳৮৫০ - ৳১,১৫০'
    },
    {
      id: 4,
      title: isBn ? 'সামার লিনেন ও কিউবান ভাইব' : 'Summer Linen & Cuban Collar',
      subtitle: isBn ? '১০০% ব্রিদেবল লিনেন কটন শার্ট + সফট গ্যাবার্ডিন প্যান্ট' : '100% Breathable Linen Cotton + Soft Chinos',
      location: 'Patenga Sunset Boardwalk',
      tag: isBn ? 'হলিডে স্টাইল' : 'RESORT & LINEN',
      category: 'casual-shirt' as ProductCategory,
      image: '/src/assets/images/alvyro_lookbook_atelier_1792922471816.jpg',
      priceGuide: '৳৭৫০ - ৳১,২০০'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#17543f]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? 'আলভিরো ফ্যাশন লুকবুক • ২০২৬' : 'ALVYRO ATELIER EDIT 2026'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f7f4ed] tracking-tight">
            {isBn ? 'আধুনিক পরিধান ও স্টাইলিং অনুপ্রেরণা' : 'Contemporary Street & Executive Lookbook'}
          </h2>
          <p className="mt-1.5 text-emerald-200/70 text-xs sm:text-sm max-w-xl">
            {isBn 
              ? 'আলভিরোর মানসম্পন্ন টি-শার্ট, পোলো ও কোরিয়ান প্যান্টের অনন্য কম্বিনেশন। আপনার নিজস্ব শৈলী গড়ে তুলুন।'
              : 'Effortless everyday menswear pairing tailored silhouettes with relaxed breathable textiles.'}
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-emerald-200/80 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]"></span>
          <span>{isBn ? 'বাংলাদেশ থেকে সরাসরি সরবরাহ' : 'Curated in BANGLADESH'}</span>
        </div>
      </div>

      {/* Lookbook 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {looks.map((look) => (
          <div
            key={look.id}
            onClick={() => onSelectCategory(look.category)}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5"
          >
            {/* Visual Frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag & City Badge */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[10px] text-white font-semibold">
                <span className="bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider text-amber-300">
                  {look.tag}
                </span>
                <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-stone-300 text-[9px]">
                  {look.location}
                </span>
              </div>

              {/* Bottom Card Title Overlay */}
              <div className="absolute bottom-3 inset-x-3 text-white">
                <h3 className="font-serif font-bold text-base group-hover:text-amber-200 transition-colors">
                  {look.title}
                </h3>
                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5 font-light">
                  {look.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="p-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 text-stone-600">
                <Tag className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-mono font-bold text-stone-900 text-[11px]">{look.priceGuide}</span>
              </div>

              <span className="font-bold text-amber-700 group-hover:text-amber-800 transition-colors flex items-center space-x-1 text-[11px] uppercase tracking-wider">
                <span>{isBn ? 'কালেকশন দেখুন' : 'Shop Look'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
