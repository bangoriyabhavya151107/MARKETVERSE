/**
 * Top Navigation Bar, 4 Summary Cards, Global Search, Screenshot/Tour/Shortcuts Triggers,
 * and Simulation/Replay Toolbar.
 */
import { store } from '../state/store.js';
import { SECTORS } from '../data/sectors.js';
import { INFRA_FACILITIES } from '../data/infrastructure.js';
import { FINANCIAL_LESSONS } from '../data/lessons.js';
import { fmtPrice, fmtPct, fmtMcapCr, formatSimClock } from '../utils/format.js';
import { recalculateAllFinancials } from '../engine/finance.js';
import { stepMarketSimulation, applyEconomicEvent, endActiveEvent, resetFullSimulation } from '../engine/simulation.js';
import { setReplayIndex, returnToLiveReplay } from '../engine/replay.js';
import { selectWorldObject, clearSelection } from '../controls/picking.js';
import { applyCameraPreset } from '../controls/cameraRig.js';
import { update3DCityFromState } from '../world/buildings.js';
import { drawSparkline } from './charts.js';
import { openConceptModal, openAlertsModal, openSettingsModal, openShortcutsModal } from './modal.js';
import { startOnboardingTour, exportWatermarkedScreenshot } from './onboarding.js';
import { switchLeftNavView } from './leftNav.js';
import { showToast } from './toasts.js';

export function updateTopBarAndSummaryCards(viewState = store.getViewState()) {
  const clockEl = document.getElementById('sim-clock-display');
  const sessionDot = document.getElementById('session-dot');
  const sessionLabel = document.getElementById('session-label');

  if (viewState.dataMode === 'REAL_DATA') {
    sessionDot.className = 'status-dot unavail';
    sessionLabel.textContent = 'PROVIDER UNCONFIGURED';
    clockEl.textContent = 'NO LIVE FEED';
  } else {
    sessionDot.className = 'status-dot' + (viewState.simRunning ? '' : ' paused');
    sessionLabel.textContent =
      viewState.replayIndex !== -1
        ? 'SIMULATION REPLAY'
        : viewState.simRunning
        ? 'SIMULATED SESSION'
        : 'SIMULATION PAUSED';
    clockEl.textContent = formatSimClock(viewState.simSecondsFromOpen);
  }

  const slider = document.getElementById('replay-slider');
  const stepLbl = document.getElementById('replay-step-label');
  const liveBtn = document.getElementById('replay-live-btn');
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

  const quickEvSel = document.getElementById('quick-event-select');
  const decayBadge = document.getElementById('event-decay-badge');
  const endEventBtn = document.getElementById('end-event-btn');
  if (quickEvSel && document.activeElement !== quickEvSel) {
    quickEvSel.value = viewState.activeEventId || 'NONE';
  }
  if (viewState.activeEventId && viewState.activeEventId !== 'NONE') {
    if (decayBadge) {
      decayBadge.style.display = 'inline-flex';
      decayBadge.textContent = `${viewState.eventRemainingTicks}t left`;
    }
    if (endEventBtn) endEventBtn.style.display = 'inline-block';
  } else {
    if (decayBadge) decayBadge.style.display = 'none';
    if (endEventBtn) endEventBtn.style.display = 'none';
  }

  const alertBadge = document.getElementById('alert-count-badge');
  if (alertBadge) alertBadge.textContent = viewState.triggeredAlerts.length;

  const isRealUnconf = viewState.dataMode === 'REAL_DATA';

  const n = viewState.indices.NIFTY;
  document.getElementById('card-nifty-val').textContent = isRealUnconf
    ? 'Unavailable'
    : n.current.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  const nBadge = document.getElementById('card-nifty-chg');
  nBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(n.changePercent);
  nBadge.className = `badge num ${n.changePercent >= 0 ? 'pos' : 'neg'}`;
  document.getElementById('card-nifty-prev').textContent = isRealUnconf
    ? 'Configure Adapter'
    : `Base: ${n.baseLevel.toLocaleString('en-IN')} (${n.constituentCount} const.)`;
  drawSparkline('spark-nifty', n.history, n.changePercent >= 0 ? '#22A06B' : '#D94F52');

  const s = viewState.indices.SENSEX;
  document.getElementById('card-sensex-val').textContent = isRealUnconf
    ? 'Unavailable'
    : s.current.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  const sBadge = document.getElementById('card-sensex-chg');
  sBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(s.changePercent);
  sBadge.className = `badge num ${s.changePercent >= 0 ? 'pos' : 'neg'}`;
  document.getElementById('card-sensex-prev').textContent = isRealUnconf
    ? 'Configure Adapter'
    : `Base: ${s.baseLevel.toLocaleString('en-IN')} (${s.constituentCount} const.)`;
  drawSparkline('spark-sensex', s.history, s.changePercent >= 0 ? '#22A06B' : '#D94F52');

  const t = viewState.totals;
  document.getElementById('card-mcap-val').textContent = isRealUnconf ? 'Unavailable' : fmtMcapCr(t.mcapCr);
  const mBadge = document.getElementById('card-mcap-chg');
  mBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(t.mcapChangePct);
  mBadge.className = `badge num ${t.mcapChangePct >= 0 ? 'pos' : 'neg'}`;
  document.getElementById('card-mcap-count').textContent = `${t.listedCount} Listed (${
    viewState.dataMode === 'SIMULATION' ? 'Sim' : 'Adapter'
  })`;
  drawSparkline('spark-mcap', t.mcapHistory, t.mcapChangePct >= 0 ? '#22A06B' : '#D94F52');

  document.getElementById('card-vol-val').textContent = isRealUnconf ? 'Unavailable' : `${t.volumeCr.toFixed(2)} Cr sh`;
  const moodBadge = document.getElementById('card-mood-badge');
  moodBadge.textContent = isRealUnconf ? 'UNAVAILABLE' : t.mood;
  moodBadge.className = `badge ${t.mood === 'BULLISH' ? 'pos' : t.mood === 'BEARISH' ? 'neg' : 'neu'}`;
  document.getElementById('card-breadth-mini').textContent = `Adv: ${t.advancing} | Dec: ${t.declining} | Unch: ${t.unchanged}`;
  drawSparkline('spark-vol', t.volHistory.length > 1 ? t.volHistory : [1, 1.1], '#4B8BE8');
}

