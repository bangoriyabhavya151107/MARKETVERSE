/**
 * Dynamic Count Labels, Loading Screen & Skippable 5s Cinematic Fly-In,
 * 4-Step Interactive Onboarding Tour, and Watermarked City Screenshot Exporter.
 */
import { getDatasetCounts } from '../engine/indices.js';
import { startCinematicFlyIn, skipCinematicFlyIn, applyCameraPreset } from '../controls/cameraRig.js';
import { selectWorldObject, clearSelection } from '../controls/picking.js';
import { store } from '../state/store.js';
import { renderFrame } from '../world/postfx.js';
import { camRig } from '../controls/cameraRig.js';
import { showToast } from './toasts.js';

const TOUR_STEPS = [
  {
    title: '1. Building = Listed Company',
    desc: 'Every tower in MarketVerse represents one listed Indian company. Click any building to inspect its live price, share count, and financial fundamentals.',
    action: () => selectWorldObject('COMPANY', 'C06', true, false)
  },
  {
    title: '2. Height = Market Capitalization',
    desc: 'Building height encodes Market Cap (Share Price × Outstanding Shares). Remember: a taller tower reflects larger equity scale, never superior investment quality.',
    action: () => selectWorldObject('COMPANY', 'C11', true, false)
  },
  {
    title: '3. Roof Beacon = Daily Change (%)',
    desc: 'The glowing roof crown and directional ticker badge (▲ / ▼ / •) show percentage movement vs. previous close, while window light density reflects relative trading volume.',
    action: () => selectWorldObject('COMPANY', 'C01', true, false)
  },
  {
    title: '4. District = Economic Sector',
    desc: 'Companies are grouped into 10 color-coded Sector Districts around the Central Stock Exchange. Toggle "🔥 Sector Heatmap" in the Left Nav to see cap-weighted sector performance.',
    action: () => {
      clearSelection();
      applyCameraPreset('ENTIRE');
    }
  }
];

let currentTourStep = 0;

export function initDynamicCountLabels(companies) {
  const counts = getDatasetCounts(companies);

  const navComp = document.getElementById('nav-companies-label');
  if (navComp) navComp.textContent = `3. Companies (${counts.listedCount})`;

  const navSec = document.getElementById('nav-sectors-label');
  if (navSec) navSec.textContent = `4. Sectors (${counts.sectorCount})`;

  const navLearn = document.getElementById('nav-learn-label');
  if (navLearn) navLearn.textContent = `10. Learn Finance (${counts.lessonCount})`;

  const btabComp = document.getElementById('btab-companies-btn');
  if (btabComp) btabComp.textContent = `Companies (${counts.listedCount})`;

  const btabSec = document.getElementById('btab-sectors-btn');
  if (btabSec) btabSec.textContent = `Sectors (${counts.sectorCount})`;
}

export function setLoadingProgress(pct, statusText) {
  const bar = document.getElementById('loading-bar-fill');
  const txt = document.getElementById('loading-status-text');
  if (bar) bar.style.width = `${pct}%`;
  if (txt && statusText) txt.textContent = statusText;
}

export function finishLoadingAndStartIntro() {
  setLoadingProgress(100, 'City Ready!');
  const screen = document.getElementById('loading-screen');

  let hasVisited = false;
  try {
    hasVisited = localStorage.getItem('mv_visited_v1') === 'true';
    localStorage.setItem('mv_visited_v1', 'true');
  } catch (e) {}

  setTimeout(() => {
    if (screen) {
      screen.style.opacity = '0';
      setTimeout(() => {
        screen.style.display = 'none';
      }, 380);
    }

    if (!hasVisited) {
      startCinematicFlyIn(() => {
        startOnboardingTour();
      });
    } else {
      applyCameraPreset('ENTIRE');
    }
  }, 220);

  const skipBtn = document.getElementById('skip-flyin-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      skipCinematicFlyIn();
      startOnboardingTour();
    });
  }

  initOnboardingControls();
}

