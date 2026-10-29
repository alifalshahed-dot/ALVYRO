import React from 'react';
import { Star, CheckCircle, Quote, Camera, Plus, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { UserReview } from './AddReviewModal';

interface CustomerReviewsProps {
  language: Language;
  onOpenAddReview: () => void;
  customReviews?: UserReview[];
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ 
  language, 
  onOpenAddReview,
  customReviews = []
}) => {
  const isBn = language === 'bn';

  const defaultReviews: UserReview[] = [
    {
      id: '1',
      author: 'Mohammad Farhan',
      city: 'নাসিরাবাদ, চট্টগ্রাম',
      rating: 5,
      product: 'কোরিয়ান প্লিটেড ওয়াইড-লেগ ব্যাগি ট্রাউজার্স',
      text: isBn 
        ? 'আলভিরোর চট্টগ্রাম আউটলেট থেকে কোরিয়ান প্যান্টটা নিয়েছিলাম। কাপড়টা অসাধারণ সফট এবং ফিটিং অসম্ভব সুন্দর। দামও অনেক রিজনেবল।' 
        : 'Bought the Korean pleated pants directly from their Chittagong store. The drape and comfort are top tier! Highly recommended.',
      date: 'Verified Patron • ২ দিন আগে',
      photoUrl: '/src/assets/images/alvyro_korean_pants_model_1792922473145.jpg',
      verified: true
    },
    {
      id: '2',
      author: 'Shahidul Islam',
      city: 'আগ্রাবাদ, চট্টগ্রাম',
      rating: 5,
      product: 'ক্লাসিক পিকের কটন এক্সিকিউটিভ পোলো শার্ট',
      text: isBn 
        ? '২২০ জিএসএম ম্যাটি পিকে পোলো টি-শার্ট। কলার ওয়াশের পরও নষ্ট হয়নি। কালার একেবারে ছবির মতোই ব্রাইট। চট্টগ্রামে দ্রুত ডেলিভারি পেয়েছি।' 
        : 'Premium 220 GSM pique polo. The collar retains shape even after multiple washes. Excellent quality in Chittagong!',
      date: 'Verified Patron • ১ সপ্তাহ আগে',
      photoUrl: '/src/assets/images/alvyro_polo_shirt_model_1792922472661.jpg',
      verified: true
    },
    {
      id: '3',
      author: 'Tanvir Ahmed',
      city: 'জিইসি মোড়, চট্টগ্রাম',
      rating: 5,
      product: 'টেইলর্ড ৪-ওয়ে স্ট্রেচ গ্যাবার্ডিন ফরমাল প্যান্ট ও শার্ট',
      text: isBn 
        ? 'অনলাইনে অর্ডার করার ২৪ ঘণ্টার মধ্যেই চট্টগ্রাম শহরে ক্যাশ অন ডেলিভারিতে পার্সেল পেয়েছি। অফিসের জন্য বেস্ট গ্যাবার্ডিন প্যান্ট।' 
        : 'Received my order in Chittagong city in 24 hours with Cash on Delivery. Superb 4-way stretch fabric for daily office wear.',
      date: 'Verified Patron • ৩ দিন আগে',
      photoUrl: '/src/assets/images/alvyro_lookbook_atelier_1792922471816.jpg',
      verified: true
    }
  ];

  const allReviews = [...customReviews, ...defaultReviews];

  return (
    <section className="py-16 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Write Review Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.2em] mb-2 inline-block">
              {isBn ? 'গ্রাহকদের সন্তুষ্টি ও অভিজ্ঞতা (UGC)' : 'VERIFIED PATRON REVIEWS'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              {isBn ? 'আলভিরোর পোশাক নিয়ে গ্রাহকদের বাস্তব রিভিউ' : 'Loved by Patrons in Chittagong & Nationwide'}
            </h2>
            <div className="mt-3 flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-stone-700 ml-2">4.9 / 5.0 (সারা দেশে ১,২০০+ সন্তুষ্ট গ্রাহক)</span>
            </div>
          </div>

          <button
            onClick={onOpenAddReview}
            className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shadow-md cursor-pointer shrink-0 self-start md:self-auto"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>{isBn ? 'ছবিসহ রিভিউ যুক্ত করুন' : 'Add Photo Review'}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-amber-600/15 absolute top-5 right-5 pointer-events-none" />

              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>

                {/* Attached Photo (UGC Feature) */}
                {rev.photoUrl && (
                  <div className="mt-3 rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 group relative">
                    <img 
                      src={rev.photoUrl} 
                      alt="Customer Wearing Garment" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Camera className="w-2.5 h-2.5 text-amber-300" />
                      <span>{isBn ? 'গ্রাহকের ছবি' : 'Customer Photo'}</span>
                    </span>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-amber-700 font-bold">
                  {rev.product}
                </div>
              </div>

              {/* Author Footer */}
              <div className="mt-5 flex items-center justify-between pt-3 border-t border-stone-100">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{rev.author}</h4>
                  <p className="text-[11px] text-stone-500">{rev.city}</p>
                </div>
                {rev.verified && (
                  <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isBn ? 'ভেরিফাইড' : 'Verified'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
