/**
 * Dynamic Count Labels, Loading Screen, 4-Step Onboarding Tour,
 * 60-Second Guided "Story Mode", Web Audio Synthesizer (Off by Default),
 * and Watermarked City Screenshot Exporter.
 */
import { getDatasetCounts } from '../engine/indices.js';
import { startCinematicFlyIn, skipCinematicFlyIn, applyCameraPreset, camRig } from '../controls/cameraRig.js';
import { selectWorldObject, clearSelection } from '../controls/picking.js';
import { applyEconomicEvent, endActiveEvent } from '../engine/simulation.js';
import { applyWeatherAndLighting } from '../world/weather.js';
import { update3DCityFromState } from '../world/buildings.js';
import { store } from '../state/store.js';
import { renderFrame } from '../world/postfx.js';
import { showToast } from './toasts.js';

let audioCtx = null;

/**
 * Plays a gentle synthesized chime if `soundEnabled` is turned on by the user.
 */
export function playUiSound(type = 'select') {
  if (!store.getViewState().soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    if (type === 'event') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.28);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.34);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {}
}

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
    desc: 'Companies are grouped into 10 color-coded Sector Districts around the Central Stock Exchange. Toggle "🔥 Sector Heatmap" in Scene settings to see cap-weighted sector performance.',
    action: () => {
      clearSelection();
      applyCameraPreset('ENTIRE');
    }
  }
];

let currentTourStep = 0;

// 60-Second Story Mode Chapters
const STORY_CHAPTERS = [
  {
    startSec: 0,
    title: 'Chapter 1/5 — Opening Bell at the Central Exchange (0:00–0:12)',
    desc: 'Welcome to MarketVerse. At the city center stands the Stock Exchange HQ, matching buy and sell orders by price-time priority while the rotating ticker band broadcasts top movers.',
    onEnter: () => {
      const live = store.getLiveState();
      live.weather = 'CLEAR';
      live.isNight = false;
      applyWeatherAndLighting(store.getViewState());
      selectWorldObject('EXCHANGE', 'CENTRAL_EXCHANGE', true);
    }
  },
  {
    startSec: 12,
    title: 'Chapter 2/5 — Company Scale vs. Share Price (0:12–0:24)',
    desc: 'Inspecting Indus Energy (INDUSPET): Tower height represents Market Cap = Share Price × Outstanding Shares. A high nominal share price does not make a company large without share count.',
    onEnter: () => {
      selectWorldObject('COMPANY', 'C11', true);
    }
  },
  {
    startSec: 24,
    title: 'Chapter 3/5 — Mid-Session Rate Hike & Sector Heatmap (0:24–0:36)',
    desc: 'Simulating a hypothetical +50 bps Central Bank Interest Rate Hike! Notice the 5-second cold-blue atmospheric cue and Sector Heatmap showing rate-sensitive sectors reacting.',
    onEnter: () => {
      const live = store.getLiveState();
      live.heatmapMode = true;
      applyEconomicEvent('RATE_HIKE');
      selectWorldObject('SECTOR', 'BANKING', true);
      update3DCityFromState(store.getViewState());
    }
  },
  {
    startSec: 36,
    title: 'Chapter 4/5 — Post-Trade Clearing & Depository (0:36–0:48)',
    desc: 'Matched trades travel along fiber-optic data links to the Clearing Corporation (T+1 novation guarantee) and Central Depository (where Demat shares are legally held).',
    onEnter: () => {
      endActiveEvent();
      selectWorldObject('INFRA', 'INFRA_CLEARING', true);
    }
  },
  {
    startSec: 48,
    title: 'Chapter 5/5 — Closing Bell & Portfolio Diversification (0:48–1:00)',
    desc: 'As evening falls over the Diversified Portfolio Garden, spreading holdings across uncorrelated sectors cushions individual shocks. Story Mode concluding at the full city overlook!',
    onEnter: () => {
      const live = store.getLiveState();
      live.heatmapMode = false;
      live.weather = 'EVENING';
      applyWeatherAndLighting(store.getViewState());
      selectWorldObject('LEARN', 'LEARN_DIVERSIFY', true);
      update3DCityFromState(store.getViewState());
    }
  }
];

let storyInterval = null;
let storyElapsedSec = 0;
let lastChapterIdx = -1;

export function startStoryMode() {
  stopStoryMode(false);
  const card = document.getElementById('onboarding-card');
  if (card) card.style.display = 'none';

  const banner = document.getElementById('story-banner');
  if (banner) banner.style.display = 'block';

  store.getLiveState().storyModeActive = true;
  storyElapsedSec = 0;
  lastChapterIdx = -1;

  const tickStory = () => {
    if (storyElapsedSec >= 60) {
      stopStoryMode(true);
      return;
    }

    let chapIdx = 0;
    for (let i = STORY_CHAPTERS.length - 1; i >= 0; i--) {
      if (storyElapsedSec >= STORY_CHAPTERS[i].startSec) {
        chapIdx = i;
        break;
      }
    }

    if (chapIdx !== lastChapterIdx) {
      lastChapterIdx = chapIdx;
      const chap = STORY_CHAPTERS[chapIdx];
      document.getElementById('story-chapter-title').textContent = `🎬 ${chap.title}`;
      document.getElementById('story-chapter-desc').textContent = chap.desc;
      playUiSound('select');
      chap.onEnter();
    }

    const rem = Math.max(0, 60 - storyElapsedSec);
    document.getElementById('story-timer-badge').textContent = `${rem}s left`;
    document.getElementById('story-progress-fill').style.width = `${(storyElapsedSec / 60) * 100}%`;

    storyElapsedSec++;
  };

  tickStory();
  storyInterval = setInterval(tickStory, 1000);
}

export function stopStoryMode(completed = false) {
  if (storyInterval) {
    clearInterval(storyInterval);
    storyInterval = null;
  }
  store.getLiveState().storyModeActive = false;
  const banner = document.getElementById('story-banner');
  if (banner) banner.style.display = 'none';

  if (completed) {
    clearSelection();
    applyCameraPreset('ENTIRE');
    showToast('🎬 60-Second Market Session Story complete!');
  }
}

export function initDynamicCountLabels(companies) {
  const counts = getDatasetCounts(companies);

  const navComp = document.getElementById('nav-companies-label');
  if (navComp) navComp.textContent = `2. Companies (${counts.listedCount})`;

  const navSec = document.getElementById('nav-sectors-label');
  if (navSec) navSec.textContent = `3. Sectors (${counts.sectorCount})`;

  const navLearn = document.getElementById('nav-learn-label');
  if (navLearn) navLearn.textContent = `9. Learn Finance (${counts.lessonCount})`;

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

  const stopStoryBtn = document.getElementById('stop-story-btn');
  if (stopStoryBtn) {
    stopStoryBtn.addEventListener('click', () => stopStoryMode(false));
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
  stopStoryMode(false);
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