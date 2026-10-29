import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';
import { Language } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, language }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;
  const isBn = language === 'bn';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && message) {
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setPhone('');
        setMessage('');
        setSubmitted(false);
      }, 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-wide">
                {isBn ? 'কন্টাক্ট আস ও হটলাইন' : 'Contact Us & Hotline'}
              </h3>
              <p className="text-xs text-stone-300">
                {isBn ? `${STORE_INFO.nameBn} • ${STORE_INFO.addressBn}` : `${STORE_INFO.name} • ${STORE_INFO.address}`}
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs">
                <MapPin className="w-4 h-4" />
                <span>{isBn ? 'শোরুমের ঠিকানা:' : 'Store Location:'}</span>
              </div>
              <p className="text-sm font-semibold text-stone-900">
                {STORE_INFO.landmarkBn}
              </p>
              <p className="text-xs text-stone-500">
                চট্টগ্রাম, বাংলাদেশ
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs">
                <Phone className="w-4 h-4" />
                <span>{isBn ? 'সরাসরি হটলাইন ও অর্ডার:' : 'Direct Hotline & Orders:'}</span>
              </div>
              <a 
                href={`tel:${STORE_INFO.phone}`} 
                className="text-lg font-mono font-bold text-stone-900 hover:text-amber-700 block"
              >
                {STORE_INFO.phoneDisplay}
              </a>
              <div className="flex items-center space-x-1 text-xs text-stone-500">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{isBn ? STORE_INFO.hoursBn : STORE_INFO.hoursEn}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">
                  {isBn ? 'হোয়াটসঅ্যাপে দ্রুত মেসেজ দিন' : 'Instant WhatsApp Assistance'}
                </h4>
                <p className="text-xs text-emerald-800">
                  {isBn ? 'সাইজ বা প্রোডাক্টের ছবি দেখতে সরাসরি চ্যাট করুন' : 'Chat directly with our Chittagong store team'}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20ALIF%20SHOP,%20I%20want%20to%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              {isBn ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Us'}
            </a>
          </div>

          {/* Official Online Payment Details */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2 text-pink-900 font-bold text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-600"></span>
                <span>{isBn ? 'অফিশিয়াল বিকাশ পার্সোনাল নম্বর:' : 'Official bKash Personal Number:'}</span>
              </div>
              <div className="text-xl font-mono font-bold text-stone-900 mt-0.5">
                01870023718
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                {isBn 
                  ? 'পার্সোনাল নম্বর (Send Money / সেন্ড মানি)। পেমেন্ট পাঠিয়ে TrxID দিন।' 
                  : 'Personal Account (Send Money). Please provide TrxID after transfer.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('01870023718');
              }}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 active:scale-95 cursor-pointer"
            >
              {isBn ? 'নম্বর কপি করুন' : 'Copy Number'}
            </button>
          </div>

          {/* Send Message Form */}
          <div className="pt-2">
            <h4 className="font-serif font-bold text-stone-900 text-base mb-3">
              {isBn ? 'মেসেজ বা পরামর্শ পাঠান' : 'Send an Inquiry / Feedback'}
            </h4>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center space-x-2 text-xs font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{isBn ? 'ধন্যবাদ! আপনার মেসেজটি গৃহীত হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করবো।' : 'Thank you! Your message has been received.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">{isBn ? 'আপনার নাম *' : 'Name *'}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alif"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">{isBn ? 'মোবাইল নম্বর *' : 'Phone *'}</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="018••••••••"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">{isBn ? 'আপনার বার্তা *' : 'Message *'}</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isBn ? 'পোশাকের মাপ, অর্ডার বা যেকোনো জিজ্ঞাসা লিখুন...' : 'Write your inquiry here...'}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2"
                >
                  <span>{isBn ? 'মেসেজ পাঠান' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
