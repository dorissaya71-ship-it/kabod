import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Heart, 
  Compass, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  X,
  BellRing,
  Church
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function OnboardingModal({ isOpen, onClose, onComplete, initialUserName }) {
  const { theme, setTheme } = useTheme();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialUserName || 'Beloved Friend');
  const [journeyGoal, setJourneyGoal] = useState('growth');
  const [worshipPreference, setWorshipPreference] = useState('hybrid');
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  if (!isOpen) return null;

  const handleFinish = () => {
    localStorage.setItem('kabod-onboarding-completed', 'true');
    localStorage.setItem('kabod-user-name', name);
    localStorage.setItem('kabod-user-goal', journeyGoal);
    onComplete({ name, journeyGoal, worshipPreference, remindersEnabled });
    onClose();
  };

  const steps = [
    { title: 'Welcome', subtitle: 'Step 1 of 4' },
    { title: 'Your Journey', subtitle: 'Step 2 of 4' },
    { title: 'Theme & Flow', subtitle: 'Step 3 of 4' },
    { title: 'Ready', subtitle: 'Step 4 of 4' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Top Header Glow Banner */}
        <div className="h-3 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-700" />

        {/* Close / Skip button */}
        <div className="flex justify-between items-center px-6 pt-5 pb-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 font-bold text-sm">
              {step}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {steps[step - 1].subtitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-medium flex items-center gap-1 transition"
          >
            Skip for now
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="px-6 py-4">
          
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="text-center space-y-4 py-2">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 dark:from-amber-600 dark:to-amber-400 p-0.5 shadow-glow flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-slate-900 dark:text-white tracking-wide">
                  Welcome to KABOD
                </h2>
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-1">
                  Experiencing God's Glory & Building Community
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                "Kabod" reflects the tangible presence, honor, and beauty of God. We are so blessed to walk alongside you in your spiritual walk, daily reflections, and community connection.
              </p>

              <div className="pt-2">
                <label className="block text-left text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  What is your first name?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Grace, David, or Sarah"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition text-sm font-medium"
                />
              </div>
            </div>
          )}

          {/* STEP 2: SPIRITUAL JOURNEY */}
          {step === 2 && (
            <div className="space-y-4 py-2">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-cinzel">
                  What brings you here today?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select your primary focus so we can personalize your experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'growth',
                    icon: BookOpen,
                    label: 'Spiritual Growth',
                    desc: 'Daily devotionals, scriptures & prayers',
                  },
                  {
                    id: 'community',
                    icon: Users,
                    label: 'Christian Fellowship',
                    desc: 'Connect groups, prayer wall & events',
                  },
                  {
                    id: 'seeking',
                    icon: Compass,
                    label: 'Exploring Faith',
                    desc: 'New believer guides & supportive answers',
                  },
                  {
                    id: 'serve',
                    icon: Heart,
                    label: 'Serving & Ministry',
                    desc: 'Volunteer teams, outreach & mission',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = journeyGoal === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setJourneyGoal(item.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-500" />}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: THEME & NOTIFICATIONS */}
          {step === 3 && (
            <div className="space-y-5 py-2">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-cinzel">
                  Choose Your Preferred Atmosphere
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enjoy our peaceful Day Light mode or gentle Midnight Sanctuary mode.
                </p>
              </div>

              {/* Light / Dark Mode Selector */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                    theme === 'light'
                      ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-md ring-2 ring-amber-300'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
                    <Sun className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">Light Sanctuary</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Crisp, clean & uplifting</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                    theme === 'dark'
                      ? 'border-amber-400 bg-slate-950 text-white shadow-glow ring-2 ring-amber-500/40'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 mb-2">
                    <Moon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">Dark Radiance</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Easy on the eyes at night</span>
                </button>
              </div>

              {/* Worship mode preference */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Daily Devotional Alert
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Receive inspiring scripture reflections every morning
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={remindersEnabled}
                  onChange={(e) => setRemindersEnabled(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 4: READY & BLESSING */}
          {step === 4 && (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold font-cinzel text-slate-900 dark:text-white">
                  You are all set, {name || 'Friend'}!
                </h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mt-1">
                  May Grace & Peace Multiply Unto You
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs md:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you; the Lord turn His face toward you and give you peace."
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600 dark:text-slate-400 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="block font-bold text-slate-800 dark:text-slate-200">Mode</span>
                  {theme === 'dark' ? 'Dark Radiance' : 'Light Sanctuary'}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="block font-bold text-slate-800 dark:text-slate-200">Sermons</span>
                  On-Demand
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="block font-bold text-slate-800 dark:text-slate-200">Prayer Wall</span>
                  Open 24/7
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-sm flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md flex items-center gap-2 transition"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm shadow-md flex items-center gap-2 transition"
            >
              Enter Sanctuary
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
