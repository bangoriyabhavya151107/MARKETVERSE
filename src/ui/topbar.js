/**
 * MarketVerse Slim Top Bar (Max 5 Visible Items), Simulation Sheet,
 * Scene Atmosphere Sheet, Main Menu Drawer, Global Search Modal,
 * and Animated Market Cards & Pulse Chip.
 */
import { store } from '../state/store.js';
import { SECTORS } from '../data/sectors.js';
import { INFRA_FACILITIES } from '../data/infrastructure.js';
import { FINANCIAL_LESSONS } from '../data/lessons.js';
import { ECONOMIC_EVENTS } from '../data/events.js';
import { fmtPrice, fmtPct, fmtMcapCr, formatSimClock } from '../utils/format.js';
import { recalculateAllFinancials } from '../engine/finance.js';
import { stepMarketSimulation, applyEconomicEvent, endActiveEvent, resetFullSimulation } from '../engine/simulation.js';
import { setReplayIndex, returnToLiveReplay } from '../engine/replay.js';
import { selectWorldObject, clearSelection } from '../controls/picking.js';
import { applyCameraPreset } from '../controls/cameraRig.js';
import { update3DCityFromState } from '../world/buildings.js';
import { applyWeatherAndLighting } from '../world/weather.js';
import { syncQualitySettings } from '../world/postfx.js';
import { drawSparkline } from './charts.js';
import {
  openConceptModal,
  openAlertsModal,
  openSettingsModal,
  openShortcutsModal,
  openQATestModal,
  openCreditsModal,
  openPrivacyModal,
  openTermsModal
} from './modal.js';
import { startOnboardingTour, startStoryMode, exportWatermarkedScreenshot, playUiSound } from './onboarding.js';
import { replayIntro } from './intro.js';
import { openPanel, closePanel, closeAllPanels } from './panels.js';
import { navigateTo, updateMarketPulseChip } from './router.js';
import { showToast } from './toasts.js';

const EVENT_ICONS = {
  NONE: '⚖️',
  RATE_HIKE: '📈',
  RATE_CUT: '📉',
  OIL_SPIKE: '🛢️',
  TECH_SELLOFF: '💻',
  STRONG_EARNINGS: '🏆',
  INR_DEPREC: '💱',
  RISK_OFF: '🛡️'
};

const prevCardNums = {
  nifty: 22450,
  sensex: 73890
};

function animateCounterText(elId, fromVal, toVal, formatter) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (Math.abs(toVal - fromVal) < 0.01 || store.getViewState().reducedMotion) {
    el.textContent = formatter(toVal);
    return;
  }
  const start = performance.now();
  const dur = 240;
  function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const cur = fromVal + (toVal - fromVal) * p;
    el.textContent = formatter(cur);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export function applyWorkspacePreset(isBeginner) {
  const live = store.getLiveState();
  live.beginnerMode = isBeginner;
  const lbl = document.getElementById('edu-mode-label');
  if (lbl) lbl.textContent = isBeginner ? 'Beginner' : 'Pro';

  if (!isBeginner) {
    live.heatmapMode = true;
  } else {
    live.heatmapMode = false;
  }

  const heatBtn = document.getElementById('heatmap-toggle-btn');
  if (heatBtn) {
    heatBtn.classList.toggle('active', live.heatmapMode);
    heatBtn.textContent = live.heatmapMode ? '🔥 Sector Heatmap: On' : '🔥 Sector Heatmap: Off';
  }

  update3DCityFromState(store.getViewState());
  store.emit('settings');
  showToast(
    isBeginner
      ? 'Beginner Preset: simplified core metrics & guided callouts.'
      : 'Pro Preset: full valuation metrics & Sector Heatmap enabled.'
  );
}

/**
 * Renders the 7 friendly-named events inside the Simulation Sheet.
 */
