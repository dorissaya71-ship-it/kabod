import React, { useState } from 'react';
import { 
  Tv, 
  Play, 
  Pause, 
  Volume2, 
  Search, 
  Clock, 
  User, 
  Tag, 
  Download, 
  Share2, 
  Check, 
  Bookmark,
  Sparkles,
  Headphones
} from 'lucide-react';

export default function SermonsTab({ sermons }) {
  const [activeSermon, setActiveSermon] = useState(sermons[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [downloaded, setDownloaded] = useState(false);

  const allTags = ['All', 'Faith', 'Hope', 'Resilience', 'Fellowship', 'Love', 'Peace', 'Trust'];

  const filteredSermons = sermons.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.series.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || s.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleDownloadNotes = () => {
    const notesContent = `KABOD MINISTRIES - SERMON STUDY OUTLINE\nTitle: ${activeSermon.title}\nSpeaker: ${activeSermon.speaker}\nSeries: ${activeSermon.series}\nDate: ${activeSermon.date}\n\nSummary:\n${activeSermon.description}\n\nKey Reflections:\n1. Stand strong in times of change.\n2. Embrace fellowship and prayer.\n3. Walk in daily obedience.`;
    const blob = new Blob([notesContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeSermon.title.replace(/\s+/g, '_')}_Study_Notes.txt`;
    a.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Tv className="w-4 h-4" />
            <span>Messages & Teachings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 dark:text-white mt-1">
            Sermon Sanctuary
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, pastors, series..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Featured Media Player Area */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        
        {/* Video / Audio Simulation Stage */}
        <div className="relative aspect-video sm:aspect-[21/9] bg-slate-950 overflow-hidden">
          <img
            src={activeSermon.thumbnail}
            alt={activeSermon.title}
            className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 opacity-40' : 'opacity-70'}`}
          />

          {/* Central Play/Pause Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-glow-lg transition transform hover:scale-110 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-slate-950" />
              ) : (
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              )}
            </button>

            <div className="mt-4 max-w-lg">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold mb-2">
                {activeSermon.series}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-cinzel text-white drop-shadow-md">
                {activeSermon.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                {activeSermon.speaker} &bull; {activeSermon.date}
              </p>
            </div>
          </div>

          {/* Bottom Player Controller Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
            {/* Progress line */}
            <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div className={`bg-amber-400 h-full rounded-full transition-all ${isPlaying ? 'w-1/2' : 'w-1/6'}`} />
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center space-x-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-amber-400 transition">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span>{isPlaying ? '18:40' : '00:00'} / {activeSermon.duration}</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md">
                  <Headphones className="w-3 h-3" /> Stereo Audio
                </span>
              </div>

              {/* Speed toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSpeed(s => s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1)}
                  className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-xs font-mono font-bold"
                >
                  {speed}x
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sermon Details & Notes download bar */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-cinzel">
              About This Message
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {activeSermon.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadNotes}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-200" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? 'Notes Downloaded' : 'Download Study Notes'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Filter by Topic Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 shrink-0">Filter:</span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedTag === tag
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSermons.map((sermon) => {
          const isSelected = activeSermon.id === sermon.id;
          return (
            <div
              key={sermon.id}
              onClick={() => {
                setActiveSermon(sermon);
                setIsPlaying(true);
                window.scrollTo({ top: 100, behavior: 'smooth' });
              }}
              className={`rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border transition-all cursor-pointer group flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-400/30 shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono font-semibold">
                    {sermon.duration}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-bold">
                    <span>{sermon.series}</span>
                    <span className="text-slate-400 font-normal">{sermon.views} plays</span>
                  </div>

                  <h4 className="font-bold text-base font-cinzel text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-1">
                    {sermon.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {sermon.speaker} &bull; {sermon.date}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">
                    {sermon.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex flex-wrap gap-1 mt-2">
                {sermon.tags?.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
