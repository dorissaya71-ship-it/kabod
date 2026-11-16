import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Plus, 
  Heart, 
  Lock, 
  Globe, 
  Sparkles, 
  Send, 
  X, 
  CheckCircle2, 
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function PrayerTab({ prayers, onAddPrayer, onPrayForRequest, userName }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [authorName, setAuthorName] = useState(userName || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('Healing & Strength');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const categories = [
    'All',
    'Healing & Strength',
    'Guidance & Career',
    'Thanksgiving & Praise',
    'Family & Relationships',
    'Spiritual Growth'
  ];

  const filteredPrayers = prayers.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    onAddPrayer({
      id: `pr-${Date.now()}`,
      author: isAnonymous ? 'Anonymous Believer' : (authorName.trim() || 'Church Member'),
      time: 'Just now',
      category: category,
      request: requestText.trim(),
      prayerCount: 1,
      hasPrayed: true,
      isAnonymous: isAnonymous
    });

    setRequestText('');
    setIsModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <MessageSquareHeart className="w-4 h-4" />
            <span>Standing In The Gap Together</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 dark:text-white mt-1">
            Community Prayer Wall
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            "Carry each other’s burdens, and in this way you will fulfill the law of Christ."
          </p>
        </div>

        {/* Submit Request Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Post Prayer Request</span>
        </button>
      </div>

      {/* Encouragement Stats Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block font-cinzel">
              Over 280 Prayers Interceded This Week
            </span>
            <span className="text-slate-600 dark:text-slate-300 text-xs">
              Our intercessory ministry team also prays daily for every submitted petition.
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-amber-700 dark:text-amber-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Safe & Respectful Space</span>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prayer Request Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-500/40 shadow-sm flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {prayer.category}
                </span>

                <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{prayer.time}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                "{prayer.request}"
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                  {prayer.isAnonymous ? <Lock className="w-3.5 h-3.5" /> : prayer.author.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {prayer.author}
                </span>
              </div>

              {/* Pray Button with Heart */}
              <button
                onClick={() => onPrayForRequest(prayer.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
                  prayer.hasPrayed
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${prayer.hasPrayed ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{prayer.hasPrayed ? 'Prayed' : 'I Prayed'}</span>
                <span className="ml-1 px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 rounded-full text-[10px]">
                  {prayer.prayerCount}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Submitting Prayer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-amber-500 text-white">
                  <MessageSquareHeart className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-cinzel text-slate-900 dark:text-white">
                  Share Prayer Request
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>Healing & Strength</option>
                  <option>Guidance & Career</option>
                  <option>Thanksgiving & Praise</option>
                  <option>Family & Relationships</option>
                  <option>Spiritual Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Prayer Need or Thanksgiving
                </label>
                <textarea
                  required
                  rows={4}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="Share what is on your heart... How can we pray with you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Post Anonymously
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hide your name on the public community wall
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name (or Initials)
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Grace M."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-semibold">Your prayer request has been shared with the community!</span>
        </div>
      )}

    </div>
  );
}
