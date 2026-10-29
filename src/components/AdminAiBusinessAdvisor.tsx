import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  ShieldCheck, 
  DollarSign, 
  ArrowRight,
  Bot,
  User,
  RefreshCw,
  Copy,
  Lightbulb,
  Check
} from 'lucide-react';
import { Order, Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface AdminAiBusinessAdvisorProps {
  orders: Order[];
  products: Product[];
  currency: Currency;
  onTriggerToast: (msg: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AdminAiBusinessAdvisor: React.FC<AdminAiBusinessAdvisorProps> = ({
  orders,
  products,
  currency,
  onTriggerToast
}) => {
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0);
  const totalDelivered = orders.filter(o => o.status === 'delivered').length;
  const activeProductsCount = products.length;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `👋 স্বাগতম! আমি **ALVYRO AI Business Advisor & Co-Pilot**।\n\nআপনার অনলাইন শপের সেলস দ্বিগুণ করা, ক্যাশ অন ডেলিভারি (COD) রিটার্ন রেট কমানো, কোন প্রোডাক্ট রিস্টক করতে হবে, অথবা ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপনের জন্য আকর্ষনীয় কনটেন্ট তৈরি করতে আমি আপনাকে রিয়েল-টাইমে সাহায্য করতে প্রস্তুত।\n\nনিচের যেকোনো অপশনে ক্লিক করুন অথবা আপনার প্রশ্নটি সরাসরি লিখুন!`,
      timestamp: 'Just now'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/business-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          storeData: {
            totalOrders: orders.length,
            totalRevenue,
            deliveredCount: totalDelivered,
            activeProducts: activeProductsCount,
            topCategory: 'Korean Pleated Pants & 220 GSM Pique Polo'
          },
          language: 'bn'
        })
      });

      const data = await res.json();
      const aiReplyText = data.reply || 'দুঃখিত, বিশ্লেষণের সময় কোনো সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      // Fallback
      const fallbackReply = generateClientFallback(text, totalRevenue, orders.length);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateClientFallback = (query: string, rev: number, totalOrd: number) => {
    const q = query.toLowerCase();
    if (q.includes('return') || q.includes('রিটার্ন') || q.includes('cod')) {
      return `📦 **COD রিটার্ন রেট কমানোর ৪টি মোক্ষম উপায়:**\n1. **বিকাশে অগ্রিম ডেলিভারি ফি:** আপনি ওয়েবসাইটে যে বিকাশ ওটিপি সিস্টেম চালু করেছেন, তা দিয়ে ৳৭০ বা ৳১৩০ ডেলিভারি চার্জ আগে নিলে ক্রেতা পার্সেল রিসিভ করতে বাধ্য থাকে। রিটার্ন কমে ৮০%!\n2. **কনফার্মেশন ফোন কল:** পার্সেল দেওয়ার আগে কাস্টমারকে কল দিয়ে সাইজ ও কালার চেক করুন।\n3. **স্টেডফাস্ট/পাঠাও রিয়েল-টাইম ট্র্যাকিং:** কাস্টমারকে ট্র্যাকিং কোড এসএমএস করুন যেন ক্যাশ টাকা রেডি রাখে।\n4. **৭ দিনের এক্সচেঞ্জ:** যদি ফিটিং না মিলে, ফেরত না নিয়ে সাইজ এক্সচেঞ্জ অফার করুন।`;
    }
    if (q.includes('ad') || q.includes('ফেসবুক') || q.includes('কপি') || q.includes('marketing')) {
      return `🔥 **ALVYRO ভাইরাল ফেসবুক অ্যাড কপি (রেডি টু ইউজ):**\n\n"নিজের স্টাইলকে নিয়ে যান অনন্য উচ্চতায় — ALVYRO Korean Pleated Slacks ✨\n\nনিখুঁত ড্র্যাপ, সফট ব্রিদেবল প্রিমিয়াম ফেব্রিক এবং এলিগ্যান্ট ডাবল প্লিট কাট। অফিস, ভার্সিটি বা ক্যাজুয়াল পার্টি—সব জায়গাতেই আপনি থাকবেন সবার চেয়ে এক ধাপ এগিয়ে।\n\n✦ ১০০% প্রিমিয়াম ফেব্রিক গ্যারান্টি\n✦ সারা দেশে ক্যাশ অন ডেলিভারি (বাংলাদেশ)\n✦ সাইজ সমস্যা হলে ৭ দিনে সহজ এক্সচেঞ্জ\n\n👉 স্টক দ্রুত শেষ হচ্ছে! এখনই আপনার সাইজে অর্ডার করুন:\n[আপনার ওয়েবসাইটের লিঙ্ক]"\n\n💡 **টার্গেটিং গাইড:** ঢাকা, চট্টগ্রাম, সিলেটের ১৮-৩৪ বছর বয়সী পুরুষদের টার্গেট করে ফেসবুক ও ইনস্টাগ্রাম রিলস চালান।`;
    }
    return `📊 **আলভিরো বিজনেস অপ্টিমাইজেশন সামারি:**\n- **মোট অর্ডার:** ${totalOrd}টি | **মোট রেভিনিউ:** ৳${rev.toLocaleString()}\n- **টপ ডিমান্ডিং প্রোডাক্ট:** কোরিয়ান প্লিটেড প্যান্ট ও ২২০ জিএসএম পোলো শার্ট।\n- **পরামর্শ:** আসন্ন উৎসব ও সিজনের জন্য নিউট্রাল আর্থি শেডস (অলিভ, চকোলেট, বেজ) বেশি স্টক করুন। বিকাশে অগ্রিম ডেলিভারি চার্জ নিশ্চিত রাখলে কোনো কুরিয়ার লস হবে না।`;
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onTriggerToast('টেক্সট ক্লিপবোর্ডে কপি হয়েছে!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 rounded-3xl border border-emerald-900/40 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ALVYRO AI Business Strategist & Co-Pilot</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
            কৃত্রিম বুদ্ধিমত্তা সম্পন্ন বিজনেস অ্যাডভাইজার
          </h3>
          <p className="text-xs text-stone-300 mt-0.5 max-w-2xl font-light">
            সেলস বৃদ্ধি, ইনভেন্টরি রিস্টক প্ল্যানিং, মেটা বিজ্ঞাপনের কপি তৈরি এবং ক্যাশ অন ডেলিভারি ঝুঁকি কমাতে সাহায্য করে।
          </p>
        </div>

        {/* Quick KPI Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white/10 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-stone-400 uppercase block font-mono">মোট সেলস</span>
            <span className="text-base font-mono font-bold text-[#d4af37]">৳{totalRevenue.toLocaleString()}</span>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-stone-400 uppercase block font-mono">অর্ডার সংখ্যা</span>
            <span className="text-base font-mono font-bold text-white">{orders.length}</span>
          </div>
        </div>
      </div>

      {/* Suggested 1-Click Prompt Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          💡 দ্রুত বিশ্লেষণ করতে নিচের যেকোনো বিষয়ে ক্লিক করুন:
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '📊 সম্পূর্ণ বিজনেসের পারফরম্যান্স অডিট', query: 'আমার বর্তমান শপের সেলস ও অর্ডারের সার্বিক বিশ্লেষণ এবং গ্রোথ স্ট্র্যাটেজি দাও।' },
            { label: '🛡️ ক্যাশ অন ডেলিভারিতে রিটার্ন কমানোর উপায়', query: 'ক্যাশ অন ডেলিভারিতে কুরিয়ার রিটার্ন ক্ষতি ৮০% কমানোর সুনির্দিষ্ট উপায় কী?' },
            { label: '📦 কোন প্রোডাক্ট রিস্টক করা দরকার?', query: 'বর্তমান ট্রেন্ড অনুযায়ী আমার কোন প্রোডাক্টের স্টক বাড়ানো উচিত?' },
            { label: '📣 কোরিয়ান প্যান্টের ভাইরাল ফেসবুক অ্যাড কপি', query: 'আলভিরো কোরিয়ান প্লিটেড প্যান্টের জন্য একটি আকর্ষণীয় ফেসবুক অ্যাড কপি লিখে দাও।' },
            { label: '🎯 এভারেজ অর্ডার ভ্যালু (AOV) বাড়ানোর কৌশল', query: 'কাস্টমারদের একসাথে ২-৩টি পোশাক কেনানোর বান্ডেল অফার কীভাবে তৈরি করব?' }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(item.query)}
              className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center space-x-1.5"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-3 h-3 text-stone-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chat Window */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col h-[520px]">
        {/* Chat History Header */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-emerald-700" />
            <span>ALVYRO AI Advisor কনভার্সেশন</span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">Gemini 3.8 Flash Powered</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  isUser ? 'bg-amber-600 text-white' : 'bg-stone-900 text-[#d4af37]'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 relative group shadow-xs ${
                  isUser 
                    ? 'bg-amber-600 text-white rounded-tr-none' 
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none whitespace-pre-line'
                }`}>
                  <div>{msg.text}</div>
                  <div className={`flex items-center justify-between text-[10px] pt-1 ${
                    isUser ? 'text-amber-200' : 'text-stone-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="text-stone-400 hover:text-stone-700 flex items-center space-x-1 cursor-pointer"
                        title="কপি করুন"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'কপি হয়েছে' : 'কপি'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-stone-500 p-3 bg-white rounded-2xl border border-stone-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>AI আপনার বিজনেসের ডাটা বিশ্লেষণ করে উত্তর তৈরি করছে...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-stone-200 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="আপনার প্রশ্নটি লিখুন (যেমন: কীভাবে আজকের সেলস বাড়াব?)..."
            className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:bg-white focus:border-emerald-600"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
          >
            <span>পাঠান</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