function renderTourStep() {
  const card = document.getElementById('onboarding-card');
  if (!card) return;
  const step = TOUR_STEPS[currentTourStep];
  if (!step) return;

  document.getElementById('onboarding-step-badge').textContent = `Step ${currentTourStep + 1} of ${TOUR_STEPS.length}`;
  document.getElementById('onboarding-title').textContent = step.title;
  document.getElementById('onboarding-desc').textContent = step.desc;

  const prevBtn = document.getElementById('onboarding-prev-btn');
  const nextBtn = document.getElementById('onboarding-next-btn');
  if (prevBtn) prevBtn.disabled = currentTourStep === 0;
  if (nextBtn) nextBtn.textContent = currentTourStep === TOUR_STEPS.length - 1 ? 'Finish ✓' : 'Next →';

  step.action();
}

export function startOnboardingTour() {
  currentTourStep = 0;
  const card = document.getElementById('onboarding-card');
  if (card) {
    card.style.display = 'block';
    renderTourStep();
  }
}

function initOnboardingControls() {
  const card = document.getElementById('onboarding-card');
  const closeBtn = document.getElementById('onboarding-close-btn');
  const prevBtn = document.getElementById('onboarding-prev-btn');
  const nextBtn = document.getElementById('onboarding-next-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (card) card.style.display = 'none';
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentTourStep > 0) {
        currentTourStep--;
        renderTourStep();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentTourStep < TOUR_STEPS.length - 1) {
        currentTourStep++;
        renderTourStep();
      } else if (card) {
        card.style.display = 'none';
        showToast('Tour complete! Click any building or press ? for keyboard shortcuts.');
      }
    });
  }
}

/**
 * Exports the 3D city canvas as a PNG with a MarketVerse watermark and live market summary bar.
 */
export function exportWatermarkedScreenshot() {
  const srcCanvas = document.getElementById('city-canvas');
  if (!srcCanvas) return;

  renderFrame(camRig.target);

  const outCanvas = document.createElement('canvas');
  outCanvas.width = srcCanvas.width;
  outCanvas.height = srcCanvas.height;
  const ctx = outCanvas.getContext('2d');

  ctx.drawImage(srcCanvas, 0, 0);

  const viewState = store.getViewState();
  const barH = Math.max(44, Math.round(outCanvas.height * 0.055));
  ctx.fillStyle = 'rgba(16, 24, 32, 0.88)';
  ctx.fillRect(0, outCanvas.height - barH, outCanvas.width, barH);

  ctx.strokeStyle = '#4B8BE8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, outCanvas.height - barH);
  ctx.lineTo(outCanvas.width, outCanvas.height - barH);
  ctx.stroke();

  const fontSize = Math.max(13, Math.round(barH * 0.36));
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.fillStyle = '#F2F5F7';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    'MARKETVERSE — The Living 3D Stock Market City (Educational Simulation)',
    18,
    outCanvas.height - barH * 0.5
  );

  const n = viewState.indices.NIFTY;
  const s = viewState.indices.SENSEX;
  const rightStats = `NIFTY (Sim): ${n.current.toFixed(2)} (${n.changePercent >= 0 ? '+' : ''}${n.changePercent.toFixed(2)}%)  |  SENSEX (Sim): ${s.current.toFixed(2)}`;
  ctx.font = `${Math.max(11, Math.round(barH * 0.32))}px monospace`;
  ctx.fillStyle = '#AAB6C2';
  ctx.textAlign = 'right';
  ctx.fillText(rightStats, outCanvas.width - 18, outCanvas.height - barH * 0.5);

  const link = document.createElement('a');
  link.download = `MarketVerse-City-${Date.now()}.png`;
  link.href = outCanvas.toDataURL('image/png');
  link.click();

  showToast('📷 Watermarked city screenshot downloaded!');
}