import Lenis from 'lenis';

const TOTAL_FRAMES = 279;
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d', { alpha: false });

const images = new Array(TOTAL_FRAMES);
const loadedFlags = new Array(TOTAL_FRAMES).fill(false);

let currentFrame = 0;
let targetFrame = 0;
let lastRenderedIndex = -1;

function getFrameUrl(index) {
  const pad = String(index + 1).padStart(3, '0');
  return `/travel-1/ezgif-frame-${pad}.jpg`;
}

// Adjust canvas resolution for sharp display
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  lastRenderedIndex = -1;
  render(Math.round(currentFrame));
}

window.addEventListener('resize', resizeCanvas);

// Draw frame centered with cover aspect ratio
function drawImageCover(img) {
  if (!img || !img.naturalWidth) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const canvasRatio = cw / ch;
  const imgRatio = iw / ih;

  let dw, dh, dx, dy;

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
}

// Nearest cached frame fallback
function getBestAvailableFrame(index) {
  if (loadedFlags[index]) return images[index];

  for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
    const prev = index - offset;
    if (prev >= 0 && loadedFlags[prev]) return images[prev];

    const next = index + offset;
    if (next < TOTAL_FRAMES && loadedFlags[next]) return images[next];
  }
  return null;
}

function render(index) {
  if (index === lastRenderedIndex && loadedFlags[index]) return;

  const img = getBestAvailableFrame(index);
  if (img) {
    drawImageCover(img);
    if (loadedFlags[index]) {
      lastRenderedIndex = index;
    }
  }
}

// Preload all frames
function preloadImages() {
  const firstImg = new Image();
  firstImg.src = getFrameUrl(0);
  firstImg.onload = () => {
    images[0] = firstImg;
    loadedFlags[0] = true;
    resizeCanvas();
    render(0);
  };

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
}

// Lenis smooth momentum scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.2,
});

function calculateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return Math.max(0, Math.min(1, window.scrollY / maxScroll));
}

// Animation loop with balanced smooth lerp interpolation
function tick(time) {
  lenis.raf(time);

  const scrollProgress = calculateScrollProgress();
  targetFrame = scrollProgress * (TOTAL_FRAMES - 1);

  // Sweet spot: 0.09 lerp factor gives fluid, silky response without rush or lag
  const lerpFactor = 0.09;
  const diff = targetFrame - currentFrame;

  if (Math.abs(diff) < 0.01) {
    currentFrame = targetFrame;
  } else {
    currentFrame += diff * lerpFactor;
  }

  const frameToRender = Math.round(currentFrame);
  render(frameToRender);

  requestAnimationFrame(tick);
}

// Start
resizeCanvas();
preloadImages();
requestAnimationFrame(tick);
