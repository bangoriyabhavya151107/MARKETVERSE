/**
 * Right Inspector Panel Router & Overview Mode.
 * Separates structural mounting (`mountInspectorPanel`) from tick-level keyed updates
 * (`updateInspectorPanelOnTick`) so user inputs and dropdowns never reset on ticks.
 */
import { store } from '../../state/store.js';
import { fmtPrice, fmtPct } from '../../utils/format.js';
import { patchText, patchStyle } from '../../utils/dom.js';
import { selectWorldObject } from '../../controls/picking.js';
import { openConceptModal } from '../modal.js';
import { recalculateAllFinancials } from '../../engine/finance.js';
import { update3DCityFromState } from '../../world/buildings.js';

import { mountCompanyInspector, updateCompanyInspector } from './company.js';
import { mountSectorInspector, updateSectorInspector } from './sector.js';
import { mountExchangeInspector } from './exchange.js';
import { mountInfraInspector } from './infra.js';
import { mountLandmarkInspector } from './landmark.js';
import { mountCompareInspector, updateCompareInspector } from './compare.js';
import { mountWatchlistInspector, updateWatchlistInspector } from './watchlist.js';
import { mountPortfolioInspector, updatePortfolioInspector } from './portfolio.js';
import { mountWhatIfInspector, updateWhatIfInspector } from './whatif.js';
import { mountLearnInspector } from './learn.js';
import { mountIndicesInspector, updateIndicesInspector } from './indices.js';

function mountOverviewInspector(titleEl, bodyEl, viewState) {
  const count = viewState.totals.listedCount || viewState.companies.length;
  titleEl.textContent = 'MarketVerse City Overview';

  bodyEl.innerHTML = `
    <div class="edu-block">
      <strong>Welcome to MarketVerse</strong>
      <p style="font-size:12px; margin-top:4px;">
        Click any <strong>Company Building</strong>, <strong>Sector District</strong>, <strong>Exchange Tower</strong>, or <strong>Learning Landmark</strong> in the 3D city to inspect live simulated metrics and interactive explanations.
      </p>
    </div>

    <div class="section-card">
      <h4>
        <span>Market Breadth (${count}-Company City Dataset)</span>
        <button class="help-icon" id="overview-breadth-help">?</button>
      </h4>
      <div style="display:flex; height:10px; border-radius:5px; overflow:hidden; margin:8px 0;">
        <div data-bind="ov-bar-adv" style="width:0%; background:var(--pos);"></div>
        <div data-bind="ov-bar-unch" style="width:0%; background:var(--neu);"></div>
        <div data-bind="ov-bar-dec" style="width:0%; background:var(--neg);"></div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11.5px;">
        <span class="pos-text">▲ Advancing: <strong data-bind="ov-adv-cnt"></strong></span>
        <span class="neu-text">• Unch: <strong data-bind="ov-unch-cnt"></strong></span>
        <span class="neg-text">▼ Declining: <strong data-bind="ov-dec-cnt"></strong></span>
      </div>
      <div style="font-size:10.5px; color:var(--text-muted); margin-top:4px;">
        Universe disclosure: Calculated strictly across the ${count} listed companies in MarketVerse, not the entire NSE/BSE universe.
      </div>
    </div>

    <div class="section-card">
      <h4>Top Simulated Movers Today</h4>
      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">Strongest Gainers</div>
      <div id="ov-top-gainers"></div>
      <div style="font-size:11px; color:var(--text-secondary); margin:8px 0 4px;">Largest Decliners</div>
      <div id="ov-top-losers"></div>
    </div>
  `;

  bodyEl.querySelector('#overview-breadth-help').addEventListener('click', () => openConceptModal('bullBear'));
  updateOverviewInspector(bodyEl, viewState);
}

function updateOverviewInspector(bodyEl, viewState) {
  const count = Math.max(1, viewState.totals.listedCount || viewState.companies.length);
  patchStyle(bodyEl, 'ov-bar-adv', 'width', `${(viewState.totals.advancing / count) * 100}%`);
  patchStyle(bodyEl, 'ov-bar-unch', 'width', `${(viewState.totals.unchanged / count) * 100}%`);
  patchStyle(bodyEl, 'ov-bar-dec', 'width', `${(viewState.totals.declining / count) * 100}%`);

  patchText(bodyEl, 'ov-adv-cnt', viewState.totals.advancing);
  patchText(bodyEl, 'ov-unch-cnt', viewState.totals.unchanged);
  patchText(bodyEl, 'ov-dec-cnt', viewState.totals.declining);

  const sortedByGain = [...viewState.companies].sort((a, b) => b.changePercent - a.changePercent);
  const topGainers = sortedByGain.slice(0, 3);
  const topLosers = sortedByGain.slice(-3).reverse();

  const gainContainer = bodyEl.querySelector('#ov-top-gainers');
  if (gainContainer) {
    gainContainer.innerHTML = topGainers
      .map(
        c => `
      <div data-mover-id="${c.id}" style="display:flex; justify-content:space-between; padding:4px 0; cursor:pointer; border-bottom:1px solid var(--border-subtle);">
        <span style="font-weight:600;">${c.symbol}</span>
        <span class="num">${fmtPrice(c.price)} <span class="pos-text">(${fmtPct(c.changePercent)})</span></span>
      </div>
    `
      )
      .join('');
    gainContainer.querySelectorAll('[data-mover-id]').forEach(el => {
      el.addEventListener('click', () => selectWorldObject('COMPANY', el.dataset.moverId, true));
    });
  }

  const loseContainer = bodyEl.querySelector('#ov-top-losers');
  if (loseContainer) {
    loseContainer.innerHTML = topLosers
      .map(
        c => `
      <div data-mover-id="${c.id}" style="display:flex; justify-content:space-between; padding:4px 0; cursor:pointer; border-bottom:1px solid var(--border-subtle);">
        <span style="font-weight:600;">${c.symbol}</span>
        <span class="num">${fmtPrice(c.price)} <span class="neg-text">(${fmtPct(c.changePercent)})</span></span>
      </div>
    `
      )
      .join('');
    loseContainer.querySelectorAll('[data-mover-id]').forEach(el => {
      el.addEventListener('click', () => selectWorldObject('COMPANY', el.dataset.moverId, true));
    });
  }
}

