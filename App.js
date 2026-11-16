import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Share,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Animated,
  Easing,
  Switch,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translations } from './src/i18n';

const { width } = Dimensions.get('window');

// --- THEME PALETTES ---
const lightColors = {
  bg: '#F8F9FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardBorder: '#E5E7EB',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  accent: '#B45309',
  accentLight: '#FEF3C7',
  accentGlow: 'rgba(180, 83, 9, 0.12)',
  border: '#E2E8F0',
  tint: '#B45309',
  tabBar: '#FFFFFF',
  tabInactive: '#94A3B8',
  statusBadge: '#DC2626',
  bannerBg: '#78350F',
  chipBg: '#F1F5F9',
  inputBg: '#F8FAFC',
};

const darkColors = {
  bg: '#0A0F1D',
  surface: '#111827',
  card: '#162035',
  cardBorder: '#1F2E4D',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  accent: '#F59E0B',
  accentLight: '#2D2008',
  accentGlow: 'rgba(245, 158, 11, 0.25)',
  border: '#1F2E4D',
  tint: '#F59E0B',
  tabBar: '#0C1322',
  tabInactive: '#64748B',
  statusBadge: '#EF4444',
  bannerBg: '#1E293B',
  chipBg: '#1B263D',
  inputBg: '#0F172A',
};

// --- MOCK DATA ---
const initialDevotionals = [
  {
    id: 'dev-1',
    title: 'Advancing the Kingdom in Power',
    date: 'Today • 7:00 AM Devotional',
    theme: 'Kingdom Authority',
    scriptureReference: 'Matthew 6:33',
    scriptureText: 'Seek first the kingdom of God and His righteousness, and all these things shall be added to you.',
    reflection: 'When our primary focus aligns with advancing God\'s love across nations, everyday worries lose their grip. Divine supply always follows divine purpose.',
    prayer: 'Lord of All Nations, let Your kingdom come and Your will be done in my life, family, and community today.',
    readTime: '3 min read',
    audioDuration: '4:20',
    likesCount: 218,
    isBookmarked: false,
  },
  {
    id: 'dev-2',
    title: 'The Great Global Commission',
    date: 'Yesterday • 7:00 AM Devotional',
    theme: 'World Missions',
    scriptureReference: 'Mark 16:15',
    scriptureText: 'Go into all the world and proclaim the good news to every creature with unconditional compassion.',
    reflection: 'Missions is not just traveling across oceans; it begins by extending grace to your neighbor, coworker, and family member right where you stand.',
    prayer: 'Grant me a willing heart and open eyes to touch lives with Your eternal hope.',
    readTime: '4 min read',
    audioDuration: '5:10',
    likesCount: 164,
    isBookmarked: true,
  },
];

const initialSermons = [
  {
    id: 's-1',
    title: 'Global Awakening: Reaching Every Nation',
    speaker: 'Apostle Gabriel Vance',
    series: 'Kingdom Expansion 2026',
    duration: '46 min',
    date: 'Nov 15, 2026',
    platform: 'YouTube & Facebook Live',
    viewers: '2,840 live viewers',
    description: 'An apostolic teaching on believers walking in divine authority, spiritual boldness, and uniting the global church body.',
    plays: '3.4k',
    tags: ['Kingdom', 'Global Mission'],
  },
  {
    id: 's-2',
    title: 'Healing the Nations Through Compassion',
    speaker: 'Pastor Grace Adeleke',
    series: 'Living Kingdom Culture',
    duration: '39 min',
    date: 'Nov 8, 2026',
    platform: 'YouTube Live',
    viewers: '1,920 views',
    description: 'How genuine servant leadership and humanitarian relief break spiritual chains and reveal the true heart of God.',
    plays: '1.9k',
    tags: ['Compassion', 'Outreach'],
  },
  {
    id: 's-3',
    title: 'Overcoming the Wilderness with Faith',
    speaker: 'Minister David K.',
    series: 'Victory Worldwide',
    duration: '42 min',
    date: 'Nov 1, 2026',
    platform: 'Facebook Live',
    viewers: '2,810 views',
    description: 'Practical biblical principles for enduring trials with unwavering confidence in the King of Kings.',
    plays: '2.8k',
    tags: ['Faith', 'Perseverance'],
  },
];

const mockLiveChat = [
  { id: 'c-1', user: 'Hannah (Lagos)', message: 'Praising God with you all from Nigeria! 🔥', time: '1m ago' },
  { id: 'c-2', user: 'Marcus (London)', message: 'Amen! The message is speaking right to my spirit.', time: 'Just now' },
  { id: 'c-3', user: 'Sarah (Atlanta)', message: 'Hallelujah, glory to King Jesus! 🙌', time: 'Just now' },
];

const initialPrayers = [
  {
    id: 'p-1',
    author: 'Pastor Samuel (Nigeria Campus)',
    time: '1 hour ago',
    category: 'Global Missions',
    request: 'Praying for our new missionary school planting in West Africa. May God protect our team and touch unreached souls.',
    prayerCount: 76,
    hasPrayed: false,
    isAnonymous: false,
  },
  {
    id: 'p-2',
    author: 'Elena R. (London)',
    time: '3 hours ago',
    category: 'Healing & Strength',
    request: 'Please stand in faith with me for complete restoration and healing in my lungs. Believing for a divine testimony.',
    prayerCount: 52,
    hasPrayed: true,
    isAnonymous: false,
  },
  {
    id: 'p-3',
    author: 'Anonymous Believer',
    time: '6 hours ago',
    category: 'Family & Salvation',
    request: 'Praying for my estranged brother to return to faith and experience God\'s transforming forgiveness.',
    prayerCount: 94,
    hasPrayed: true,
    isAnonymous: true,
  },
];

const initialEvents = [
  {
    id: 'e-1',
    title: 'Holy Kingdom Global Worship Summit',
    date: 'This Sunday • 8:30 AM & 11:00 AM EST',
    location: 'YouTube / Facebook Live & Global Sanctuary',
    category: 'Worship Celebration',
    rsvpCount: 420,
    rsvpd: true,
  },
  {
    id: 'e-2',
    title: 'Worldwide 24-Hour Intercessory Prayer Vigil',
    date: 'Friday • 7:00 PM - Saturday 7:00 PM',
    location: 'Virtual Global Prayer Room & Campuses',
    category: 'Kingdom Intercession',
    rsvpCount: 310,
    rsvpd: false,
  },
  {
    id: 'e-3',
    title: 'International Relief & Food Outreach',
    date: 'Saturday, Nov 28 • 9:00 AM',
    location: 'Community Outposts & Mission Hubs',
    category: 'Mission Outreach',
    rsvpCount: 180,
    rsvpd: false,
  },
];

const globalRegions = [
  'Global Online Campus',
  'North America Mission',
  'Africa Regional Hub',
  'Europe & UK Mission',
  'Asia & Pacific Hub',
  'Latin America Mission',
];

const liveTickers = [
  '🔴 LIVE: 2,480 Believers praying right now across 68 nations',
  '✨ YouTube & Facebook Live broadcast active in 4 languages',
  '🌍 45,000+ souls reached through online broadcast this month',
  '🕊️ 24/7 Global Intercessory Watch currently active',
];

// --- WORSHIP MUSIC DATA ---
const worshipPlaylist = [
  { id: 'w-1', title: 'Great Are You Lord', artist: 'All Sons & Daughters', album: 'Live', duration: '5:12', lyrics: ['You give life, You are love\n', 'You bring light to the darkness\n', 'You give hope, You restore\n', 'Every heart that is broken\n', 'Great are You Lord\n', 'It\'s Your breath in our lungs\n', 'So we pour out our praise\n', 'Pour out our praise to You only\n'] },
  { id: 'w-2', title: 'Way Maker', artist: 'Sinach', album: 'Way Maker', duration: '6:30', lyrics: ['You are here, moving in our midst\n', 'I worship You, I worship You\n', 'You are here, working in this place\n', 'I worship You, I worship You\n', 'Way Maker, Miracle Worker\n', 'Promise Keeper, Light in the darkness\n', 'My God, that is who You are\n'] },
  { id: 'w-3', title: 'Goodness of God', artist: 'Bethel Music', album: 'Victory', duration: '5:50', lyrics: ['I love You, Lord\n', 'Oh Your mercy never fails me\n', 'All my days, I\'ve been held in Your hands\n', 'From the moment that I wake up\n', 'Until I lay my head\n', 'Oh I will sing of the goodness of God\n', 'All my life You have been faithful\n', 'All my life You have been so, so good\n'] },
  { id: 'w-4', title: 'Holy Spirit', artist: 'Francesca Battistelli', album: 'If We\'re Honest', duration: '4:48', lyrics: ['There\'s nothing worth more\n', 'That will ever come close\n', 'No thing can compare\n', 'You\'re our living hope\n', 'Your presence, Lord\n', 'Holy Spirit, You are welcome here\n', 'Come flood this place and fill the atmosphere\n', 'Your glory, God, is what our hearts long for\n'] },
  { id: 'w-5', title: 'Open Heaven', artist: 'Hillsong Worship', album: 'Open Heaven / River Wild', duration: '6:15', lyrics: ['Nothing like Your presence\n', 'Nothing like Your power\n', 'Open up the heavens\n', 'Lord, we want to see You\n', 'Lord, we want to see You\n', 'Send Your Holy Spirit\n', 'Moving through this atmosphere\n'] },
];

// --- SMALL GROUPS DATA ---
const mockGroups = [
  { id: 'g-1', name: 'Kingdom Builders Cell', leader: 'Deacon James A.', region: 'North America', meetTime: 'Wed 7PM EST', members: 24, joined: false },
  { id: 'g-2', name: 'Africa Intercessors', leader: 'Prophetess Ruth O.', region: 'Africa Hub', meetTime: 'Fri 6AM WAT', members: 38, joined: true },
  { id: 'g-3', name: 'Worship & Arts Collective', leader: 'Minister Lydia P.', region: 'Europe & UK', meetTime: 'Sat 3PM GMT', members: 17, joined: false },
  { id: 'g-4', name: 'Youth Fire Generation', leader: 'Evangelist Mark T.', region: 'Latin America', meetTime: 'Thu 7PM BOT', members: 52, joined: false },
  { id: 'g-5', name: 'Women of Valor', leader: 'Sis. Hannah C.', region: 'Asia & Pacific', meetTime: 'Tue 8AM SGT', members: 31, joined: true },
];

