import React from 'react';
import { X, RotateCcw, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';
import { Language } from '../types';

interface ReturnPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ReturnPolicyModal: React.FC<ReturnPolicyModalProps> = ({ isOpen, onClose, language }) => {
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
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-wide">
                {isBn ? 'রিটার্ন ও এক্সচেঞ্জ পলিসি' : 'Return & Exchange Policy'}
              </h3>
              <p className="text-xs text-stone-300">
                {isBn ? '৭ দিনে সহজ পরিবর্তন সুবিধা • আলভিরো' : '7-Day Easy Exchange • ALVYRO'}
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-stone-700 leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-stone-900 text-sm mb-1">
              {isBn ? '🛡️ আমাদের অঙ্গীকার (৭ দিনের সহজ এক্সচেঞ্জ)' : '7-Day Easy Exchange Policy'}
            </h4>
            <p>
              {isBn 
                ? 'আলভিরো (চট্টগ্রাম, বাংলাদেশ) থেকে যেকোনো পোশাক কিনে সাইজ বা কালার পছন্দ না হলে পণ্য পাওয়ার ৭ দিনের মধ্যে তা সহজে পরিবর্তন করে নিতে পারবেন।' 
                : 'If size does not fit or you wish to change colors, you can exchange any unworn clothing item within 7 days of delivery.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm">
              {isBn ? 'পণ্য পরিবর্তনের সাধারণ শর্তাবলী:' : 'Exchange Conditions:'}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>পোশাকটি সম্পূর্ণ অব্যবহৃত (Unworn), অবিকৃত এবং এর মূল ট্যাগ/প্যাকেজিং ঠিক থাকতে হবে।</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>কাপড়ে কোনো দাগ, পারফিউমের গন্ধ বা ধোয়ার চিহ্ন থাকলে তা ফেরতযোগ্য হবে না।</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>আমাদের পাঠানো ভুল সাইজ বা ত্রুটিপূর্ণ (Defective) পণ্যের ক্ষেত্রে সম্পূর্ণ ডেলিভারি চার্জ আমরা বহন করবো।</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-stone-900 text-xs">
              {isBn ? '🔄 কীভাবে পরিবর্তন করবেন?' : 'How to Exchange:'}
            </h4>
            <p>
              <strong>১. সরাসরি শোরুম ভিজিট:</strong> আপনি চাইলে আমাদের চট্টগ্রাম আউটলেটে সরাসরি এসে তাৎক্ষণিক সাইজ পরিবর্তন করে নিতে পারেন।
            </p>
            <p>
              <strong>২. কুরিয়ারের মাধ্যমে:</strong> আমাদের হটলাইন ({STORE_INFO.phoneDisplay}) অথবা হোয়াটসঅ্যাপে যোগাযোগ করে কুরিয়ারের মাধ্যমে পার্সেল পাঠিয়ে নতুন সাইজ রিসিভ করতে পারবেন।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            {isBn ? 'বুঝেছি' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
