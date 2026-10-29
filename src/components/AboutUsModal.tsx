import React from 'react';
import { X, ShieldCheck, MapPin, Sparkles, CheckCircle, HeartHandshake } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';
import { Language } from '../types';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose, language }) => {
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
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-wide">
                {isBn ? 'এবাউট আস (আলভিরো)' : 'About ALVYRO'}
              </h3>
              <p className="text-xs text-stone-300">
                {isBn ? 'চট্টগ্রাম, বাংলাদেশ | বিশ্বস্ত পুরুষদের ফ্যাশন প্রতিষ্ঠান' : 'Chittagong, Bangladesh | Modern Menswear'}
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-700 text-sm leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-stone-900 text-base mb-1">
              {isBn ? 'আমাদের পরিচয় ও লক্ষ্য' : 'Who We Are'}
            </h4>
            <p className="text-xs text-stone-700">
              {isBn ? (
                <>
                  <strong>{STORE_INFO.nameBn}</strong> <strong>চট্টগ্রাম, বাংলাদেশ</strong>-এর একটি শীর্ষস্থানীয় পুরুষদের পোশাকের নির্ভরযোগ্য শপ। আমরা আধুনিক তরুণ ও পুরুষদের জন্য মানসম্মত, টেকসই এবং ট্রেন্ডি পোশাক সরবরাহ করতে প্রতিশ্রুতিবদ্ধ।
                </>
              ) : (
                <>
                  <strong>{STORE_INFO.name}</strong> is a dedicated menswear brand based in <strong>Chittagong, Bangladesh</strong>, bringing high-street comfort, premium cotton fabrics, and tailored aesthetics at fair, direct-to-consumer prices.
                </>
              )}
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-900 text-base mb-2">
              {isBn ? '👕 আমাদের পোশাকের প্রধান ক্যাটাগরি:' : 'Our Product Highlights:'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>টি-শার্ট ও পোলো টি-শার্ট:</strong> ১৮০–২২০ জিএসএম প্রিমিয়াম কম্বড কটন ক্যাজুয়াল টি-শার্ট ও ম্যাটি পিকে এক্সিকিউটিভ পোলো শার্ট।</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>ক্যাজুয়াল ও ফরমাল শার্ট:</strong> খাঁটি লিনেন, কিউবান কলারযুক্ত হাফ-হাতা ও রিঙ্কেল-ফ্রি অক্সফোর্ড ফরমাল অফিস শার্ট।</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>প্যান্ট ও ট্রাউজার্স কালেকশন:</strong> ভাইরাল কোরিয়ান প্লিটেড ব্যাগি প্যান্ট, ৪-ওয়ে স্ট্রেচেবল ফরমাল গ্যাবার্ডিন প্যান্ট ও কমফোর্ট চিনো ট্রাউজার্স।</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <div className="flex items-center space-x-2 font-bold text-stone-900 mb-1">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>লোকেশন</span>
              </div>
              <p className="text-stone-600">{STORE_INFO.landmarkBn}</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <div className="flex items-center space-x-2 font-bold text-stone-900 mb-1">
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>বিশ্বস্ত সেবা</span>
              </div>
              <p className="text-stone-600">সারা দেশে ক্যাশ অন ডেলিভারি এবং ৭ দিনে সহজ পণ্য পরিবর্তন সুবিধা।</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
