/**
 * Bottom Panel: Companies Table, Sectors Table, Indices Table, Economic Events Table,
 * and Interactive Multi-Horizon Chart.
 * Includes full keyboard navigation (ArrowUp/ArrowDown/Enter) and empty/unavailable states.
 */
import { store } from '../state/store.js';
import { SECTORS, SECTOR_MAP } from '../data/sectors.js';
import { ECONOMIC_EVENTS } from '../data/events.js';
import { getSectorStats } from '../engine/finance.js';
import { applyEconomicEvent, endActiveEvent, resetFullSimulation } from '../engine/simulation.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../utils/format.js';
import { selectWorldObject } from '../controls/picking.js';
import { update3DCityFromState } from '../world/buildings.js';
import { mountHistoricalChart, updateHistoricalChart } from './charts.js';
import { renderEventsPopoverList } from './topbar.js';
import { switchLeftNavView } from './leftNav.js';
import { showToast } from './toasts.js';

export function syncBottomTabButtons() {
  const activeTab = store.getViewState().activeBottomTab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.btab === activeTab));
}

function wireTableKeyboardNavigation(container) {
  const rows = Array.from(container.querySelectorAll('tbody tr[tabindex="0"]'));
  rows.forEach((tr, idx) => {
    tr.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tr.click();
      } else if (e.key === 'ArrowDown' && idx < rows.length - 1) {
        e.preventDefault();
        rows[idx + 1].focus();
      } else if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault();
        rows[idx - 1].focus();
      }
    });
  });
}