export function renderEventsSheetList(viewState = store.getViewState()) {
  const listEl = document.getElementById('sim-events-list');
  if (!listEl) return;

  listEl.innerHTML = Object.values(ECONOMIC_EVENTS)
    .map(ev => {
      const isAct = viewState.activeEventId === ev.id;
      const icon = EVENT_ICONS[ev.id] || '⚡';
      return `
        <div class="event-popover-item ${isAct ? 'active' : ''}" role="button" tabindex="0" data-ev-item="${ev.id}">
          <span style="font-size:18px;">${icon}</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:var(--text-sm);">${ev.name}</div>
            <div style="font-size:11.5px; color:var(--text-secondary); margin-top:2px;">${ev.description}</div>
            ${ev.durationTicks > 0 ? `<div style="font-size:10.5px; color:var(--accent); margin-top:2px;">Decays over ${ev.durationTicks} ticks</div>` : ''}
          </div>
          <button class="${isAct ? 'active' : 'primary'}" style="padding:4px 8px; font-size:11px; align-self:center;">
            ${isAct ? 'Active' : ev.id === 'NONE' ? 'End' : 'Simulate'}
          </button>
        </div>
      `;
    })
    .join('');

  listEl.querySelectorAll('[data-ev-item]').forEach(item => {
    const trigger = () => {
      const evId = item.dataset.evItem;
      if (evId === 'NONE') {
        endActiveEvent();
        update3DCityFromState(store.getViewState());
        showToast('Active event ended. Simulation continues.');
      } else {
        applyEconomicEvent(evId);
        playUiSound('event');
        update3DCityFromState(store.getViewState());
        showToast(`⚡ Event triggered: ${ECONOMIC_EVENTS[evId].name}`);
      }
      renderEventsSheetList(store.getViewState());
      updateTopBarAndSummaryCards(store.getViewState());
    };
    item.addEventListener('click', trigger);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });
}

export const renderEventsPopoverList = renderEventsSheetList;

/**
 * Updates top bar clock, session dot, summary cards, and market pulse chip on tick.
 */
