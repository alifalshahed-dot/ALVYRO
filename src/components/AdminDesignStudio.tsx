import React, { useState } from 'react';
import { Palette, Sparkles, Check, Image, RefreshCw, Eye, Save, DollarSign, Shield, MapPin } from 'lucide-react';
import { ThemeConfig } from '../types';

interface AdminDesignStudioProps {
  themeConfig: ThemeConfig;
  onSaveTheme: (newConfig: ThemeConfig) => void;
}

const PRESET_THEMES = [
  {
    id: 'emerald-noir',
    name: 'ALVYRO Emerald Noir (Logo Match)',
    desc: 'Deep forest green from official logo with champagne gold accents',
    bgColor: '#06251b',
    cardBgColor: '#093427',
    accentColor: '#d4af37',
    textColor: '#f7f4ed',
    previewBadge: 'Official Brand'
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian & Gold Luxe',
    desc: 'Midnight jet-black with warm gold highlights',
    bgColor: '#0c0a09',
    cardBgColor: '#1c1917',
    accentColor: '#eab308',
    textColor: '#fafaf9',
    previewBadge: 'High Contrast'
  },
  {
    id: 'midnight-navy',
    name: 'Royal Midnight Atelier',
    desc: 'Deep oceanic navy with crisp ivory & platinum gold',
    bgColor: '#071526',
    cardBgColor: '#0d223a',
    accentColor: '#38bdf8',
    textColor: '#f8fafc',
    previewBadge: 'Executive'
  },
  {
    id: 'alabaster-light',
    name: 'Alabaster Minimalist (Light Mode)',
    desc: 'Clean warm ivory canvas with deep emerald typography',
    bgColor: '#faf8f5',
    cardBgColor: '#ffffff',
    accentColor: '#06251b',
    textColor: '#1c1917',
    previewBadge: 'Editorial'
  }
];

