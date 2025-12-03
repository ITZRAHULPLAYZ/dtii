import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Info,
  ArrowRight,
  Globe,
  CheckCircle,
  ChevronRight,
  Sun,
  Moon,
  PlayCircle,
  Volume2,
  VolumeX,
  Flame,
  Scroll,
  ChevronLeft,
  Award,
  Shield,
} from 'lucide-react';

// --- Custom CSS for Advanced Animations and Fonts ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=Cinzel:wght@400;700&display=swap');

  :root {
    --primary: #f97316;
    --secondary: #ec4899;
    --gold: #fbbf24;
  }

  .font-heading { font-family: 'Playfair Display', serif; }
  .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .font-epic { font-family: 'Cinzel', serif; }

  /* Smooth Scrolling */
  html { scroll-behavior: smooth; }

  /* Custom Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #ea580c; }

  /* Dialog / Modal Styles */
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
  }
  dialog[open] {
    animation: zoom-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom-in {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* Animations */
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  @keyframes slow-pan {
    0% { transform: scale(1.1) translate(0, 0); }
    50% { transform: scale(1.15) translate(-1%, -1%); }
    100% { transform: scale(1.1) translate(0, 0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-slow-pan { animation: slow-pan 40s ease-in-out infinite alternate; }
  .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-fade-in { animation: fade-in 1s ease-out forwards; }
  .animate-marquee { animation: marquee 40s linear infinite; }
  
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  }

  /* 3D Card Effect */
  .perspective-1000 { perspective: 1000px; }
  .transform-style-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .group:hover .group-hover-rotate-y-180 { transform: rotateY(180deg); }
  
  /* Hide scrollbar utility */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// --- Interfaces ---

interface ItemData {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  author: string;
  likes: number;
}

interface MythData {
  q: string;
  a: string;
  myth: boolean;
}

interface SpiceData {
  name: string;
  desc: string;
  color: string;
}

interface LanguageData {
  script: string;
  lang: string;
}

// --- Data ---
const INITIAL_DATA: ItemData[] = [
  {
    id: 1,
    title: 'Diwali',
    category: 'Festivals',
    description:
      'The Festival of Lights, symbolizing the spiritual victory of light over darkness.',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000',
    author: 'Admin',
    likes: 1240,
  },
  {
    id: 2,
    title: 'Taj Mahal',
    category: 'Architecture',
    description: 'An ivory-white marble mausoleum. A universal symbol of love.',
    image:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1000',
    author: 'HistoryBuff',
    likes: 3500,
  },
  {
    id: 3,
    title: 'Masala Dosa',
    category: 'Cuisine',
    description: 'A crispy fermented crepe made from rice batter and black lentils.',
    image:
      'https://images.unsplash.com/photo-1589301760014-d929645636c9?auto=format&fit=crop&q=80&w=1000',
    author: 'Foodie_Ind',
    likes: 890,
  },
  {
    id: 4,
    title: 'Kathakali',
    category: 'Arts',
    description: 'Classical dance known for elaborate colorful make-up and costumes.',
    image:
      'https://images.unsplash.com/photo-1623864757041-37f225577673?auto=format&fit=crop&q=80&w=1000',
    author: 'KeralaVibes',
    likes: 560,
  },
  {
    id: 5,
    title: 'Holi',
    category: 'Festivals',
    description: 'The vibrant Festival of Colors signifying the arrival of spring.',
    image:
      'https://images.unsplash.com/photo-1615892556447-07446e594f81?auto=format&fit=crop&q=80&w=1000',
    author: 'Admin',
    likes: 2100,
  },
  {
    id: 6,
    title: 'Varanasi',
    category: 'Places',
    description: 'The spiritual capital of India, famous for its Ghats along the Ganges.',
    image:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1000',
    author: 'YatraGuide',
    likes: 1450,
  },
];

const CATEGORIES: string[] = ['All', 'Festivals', 'Architecture', 'Cuisine', 'Arts', 'Places'];

const LANGUAGES: LanguageData[] = [
  { script: 'नमस्ते', lang: 'Hindi' },
  { script: 'வணக்கம்', lang: 'Tamil' },
  { script: 'নমস্কার', lang: 'Bengali' },
  { script: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', lang: 'Punjabi' },
  { script: 'ನಮಸ್ಕಾರ', lang: 'Kannada' },
  { script: 'നമസ്കാരം', lang: 'Malayalam' },
  { script: 'નમસ્તે', lang: 'Gujarati' },
  { script: 'नमस्कार', lang: 'Marathi' },
  { script: 'నమస్కారం', lang: 'Telugu' },
  { script: 'Hello', lang: 'English' },
];

const SPICES: SpiceData[] = [
  { name: 'Saffron', desc: 'The Red Gold', color: 'bg-red-500' },
  { name: 'Turmeric', desc: 'Golden Healer', color: 'bg-yellow-400' },
  { name: 'Cardamom', desc: 'Queen of Spices', color: 'bg-green-600' },
  { name: 'Chilli', desc: 'Fiery Soul', color: 'bg-red-700' },
  { name: 'Star Anise', desc: 'Exotic Star', color: 'bg-amber-800' },
];

const MYTHS: MythData[] = [
  {
    q: 'Is Hindi the national language?',
    a: 'No. India has no national language. Hindi and English are official languages.',
    myth: true,
  },
  {
    q: 'Is the Taj Mahal a palace?',
    a: 'No. It is a mausoleum (tomb) built by Emperor Shah Jahan for his wife.',
    myth: true,
  },
  {
    q: 'Did India invent Chess?',
    a: "Yes. It originated as 'Chaturanga' around the 6th century AD.",
    myth: false,
  },
  {
    q: 'Is India completely vegetarian?',
    a: 'No. While it has the most vegetarians, approx 70% of Indians eat meat.',
    myth: true,
  },
];

// --- Components ---

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center flex-col">
      <div className="relative">
        <div className="w-16 h-16 border-t-2 border-orange-500 border-solid rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-heading text-orange-600 font-bold">In</span>
        </div>
      </div>
      <h2 className="mt-6 text-gray-900 font-heading text-sm tracking-[0.4em] animate-pulse">
        NAMASTE
      </h2>
    </div>
  );
};

const VideoModal: React.FC = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const closeModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    return (
      <dialog
        id="video-modal"
        ref={dialogRef}
        className="bg-transparent p-0 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl m-auto backdrop:bg-white/30"
      >
        <div className="relative aspect-video bg-black group">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-all"
          >
            <X size={20} />
          </button>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/V75dMMIW2B4?autoplay=0&mute=1"
            title="Incredible India"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </dialog>
    );
};

interface NavBarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, onNavigate, darkMode, toggleTheme }) => (
  <nav
    className={`sticky top-0 z-40 transition-all duration-300 ${
      darkMode ? 'bg-black/90 border-white/5 text-white' : 'bg-white/90 border-gray-100 text-gray-900'
    } backdrop-blur-md border-b h-16`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div className="flex items-center justify-between h-full">
        <div onClick={() => onNavigate('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-pink-600 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div
              className={`relative w-full h-full rounded-lg border flex items-center justify-center ${
                darkMode ? 'bg-black border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 font-heading">
                In
              </span>
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-black tracking-tight">INCREDIBLE INDIA</h1>
          </div>
        </div>

        <div
          className={`hidden md:flex items-center gap-1 p-1 rounded-full border backdrop-blur-sm ${
            darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100/50 border-gray-200'
          }`}
        >
          {['home', 'explore', 'contribute'].map((tab) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all ${
            darkMode ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  </nav>
);

interface MythCardProps {
  item: MythData;
}

const MythCard: React.FC<MythCardProps> = ({ item }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="group perspective-1000 w-full h-52 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 flex flex-col items-center justify-center text-center text-white backface-hidden shadow-lg border border-white/20">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
            <Info size={20} />
          </div>
          <h3 className="text-lg font-bold font-heading leading-tight">{item.q}</h3>
          <p className="mt-3 text-[10px] uppercase tracking-widest opacity-70">Click to reveal</p>
        </div>
        <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden shadow-lg border border-gray-100 dark:border-gray-800">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
              item.myth
                ? 'bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-400'
                : 'bg-green-100 text-green-500 dark:bg-green-500/20 dark:text-green-400'
            }`}
          >
            {item.myth ? <X size={20} /> : <CheckCircle size={20} />}
          </div>
          <p className="text-sm font-medium leading-relaxed text-gray-800 dark:text-white">{item.a}</p>
        </div>
      </div>
    </div>
  );
};

// --- Sections ---

interface HeroProps {
  onNavigate: (tab: string) => void;
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    const openModal = () => {
        // Safe cast to HTMLDialogElement
        const modal = document.getElementById('video-modal') as HTMLDialogElement | null;
        if (modal) modal.showModal();
    }
    
    return (
  <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-gray-900">
    <div className="absolute inset-0 z-0 select-none">
      <img
        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000"
        className="w-full h-full object-cover opacity-70 animate-slow-pan"
        alt="India"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </div>

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6 animate-slide-up">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200/20 bg-white/10 backdrop-blur-md text-orange-200 text-xs font-bold tracking-[0.3em] uppercase mb-2 hover:bg-white/20 transition-all cursor-crosshair">
        <Flame size={14} className="animate-pulse" /> Welcome to the Motherland
      </div>

      <h1 className="font-heading text-5xl md:text-8xl font-black text-white tracking-tighter leading-none drop-shadow-2xl opacity-95">
        INCREDIBLE
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-green-400 mt-2">
          INDIA
        </span>
      </h1>

      <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
        5,000 years of history. 1.4 billion stories.{' '}
        <span className="text-orange-300 font-bold">One soul.</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-sm font-body transition-all hover:scale-105 overflow-hidden shadow-lg" onClick={() => onNavigate('explore')}>
          <span className="relative z-10 flex items-center gap-2">
            Start The Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        <button
          onClick={openModal}
          className="group px-8 py-4 bg-black/30 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-sm font-body hover:bg-black/50 transition-all flex items-center gap-2"
        >
          <PlayCircle size={16} className="group-hover:text-orange-400 transition-colors" /> Watch Cinematic
        </button>
      </div>
    </div>
  </div>
)};

interface EpicsSectionProps {
  darkMode: boolean;
}

const EpicsSection: React.FC<EpicsSectionProps> = ({ darkMode }) => (
  <div
    className={`py-20 relative overflow-hidden text-center transition-colors duration-500 ${
      darkMode ? 'bg-gray-950 text-white' : 'bg-amber-50 text-amber-900'
    }`}
  >
    {darkMode ? (
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20" />
    ) : (
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40" />
    )}

    <div className="max-w-4xl mx-auto px-4 relative z-10">
      <Scroll
        size={36}
        className={`mx-auto mb-6 opacity-80 ${darkMode ? 'text-amber-500' : 'text-amber-700'}`}
      />
      <h2
        className={`text-4xl md:text-6xl font-epic mb-6 ${
          darkMode
            ? 'text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-700'
            : 'text-amber-900'
        }`}
      >
        The Ancient Epics
      </h2>
      <p
        className={`text-lg md:text-xl font-heading italic leading-relaxed mb-10 max-w-2xl mx-auto ${
          darkMode ? 'text-amber-100/60' : 'text-amber-800/70'
        }`}
      >
        "You have the right to work, but for the work's sake only. You have no right to the fruits of work."
      </p>
      <div className="flex justify-center gap-3">
        <button
          className={`px-6 py-2.5 border rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${
            darkMode
              ? 'bg-gray-900 border-amber-500/30 text-amber-500 hover:bg-amber-900/20'
              : 'bg-white border-amber-900/10 text-amber-800 hover:bg-amber-100'
          }`}
        >
          Bhagavad Gita
        </button>
        <button
          className={`px-6 py-2.5 border rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${
            darkMode
              ? 'bg-gray-900 border-amber-500/30 text-amber-500 hover:bg-amber-900/20'
              : 'bg-white border-amber-900/10 text-amber-800 hover:bg-amber-100'
          }`}
        >
          Ramayana
        </button>
      </div>
    </div>
  </div>
);

// 🚀 Fixed infinite Spice Route scroll
const SpiceCarousel: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Create 3 sets for the buffer effect: [Left Buffer] [Main Set] [Right Buffer]
  const [infiniteSpices] = useState<SpiceData[]>([...SPICES, ...SPICES, ...SPICES]);

  const itemWidth = 280; // Card width (256px) + gap (24px)
  const setWidth = SPICES.length * itemWidth;

  // Initial positioning to the middle set (the “real” one)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = setWidth;
    }
  }, [setWidth]);

  // Keep user visually in the middle set while allowing free scroll / drag
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft } = container;

      // If the user drags too far left, jump forward by one set
      if (scrollLeft <= setWidth * 0.25) {
        container.scrollLeft = scrollLeft + setWidth;
      }
      // If the user drags too far right, jump back by one set
      else if (scrollLeft >= setWidth * 1.75) {
        container.scrollLeft = scrollLeft - setWidth;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [setWidth]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = itemWidth;
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;

    container.scrollTo({
      left: container.scrollLeft + delta,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`py-16 overflow-hidden relative transition-colors duration-500 ${
        darkMode ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-900'
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-12 bg-gradient-to-b z-10 ${
          darkMode ? 'from-stone-900' : 'from-stone-100'
        } to-transparent`}
      />
      <div className="max-w-7xl mx-auto px-4 mb-10 relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-2 w-full max-w-md">
          <div className="h-px bg-orange-500 flex-1 opacity-50" />
          <span className="text-orange-500 font-bold text-xs tracking-[0.3em] uppercase">
            Flavors of India
          </span>
          <div className="h-px bg-orange-500 flex-1 opacity-50" />
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-black text-center">The Spice Route</h2>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <button
          type="button"
          onClick={() => scroll('left')}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all ${
            darkMode ? 'bg-black/50 hover:bg-black text-white' : 'bg-white/80 hover:bg-white text-gray-800'
          }`}
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 pb-8 no-scrollbar snap-x cursor-grab active:cursor-grabbing justify-start md:justify-center"
        >
          {infiniteSpices.map((spice, idx) => (
            <div key={idx} className="flex-shrink-0 w-64 h-72 relative group snap-center perspective-1000">
              <div
                className={`absolute inset-0 ${spice.color} rounded-2xl transform transition-transform duration-500 group-hover:rotate-2 shadow-xl opacity-90`}
              />
              <div
                className={`absolute inset-0 rounded-2xl transform transition-transform duration-500 group-hover:-rotate-2 border p-6 flex flex-col justify-between ${
                  darkMode ? 'bg-stone-800 border-white/10' : 'bg-white border-stone-200'
                }`}
              >
                <div
                  className={`text-4xl font-black absolute top-4 right-4 font-heading ${
                    darkMode ? 'text-white/5' : 'text-gray-200'
                  }`}
                >
                  0{(idx % SPICES.length) + 1}
                </div>
                <div>
                  <h3
                    className={`text-2xl font-heading font-bold mb-1 ${
                      darkMode ? 'text-white' : 'text-stone-800'
                    }`}
                  >
                    {spice.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-orange-500 mb-3" />
                  <p
                    className={`text-sm leading-relaxed ${
                      darkMode ? 'text-gray-400' : 'text-stone-500'
                    }`}
                  >
                    {spice.desc}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center group-hover:border-orange-500 transition-colors self-end ${
                    darkMode ? 'border-white/20' : 'border-stone-200'
                  }`}
                >
                  <ArrowRight
                    size={16}
                    className={`${
                      darkMode
                        ? 'text-gray-500 group-hover:text-white'
                        : 'text-stone-400 group-hover:text-orange-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll('right')}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all ${
            darkMode ? 'bg-black/50 hover:bg-black text-white' : 'bg-white/80 hover:bg-white text-gray-800'
          }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const FactBuster: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <div className={`py-16 transition-colors duration-500 ${darkMode ? 'bg-black' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4">
      <h2
        className={`text-3xl font-heading font-black text-center mb-12 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Myth vs. Reality
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MYTHS.map((m, i) => (
          <MythCard key={i} item={m} />
        ))}
      </div>
    </div>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [items, setItems] = useState<ItemData[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const savedData = localStorage.getItem('indiaWikiData');
    if (savedData) setItems(JSON.parse(savedData));
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  if (loading) return (
    <>
      <style>{customStyles}</style>
      <Preloader onFinish={() => setLoading(false)} />
    </>
  );

  return (
    <div
      className={`min-h-screen font-body transition-colors duration-700 selection:bg-orange-500 selection:text-white ${
        darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <style>{customStyles}</style>
      <NavBar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <VideoModal />

      {/* Floating Audio Toggle */}
      <button
        onClick={() => setAudioPlaying(!audioPlaying)}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        {audioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <main>
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <Hero onNavigate={handleNavigate} darkMode={darkMode} />

            <div className="bg-orange-500 py-3 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex gap-8 text-white font-bold text-lg uppercase tracking-widest">
                {LANGUAGES.map((l, i) => (
                  <span key={i} className="opacity-80">
                    {l.script} • {l.lang}
                  </span>
                ))}
                {LANGUAGES.map((l, i) => (
                  <span key={`dup-${i}`} className="opacity-80">
                    {l.script} • {l.lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div className="py-16 relative overflow-hidden">
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none ${
                  darkMode
                    ? 'bg-gradient-to-r from-orange-500/10 to-pink-500/10'
                    : 'bg-gradient-to-r from-orange-200/40 to-pink-200/40'
                }`}
              />
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {INITIAL_DATA.slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleNavigate('explore')}
                      className={`group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow ${
                        darkMode ? 'border border-white/10' : 'border border-white bg-white'
                      }`}
                    >
                      <img
                        src={item.image}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-t from-black/90 to-transparent">
                        <div className="text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                          {item.category}
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white mb-1">{item.title}</h3>
                        <div className="h-0.5 w-0 bg-white group-hover:w-12 transition-all duration-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <EpicsSection darkMode={darkMode} />
            <SpiceCarousel darkMode={darkMode} />
            <FactBuster darkMode={darkMode} />

            <div
              className={`py-24 text-center px-4 ${
                darkMode ? 'bg-gradient-to-br from-orange-900 to-black' : 'bg-gradient-to-br from-orange-50 to-orange-100'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? 'bg-orange-500/20 text-orange-500' : 'bg-orange-200 text-orange-600'
                }`}
              >
                <Globe size={24} />
              </div>
              <h2
                className={`text-3xl md:text-5xl font-heading font-black mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Ready to Contribute?
              </h2>
              <p
                className={`max-w-xl mx-auto mb-8 text-base ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Join thousands of storytellers documenting the history of the subcontinent.
              </p>
              <button
                onClick={() => handleNavigate('contribute')}
                className={`px-8 py-3 rounded-full font-bold transition-all text-sm ${
                  darkMode
                    ? 'bg-white text-black hover:bg-orange-500 hover:text-white'
                    : 'bg-gray-900 text-white hover:bg-orange-600'
                }`}
              >
                Add Your Story
              </button>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className={`min-h-screen pt-24 px-4 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto">
              {/* Featured Item */}
              <div
                className={`relative rounded-3xl overflow-hidden mb-12 shadow-2xl group cursor-pointer ${
                  darkMode ? 'border border-white/10' : 'border border-white'
                }`}
              >
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors" />
                <img
                  src={INITIAL_DATA[0].image}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                    Featured Artifact
                  </span>
                  <h2 className="text-4xl font-heading font-bold text-white mb-2">{INITIAL_DATA[0].title}</h2>
                  <p className="text-white/90 line-clamp-2">{INITIAL_DATA[0].description}</p>
                </div>
              </div>

              <div className="mb-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                  <div>
                    <h2
                      className={`text-3xl font-heading font-black mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Explore Collection
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Discover {items.length} curated cultural artifacts.
                    </p>
                  </div>

                  <div className="relative w-full md:w-auto">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className={`w-full md:w-80 pl-12 pr-4 py-3 rounded-full outline-none transition-all shadow-sm focus:shadow-md ${
                        darkMode
                          ? 'bg-white/5 border border-white/10 focus:border-orange-500 text-white'
                          : 'bg-white border border-gray-200 focus:border-orange-500 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                          : darkMode
                          ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {items
                  .filter(
                    (i) =>
                      (selectedCategory === 'All' || i.category === selectedCategory) &&
                      i.title.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`group border rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/10'
                          : 'bg-white border-gray-100 shadow-sm hover:shadow-xl'
                      }`}
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3
                          className={`text-xl font-heading font-bold mb-2 group-hover:text-orange-500 transition-colors ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-sm line-clamp-2 mb-4 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {item.description}
                        </p>
                        <div
                          className={`flex items-center gap-2 pt-4 border-t ${
                            darkMode ? 'border-white/10' : 'border-gray-100'
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-[10px] text-white font-bold">
                            {item.author[0]}
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          >
                            Added by {item.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contribute' && (
          <div
            className={`min-h-screen flex items-center justify-center p-4 pt-24 ${
              darkMode ? 'bg-black' : 'bg-gray-50'
            }`}
          >
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Info Side */}
              <div className="space-y-6 p-4">
                <h2
                  className={`text-4xl font-heading font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Share Your Heritage
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Help us build the largest digital archive of Indian culture. Your contribution
                  matters.
                </p>

                <div className="space-y-4 pt-4">
                  <div
                    className={`flex items-start gap-4 p-4 rounded-xl ${
                      darkMode ? 'bg-white/5' : 'bg-white border border-gray-100 shadow-sm'
                    }`}
                  >
                    <Shield className="text-orange-500 mt-1" />
                    <div>
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Authentic Content
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        Ensure your facts are accurate and respect cultural sensitivities.
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start gap-4 p-4 rounded-xl ${
                      darkMode ? 'bg-white/5' : 'bg-white border border-gray-100 shadow-sm'
                    }`}
                  >
                    <Award className="text-orange-500 mt-1" />
                    <div>
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Earn Recognition
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        Top contributors are featured on our weekly leaderboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div
                className={`p-8 rounded-3xl backdrop-blur-xl border ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-white shadow-xl'
                }`}
              >
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Title
                    </label>
                    <input
                      className={`w-full p-4 border rounded-xl outline-none focus:border-orange-500 transition-colors text-sm ${
                        darkMode
                          ? 'bg-black/20 border-white/10 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                      placeholder="e.g. Madhubani Art"
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Category
                    </label>
                    <select
                      className={`w-full p-4 border rounded-xl outline-none focus:border-orange-500 transition-colors text-sm cursor-pointer ${
                        darkMode
                          ? 'bg-black/20 border-white/10 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    >
                      {CATEGORIES.slice(1).map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Description
                    </label>
                    <textarea
                      className={`w-full p-4 border rounded-xl outline-none focus:border-orange-500 transition-colors text-sm ${
                        darkMode
                          ? 'bg-black/20 border-white/10 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                      rows={4}
                      placeholder="Share the history and significance..."
                    />
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-white hover:scale-[1.02] transition-transform text-sm shadow-lg shadow-orange-500/20">
                    Submit Contribution
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer
        className={`py-6 text-center text-xs border-t ${
          darkMode ? 'bg-black text-gray-600 border-white/5' : 'bg-white text-gray-400 border-gray-100'
        }`}
      >
        <p>© 2024 Incredible India Project.</p>
      </footer>
    </div>
  );
};

export default App;