export function updateTopBarAndSummaryCards(viewState = store.getViewState()) {
  const clockEl = document.getElementById('sim-clock-display');
  const sessionDot = document.getElementById('session-dot');
  const sheetClock = document.getElementById('sheet-sim-clock');

  if (clockEl) {
    if (viewState.dataMode === 'REAL_DATA') {
      clockEl.textContent = 'NO LIVE FEED';
    } else {
      clockEl.textContent = formatSimClock(viewState.simSecondsFromOpen);
    }
  }

  if (sheetClock) {
    sheetClock.textContent = formatSimClock(viewState.simSecondsFromOpen);
  }

  if (sessionDot) {
    if (viewState.dataMode === 'REAL_DATA') {
      sessionDot.className = 'status-dot unavail';
    } else {
      sessionDot.className = 'status-dot' + (viewState.simRunning ? '' : ' paused');
    }
  }

  // Update Simulation Sheet play/pause button label
  const sheetPlayBtn = document.getElementById('sheet-sim-play-btn');
  if (sheetPlayBtn) {
    sheetPlayBtn.textContent = viewState.simRunning ? '⏸ Pause Sim' : '▶ Resume Sim';
  }

  // Replay slider inside Simulation Sheet
  const slider = document.getElementById('sheet-replay-slider');
  const stepLbl = document.getElementById('sheet-replay-step');
  const liveBtn = document.getElementById('sheet-replay-live-btn');
  if (slider) {
    slider.max = Math.max(0, viewState.replayHistory.length - 1);
    if (viewState.replayIndex === -1) {
      slider.value = slider.max;
      if (stepLbl) stepLbl.textContent = 'Live';
      if (liveBtn) liveBtn.style.display = 'none';
    } else {
      slider.value = viewState.replayIndex;
      if (stepLbl) stepLbl.textContent = `Tick #${viewState.simTickCount}`;
      if (liveBtn) liveBtn.style.display = 'inline-block';
    }
  }

  // Event active indicators
  const activeEvBadge = document.getElementById('sheet-active-ev-badge');
  const endEvBtn = document.getElementById('sheet-end-event-btn');
  if (viewState.activeEventId && viewState.activeEventId !== 'NONE') {
    const ev = ECONOMIC_EVENTS[viewState.activeEventId];
    if (activeEvBadge) {
      activeEvBadge.style.display = 'inline-flex';
      activeEvBadge.textContent = `${ev?.name || 'Active'}: ${viewState.eventRemainingTicks}t decay`;
    }
    if (endEvBtn) endEvBtn.style.display = 'inline-block';
  } else {
    if (activeEvBadge) activeEvBadge.style.display = 'none';
    if (endEvBtn) endEvBtn.style.display = 'none';
  }

  const isRealUnconf = viewState.dataMode === 'REAL_DATA';

  // NIFTY Card
  const n = viewState.indices.NIFTY;
  const nValEl = document.getElementById('card-nifty-val');
  if (nValEl) {
    if (isRealUnconf) {
      nValEl.textContent = 'Unavailable';
    } else {
      animateCounterText('card-nifty-val', prevCardNums.nifty, n.current, v =>
        v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      );
      prevCardNums.nifty = n.current;
    }
  }
  const nBadge = document.getElementById('card-nifty-chg');
  if (nBadge) {
    nBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(n.changePercent);
    nBadge.className = `badge num ${n.changePercent >= 0 ? 'pos' : 'neg'}`;
  }
  const nPrev = document.getElementById('card-nifty-prev');
  if (nPrev) {
    nPrev.textContent = isRealUnconf
      ? 'Configure Adapter'
      : `Base: ${n.baseLevel.toLocaleString('en-IN')} (${n.constituentCount} const.)`;
  }
  drawSparkline('spark-nifty', n.history, n.changePercent >= 0 ? '#22A06B' : '#E05255');

  // SENSEX Card
  const s = viewState.indices.SENSEX;
  const sValEl = document.getElementById('card-sensex-val');
  if (sValEl) {
    if (isRealUnconf) {
      sValEl.textContent = 'Unavailable';
    } else {
      animateCounterText('card-sensex-val', prevCardNums.sensex, s.current, v =>
        v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      );
      prevCardNums.sensex = s.current;
    }
  }
  const sBadge = document.getElementById('card-sensex-chg');
  if (sBadge) {
    sBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(s.changePercent);
    sBadge.className = `badge num ${s.changePercent >= 0 ? 'pos' : 'neg'}`;
  }
  const sPrev = document.getElementById('card-sensex-prev');
  if (sPrev) {
    sPrev.textContent = isRealUnconf
      ? 'Configure Adapter'
      : `Base: ${s.baseLevel.toLocaleString('en-IN')} (${s.constituentCount} const.)`;
  }
  drawSparkline('spark-sensex', s.history, s.changePercent >= 0 ? '#22A06B' : '#E05255');

  // MCAP Card
  const t = viewState.totals;
  const mVal = document.getElementById('card-mcap-val');
  if (mVal) mVal.textContent = isRealUnconf ? 'Unavailable' : fmtMcapCr(t.mcapCr);
  const mBadge = document.getElementById('card-mcap-chg');
  if (mBadge) {
    mBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(t.mcapChangePct);
    mBadge.className = `badge num ${t.mcapChangePct >= 0 ? 'pos' : 'neg'}`;
  }
  const mCount = document.getElementById('card-mcap-count');
  if (mCount) mCount.textContent = `${t.listedCount} Listed Companies`;
  drawSparkline('spark-mcap', t.mcapHistory, t.mcapChangePct >= 0 ? '#22A06B' : '#E05255');

  // VOL & Mood Card
  const vVal = document.getElementById('card-vol-val');
  if (vVal) vVal.textContent = isRealUnconf ? 'Unavailable' : `${t.volumeCr.toFixed(2)} Cr sh`;
  const moodBadge = document.getElementById('card-mood-badge');
  if (moodBadge) {
    moodBadge.textContent = isRealUnconf ? 'UNAVAILABLE' : t.mood;
    moodBadge.className = `badge ${t.mood === 'BULLISH' ? 'pos' : t.mood === 'BEARISH' ? 'neg' : 'neu'}`;
  }
  const bMini = document.getElementById('card-breadth-mini');
  if (bMini) bMini.textContent = `Adv: ${t.advancing} | Dec: ${t.declining} | Unch: ${t.unchanged}`;
  drawSparkline('spark-vol', t.volHistory.length > 1 ? t.volHistory : [1, 1.1], '#4B8BE8');

  // Floating Market Pulse Chip
  updateMarketPulseChip(viewState);
}

/**
 * Initializes Global Search in the Search Modal.
 */
function setupGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const resultsBox = document.getElementById('search-results-box');
  if (!input || !resultsBox) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      resultsBox.innerHTML = '<div style="padding:16px; color:var(--text-muted); text-align:center;">Type ticker, company name, sector, or lesson title...</div>';
      return;
    }

    const viewState = store.getViewState();
    const matches = [];

    viewState.companies.forEach(c => {
      if (c.symbol.toLowerCase().includes(q) || c.companyName.toLowerCase().includes(q)) {
        matches.push({
          label: `${c.symbol} — ${c.companyName}`,
          sub: `${fmtPrice(c.price)} (${fmtPct(c.changePercent)})`,
          typeLabel: 'Company',
          action: () => {
            closeAllPanels();
            navigateTo('city');
            selectWorldObject('COMPANY', c.id, true);
          }
        });
      }
    });

    SECTORS.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)) {
        matches.push({
          label: s.name,
          sub: 'Sector District',
          typeLabel: 'Sector',
          action: () => {
            closeAllPanels();
            navigateTo('city');
            selectWorldObject('SECTOR', s.id, true);
          }
        });
      }
    });

    INFRA_FACILITIES.forEach(f => {
      if (f.name.toLowerCase().includes(q) || f.role.toLowerCase().includes(q)) {
        matches.push({
          label: f.name,
          sub: f.role,
          typeLabel: 'Infrastructure',
          action: () => {
            closeAllPanels();
            navigateTo('city');
            selectWorldObject('INFRA', f.id, true);
          }
        });
      }
    });

    Object.entries(FINANCIAL_LESSONS).forEach(([key, les]) => {
      if (les.title.toLowerCase().includes(q) || les.meaning.toLowerCase().includes(q)) {
        matches.push({
          label: les.title,
          sub: 'Financial Literacy Lesson',
          typeLabel: 'Lesson',
          action: () => {
            closeAllPanels();
            openConceptModal(key);
          }
        });
      }
    });

    resultsBox.innerHTML = '';
    if (matches.length === 0) {
      resultsBox.innerHTML = `<div style="padding:16px; color:var(--text-secondary); text-align:center;">No matching items found for "${input.value}".</div>`;
    } else {
      matches.slice(0, 8).forEach(m => {
        const row = document.createElement('div');
        row.className = 'search-item';
        row.tabIndex = 0;
        row.innerHTML = `
          <div>
            <div style="font-weight:600; font-size:var(--text-md);">${m.label}</div>
            <div style="font-size:11.5px; color:var(--text-secondary);">${m.sub}</div>
          </div>
          <span class="badge sim" style="font-size:11px;">${m.typeLabel}</span>
        `;
        row.addEventListener('click', () => {
          input.value = '';
          m.action();
        });
        row.addEventListener('keydown', e => {
          if (e.key === 'Enter') m.action();
        });
        resultsBox.appendChild(row);
      });
    }
  });

  // Hotkey '/' to open search
  window.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openPanel('search-modal-wrap');
      setTimeout(() => input.focus(), 80);
    }
  });
}

/**
 * Initializes all Top Bar, Simulation Sheet, Scene Sheet, and Menu Drawer events.
 */
