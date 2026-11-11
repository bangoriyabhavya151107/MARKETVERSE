/**
 * MarketVerse Hash Router & Screen Containers.
 * Manages 5 discrete screen views:
 *   #/city      - 3D full-screen city with slim top bar, floating market pulse chip, and bottom/left rail
 *   #/markets   - Index cards, breadth bar, 10 sector districts breakdown, and macro events
 *   #/companies - Directory with search, filters, sorting (cards on mobile, table on desktop) + detail inspector
 *   #/learn     - 12 financial literacy lessons + 6 Learning Plaza landmarks with 3D fly-to links
 *   #/tools     - Compare (2–4), Watchlist, Portfolio, What-If simulator, and Alerts
 */
import { store } from '../state/store.js';
import { SECTORS, SECTOR_MAP } from '../data/sectors.js';
import { FINANCIAL_LESSONS } from '../data/lessons.js';
import { LEARNING_LANDMARKS } from '../data/landmarks.js';
import { ECONOMIC_EVENTS } from '../data/events.js';
import { getSectorStats } from '../engine/finance.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../utils/format.js';
import { selectWorldObject, clearSelection } from '../controls/picking.js';
import { applyCameraPreset } from '../controls/cameraRig.js';
import { update3DCityFromState } from '../world/buildings.js';
import { openConceptModal, openCreditsModal, openPrivacyModal, openTermsModal } from './modal.js';
import { drawSparkline } from './charts.js';
import { closeAllPanels, openPanel } from './panels.js';
import { applyEconomicEvent, endActiveEvent, resetFullSimulation } from '../engine/simulation.js';
import { showToast } from './toasts.js';

export const ROUTES = ['city', 'markets', 'companies', 'learn', 'tools'];
let currentRoute = 'city';

export function getCurrentRoute() {
  return currentRoute;
}

/**
 * Navigates to a hash route (e.g. 'city', 'markets', 'companies', 'learn', 'tools').
 */