const mockMembers = [
  { id: 'm-1', name: 'Pastor Samuel O.', region: 'Africa Hub', joined: 'Jan 2023', initials: 'SO' },
  { id: 'm-2', name: 'Grace Emmanuel', region: 'North America', joined: 'Mar 2024', initials: 'GE' },
  { id: 'm-3', name: 'Marcus Obinna', region: 'Europe & UK', joined: 'Jul 2023', initials: 'MO' },
  { id: 'm-4', name: 'Elena Rivera', region: 'Latin America', joined: 'Nov 2024', initials: 'ER' },
  { id: 'm-5', name: 'Faith Okonkwo', region: 'Africa Hub', joined: 'Feb 2025', initials: 'FO' },
  { id: 'm-6', name: 'David Kwame', region: 'Asia & Pacific', joined: 'Aug 2024', initials: 'DK' },
];

// --- NOTIFICATION DATA ---
const initialNotifications = [
  { id: 'n-1', title: '7 AM Devotional Ready', body: 'Today\'s word: "Advancing the Kingdom in Power" is now available.', time: '6:58 AM', read: false, type: 'devotional' },
  { id: 'n-2', title: 'Prayer Response Received', body: 'Pastor Samuel responded to your prayer request. 42 believers prayed.', time: '2 hrs ago', read: false, type: 'prayer' },
  { id: 'n-3', title: 'Global Worship Summit Tomorrow', body: 'Don\'t forget! Worship Summit starts 8:30 AM & 11 AM EST this Sunday.', time: 'Yesterday', read: false, type: 'event' },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  // A) Splash screen
  const [showSplash, setShowSplash] = useState(true);
  const splashLogoScale = useRef(new Animated.Value(0.5)).current;
  const splashLogoOpacity = useRef(new Animated.Value(0)).current;
  const splashTextOpacity = useRef(new Animated.Value(0)).current;
  const splashBarWidth = useRef(new Animated.Value(0)).current;

  // Onboarding & Auth
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [authFullName, setAuthFullName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(globalRegions[0]);
  const [rememberMe, setRememberMe] = useState(true);

  // User Profile
  const [userName, setUserName] = useState('Kingdom Partner');
  const [userEmail, setUserEmail] = useState('member@holykingdom.org');
  const [userRegion, setUserRegion] = useState('Global Online Campus');

  // Notification Preferences
  const [devotionalReminder, setDevotionalReminder] = useState(true);
  const [serviceReminder, setServiceReminder] = useState(true);
  const [prayerWallAlerts, setPrayerWallAlerts] = useState(true);

  // C) Notifications
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationCount = notifications.filter((n) => !n.read).length;

  // Navigation & Data
  const [activeTab, setActiveTab] = useState('home');
  const [devotionals, setDevotionals] = useState(initialDevotionals);
  const [activeDevId, setActiveDevId] = useState('dev-1');
  const [isPlayingDevAudio, setIsPlayingDevAudio] = useState(false);

  const [sermons] = useState(initialSermons);
  const [activeSermon, setActiveSermon] = useState(initialSermons[0]);
  const [isPlayingSermon, setIsPlayingSermon] = useState(false);
  const [sermonSpeed, setSermonSpeed] = useState(1);
  const [liveStreamTab, setLiveStreamTab] = useState('video');
  const [chatMessages, setChatMessages] = useState(mockLiveChat);
  const [newChatMessage, setNewChatMessage] = useState('');

  // D) Sermon Notes
  const [sermonNotes, setSermonNotes] = useState({});
  const [sermonNoteInput, setSermonNoteInput] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const [prayers, setPrayers] = useState(initialPrayers);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);
  const [newPrayerText, setNewPrayerText] = useState('');
  const [newPrayerCat, setNewPrayerCat] = useState('Global Missions');
  const [newPrayerAnon, setNewPrayerAnon] = useState(false);

  const [events, setEvents] = useState(initialEvents);

  // Giving
  const [giveAmount, setGiveAmount] = useState('100');
  const [giveCategory, setGiveCategory] = useState('World Missions');
  const [givePaymentMethod, setGivePaymentMethod] = useState('Apple Pay / Google Pay');
  const [isRecurringGift, setIsRecurringGift] = useState(false);
  const [giveSuccessModal, setGiveSuccessModal] = useState(false);

  // Settings
  const [settingsOpen, setSettingsOpen] = useState(false);

  // G) Worship Music
  const [currentSong, setCurrentSong] = useState(worshipPlaylist[0]);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);
  const [musicProgress] = useState(new Animated.Value(0));

  // B) Groups
  const [groups, setGroups] = useState(mockGroups);
  const [memberSearch, setMemberSearch] = useState('');
  const [groupsTab, setGroupsTab] = useState('groups'); // 'groups' or 'directory'

  // Live Ticker
  const [tickerIndex, setTickerIndex] = useState(0);

  // --- ANIMATIONS ---
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Equalizer bars for music
  const bar1 = useRef(new Animated.Value(0.3)).current;
  const bar2 = useRef(new Animated.Value(0.7)).current;
  const bar3 = useRef(new Animated.Value(0.5)).current;
  const bar4 = useRef(new Animated.Value(0.9)).current;

  // A) Splash screen animation on mount
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(splashLogoScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(splashLogoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(splashTextOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(splashBarWidth, { toValue: 1, duration: 1200, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        setShowSplash(false);
        setShowOnboarding(true);
      }, 300);
    });
  }, []);

  // Onboarding breathing animation + ticker
  useEffect(() => {
    if (!showOnboarding) return;
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.9, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.4, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ]),
      ])
    ).start();

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
      setTickerIndex((prev) => (prev + 1) % liveTickers.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [showOnboarding]);

  // G) Equalizer animation while music plays
  useEffect(() => {
    if (!isPlayingMusic) return;
    const animBar = (anim, speed) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: speed, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.2, duration: speed, useNativeDriver: true }),
        ])
      );
    const a1 = animBar(bar1, 350);
    const a2 = animBar(bar2, 500);
    const a3 = animBar(bar3, 420);
    const a4 = animBar(bar4, 300);
    a1.start(); a2.start(); a3.start(); a4.start();
    return () => { a1.stop(); a2.stop(); a3.stop(); a4.stop(); };
  }, [isPlayingMusic]);

  const t = translations[language] || translations.en;
  const colors = isDarkMode ? darkColors : lightColors;
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Handle Login
  const handleLogin = () => {
    if (!authEmail.trim() || !authPassword.trim()) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }
    const derivedName = authEmail.split('@')[0];
    const capitalized = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    setUserName(capitalized);
    setUserEmail(authEmail);
    setIsLoggedIn(true);
    setIsCreatingAccount(false);
    setShowOnboarding(false);
  };

  const handleSignUp = () => {
    if (!authFullName.trim() || !authEmail.trim() || !authPassword.trim()) {
      Alert.alert('Required', 'Please enter your name, email, and password.');
      return;
    }
    setUserName(authFullName.trim());
    setUserEmail(authEmail.trim());
    setUserRegion(selectedRegion);
    setIsLoggedIn(true);
    setIsCreatingAccount(false);
    setShowOnboarding(false);
  };

  const handleContinueAsGuest = () => {
    setUserName('Guest Friend');
    setUserEmail('guest@holykingdom.org');
    setIsLoggedIn(false);
    setIsCreatingAccount(false);
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    setSettingsOpen(false);
    setIsLoggedIn(false);
    setIsCreatingAccount(false);
    setAuthPassword('');
    setShowOnboarding(true);
  };

  // Devotional Actions
  const activeDev = devotionals.find((d) => d.id === activeDevId) || devotionals[0];
  const toggleBookmark = (id) => {
    setDevotionals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isBookmarked: !d.isBookmarked } : d))
    );
  };
  const toggleLikeDevotional = (id) => {
    setDevotionals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, likesCount: d.likesCount + 1 } : d))
    );
  };

  // Prayer Actions
  const handlePrayFor = (id) => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextPrayed = !p.hasPrayed;
          return { ...p, hasPrayed: nextPrayed, prayerCount: nextPrayed ? p.prayerCount + 1 : p.prayerCount - 1 };
        }
        return p;
      })
    );
  };

  const handleCreatePrayer = () => {
    if (!newPrayerText.trim()) { Alert.alert('Please enter your prayer request.'); return; }
    const newEntry = {
      id: `p-${Date.now()}`,
      author: newPrayerAnon ? 'Anonymous Believer' : `${userName} (${userRegion})`,
      time: 'Just now',
      category: newPrayerCat,
      request: newPrayerText.trim(),
      prayerCount: 1,
      hasPrayed: true,
      isAnonymous: newPrayerAnon,
    };
    setPrayers([newEntry, ...prayers]);
    setNewPrayerText('');
    setPrayerModalOpen(false);
    Alert.alert('Prayer Wall', 'Your petition is now shared with believers globally.');
  };

  const handleSendLiveChat = () => {
    if (!newChatMessage.trim()) return;
    setChatMessages([...chatMessages, { id: `c-${Date.now()}`, user: userName, message: newChatMessage.trim(), time: 'Just now' }]);
    setNewChatMessage('');
  };

  const toggleRsvp = (id) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextRsvpd = !e.rsvpd;
          return { ...e, rsvpd: nextRsvpd, rsvpCount: nextRsvpd ? e.rsvpCount + 1 : e.rsvpCount - 1 };
        }
        return e;
      })
    );
  };

  const handleShareVerse = async () => {
    try {
      await Share.share({ message: `"${activeDev.scriptureText}" - ${activeDev.scriptureReference}\nHoly Kingdom Global Mission` });
    } catch (e) {}
  };

  // D) Sermon Notes
  const handleSaveNote = () => {
    if (!sermonNoteInput.trim()) return;
    setSermonNotes((prev) => ({ ...prev, [activeSermon.id]: sermonNoteInput }));
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleShareNote = async () => {
    const note = sermonNoteInput || sermonNotes[activeSermon.id] || '';
    if (!note.trim()) { Alert.alert('No notes to share yet.'); return; }
    try {
      await Share.share({ message: `Sermon Notes: "${activeSermon.title}"\n${activeSermon.speaker}\n\n${note}\n\nHoly Kingdom Global Mission` });
    } catch (e) {}
  };

  // F) Giving Receipt
  const handleShareReceipt = async () => {
    const ref = `HK-${Date.now()}`;
    const receiptText = `HOLY KINGDOM GLOBAL MISSION\nOfficial Giving Receipt\n\nDonor: ${userName}\nEmail: ${userEmail}\nAmount: $${giveAmount}\nFund: ${giveCategory}\nMethod: ${givePaymentMethod}\nDate: ${new Date().toLocaleDateString()}\nReference: ${ref}\n\nThank you for your generous seed!\nMay God multiply your harvest 100-fold.`;
    try {
      await Share.share({ message: receiptText });
    } catch (e) {}
  };

  // C) Notifications
  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // G) Music controls
  const playNextSong = () => {
    const idx = worshipPlaylist.findIndex((s) => s.id === currentSong.id);
    setCurrentSong(worshipPlaylist[(idx + 1) % worshipPlaylist.length]);
  };
  const playPrevSong = () => {
    const idx = worshipPlaylist.findIndex((s) => s.id === currentSong.id);
    setCurrentSong(worshipPlaylist[(idx - 1 + worshipPlaylist.length) % worshipPlaylist.length]);
  };

  // B) Groups
  const toggleJoinGroup = (id) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextJoined = !g.joined;
          return { ...g, joined: nextJoined, members: nextJoined ? g.members + 1 : g.members - 1 };
        }
        return g;
      })
    );
  };

  const filteredMembers = mockMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.region.toLowerCase().includes(memberSearch.toLowerCase())
  );

  // ============================================================
  // A) SPLASH SCREEN
  // ============================================================
  if (showSplash) {
    return (
      <View style={[styles.splashContainer, { backgroundColor: isDarkMode ? '#0A0F1D' : '#FFFFFF' }]}>
        <StatusBar barStyle="light-content" />
        <Animated.View style={{ transform: [{ scale: splashLogoScale }], opacity: splashLogoOpacity }}>
          <View style={[styles.splashLogo, { backgroundColor: '#F59E0B' }]}>
            <Ionicons name="globe" size={52} color="#FFFFFF" />
          </View>
        </Animated.View>
        <Animated.View style={{ opacity: splashTextOpacity, alignItems: 'center', marginTop: 20 }}>
          <Text style={[styles.splashTitle, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}>HOLY KINGDOM</Text>
          <Text style={[styles.splashSub, { color: '#F59E0B' }]}>GLOBAL MISSION</Text>
          <Text style={[styles.splashMotto, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
            Reaching Nations • Transforming Lives
          </Text>
        </Animated.View>
        <Animated.View style={[styles.splashBarTrack, { marginTop: 40 }]}>
          <Animated.View
            style={[
              styles.splashBarFill,
              { backgroundColor: '#F59E0B', transform: [{ scaleX: splashBarWidth }] },
            ]}
          />
        </Animated.View>
      </View>
    );
  }

  // ============================================================
  // MAIN APP
  // ============================================================
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* --- TOP HEADER BAR --- */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.logoIcon, { backgroundColor: colors.accent }]}>
            <Ionicons name="globe-outline" size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text style={[styles.logoTitle, { color: colors.textPrimary }]}>HOLY KINGDOM</Text>
            <Text style={[styles.logoSubtitle, { color: colors.accent }]}>GLOBAL MISSION</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          {/* Theme Toggle */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.chipBg, borderColor: colors.border }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={18} color={isDarkMode ? '#F59E0B' : colors.textPrimary} />
          </TouchableOpacity>

          {/* C) Notification Bell */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.chipBg, borderColor: colors.border }]}
            onPress={() => setNotificationsOpen(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
            {notificationCount > 0 && (
              <View style={styles.badgeCircle}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Profile / Account */}
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.chipBg, borderColor: colors.border }]}
            onPress={() => setSettingsOpen(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="person-circle-outline" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- MAIN CONTENT --- */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <View style={styles.tabContent}>
            <View style={[styles.liveBanner, { backgroundColor: colors.bannerBg, borderColor: colors.border }]}>
              <View style={styles.liveHeader}>
                <View style={styles.liveIndicator}>
                  <View style={[styles.liveDot, { backgroundColor: colors.statusBadge }]} />
                  <Text style={[styles.liveText, { color: '#FFFFFF' }]}>YOUTUBE & FACEBOOK LIVE</Text>
                </View>
                <Text style={styles.liveTime}>Worldwide Stream Active</Text>
              </View>
              <Text style={styles.liveTitle}>Welcome, {userName}</Text>
              <Text style={styles.liveDesc}>Empowering believers, planting churches, and taking the eternal gospel to the ends of the earth.</Text>
              <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent }]} onPress={() => setActiveTab('sermons')}>
                <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.primaryButtonText}>Watch Global Broadcast & Live Chat</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.quickGrid}>
              {[
                { tab: 'devotional', icon: 'book', label: '7 AM Word', sub: 'Devotion' },
                { tab: 'prayers', icon: 'heart', label: 'Prayer Wall', sub: 'Global Watch' },
                { tab: 'giving', icon: 'card', label: 'Missions Seed', sub: 'Apple / Card' },
                { tab: 'groups', icon: 'people', label: 'Groups', sub: 'Connect' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.tab}
                  style={[styles.quickCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                  onPress={() => setActiveTab(item.tab)}
                >
                  <View style={[styles.quickIconCircle, { backgroundColor: colors.accentLight }]}>
                    <Ionicons name={item.icon} size={20} color={colors.accent} />
                  </View>
                  <Text style={[styles.quickLabel, { color: colors.textPrimary }]}>{item.label}</Text>
                  <Text style={[styles.quickSub, { color: colors.textSecondary }]}>{item.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.pillBadge}>
                  <Ionicons name="sparkles" size={12} color={colors.accent} style={{ marginRight: 4 }} />
                  <Text style={[styles.pillBadgeText, { color: colors.accent }]}>7:00 AM GLOBAL SCRIPTURE</Text>
                </View>
                <TouchableOpacity onPress={handleShareVerse}>
                  <Ionicons name="share-social-outline" size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.verseQuote, { color: colors.textPrimary }]}>"{activeDev.scriptureText}"</Text>
              <Text style={[styles.verseRef, { color: colors.accent }]}>— {activeDev.scriptureReference}</Text>
              <View style={[styles.devotionalDivider, { backgroundColor: colors.border }]} />
              <View style={styles.cardFooterRow}>
                <TouchableOpacity
                  style={[styles.audioPill, { backgroundColor: colors.chipBg }]}
                  onPress={() => setIsPlayingDevAudio(!isPlayingDevAudio)}
                >
                  <Ionicons name={isPlayingDevAudio ? 'pause' : 'volume-high'} size={16} color={colors.accent} />
                  <Text style={[styles.audioPillText, { color: colors.textPrimary }]}>
                    {isPlayingDevAudio ? 'Pause Narration' : `Listen (${activeDev.audioDuration})`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('devotional')} style={styles.textLinkRow}>
                  <Text style={[styles.textLink, { color: colors.accent }]}>Read Full</Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.accent} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Featured Streamed Broadcast</Text>
              <Text style={[styles.sermonTitle, { color: colors.textPrimary }]}>{activeSermon.title}</Text>
              <Text style={[styles.sermonSubtitle, { color: colors.textSecondary }]}>{activeSermon.speaker} • {activeSermon.platform}</Text>
              <Text style={[styles.sermonDesc, { color: colors.textSecondary }]} numberOfLines={2}>{activeSermon.description}</Text>
              <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.accent }]} onPress={() => setActiveTab('sermons')}>
                <Ionicons name="logo-youtube" size={18} color="#EF4444" style={{ marginRight: 6 }} />
                <Text style={[styles.secondaryButtonText, { color: colors.accent }]}>Open Live Stream & Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB: DEVOTIONAL */}
        {activeTab === 'devotional' && (
          <View style={styles.tabContent}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalChips}>
              {devotionals.map((d) => (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.chip, { backgroundColor: d.id === activeDevId ? colors.accent : colors.chipBg, borderColor: colors.border }]}
                  onPress={() => { setActiveDevId(d.id); setIsPlayingDevAudio(false); }}
                >
                  <Text style={[styles.chipText, { color: d.id === activeDevId ? '#FFFFFF' : colors.textSecondary }]}>
                    {d.date.split('•')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.cardHeaderRow}>
                <Text style={[styles.devTheme, { color: colors.accent }]}>{activeDev.theme}</Text>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => toggleBookmark(activeDev.id)} style={{ marginRight: 12 }}>
                    <Ionicons name={activeDev.isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color={activeDev.isBookmarked ? colors.accent : colors.textSecondary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleShareVerse}>
                    <Ionicons name="share-social-outline" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={[styles.devTitle, { color: colors.textPrimary }]}>{activeDev.title}</Text>

              <View style={[styles.audioPlayerBox, { backgroundColor: colors.chipBg }]}>
                <TouchableOpacity
                  style={[styles.audioPlayBtn, { backgroundColor: colors.accent }]}
                  onPress={() => setIsPlayingDevAudio(!isPlayingDevAudio)}
                >
                  <Ionicons name={isPlayingDevAudio ? 'pause' : 'play'} size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.audioTitle, { color: colors.textPrimary }]}>{isPlayingDevAudio ? 'Streaming Word Audio' : 'Play Narration'}</Text>
                  <Text style={[styles.audioTime, { color: colors.textSecondary }]}>Duration {activeDev.audioDuration}</Text>
                </View>
              </View>

              <View style={[styles.scriptureBox, { backgroundColor: colors.accentGlow, borderColor: colors.accent }]}>
                <Text style={[styles.scriptureRefText, { color: colors.accent }]}>{activeDev.scriptureReference}</Text>
                <Text style={[styles.scriptureText, { color: colors.textPrimary }]}>"{activeDev.scriptureText}"</Text>
              </View>

              <Text style={[styles.articleSectionHeader, { color: colors.textPrimary }]}>Mission Reflection</Text>
              <Text style={[styles.articleBody, { color: colors.textPrimary }]}>{activeDev.reflection}</Text>

              <Text style={[styles.articleSectionHeader, { color: colors.textPrimary }]}>Kingdom Prayer</Text>
              <View style={[styles.prayerBox, { backgroundColor: colors.chipBg }]}>
                <Text style={[styles.prayerText, { color: colors.textPrimary }]}>"{activeDev.prayer}"</Text>
              </View>

              <TouchableOpacity style={[styles.likeRow, { borderColor: colors.border }]} onPress={() => toggleLikeDevotional(activeDev.id)}>
                <Ionicons name="heart" size={18} color="#EF4444" />
                <Text style={[styles.likeCountText, { color: colors.textSecondary }]}>{activeDev.likesCount} Believers Worldwide Blessed</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB: SERMONS (LIVE & WORD) */}
        {activeTab === 'sermons' && (
          <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              {/* Video Player */}
              <View style={[styles.videoPlaceholder, { backgroundColor: '#070B14' }]}>
                <View style={styles.streamBadgeRow}>
                  <View style={[styles.liveDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={styles.streamBadgeText}>LIVE ON YOUTUBE & FACEBOOK</Text>
                  <Text style={styles.streamViewers}>{activeSermon.viewers}</Text>
                </View>
                <Ionicons name="videocam" size={44} color={colors.accent} />
                <Text style={styles.videoPlaceholderText}>{activeSermon.title}</Text>
                <Text style={styles.videoPlaceholderSpeaker}>{activeSermon.speaker}</Text>
              </View>

              {/* Tabs: Player+Notes / Chat */}
              <View style={[styles.authTabSwitch, { backgroundColor: colors.chipBg, borderColor: colors.border, marginVertical: 10 }]}>
                <TouchableOpacity
                  style={[styles.authTabBtn, liveStreamTab === 'video' && { backgroundColor: colors.surface }]}
                  onPress={() => setLiveStreamTab('video')}
                >
                  <Ionicons name="play-circle-outline" size={16} color={liveStreamTab === 'video' ? colors.accent : colors.textSecondary} style={{ marginRight: 6 }} />
                  <Text style={[styles.authTabBtnText, { color: liveStreamTab === 'video' ? colors.accent : colors.textSecondary }]}>Player & Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.authTabBtn, liveStreamTab === 'chat' && { backgroundColor: colors.surface }]}
                  onPress={() => setLiveStreamTab('chat')}
                >
                  <Ionicons name="chatbubbles-outline" size={16} color={liveStreamTab === 'chat' ? colors.accent : colors.textSecondary} style={{ marginRight: 6 }} />
                  <Text style={[styles.authTabBtnText, { color: liveStreamTab === 'chat' ? colors.accent : colors.textSecondary }]}>Live Fellowship Chat</Text>
                </TouchableOpacity>
              </View>

              {liveStreamTab === 'video' ? (
                <View>
                  <View style={styles.playerControlsRow}>
                    <TouchableOpacity
                      style={[styles.bigPlayButton, { backgroundColor: colors.accent }]}
                      onPress={() => setIsPlayingSermon(!isPlayingSermon)}
                    >
                      <Ionicons name={isPlayingSermon ? 'pause' : 'play'} size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginHorizontal: 12 }}>
                      <Text style={[styles.sermonNowPlaying, { color: colors.textPrimary }]}>
                        {isPlayingSermon ? 'Playing Stream Audio' : 'Paused'}
                      </Text>
                      <Text style={[styles.sermonDuration, { color: colors.textSecondary }]}>{activeSermon.duration} • {activeSermon.plays} listeners</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.speedBtn, { backgroundColor: colors.chipBg }]}
                      onPress={() => setSermonSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                    >
                      <Text style={[styles.speedText, { color: colors.textPrimary }]}>{sermonSpeed}x</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.articleSectionHeader, { color: colors.textPrimary, marginTop: 12 }]}>About This Message</Text>
                  <Text style={[styles.sermonDesc, { color: colors.textSecondary }]}>{activeSermon.description}</Text>

                  {/* D) Sermon Notes Editor */}
                  <View style={[styles.notesSection, { borderTopColor: colors.border }]}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={[styles.articleSectionHeader, { color: colors.textPrimary, marginTop: 0 }]}>📝 {t.myNotes}</Text>
                      {noteSaved && (
                        <View style={[styles.savedBadge, { backgroundColor: '#10B981' }]}>
                          <Text style={styles.savedBadgeText}>Saved ✓</Text>
                        </View>
                      )}
                    </View>
                    <TextInput
                      style={[styles.textArea, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border, minHeight: 80 }]}
                      multiline
                      placeholder="Take notes while the message plays..."
                      placeholderTextColor={colors.textSecondary}
                      value={sermonNoteInput !== '' ? sermonNoteInput : (sermonNotes[activeSermon.id] || '')}
                      onChangeText={setSermonNoteInput}
                      onFocus={() => setSermonNoteInput(sermonNotes[activeSermon.id] || '')}
                    />
                    <View style={styles.notesButtonRow}>
                      <TouchableOpacity style={[styles.noteBtn, { backgroundColor: colors.accent }]} onPress={handleSaveNote}>
                        <Ionicons name="save-outline" size={14} color="#FFF" style={{ marginRight: 4 }} />
                        <Text style={styles.noteBtnText}>{t.saveNote}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.noteBtn, { backgroundColor: colors.chipBg, borderWidth: 1, borderColor: colors.border }]} onPress={handleShareNote}>
                        <Ionicons name="share-outline" size={14} color={colors.textPrimary} style={{ marginRight: 4 }} />
                        <Text style={[styles.noteBtnText, { color: colors.textPrimary }]}>{t.shareNote}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.noteBtn, { backgroundColor: colors.chipBg, borderWidth: 1, borderColor: colors.border }]}
                        onPress={() => { setSermonNoteInput(''); setSermonNotes((p) => ({ ...p, [activeSermon.id]: '' })); }}
                      >
                        <Text style={[styles.noteBtnText, { color: colors.textSecondary }]}>{t.clearNote}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.liveChatContainer}>
                  <ScrollView style={{ maxHeight: 150 }} showsVerticalScrollIndicator={false}>
                    {chatMessages.map((msg) => (
                      <View key={msg.id} style={styles.chatMessageRow}>
                        <Text style={[styles.chatAuthor, { color: colors.accent }]}>{msg.user}: </Text>
                        <Text style={[styles.chatMessageText, { color: colors.textPrimary }]}>{msg.message}</Text>
                      </View>
                    ))}
                  </ScrollView>
                  <View style={styles.chatInputRow}>
                    <TextInput
                      style={[styles.chatInput, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
                      placeholder="Send encouraging chat..."
                      placeholderTextColor={colors.textSecondary}
                      value={newChatMessage}
                      onChangeText={setNewChatMessage}
                      onSubmitEditing={handleSendLiveChat}
                    />
                    <TouchableOpacity style={[styles.chatSendBtn, { backgroundColor: colors.accent }]} onPress={handleSendLiveChat}>
                      <Ionicons name="send" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Global Teachings Archive</Text>
            {sermons.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.card, { backgroundColor: colors.card, borderColor: s.id === activeSermon.id ? colors.accent : colors.cardBorder }]}
                onPress={() => { setActiveSermon(s); setIsPlayingSermon(true); setSermonNoteInput(sermonNotes[s.id] || ''); }}
              >
                <View style={styles.sermonListRow}>
                  <View style={[styles.sermonListIcon, { backgroundColor: colors.chipBg }]}>
                    <Ionicons name={s.id === activeSermon.id && isPlayingSermon ? 'volume-high' : 'play'} size={20} color={colors.accent} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.sermonTitle, { color: colors.textPrimary }]}>{s.title}</Text>
                    <Text style={[styles.sermonSubtitle, { color: colors.textSecondary }]}>{s.speaker} • {s.platform}</Text>
                    {sermonNotes[s.id] ? (
                      <View style={[styles.notesBadge, { backgroundColor: colors.accentLight }]}>
                        <Ionicons name="create-outline" size={10} color={colors.accent} />
                        <Text style={[styles.notesBadgeText, { color: colors.accent }]}>Has notes</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* TAB: PRAYER WALL */}
        {activeTab === 'prayers' && (
          <View style={styles.tabContent}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.accent, marginBottom: 12 }]}
              onPress={() => setPrayerModalOpen(true)}
            >
              <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryButtonText}>{t.postPrayer}</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>{t.worldwidePrayer}</Text>
            {prayers.map((p) => (
              <View key={p.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <View style={styles.cardHeaderRow}>
                  <View style={[styles.prayerCategoryBadge, { backgroundColor: colors.accentLight }]}>
                    <Text style={[styles.prayerCategoryText, { color: colors.accent }]}>{p.category}</Text>
                  </View>
                  <Text style={[styles.prayerTime, { color: colors.textSecondary }]}>{p.time}</Text>
                </View>
                <Text style={[styles.prayerBody, { color: colors.textPrimary }]}>"{p.request}"</Text>
                <View style={[styles.devotionalDivider, { backgroundColor: colors.border }]} />
                <View style={styles.cardFooterRow}>
                  <View style={styles.row}>
                    <Ionicons name={p.isAnonymous ? 'lock-closed' : 'earth'} size={18} color={colors.textSecondary} />
                    <Text style={[styles.prayerAuthor, { color: colors.textSecondary, marginLeft: 6 }]}>{p.author}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.prayForButton, { backgroundColor: p.hasPrayed ? '#FEF2F2' : colors.chipBg, borderColor: p.hasPrayed ? '#FCA5A5' : colors.border }]}
                    onPress={() => handlePrayFor(p.id)}
                  >
                    <Ionicons name={p.hasPrayed ? 'heart' : 'heart-outline'} size={16} color={p.hasPrayed ? '#DC2626' : colors.textSecondary} />
                    <Text style={[styles.prayForButtonText, { color: p.hasPrayed ? '#DC2626' : colors.textPrimary }]}>
                      {p.hasPrayed ? 'Prayed' : 'I Prayed'} ({p.prayerCount})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB: EVENTS */}
        {activeTab === 'events' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Global Mission Calendar</Text>
            {events.map((e) => (
              <View key={e.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <View style={styles.cardHeaderRow}>
                  <Text style={[styles.devTheme, { color: colors.accent }]}>{e.category}</Text>
                  <Text style={[styles.eventAttendees, { color: colors.textSecondary }]}>{e.rsvpCount} Registered</Text>
                </View>
                <Text style={[styles.eventTitle, { color: colors.textPrimary }]}>{e.title}</Text>
                <View style={styles.eventInfoRow}>
                  <Ionicons name="time-outline" size={16} color={colors.accent} />
                  <Text style={[styles.eventInfoText, { color: colors.textSecondary }]}>{e.date}</Text>
                </View>
                <View style={styles.eventInfoRow}>
                  <Ionicons name="location-outline" size={16} color={colors.accent} />
                  <Text style={[styles.eventInfoText, { color: colors.textSecondary }]}>{e.location}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: e.rsvpd ? '#10B981' : colors.accent, marginTop: 14 }]}
                  onPress={() => toggleRsvp(e.id)}
                >
                  <Ionicons name={e.rsvpd ? 'checkmark-circle' : 'calendar'} size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryButtonText}>{e.rsvpd ? t.rsvpConfirmed : t.rsvp}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* TAB: GIVING */}
        {activeTab === 'giving' && (
          <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.centerAlign}>
                <View style={[styles.givingHeroCircle, { backgroundColor: colors.accentLight }]}>
                  <Ionicons name="card" size={36} color={colors.accent} />
                </View>
                <Text style={[styles.givingTitle, { color: colors.textPrimary }]}>{t.giveTitle}</Text>
                <Text style={[styles.givingDesc, { color: colors.textSecondary }]}>{t.giveDesc}</Text>
              </View>

              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Select Fund</Text>
              <View style={styles.fundRow}>
                {['World Missions', 'Tithe', 'Church Planting', 'Disaster Relief'].map((fund) => (
                  <TouchableOpacity
                    key={fund}
                    style={[styles.fundChip, { backgroundColor: giveCategory === fund ? colors.accent : colors.chipBg, borderColor: colors.border }]}
                    onPress={() => setGiveCategory(fund)}
                  >
                    <Text style={[styles.fundChipText, { color: giveCategory === fund ? '#FFFFFF' : colors.textPrimary }]}>{fund}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Select Amount</Text>
              <View style={styles.fundRow}>
                {['50', '100', '250', '500'].map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={[styles.amountChip, { backgroundColor: giveAmount === amt ? colors.accent : colors.chipBg, borderColor: colors.border }]}
                    onPress={() => setGiveAmount(amt)}
                  >
                    <Text style={[styles.amountChipText, { color: giveAmount === amt ? '#FFFFFF' : colors.textPrimary }]}>${amt}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
                keyboardType="numeric"
                value={giveAmount}
                onChangeText={setGiveAmount}
                placeholder="Custom Amount ($)"
                placeholderTextColor={colors.textSecondary}
              />

              <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Checkout Method</Text>
              <View style={styles.paymentMethodRow}>
                {['Apple Pay / Google Pay', 'Credit / Debit Card'].map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[styles.paymentMethodChip, { backgroundColor: givePaymentMethod === method ? colors.accentLight : colors.chipBg, borderColor: givePaymentMethod === method ? colors.accent : colors.border }]}
                    onPress={() => setGivePaymentMethod(method)}
                  >
                    <Ionicons name={method.includes('Apple') ? 'logo-apple' : 'card-outline'} size={16} color={givePaymentMethod === method ? colors.accent : colors.textSecondary} style={{ marginRight: 6 }} />
                    <Text style={[styles.paymentMethodText, { color: colors.textPrimary }]}>{method}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Make this a monthly recurring seed</Text>
                <Switch value={isRecurringGift} onValueChange={setIsRecurringGift} trackColor={{ false: colors.chipBg, true: colors.accent }} />
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: colors.accent, marginTop: 14 }]}
                onPress={() => setGiveSuccessModal(true)}
              >
                <Ionicons name="lock-closed" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.primaryButtonText}>Pay ${giveAmount} with {givePaymentMethod}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* G) TAB: WORSHIP MUSIC */}
        {activeTab === 'music' && (
          <View style={styles.tabContent}>
            {/* Now Playing Card */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder, alignItems: 'center' }]}>
              <View style={[styles.albumArtBox, { backgroundColor: colors.bannerBg }]}>
                <Ionicons name="musical-notes" size={42} color={colors.accent} />
                {/* Equalizer bars */}
                {isPlayingMusic && (
                  <View style={styles.equalizerRow}>
                    {[bar1, bar2, bar3, bar4].map((bar, i) => (
                      <Animated.View key={i} style={[styles.equalizerBar, { backgroundColor: colors.accent, transform: [{ scaleY: bar }] }]} />
                    ))}
                  </View>
                )}
              </View>

              <Text style={[styles.songTitle, { color: colors.textPrimary }]}>{currentSong.title}</Text>
              <Text style={[styles.songArtist, { color: colors.textSecondary }]}>{currentSong.artist} • {currentSong.duration}</Text>

              {/* Controls */}
              <View style={styles.musicControlsRow}>
                <TouchableOpacity onPress={playPrevSong} style={[styles.musicControlBtn, { backgroundColor: colors.chipBg }]}>
                  <Ionicons name="play-skip-back" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsPlayingMusic(!isPlayingMusic)}
                  style={[styles.musicPlayBtn, { backgroundColor: colors.accent }]}
                >
                  <Ionicons name={isPlayingMusic ? 'pause' : 'play'} size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={playNextSong} style={[styles.musicControlBtn, { backgroundColor: colors.chipBg }]}>
                  <Ionicons name="play-skip-forward" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Lyrics Toggle */}
              <TouchableOpacity
                style={[styles.lyricsToggleBtn, { borderColor: colors.border }]}
                onPress={() => setShowLyrics(!showLyrics)}
              >
                <Ionicons name="musical-note-outline" size={14} color={colors.accent} style={{ marginRight: 4 }} />
                <Text style={[styles.lyricsToggleText, { color: colors.accent }]}>
                  {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                </Text>
              </TouchableOpacity>

              {showLyrics && (
                <View style={[styles.lyricsBox, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  {currentSong.lyrics.map((line, i) => (
                    <Text key={i} style={[styles.lyricLine, { color: i === 4 ? colors.accent : colors.textSecondary }]}>{line}</Text>
                  ))}
                </View>
              )}
            </View>

            {/* Playlist */}
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Worship Playlist</Text>
            {worshipPlaylist.map((song) => (
              <TouchableOpacity
                key={song.id}
                style={[styles.card, { backgroundColor: colors.card, borderColor: song.id === currentSong.id ? colors.accent : colors.cardBorder }]}
                onPress={() => { setCurrentSong(song); setIsPlayingMusic(true); }}
              >
                <View style={styles.sermonListRow}>
                  <View style={[styles.sermonListIcon, { backgroundColor: song.id === currentSong.id ? colors.accent : colors.chipBg }]}>
                    <Ionicons name={song.id === currentSong.id && isPlayingMusic ? 'volume-high' : 'musical-note'} size={20} color={song.id === currentSong.id ? '#FFFFFF' : colors.accent} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.sermonTitle, { color: colors.textPrimary }]}>{song.title}</Text>
                    <Text style={[styles.sermonSubtitle, { color: colors.textSecondary }]}>{song.artist} • {song.duration}</Text>
                  </View>
                  {song.id === currentSong.id && isPlayingMusic && (
                    <View style={styles.equalizerRowSmall}>
                      {[bar1, bar2, bar3].map((b, i) => (
                        <Animated.View key={i} style={[styles.equalizerBarSmall, { backgroundColor: colors.accent, transform: [{ scaleY: b }] }]} />
                      ))}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* B) TAB: GROUPS & MEMBER DIRECTORY */}
        {activeTab === 'groups' && (
          <View style={styles.tabContent}>
            {/* Tab switcher */}
            <View style={[styles.authTabSwitch, { backgroundColor: colors.chipBg, borderColor: colors.border, marginBottom: 14 }]}>
              <TouchableOpacity
                style={[styles.authTabBtn, groupsTab === 'groups' && { backgroundColor: colors.surface }]}
                onPress={() => setGroupsTab('groups')}
              >
                <Ionicons name="people-outline" size={16} color={groupsTab === 'groups' ? colors.accent : colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.authTabBtnText, { color: groupsTab === 'groups' ? colors.accent : colors.textSecondary }]}>{t.smallGroups}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.authTabBtn, groupsTab === 'directory' && { backgroundColor: colors.surface }]}
                onPress={() => setGroupsTab('directory')}
              >
                <Ionicons name="list-outline" size={16} color={groupsTab === 'directory' ? colors.accent : colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.authTabBtnText, { color: groupsTab === 'directory' ? colors.accent : colors.textSecondary }]}>Member Directory</Text>
              </TouchableOpacity>
            </View>

            {groupsTab === 'groups' ? (
              <View>
                {groups.map((g) => (
                  <View key={g.id} style={[styles.card, { backgroundColor: colors.card, borderColor: g.joined ? colors.accent : colors.cardBorder }]}>
                    <View style={styles.cardHeaderRow}>
                      <View style={[styles.prayerCategoryBadge, { backgroundColor: colors.accentLight }]}>
                        <Text style={[styles.prayerCategoryText, { color: colors.accent }]}>{g.region}</Text>
                      </View>
                      <Text style={[styles.prayerTime, { color: colors.textSecondary }]}>{g.members} members</Text>
                    </View>
                    <Text style={[styles.devTitle, { color: colors.textPrimary, fontSize: 15, marginVertical: 4 }]}>{g.name}</Text>
                    <View style={styles.eventInfoRow}>
                      <Ionicons name="person-outline" size={14} color={colors.accent} />
                      <Text style={[styles.eventInfoText, { color: colors.textSecondary }]}>Led by {g.leader}</Text>
                    </View>
                    <View style={styles.eventInfoRow}>
                      <Ionicons name="time-outline" size={14} color={colors.accent} />
                      <Text style={[styles.eventInfoText, { color: colors.textSecondary }]}>Meets {g.meetTime}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.primaryButton, { backgroundColor: g.joined ? '#10B981' : colors.accent, marginTop: 12 }]}
                      onPress={() => toggleJoinGroup(g.id)}
                    >
                      <Ionicons name={g.joined ? 'checkmark-circle' : 'add-circle-outline'} size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.primaryButtonText}>{g.joined ? 'Joined ✓' : 'Join Group'}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border, marginBottom: 14 }]}
                  placeholder="Search members by name or region..."
                  placeholderTextColor={colors.textSecondary}
                  value={memberSearch}
                  onChangeText={setMemberSearch}
                />
                {filteredMembers.map((m) => (
                  <View key={m.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <View style={styles.sermonListRow}>
                      <View style={[styles.memberAvatar, { backgroundColor: colors.accent }]}>
                        <Text style={styles.memberAvatarText}>{m.initials}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={[styles.sermonTitle, { color: colors.textPrimary }]}>{m.name}</Text>
                        <Text style={[styles.sermonSubtitle, { color: colors.textSecondary }]}>{m.region}</Text>
                        <Text style={[styles.prayerTime, { color: colors.textSecondary }]}>Member since {m.joined}</Text>
                      </View>
                      <View style={[styles.prayerCategoryBadge, { backgroundColor: colors.accentLight }]}>
                        <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
                      </View>
                    </View>
                  </View>
                ))}
                {filteredMembers.length === 0 && (
                  <Text style={[styles.sermonDesc, { color: colors.textSecondary, textAlign: 'center', marginTop: 20 }]}>No members found.</Text>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* --- BOTTOM TAB NAVIGATION BAR --- */}
      <View style={[styles.bottomBar, { backgroundColor: colors.tabBar, borderTopColor: colors.border }]}>
        {[
          { id: 'home', label: t.home, icon: 'home-outline', activeIcon: 'home' },
          { id: 'devotional', label: t.word, icon: 'book-outline', activeIcon: 'book' },
          { id: 'sermons', label: 'Live', icon: 'tv-outline', activeIcon: 'tv' },
          { id: 'music', label: t.music, icon: 'musical-notes-outline', activeIcon: 'musical-notes' },
          { id: 'prayers', label: t.prayers, icon: 'heart-outline', activeIcon: 'heart' },
          { id: 'groups', label: t.groups, icon: 'people-outline', activeIcon: 'people' },
          { id: 'giving', label: t.giving, icon: 'gift-outline', activeIcon: 'gift' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={20}
                color={isActive ? colors.accent : colors.tabInactive}
              />
              <Text style={[styles.tabLabel, { color: isActive ? colors.accent : colors.tabInactive }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ================================================================ */}
      {/* LIVING ONBOARDING MODAL */}
      {/* ================================================================ */}
      <Modal visible={showOnboarding} animationType="slide" transparent={false}>
        <SafeAreaView style={[styles.onboardingContainer, { backgroundColor: colors.bg }]}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

              {/* Top bar */}
              <View style={styles.onboardingTopBar}>
                <TouchableOpacity
                  style={[styles.onboardingThemePill, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={toggleTheme}
                  activeOpacity={0.7}
                >
                  <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={15} color={isDarkMode ? '#F59E0B' : colors.textPrimary} />
                  <Text style={[styles.onboardingThemeText, { color: colors.textPrimary }]}>
                    {isDarkMode ? 'Dark Radiance' : 'Light Sanctuary'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleContinueAsGuest} style={styles.onboardingGuestBtn} activeOpacity={0.7}>
                  <Text style={[styles.skipText, { color: colors.accent }]}>Explore as Guest &gt;</Text>
                </TouchableOpacity>
              </View>

              {/* Live Ticker */}
              <Animated.View style={[styles.liveTickerContainer, { backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.12)' : '#FEF3C7', borderColor: colors.accent, opacity: fadeAnim }]}>
                <View style={[styles.liveDotSmall, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.liveTickerText, { color: isDarkMode ? '#FDE68A' : '#92400E' }]}>{liveTickers[tickerIndex]}</Text>
              </Animated.View>

              {/* Brand Section */}
              <View style={styles.onboardingBrandSection}>
                <Animated.View style={[styles.pulsingEmblemWrapper, { transform: [{ scale: pulseAnim }], shadowOpacity: glowAnim }]}>
                  <View style={[styles.onboardingLogoBox, { backgroundColor: colors.accent }]}>
                    <Ionicons name="globe" size={38} color="#FFFFFF" />
                  </View>
                </Animated.View>
                <Text style={[styles.onboardingAppTitle, { color: colors.textPrimary }]}>HOLY KINGDOM</Text>
                <Text style={[styles.onboardingAppSub, { color: colors.accent }]}>GLOBAL MISSION</Text>
                <Text style={[styles.onboardingAppMotto, { color: colors.textSecondary }]}>
                  {t.motto}
                </Text>
              </View>

              {/* Auth Card */}
              <View style={[styles.authCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                <View style={styles.authCardHeader}>
                  <Text style={[styles.authCardTitle, { color: colors.textPrimary }]}>
                    {isCreatingAccount ? t.createAccount : t.welcome}
                  </Text>
                  <Text style={[styles.authCardSub, { color: colors.textSecondary }]}>
                    {isCreatingAccount ? t.createAccountSub : t.signInSub}
                  </Text>
                </View>

                {isCreatingAccount ? (
                  <View>
                    <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{t.fullName}</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
                      placeholder="e.g. Grace Emmanuel"
                      placeholderTextColor={colors.textSecondary}
                      value={authFullName}
                      onChangeText={setAuthFullName}
                    />
                    <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{t.email}</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
                      placeholder="name@example.com"
                      placeholderTextColor={colors.textSecondary}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={authEmail}
                      onChangeText={setAuthEmail}
                    />
                    <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{t.password}</Text>
                    <View style={styles.passwordWrapper}>
                      <TextInput
                        style={[styles.passwordInput, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
                        placeholder="Choose a strong password"
                        placeholderTextColor={colors.textSecondary}
                        secureTextEntry={!showPassword}
                        value={authPassword}
                        onChangeText={setAuthPassword}
                      />
                      <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{t.missionHub}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 6 }}>
                      {globalRegions.map((region) => (
                        <TouchableOpacity
                          key={region}
                          style={[styles.chip, { backgroundColor: selectedRegion === region ? colors.accent : colors.chipBg, borderColor: colors.border }]}
                          onPress={() => setSelectedRegion(region)}
                        >
                          <Text style={[styles.chipText, { color: selectedRegion === region ? '#FFFFFF' : colors.textSecondary }]}>{region}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent, marginTop: 14 }]} onPress={handleSignUp}>
                      <Text style={styles.primaryButtonText}>{t.register}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleAuthRow} onPress={() => setIsCreatingAccount(false)}>
                      <Text style={[styles.toggleAuthText, { color: colors.textSecondary }]}>
                        Already registered?{' '}
                        <Text style={{ color: colors.accent, fontWeight: '700' }}>Sign In here</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{t.email}</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
                      placeholder="name@example.com"
                      placeholderTextColor={colors.textSecondary}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={authEmail}
                      onChangeText={setAuthEmail}
                    />
                    <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{t.password}</Text>
                    <View style={styles.passwordWrapper}>
                      <TextInput
                        style={[styles.passwordInput, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
                        placeholder="Enter password"
                        placeholderTextColor={colors.textSecondary}
                        secureTextEntry={!showPassword}
                        value={authPassword}
                        onChangeText={setAuthPassword}
                      />
                      <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.switchRow}>
                      <TouchableOpacity style={styles.row} onPress={() => setRememberMe(!rememberMe)}>
                        <View style={[styles.checkbox, { backgroundColor: rememberMe ? colors.accent : colors.chipBg }]}>
                          {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                        </View>
                        <Text style={[styles.switchLabel, { color: colors.textPrimary, marginLeft: 8 }]}>{t.keepMeSignedIn}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Alert.alert('Password Help', 'A secure reset link has been dispatched to your email address.')}>
                        <Text style={[styles.textLink, { color: colors.accent }]}>{t.forgot}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent, marginTop: 14 }]} onPress={handleLogin}>
                      <Ionicons name="log-in-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.primaryButtonText}>{t.signIn}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Small Create Account Feature (disappears after sign-in) */}
              {!isCreatingAccount && (
                <View style={[styles.bottomCreateAccountPill, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={styles.bottomCreateLeft}>
                    <View style={[styles.bottomCreateDot, { backgroundColor: colors.accent }]} />
                    <View>
                      <Text style={[styles.bottomCreateLabel, { color: colors.textPrimary }]}>{t.newToHK}</Text>
                      <Text style={[styles.bottomCreateSub, { color: colors.textSecondary }]}>{t.joinIn30}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.smallCreateBtn, { backgroundColor: colors.accentLight, borderColor: colors.accent }]}
                    onPress={() => setIsCreatingAccount(true)}
                  >
                    <Text style={[styles.smallCreateBtnText, { color: colors.accent }]}>{t.createAccountBtn}</Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.accent} />
                  </TouchableOpacity>
                </View>
              )}

              {/* Living Mission Pillars */}
              <View style={styles.livingHighlights}>
                {[
                  { icon: 'logo-youtube', color: '#EF4444', text: 'YouTube & Facebook Live' },
                  { icon: 'heart', color: colors.accent, text: '24/7 Global Intercession Wall' },
                  { icon: 'time', color: colors.accent, text: '7:00 AM Morning Bread' },
                ].map((item, i) => (
                  <View key={i} style={[styles.livingHighlightBadge, { backgroundColor: colors.chipBg }]}>
                    <Ionicons name={item.icon} size={14} color={item.color} />
                    <Text style={[styles.livingHighlightText, { color: colors.textSecondary }]}>{item.text}</Text>
                  </View>
                ))}
              </View>

              {/* E) Language Selector */}
              <View style={[styles.langRow, { borderTopColor: colors.border }]}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginTop: 0 }]}>{t.language}</Text>
                {[
                  { code: 'en', flag: '🇺🇸', label: 'EN' },
                  { code: 'es', flag: '🇪🇸', label: 'ES' },
                  { code: 'fr', flag: '🇫🇷', label: 'FR' },
                ].map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[styles.langBtn, { backgroundColor: language === lang.code ? colors.accent : colors.chipBg, borderColor: colors.border }]}
                    onPress={() => setLanguage(lang.code)}
                  >
                    <Text style={[styles.langBtnText, { color: language === lang.code ? '#FFFFFF' : colors.textPrimary }]}>{lang.flag} {lang.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      {/* C) NOTIFICATIONS MODAL */}
      <Modal visible={notificationsOpen} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{t.notifications}</Text>
              <TouchableOpacity onPress={() => setNotificationsOpen(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            {notifications.length === 0 ? (
              <Text style={[styles.sermonDesc, { color: colors.textSecondary, textAlign: 'center', marginVertical: 16 }]}>All caught up! No new notifications.</Text>
            ) : (
              notifications.map((n) => (
                <TouchableOpacity
                  key={n.id}
                  style={[styles.notificationItem, { backgroundColor: n.read ? colors.chipBg : colors.accentLight, borderColor: n.read ? colors.border : colors.accent }]}
                  onPress={() => markNotificationRead(n.id)}
                >
                  <View style={styles.row}>
                    <Ionicons
                      name={n.type === 'devotional' ? 'book' : n.type === 'prayer' ? 'heart' : n.type === 'event' ? 'calendar' : 'gift'}
                      size={18}
                      color={colors.accent}
                      style={{ marginRight: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.notificationTitle, { color: colors.textPrimary }]}>{n.title}</Text>
                      <Text style={[styles.notificationBody, { color: colors.textSecondary }]}>{n.body}</Text>
                      <Text style={[styles.prayerTime, { color: colors.textSecondary }]}>{n.time}</Text>
                    </View>
                    {!n.read && <View style={[styles.unreadDot, { backgroundColor: colors.accent }]} />}
                  </View>
                </TouchableOpacity>
              ))
            )}
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.accent, marginTop: 14 }]}
              onPress={() => setNotificationsOpen(false)}
            >
              <Text style={styles.primaryButtonText}>{t.done}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* PRAYER MODAL */}
      <Modal visible={prayerModalOpen} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Post to Global Prayer Wall</Text>
              <TouchableOpacity onPress={() => setPrayerModalOpen(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border }]}
              multiline
              numberOfLines={4}
              placeholder="What are you standing in faith for? Intercessors around the globe will pray with you."
              placeholderTextColor={colors.textSecondary}
              value={newPrayerText}
              onChangeText={setNewPrayerText}
            />
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Post Anonymously</Text>
              <TouchableOpacity
                style={[styles.checkbox, { backgroundColor: newPrayerAnon ? colors.accent : colors.chipBg }]}
                onPress={() => setNewPrayerAnon(!newPrayerAnon)}
              >
                {newPrayerAnon && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent, marginTop: 14 }]} onPress={handleCreatePrayer}>
              <Text style={styles.primaryButtonText}>{t.submitPrayer}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* SETTINGS MODAL (with E) Language selector) */}
      <Modal visible={settingsOpen} animationType="fade" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{t.settings}</Text>
              <TouchableOpacity onPress={() => setSettingsOpen(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={[styles.profileHeaderBox, { backgroundColor: colors.chipBg }]}>
              <View style={[styles.profileAvatar, { backgroundColor: colors.accent }]}>
                <Text style={styles.profileAvatarText}>{userName.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.profileName, { color: colors.textPrimary }]}>{userName}</Text>
                <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{userEmail}</Text>
                <View style={styles.statusPill}>
                  <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                  <Text style={[styles.statusText, { color: colors.accent }]}>{isLoggedIn ? 'Active Kingdom Member' : 'Guest Explorer'}</Text>
                </View>
              </View>
            </View>

            {/* E) Language selector in settings */}
            <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{t.language}</Text>
            <View style={styles.row}>
              {[{ code: 'en', flag: '🇺🇸', label: 'EN' }, { code: 'es', flag: '🇪🇸', label: 'ES' }, { code: 'fr', flag: '🇫🇷', label: 'FR' }].map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.langBtn, { backgroundColor: language === lang.code ? colors.accent : colors.chipBg, borderColor: colors.border, marginRight: 8 }]}
                  onPress={() => setLanguage(lang.code)}
                >
                  <Text style={[styles.langBtnText, { color: language === lang.code ? '#FFFFFF' : colors.textPrimary }]}>{lang.flag} {lang.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.fieldLabel, { color: colors.textPrimary, marginTop: 10 }]}>{t.notificationSchedule}</Text>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>{t.devotionalReminder}</Text>
              <Switch value={devotionalReminder} onValueChange={setDevotionalReminder} trackColor={{ false: colors.chipBg, true: colors.accent }} />
            </View>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>{t.serviceReminder}</Text>
              <Switch value={serviceReminder} onValueChange={setServiceReminder} trackColor={{ false: colors.chipBg, true: colors.accent }} />
            </View>

            <View style={[styles.settingsRow, { borderBottomColor: colors.border }]}>
              <View>
                <Text style={[styles.settingsLabel, { color: colors.textPrimary }]}>{t.appearance}</Text>
                <Text style={[styles.settingsSub, { color: colors.textSecondary }]}>{isDarkMode ? t.darkMode : t.lightMode}</Text>
              </View>
              <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.chipBg, borderColor: colors.border }]} onPress={toggleTheme}>
                <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={18} color={isDarkMode ? '#F59E0B' : colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.accent, marginTop: 14 }]} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={18} color={colors.accent} style={{ marginRight: 6 }} />
              <Text style={[styles.secondaryButtonText, { color: colors.accent }]}>{isLoggedIn ? t.signOut : 'Sign In with Account'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent, marginTop: 12 }]} onPress={() => setSettingsOpen(false)}>
              <Text style={styles.primaryButtonText}>{t.done}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* F) GIVING SUCCESS MODAL with Receipt */}
      <Modal visible={giveSuccessModal} animationType="fade" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border, alignItems: 'center' }]}>
            <Ionicons name="checkmark-circle" size={56} color="#10B981" />
            <Text style={[styles.modalTitle, { color: colors.textPrimary, marginTop: 8 }]}>{t.blessingConfirmed}</Text>
            <Text style={[styles.givingDesc, { color: colors.textSecondary, textAlign: 'center' }]}>
              Thank you {userName} for sowing ${giveAmount} into {giveCategory} via {givePaymentMethod}.
            </Text>
            <Text style={[styles.prayerTime, { color: colors.accent, marginTop: 6, textAlign: 'center' }]}>
              📧 {t.receiptSent} → {userEmail}
            </Text>
            {/* F) Share / Download Receipt button */}
            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.accent, width: '100%', marginTop: 14 }]}
              onPress={handleShareReceipt}
            >
              <Ionicons name="share-outline" size={18} color={colors.accent} style={{ marginRight: 6 }} />
              <Text style={[styles.secondaryButtonText, { color: colors.accent }]}>{t.downloadReceipt}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.accent, width: '100%', marginTop: 10 }]}
              onPress={() => setGiveSuccessModal(false)}
            >
              <Text style={styles.primaryButtonText}>{t.amen}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  // Splash
  splashContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  splashLogo: { width: 100, height: 100, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  splashTitle: { fontSize: 26, fontWeight: '900', letterSpacing: 2.5, marginTop: 8 },
  splashSub: { fontSize: 12, fontWeight: '800', letterSpacing: 2.5 },
  splashMotto: { fontSize: 11, marginTop: 6, textAlign: 'center' },
  splashBarTrack: { width: width * 0.55, height: 4, backgroundColor: 'rgba(245,158,11,0.2)', borderRadius: 4, overflow: 'hidden' },
  splashBarFill: { height: 4, borderRadius: 4, transformOrigin: 'left' },

  // App Shell
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  logoTitle: { fontSize: 15, fontWeight: '800', letterSpacing: 1.2 },
  logoSubtitle: { fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },

  // C) Badge
  badgeCircle: { position: 'absolute', top: -4, right: -4, backgroundColor: '#EF4444', width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },

  contentContainer: { flex: 1 },
  tabContent: { padding: 16 },
  liveBanner: { borderRadius: 20, borderWidth: 1, padding: 18, marginBottom: 16 },
  liveHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  liveIndicator: { flexDirection: 'row', alignItems: 'center' },
  liveDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  liveText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  liveTime: { color: '#FCD34D', fontSize: 11, fontWeight: '600' },
  liveTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  liveDesc: { color: '#E2E8F0', fontSize: 12, lineHeight: 18, marginBottom: 12 },

  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  secondaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 11, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, marginTop: 8 },
  secondaryButtonText: { fontSize: 13, fontWeight: '600' },

  quickGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  quickCard: { flex: 1, alignItems: 'center', paddingVertical: 12, marginHorizontal: 3, borderRadius: 16, borderWidth: 1 },
  quickIconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  quickLabel: { fontSize: 10, fontWeight: '700' },
  quickSub: { fontSize: 9, marginTop: 2 },

  card: { borderRadius: 18, borderWidth: 1, padding: 16, marginBottom: 14 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  pillBadge: { flexDirection: 'row', alignItems: 'center' },
  pillBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  verseQuote: { fontSize: 15, fontStyle: 'italic', lineHeight: 22, marginVertical: 6 },
  verseRef: { fontSize: 13, fontWeight: '700', textAlign: 'right' },
  devotionalDivider: { height: 1, marginVertical: 12 },
  cardFooterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  audioPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  audioPillText: { fontSize: 11, fontWeight: '600', marginLeft: 6 },
  textLinkRow: { flexDirection: 'row', alignItems: 'center' },
  textLink: { fontSize: 12, fontWeight: '700', marginRight: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  sermonTitle: { fontSize: 15, fontWeight: '700' },
  sermonSubtitle: { fontSize: 12, marginTop: 2 },
  sermonDesc: { fontSize: 12, lineHeight: 18, marginVertical: 6 },
  horizontalChips: { flexDirection: 'row', marginBottom: 14 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  chipText: { fontSize: 12, fontWeight: '600' },
  devTheme: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  devTitle: { fontSize: 18, fontWeight: '800', marginVertical: 6 },
  audioPlayerBox: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 12, marginVertical: 10 },
  audioPlayBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  audioTitle: { fontSize: 12, fontWeight: '700' },
  audioTime: { fontSize: 10, marginTop: 2 },
  scriptureBox: { borderLeftWidth: 3, padding: 12, borderRadius: 8, marginVertical: 10 },
  scriptureRefText: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
  scriptureText: { fontSize: 14, fontStyle: 'italic', lineHeight: 20 },
  articleSectionHeader: { fontSize: 14, fontWeight: '700', marginTop: 10, marginBottom: 4 },
  articleBody: { fontSize: 13, lineHeight: 20, marginBottom: 8 },
  prayerBox: { padding: 12, borderRadius: 10, marginVertical: 6 },
  prayerText: { fontSize: 13, fontStyle: 'italic', lineHeight: 18 },
  likeRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, paddingTop: 10, marginTop: 8 },
  likeCountText: { fontSize: 12, marginLeft: 6 },

  // Sermon Notes (D)
  notesSection: { borderTopWidth: 1, paddingTop: 14, marginTop: 10 },
  notesButtonRow: { flexDirection: 'row', marginTop: 8 },
  noteBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, marginRight: 8 },
  noteBtnText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  savedBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  savedBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  notesBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginTop: 4, alignSelf: 'flex-start' },
  notesBadgeText: { fontSize: 10, fontWeight: '600', marginLeft: 3 },

  // Video / Live
  videoPlaceholder: { height: 170, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 16, marginBottom: 10 },
  streamBadgeRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  streamBadgeText: { color: '#EF4444', fontSize: 10, fontWeight: '800', marginRight: 6 },
  streamViewers: { color: '#FCD34D', fontSize: 10, fontWeight: '600' },
  videoPlaceholderText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', textAlign: 'center', marginTop: 6 },
  videoPlaceholderSpeaker: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  playerControlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bigPlayButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sermonNowPlaying: { fontSize: 13, fontWeight: '700' },
  sermonDuration: { fontSize: 11, marginTop: 2 },
  speedBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  speedText: { fontSize: 12, fontWeight: '700' },
  liveChatContainer: { paddingVertical: 6 },
  chatMessageRow: { flexDirection: 'row', marginVertical: 3 },
  chatAuthor: { fontSize: 12, fontWeight: '700' },
  chatMessageText: { fontSize: 12, flex: 1 },
  chatInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  chatInput: { flex: 1, height: 38, borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, fontSize: 12 },
  chatSendBtn: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  sectionHeading: { fontSize: 16, fontWeight: '800', marginBottom: 10 },
  sermonListRow: { flexDirection: 'row', alignItems: 'center' },
  sermonListIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },

  // Prayer
  prayerCategoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  prayerCategoryText: { fontSize: 10, fontWeight: '700' },
  prayerTime: { fontSize: 11 },
  prayerBody: { fontSize: 14, lineHeight: 20, marginVertical: 8 },
  prayerAuthor: { fontSize: 12 },
  prayForButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
  prayForButtonText: { fontSize: 11, fontWeight: '700', marginLeft: 4 },

  // Events
  eventAttendees: { fontSize: 11 },
  eventTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  eventInfoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  eventInfoText: { fontSize: 12, marginLeft: 6 },

  // Giving
  centerAlign: { alignItems: 'center', marginBottom: 14 },
  givingHeroCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  givingTitle: { fontSize: 18, fontWeight: '800' },
  givingDesc: { fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: 4 },
  fieldLabel: { fontSize: 12, fontWeight: '700', marginTop: 10, marginBottom: 5 },
  fundRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  fundChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1, marginRight: 6, marginBottom: 6 },
  fundChipText: { fontSize: 11, fontWeight: '600' },
  amountChip: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, marginHorizontal: 3 },
  amountChipText: { fontSize: 13, fontWeight: '700' },
  paymentMethodRow: { flexDirection: 'row', marginBottom: 10 },
  paymentMethodChip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, marginHorizontal: 3 },
  paymentMethodText: { fontSize: 11, fontWeight: '700' },
  input: { height: 46, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 13 },
  passwordWrapper: { position: 'relative', justifyContent: 'center' },
  passwordInput: { height: 46, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingRight: 44, fontSize: 13 },
  eyeBtn: { position: 'absolute', right: 12, padding: 6 },
  textArea: { height: 90, borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingTop: 10, fontSize: 13, textAlignVertical: 'top', marginVertical: 10 },

  // G) Music
  albumArtBox: { width: width - 80, height: 180, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  equalizerRow: { flexDirection: 'row', alignItems: 'flex-end', position: 'absolute', bottom: 12 },
  equalizerBar: { width: 4, height: 24, borderRadius: 2, marginHorizontal: 2 },
  equalizerRowSmall: { flexDirection: 'row', alignItems: 'flex-end' },
  equalizerBarSmall: { width: 3, height: 16, borderRadius: 2, marginHorizontal: 1 },
  songTitle: { fontSize: 20, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
  songArtist: { fontSize: 13, textAlign: 'center', marginBottom: 16 },
  musicControlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 },
  musicControlBtn: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  musicPlayBtn: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  lyricsToggleBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, borderWidth: 1, marginBottom: 10 },
  lyricsToggleText: { fontSize: 12, fontWeight: '700' },
  lyricsBox: { width: '100%', borderRadius: 12, borderWidth: 1, padding: 14 },
  lyricLine: { fontSize: 13, lineHeight: 22, textAlign: 'center' },

  // B) Groups & Members
  memberAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  memberAvatarText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },

  // C) Notifications
  notificationItem: { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 10 },
  notificationTitle: { fontSize: 13, fontWeight: '700' },
  notificationBody: { fontSize: 11, lineHeight: 16, marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 8 },

  // Bottom Tab
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, paddingVertical: 8, paddingBottom: Platform.OS === 'ios' ? 20 : 8 },
  tabButton: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabLabel: { fontSize: 9, fontWeight: '600', marginTop: 2 },

  // E) Language
  langRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 14, marginTop: 10, borderTopWidth: 1, gap: 8 },
  langBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
  langBtnText: { fontSize: 12, fontWeight: '700' },

  // Onboarding
  onboardingContainer: { flex: 1, paddingHorizontal: 18, paddingTop: 10 },
  onboardingTopBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  onboardingThemePill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  onboardingThemeText: { fontSize: 11, fontWeight: '700', marginLeft: 6 },
  onboardingGuestBtn: { padding: 6 },
  skipText: { fontSize: 13, fontWeight: '700' },
  liveTickerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1, marginVertical: 6, alignSelf: 'center' },
  liveDotSmall: { width: 7, height: 7, borderRadius: 3.5, marginRight: 8 },
  liveTickerText: { fontSize: 11, fontWeight: '700' },
  onboardingBrandSection: { alignItems: 'center', marginVertical: 8 },
  pulsingEmblemWrapper: { shadowColor: '#F59E0B', shadowOffset: { width: 0, height: 0 }, shadowRadius: 18, elevation: 8 },
  onboardingLogoBox: { width: 66, height: 66, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  onboardingAppTitle: { fontSize: 22, fontWeight: '900', letterSpacing: 2 },
  onboardingAppSub: { fontSize: 11, fontWeight: '800', letterSpacing: 2.2, marginTop: 2 },
  onboardingAppMotto: { fontSize: 11, textAlign: 'center', marginTop: 4, paddingHorizontal: 16 },
  authCard: { borderRadius: 22, borderWidth: 1, padding: 18, marginVertical: 10 },
  authCardHeader: { marginBottom: 8 },
  authCardTitle: { fontSize: 16, fontWeight: '800' },
  authCardSub: { fontSize: 11, marginTop: 2, lineHeight: 16 },
  toggleAuthRow: { alignItems: 'center', marginTop: 12 },
  toggleAuthText: { fontSize: 12 },
  authTabSwitch: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, padding: 3 },
  authTabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, borderRadius: 9 },
  authTabBtnText: { fontSize: 12, fontWeight: '700' },
  bottomCreateAccountPill: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 16, borderWidth: 1, marginVertical: 8 },
  bottomCreateLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  bottomCreateDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  bottomCreateLabel: { fontSize: 12, fontWeight: '700' },
  bottomCreateSub: { fontSize: 10, marginTop: 1 },
  smallCreateBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1, marginLeft: 8 },
  smallCreateBtnText: { fontSize: 11, fontWeight: '800', marginRight: 4 },
  livingHighlights: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 6 },
  livingHighlightBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, margin: 2 },
  livingHighlightText: { fontSize: 10, fontWeight: '600', marginLeft: 6 },

  // Modals
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'center', padding: 20 },
  modalBox: { borderRadius: 20, borderWidth: 1, padding: 20 },
  modalTitle: { fontSize: 17, fontWeight: '800' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  switchLabel: { fontSize: 12, fontWeight: '600', flex: 1, marginRight: 8 },
  checkbox: { width: 20, height: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  profileHeaderBox: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, marginVertical: 12 },
  profileAvatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  profileName: { fontSize: 15, fontWeight: '800' },
  profileEmail: { fontSize: 11, marginTop: 1 },
  statusPill: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  statusText: { fontSize: 11, fontWeight: '700' },
  settingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1 },
  settingsLabel: { fontSize: 14, fontWeight: '700' },
  settingsSub: { fontSize: 11, marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
});
