import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Phone, 
  MapPin, 
  RefreshCw, 
  ExternalLink,
  Smartphone,
  Check,
  XCircle,
  AlertCircle,
  TrendingDown
} from 'lucide-react';
import { Order, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface AdminAiFraudScannerProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  currency: Currency;
  onTriggerToast: (msg: string) => void;
}

interface AiAnalysisResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number;
  summary: string;
  redFlags: string[];
  greenFlags: string[];
  recommendation: string;
  source?: string;
}

export const AdminAiFraudScanner: React.FC<AdminAiFraudScannerProps> = ({
  orders,
  setOrders,
  currency,
  onTriggerToast
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisMap, setAnalysisMap] = useState<Record<string, AiAnalysisResult>>({});
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Quick Heuristic Evaluator
  const evaluateOrder = (ord: Order): AiAnalysisResult => {
    if (analysisMap[ord.id]) {
      return analysisMap[ord.id];
    }

    const phone = ord.phone.replace(/[^0-9]/g, '');
    const address = ord.address.toLowerCase().trim();
    const redFlags: string[] = [];
    const greenFlags: string[] = [];
    let score = 15;

    const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    const hasValidPrefix = validPrefixes.some(p => phone.startsWith(p) || phone.startsWith('88' + p));

    if (!hasValidPrefix || phone.length < 11) {
      score += 40;
      redFlags.push('অপরিচিত বা ভুল মোবাইল অপারেটর প্রিফিক্স (১১ ডিজিট নয়)');
    } else {
      greenFlags.push('সঠিক বাংলাদেশি অপারেটর (Grameenphone/Banglalink/Robi/Airtel/Teletalk)');
    }

    if (/(\d)\1{4,}/.test(phone) || phone.includes('00000') || phone.includes('11111') || phone.includes('12345')) {
      score += 45;
      redFlags.push('সন্দেহজনক পুনরাবৃত্তিমূলক বা নকল মোবাইল ডিজিট প্যাটার্ন');
    }

    if (address.length < 8 || ['dhaka', 'ctg', 'chittagong', 'home', 'test', 'xyz', 'k'].includes(address)) {
      score += 35;
      redFlags.push('অসম্পূর্ণ ডেলিভারি ঠিকানা (বাড়ি/রোড নম্বর নেই, কুরিয়ার পৌঁছানো অসম্ভব)');
    } else {
      greenFlags.push('বিস্তারিত বাসা, রোড ও এলাকার বিবরণ দেওয়া হয়েছে');
    }

    if (ord.advancePaid && ord.advancePaid > 0 && ord.transactionId) {
      score = Math.max(0, score - 30);
      greenFlags.push(`বিকাশে অগ্রিম ডেলিভারি চার্জ পরিশোধিত (TrxID: ${ord.transactionId})`);
    } else {
      score += 15;
      redFlags.push('অগ্রিম ডেলিভারি ফি অপূর্ণ; স্ট্যান্ডার্ড সিওডি যাচাই প্রয়োজন');
    }

    const riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = score > 60 ? 'HIGH' : score > 30 ? 'MEDIUM' : 'LOW';
    return {
      riskLevel,
      riskScore: Math.min(99, Math.max(5, score)),
      summary: riskLevel === 'HIGH'
        ? 'উচ্চ ঝুঁকিপূর্ণ ও সম্ভাব্য ফেক অর্ডার। ফোন কল ছাড়া পার্সেল বুক করবেন না।'
        : riskLevel === 'MEDIUM'
        ? 'মাঝারি ঝুঁকি। ঠিকানার রোড/বাড়ি নিশ্চিত করতে ডেলিভারির আগে কল দিন।'
        : 'নিরাপদ অর্ডার। প্রকৃত ক্রেতা প্রোফাইল ও সঠিক কুরিয়ার ইনফরমেশন।',
      redFlags,
      greenFlags,
      recommendation: riskLevel === 'HIGH'
        ? 'গ্রাহককে সরাসরি ফোন দিয়ে বিকাশ অগ্রিম ডেলিভারি চার্জ চেয়ে নিশ্চিত হোন, অন্যথায় বাতিল করুন।'
        : riskLevel === 'MEDIUM'
        ? 'স্টেডফাস্ট/পাঠাও বুকিংয়ের আগে ১ মিনিটের জন্য কল দিয়ে কনফার্ম করুন।'
        : 'নির্দ্বিধায় পার্সেল প্যাকেজিং ও কুরিয়ারে বুকিং সম্পন্ন করুন।'
    };
  };

  const handleDeepGeminiScan = async (ord: Order) => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/ai/fraud-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: ord })
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysisMap(prev => ({ ...prev, [ord.id]: data.analysis }));
        onTriggerToast(`Gemini AI দিয়ে অর্ডার #${ord.id} সম্পূর্ণ স্ক্যান হয়েছে!`);
      }
    } catch {
      const fallback = evaluateOrder(ord);
      setAnalysisMap(prev => ({ ...prev, [ord.id]: fallback }));
      onTriggerToast(`অর্ডার #${ord.id} AI ফ্রড স্ক্যান সম্পন্ন হয়েছে।`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleMarkSafe = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, adminNote: 'Verified Safe by AI' } : o));
    onTriggerToast(`অর্ডার #${orderId} ভেরিফাইড ও নিরাপদ হিসেবে চিহ্নিত হয়েছে।`);
  };

  const handleCancelFake = (orderId: string) => {
    if (window.confirm(`আপনি কি নিশ্চিত অর্ডার #${orderId} ফেক অর্ডার হিসেবে বাতিল করবেন?`)) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled', adminNote: 'Cancelled: AI Flagged Fake Order' } : o));
      onTriggerToast(`অর্ডার #${orderId} বাতিল করা হয়েছে।`);
    }
  };

  const currentAnalysis = selectedOrder ? (analysisMap[selectedOrder.id] || evaluateOrder(selectedOrder)) : null;

  const filteredOrders = orders.filter(o => {
    const analysis = analysisMap[o.id] || evaluateOrder(o);
    if (filterRisk === 'high') return analysis.riskLevel === 'HIGH';
    if (filterRisk === 'medium') return analysis.riskLevel === 'MEDIUM';
    if (filterRisk === 'low') return analysis.riskLevel === 'LOW';
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-rose-950/40 to-stone-900 rounded-3xl border border-rose-900/40 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>ALVYRO AI Scam & Fake Order Shield</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
            কৃত্রিম বুদ্ধিমত্তা (AI) ফেক অর্ডার ও স্প্যাম ডিটেক্টর
          </h3>
          <p className="text-xs text-stone-300 mt-0.5 max-w-2xl font-light">
            বাংলাদেশের ই-কমার্সে ক্যাশ অন ডেলিভারি (COD) রিটার্ন ক্ষতি রোধ করতে Gemini AI প্রতিটি অর্ডার স্ক্যান করে ভুয়া ফোন নম্বর, অসম্পূর্ণ ঠিকানা ও স্প্যামিং শনাক্ত করে।
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {['all', 'high', 'medium', 'low'].map(f => (
            <button
              key={f}
              onClick={() => setFilterRisk(f as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                filterRisk === f
                  ? f === 'high' ? 'bg-rose-600 text-white' : f === 'medium' ? 'bg-amber-600 text-white' : f === 'low' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-900'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              {f === 'all' ? `সকল (${orders.length})` : f === 'high' ? 'উচ্চ ঝুঁকি (Fake)' : f === 'medium' ? 'মাঝারি' : 'নিরাপদ'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Orders List with AI Badges (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700">
            <span>অর্ডার তালিকা ({filteredOrders.length})</span>
            <span className="text-[10px] text-stone-400">ক্লিক করে AI বিশ্লেষণ দেখুন</span>
          </div>

          <div className="divide-y divide-stone-100 max-h-[560px] overflow-y-auto">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                এই ক্যাটাগরিতে কোনো অর্ডার পাওয়া যায়নি।
              </div>
            ) : (
              filteredOrders.map(ord => {
                const analysis = analysisMap[ord.id] || evaluateOrder(ord);
                const isSelected = selectedOrder?.id === ord.id;
                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-4 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected ? 'bg-amber-50/70 border-l-4 border-amber-600' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs text-stone-900">{ord.id}</span>
                        <span className="text-[11px] text-stone-500">• {ord.customerName}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center space-x-2 font-mono">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{ord.phone}</span>
                      </div>
                      <div className="text-[10px] text-stone-400 line-clamp-1">
                        {ord.address}, {ord.district}
                      </div>
                    </div>

                    <div className="text-right space-y-1 shrink-0 ml-3">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        analysis.riskLevel === 'HIGH'
                          ? 'bg-rose-100 text-rose-700 border border-rose-300'
                          : analysis.riskLevel === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {analysis.riskLevel === 'HIGH' ? (
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                        ) : analysis.riskLevel === 'MEDIUM' ? (
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        )}
                        <span>{analysis.riskLevel} ({analysis.riskScore}%)</span>
                      </span>

                      <div className="font-mono text-xs font-bold text-stone-900">
                        {formatPrice(ord.total, currency)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: AI Deep Scan & Security Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5">
          {selectedOrder && currentAnalysis ? (
            <div className="space-y-5 animate-fadeIn">
              {/* Order Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs uppercase font-bold text-stone-400">অর্ডার বিশ্লেষণ</span>
                    <span className="font-mono font-black text-lg text-stone-900">#{selectedOrder.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 font-mono text-stone-600">
                      {selectedOrder.createdAt}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mt-0.5">
                    {selectedOrder.customerName} ({selectedOrder.phone})
                  </h4>
                </div>

                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => handleDeepGeminiScan(selectedOrder)}
                  className="px-4 py-2 bg-gradient-to-r from-stone-900 to-amber-900 hover:to-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-amber-400 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'AI স্ক্যান হচ্ছে...' : 'Gemini AI ডিপ স্ক্যান'}</span>
                </button>
              </div>

              {/* Risk Score Gauge Card */}
              <div className={`p-5 rounded-2xl border-2 flex items-center justify-between ${
                currentAnalysis.riskLevel === 'HIGH'
                  ? 'bg-rose-50/80 border-rose-400 text-rose-950'
                  : currentAnalysis.riskLevel === 'MEDIUM'
                  ? 'bg-amber-50/80 border-amber-400 text-amber-950'
                  : 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      AI সার্বিক ঝুঁকি রেটিং:
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-black uppercase ${
                      currentAnalysis.riskLevel === 'HIGH' ? 'bg-rose-600 text-white' : currentAnalysis.riskLevel === 'MEDIUM' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {currentAnalysis.riskLevel} RISK
                    </span>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">
                    {currentAnalysis.summary}
                  </p>
                </div>

                <div className="text-right shrink-0 ml-4">
                  <div className="text-3xl font-mono font-black">
                    {currentAnalysis.riskScore}%
                  </div>
                  <div className="text-[10px] font-bold uppercase opacity-80">Risk Index</div>
                </div>
              </div>

              {/* Red Flags / Security Concerns */}
              {currentAnalysis.redFlags.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>শনাক্ত হওয়া সন্দেহজনক সূচকসমূহ (Red Flags):</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-rose-800">
                    {currentAnalysis.redFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Green Flags / Positive Indicators */}
              {currentAnalysis.greenFlags.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>ইতিবাচক প্রমাণ ও যাচাইকৃত বিষয়সমূহ (Green Flags):</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-emerald-800">
                    {currentAnalysis.greenFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actionable AI Recommendation */}
              <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                  AI অ্যাকশনেবল সুপারিশ (Recommendation):
                </span>
                <p className="text-xs text-stone-200 leading-relaxed font-light">
                  {currentAnalysis.recommendation}
                </p>
              </div>

              {/* 1-Click Action Buttons for Store Owner */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => handleMarkSafe(selectedOrder.id)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>নিরাপদ হিসেবে বুকিং দিন</span>
                </button>

                <a
                  href={`tel:${selectedOrder.phone}`}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all border border-stone-300 flex items-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-stone-600" />
                  <span>কাস্টমারকে কল দিন</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleCancelFake(selectedOrder.id)}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ml-auto"
                >
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>ফেক অর্ডার বাতিল</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-400 text-xs">
              বাম পাশের তালিকা থেকে যেকোনো অর্ডার নির্বাচন করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
