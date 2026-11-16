import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Heart, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Calendar, 
  Check, 
  Sparkles,
  MessageCircle,
  Clock
} from 'lucide-react';

export default function DevotionalTab({ devotionals, onToggleBookmark, onLikeDevotional }) {
  const [selectedId, setSelectedId] = useState(devotionals[0]?.id || 'dev-1');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [savedNotes, setSavedNotes] = useState({});
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);

  const activeDev = devotionals.find((d) => d.id === selectedId) || devotionals[0];

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Daily Devotional: "${activeDev.title}" - ${activeDev.scriptureReference}\n"${activeDev.scriptureText}"\nShared via Kabod Ministry App`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    if (!userNote.trim()) return;
    setSavedNotes((prev) => ({
      ...prev,
      [activeDev.id]: [...(prev[activeDev.id] || []), { text: userNote, date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    }));
    setUserNote('');
    setSavedNoteSuccess(true);
    setTimeout(() => setSavedNoteSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <BookOpen className="w-4 h-4" />
            <span>Daily Spiritual Nourishment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 dark:text-white mt-1">
            Kabod Devotional
          </h2>
        </div>

        {/* Date Selector Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {devotionals.map((dev) => (
            <button
              key={dev.id}
              onClick={() => {
                setSelectedId(dev.id);
                setIsPlayingAudio(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedId === dev.id
                  ? 'bg-amber-500 text-white shadow-glow'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {dev.date.split('•')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Devotional Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Title & Metadata */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {activeDev.theme}
            </span>
            <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeDev.readTime}
              </span>
              <span>&bull;</span>
              <span>{activeDev.date}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cinzel text-slate-900 dark:text-white leading-tight">
            {activeDev.title}
          </h1>

          {/* Action Bar (Audio, Bookmark, Share, Like) */}
          <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white shadow-glow'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Pause Narration' : `Audio Listen (${activeDev.audioMinutes})`}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(activeDev.id)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
            >
              {activeDev.isBookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmark</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => onLikeDevotional(activeDev.id)}
              className="ml-auto px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-rose-500 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>{activeDev.likesCount}</span>
            </button>
          </div>
        </div>

        {/* Audio Player Strip (if playing) */}
        {isPlayingAudio && (
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex flex-col gap-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-semibold">
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 animate-pulse" />
                Narrating: {activeDev.title}
              </span>
              <span>1:24 / {activeDev.audioMinutes}</span>
            </div>
            {/* Mock playback bar */}
            <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-1/3 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {/* Scripture Anchor Block */}
        <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-slate-800/60 border border-amber-300/30 dark:border-amber-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400">
              Scripture Foundation
            </span>
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200 font-cinzel">
              {activeDev.scriptureReference}
            </span>
          </div>
          <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 italic leading-relaxed">
            "{activeDev.scriptureText}"
          </p>
        </div>

        {/* Deep Reflection Article */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-cinzel text-slate-900 dark:text-white">
            Daily Reflection
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
            {activeDev.reflection}
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
            When we anchor our hearts in devotion each morning, we build an internal fortress against anxiety. Remember that God's grace is not merely a theoretical doctrine; it is a living reality meant to sustain you through challenges, workplace stresses, and family responsibilities.
          </p>
        </div>

        {/* Daily Prayer Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-teal-500/10 border border-amber-400/30 dark:border-amber-500/20 space-y-2">
          <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-bold font-cinzel text-sm uppercase tracking-wide">
              Prayer for Today
            </h4>
          </div>
          <p className="text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
            "{activeDev.prayer}"
          </p>
        </div>

        {/* Personal Journal & Notes Section */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Personal Journal & Reflection Notes
              </h4>
            </div>
            {savedNoteSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Note saved!
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="What spoke to your heart from this passage today?"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
            />
            <button
              onClick={handleSaveNote}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition"
            >
              Save Note
            </button>
          </div>

          {/* Render user's saved notes */}
          {savedNotes[activeDev.id]?.length > 0 && (
            <div className="space-y-2 pt-2">
              {savedNotes[activeDev.id].map((note, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs flex justify-between items-start"
                >
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{note.text}</p>
                  <span className="text-slate-400 text-[10px] ml-2 shrink-0">{note.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