export function mountBottomPanel(viewState = store.getViewState()) {
  const container = document.getElementById('bottom-content');
  if (!container) return;

  if (viewState.dataMode === 'REAL_DATA') {
    container.innerHTML = `<div class="edu-block warn">Real-Data Adapter Mode is selected without a configured NSE/BSE provider endpoint. Switch back to <strong>Sim Mode</strong> in the top bar to view live simulated tables and charts.</div>`;
    return;
  }

  const q = viewState.tableFilter.trim().toLowerCase();

  if (viewState.activeBottomTab === 'companies') {
    const rows = viewState.companies.filter(c => {
      if (viewState.exchangeFilter !== 'ALL' && c.exchange !== viewState.exchangeFilter) return false;
      if (!q) return true;
      return (
        c.symbol.toLowerCase().includes(q) ||
        c.companyName.toLowerCase().includes(q) ||
        SECTOR_MAP[c.sector].name.toLowerCase().includes(q)
      );
    });

    if (rows.length === 0) {
      container.innerHTML = `<div class="edu-block warn">No companies match filter "${viewState.tableFilter}". Clear the filter box above to see all listed companies.</div>`;
      return;
    }

    const { col, asc } = viewState.tableSort;
    rows.sort((a, b) => {
      const va = a[col];
      const vb = b[col];
      if (va === null) return 1;
      if (vb === null) return -1;
      if (typeof va === 'string') return asc ? va.localeCompare(vb) : vb.localeCompare(va);
      return asc ? va - vb : vb - va;
    });

    container.innerHTML = `
      <table class="data-table" aria-label="Listed Companies Table">
        <thead>
          <tr>
            <th data-sort-col="symbol" tabindex="0">Ticker</th>
            <th data-sort-col="companyName" tabindex="0">Company Name</th>
            <th data-sort-col="sector" tabindex="0">Sector</th>
            <th data-sort-col="exchange" tabindex="0">Exch</th>
            <th data-sort-col="price" tabindex="0">Price (₹)</th>
            <th data-sort-col="changePercent" tabindex="0">Change (%)</th>
            <th data-sort-col="marketCap" tabindex="0">Market Cap</th>
            <th data-sort-col="volume" tabindex="0">Volume</th>
            ${!viewState.beginnerMode ? `<th data-sort-col="pe" tabindex="0">P/E</th><th data-sort-col="divYield" tabindex="0">Div Yield</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(c => {
              const isSel =
                viewState.selectedObject && viewState.selectedObject.type === 'COMPANY' && viewState.selectedObject.id === c.id;
              const sec = SECTOR_MAP[c.sector];
              return `
                <tr tabindex="0" class="${isSel ? 'selected-row' : ''}" data-comp-row="${c.id}">
                  <td style="font-weight:700;">${c.symbol}</td>
                  <td>${c.companyName}</td>
                  <td><span style="color:${sec.color}; font-weight:600;">${sec.short}</span></td>
                  <td>${c.exchange}</td>
                  <td class="num">${fmtPrice(c.price)}</td>
                  <td class="num ${c.changePercent >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(c.changePercent)}</td>
                  <td class="num">${fmtMcapCr(c.marketCap)}</td>
                  <td class="num">${c.volume.toLocaleString('en-IN')}</td>
                  ${
                    !viewState.beginnerMode
                      ? `
                    <td class="num">${c.pe !== null ? c.pe.toFixed(1) + '×' : 'Unavailable'}</td>
                    <td class="num">${c.divYield !== null ? c.divYield.toFixed(2) + '%' : 'Unavailable'}</td>
                  `
                      : ''
                  }
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;

    container.querySelectorAll('[data-sort-col]').forEach(th => {
      const sortFn = () => {
        const colName = th.dataset.sortCol;
        const live = store.getLiveState();
        if (live.tableSort.col === colName) {
          live.tableSort.asc = !live.tableSort.asc;
        } else {
          live.tableSort.col = colName;
          live.tableSort.asc = colName === 'symbol' || colName === 'companyName';
        }
        mountBottomPanel(store.getViewState());
      };
      th.addEventListener('click', sortFn);
      th.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sortFn();
        }
      });
    });

    container.querySelectorAll('[data-comp-row]').forEach(tr => {
      tr.addEventListener('click', () => selectWorldObject('COMPANY', tr.dataset.compRow, true));
    });
    wireTableKeyboardNavigation(container);
  } else if (viewState.activeBottomTab === 'sectors') {
    container.innerHTML = `
      <table class="data-table" aria-label="Sector Districts Table">
        <thead>
          <tr>
            <th>Sector District</th>
            <th>Companies</th>
            <th>Sector Market Cap</th>
            <th>Dataset Weight</th>
            <th>Cap-Weighted Change</th>
            <th>Equal-Weighted Change</th>
            <th>Top Performer</th>
          </tr>
        </thead>
        <tbody>
          ${SECTORS.map(s => {
            const st = getSectorStats(s.id, viewState);
            const wt = viewState.totals.mcapCr > 0 ? ((st.totalMcap / viewState.totals.mcapCr) * 100).toFixed(2) : '0.00';
            return `
              <tr tabindex="0" data-sec-row="${s.id}">
                <td style="font-weight:700; color:${s.color};">■ ${s.name}</td>
                <td class="num">${st.companies.length}</td>
                <td class="num">${fmtMcapCr(st.totalMcap)}</td>
                <td class="num">${wt}%</td>
                <td class="num ${st.capWeightedChangePct >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(st.capWeightedChangePct)}</td>
                <td class="num ${st.equalWeightedChangePct >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(st.equalWeightedChangePct)}</td>
                <td>${st.strongest ? `${st.strongest.symbol} (${fmtPct(st.strongest.changePercent)})` : '—'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    container.querySelectorAll('[data-sec-row]').forEach(tr => {
      tr.addEventListener('click', () => selectWorldObject('SECTOR', tr.dataset.secRow, true));
    });
    wireTableKeyboardNavigation(container);
  } else if (viewState.activeBottomTab === 'indices') {
    const n = viewState.indices.NIFTY;
    const s = viewState.indices.SENSEX;
    container.innerHTML = `
      <table class="data-table" aria-label="Market Indices Table">
        <thead>
          <tr>
            <th>Benchmark / Sector Index</th>
            <th>Methodology</th>
            <th>Current Level</th>
            <th>Base Reference</th>
            <th>Change (%)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr tabindex="0" class="idx-nav-row">
            <td style="font-weight:700;">NIFTY 50 (City Basket)</td>
            <td>Cap-Weighted (${n.constituentCount} City Constituents)</td>
            <td class="num">${n.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            <td class="num">${n.baseLevel.toLocaleString('en-IN')}</td>
            <td class="num ${n.changePercent >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(n.changePercent)}</td>
            <td><span class="badge sim">SIMULATED</span></td>
          </tr>
          <tr tabindex="0" class="idx-nav-row">
            <td style="font-weight:700;">SENSEX (City Basket)</td>
            <td>Cap-Weighted (${s.constituentCount} City Constituents)</td>
            <td class="num">${s.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            <td class="num">${s.baseLevel.toLocaleString('en-IN')}</td>
            <td class="num ${s.changePercent >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(s.changePercent)}</td>
            <td><span class="badge sim">SIMULATED</span></td>
          </tr>
          ${SECTORS.slice(0, 6)
            .map(sec => {
              const st = getSectorStats(sec.id, viewState);
              const lvl = (10000 * (1 + st.capWeightedChangePct / 100)).toFixed(2);
              return `
                <tr tabindex="0" data-sec-row="${sec.id}">
                  <td style="font-weight:600; color:${sec.color};">MarketVerse ${sec.short} Index</td>
                  <td>Sector Cap-Weighted (${st.companies.length} Constituents)</td>
                  <td class="num">${Number(lvl).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td class="num">10,000.00</td>
                  <td class="num ${st.capWeightedChangePct >= 0 ? 'pos-text' : 'neg-text'}">${fmtPct(st.capWeightedChangePct)}</td>
                  <td><span class="badge sim">SIMULATED</span></td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;

    container.querySelectorAll('.idx-nav-row').forEach(tr => {
      tr.addEventListener('click', () => switchLeftNavView('indices'));
    });
    container.querySelectorAll('[data-sec-row]').forEach(tr => {
      tr.addEventListener('click', () => selectWorldObject('SECTOR', tr.dataset.secRow, true));
    });
    wireTableKeyboardNavigation(container);
  } else if (viewState.activeBottomTab === 'events') {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:8px; flex-wrap:wrap;">
        <div style="font-size:var(--text-sm); color:var(--text-secondary);">
          Active Scenario: <strong>${ECONOMIC_EVENTS[viewState.activeEventId]?.name || 'None'}</strong>
          ${viewState.eventRemainingTicks > 0 ? `<span class="badge sim" style="margin-left:6px;">Decay: ${viewState.eventRemainingTicks} ticks remaining</span>` : ''}
        </div>
        <div style="display:flex; gap:6px;">
          <button id="btab-end-event-btn">⏹ End Active Event (Keep Progress)</button>
          <button id="btab-reset-sim-btn">↺ Reset Full Simulation</button>
        </div>
      </div>
      <table class="data-table" aria-label="Hypothetical Economic Events Table">
        <thead>
          <tr>
            <th>Hypothetical Economic Event</th>
            <th>Plain-Language Description</th>
            <th>Primary Affected Sectors</th>
            <th>Explicit Model Assumptions & Decay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${Object.values(ECONOMIC_EVENTS)
            .map(
              ev => `
            <tr>
              <td style="font-weight:700;">${ev.name}</td>
              <td style="white-space:normal; max-width:260px;">${ev.description}</td>
              <td style="white-space:normal; max-width:200px;">${ev.sectorsAffected}</td>
              <td style="white-space:normal; max-width:250px; color:var(--text-secondary);">
                ${ev.assumptions}
                ${ev.durationTicks > 0 ? `<br><span style="color:var(--accent);">Fades over ${ev.durationTicks} ticks</span>` : ''}
              </td>
              <td>
                <button data-trigger-ev="${ev.id}" class="${viewState.activeEventId === ev.id ? 'active' : 'primary'}">
                  ${ev.id === 'NONE' ? '⏹ End Event' : '⚡ Simulate Event'}
                </button>
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;

    container.querySelector('#btab-end-event-btn')?.addEventListener('click', () => {
      endActiveEvent();
      update3DCityFromState(store.getViewState());
      renderEventsPopoverList(store.getViewState());
      showToast('Active event ended without resetting simulation.');
    });

    container.querySelector('#btab-reset-sim-btn')?.addEventListener('click', () => {
      resetFullSimulation();
      update3DCityFromState(store.getViewState());
      renderEventsPopoverList(store.getViewState());
      showToast('Simulation reset to initial seed state.');
    });

    container.querySelectorAll('[data-trigger-ev]').forEach(btn => {
      btn.addEventListener('click', () => {
        const evId = btn.dataset.triggerEv;
        if (evId === 'NONE') {
          endActiveEvent();
          showToast('Active event ended.');
        } else {
          applyEconomicEvent(evId);
          showToast(`⚡ Event triggered: ${ECONOMIC_EVENTS[evId].name}`);
        }
        update3DCityFromState(store.getViewState());
        renderEventsPopoverList(store.getViewState());
      });
    });
  } else if (viewState.activeBottomTab === 'history') {
    mountHistoricalChart(container, viewState);
  }
}

export function updateBottomPanelOnTick(viewState = store.getViewState()) {
  const container = document.getElementById('bottom-content');
  if (!container) return;

  if (viewState.activeBottomTab === 'history') {
    updateHistoricalChart(container, viewState);
  } else {
    mountBottomPanel(viewState);
  }
}

export function initBottomPanelEvents() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.getLiveState().activeBottomTab = btn.dataset.btab;
      syncBottomTabButtons();
      document.body.classList.remove('bottom-collapsed');
      store.emit('bottomTab');
    });
  });

  document.getElementById('table-filter-input')?.addEventListener('input', e => {
    store.getLiveState().tableFilter = e.target.value;
    store.emit('filter');
  });

  document.getElementById('toggle-bottom-btn')?.addEventListener('click', () => {
    document.body.classList.toggle('bottom-collapsed');
  });
}