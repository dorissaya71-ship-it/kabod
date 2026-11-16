import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Volume2, 
  VolumeX, 
  Heart, 
  Calendar, 
  ArrowRight, 
  Clock, 
  Radio, 
  Tv, 
  Share2, 
  BookOpen, 
  Check, 
  HeartHandshake,
  MessageSquareHeart,
  Users
} from 'lucide-react';

export default function HomeTab({ 
  userName, 
  onNavigate, 
  todayDevotional, 
  upcomingEvent, 
  latestSermon,
  onPrayForRequest
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedVerse, setCopiedVerse] = useState(false);
  const [likedVerse, setLikedVerse] = useState(false);

  // Time based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleCopyVerse = () => {
    navigator.clipboard.writeText(`"${todayDevotional.scriptureText}" - ${todayDevotional.scriptureReference}`);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kabod Sanctuary &bull; Presence &bull; Power</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel leading-tight">
            {getGreeting()}, <br className="hidden sm:inline" />
            <span className="text-amber-200">{userName || 'Beloved'}</span>
          </h1>

          <p className="mt-3 text-amber-100/90 text-sm sm:text-base leading-relaxed">
            "May the Lord cause His face to shine upon you today and bestow you with peace that surpasses all understanding."
          </p>

          {/* Quick Hero Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('sermons')}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-amber-100 transition flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              <span>Watch Sunday Message</span>
            </button>
            <button
              onClick={() => onNavigate('prayers')}
              className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm transition border border-white/30 flex items-center space-x-2"
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>Submit Prayer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Daily Bread', desc: 'Today’s devotional', icon: BookOpen, tab: 'devotional', color: 'from-amber-500 to-amber-600' },
          { label: 'Watch Sermons', desc: 'Messages & series', icon: Tv, tab: 'sermons', color: 'from-blue-600 to-indigo-700' },
          { label: 'Prayer Wall', desc: 'Intercede together', icon: MessageSquareHeart, tab: 'prayers', color: 'from-rose-500 to-pink-600' },
          { label: 'Give Tithe', desc: 'Online stewardship', icon: HeartHandshake, tab: 'giving', color: 'from-emerald-600 to-teal-700' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              onClick={() => onNavigate(action.tab)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-lg transition text-left group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${action.color} text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                {action.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {action.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Verse of the Day Card */}
      <div className="rounded-3xl bg-amber-500/5 dark:bg-slate-900/80 border border-amber-300/40 dark:border-amber-500/20 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-glow">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Verse of the Day
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-cinzel">
                {todayDevotional.scriptureReference}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white border-amber-500 shadow-glow'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Pause Audio' : 'Listen'}</span>
            </button>
            <button
              onClick={handleCopyVerse}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              {copiedVerse ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedVerse ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={() => setLikedVerse(!likedVerse)}
              className={`p-2.5 rounded-xl border transition ${
                likedVerse
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-500'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${likedVerse ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        <blockquote className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed border-l-4 border-amber-500 pl-4 my-4">
          "{todayDevotional.scriptureText}"
        </blockquote>

        {isPlayingAudio && (
          <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-amber-300/40 dark:border-amber-500/20 mb-3 flex items-center space-x-3 text-xs text-amber-700 dark:text-amber-400 animate-pulse">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>Simulating audio recitation of today’s scripture reflection...</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 gap-2">
          <span>Theme: <strong className="text-amber-600 dark:text-amber-400 font-semibold">{todayDevotional.theme}</strong></span>
          <button
            onClick={() => onNavigate('devotional')}
            className="text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center gap-1 self-start sm:self-auto"
          >
            Read Today’s Full Devotional
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Two Column Section: Latest Message & Upcoming Event */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Latest Sermon Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Featured Sermon Series
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {latestSermon.duration}
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video mb-4 group cursor-pointer" onClick={() => onNavigate('sermons')}>
              <img
                src={latestSermon.thumbnail}
                alt={latestSermon.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold font-cinzel text-slate-900 dark:text-white">
              {latestSermon.title}
            </h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
              {latestSermon.speaker} &bull; {latestSermon.series}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
              {latestSermon.description}
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {latestSermon.views} community listeners
            </span>
            <button
              onClick={() => onNavigate('sermons')}
              className="text-amber-600 dark:text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
            >
              Watch Sermon Archive
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Upcoming Ministry Gathering */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Next Fellowship Gathering
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                RSVP Open
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video mb-4">
              <img
                src={upcomingEvent.banner}
                alt={upcomingEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-amber-600 dark:text-amber-400">
                {upcomingEvent.category}
              </div>
            </div>

            <h3 className="text-xl font-bold font-cinzel text-slate-900 dark:text-white">
              {upcomingEvent.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {upcomingEvent.date}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              {upcomingEvent.description}
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {upcomingEvent.rsvpCount} members attending
            </span>
            <button
              onClick={() => onNavigate('events')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition"
            >
              View & RSVP
            </button>
          </div>
        </div>

      </div>

      {/* Community Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-teal-500/10 border border-amber-300/30 dark:border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-glow">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white font-cinzel text-base">
              Find Your Spiritual Family
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Join a weekly home cell, youth fellowship, or creative volunteer team.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('connect')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition whitespace-nowrap shadow-md"
        >
          Explore Ministries
        </button>
      </div>

    </div>
  );
}