export function navigateTo(routeKey) {
  const clean = routeKey.replace(/^#\/?/, '') || 'city';
  const target = ROUTES.includes(clean) ? clean : 'city';
  if (window.location.hash !== `#/${target}`) {
    window.location.hash = `#/${target}`;
  } else {
    handleRouteChange(target);
  }
}

/**
 * Internal route handler.
 */
function handleRouteChange(routeKey) {
  currentRoute = ROUTES.includes(routeKey) ? routeKey : 'city';

  // Update navigation button active states
  document.querySelectorAll('.mob-nav-btn, .nav-btn').forEach(btn => {
    const v = btn.dataset.route || btn.dataset.mobView || btn.dataset.view;
    btn.classList.toggle('active', v === currentRoute);
  });

  // Toggle active screen visibility
  ROUTES.forEach(r => {
    const el = document.getElementById(`screen-${r}`);
    if (el) {
      if (r === currentRoute) {
        el.classList.add('active');
        el.style.display = 'block';
      } else {
        el.classList.remove('active');
        el.style.display = 'none';
      }
    }
  });

  // Viewport container visibility and canvas interaction
  const viewport = document.getElementById('viewport-container');
  const pulseChip = document.getElementById('market-pulse-chip');
  const dpad = document.getElementById('viewport-toggles');
  const minimap = document.getElementById('minimap-container');
  const labelsOverlay = document.getElementById('world-labels');

  if (currentRoute === 'city') {
    if (viewport) viewport.style.pointerEvents = 'auto';
    if (pulseChip) pulseChip.style.display = 'flex';
    if (dpad) dpad.style.display = 'flex';
    if (minimap && window.innerWidth > 768) minimap.style.display = 'block';
    if (labelsOverlay) labelsOverlay.style.display = 'block';
  } else {
    if (viewport) viewport.style.pointerEvents = 'none';
    if (pulseChip) pulseChip.style.display = 'none';
    if (dpad) dpad.style.display = 'none';
    if (minimap) minimap.style.display = 'none';
    if (labelsOverlay) labelsOverlay.style.display = 'none';
    closeAllPanels();
  }

  // Render content of active screen
  renderActiveScreen(currentRoute, store.getViewState());
}

/**
 * Re-renders the content of whichever screen is currently active.
 */
export function renderActiveScreen(route = currentRoute, viewState = store.getViewState()) {
  switch (route) {
    case 'markets':
      renderMarketsScreen(viewState);
      break;
    case 'companies':
      renderCompaniesScreen(viewState);
      break;
    case 'learn':
      renderLearnScreen(viewState);
      break;
    case 'tools':
      renderToolsScreen(viewState);
      break;
    case 'city':
    default:
      updateMarketPulseChip(viewState);
      break;
  }
}

/**
 * Updates the floating expandable Market Pulse chip in the 3D City view.
 */
export function updateMarketPulseChip(viewState = store.getViewState()) {
  const chip = document.getElementById('market-pulse-chip');
  if (!chip) return;

  const n = viewState.indices.NIFTY;
  const mood = viewState.totals.mood;
  const isPos = n.changePercent >= 0;

  const summaryText = `📈 NIFTY ${n.current.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${fmtPct(n.changePercent)}) • ${mood}`;
  const textEl = document.getElementById('market-pulse-text');
  if (textEl) textEl.textContent = summaryText;

  chip.className = `market-pulse-chip ${isPos ? 'pos' : 'neg'}`;

  // Update expanded popup card if currently open
  const popover = document.getElementById('market-pulse-popover');
  if (popover && popover.style.display !== 'none') {
    const s = viewState.indices.SENSEX;
    const t = viewState.totals;
    const count = t.listedCount || viewState.companies.length;

    popover.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:700; font-size:var(--text-md); color:var(--text-primary);">Market Overview</span>
        <button id="pulse-popover-close-btn" style="padding:2px 6px; font-size:var(--text-sm);">✕</button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px;">
        <div class="metric-box">
          <div class="metric-label">NIFTY 50</div>
          <div class="metric-val num" style="font-size:14px;">${n.current.toFixed(2)}</div>
          <span class="badge num ${isPos ? 'pos' : 'neg'}" style="font-size:11px;">${fmtPct(n.changePercent)}</span>
        </div>
        <div class="metric-box">
          <div class="metric-label">SENSEX</div>
          <div class="metric-val num" style="font-size:14px;">${s.current.toFixed(2)}</div>
          <span class="badge num ${s.changePercent >= 0 ? 'pos' : 'neg'}" style="font-size:11px;">${fmtPct(s.changePercent)}</span>
        </div>
      </div>
      <div class="metric-box" style="margin-bottom:8px;">
        <div class="metric-label">City M-Cap & Volume</div>
        <div class="metric-val num" style="font-size:13px;">${fmtMcapCr(t.mcapCr)} • ${t.volumeCr.toFixed(2)} Cr sh</div>
      </div>
      <div class="metric-label" style="margin-bottom:4px;">Market Breadth (${count} Listed)</div>
      <div style="display:flex; height:6px; border-radius:3px; overflow:hidden; margin-bottom:6px;">
        <div style="width:${(t.advancing / count) * 100}%; background:var(--pos);"></div>
        <div style="width:${(t.unchanged / count) * 100}%; background:var(--neu);"></div>
        <div style="width:${(t.declining / count) * 100}%; background:var(--neg);"></div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);">
        <span class="pos-text">▲ Adv: ${t.advancing}</span>
        <span class="neu-text">• Unch: ${t.unchanged}</span>
        <span class="neg-text">▼ Dec: ${t.declining}</span>
      </div>
      <button id="pulse-view-markets-btn" class="primary" style="width:100%; margin-top:8px; font-size:var(--text-sm);">Open Full Markets Screen →</button>
    `;

    popover.querySelector('#pulse-popover-close-btn')?.addEventListener('click', () => {
      popover.style.display = 'none';
    });
    popover.querySelector('#pulse-view-markets-btn')?.addEventListener('click', () => {
      popover.style.display = 'none';
      navigateTo('markets');
    });
  }
}

/**
 * 2. MARKETS SCREEN: Index Cards, Breadth, 10 Sectors, Macro Events
 */
function renderMarketsScreen(viewState) {
  const container = document.getElementById('screen-markets');
  if (!container) return;

  const n = viewState.indices.NIFTY;
  const s = viewState.indices.SENSEX;
  const t = viewState.totals;
  const count = Math.max(1, t.listedCount || viewState.companies.length);
  const activeEv = ECONOMIC_EVENTS[viewState.activeEventId] || ECONOMIC_EVENTS.NONE;

  container.innerHTML = `
    <div class="screen-page-container">
      <header class="screen-header">
        <div>
          <h2>Market Indices & Sector Districts</h2>
          <p class="screen-subtitle">Simulated benchmarks, broad market breadth, and macroeconomic shock simulations.</p>
        </div>
        <button id="markets-to-city-btn" class="primary" style="min-height:44px; display:inline-flex; align-items:center; gap:6px;">
          <span>🌐</span><span>View in 3D City</span>
        </button>
      </header>

      <!-- 4 PRIMARY INDEX CARDS -->
      <div class="summary-cards-row" style="margin-bottom:16px;">
        <div class="summary-card" title="Cap-weighted simulated NIFTY index">
          <div class="card-header">
            <span>NIFTY 50 <span class="badge sim">SIMULATED</span></span>
            <button class="help-icon" data-help-concept="indices">?</button>
          </div>
          <div class="card-value-row">
            <span class="card-main-val num">${n.current.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span class="badge num ${n.changePercent >= 0 ? 'pos' : 'neg'}">${fmtPct(n.changePercent)}</span>
          </div>
          <div class="card-sub-row">
            <span class="num">Base: ${n.baseLevel.toLocaleString('en-IN')} (${n.constituentCount} const.)</span>
            <svg class="sparkline-svg" id="mkt-spark-nifty"></svg>
          </div>
        </div>

        <div class="summary-card" title="Cap-weighted simulated SENSEX index">
          <div class="card-header">
            <span>SENSEX <span class="badge sim">SIMULATED</span></span>
            <button class="help-icon" data-help-concept="indices">?</button>
          </div>
          <div class="card-value-row">
            <span class="card-main-val num">${s.current.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span class="badge num ${s.changePercent >= 0 ? 'pos' : 'neg'}">${fmtPct(s.changePercent)}</span>
          </div>
          <div class="card-sub-row">
            <span class="num">Base: ${s.baseLevel.toLocaleString('en-IN')} (${s.constituentCount} const.)</span>
            <svg class="sparkline-svg" id="mkt-spark-sensex"></svg>
          </div>
        </div>

        <div class="summary-card" title="City Market Capitalization">
          <div class="card-header">
            <span>City M-Cap <span class="badge sim">SIMULATED</span></span>
            <button class="help-icon" data-help-concept="marketCap">?</button>
          </div>
          <div class="card-value-row">
            <span class="card-main-val num">${fmtMcapCr(t.mcapCr)}</span>
            <span class="badge num ${t.mcapChangePct >= 0 ? 'pos' : 'neg'}">${fmtPct(t.mcapChangePct)}</span>
          </div>
          <div class="card-sub-row">
            <span>${count} Listed Companies</span>
            <svg class="sparkline-svg" id="mkt-spark-mcap"></svg>
          </div>
        </div>

        <div class="summary-card" title="Total Volume & Market Sentiment">
          <div class="card-header">
            <span>Volume & Mood <span class="badge sim">SIMULATED</span></span>
            <button class="help-icon" data-help-concept="volume">?</button>
          </div>
          <div class="card-value-row">
            <span class="card-main-val num">${t.volumeCr.toFixed(2)} Cr sh</span>
            <span class="badge ${t.mood === 'BULLISH' ? 'pos' : t.mood === 'BEARISH' ? 'neg' : 'neu'}">${t.mood}</span>
          </div>
          <div class="card-sub-row">
            <span>Adv: ${t.advancing} | Dec: ${t.declining}</span>
            <svg class="sparkline-svg" id="mkt-spark-vol"></svg>
          </div>
        </div>
      </div>

      <!-- BREADTH VISUALIZER -->
      <section class="screen-card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3 style="font-size:var(--text-lg); margin:0;">Market Breadth (Advancing vs. Declining)</h3>
          <span style="font-size:var(--text-sm); color:var(--text-secondary);">${count} Listed Stocks</span>
        </div>
        <div style="display:flex; height:12px; border-radius:6px; overflow:hidden; margin-bottom:8px;">
          <div style="width:${(t.advancing / count) * 100}%; background:var(--pos); transition:width 0.3s ease;"></div>
          <div style="width:${(t.unchanged / count) * 100}%; background:var(--neu); transition:width 0.3s ease;"></div>
          <div style="width:${(t.declining / count) * 100}%; background:var(--neg); transition:width 0.3s ease;"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:var(--text-sm);">
          <span class="pos-text">▲ Advancing: <strong>${t.advancing}</strong> (${((t.advancing / count) * 100).toFixed(0)}%)</span>
          <span class="neu-text">• Unchanged: <strong>${t.unchanged}</strong></span>
          <span class="neg-text">▼ Declining: <strong>${t.declining}</strong> (${((t.declining / count) * 100).toFixed(0)}%)</span>
        </div>
      </section>

      <!-- 10 SECTOR DISTRICTS BREAKDOWN -->
      <section class="screen-card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="font-size:var(--text-lg); margin:0;">10 Sector Districts Performance</h3>
            <p style="font-size:var(--text-sm); color:var(--text-secondary); margin:2px 0 0;">
              Cap-Weighted vs. Equal-Weighted returns. Click any sector to view companies or inspect.
            </p>
          </div>
        </div>
        <div class="sector-grid">
          ${SECTORS.map(sec => {
            const st = getSectorStats(sec.id, viewState);
            const isPosSec = st.capWeightedChangePct >= 0;
            return `
              <div class="sector-card" data-sec-card="${sec.id}" style="border-top:3px solid ${sec.color};">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <div>
                    <strong style="color:${sec.color}; font-size:var(--text-md);">${sec.name}</strong>
                    <div style="font-size:11px; color:var(--text-secondary);">${st.companies.length} Companies</div>
                  </div>
                  <span class="badge num ${isPosSec ? 'pos' : 'neg'}" style="font-size:var(--text-sm);">
                    ${fmtPct(st.capWeightedChangePct)}
                  </span>
                </div>
                <div style="font-size:var(--text-sm); color:var(--text-muted); margin-bottom:6px;">
                  Equal-Weighted: <span class="num ${st.equalWeightedChangePct >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(st.equalWeightedChangePct)}</span>
                </div>
                <div style="font-size:var(--text-sm); color:var(--text-secondary); margin-bottom:8px;">
                  Total Cap: <span class="num">${fmtMcapCr(st.totalMarketCap)}</span>
                </div>
                <div style="display:flex; gap:6px;">
                  <button data-inspect-sec="${sec.id}" style="flex:1; min-height:40px; font-size:var(--text-sm);">Inspect Sector</button>
                  <button data-fly-sec="${sec.id}" class="primary" style="flex:1; min-height:40px; font-size:var(--text-sm);">Fly in 3D 🌐</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- MACROECONOMIC SCENARIO SIMULATOR -->
      <section class="screen-card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="font-size:var(--text-lg); margin:0;">Macroeconomic Shock Scenarios</h3>
            <p style="font-size:var(--text-sm); color:var(--text-secondary); margin:2px 0 0;">
              Simulate economic catalysts and study market reactions across sectors.
            </p>
          </div>
          <div style="display:flex; gap:6px;">
            ${viewState.activeEventId && viewState.activeEventId !== 'NONE' ? `
              <button id="mkt-end-event-btn" class="primary" style="min-height:44px;">⏹ End Active Event</button>
            ` : ''}
            <button id="mkt-reset-sim-btn" style="min-height:44px;">↺ Reset Sim</button>
          </div>
        </div>

        ${viewState.activeEventId && viewState.activeEventId !== 'NONE' ? `
          <div class="edu-block" style="border-left:4px solid var(--accent); margin-bottom:12px;">
            <strong>Active Event: ${activeEv.name}</strong>
            <p style="font-size:var(--text-sm); margin:4px 0 0;">${activeEv.description}</p>
            <div style="margin-top:6px; font-size:var(--text-sm); color:var(--accent);">
              ⏳ Model decay: ${viewState.eventRemainingTicks} ticks remaining before market returns to baseline drift.
            </div>
          </div>
        ` : ''}

        <div class="events-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Scenario Name</th>
                <th>Description</th>
                <th>Affected Sectors</th>
                <th>Model Assumptions</th>
                <th>Simulate</th>
              </tr>
            </thead>
            <tbody>
              ${Object.values(ECONOMIC_EVENTS).map(ev => {
                const isAct = viewState.activeEventId === ev.id;
                return `
                  <tr class="${isAct ? 'active-event-row' : ''}">
                    <td style="font-weight:700;">${ev.name}</td>
                    <td style="font-size:var(--text-sm); max-width:240px;">${ev.description}</td>
                    <td style="font-size:var(--text-sm); max-width:200px;">${ev.sectorsAffected}</td>
                    <td style="font-size:11.5px; color:var(--text-secondary); max-width:240px;">${ev.assumptions}</td>
                    <td>
                      <button data-trigger-ev="${ev.id}" class="${isAct ? 'active' : 'primary'}" style="min-height:44px; width:100%;">
                        ${ev.id === 'NONE' ? '⏹ End Event' : isAct ? 'Active' : '⚡ Simulate'}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>

      ${renderFooterHTML()}
    </div>
  `;

  // Draw sparklines
  drawSparkline('mkt-spark-nifty', n.history, n.changePercent >= 0 ? '#22A06B' : '#E05255');
  drawSparkline('mkt-spark-sensex', s.history, s.changePercent >= 0 ? '#22A06B' : '#E05255');
  drawSparkline('mkt-spark-mcap', t.mcapHistory, t.mcapChangePct >= 0 ? '#22A06B' : '#E05255');
  drawSparkline('mkt-spark-vol', t.volHistory.length > 1 ? t.volHistory : [1, 1.1], '#4B8BE8');

  // Wire events
  container.querySelector('#markets-to-city-btn')?.addEventListener('click', () => {
    navigateTo('city');
    applyCameraPreset('ENTIRE');
  });

  container.querySelectorAll('[data-help-concept]').forEach(btn => {
    btn.addEventListener('click', () => openConceptModal(btn.dataset.helpConcept));
  });

  container.querySelectorAll('[data-inspect-sec]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectWorldObject('SECTOR', btn.dataset.inspectSec, false);
      openPanel('right-panel');
    });
  });

  container.querySelectorAll('[data-fly-sec]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo('city');
      selectWorldObject('SECTOR', btn.dataset.flySec, true);
    });
  });

  container.querySelectorAll('[data-trigger-ev]').forEach(btn => {
    btn.addEventListener('click', () => {
      const evId = btn.dataset.triggerEv;
      if (evId === 'NONE') {
        endActiveEvent();
        update3DCityFromState(store.getViewState());
        showToast('Active event ended.');
      } else {
        applyEconomicEvent(evId);
        update3DCityFromState(store.getViewState());
        showToast(`⚡ Simulated: ${ECONOMIC_EVENTS[evId].name}`);
      }
      renderMarketsScreen(store.getViewState());
    });
  });

  container.querySelector('#mkt-end-event-btn')?.addEventListener('click', () => {
    endActiveEvent();
    update3DCityFromState(store.getViewState());
    renderMarketsScreen(store.getViewState());
    showToast('Active event ended.');
  });

  container.querySelector('#mkt-reset-sim-btn')?.addEventListener('click', () => {
    resetFullSimulation();
    update3DCityFromState(store.getViewState());
    renderMarketsScreen(store.getViewState());
    showToast('Simulation reset to initial state.');
  });

  wireFooterLinks(container);
}

/**
 * 3. COMPANIES SCREEN: Directory, search, filters, table (desktop) / cards (mobile)
 */
let companyFilterText = '';
let companyExchangeFilter = 'ALL';
let companySectorFilter = 'ALL';
let companySortCol = 'marketCap';
let companySortAsc = false;

function renderCompaniesScreen(viewState) {
  const container = document.getElementById('screen-companies');
  if (!container) return;

  const isMobile = window.innerWidth <= 768;
  const q = companyFilterText.trim().toLowerCase();

  const filtered = viewState.companies.filter(c => {
    if (companyExchangeFilter !== 'ALL' && c.exchange !== companyExchangeFilter) return false;
    if (companySectorFilter !== 'ALL' && c.sector !== companySectorFilter) return false;
    if (!q) return true;
    return (
      c.symbol.toLowerCase().includes(q) ||
      c.companyName.toLowerCase().includes(q) ||
      SECTOR_MAP[c.sector].name.toLowerCase().includes(q)
    );
  });

  filtered.sort((a, b) => {
    const va = a[companySortCol];
    const vb = b[companySortCol];
    if (va === null) return 1;
    if (vb === null) return -1;
    if (typeof va === 'string') return companySortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    return companySortAsc ? va - vb : vb - va;
  });

  container.innerHTML = `
    <div class="screen-page-container">
      <header class="screen-header">
        <div>
          <h2>Listed Companies Directory (${filtered.length} of ${viewState.companies.length})</h2>
          <p class="screen-subtitle">Filter, search, and inspect corporate fundamentals. Select any company to open its detail sheet.</p>
        </div>
        <button id="comp-to-city-btn" class="primary" style="min-height:44px; display:inline-flex; align-items:center; gap:6px;">
          <span>🌐</span><span>View 3D City</span>
        </button>
      </header>

      <!-- FILTER & SEARCH CONTROLS -->
      <section class="screen-card" style="margin-bottom:16px;">
        <div class="company-filter-grid">
          <div>
            <label style="font-size:var(--text-sm); color:var(--text-secondary); display:block; margin-bottom:4px;">Search Ticker / Name:</label>
            <input type="text" id="comp-search-input" value="${companyFilterText}" placeholder="Search company or ticker..." style="width:100%; min-height:44px;" />
          </div>
          <div>
            <label style="font-size:var(--text-sm); color:var(--text-secondary); display:block; margin-bottom:4px;">Exchange:</label>
            <select id="comp-exch-select" style="width:100%; min-height:44px;">
              <option value="ALL" ${companyExchangeFilter === 'ALL' ? 'selected' : ''}>All Exchanges (NSE + BSE)</option>
              <option value="NSE" ${companyExchangeFilter === 'NSE' ? 'selected' : ''}>NSE Listed Only</option>
              <option value="BSE" ${companyExchangeFilter === 'BSE' ? 'selected' : ''}>BSE Listed Only</option>
            </select>
          </div>
          <div>
            <label style="font-size:var(--text-sm); color:var(--text-secondary); display:block; margin-bottom:4px;">Sector District:</label>
            <select id="comp-sec-select" style="width:100%; min-height:44px;">
              <option value="ALL" ${companySectorFilter === 'ALL' ? 'selected' : ''}>All 10 Sectors</option>
              ${SECTORS.map(s => `<option value="${s.id}" ${companySectorFilter === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
          </div>
        </div>
      </section>

      <!-- COMPANIES PRESENTATION (CARDS ON MOBILE, TABLE ON DESKTOP) -->
      ${isMobile ? `
        <!-- MOBILE CARD LIST -->
        <div class="company-card-list">
          ${filtered.length === 0 ? `<div class="edu-block warn">No companies match your filters.</div>` : ''}
          ${filtered.map(c => {
            const sec = SECTOR_MAP[c.sector];
            const isPos = c.changePercent >= 0;
            return `
              <div class="company-mobile-card" data-comp-id="${c.id}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <div>
                    <div style="font-weight:700; font-size:var(--text-md);">${c.symbol} <span class="badge sim" style="font-size:10px;">${c.exchange}</span></div>
                    <div style="font-size:var(--text-sm); color:var(--text-secondary);">${c.companyName}</div>
                  </div>
                  <div style="text-align:right;">
                    <div class="num" style="font-weight:700; font-size:var(--text-md);">${fmtPrice(c.price)}</div>
                    <span class="badge num ${isPos ? 'pos' : 'neg'}" style="font-size:11px;">${fmtPct(c.changePercent)}</span>
                  </div>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:var(--text-sm); color:var(--text-muted); margin-bottom:10px;">
                  <span style="color:${sec.color}; font-weight:600;">${sec.name}</span>
                  <span class="num">M-Cap: ${fmtMcapCr(c.marketCap)}</span>
                </div>
                <div style="display:flex; gap:8px;">
                  <button data-open-comp="${c.id}" class="primary" style="flex:1; min-height:44px; font-size:var(--text-sm);">Inspect Fundamentals</button>
                  <button data-jump-comp="${c.id}" style="min-height:44px; padding:0 12px; font-size:var(--text-sm);" title="Fly Camera to Building in 3D">🌐 3D</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <!-- DESKTOP DATA TABLE -->
        <section class="screen-card">
          <div class="table-wrapper">
            <table class="data-table" aria-label="Listed Companies Table">
              <thead>
                <tr>
                  <th data-sort-key="symbol">Ticker</th>
                  <th data-sort-key="companyName">Company Name</th>
                  <th data-sort-key="sector">Sector</th>
                  <th data-sort-key="exchange">Exch</th>
                  <th data-sort-key="price">Price (₹)</th>
                  <th data-sort-key="changePercent">Change (%)</th>
                  <th data-sort-key="marketCap">Market Cap</th>
                  <th data-sort-key="volume">Volume</th>
                  <th data-sort-key="pe">P/E</th>
                  <th data-sort-key="divYield">Div Yield</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.length === 0 ? `<tr><td colspan="11" style="text-align:center; padding:20px;">No companies match your filters.</td></tr>` : ''}
                ${filtered.map(c => {
                  const sec = SECTOR_MAP[c.sector];
                  const isPos = c.changePercent >= 0;
                  return `
                    <tr data-comp-row="${c.id}" tabindex="0">
                      <td style="font-weight:700;">${c.symbol}</td>
                      <td>${c.companyName}</td>
                      <td style="color:${sec.color}; font-weight:600;">${sec.name}</td>
                      <td><span class="badge sim" style="font-size:10px;">${c.exchange}</span></td>
                      <td class="num">${fmtPrice(c.price)}</td>
                      <td class="num ${isPos ? 'pos-text' : 'neg-text'}">${fmtPct(c.changePercent)}</td>
                      <td class="num">${fmtMcapCr(c.marketCap)}</td>
                      <td class="num">${c.volume ? (c.volume / 100000).toFixed(2) + 'L' : '—'}</td>
                      <td class="num">${c.pe !== null ? c.pe.toFixed(1) : '—'}</td>
                      <td class="num">${c.divYield !== null ? c.divYield.toFixed(2) + '%' : '—'}</td>
                      <td>
                        <button data-open-comp="${c.id}" class="primary" style="padding:4px 8px; font-size:var(--text-sm); min-height:36px;">Inspect</button>
                        <button data-jump-comp="${c.id}" style="padding:4px 8px; font-size:var(--text-sm); min-height:36px;">🌐 3D</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </section>
      `}

      ${renderFooterHTML()}
    </div>
  `;

  // Search and filter listeners
  const searchInput = container.querySelector('#comp-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      companyFilterText = e.target.value;
      renderCompaniesScreen(store.getViewState());
    });
  }

  const exchSelect = container.querySelector('#comp-exch-select');
  if (exchSelect) {
    exchSelect.addEventListener('change', e => {
      companyExchangeFilter = e.target.value;
      renderCompaniesScreen(store.getViewState());
    });
  }

  const secSelect = container.querySelector('#comp-sec-select');
  if (secSelect) {
    secSelect.addEventListener('change', e => {
      companySectorFilter = e.target.value;
      renderCompaniesScreen(store.getViewState());
    });
  }

  // Sort listeners on desktop table headers
  container.querySelectorAll('[data-sort-key]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sortKey;
      if (companySortCol === key) {
        companySortAsc = !companySortAsc;
      } else {
        companySortCol = key;
        companySortAsc = false;
      }
      renderCompaniesScreen(store.getViewState());
    });
  });

  // Open inspector sheet
  container.querySelectorAll('[data-open-comp]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectWorldObject('COMPANY', btn.dataset.openComp, false);
      openPanel('right-panel');
    });
  });

  // Jump to 3D city building
  container.querySelectorAll('[data-jump-comp]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo('city');
      selectWorldObject('COMPANY', btn.dataset.jumpComp, true);
    });
  });

  container.querySelector('#comp-to-city-btn')?.addEventListener('click', () => {
    navigateTo('city');
    applyCameraPreset('ENTIRE');
  });

  wireFooterLinks(container);
}