function setupGlobalSearch() {
  const input = document.getElementById('global-search');
  const resultsBox = document.getElementById('search-results');
  if (!input || !resultsBox) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      resultsBox.style.display = 'none';
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
          action: () => selectWorldObject('COMPANY', c.id, true)
        });
      }
    });

    SECTORS.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)) {
        matches.push({
          label: s.name,
          sub: 'Sector District',
          typeLabel: 'Sector',
          action: () => selectWorldObject('SECTOR', s.id, true)
        });
      }
    });

    INFRA_FACILITIES.forEach(f => {
      if (f.name.toLowerCase().includes(q) || f.role.toLowerCase().includes(q)) {
        matches.push({
          label: f.name,
          sub: f.role,
          typeLabel: 'Infrastructure',
          action: () => selectWorldObject('INFRA', f.id, true)
        });
      }
    });

    Object.entries(FINANCIAL_LESSONS).forEach(([key, les]) => {
      if (les.title.toLowerCase().includes(q) || les.meaning.toLowerCase().includes(q)) {
        matches.push({
          label: les.title,
          sub: 'Interactive Financial Lesson',
          typeLabel: 'Concept',
          action: () => openConceptModal(key)
        });
      }
    });

    resultsBox.innerHTML = '';
    if (matches.length === 0) {
      resultsBox.innerHTML = `<div style="padding:10px; color:var(--text-secondary);">No matching companies, sectors, or concepts found for "${input.value}".</div>`;
    } else {
      matches.slice(0, 10).forEach(m => {
        const row = document.createElement('div');
        row.className = 'search-item';
        row.innerHTML = `
          <div>
            <div style="font-weight:600;">${m.label}</div>
            <div style="font-size:11px; color:var(--text-secondary);">${m.sub}</div>
          </div>
          <span class="search-item-type">${m.typeLabel}</span>
        `;
        row.addEventListener('click', () => {
          resultsBox.style.display = 'none';
          input.value = '';
          m.action();
        });
        resultsBox.appendChild(row);
      });
    }
    resultsBox.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.style.display = 'none';
    }
  });
}