export function mountInspectorPanel(viewState = store.getViewState()) {
  const titleEl = document.getElementById('inspector-title');
  const bodyEl = document.getElementById('inspector-body');
  if (!titleEl || !bodyEl) return;

  if (viewState.dataMode === 'REAL_DATA') {
    titleEl.textContent = 'Real-Data Adapter Status';
    bodyEl.innerHTML = `
      <div class="edu-block warn">
        <strong>Real-Data Provider Not Configured</strong>
        <p style="margin-top:6px;">MarketVerse separates its 3D city visualization from its market-data adapter. Currently, no licensed NSE/BSE real-time or delayed API endpoint is configured.</p>
      </div>
      <div class="section-card">
        <h4>Why No Live Quote Is Fabricated</h4>
        <p style="color:var(--text-secondary); font-size:12px;">
          In accordance with strict financial integrity rules:
          <br>• MarketVerse never invents fake "live" quotes in Real-Data mode.
          <br>• Secret API keys must never be embedded in client-side static HTML/JS; a secure backend proxy is required for authenticated exchange feeds.
        </p>
        <button class="primary" id="return-sim-mode-btn" style="width:100%; margin-top:10px;">Return to Seeded Simulation Mode</button>
      </div>
    `;
    bodyEl.querySelector('#return-sim-mode-btn').addEventListener('click', () => {
      const live = store.getLiveState();
      live.dataMode = 'SIMULATION';
      const sel = document.getElementById('data-mode-select');
      if (sel) sel.value = 'SIMULATION';
      recalculateAllFinancials(live);
      update3DCityFromState(store.getViewState());
      store.emit('settings');
      store.emit('tick');
    });
    return;
  }

  if (viewState.selectedObject) {
    const { type, id } = viewState.selectedObject;
    if (type === 'COMPANY') return mountCompanyInspector(id, titleEl, bodyEl, viewState);
    if (type === 'SECTOR') return mountSectorInspector(id, titleEl, bodyEl, viewState);
    if (type === 'EXCHANGE') return mountExchangeInspector(titleEl, bodyEl);
    if (type === 'INFRA') return mountInfraInspector(id, titleEl, bodyEl);
    if (type === 'LEARN') return mountLandmarkInspector(id, titleEl, bodyEl);
  }

  switch (viewState.activeNavView) {
    case 'compare':
      return mountCompareInspector(titleEl, bodyEl, viewState);
    case 'watchlist':
      return mountWatchlistInspector(titleEl, bodyEl, viewState);
    case 'portfolio':
      return mountPortfolioInspector(titleEl, bodyEl, viewState);
    case 'whatif':
      return mountWhatIfInspector(titleEl, bodyEl, viewState);
    case 'learn':
      return mountLearnInspector(titleEl, bodyEl);
    case 'indices':
      return mountIndicesInspector(titleEl, bodyEl, viewState);
    default:
      return mountOverviewInspector(titleEl, bodyEl, viewState);
  }
}

export function updateInspectorPanelOnTick(viewState = store.getViewState()) {
  if (viewState.dataMode === 'REAL_DATA') return;
  const bodyEl = document.getElementById('inspector-body');
  if (!bodyEl) return;

  if (viewState.selectedObject) {
    const { type, id } = viewState.selectedObject;
    if (type === 'COMPANY') return updateCompanyInspector(id, bodyEl, viewState);
    if (type === 'SECTOR') return updateSectorInspector(id, bodyEl, viewState);
    return;
  }

  switch (viewState.activeNavView) {
    case 'compare':
      return updateCompareInspector(bodyEl, viewState);
    case 'watchlist':
      return updateWatchlistInspector(bodyEl, viewState);
    case 'portfolio':
      return updatePortfolioInspector(bodyEl, viewState);
    case 'whatif':
      return updateWhatIfInspector(bodyEl, viewState);
    case 'indices':
      return updateIndicesInspector(bodyEl, viewState);
    case 'learn':
      return;
    default:
      return updateOverviewInspector(bodyEl, viewState);
  }
}