/**
 * 4. LEARN SCREEN: 12 Financial Lessons + 6 Learning Plaza Landmarks
 */
function renderLearnScreen(viewState) {
  const container = document.getElementById('screen-learn');
  if (!container) return;

  const lessons = Object.entries(FINANCIAL_LESSONS);

  container.innerHTML = `
    <div class="screen-page-container">
      <header class="screen-header">
        <div>
          <h2>Financial Education Curriculum</h2>
          <p class="screen-subtitle">12 essential investor concepts with plain-language definitions, exact formulas, examples, and 3D landmarks.</p>
        </div>
        <button id="learn-to-city-btn" class="primary" style="min-height:44px; display:inline-flex; align-items:center; gap:6px;">
          <span>🧭</span><span>Fly to Learning Plaza</span>
        </button>
      </header>

      <!-- 6 3D LEARNING PLAZA LANDMARKS -->
      <section class="screen-card" style="margin-bottom:20px;">
        <h3 style="font-size:var(--text-lg); margin-top:0;">3D Learning Plaza Landmarks</h3>
        <p style="font-size:var(--text-sm); color:var(--text-secondary); margin-bottom:12px;">
          Visit the physical representations of key market concepts in the Investor Learning District.
        </p>
        <div class="landmark-grid">
          ${LEARNING_LANDMARKS.map(lm => `
            <div class="landmark-card">
              <div style="font-size:24px; margin-bottom:4px;">${lm.badgeIcon || '🏛️'}</div>
              <strong style="font-size:var(--text-md);">${lm.name}</strong>
              <div style="font-size:var(--text-sm); color:var(--text-secondary); margin:4px 0 8px;">${lm.role}</div>
              <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">${lm.conceptSummary}</p>
              <button data-fly-landmark="${lm.id}" class="primary" style="width:100%; min-height:40px; font-size:var(--text-sm);">
                Fly to Landmark in 3D 🌐
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 12 FINANCIAL LESSONS -->
      <section class="screen-card" style="margin-bottom:16px;">
        <h3 style="font-size:var(--text-lg); margin-top:0;">12 Core Financial Literacy Lessons</h3>
        <p style="font-size:var(--text-sm); color:var(--text-secondary); margin-bottom:12px;">
          Clear, jargon-free explanations with exact mathematical formulas and common beginner misconceptions.
        </p>

        <div class="lessons-accordion">
          ${lessons.map(([key, les], idx) => `
            <details class="lesson-accordion-item" data-lesson-key="${key}">
              <summary class="lesson-accordion-summary">
                <span style="font-weight:700;">${idx + 1}. ${les.title}</span>
                <span class="badge sim" style="font-size:11px;">Lesson</span>
              </summary>
              <div class="lesson-accordion-body">
                <p style="font-size:var(--text-md); margin-top:0;"><strong>What it means:</strong> ${les.meaning}</p>
                <div class="formula-box" style="background:var(--bg-elevated); padding:8px 12px; border-radius:var(--radius-sm); margin:8px 0; font-family:monospace; font-size:13px; color:var(--accent);">
                  ${les.formula}
                </div>
                <div class="edu-block" style="margin:8px 0;">
                  <strong>Practical Example:</strong> ${les.example}
                </div>
                <div class="edu-block warn" style="margin:8px 0;">
                  <strong>Common Misconception:</strong> ${les.misconception}
                </div>
                <div style="display:flex; justify-content:flex-end; margin-top:8px;">
                  <button data-open-modal-lesson="${key}" class="primary" style="min-height:40px;">
                    Open Interactive Calculator →
                  </button>
                </div>
              </div>
            </details>
          `).join('')}
        </div>
      </section>

      ${renderFooterHTML()}
    </div>
  `;

  // Wire events
  container.querySelectorAll('[data-fly-landmark]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo('city');
      selectWorldObject('LEARN', btn.dataset.flyLandmark, true);
    });
  });

  container.querySelectorAll('[data-open-modal-lesson]').forEach(btn => {
    btn.addEventListener('click', () => openConceptModal(btn.dataset.openModalLesson));
  });

  container.querySelector('#learn-to-city-btn')?.addEventListener('click', () => {
    navigateTo('city');
    applyCameraPreset('LEARN');
  });

  wireFooterLinks(container);
}

/**
 * 5. TOOLS SCREEN: Compare, Watchlist, Portfolio, What-If, Alerts
 */
let activeToolsTab = 'compare';

function renderToolsScreen(viewState) {
  const container = document.getElementById('screen-tools');
  if (!container) return;

  container.innerHTML = `
    <div class="screen-page-container">
      <header class="screen-header">
        <div>
          <h2>Market Analysis & Educational Tools</h2>
          <p class="screen-subtitle">Compare companies side-by-side, track personal watchlists, test hypothetical portfolios, and run shock simulations.</p>
        </div>
        <button id="tools-to-city-btn" class="primary" style="min-height:44px; display:inline-flex; align-items:center; gap:6px;">
          <span>🌐</span><span>View 3D City</span>
        </button>
      </header>

      <!-- SUB-NAVIGATION TABS -->
      <div class="tools-subtabs-bar" role="tablist">
        <button class="tools-tab-btn ${activeToolsTab === 'compare' ? 'active' : ''}" data-tool-tab="compare">⚖️ Compare (2–4)</button>
        <button class="tools-tab-btn ${activeToolsTab === 'watchlist' ? 'active' : ''}" data-tool-tab="watchlist">⭐ Watchlist (${viewState.watchlistIds.length})</button>
        <button class="tools-tab-btn ${activeToolsTab === 'portfolio' ? 'active' : ''}" data-tool-tab="portfolio">💼 Portfolio (${viewState.portfolio.length})</button>
        <button class="tools-tab-btn ${activeToolsTab === 'whatif' ? 'active' : ''}" data-tool-tab="whatif">⚡ What-If Sandbox</button>
        <button class="tools-tab-btn ${activeToolsTab === 'alerts' ? 'active' : ''}" data-tool-tab="alerts">🔔 Alerts (${viewState.alerts.length})</button>
      </div>

      <!-- TOOLS TAB CONTENT -->
      <div id="tools-content-area" class="screen-card" style="margin-bottom:16px;">
        <div id="tools-tab-mount"></div>
      </div>

      ${renderFooterHTML()}
    </div>
  `;

  // Mount active tool into #tools-tab-mount
  const mountEl = container.querySelector('#tools-tab-mount');
  if (mountEl) {
    mountSubTool(activeToolsTab, mountEl, viewState);
  }

  // Sub-tab switching
  container.querySelectorAll('[data-tool-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeToolsTab = btn.dataset.toolTab;
      renderToolsScreen(store.getViewState());
    });
  });

  container.querySelector('#tools-to-city-btn')?.addEventListener('click', () => {
    navigateTo('city');
    applyCameraPreset('ENTIRE');
  });

  wireFooterLinks(container);
}

/**
 * Mounts the selected sub-tool into the tools content area.
 */
function mountSubTool(toolKey, mountEl, viewState) {
  if (toolKey === 'compare') {
    const compCompanies = viewState.companies.filter(c => viewState.compareIds.includes(c.id));
    mountEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <div>
          <h3 style="font-size:var(--text-lg); margin:0;">Side-by-Side Company Comparison (${compCompanies.length} of 4)</h3>
          <p style="font-size:var(--text-sm); color:var(--text-secondary); margin:2px 0 0;">Compare valuation, market capitalization, and daily performance.</p>
        </div>
        <select id="tool-compare-add-select" style="min-height:44px;">
          <option value="">+ Add Company to Compare...</option>
          ${viewState.companies
            .filter(c => !viewState.compareIds.includes(c.id))
            .map(c => `<option value="${c.id}">${c.symbol} — ${c.companyName}</option>`)
            .join('')}
        </select>
      </div>

      ${compCompanies.length === 0 ? `
        <div class="edu-block warn">No companies selected for comparison. Add 2 to 4 companies above or from the directory.</div>
      ` : `
        <div class="compare-columns-grid">
          ${compCompanies.map(c => {
            const sec = SECTOR_MAP[c.sector];
            const isPos = c.changePercent >= 0;
            return `
              <div class="metric-box" style="position:relative;">
                <button data-remove-compare="${c.id}" style="position:absolute; top:8px; right:8px; padding:2px 6px; font-size:11px;" title="Remove">✕</button>
                <div style="font-weight:700; font-size:var(--text-md);">${c.symbol}</div>
                <div style="font-size:var(--text-sm); color:var(--text-secondary); margin-bottom:6px;">${c.companyName}</div>
                <span class="badge sim" style="background:${sec.color}22; color:${sec.color}; margin-bottom:10px;">${sec.name}</span>
                <div style="margin-top:6px;">
                  <div style="font-size:11px; color:var(--text-muted);">Share Price</div>
                  <div class="num" style="font-size:16px; font-weight:700;">${fmtPrice(c.price)}</div>
                  <span class="badge num ${isPos ? 'pos' : 'neg'}" style="font-size:11px;">${fmtPct(c.changePercent)}</span>
                </div>
                <div style="margin-top:10px;">
                  <div style="font-size:11px; color:var(--text-muted);">Market Capitalization</div>
                  <div class="num" style="font-weight:700;">${fmtMcapCr(c.marketCap)}</div>
                </div>
                <div style="margin-top:8px;">
                  <div style="font-size:11px; color:var(--text-muted);">Shares Outstanding</div>
                  <div class="num">${c.sharesOutstandingCr} Cr</div>
                </div>
                <div style="margin-top:8px;">
                  <div style="font-size:11px; color:var(--text-muted);">P/E Ratio</div>
                  <div class="num">${c.pe !== null ? c.pe.toFixed(1) : 'Unavailable'}</div>
                </div>
                <button data-jump-comp="${c.id}" class="primary" style="width:100%; min-height:40px; margin-top:12px; font-size:var(--text-sm);">
                  View Tower in 3D 🌐
                </button>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;

    mountEl.querySelector('#tool-compare-add-select')?.addEventListener('change', e => {
      const id = e.target.value;
      if (!id) return;
      if (viewState.compareIds.length >= 4) {
        showToast('Maximum 4 companies can be compared simultaneously.');
        return;
      }
      store.getLiveState().compareIds.push(id);
      store.emit('compare');
      renderToolsScreen(store.getViewState());
    });

    mountEl.querySelectorAll('[data-remove-compare]').forEach(btn => {
      btn.addEventListener('click', () => {
        const live = store.getLiveState();
        live.compareIds = live.compareIds.filter(x => x !== btn.dataset.removeCompare);
        store.emit('compare');
        renderToolsScreen(store.getViewState());
      });
    });

    mountEl.querySelectorAll('[data-jump-comp]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo('city');
        selectWorldObject('COMPANY', btn.dataset.jumpComp, true);
      });
    });
  } else if (toolKey === 'watchlist') {
    const watched = viewState.companies.filter(c => viewState.watchlistIds.includes(c.id));
    mountEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <h3 style="font-size:var(--text-lg); margin:0;">Personal Watchlist (${watched.length})</h3>
        <select id="tool-watchlist-add-select" style="min-height:44px;">
          <option value="">+ Add to Watchlist...</option>
          ${viewState.companies
            .filter(c => !viewState.watchlistIds.includes(c.id))
            .map(c => `<option value="${c.id}">${c.symbol} — ${c.companyName}</option>`)
            .join('')}
        </select>
      </div>

      ${watched.length === 0 ? `
        <div class="edu-block">Your watchlist is currently empty. Star any company in the directory or add one above!</div>
      ` : `
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company</th>
                <th>Sector</th>
                <th>Price (₹)</th>
                <th>Change (%)</th>
                <th>Market Cap</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${watched.map(c => `
                <tr>
                  <td style="font-weight:700;">${c.symbol}</td>
                  <td>${c.companyName}</td>
                  <td>${SECTOR_MAP[c.sector].name}</td>
                  <td class="num">${fmtPrice(c.price)}</td>
                  <td class="num ${c.changePercent >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(c.changePercent)}</td>
                  <td class="num">${fmtMcapCr(c.marketCap)}</td>
                  <td>
                    <button data-jump-comp="${c.id}" class="primary" style="padding:4px 8px; font-size:var(--text-sm); min-height:36px;">🌐 3D</button>
                    <button data-remove-watch="${c.id}" style="padding:4px 8px; font-size:var(--text-sm); min-height:36px;">✕ Remove</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    mountEl.querySelector('#tool-watchlist-add-select')?.addEventListener('change', e => {
      const id = e.target.value;
      if (!id) return;
      store.getLiveState().watchlistIds.push(id);
      store.emit('watchlist');
      renderToolsScreen(store.getViewState());
    });

    mountEl.querySelectorAll('[data-remove-watch]').forEach(btn => {
      btn.addEventListener('click', () => {
        const live = store.getLiveState();
        live.watchlistIds = live.watchlistIds.filter(x => x !== btn.dataset.removeWatch);
        store.emit('watchlist');
        renderToolsScreen(store.getViewState());
      });
    });

    mountEl.querySelectorAll('[data-jump-comp]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo('city');
        selectWorldObject('COMPANY', btn.dataset.jumpComp, true);
      });
    });
  } else if (toolKey === 'portfolio') {
    let totalInvested = 0;
    let totalCurrent = 0;
    const positions = viewState.portfolio.map(p => {
      const c = viewState.companies.find(x => x.id === p.companyId);
      const curPrice = c ? c.price : p.buyPrice;
      const inv = p.shares * p.buyPrice;
      const cur = p.shares * curPrice;
      totalInvested += inv;
      totalCurrent += cur;
      return { ...p, company: c, curPrice, invested: inv, currentVal: cur, pnl: cur - inv, pnlPct: ((cur - inv) / inv) * 100 };
    });
    const totalPnl = totalCurrent - totalInvested;
    const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

    mountEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <div>
          <h3 style="font-size:var(--text-lg); margin:0;">Hypothetical Portfolio Explorer</h3>
          <p style="font-size:var(--text-sm); color:var(--text-secondary); margin:2px 0 0;">Simulated holdings and portfolio diversification tracking.</p>
        </div>
        <div style="text-align:right;">
          <div class="num" style="font-size:18px; font-weight:700;">₹${totalCurrent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          <span class="badge num ${totalPnl >= 0 ? 'pos' : 'neg'}">${totalPnl >= 0 ? '+' : ''}₹${totalPnl.toFixed(0)} (${fmtPct(totalPnlPct)})</span>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Shares</th>
              <th>Avg Buy (₹)</th>
              <th>Current (₹)</th>
              <th>Current Value</th>
              <th>P&L (%)</th>
            </tr>
          </thead>
          <tbody>
            ${positions.map(pos => `
              <tr>
                <td style="font-weight:700;">${pos.company?.symbol || pos.companyId}</td>
                <td class="num">${pos.shares}</td>
                <td class="num">${fmtPrice(pos.buyPrice)}</td>
                <td class="num">${fmtPrice(pos.curPrice)}</td>
                <td class="num">₹${pos.currentVal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                <td class="num ${pos.pnl >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(pos.pnlPct)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (toolKey === 'whatif') {
    mountEl.innerHTML = `
      <h3 style="font-size:var(--text-lg); margin-top:0;">What-If Price & Share Shock Sandbox</h3>
      <p style="font-size:var(--text-sm); color:var(--text-secondary); margin-bottom:12px;">
        Simulate corporate actions or price shocks and inspect instant live mathematical recalculations across indices.
      </p>
      <div style="display:flex; gap:8px; margin-top:12px;">
        <button id="tool-open-whatif-sheet-btn" class="primary" style="min-height:44px;">Open What-If Sandbox Inspector →</button>
      </div>
    `;
    mountEl.querySelector('#tool-open-whatif-sheet-btn')?.addEventListener('click', () => {
      store.getLiveState().activeNavView = 'whatif';
      store.getLiveState().selectedObject = null;
      openPanel('right-panel');
    });
  } else if (toolKey === 'alerts') {
    mountEl.innerHTML = `
      <h3 style="font-size:var(--text-lg); margin-top:0;">Educational Market Movement Alerts (${viewState.alerts.length})</h3>
      <p style="font-size:var(--text-sm); color:var(--text-secondary); margin-bottom:12px;">
        Learn how price threshold alerts notify market participants of notable volatility.
      </p>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Alert Condition</th>
              <th>Threshold</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${viewState.alerts.map(a => `
              <tr>
                <td style="font-weight:600;">${a.metric} (${a.condition})</td>
                <td class="num">${a.threshold}</td>
                <td><span class="badge sim">${a.triggered ? 'TRIGGERED 🔔' : 'Watching'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

/**
 * Standard Footer HTML for screen pages.
 */
function renderFooterHTML() {
  return `
    <footer class="app-screen-footer">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <strong>MARKETVERSE</strong> — The Living 3D Stock Market City (Educational Simulation)
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
            Simulated Indian equity ecosystem. Building height = Market Cap. Not financial advice.
          </div>
        </div>
        <div class="footer-legal-links" style="display:flex; gap:12px; font-size:var(--text-sm);">
          <a href="javascript:void(0)" id="screen-credits-link" style="color:var(--accent);">📜 3D Asset Credits</a>
          <a href="javascript:void(0)" id="screen-privacy-link" style="color:var(--text-secondary);">Privacy Policy</a>
          <a href="javascript:void(0)" id="screen-terms-link" style="color:var(--text-secondary);">Terms of Service</a>
          <a href="javascript:void(0)" id="screen-disclaimer-link" style="color:var(--text-secondary);">Disclaimer</a>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Wires modal opening links in footers.
 */
function wireFooterLinks(container) {
  container.querySelector('#screen-credits-link')?.addEventListener('click', openCreditsModal);
  container.querySelector('#screen-privacy-link')?.addEventListener('click', openPrivacyModal);
  container.querySelector('#screen-terms-link')?.addEventListener('click', openTermsModal);
  container.querySelector('#screen-disclaimer-link')?.addEventListener('click', () => openConceptModal('disclaimer'));
}

/**
 * Initializes hash routing listener.
 */
export function initRouter() {
  window.addEventListener('hashchange', () => {
    const raw = window.location.hash.replace(/^#\/?/, '') || 'city';
    handleRouteChange(raw);
  });

  // Initial route
  const initial = window.location.hash.replace(/^#\/?/, '') || 'city';
  handleRouteChange(initial);
}
