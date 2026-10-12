import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import {
  Clock,
  Euro,
  Star,
  Users,
  ShieldCheck,
  Check,
  Calendar,
  Sparkles,
  MapPin,
  ChevronRight,
  Phone,
  Mail,
  Compass,
  ArrowRight,
  X as CloseIcon,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Quote,
  Send,
  Heart,
  CheckCircle2,
  Menu,
  Building2,
  Award,
  Globe2,
  Bookmark,
  Zap
} from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  highlights: string[];
  included: string[];
  groupSize: string;
}

const TOURS: Tour[] = [
  {
    id: 'eiffel-summit',
    title: 'Eiffel Tower Summit Experience',
    tagline: 'Skip-the-line access and a guided climb with sweeping city views.',
    description: 'Bypass the multi-hour ticket lines with our licensed historian. Ascend through iron lattice arches to the highest panoramic observation deck in Paris, tasting champagne as the city unfolds beneath you.',
    duration: '3 hours',
    price: 79,
    category: 'Iconic Landmarks',
    rating: 4.95,
    reviewsCount: 840,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Priority Summit Elevator & Stairs', 'Secret history of Gustave Eiffel\'s private office', 'Champagne toast at the summit bar'],
    included: ['Direct summit entry ticket', 'Expert licensed Paris guide', 'Personal headset for clear commentary'],
    groupSize: 'Max 8 guests'
  },
  {
    id: 'louvre-masterpieces',
    title: 'Louvre Museum Masterpieces',
    tagline: 'See the Mona Lisa and hidden gems with an expert art guide.',
    description: 'Navigate the world\'s largest palace museum without feeling overwhelmed. Our art historian whisks you past the queue straight to the Mona Lisa, Winged Victory, Venus de Milo, and intimate Renaissance chambers.',
    duration: '3 hours',
    price: 89,
    category: 'Art & Culture',
    rating: 4.98,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Reserved express priority entrance', 'Intimate viewings of Da Vinci & Delacroix', 'Secret royal passages and moat remnants'],
    included: ['All museum tickets included', 'Certified Art Historian Guide', 'Digital museum floor guide'],
    groupSize: 'Max 6 guests'
  },
  {
    id: 'seine-dinner-cruise',
    title: 'Seine River Dinner Cruise',
    tagline: 'Candlelit three-course dinner as the monuments light up.',
    description: 'Drift past Notre-Dame, the Musée d\'Orsay, and the glittering Eiffel Tower aboard a panoramic glass vessel. Savor chef-prepared French haute cuisine with paired Grands Crus as live musicians set the mood.',
    duration: '2.5 hours',
    price: 129,
    category: 'Dining & Romance',
    rating: 4.92,
    reviewsCount: 510,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Guaranteed window seating', '3-course seasonal menu with wine pairings', 'Synchronized arrival for the Eiffel Tower sparkle'],
    included: ['3-Course Gourmet Dinner', 'Aperitif & AOC Wine Selection', 'Live acoustic French jazz musicians'],
    groupSize: 'Private tables'
  },
  {
    id: 'montmartre-walk',
    title: 'Montmartre and Sacré-Cœur Walk',
    tagline: 'Artists’ lanes, hidden cafés and the best view of Paris.',
    description: 'Wind through cobblestone alleyways where Picasso, Van Gogh, and Renoir painted. Discover hidden vineyards, romantic windmills, and end at the dome of Sacré-Cœur overlooking all 20 arrondissements.',
    duration: '2.5 hours',
    price: 45,
    category: 'Neighborhood Walks',
    rating: 4.96,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1000&q=80',
    highlights: ['The bohemian artist square Place du Tertre', 'Historic Lapin Agile cabaret & secret vineyard', 'Sunset viewpoint at Sacré-Cœur basilica'],
    included: ['Local Montmartre neighborhood guide', 'Artisan pastry tasting stop', 'Curated neighborhood secret map'],
    groupSize: 'Max 10 guests'
  },
  {
    id: 'versailles-palace',
    title: 'Versailles Palace Day Trip',
    tagline: 'Palace, gardens and fountains with transport included.',
    description: 'Step into the gilded universe of the Sun King Louis XIV. Marvel at the Hall of Mirrors, explore Marie Antoinette’s picturesque Petit Trianon, and stroll the grand musical fountains with seamless roundtrip private transit.',
    duration: '8 hours',
    price: 119,
    category: 'Day Trips',
    rating: 4.91,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Skip-the-line Palace & Trianon access', 'Spectacular Musical Gardens / Fountains show', 'Queen’s Hamlet fairytale village'],
    included: ['Private air-conditioned coach from central Paris', 'Passport ticket to all estate areas', 'Audio and live escort accompaniment'],
    groupSize: 'Small group luxury coach'
  },
  {
    id: 'food-wine-tour',
    title: 'French Food and Wine Tour',
    tagline: 'Taste cheese, pastries and wine in the Latin Quarter.',
    description: 'A sensory culinary safari through centuries-old Parisian market streets. Meet master affineurs, chocolatiers, and sommeliers while sampling 8 rare artisanal cheeses, fresh butter croissants, charcuterie, and aged Bordeaux.',
    duration: '3.5 hours',
    price: 99,
    category: 'Gastronomy',
    rating: 4.99,
    reviewsCount: 590,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    highlights: ['8 artisan cheese & charcuterie tastings', 'Private cellar wine tasting session with sommelier', 'Warm freshly baked baguettes & macarons'],
    included: ['All food and wine tastings included', 'Culinary historian guide', 'Printed pairing guide & cellar discounts'],
    groupSize: 'Max 8 food lovers'
  }
];