export const AdminDesignStudio: React.FC<AdminDesignStudioProps> = ({
  themeConfig,
  onSaveTheme
}) => {
  const [formData, setFormData] = useState<ThemeConfig>({ ...themeConfig });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleApplyPreset = (preset: typeof PRESET_THEMES[0]) => {
    setFormData((prev) => ({
      ...prev,
      preset: preset.id as any,
      bgColor: preset.bgColor,
      cardBgColor: preset.cardBgColor,
      accentColor: preset.accentColor,
      textColor: preset.textColor
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveTheme(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToLogoDefault = () => {
    const defaultEmerald: ThemeConfig = {
      preset: 'emerald-noir',
      bgColor: '#06251b',
      cardBgColor: '#093427',
      accentColor: '#d4af37',
      textColor: '#f7f4ed',
      logoUrl: '/assets/aistudio/IMG_3038_704859ab.jpeg',
      brandName: 'ALVYRO',
      brandLocation: 'BANGLADESH',
      heroHeadline: 'Contemporary Menswear & Tailored Streetwear',
      heroSubheadline: 'Handcrafted heavyweight combed knitwear and fluid-draped Korean pleated trousers engineered for modern elegance.',
      announcementText: 'ALVYRO ATELIER • BANGLADESH | Free Shipping on orders over ৳2,000 | bKash Advance Delivery Available',
      requireAdvanceDeliveryFee: true,
      insideCtgDelivery: 70,
      outsideCtgDelivery: 130
    };
    setFormData(defaultEmerald);
    onSaveTheme(defaultEmerald);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Palette className="w-4 h-4 text-emerald-600" />
            <span>Website Design & Visual Customizer</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            রিয়েল-টাইম ওয়েবসাইট ডিজাইন ও ব্র্যান্ডিং স্টুডিও
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            এখান থেকে ব্যাকগ্রাউন্ড কালার, লোগো, ব্যানার, ডেলিভারি চার্জ এবং পুরো ওয়েবসাইটের লুক সরাসরি পরিবর্তন করুন।
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleResetToLogoDefault}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
            <span>লোগো কালারে রিসেট</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>সেভ ও অ্যাপ্লাই করুন</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center space-x-2 animate-fadeIn shadow-sm">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>ওয়েবসাইট ডিজাইন ও সেটিংস সফলভাবে আপডেট ও সেভ হয়েছে! পুরো ওয়েবসাইটে পরিবর্তন কার্যকর হয়েছে।</span>
        </div>
      )}

      {/* Preset Color Themes */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
          ১. থিম প্যালেট নির্বাচন করুন (১-ক্লিকে পুরো ওয়েবসাইটের কালার পরিবর্তন):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PRESET_THEMES.map((preset) => {
            const isSelected = formData.preset === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/30'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono">
                      {preset.previewBadge}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">{preset.name}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{preset.desc}</p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg shadow-inner border border-stone-300" style={{ backgroundColor: preset.bgColor }} title="Main BG" />
                  <div className="w-6 h-6 rounded-lg shadow-inner border border-stone-300" style={{ backgroundColor: preset.cardBgColor }} title="Card BG" />
                  <div className="w-6 h-6 rounded-lg shadow-inner border border-stone-300" style={{ backgroundColor: preset.accentColor }} title="Accent" />
                  <span className="text-[10px] font-mono text-stone-500 ml-1">{preset.bgColor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Color Pickers */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center space-x-2">
          <span>২. কাস্টম কালার কন্ট্রোল (Custom Hex Codes)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              ওয়েবসাইট ব্যাকগ্রাউন্ড:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.bgColor}
                onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300 p-0.5"
              />
              <input
                type="text"
                value={formData.bgColor}
                onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-stone-300 rounded-xl font-mono text-xs font-bold text-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              কার্ড ও সেকশন ব্যাকগ্রাউন্ড:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.cardBgColor}
                onChange={(e) => setFormData({ ...formData, cardBgColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300 p-0.5"
              />
              <input
                type="text"
                value={formData.cardBgColor}
                onChange={(e) => setFormData({ ...formData, cardBgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-stone-300 rounded-xl font-mono text-xs font-bold text-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              গোল্ড / ব্র্যান্ড অ্যাকসেন্ট কালার:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300 p-0.5"
              />
              <input
                type="text"
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-stone-300 rounded-xl font-mono text-xs font-bold text-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              টেক্সট ও ফন্ট কালার:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300 p-0.5"
              />
              <input
                type="text"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-stone-300 rounded-xl font-mono text-xs font-bold text-stone-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Identity & Logo Settings */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-5">
        <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
          ৩. ব্র্যান্ড আইডেন্টিটি, লোগো ও লোকেশন (ALVYRO - BANGLADESH)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              ব্র্যান্ডের লোগো ইমেজ পাথ / URL:
            </label>
            <input
              type="text"
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-xs text-stone-800"
            />
            <span className="text-[11px] text-stone-500 mt-1 block">
              আপলোড করা লোগো: <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">/assets/aistudio/IMG_3038_704859ab.jpeg</code>
            </span>

            {/* Logo Preview */}
            <div className="mt-3 p-3 rounded-2xl bg-[#06251b] border border-[#17543f] flex items-center justify-between">
              <span className="text-[11px] text-[#a3b899] font-bold">লোগো প্রিভিউ:</span>
              <img
                src={formData.logoUrl}
                alt="ALVYRO Logo"
                className="h-10 w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                ব্র্যান্ডের নাম:
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-sm text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                লোকেশন (Location):
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.brandLocation}
                  onChange={(e) => setFormData({ ...formData, brandLocation: e.target.value })}
                  placeholder="BANGLADESH"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-sm text-stone-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Headline & Announcement Settings */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
          ৪. ব্যানার ও অ্যানাউন্সমেন্ট টেক্সট
        </h4>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">টপ অ্যানাউন্সমেন্ট বার টেক্সট:</label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">হিরো ব্যানার হেডলাইন:</label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">হিরো ব্যানার সাবহেডলাইন:</label>
            <textarea
              rows={2}
              value={formData.heroSubheadline}
              onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Delivery & bKash Advance Fee Settings */}
      <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
          ৫. ডেলিভারি চার্জ ও বিকাশ অগ্রিম পলিসি (Delivery Fees & bKash Policy)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">চট্টগ্রাম সিটির ভেতরে চার্জ (৳):</label>
            <input
              type="number"
              value={formData.insideCtgDelivery}
              onChange={(e) => setFormData({ ...formData, insideCtgDelivery: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold text-stone-900"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">সারা দেশে ডেলিভারি চার্জ (৳):</label>
            <input
              type="number"
              value={formData.outsideCtgDelivery}
              onChange={(e) => setFormData({ ...formData, outsideCtgDelivery: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold text-stone-900"
            />
          </div>

          <div className="flex flex-col justify-end">
            <label className="font-bold text-stone-700 mb-2 block">বিকাশ অগ্রিম ডেলিভারি চার্জ:</label>
            <label className="flex items-center space-x-2 cursor-pointer bg-pink-50 p-2.5 rounded-xl border border-pink-200">
              <input
                type="checkbox"
                checked={formData.requireAdvanceDeliveryFee}
                onChange={(e) => setFormData({ ...formData, requireAdvanceDeliveryFee: e.target.checked })}
                className="rounded text-[#e2136e] focus:ring-[#e2136e] w-4 h-4"
              />
              <span className="text-[11px] font-bold text-pink-900">
                অর্ডারে অগ্রিম চার্জ রিকমেন্ড করুন
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Live Preview & Final Save Bar */}
      <div className="p-6 bg-gradient-to-r from-stone-900 to-emerald-950 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>ডিজাইন তৈরি সম্পন্ন?</span>
          </h4>
          <p className="text-xs text-stone-300 mt-0.5">
            নিচে ক্লিক করলেই আপনার কাস্টম ডিজাইন লাইভ ওয়েবসাইটে সরাসরি দেখতে পাবেন।
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-7 py-3.5 bg-[#d4af37] hover:bg-[#c29d2b] text-[#06251b] font-bold uppercase tracking-wider text-xs rounded-2xl shadow-lg transition-all cursor-pointer flex items-center space-x-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>সেভ ও লাইভ দেখুন</span>
        </button>
      </div>
    </div>
  );
};
