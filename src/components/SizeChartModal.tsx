import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { Language } from '../types';
import { STORE_INFO } from '../data/storeInfo';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialTab?: 't-shirts-polo' | 'shirts' | 'pants';
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  language,
  initialTab = 't-shirts-polo'
}) => {
  const [activeTab, setActiveTab] = useState<'t-shirts-polo' | 'shirts' | 'pants'>(initialTab);
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;
  const isBn = language === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold">
                {isBn ? 'আলভিরো সাইজ ও মেজারমেন্ট গাইড' : 'ALVYRO Size Guide'}
              </h3>
              <p className="text-xs text-stone-300">
                {isBn ? 'সঠিক মাপ নিশ্চিত করতে নিচের চার্টটি দেখুন' : 'Standard sizing for T-Shirts, Shirts & Pants'}
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

        {/* Tab & Unit Selector */}
        <div className="px-6 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50 flex-wrap gap-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('t-shirts-polo')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 't-shirts-polo'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {isBn ? 'টি-শার্ট ও পোলো' : 'T-Shirts & Polo'}
            </button>
            <button
              onClick={() => setActiveTab('shirts')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'shirts'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {isBn ? 'শার্ট (ক্যাজুয়াল/ফরমাল)' : 'Shirts'}
            </button>
            <button
              onClick={() => setActiveTab('pants')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'pants'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {isBn ? 'প্যান্ট কালেকশন' : 'Pants Collection'}
            </button>
          </div>

          <div className="flex items-center space-x-1 border border-stone-300 rounded-lg p-0.5 text-xs font-semibold bg-white">
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 rounded ${unit === 'in' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded ${unit === 'cm' ? 'bg-stone-900 text-white' : 'text-stone-600'}`}
            >
              CM (সেমি)
            </button>
          </div>
        </div>

        {/* Tables */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 't-shirts-polo' && (
            <div className="space-y-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                    <th className="py-3 px-3">Size Tag</th>
                    <th className="py-3 px-3">Chest / বুকের মাপ</th>
                    <th className="py-3 px-3">Length / দৈর্ঘ্য</th>
                    <th className="py-3 px-3">Shoulder / কাঁধ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-700">M</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '38" - 39"' : '96 - 99 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '27"' : '68.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '17.5"' : '44.5 cm'}</td>
                  </tr>
                  <tr className="bg-stone-50/60">
                    <td className="py-2.5 px-3 font-bold text-amber-700">L</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '40" - 41"' : '101 - 104 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '28"' : '71 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '18.5"' : '47 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-700">XL</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '42" - 43"' : '106 - 109 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '29"' : '73.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '19.5"' : '49.5 cm'}</td>
                  </tr>
                  <tr className="bg-stone-50/60">
                    <td className="py-2.5 px-3 font-bold text-amber-700">XXL</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '44" - 45"' : '111 - 114 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '30"' : '76 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '20.5"' : '52 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shirts' && (
            <div className="space-y-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                    <th className="py-3 px-3">Size</th>
                    <th className="py-3 px-3">Collar</th>
                    <th className="py-3 px-3">Chest</th>
                    <th className="py-3 px-3">Length</th>
                    <th className="py-3 px-3">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-700">15 (M)</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '15"' : '38 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '40"' : '101 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '29"' : '73.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '24.5"' : '62 cm'}</td>
                  </tr>
                  <tr className="bg-stone-50/60">
                    <td className="py-2.5 px-3 font-bold text-amber-700">15.5 (L)</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '15.5"' : '39.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '42"' : '106 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '30"' : '76 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '25"' : '63.5 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-700">16 (XL)</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '16"' : '40.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '44"' : '112 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '31"' : '78.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '25.5"' : '64.5 cm'}</td>
                  </tr>
                  <tr className="bg-stone-50/60">
                    <td className="py-2.5 px-3 font-bold text-amber-700">16.5 (XXL)</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '16.5"' : '42 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '46"' : '117 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '31.5"' : '80 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '26"' : '66 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'pants' && (
            <div className="space-y-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                    <th className="py-3 px-3">Waist (কোমর)</th>
                    <th className="py-3 px-3">Length (লম্বা)</th>
                    <th className="py-3 px-3">Thigh (রান)</th>
                    <th className="py-3 px-3">Leg Opening (বটম)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-700">28</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '39"' : '99 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '22"' : '56 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '13"' : '33 cm'}</td>
                  </tr>
                  <tr className="bg-stone-50/60">
                    <td className="py-2.5 px-3 font-bold text-amber-700">30</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '40"' : '101.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '23"' : '58.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '13.5"' : '34 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-700">32</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '40"' : '101.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '24"' : '61 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '14"' : '35.5 cm'}</td>
                  </tr>
                  <tr className="bg-stone-50/60">
                    <td className="py-2.5 px-3 font-bold text-amber-700">34</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '41"' : '104 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '25"' : '63.5 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '14.5"' : '37 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-700">36</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '41"' : '104 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '26"' : '66 cm'}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? '15"' : '38 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-5 p-3.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs">
            💡 <strong>আলিফ শপ সাইজ টিপস:</strong> কোরিয়ান প্যান্টগুলো ওভারসাইজড ও রিল্যাক্সড কাটে তৈরি। আপনি যদি নিয়মিত ফিটিং চান তবে আপনার স্বাভাবিক সাইজই বেছে নিন। কোনো কনফিউশন থাকলে আমাদের হটলাইনে ({STORE_INFO.phoneDisplay}) ফোন দিন।
          </div>
        </div>
      </div>
    </div>
  );
};
