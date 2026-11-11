/**
 * MarketVerse Intro Motion Graphics Sequence.
 * 8-second cinematic SVG & GSAP sequence for first-time visitors (skippable, remembers in localStorage).
 * Respects `prefers-reduced-motion` and provides `replayIntro()` for the settings menu.
 *
 * Scene 1 (0-2s): Dark screen, logo draws on via SVG stroke, candlestick line draws across.
 * Scene 2 (2-4s): Line morphs to city skyline silhouette; buildings rise in staggered wave, live ticker scrolls.
 * Scene 3 (4-6s): Tagline: "Every building is a company. Every district is a sector." -> cross-fades to 3D scene.
 * Scene 4 (6-8s): Camera flies in from high above to Entire Market view with easing.
 */
import gsap from 'gsap';
import { startCinematicFlyIn, skipCinematicFlyIn, applyCameraPreset } from '../controls/cameraRig.js';
import { startOnboardingTour } from './onboarding.js';

const INTRO_STORAGE_KEY = 'marketverse_intro_seen';

let introTimeline = null;
let isIntroActive = false;

/**
 * Returns true if the user has already seen the intro.
 */
export function hasSeenIntro() {
  try {
    return localStorage.getItem(INTRO_STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Marks the intro as seen in localStorage.
 */
export function markIntroSeen() {
  try {
    localStorage.setItem(INTRO_STORAGE_KEY, 'true');
  } catch (e) {}
}

/**
 * Checks whether user prefers reduced motion.
 */
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Starts the 8-second cinematic intro sequence.
 */
export function startIntroSequence(onComplete) {
  const introEl = document.getElementById('intro-screen');
  if (!introEl) {
    applyCameraPreset('ENTIRE');
    if (onComplete) onComplete();
    return;
  }

  // If reduced motion is requested, complete immediately
  if (prefersReducedMotion()) {
    introEl.style.display = 'none';
    markIntroSeen();
    applyCameraPreset('ENTIRE');
    if (onComplete) onComplete();
    return;
  }

  isIntroActive = true;
  introEl.style.display = 'flex';
  introEl.style.opacity = '1';

  // Grab elements to animate
  const logoPath = document.getElementById('intro-logo-path');
  const logoText = document.getElementById('intro-logo-text');
  const candlePath = document.getElementById('intro-candle-path');
  const skylineBars = introEl.querySelectorAll('.intro-skyline-bar');
  const tickerWrap = document.getElementById('intro-ticker-wrap');
  const taglineEl = document.getElementById('intro-tagline');
  const subtaglineEl = document.getElementById('intro-subtagline');

  if (introTimeline) {
    introTimeline.kill();
  }

  introTimeline = gsap.timeline({
    onComplete: () => {
      finishIntro(onComplete);
    }
  });

  // Setup initial states
  gsap.set(logoText, { opacity: 0, y: 10 });
  gsap.set(candlePath, { strokeDashoffset: 1000, strokeDasharray: 1000 });
  gsap.set(logoPath, { strokeDashoffset: 600, strokeDasharray: 600 });
  gsap.set(skylineBars, { scaleY: 0, transformOrigin: 'bottom center' });
  gsap.set(tickerWrap, { opacity: 0, y: 15 });
  gsap.set([taglineEl, subtaglineEl], { opacity: 0, y: 20 });

  // SCENE 1 (0-2s): Dark screen, logo stroke draw-on + Candlestick line draws across
  introTimeline
    .to(logoPath, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.out'
    }, 0.1)
    .to(logoText, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.7)
    .to(candlePath, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power1.inOut'
    }, 0.4);

  // SCENE 2 (2-4s): Line morphs to skyline silhouette; buildings rise in staggered wave, ticker scrolls
  introTimeline
    .to(skylineBars, {
      scaleY: 1,
      duration: 1.2,
      stagger: 0.04,
      ease: 'back.out(1.2)'
    }, 2.0)
    .to(tickerWrap, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 2.4)
    .to('.intro-ticker-inner', {
      xPercent: -50,
      duration: 6.0,
      ease: 'none'
    }, 2.4);

  // SCENE 3 (4-6s): Tagline reveals; then cross-fade intro into 3D city scene
  introTimeline
    .to(taglineEl, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, 3.8)
    .to(subtaglineEl, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 4.2)
    .to(introEl, {
      opacity: 0,
      duration: 1.2,
      ease: 'power1.inOut',
      onComplete: () => {
        introEl.style.display = 'none';
      }
    }, 5.2);

  // SCENE 4 (6-8s): 3D camera flies in from high above to Entire Market view
  introTimeline.add(() => {
    startCinematicFlyIn(() => {
      // Finished fly in
    });
  }, 5.6);
}

/**
 * Cleanly completes the intro and triggers tour if first time.
 */
function finishIntro(onComplete) {
  isIntroActive = false;
  const introEl = document.getElementById('intro-screen');
  if (introEl) {
    introEl.style.display = 'none';
  }
  markIntroSeen();
  if (onComplete) onComplete();
}

/**
 * Immediately skips the intro sequence.
 */
export function skipIntro(onComplete) {
  if (introTimeline) {
    introTimeline.kill();
    introTimeline = null;
  }
  skipCinematicFlyIn();
  finishIntro(onComplete);
}

/**
 * Replays the intro sequence from menu or settings.
 */
export function replayIntro() {
  const introEl = document.getElementById('intro-screen');
  if (!introEl) return;
  startIntroSequence(() => {
    // If user replayed from settings, no need to auto-start tour
  });
}

/**
 * Initializes the intro skip button listener.
 */
export function initIntroControls(onComplete) {
  const skipBtn = document.getElementById('intro-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      skipIntro(onComplete);
    });
  }
}
