import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Star,
  Check,
  ShieldCheck,
  Compass,
  Zap,
  Users,
  Award,
  Globe2,
  Calendar,
  Building2,
  Bookmark
} from 'lucide-react';

const TOTAL_FRAMES = 279;

function getFrameUrl(index: number) {
  const pad = String(index + 1).padStart(3, '0');
  return `/travel-1/ezgif-frame-${pad}.jpg`;
}

interface HeroScrollCanvasProps {
  onExploreTours: () => void;
  onBookNow: () => void;
}

export const HeroScrollCanvas: React.FC<HeroScrollCanvasProps> = ({
  onExploreTours,
  onBookNow,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const loadedFlags: boolean[] = new Array(TOTAL_FRAMES).fill(false);

    let currentFrame = 0;
    let targetFrame = 0;
    let lastRenderedIndex = -1;
    let animationFrameId: number;

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

    // Preload first frame immediately
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
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(p);
      targetFrame = p * (TOTAL_FRAMES - 1);
    };

    const tick = () => {
      const lerpFactor = 0.1;
      const diff = targetFrame - currentFrame;

      if (Math.abs(diff) < 0.01) {
        currentFrame = targetFrame;
      } else {
        currentFrame += diff * lerpFactor;
      }

      render(Math.round(currentFrame));
      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    resizeCanvas();
    handleScroll();
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Opacity & transform calculation helpers for each stage
  // Stage 0: 0.00 - 0.18
  const stage0Opacity = progress <= 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) / 0.07);
  const stage0Y = progress * -80;

  // Stage 1: 0.20 - 0.38 (About Statement in Clouds)
  const stage1Opacity =
    progress < 0.20
      ? 0
      : progress <= 0.25
      ? (progress - 0.20) / 0.05
      : progress <= 0.35
      ? 1
      : Math.max(0, 1 - (progress - 0.35) / 0.05);
  const stage1Y = (0.28 - progress) * 60;

  // Stage 2: 0.40 - 0.58 (4 Glassmorphic Feature Cards)
  const stage2Opacity =
    progress < 0.40
      ? 0
      : progress <= 0.45
      ? (progress - 0.40) / 0.05
      : progress <= 0.55
      ? 1
      : Math.max(0, 1 - (progress - 0.55) / 0.05);
  const stage2Y = (0.48 - progress) * 60;

  // Stage 3: 0.60 - 0.78 (Eiffel Tower Left, Large Metric Card Right)
  const stage3Opacity =
    progress < 0.60
      ? 0
      : progress <= 0.65
      ? (progress - 0.60) / 0.05
      : progress <= 0.75
      ? 1
      : Math.max(0, 1 - (progress - 0.75) / 0.05);
  const stage3Y = (0.68 - progress) * 60;

  // Stage 4: 0.80 - 1.00 (Eiffel Tower Centered with 4 Flanking Feature Cards)
  const stage4Opacity =
    progress < 0.80
      ? 0
      : progress <= 0.86
      ? (progress - 0.80) / 0.06
      : 1;
  const stage4Y = Math.max(0, (0.86 - progress) * 40);

  return (
    <div ref={containerRef} className="relative h-[650vh] w-full bg-neutral-950">
      {/* Pinned Viewport Container holding the canvas and synced overlays */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Full-screen WebGL/Canvas Video Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient Twilight Vignette & Soft Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-neutral-950/30 to-neutral-950/80 pointer-events-none" />

        {/* =========================================================================
            STAGE 0: HERO (Plane Window Departure & Brand Partners)
            Ref Image 1
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-between py-24 px-4 sm:px-6 lg:px-8 text-center transition-all duration-200 pointer-events-auto"
          style={{
            opacity: stage0Opacity,
            transform: `translateY(${stage0Y}px)`,
            pointerEvents: stage0Opacity < 0.1 ? 'none' : 'auto',
          }}
        >
          {/* Top spacer */}
          <div className="h-6" />

          {/* Center Content */}
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/30 bg-amber-400/[0.12] backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(251,191,36,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-200">
                PARIS, CURATED FOR YOU
              </span>
            </div>

            {/* Main Serif Italic Headline (Matching Ref Image 1) */}
            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-semibold text-white tracking-tight leading-[1.08] mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Proudly Trusted by{' '}
              <span className="italic font-normal block sm:inline bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                Leading Travelers
              </span>{' '}
              Across Continents
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              We’ve partnered with Paris’s finest cultural institutions and certified historians to deliver bespoke, skip-the-line journeys beyond the postcard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <button
                onClick={onBookNow}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-neutral-950 font-semibold text-sm shadow-[0_4px_25px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_35px_rgba(251,191,36,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Plan My Voyage</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onExploreTours}
                className="px-7 py-3.5 rounded-full border border-white/25 bg-neutral-950/40 hover:bg-neutral-900/60 text-white font-medium text-sm backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Tours</span>
                <ChevronDown className="w-4 h-4 text-neutral-300 animate-bounce" />
              </button>
            </div>
          </div>

          {/* Bottom Logos / Partners Row (Matching Ref Image 1) */}
          <div className="w-full max-w-5xl mx-auto pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-neutral-400 text-xs sm:text-sm font-medium tracking-widest uppercase">
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>CONDÉ NAST TRAVELER</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ARCHITECTURAL DIGEST</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Globe2 className="w-4 h-4 text-amber-400" />
              <span>LE MONDE VOYAGES</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>VOGUE PARIS</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STAGE 1: ABOUT STATEMENT IN CLOUDS
            Ref Image 2: "✦ ABOUT STUDIO / Kinetic Studio – is an SMM agency..."
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center transition-all duration-200 pointer-events-auto"
          style={{
            opacity: stage1Opacity,
            transform: `translateY(${stage1Y}px)`,
            pointerEvents: stage1Opacity < 0.1 ? 'none' : 'auto',
          }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 shadow-lg">
              <span className="text-amber-300 text-xs font-bold">✦</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-neutral-200">
                ABOUT PARIS CURATED
              </span>
            </div>

            {/* Giant Modern Bold Sans Statement (Matching Ref Image 2) */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.18] mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Paris Curated – is a collective of licensed insiders that delivers the timeless elegance of France with bespoke concierge strategy
            </h2>

            {/* Sub-caption */}
            <p className="text-sm sm:text-base text-neutral-300/90 max-w-2xl leading-relaxed drop-shadow-md">
              From skip-the-line Eiffel Tower climbs to intimate champagne tastings on the Seine, we craft experiences that linger long after you return home.
            </p>
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: 4 FROSTED GLASSMORPHIC FEATURE CARDS
            Ref Image 3: 4 Vertical cards in the clouds (Strategy, Growth, Creative, Powerful)
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-200 pointer-events-auto"
          style={{
            opacity: stage2Opacity,
            transform: `translateY(${stage2Y}px)`,
            pointerEvents: stage2Opacity < 0.1 ? 'none' : 'auto',
          }}
        >
          <div className="max-w-6xl w-full mx-auto">
            {/* Section Small Header */}
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                ✦ OUR PILLARS
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-1 drop-shadow-md">
                Uncompromising Quality in Every Moment
              </h3>
            </div>

            {/* 4 Glass Cards Grid (Exact look & feel of Ref Image 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Strategy */}
              <div className="group rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-7 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-amber-400/50 hover:bg-white/[0.16] transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-6">
                    Bespoke
                  </span>
                  <div className="text-amber-300 mb-3 text-lg">✦</div>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                    Curated journeys that shape memories
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    We craft custom private concepts that define unique travel styles and elevate every single moment.
                  </p>
                </div>
              </div>

              {/* Card 2: Growth / Access */}
              <div className="group rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-7 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-amber-400/50 hover:bg-white/[0.16] transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-6">
                    Priority
                  </span>
                  <div className="text-amber-300 mb-3 text-lg">✦</div>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                    Guaranteed skip-the-line VIP entry
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Zero multi-hour queues. Direct priority elevator tickets to the Eiffel Tower summit, Louvre, and Versailles.
                  </p>
                </div>
              </div>

              {/* Card 3: Creative / Gastronomy */}
              <div className="group rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-7 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-amber-400/50 hover:bg-white/[0.16] transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-6">
                    Gastronomy
                  </span>
                  <div className="text-amber-300 mb-3 text-lg">✦</div>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                    Michelin dining & private cellars
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Artisanal cheese tastings, Grand Cru wine pairings, and reserved Seine dinner cruise tables.
                  </p>
                </div>
              </div>

              {/* Card 4: Dedicated */}
              <div className="group rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.14] to-white/[0.04] p-7 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-amber-400/50 hover:bg-white/[0.16] transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-6">
                    Dedicated
                  </span>
                  <div className="text-amber-300 mb-3 text-lg">✦</div>
                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                    A dedicated team behind success
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Our certified local historians guide every step, with 24/7 instant WhatsApp concierge assistance.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* =========================================================================
            STAGE 3: EIFFEL TOWER EMERGING LEFT + LARGE TESTIMONIAL / METRICS RIGHT
            Ref Image 4
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-end px-4 sm:px-8 lg:px-16 transition-all duration-200 pointer-events-auto"
          style={{
            opacity: stage3Opacity,
            transform: `translateY(${stage3Y}px)`,
            pointerEvents: stage3Opacity < 0.1 ? 'none' : 'auto',
          }}
        >
          {/* Large Frosted Glass Testimonial Card on the Right (Matching Ref Image 4) */}
          <div className="w-full max-w-2xl rounded-3xl border border-white/25 bg-gradient-to-b from-white/[0.16] to-white/[0.05] p-8 sm:p-12 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            
            {/* Quote Heading */}
            <p className="text-base sm:text-xl md:text-2xl font-semibold text-white tracking-tight leading-relaxed mb-8 drop-shadow-md">
              « I WASTED MY TIME WITH OTHER TOUR OPERATORS STANDING IN LINES, BUT WITH PARIS CURATED, WE HAD INSTANT SUMMIT ACCESS, PRIVATE HISTORIANS, AND SAVED DAYS OF FRUSTRATION »
            </p>

            {/* Metrics Row (Matching Ref Image 4 layout: 3 big numbers) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 mb-8">
              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-white">4.98</div>
                <div className="text-xs text-neutral-300 mt-1 uppercase tracking-wider">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-white">15,000+</div>
                <div className="text-xs text-neutral-300 mt-1 uppercase tracking-wider">Travelers Hosted</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-white">100%</div>
                <div className="text-xs text-neutral-300 mt-1 uppercase tracking-wider">Zero Wait VIP</div>
              </div>
            </div>

            {/* Author Credit */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div>
                <span className="text-amber-300 font-bold tracking-wide">— BERNICE & MARCUS TAY</span>
                <span className="block text-neutral-400 text-xs">Singapore & London</span>
              </div>
              <div className="flex text-amber-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300" />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            STAGE 4: EIFFEL TOWER CENTERED NIGHT FINALE + 4 FLANKING CARDS
            Ref Image 5 (2 Cards Left, 2 Cards Right of Eiffel Tower)
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between py-16 px-4 sm:px-8 lg:px-14 transition-all duration-200 pointer-events-auto"
          style={{
            opacity: stage4Opacity,
            transform: `translateY(${stage4Y}px)`,
            pointerEvents: stage4Opacity < 0.1 ? 'none' : 'auto',
          }}
        >
          {/* Top Title Bar */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-300/30 bg-neutral-950/60 backdrop-blur-md text-amber-200 text-xs uppercase tracking-widest font-semibold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              THE PARIS CURATED PROMISE
            </span>
          </div>

          {/* 4 Surrounding Cards Grid (2 on Left, 2 on Right - Exact Ref Image 5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full max-w-7xl mx-auto">
            
            {/* Left 2 Cards */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Card 1: Tailored Experiences */}
              <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.15] to-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-amber-400/40 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4 shadow-inner">
                  <Zap className="w-5 h-5 fill-white text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">
                  Tailored Experiences
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Every detail is customized to match your unique preferences and style of travel.
                </p>
              </div>

              {/* Card 2: Expert Guides */}
              <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.15] to-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-amber-400/40 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4 shadow-inner">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">
                  Expert Guides
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Explore with passionate locals who share insider knowledge and hidden gems.
                </p>
              </div>

            </div>

            {/* Center Area (Keeps the lit-up Eiffel Tower clearly visible in the middle!) */}
            <div className="hidden lg:block lg:col-span-4 h-full pointer-events-none" />

            {/* Right 2 Cards */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Card 3: Seamless Logistics */}
              <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.15] to-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-amber-400/40 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4 shadow-inner">
                  <Zap className="w-5 h-5 fill-white text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">
                  Seamless Logistics
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  From transport to ticketing, we handle everything so you can relax and enjoy.
                </p>
              </div>

              {/* Card 4: 24/7 Support */}
              <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.15] to-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-amber-400/40 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4 shadow-inner">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">
                  24/7 Support
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  We're always available to ensure your journey is smooth and worry-free.
                </p>
              </div>

            </div>

          </div>

          {/* Bottom Explore / Book Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreTours}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-[0_4px_30px_rgba(251,191,36,0.4)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Tours & Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-neutral-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Instant Confirmation · Free Cancellation</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
