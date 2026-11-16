import React from 'react';
import { 
  Sun, 
  Moon, 
  Radio, 
  HeartHandshake, 
  BookOpen, 
  Tv, 
  Calendar, 
  Users, 
  Sparkles,
  HelpCircle,
  Home,
  MessageSquareHeart,
  Settings
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, setActiveTab, onOpenOnboarding, onOpenSettings, userName }) {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'devotional', label: 'Daily Bread', icon: BookOpen },
    { id: 'sermons', label: 'Sermons', icon: Tv },
    { id: 'prayers', label: 'Prayer Wall', icon: MessageSquareHeart },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'giving', label: 'Giving', icon: HeartHandshake },
    { id: 'connect', label: 'Ministries', icon: Users },
  ];

  return (
    <>
      {/* Top Desktop & Tablet Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-amber-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-amber-950 dark:text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-cinzel text-xl md:text-2xl font-bold tracking-wider text-slate-900 dark:text-white">
                  KABOD
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md border border-amber-500/20">
                  MINISTRY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight hidden sm:block">
                Walking in Tangible Glory & Love
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5">
            {/* Live Indicator button */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Sanctuary Live</span>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Onboarding replay guide */}
            <button
              onClick={onOpenOnboarding}
              title="Welcome Tour / Onboarding"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Profile Avatar / Settings */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center">
                {userName ? userName.charAt(0).toUpperCase() : 'B'}
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline max-w-[80px] truncate">
                {userName || 'Friend'}
              </span>
              <Settings className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex justify-around items-center transition-colors">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold transition ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-amber-500/10 dark:bg-amber-400/10' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
        {/* More button to toggle Giving / Connect */}
        <button
          onClick={() => setActiveTab(activeTab === 'giving' ? 'connect' : 'giving')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold transition ${
            activeTab === 'giving' || activeTab === 'connect'
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'giving' || activeTab === 'connect' ? 'bg-amber-500/10' : ''}`}>
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="mt-0.5">{activeTab === 'giving' ? 'Giving' : 'Connect'}</span>
        </button>
      </div>
    </>
  );
}