export function initTopBarEvents() {
  setupGlobalSearch();
  renderEventsSheetList(store.getViewState());

  // TOP BAR: 5 VISIBLE ITEMS
  // 1. Logo
  document.getElementById('topbar-logo')?.addEventListener('click', () => {
    navigateTo('city');
    applyCameraPreset('ENTIRE');
  });

  // 2. Search Button
  document.getElementById('topbar-search-btn')?.addEventListener('click', () => {
    openPanel('search-modal-wrap');
    setTimeout(() => {
      const inp = document.getElementById('global-search-input');
      if (inp) inp.focus();
    }, 80);
  });

  // 3. Sim Clock Chip -> Opens Simulation Sheet
  document.getElementById('topbar-sim-chip')?.addEventListener('click', () => {
    openPanel('sheet-simulation');
  });

  // 4. Scene Button -> Opens Scene Sheet
  document.getElementById('topbar-scene-btn')?.addEventListener('click', () => {
    openPanel('sheet-scene');
  });

  // 5. Menu Button -> Opens Main Menu Drawer
  document.getElementById('topbar-menu-btn')?.addEventListener('click', () => {
    openPanel('drawer-menu');
  });

  // MARKET PULSE CHIP (Floating in 3D scene)
  const pulseChip = document.getElementById('market-pulse-chip');
  const pulsePopover = document.getElementById('market-pulse-popover');
  if (pulseChip && pulsePopover) {
    pulseChip.addEventListener('click', e => {
      e.stopPropagation();
      const isVisible = pulsePopover.style.display === 'block';
      pulsePopover.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) updateMarketPulseChip(store.getViewState());
    });
    document.addEventListener('click', e => {
      if (!pulsePopover.contains(e.target) && !pulseChip.contains(e.target)) {
        pulsePopover.style.display = 'none';
      }
    });
  }

  // SIMULATION SHEET CONTROLS
  const sheetPlayBtn = document.getElementById('sheet-sim-play-btn');
  if (sheetPlayBtn) {
    sheetPlayBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      live.simRunning = !live.simRunning;
      returnToLiveReplay();
      sheetPlayBtn.textContent = live.simRunning ? '⏸ Pause Sim' : '▶ Resume Sim';
      update3DCityFromState(store.getViewState());
      updateTopBarAndSummaryCards(store.getViewState());
    });
  }

  document.querySelectorAll('.sim-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.getLiveState().simSpeed = parseFloat(btn.dataset.speed);
      document.querySelectorAll('.sim-speed-btn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  document.getElementById('sheet-sim-step-btn')?.addEventListener('click', () => {
    returnToLiveReplay();
    stepMarketSimulation();
    update3DCityFromState(store.getViewState());
  });

  document.getElementById('sheet-sim-reset-btn')?.addEventListener('click', () => {
    resetFullSimulation();
    update3DCityFromState(store.getViewState());
    showToast('Simulation reset to initial state.');
  });

  document.getElementById('sheet-replay-slider')?.addEventListener('input', e => {
    const idx = parseInt(e.target.value, 10);
    setReplayIndex(idx);
    update3DCityFromState(store.getViewState());
  });

  document.getElementById('sheet-replay-live-btn')?.addEventListener('click', () => {
    returnToLiveReplay();
    update3DCityFromState(store.getViewState());
  });

  document.getElementById('sheet-end-event-btn')?.addEventListener('click', () => {
    endActiveEvent();
    update3DCityFromState(store.getViewState());
    renderEventsSheetList(store.getViewState());
    showToast('Active event ended.');
  });

  document.getElementById('sheet-story-btn')?.addEventListener('click', () => {
    closePanel('sheet-simulation');
    startStoryMode();
  });

  document.getElementById('data-mode-select')?.addEventListener('change', e => {
    const live = store.getLiveState();
    live.dataMode = e.target.value;
    recalculateAllFinancials(live);
    update3DCityFromState(store.getViewState());
    store.emit('settings');
    store.emit('tick');
  });

  // SCENE SHEET CONTROLS
  document.getElementById('day-night-btn')?.addEventListener('click', e => {
    const live = store.getLiveState();
    live.autoDayNight = false;
    const autoBtn = document.getElementById('auto-cycle-btn');
    if (autoBtn) autoBtn.classList.remove('active');
    live.isNight = !live.isNight;
    e.target.textContent = live.isNight ? '🌙 Night' : '☀️ Day';
    applyWeatherAndLighting(store.getViewState());
  });

  const autoCycleBtn = document.getElementById('auto-cycle-btn');
  if (autoCycleBtn) {
    autoCycleBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      live.autoDayNight = !live.autoDayNight;
      autoCycleBtn.classList.toggle('active', live.autoDayNight);
      showToast(live.autoDayNight ? 'Automatic Day/Night cycle enabled.' : 'Auto solar cycle paused.');
    });
  }

  document.getElementById('labels-toggle-btn')?.addEventListener('click', e => {
    const live = store.getLiveState();
    live.labelsVisible = !live.labelsVisible;
    e.target.classList.toggle('active', live.labelsVisible);
    update3DCityFromState(store.getViewState());
  });

  const atmoOverrideBtn = document.getElementById('atmo-override-btn');
  if (atmoOverrideBtn) {
    atmoOverrideBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      live.atmosphereOverride = !live.atmosphereOverride;
      atmoOverrideBtn.classList.toggle('active', !live.atmosphereOverride);
      atmoOverrideBtn.textContent = live.atmosphereOverride ? '🌤️ Neutral Sky' : '🌤️ Mood Sky';
      showToast(live.atmosphereOverride ? 'Market mood sky overridden.' : 'Market mood atmosphere enabled.');
    });
  }

  const heatmapBtn = document.getElementById('heatmap-toggle-btn');
  if (heatmapBtn) {
    heatmapBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      live.heatmapMode = !live.heatmapMode;
      heatmapBtn.classList.toggle('active', live.heatmapMode);
      heatmapBtn.textContent = live.heatmapMode ? '🔥 Sector Heatmap: On' : '🔥 Sector Heatmap: Off';
      update3DCityFromState(store.getViewState());
      showToast(live.heatmapMode ? 'Sector Heatmap enabled on district plazas.' : 'Sector Heatmap disabled.');
    });
  }

  document.getElementById('weather-select')?.addEventListener('change', e => {
    const live = store.getLiveState();
    live.weather = e.target.value;
    if (live.weather === 'NIGHT' || live.weather === 'EVENING') {
      live.autoDayNight = false;
      if (autoCycleBtn) autoCycleBtn.classList.remove('active');
    }
    applyWeatherAndLighting(store.getViewState());
  });

  document.getElementById('quality-select')?.addEventListener('change', e => {
    const choice = e.target.value;
    syncQualitySettings(choice);
    showToast(`Graphics quality set to ${choice}.`);
  });

  document.getElementById('scene-theme-toggle-btn')?.addEventListener('click', () => {
    document.body.classList.toggle('light-ui');
    store.getLiveState().lightUiTheme = document.body.classList.contains('light-ui');
    store.emit('settings');
  });

  // MENU DRAWER UTILITIES
  document.querySelectorAll('[data-menu-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllPanels();
      navigateTo(btn.dataset.menuRoute);
    });
  });

  document.getElementById('menu-tour-btn')?.addEventListener('click', () => {
    closeAllPanels();
    startOnboardingTour();
  });

  document.getElementById('menu-replay-intro-btn')?.addEventListener('click', () => {
    closeAllPanels();
    replayIntro();
  });

  document.getElementById('menu-story-btn')?.addEventListener('click', () => {
    closeAllPanels();
    startStoryMode();
  });

  document.getElementById('menu-edu-mode-btn')?.addEventListener('click', () => {
    applyWorkspacePreset(!store.getLiveState().beginnerMode);
  });

  document.getElementById('menu-sound-btn')?.addEventListener('click', () => {
    const live = store.getLiveState();
    live.soundEnabled = !live.soundEnabled;
    const btn = document.getElementById('menu-sound-btn');
    if (btn) btn.innerHTML = live.soundEnabled ? '🔊 Sound: On' : '🔇 Sound: Muted';
    if (live.soundEnabled) playUiSound('select');
    showToast(live.soundEnabled ? 'Sound effects enabled.' : 'Sound effects muted.');
  });

  document.getElementById('menu-screenshot-btn')?.addEventListener('click', () => {
    closeAllPanels();
    exportWatermarkedScreenshot();
  });

  document.getElementById('menu-shortcuts-btn')?.addEventListener('click', () => {
    closeAllPanels();
    openShortcutsModal();
  });

  document.getElementById('menu-qa-btn')?.addEventListener('click', () => {
    closeAllPanels();
    openQATestModal();
  });

  document.getElementById('menu-credits-btn')?.addEventListener('click', () => {
    closeAllPanels();
    openCreditsModal();
  });

  document.getElementById('menu-privacy-btn')?.addEventListener('click', () => {
    closeAllPanels();
    openPrivacyModal();
  });

  document.getElementById('menu-terms-btn')?.addEventListener('click', () => {
    closeAllPanels();
    openTermsModal();
  });

  document.getElementById('menu-disclaimer-btn')?.addEventListener('click', () => {
    closeAllPanels();
    openConceptModal('disclaimer');
  });

  // VIEWPORT TOGGLE CONTROLS (Floating in 3D City)
  document.getElementById('fullscreen-city-btn')?.addEventListener('click', () => {
    closeAllPanels();
  });

  document.getElementById('reset-cam-btn')?.addEventListener('click', () => {
    applyCameraPreset('ENTIRE');
  });

  document.getElementById('deselect-btn')?.addEventListener('click', () => {
    clearSelection();
    closePanel('right-panel');
  });
}
