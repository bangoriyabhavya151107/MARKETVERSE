/**
 * Simplified 3-Group Top Bar, Events Popover (with icons & 1-line descriptions),
 * Scene Dropdown Popover, Animated Summary Card Counters, and Global Search.
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
import { drawSparkline } from './charts.js';
import { openConceptModal, openAlertsModal, openSettingsModal, openShortcutsModal } from './modal.js';
import { startOnboardingTour, exportWatermarkedScreenshot } from './onboarding.js';
import { switchLeftNavView } from './leftNav.js';
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
  const dur = 260;
  function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const cur = fromVal + (toVal - fromVal) * p;
    el.textContent = formatter(cur);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export function renderEventsPopoverList(viewState = store.getViewState()) {
  const listEl = document.getElementById('events-popover-list');
  if (!listEl) return;

  listEl.innerHTML = Object.values(ECONOMIC_EVENTS)
    .map(ev => {
      const isAct = viewState.activeEventId === ev.id;
      const icon = EVENT_ICONS[ev.id] || '⚡';
      return `
        <div class="event-popover-item ${isAct ? 'active' : ''}" role="menuitem" tabindex="0" data-ev-item="${ev.id}">
          <span style="font-size:16px;">${icon}</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:var(--text-sm);">${ev.name}</div>
            <div style="font-size:11px; color:var(--text-secondary);">${ev.description}</div>
          </div>
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
        showToast('Active event ended. Live simulation continues.');
      } else {
        applyEconomicEvent(evId);
        update3DCityFromState(store.getViewState());
        showToast(`⚡ Event triggered: ${ECONOMIC_EVENTS[evId].name}`);
      }
      document.getElementById('events-popover-menu').style.display = 'none';
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

export function updateTopBarAndSummaryCards(viewState = store.getViewState()) {
  const clockEl = document.getElementById('sim-clock-display');
  const sessionDot = document.getElementById('session-dot');
  const sessionLabel = document.getElementById('session-label');

  if (viewState.dataMode === 'REAL_DATA') {
    sessionDot.className = 'status-dot unavail';
    sessionLabel.textContent = 'UNCONFIGURED';
    clockEl.textContent = 'NO LIVE FEED';
  } else {
    sessionDot.className = 'status-dot' + (viewState.simRunning ? '' : ' paused');
    sessionLabel.textContent =
      viewState.replayIndex !== -1 ? 'REPLAY' : viewState.simRunning ? 'SIMULATED' : 'PAUSED';
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

  const decayBadge = document.getElementById('event-decay-badge');
  const endEventBtn = document.getElementById('end-event-btn');
  if (viewState.activeEventId && viewState.activeEventId !== 'NONE') {
    if (decayBadge) {
      decayBadge.style.display = 'inline-flex';
      decayBadge.textContent = `${viewState.eventRemainingTicks}t`;
    }
    if (endEventBtn) endEventBtn.style.display = 'inline-block';
  } else {
    if (decayBadge) decayBadge.style.display = 'none';
    if (endEventBtn) endEventBtn.style.display = 'none';
  }

  const alertBadge = document.getElementById('alert-count-badge');
  if (alertBadge) alertBadge.textContent = viewState.triggeredAlerts.length;

  const isRealUnconf = viewState.dataMode === 'REAL_DATA';

  // 1. NIFTY with animated counter
  const n = viewState.indices.NIFTY;
  if (isRealUnconf) {
    document.getElementById('card-nifty-val').textContent = 'Unavailable';
  } else {
    animateCounterText('card-nifty-val', prevCardNums.nifty, n.current, v =>
      v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );
    prevCardNums.nifty = n.current;
  }
  const nBadge = document.getElementById('card-nifty-chg');
  nBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(n.changePercent);
  nBadge.className = `badge num ${n.changePercent >= 0 ? 'pos' : 'neg'}`;
  document.getElementById('card-nifty-prev').textContent = isRealUnconf
    ? 'Configure Adapter'
    : `Base: ${n.baseLevel.toLocaleString('en-IN')} (${n.constituentCount} const.)`;
  drawSparkline('spark-nifty', n.history, n.changePercent >= 0 ? '#22A06B' : '#E05255');

  // 2. SENSEX with animated counter
  const s = viewState.indices.SENSEX;
  if (isRealUnconf) {
    document.getElementById('card-sensex-val').textContent = 'Unavailable';
  } else {
    animateCounterText('card-sensex-val', prevCardNums.sensex, s.current, v =>
      v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );
    prevCardNums.sensex = s.current;
  }
  const sBadge = document.getElementById('card-sensex-chg');
  sBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(s.changePercent);
  sBadge.className = `badge num ${s.changePercent >= 0 ? 'pos' : 'neg'}`;
  document.getElementById('card-sensex-prev').textContent = isRealUnconf
    ? 'Configure Adapter'
    : `Base: ${s.baseLevel.toLocaleString('en-IN')} (${s.constituentCount} const.)`;
  drawSparkline('spark-sensex', s.history, s.changePercent >= 0 ? '#22A06B' : '#E05255');

  // 3. Total Market Cap
  const t = viewState.totals;
  document.getElementById('card-mcap-val').textContent = isRealUnconf ? 'Unavailable' : fmtMcapCr(t.mcapCr);
  const mBadge = document.getElementById('card-mcap-chg');
  mBadge.textContent = isRealUnconf ? 'No Feed' : fmtPct(t.mcapChangePct);
  mBadge.className = `badge num ${t.mcapChangePct >= 0 ? 'pos' : 'neg'}`;
  document.getElementById('card-mcap-count').textContent = `${t.listedCount} Listed Companies`;
  drawSparkline('spark-mcap', t.mcapHistory, t.mcapChangePct >= 0 ? '#22A06B' : '#E05255');

  // 4. Volume & Mood
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

function setupPopovers() {
  const evBtn = document.getElementById('events-popover-btn');
  const evMenu = document.getElementById('events-popover-menu');
  const scBtn = document.getElementById('scene-popover-btn');
  const scMenu = document.getElementById('scene-popover-menu');

  if (evBtn && evMenu) {
    evBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = evMenu.style.display === 'block';
      if (scMenu) scMenu.style.display = 'none';
      if (!open) renderEventsPopoverList(store.getViewState());
      evMenu.style.display = open ? 'none' : 'block';
      evBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  if (scBtn && scMenu) {
    scBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = scMenu.style.display === 'block';
      if (evMenu) evMenu.style.display = 'none';
      scMenu.style.display = open ? 'none' : 'block';
      scBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  document.addEventListener('click', e => {
    if (evMenu && !evMenu.contains(e.target) && e.target !== evBtn) {
      evMenu.style.display = 'none';
    }
    if (scMenu && !scMenu.contains(e.target) && e.target !== scBtn) {
      scMenu.style.display = 'none';
    }
  });
}

export function initTopBarEvents() {
  setupGlobalSearch();
  setupPopovers();
  renderEventsPopoverList(store.getViewState());

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

  const sceneThemeBtn = document.getElementById('scene-theme-toggle-btn');
  if (sceneThemeBtn) {
    sceneThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-ui');
      store.getLiveState().lightUiTheme = document.body.classList.contains('light-ui');
      store.emit('settings');
    });
  }

  document.getElementById('toggle-left-btn').addEventListener('click', () => {
    if (document.body.classList.contains('left-icon-only')) {
      document.body.classList.remove('left-icon-only');
    } else {
      document.body.classList.add('left-icon-only');
    }
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

  document.getElementById('end-event-btn').addEventListener('click', () => {
    endActiveEvent();
    update3DCityFromState(store.getViewState());
    showToast('Active event ended without resetting simulation.');
  });
}