const TOTAL_FRAMES = 279;

function getFrameUrl(index: number) {
  const pad = String(index + 1).padStart(3, '0');
  return `/travel-1/ezgif-frame-${pad}.jpg`;
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Smooth Scroll Canvas Engine
  useEffect(() => {
    // 1. Setup Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // 2. Setup Canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const loadedFlags: boolean[] = new Array(TOTAL_FRAMES).fill(false);

    let currentFrame = 0;
    let targetFrame = 0;
    let lastRenderedIndex = -1;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      lastRenderedIndex = -1;
      render(Math.round(currentFrame));
    };

    const drawImageCover = (img: HTMLImageElement) => {
      if (!img || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;

      let dw: number, dh: number, dx: number, dy: number;

      if (canvasRatio > imgRatio) {
        dw = cw;
        dh = cw / imgRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dw = ch * imgRatio;
        dh = ch;
        dx = (cw - dw) / 2;
        dy = 0;
      }

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const getBestAvailableFrame = (index: number): HTMLImageElement | null => {
      if (loadedFlags[index] && images[index]) return images[index];

      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0 && loadedFlags[prev] && images[prev]) return images[prev];

        const next = index + offset;
        if (next < TOTAL_FRAMES && loadedFlags[next] && images[next]) return images[next];
      }
      return null;
    };

    const render = (index: number) => {
      if (index === lastRenderedIndex && loadedFlags[index]) return;

      const img = getBestAvailableFrame(index);
      if (img) {
        drawImageCover(img);
        if (loadedFlags[index]) {
          lastRenderedIndex = index;
        }
      }
    };

    // Preload frame 0 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      loadedFlags[0] = true;
      resizeCanvas();
      render(0);
    };

    // Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        images[i] = img;
        loadedFlags[i] = true;
        if (Math.round(currentFrame) === i) {
          render(i);
        }
      };
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(p);
      targetFrame = p * (TOTAL_FRAMES - 1);
    };

    let tickId: number;
    const tick = () => {
      const lerpFactor = 0.1;
      const diff = targetFrame - currentFrame;

      if (Math.abs(diff) < 0.01) {
        currentFrame = targetFrame;
      } else {
        currentFrame += diff * lerpFactor;
      }

      render(Math.round(currentFrame));
      tickId = requestAnimationFrame(tick);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    resizeCanvas();
    handleScroll();
    tickId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(tickId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const scrollToProgress = (p: number) => {
    if (!containerRef.current) return;
    const total = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: p * total,
      behavior: 'smooth'
    });
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingTour(null);
    }, 2800);
  };

  const filteredTours = activeCategory === 'All'
    ? TOURS.slice(0, 3)
    : TOURS.filter(t => t.category === activeCategory).slice(0, 3);

  const categories = ['All', 'Iconic Landmarks', 'Art & Culture', 'Dining & Romance'];

  // Opacity & Translation Calculations for each of the 5 Landing Stages
  // Stage 0: 0.00 - 0.18 (Hero)
  const s0Opacity = scrollProgress <= 0.14 ? 1 : Math.max(0, 1 - (scrollProgress - 0.14) / 0.06);
  const s0Y = scrollProgress * -70;

  // Stage 1: 0.20 - 0.38 (About Us - Screenshot 1)
  const s1Opacity =
    scrollProgress < 0.18
      ? 0
      : scrollProgress <= 0.23
      ? (scrollProgress - 0.18) / 0.05
      : scrollProgress <= 0.35
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.35) / 0.05);
  const s1Y = (0.28 - scrollProgress) * 60;

  // Stage 2: 0.39 - 0.58 (Tours & Experiences - Screenshot 2)
  const s2Opacity =
    scrollProgress < 0.38
      ? 0
      : scrollProgress <= 0.43
      ? (scrollProgress - 0.38) / 0.05
      : scrollProgress <= 0.55
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.55) / 0.05);
  const s2Y = (0.48 - scrollProgress) * 60;

  // Stage 3: 0.59 - 0.78 (Loved by Travelers & Reviews - Screenshot 3)
  const s3Opacity =
    scrollProgress < 0.58
      ? 0
      : scrollProgress <= 0.63
      ? (scrollProgress - 0.58) / 0.05
      : scrollProgress <= 0.75
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.75) / 0.05);
  const s3Y = (0.68 - scrollProgress) * 60;

  // Stage 4: 0.79 - 1.00 (Ready for Your Paris Story & FAQ / Footer - Screenshots 4 & 5)
  const s4Opacity =
    scrollProgress < 0.78
      ? 0
      : scrollProgress <= 0.84
      ? (scrollProgress - 0.78) / 0.06
      : 1;
  const s4Y = Math.max(0, (0.84 - scrollProgress) * 40);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-400 selection:text-neutral-950">
      
      {/* =========================================================================
          TOP NAVIGATION BAR (Floating & Glassmorphic)
          ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/70 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button onClick={() => scrollToProgress(0)} className="flex items-center gap-3 group text-left cursor-pointer">
            <div className="w-10 h-10 rounded-full border border-amber-300/40 bg-amber-400/10 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif-display text-xl tracking-wider font-semibold text-white block">
                PARIS CURATED
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block -mt-1">
                Beyond the Postcard
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <button onClick={() => scrollToProgress(0)} className="hover:text-amber-300 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToProgress(0.26)} className="hover:text-amber-300 transition-colors cursor-pointer">
              About Us
            </button>
            <button onClick={() => scrollToProgress(0.47)} className="hover:text-amber-300 transition-colors cursor-pointer">
              Tours & Experiences
            </button>
            <button onClick={() => scrollToProgress(0.68)} className="hover:text-amber-300 transition-colors cursor-pointer">
              Reviews
            </button>
            <button onClick={() => scrollToProgress(0.90)} className="hover:text-amber-300 transition-colors cursor-pointer">
              Plan My Trip
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => scrollToProgress(0.90)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 text-neutral-950 font-semibold text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] active:scale-95 transition-all cursor-pointer"
            >
              Plan My Trip
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-950/95 border-b border-white/10 px-6 py-6 space-y-4">
            <button
              onClick={() => { setIsMenuOpen(false); scrollToProgress(0); }}
              className="block w-full text-left text-base text-neutral-300 hover:text-amber-300 py-1"
            >
              Home
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); scrollToProgress(0.26); }}
              className="block w-full text-left text-base text-neutral-300 hover:text-amber-300 py-1"
            >
              About Us
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); scrollToProgress(0.47); }}
              className="block w-full text-left text-base text-neutral-300 hover:text-amber-300 py-1"
            >
              Tours & Experiences
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); scrollToProgress(0.68); }}
              className="block w-full text-left text-base text-neutral-300 hover:text-amber-300 py-1"
            >
              Reviews
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); scrollToProgress(0.90); }}
              className="block w-full text-left text-base text-amber-300 font-medium py-1"
            >
              Plan My Trip
            </button>
          </div>
        )}
      </header>

      {/* =========================================================================
          CONTINUOUS SCROLL STORY CONTAINER (NO SEPARATE STATIC SECTIONS BELOW)
          ========================================================================= */}
      <div ref={containerRef} className="relative h-[650vh] w-full bg-neutral-950">
        
        {/* Pinned Viewport holding Canvas + 5 Dynamic Landing Stages */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Canvas WebGL Video Scrubbing Layer */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle Scrim so Background Animation is Crystal Clear and Vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-neutral-950/30 pointer-events-none" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* =====================================================================
              STAGE 0: HERO (Airplane Departure & Trusted Travelers)
              ===================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8 text-center transition-all duration-200"
            style={{
              opacity: s0Opacity,
              transform: `translateY(${s0Y}px)`,
              pointerEvents: s0Opacity < 0.1 ? 'none' : 'auto',
            }}
          >
            <div className="h-6" />

            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/30 bg-amber-400/[0.12] backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(251,191,36,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-200">
                  PARIS, CURATED FOR YOU
                </span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-semibold text-white tracking-tight leading-[1.08] mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Discover Paris,{' '}
                <span className="italic font-normal bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Beyond the Postcard
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-neutral-200 max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Handcrafted tours, skip-the-line experiences and private guides, so you spend your time in the City of Light and not in queues.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <button
                  onClick={() => scrollToProgress(0.90)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-neutral-950 font-semibold text-sm shadow-[0_4px_25px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_35px_rgba(251,191,36,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Plan My Trip</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToProgress(0.47)}
                  className="px-7 py-3.5 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Tours</span>
                  <ChevronDown className="w-4 h-4 text-neutral-300 animate-bounce" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 pt-2">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>4.9 rating from 2,000+ travelers · Licensed local guides · Free cancellation</span>
              </div>
            </div>

            {/* Bottom Partners */}
            <div className="w-full max-w-5xl mx-auto pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-neutral-400 text-xs sm:text-sm font-medium tracking-widest uppercase">
              <span>CONDÉ NAST TRAVELER</span>
              <span>ARCHITECTURAL DIGEST</span>
              <span>LE MONDE VOYAGES</span>
              <span>VOGUE PARIS</span>
            </div>
          </div>

          {/* =====================================================================
              STAGE 1: ABOUT US ("Your Local Friends in Paris" - Screenshot 1)
              ===================================================================== */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-200"
            style={{
              opacity: s1Opacity,
              transform: `translateY(${s1Y}px)`,
              pointerEvents: s1Opacity < 0.1 ? 'none' : 'auto',
            }}
          >
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Text & Bullets */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/25 bg-amber-400/15 backdrop-blur-md text-amber-300 text-xs uppercase tracking-widest font-semibold mb-4">
                  OUR STORY & PHILOSOPHY
                </div>

                <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-5 drop-shadow-md">
                  Your Local Friends in Paris
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-normal mb-7 drop-shadow-sm">
                  We are a team of Paris-born guides and travel designers who believe the best trips feel personal, not packaged. From the first coffee in Montmartre to the last sunset on the Seine, we handle every detail so you can simply enjoy the city.
                </p>

                {/* Bullets box - Frosted Transparent Glass */}
                <div className="p-5 rounded-2xl border border-white/20 bg-slate-950/35 backdrop-blur-xl space-y-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-amber-300" />
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200">
                      <strong className="text-white">Zero Assembly-Line Tourism:</strong> We cap every guided experience to small, conversational groups with hand-picked local storytellers.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-amber-300" />
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200">
                      <strong className="text-white">Direct Line to Your Guide:</strong> Instant WhatsApp concierge connection from arrival until your farewell flight.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: 4 Highlight Metric Cards - Frosted Transparent Glass (Matching Ref Image 5) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                
                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 hover:border-amber-400/40 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-white mb-1">
                    8+ Years
                  </div>
                  <p className="text-xs text-neutral-300">Crafting Paris journeys</p>
                </div>

                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 hover:border-amber-400/40 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-white mb-1">
                    50+ Local Guides
                  </div>
                  <p className="text-xs text-neutral-300">Multilingual and certified</p>
                </div>

                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 hover:border-amber-400/40 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-white mb-1">
                    15,000+
                  </div>
                  <p className="text-xs text-neutral-300">Happy Travelers from 60 countries</p>
                </div>

                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 hover:border-amber-400/40 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-semibold text-white mb-1">
                    24/7 Support
                  </div>
                  <p className="text-xs text-neutral-300">Help during your whole trip</p>
                </div>

              </div>
            </div>
          </div>

          {/* =====================================================================
              STAGE 2: TOURS & EXPERIENCES (Screenshot 2)
              ===================================================================== */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-200"
            style={{
              opacity: s2Opacity,
              transform: `translateY(${s2Y}px)`,
              pointerEvents: s2Opacity < 0.1 ? 'none' : 'auto',
            }}
          >
            <div className="max-w-7xl w-full mx-auto flex flex-col justify-center">
              
              <div className="text-center max-w-3xl mx-auto mb-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-2">
                  CURATED ITINERARIES
                </div>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-2 drop-shadow-md">
                  Tours & Experiences
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm">
                  Explore Paris without the friction. Direct skip-the-line access, private access paths, and small-group storytelling.
                </p>

                {/* Filter categories */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer backdrop-blur-md ${
                        activeCategory === cat
                          ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                          : 'border border-white/15 bg-white/10 text-neutral-200 hover:bg-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Tour Cards Grid (Screenshot 2) - Frosted Translucent Glass */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="group rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl overflow-hidden flex flex-col justify-between hover:border-amber-400/50 hover:bg-slate-900/50 transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
                  >
                    <div>
                      {/* Tour Image */}
                      <div className="relative h-44 w-full overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                            {tour.category}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white border border-white/20">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{tour.rating}</span>
                          <span className="text-neutral-300 text-[9px]">({tour.reviewsCount})</span>
                        </div>

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px]">
                            <Clock className="w-3 h-3 text-amber-300" />
                            {tour.duration}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-amber-400 text-neutral-950 font-bold text-xs">
                            From €{tour.price}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <h3 className="font-serif-display text-lg font-semibold text-white mb-1.5 group-hover:text-amber-200 transition-colors">
                          {tour.title}
                        </h3>
                        <p className="text-xs text-neutral-200 leading-relaxed mb-3 line-clamp-2">
                          {tour.tagline}
                        </p>

                        <div className="space-y-1 pt-2.5 border-t border-white/10 mb-1">
                          {tour.highlights.slice(0, 2).map((hl, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-300">
                              <Check className="w-3 h-3 text-amber-400 shrink-0" />
                              <span className="truncate">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-5 pt-0 flex items-center gap-2.5">
                      <button
                        onClick={() => setSelectedTour(tour)}
                        className="flex-1 py-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-md transition-all text-center cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setBookingTour(tour)}
                        className="flex-1 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-all text-center shadow-[0_4px_20px_rgba(251,191,36,0.35)] cursor-pointer"
                      >
                        Book Tour
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* =====================================================================
              STAGE 3: WHY CHOOSE US & REVIEWS (Screenshot 3)
              ===================================================================== */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-200"
            style={{
              opacity: s3Opacity,
              transform: `translateY(${s3Y}px)`,
              pointerEvents: s3Opacity < 0.1 ? 'none' : 'auto',
            }}
          >
            <div className="max-w-7xl w-full mx-auto flex flex-col justify-center">
              
              <div className="text-center max-w-3xl mx-auto mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/25 bg-amber-400/15 backdrop-blur-md text-amber-300 text-xs uppercase tracking-widest font-semibold mb-2">
                  THE PARISIAN DIFFERENCE
                </div>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-2 drop-shadow-md">
                  Loved by Travelers Around the World
                </h2>
                <p className="text-neutral-200 text-xs sm:text-sm">
                  Here is why over 15,000 travelers choose us for their dream voyage to Paris.
                </p>
              </div>

              {/* 3 Why Choose Us Points - Frosted Transparent Glass (Matching Ref Image 5) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-white mb-1.5">
                    Skip-the-line access
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Save hours at every major attraction with our pre-booked priority access gates and VIP time slots.
                  </p>
                </div>

                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-white mb-1.5">
                    Small groups, private options
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Never more than 10 guests per tour so you can ask every question, hear every word, and move at an easy pace.
                  </p>
                </div>

                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <Euro className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-white mb-1.5">
                    Transparent pricing
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    No hidden fees, no surprise guide tips required, and 100% free cancellation up to 48 hours before departure.
                  </p>
                </div>
              </div>

              {/* 3 Verified Reviews - Frosted Transparent Glass */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex flex-col justify-between">
                  <div className="text-amber-400 font-serif-display text-3xl font-bold mb-2">“</div>
                  <p className="text-xs sm:text-sm text-neutral-200 italic mb-4 leading-relaxed">
                    “The Eiffel Tower night tour was magical. Our guide knew every story and every photo spot.”
                  </p>
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex flex-col justify-between">
                  <div className="text-amber-400 font-serif-display text-3xl font-bold mb-2">“</div>
                  <p className="text-xs sm:text-sm text-neutral-200 italic mb-4 leading-relaxed">
                    “Everything was organized perfectly, from the hotel pickup to the dinner cruise. Zero stress.”
                  </p>
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl border border-white/20 bg-slate-950/35 backdrop-blur-xl hover:bg-slate-900/50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex flex-col justify-between">
                  <div className="text-amber-400 font-serif-display text-3xl font-bold mb-2">“</div>
                  <p className="text-xs sm:text-sm text-neutral-200 italic mb-4 leading-relaxed">
                    “We saw the Louvre without the crowds. Worth every euro.”
                  </p>
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* =====================================================================
              STAGE 4: ITINERARY BUILDER, FAQ & FOOTER (Screenshots 4 & 5)
              ===================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col justify-between py-16 px-4 sm:px-6 lg:px-8 overflow-y-auto transition-all duration-200"
            style={{
              opacity: s4Opacity,
              transform: `translateY(${s4Y}px)`,
              pointerEvents: s4Opacity < 0.1 ? 'none' : 'auto',
            }}
          >
            <div className="max-w-7xl w-full mx-auto my-auto space-y-10">
              
              {/* Screenshot 4: Request Your Custom Itinerary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Info */}
                <div className="lg:col-span-5 space-y-5">
                  <span className="inline-block px-3.5 py-1 rounded-full border border-amber-400/25 bg-amber-400/15 backdrop-blur-md text-amber-300 text-xs uppercase tracking-widest font-semibold">
                    TAILORED TO YOU
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight drop-shadow-md">
                    Ready for Your Paris Story?
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    Tell us your dates and interests, and we will send a custom itinerary within 24 hours. No obligation.
                  </p>

                  <div className="p-6 rounded-3xl border border-white/20 bg-white/[0.04] backdrop-blur-xl space-y-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-100">
                      <Mail className="w-4 h-4 text-amber-300" />
                      <span>hello@pariscurated.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-100">
                      <Phone className="w-4 h-4 text-amber-300" />
                      <span>+33 1 23 45 67 89 · WhatsApp 24/7</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-100">
                      <Clock className="w-4 h-4 text-amber-300" />
                      <span>Mon to Sun, 9 AM to 8 PM (Paris time)</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] backdrop-blur-xl text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant response guarantee: Free revisions until your journey itinerary is 100% perfect.</span>
                  </div>
                </div>

                {/* Right Form (Screenshot 4) - Ultra-Transparent Frosted Glass Card */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-8 rounded-3xl border border-white/20 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-white mb-1">
                      Request Your Custom Itinerary
                    </h3>
                    <p className="text-xs text-neutral-200 mb-6">
                      Tell us your dream voyage details. No deposit or credit card required.
                    </p>

                    {formSubmitted ? (
                      <div className="p-6 text-center rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 space-y-2 backdrop-blur-md">
                        <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                        <h4 className="text-base font-bold text-white">Itinerary Request Received!</h4>
                        <p className="text-xs text-neutral-200">
                          Our local travel designer is preparing your custom Paris proposal. Check your inbox shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-[11px] text-neutral-200 block mb-1">Full Name *</label>
                            <input
                              required
                              placeholder="e.g. Sarah Miller"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-md text-white text-xs focus:outline-none focus:bg-white/[0.08] focus:border-amber-400 placeholder:text-neutral-400 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-neutral-200 block mb-1">Email Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="sarah@example.com"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-md text-white text-xs focus:outline-none focus:bg-white/[0.08] focus:border-amber-400 placeholder:text-neutral-400 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-[11px] text-neutral-200 block mb-1">Travel Dates *</label>
                            <input
                              required
                              placeholder="e.g. Oct 18 – Oct 25, 2026"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-md text-white text-xs focus:outline-none focus:bg-white/[0.08] focus:border-amber-400 placeholder:text-neutral-400 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-neutral-200 block mb-1">Number of Travelers *</label>
                            <select className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-md text-white text-xs focus:outline-none focus:bg-white/[0.08] focus:border-amber-400 cursor-pointer transition-colors">
                              <option className="bg-neutral-900 text-white">2 Travelers (Couple / Friends)</option>
                              <option className="bg-neutral-900 text-white">1 Solo Traveler</option>
                              <option className="bg-neutral-900 text-white">3-4 Small Group / Family</option>
                              <option className="bg-neutral-900 text-white">5+ Private Group</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] text-neutral-200 block mb-1">Message & Interests (Optional)</label>
                          <textarea
                            rows={3}
                            placeholder="Tell us what you love (e.g. art, secret bistros, architecture, romantic photo spots, family with kids)..."
                            className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-md text-white text-xs focus:outline-none focus:bg-white/[0.08] focus:border-amber-400 placeholder:text-neutral-400 transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-[0_4px_25px_rgba(251,191,36,0.4)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Get My Free Itinerary</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>

              {/* Screenshot 5: FAQ & Footer */}
              <div className="pt-6 border-t border-white/10 space-y-6">
                <h3 className="font-serif-display text-2xl text-center text-white font-semibold drop-shadow-md">
                  Frequently Asked Questions
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
                  {[
                    { q: "What does 'Skip-the-line' access really mean in Paris?", a: "We purchase reserved VIP express gate admissions in advance, bypassing all ticket-buying lines directly to dedicated security entry checkpoints." },
                    { q: "What is your cancellation and rescheduling policy?", a: "Cancel up to 48 hours before any scheduled departure for a 100% full refund, no questions asked." },
                    { q: "Are the tours suitable for families with children?", a: "Yes! Our guides love adapting stories with treasure hunts and engaging trivia for young explorers." },
                    { q: "Where do we meet our guide before the tour?", a: "You'll receive a detailed WhatsApp pin location with guide photo, meeting point directions, and direct phone contact 24 hours prior." }
                  ].map((faq, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="p-4 rounded-2xl border border-white/20 bg-white/[0.04] backdrop-blur-xl cursor-pointer hover:bg-white/[0.08] hover:border-amber-400/40 transition-all shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-white">
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-amber-300 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                      </div>
                      {activeFaq === i && (
                        <p className="text-xs text-neutral-200 mt-2.5 pt-2 border-t border-white/10 leading-relaxed">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Brand Info (Screenshot 5) */}
                <div className="pt-6 text-center text-xs text-neutral-400 border-t border-white/10">
                  <p>© 2026 Paris Curated. Beyond the Postcard. All rights reserved.</p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          MODAL: TOUR DETAILS
          ========================================================================= */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-neutral-950 text-white shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
              <img src={selectedTour.image} alt={selectedTour.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-950/80 text-amber-300 border border-amber-400/30">
                  {selectedTour.category}
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-white mt-1">
                  {selectedTour.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedTour.description}
            </p>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs uppercase tracking-widest text-amber-300 font-bold">Experience Highlights</h4>
              <ul className="space-y-2">
                {selectedTour.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  const tour = selectedTour;
                  setSelectedTour(null);
                  setBookingTour(tour);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-neutral-950 font-bold text-sm transition-all shadow-lg text-center cursor-pointer"
              >
                Book This Tour (€{selectedTour.price})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: QUICK TOUR BOOKING
          ========================================================================= */}
      {bookingTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl border border-white/20 bg-neutral-950 text-white shadow-2xl">
            <button
              onClick={() => { setBookingTour(null); setBookingConfirmed(false); }}
              className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-semibold text-white">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Your skip-the-line vouchers for <strong className="text-white">{bookingTour.title}</strong> have been sent to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">Reserve Your Spot</span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-white mt-1">
                    {bookingTour.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    From €{bookingTour.price} per person · Free cancellation
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Your Full Name</label>
                  <input
                    required
                    placeholder="e.g. Thomas Wayne"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-neutral-900 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300">Email for Ticket Vouchers</label>
                  <input
                    type="email"
                    required
                    placeholder="thomas@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-neutral-900 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Preferred Date</label>
                    <input
                      type="date"
                      required
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 rounded-xl border border-white/20 bg-neutral-900 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Guests</label>
                    <select
                      className="w-full px-3 py-2 rounded-xl border border-white/20 bg-neutral-900 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="1">1 Adult (€{bookingTour.price})</option>
                      <option value="2">2 Adults (€{bookingTour.price * 2})</option>
                      <option value="3">3 Adults (€{bookingTour.price * 3})</option>
                      <option value="4">4 Adults (€{bookingTour.price * 4})</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer mt-2"
                >
                  Confirm Reservation · Instant Tickets
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
