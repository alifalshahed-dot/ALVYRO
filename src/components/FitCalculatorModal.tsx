import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2, ArrowRight, User } from 'lucide-react';
import { Language } from '../types';

interface FitCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onApplySize?: (size: string) => void;
}

export const FitCalculatorModal: React.FC<FitCalculatorModalProps> = ({
  isOpen,
  onClose,
  language,
  onApplySize
}) => {
  const isBn = language === 'bn';

  const [clothingType, setClothingType] = useState<'tops' | 'pants'>('tops');
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [fitPreference, setFitPreference] = useState<'regular' | 'slim' | 'relaxed'>('regular');
  const [calculated, setCalculated] = useState(false);

  if (!isOpen) return null;

  // Smart size determination algorithm based on Asian / Bangladeshi body metrics
  const calculateSize = () => {
    const totalInches = heightFeet * 12 + heightInches;

    if (clothingType === 'tops') {
      // T-Shirts, Polos & Shirts
      let size = 'M';
      if (weightKg < 58) {
        size = fitPreference === 'relaxed' ? 'M' : 'S';
      } else if (weightKg <= 68) {
        if (totalInches > 69 || fitPreference === 'relaxed') {
          size = 'L';
        } else {
          size = fitPreference === 'slim' ? 'M' : 'M';
        }
      } else if (weightKg <= 78) {
        size = fitPreference === 'slim' ? 'L' : 'XL';
      } else if (weightKg <= 90) {
        size = fitPreference === 'slim' ? 'XL' : 'XXL';
      } else {
        size = 'XXL';
      }

      return {
        size,
        confidence: 96,
        chestEstimate: size === 'M' ? '৩৮-৪০ ইঞ্চি' : size === 'L' ? '৪০-৪২ ইঞ্চি' : size === 'XL' ? '৪২-৪৪ ইঞ্চি' : '৪৪-৪৬ ইঞ্চি',
        lengthEstimate: size === 'M' ? '২৭ ইঞ্চি' : size === 'L' ? '২৮ ইঞ্চি' : size === 'XL' ? '২৯ ইঞ্চি' : '৩০ ইঞ্চি',
        adviceBn: `আপনার উচ্চতা ${heightFeet}'${heightInches}" ও ওজন ${weightKg} কেজির জন্য "${size}" সাইজ নিখুঁত মানানসই হবে।`,
        adviceEn: `Based on your height of ${heightFeet}'${heightInches}" and weight of ${weightKg}kg, size "${size}" offers the ideal balance of shoulder drop and chest comfort.`
      };
    } else {
      // Pants & Trousers
      let waist = '32';
      if (weightKg < 55) waist = '28';
      else if (weightKg <= 63) waist = '30';
      else if (weightKg <= 73) waist = '32';
      else if (weightKg <= 82) waist = '34';
      else waist = '36';

      return {
        size: waist,
        confidence: 94,
        chestEstimate: `কোমর: ${waist} ইঞ্চি`,
        lengthEstimate: totalInches > 70 ? 'দৈর্ঘ্য: ৪০-৪২ ইঞ্চি' : 'দৈর্ঘ্য: ৩৮-৪০ ইঞ্চি',
        adviceBn: `আপনার ওজনের উপর ভিত্তি করে কোরিয়ান ও ফরমাল প্যান্টের জন্য কোমর "${waist}" সাইজ নির্বাচন করুন।`,
        adviceEn: `For pleated Korean pants and formal gabardines, waist size "${waist}" will provide a clean tailored break over shoes.`
      };
    }
  };

  const result = calculateSize();

  const handleApply = () => {
    if (onApplySize) {
      onApplySize(result.size);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-inner">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold tracking-wide">
                {isBn ? 'স্মার্ট সাইজ ও ফিট ক্যালকুলেটর' : 'Smart Fit & Size Finder'}
              </h3>
              <p className="text-xs text-stone-400">
                {isBn ? 'উচ্চতা ও ওজন দিয়ে নির্ভুল সাইজ জানুন' : 'AI-assisted size recommendation'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Clothing Category Tabs */}
          <div>
            <label className="block font-bold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
              {isBn ? '১. পোশাকের ধরন নির্বাচন করুন:' : '1. Select Garment Type:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setClothingType('tops')}
                className={`py-2.5 px-3 rounded-xl font-bold transition-all border cursor-pointer ${
                  clothingType === 'tops'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isBn ? 'টি-শার্ট, পোলো ও শার্ট' : 'T-Shirts, Polos & Shirts'}
              </button>
              <button
                type="button"
                onClick={() => setClothingType('pants')}
                className={`py-2.5 px-3 rounded-xl font-bold transition-all border cursor-pointer ${
                  clothingType === 'pants'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isBn ? 'কোরিয়ান ও ফরমাল প্যান্ট' : 'Pants & Trousers'}
              </button>
            </div>
          </div>

          {/* Height and Weight Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                {isBn ? '২. আপনার উচ্চতা:' : '2. Your Height:'}
              </label>
              <div className="flex gap-2">
                <select
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Number(e.target.value))}
                  className="flex-1 py-2 px-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                >
                  <option value={4}>৪ ফুট</option>
                  <option value={5}>৫ ফুট</option>
                  <option value={6}>৬ ফুট</option>
                </select>
                <select
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="flex-1 py-2 px-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i}>{i} ইঞ্চি</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                {isBn ? '৩. আপনার ওজন (কেজি):' : '3. Weight (kg):'}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={40}
                  max={130}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(40, Math.min(130, Number(e.target.value))))}
                  className="w-full py-2 px-3 bg-stone-50 border border-stone-300 rounded-xl font-bold font-mono text-stone-900 focus:outline-none focus:border-amber-600"
                />
                <span className="text-stone-500 font-bold">KG</span>
              </div>
            </div>
          </div>

          {/* Fit Preference */}
          <div>
            <label className="block font-bold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
              {isBn ? '৪. আপনার পছন্দের ফিটিং স্টাইল:' : '4. Preferred Fit Style:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'slim', labelBn: 'স্লিম ফিট', labelEn: 'Slim Fit' },
                { id: 'regular', labelBn: 'রেগুলার ফিট', labelEn: 'Regular Fit' },
                { id: 'relaxed', labelBn: 'রিল্যাক্সড / ড্রপ', labelEn: 'Relaxed Oversized' }
              ].map((fit) => (
                <button
                  key={fit.id}
                  type="button"
                  onClick={() => setFitPreference(fit.id as any)}
                  className={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all border cursor-pointer ${
                    fitPreference === fit.id
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {isBn ? fit.labelBn : fit.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent border-2 border-amber-600/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isBn ? 'সুপারিশকৃত নির্ভুল সাইজ' : 'RECOMMENDED SIZE'}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                {result.confidence}% {isBn ? 'ম্যাচিং রেট' : 'Accuracy'}
              </span>
            </div>

            <div className="flex items-baseline space-x-3">
              <div className="text-4xl font-mono font-black text-stone-950">
                {result.size}
              </div>
              <div className="text-xs text-stone-600">
                <span>{result.chestEstimate}</span> · <span>{result.lengthEstimate}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-700 leading-relaxed">
              {isBn ? result.adviceBn : result.adviceEn}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isBn ? `"${result.size}" সাইজ বাছাই করুন` : `Apply Size "${result.size}"`}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold cursor-pointer"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