export function initTopBarEvents() {
  setupGlobalSearch();

  document.getElementById('exchange-select').addEventListener('change', e => {
    store.getLiveState().exchangeFilter = e.target.value;
    update3DCityFromState(store.getViewState());
    store.emit('filter');
  });

  document.getElementById('data-mode-select').addEventListener('change', e => {
    const live = store.getLiveState();
    live.dataMode = e.target.value;
    recalculateAllFinancials(live);
    update3DCityFromState(store.getViewState());
    store.emit('settings');
    store.emit('tick');
  });

  document.getElementById('edu-mode-btn').addEventListener('click', () => {
    const live = store.getLiveState();
    live.beginnerMode = !live.beginnerMode;
    document.getElementById('edu-mode-label').textContent = live.beginnerMode ? 'Beginner' : 'Advanced';
    store.emit('settings');
  });

  document.getElementById('alerts-top-btn').addEventListener('click', openAlertsModal);
  document.getElementById('settings-top-btn').addEventListener('click', openSettingsModal);

  const tourBtn = document.getElementById('tour-top-btn');
  if (tourBtn) tourBtn.addEventListener('click', startOnboardingTour);

  const shotBtn = document.getElementById('screenshot-top-btn');
  if (shotBtn) shotBtn.addEventListener('click', exportWatermarkedScreenshot);

  const kbBtn = document.getElementById('shortcuts-top-btn');
  if (kbBtn) kbBtn.addEventListener('click', openShortcutsModal);

  document.getElementById('toggle-left-btn').addEventListener('click', () => {
    document.body.classList.toggle('left-collapsed');
  });
  document.getElementById('toggle-right-btn').addEventListener('click', () => {
    document.body.classList.toggle('right-collapsed');
  });
  document.getElementById('fullscreen-city-btn').addEventListener('click', () => {
    const allHidden =
      document.body.classList.contains('left-collapsed') &&
      document.body.classList.contains('right-collapsed') &&
      document.body.classList.contains('bottom-collapsed');
    document.body.classList.toggle('left-collapsed', !allHidden);
    document.body.classList.toggle('right-collapsed', !allHidden);
    document.body.classList.toggle('bottom-collapsed', !allHidden);
  });
  document.getElementById('reset-cam-btn').addEventListener('click', () => applyCameraPreset('ENTIRE'));
  document.getElementById('deselect-btn').addEventListener('click', clearSelection);

  document.querySelectorAll('.summary-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('help-icon')) return;
      const type = card.dataset.summaryCard;
      if (type === 'NIFTY' || type === 'SENSEX') switchLeftNavView('indices');
      else if (type === 'MCAP' || type === 'VOL') switchLeftNavView('overview');
    });
  });

  document.querySelectorAll('.help-icon[data-concept]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openConceptModal(btn.dataset.concept);
    });
  });

  const playPauseBtn = document.getElementById('sim-play-pause-btn');
  playPauseBtn.addEventListener('click', () => {
    const live = store.getLiveState();
    live.simRunning = !live.simRunning;
    returnToLiveReplay();
    playPauseBtn.textContent = live.simRunning ? '⏸ Pause' : '▶ Resume';
    update3DCityFromState(store.getViewState());
    updateTopBarAndSummaryCards(store.getViewState());
  });

  document.querySelectorAll('.sim-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.getLiveState().simSpeed = parseFloat(btn.dataset.speed);
      document.querySelectorAll('.sim-speed-btn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  document.getElementById('sim-step-btn').addEventListener('click', () => {
    returnToLiveReplay();
    stepMarketSimulation();
    update3DCityFromState(store.getViewState());
  });

  document.getElementById('sim-reset-btn').addEventListener('click', () => {
    resetFullSimulation();
    update3DCityFromState(store.getViewState());
    showToast('Simulation reset to initial deterministic seed state.');
  });

  document.getElementById('replay-slider').addEventListener('input', e => {
    const idx = parseInt(e.target.value, 10);
    setReplayIndex(idx);
    update3DCityFromState(store.getViewState());
  });

  document.getElementById('replay-live-btn').addEventListener('click', () => {
    returnToLiveReplay();
    update3DCityFromState(store.getViewState());
  });

  document.getElementById('quick-event-select').addEventListener('change', e => {
    const evId = e.target.value;
    if (evId === 'NONE') {
      endActiveEvent();
      update3DCityFromState(store.getViewState());
      showToast('Active event ended. Live simulation continues.');
    } else {
      applyEconomicEvent(evId);
      update3DCityFromState(store.getViewState());
      showToast(`Triggered event: ${e.target.options[e.target.selectedIndex].text}`);
    }
  });

  document.getElementById('end-event-btn').addEventListener('click', () => {
    endActiveEvent();
    update3DCityFromState(store.getViewState());
    showToast('Active event ended without resetting simulation.');
  });
}