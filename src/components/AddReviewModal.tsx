import React, { useState } from 'react';
import { X, Star, Upload, Image as ImageIcon, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

export interface UserReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  product: string;
  text: string;
  date: string;
  photoUrl?: string;
  verified: boolean;
}

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddReview: (review: UserReview) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  language,
  onAddReview
}) => {
  const isBn = language === 'bn';

  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('চট্টগ্রাম, বাংলাদেশ');
  const [product, setProduct] = useState('কোরিয়ান প্লিটেড ব্যাগি ট্রাউজার্স');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      city: city.trim() || 'চট্টগ্রাম, বাংলাদেশ',
      rating,
      product,
      text: text.trim(),
      date: isBn ? 'ভেরিফাইড কাস্টমার • এইমাত্র' : 'Verified Patron • Just now',
      photoUrl: photoPreview || undefined,
      verified: true
    };

    onAddReview(newRev);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setAuthor('');
      setText('');
      setPhotoPreview(null);
    }, 1800);
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
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold tracking-wide">
                {isBn ? 'গ্রাহক রিভিউ ও ছবি আপলোড' : 'Write a Review with Photo'}
              </h3>
              <p className="text-xs text-stone-400">
                {isBn ? 'আপনার কেনাকাটার বাস্তব অভিজ্ঞতা শেয়ার করুন' : 'Share your fit & experience with ALVYRO'}
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-serif font-bold text-stone-900">
                {isBn ? 'ধন্যবাদ! আপনার রিভিউটি প্রকাশিত হয়েছে।' : 'Thank you! Your review is published.'}
              </h4>
              <p className="text-xs text-stone-600">
                {isBn ? 'অন্যান্য ক্রেতাদের সঠিক পোশাক নির্বাচনে আপনার মতামত সাহায্য করবে।' : 'Your feedback helps other patrons make informed styling decisions.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isBn ? 'আপনার রেটিং দিন:' : 'Rating:'}
                </label>
                <div className="flex items-center space-x-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-2xl cursor-pointer transition-transform hover:scale-120"
                    >
                      <Star 
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= s 
                            ? 'text-amber-500 fill-amber-500' 
                            : 'text-stone-300'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-stone-700 text-sm">{rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Product Bought */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isBn ? 'ক্রয়কৃত পোশাক:' : 'Product Purchased:'}
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:outline-none focus:border-amber-600"
                >
                  <option value="কোরিয়ান প্লিটেড ওয়াইড-লেগ ব্যাগি ট্রাউজার্স">কোরিয়ান প্লিটেড ওয়াইড-লেগ ব্যাগি ট্রাউজার্স</option>
                  <option value="প্রিমিয়াম কম্বড কটন ড্রপ-শোল্ডার টি-শার্ট">প্রিমিয়াম কম্বড কটন ড্রপ-শোল্ডার টি-শার্ট</option>
                  <option value="ক্লাসিক পিকের কটন এক্সিকিউটিভ পোলো শার্ট">ক্লাসিক পিকের কটন এক্সিকিউটিভ পোলো শার্ট</option>
                  <option value="ব্রিদি লিনেন-কটন রিল্যাক্সড ক্যাজুয়াল শার্ট">ব্রিদি লিনেন-কটন রিল্যাক্সড ক্যাজুয়াল শার্ট</option>
                  <option value="টেইলর্ড ৪-ওয়ে স্ট্রেচ গ্যাবার্ডিন ফরমাল প্যান্ট">টেইলর্ড ৪-ওয়ে স্ট্রেচ গ্যাবার্ডিন ফরমাল প্যান্ট</option>
                </select>
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isBn ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Tanvir"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {isBn ? 'শহর / এলাকা:' : 'Location:'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. নাসিরাবাদ, চট্টগ্রাম"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isBn ? 'আপনার মতামত ও অভিজ্ঞতার বিবরণ *' : 'Your Review *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={isBn ? 'কাপড়ের মান, ফিটিং ও ডেলিভারি কেমন লেগেছে লিখুন...' : 'Describe fabric comfort, drape, and packaging...'}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Photo Upload (UGC) */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {isBn ? 'পোশাক পরা ছবি যুক্ত করুন (ঐচ্ছিক):' : 'Add Photo of Garment / Fit (Optional):'}
                </label>
                <div className="flex items-center space-x-3">
                  <label className="flex-1 border-2 border-dashed border-stone-300 hover:border-amber-600 p-3 rounded-2xl flex items-center justify-center space-x-2 cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors">
                    <Upload className="w-4 h-4 text-stone-500" />
                    <span className="font-semibold text-stone-700 text-xs">
                      {photoPreview ? (isBn ? 'ছবি পরিবর্তন করুন' : 'Change Photo') : (isBn ? 'গ্যালারি বা ক্যামেরা থেকে ছবি দিন' : 'Upload Wearing Photo')}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoSelect} 
                      className="hidden" 
                    />
                  </label>

                  {photoPreview && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-stone-300 shrink-0 relative group">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => { setPhotoPreview(null); setPhotoUrl(''); }}
                        className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  {isBn ? 'রিভিউ সাবমিট করুন' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
