/**
 * Company Detail Inspector with 3 Simple Tabs (Snapshot, Chart, Learn)
 * and an accessible Advanced Valuation & Cap-Threshold section.
 * Keyed updates ensure simulation ticks never reset active tabs or inputs.
 */
import { store } from '../../state/store.js';
import { SECTOR_MAP } from '../../data/sectors.js';
import { getCapTier } from '../../engine/finance.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../../utils/format.js';
import { patchText, patchTextAndClass } from '../../utils/dom.js';
import { selectWorldObject } from '../../controls/picking.js';
import { openConceptModal } from '../modal.js';
import { mountHistoricalChart, updateHistoricalChart } from '../charts.js';
import { update3DCityFromState } from '../../world/buildings.js';
import { switchLeftNavView } from '../leftNav.js';

export function mountCompanyInspector(companyId, titleEl, bodyEl, viewState) {
  const c = viewState.companies.find(x => x.id === companyId);
  if (!c) return;
  const sec = SECTOR_MAP[c.sector];
  const inWatchlist = viewState.watchlistIds.includes(c.id);
  const inCompare = viewState.compareIds.includes(c.id);
  const tier = getCapTier(c.marketCap, viewState.mcapThresholds);
  const activeTab = viewState.companyInspectorTab || 'snapshot';

  titleEl.textContent = `${c.symbol} (${c.exchange})`;

  bodyEl.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
      <div>
        <div style="font-size:var(--text-lg); font-weight:700;">${c.companyName}</div>
        <div style="font-size:var(--text-sm); color:var(--text-secondary); margin-top:2px;">
          Sector: <a href="javascript:void(0)" id="comp-sector-link" style="color:${sec.color}; font-weight:600;">${sec.name}</a>
        </div>
      </div>
      <span class="badge sim" data-bind="comp-status">${c.dataStatus}</span>
    </div>

    <div style="margin-top:8px; display:flex; align-items:baseline; justify-content:space-between; background:var(--bg-elevated); padding:10px; border-radius:var(--radius-md);">
      <div>
        <div class="num" style="font-size:20px; font-weight:800;" data-bind="comp-price">${fmtPrice(c.price)}</div>
        <div style="font-size:var(--text-sm); color:var(--text-muted);">Prev Close: <span class="num" data-bind="comp-prev">${fmtPrice(c.previousClose)}</span></div>
      </div>
      <div style="text-align:right;">
        <span data-bind="comp-change-badge" class="badge ${c.change >= 0 ? 'pos' : 'neg'} num" style="font-size:var(--text-md);">
          ${c.change >= 0 ? '+' : ''}${c.change.toFixed(2)} (${fmtPct(c.changePercent)})
        </span>
        <div style="font-size:var(--text-sm); color:var(--text-muted); margin-top:3px;">As of <span data-bind="comp-timestamp">${c.timestamp}</span></div>
      </div>
    </div>

    <div style="display:flex; gap:6px; margin-top:8px;">
      <button id="comp-fly-3d-btn" class="primary" style="flex:1;" title="Fly camera to building in 3D City">
        🌐 View in 3D City
      </button>
      <button id="comp-watchlist-btn" style="flex:1;" class="${inWatchlist ? 'active' : ''}">
        ${inWatchlist ? '★ Watched' : '☆ Watchlist'}
      </button>
      <button id="comp-compare-btn" style="flex:1;" class="${inCompare ? 'active' : ''}">
        ${inCompare ? '✓ Comparing' : '+ Compare'}
      </button>
      <button id="comp-whatif-btn" title="Simulate Price or Share Count Changes">⚡ What-If</button>
    </div>

    <!-- 3 Simple Tabs: Snapshot | Chart | Learn -->
    <div class="inspector-tabs" role="tablist">
      <button class="inspector-tab-btn ${activeTab === 'snapshot' ? 'active' : ''}" role="tab" data-insp-tab="snapshot">1. Snapshot</button>
      <button class="inspector-tab-btn ${activeTab === 'chart' ? 'active' : ''}" role="tab" data-insp-tab="chart">2. Chart</button>
      <button class="inspector-tab-btn ${activeTab === 'learn' ? 'active' : ''}" role="tab" data-insp-tab="learn">3. Learn</button>
    </div>

    <!-- TAB 1: SNAPSHOT + ADVANCED -->
    <div id="comp-tab-snapshot" style="display:${activeTab === 'snapshot' ? 'block' : 'none'};">
      <div class="metric-grid">
        <div class="metric-box">
          <div class="metric-label">
            <span data-bind="comp-tier-label">Market Cap (${tier})</span>
            <button class="help-icon" data-concept-btn="marketCap" aria-label="Understand Market Cap">?</button>
          </div>
          <div class="metric-val num" data-bind="comp-mcap">${fmtMcapCr(c.marketCap)}</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);" data-bind="comp-dataset-pct"></div>
        </div>

        <div class="metric-box">
          <div class="metric-label">
            <span>Trading Volume</span>
            <button class="help-icon" data-concept-btn="volume" aria-label="Understand Volume">?</button>
          </div>
          <div class="metric-val num" data-bind="comp-vol">${c.volume.toLocaleString('en-IN')}</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);" data-bind="comp-rel-vol"></div>
        </div>

        <div class="metric-box">
          <div class="metric-label">
            <span>Outstanding Shares</span>
            <button class="help-icon" data-concept-btn="priceVsSize" aria-label="Understand Share Count">?</button>
          </div>
          <div class="metric-val num" data-bind="comp-shares">${c.sharesOutstandingCr.toFixed(1)} Cr</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);">1 Cr = 10 Million</div>
        </div>

        <div class="metric-box">
          <div class="metric-label">
            <span>52-Week Range</span>
            <button class="help-icon" data-concept-btn="volatility" aria-label="Understand 52W Range">?</button>
          </div>
          <div class="metric-val num" style="font-size:var(--text-sm);">${fmtPrice(c.low52W)} – ${fmtPrice(c.high52W)}</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);">Simulated 52W Band</div>
        </div>
      </div>

      <div class="section-card">
        <h4>
          <span>Market-Cap Scale & Verification</span>
          <button class="help-icon" data-concept-btn="marketCap">?</button>
        </h4>
        <div data-bind="comp-formula" style="font-size:var(--text-sm); background:var(--bg-input); padding:7px; border-radius:4px; font-family:var(--font-mono);"></div>
        <p style="font-size:var(--text-sm); color:var(--text-secondary); margin-top:6px;">
          <strong>Scale vs. Quality Note:</strong> Building height represents equity market capitalization (<span data-bind="comp-tier-inline">${tier}</span>), not cash balance, annual revenue, or investment quality.
        </p>
      </div>

      <!-- Accessible Advanced Section (Expanded automatically in Advanced mode, collapsible in Beginner mode) -->
      <details class="section-card" ${!viewState.beginnerMode ? 'open' : ''}>
        <summary style="cursor:pointer; font-weight:700; font-size:var(--text-md); display:flex; justify-content:space-between; align-items:center;">
          <span>Advanced Valuation & Cap Thresholds</span>
          <span class="badge">${!viewState.beginnerMode ? 'Expanded' : 'Click to Expand'}</span>
        </summary>
        <div class="metric-grid" style="margin-top:8px;">
          <div class="metric-box">
            <div class="metric-label">
              <span>P/E Ratio (TTM)</span>
              <button class="help-icon" data-concept-btn="valuation">?</button>
            </div>
            <div class="metric-val num" data-bind="comp-pe">${c.pe !== null ? c.pe.toFixed(2) + '×' : 'Unavailable'}</div>
            ${c.pe === null ? `<div style="font-size:10px; color:var(--text-muted);">Not reported / negative earnings</div>` : ''}
          </div>
          <div class="metric-box">
            <div class="metric-label"><span>EPS (Trailing)</span></div>
            <div class="metric-val num">${c.eps !== null ? fmtPrice(c.eps) : 'Unavailable'}</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">
              <span>Dividend Yield</span>
              <button class="help-icon" data-concept-btn="dividends">?</button>
            </div>
            <div class="metric-val num">${c.divYield !== null ? c.divYield.toFixed(2) + '%' : 'Unavailable'}</div>
            ${c.divYield === null ? `<div style="font-size:10px; color:var(--text-muted);">No trailing dividend declared</div>` : ''}
          </div>
          <div class="metric-box">
            <div class="metric-label"><span>Index Basket</span></div>
            <div class="metric-val" style="font-size:var(--text-sm);">
              ${c.inNifty ? 'NIFTY 50 ' : ''}${c.inSensex ? '• SENSEX' : !c.inNifty ? 'Broad Market' : ''}
            </div>
          </div>
        </div>
        <div style="margin-top:8px; font-size:var(--text-sm); color:var(--text-secondary);">
          <strong>Configurable Cap Thresholds (₹ Cr):</strong>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:4px;">
            <label>Large-Cap ≥ <input type="number" id="thresh-large-input" value="${viewState.mcapThresholds.largeCr}" style="width:90px; padding:2px 4px;" /></label>
            <label>Mid-Cap ≥ <input type="number" id="thresh-mid-input" value="${viewState.mcapThresholds.midCr}" style="width:90px; padding:2px 4px;" /></label>
          </div>
        </div>
      </details>
    </div>

    <!-- TAB 2: INTERACTIVE CHART -->
    <div id="comp-tab-chart" style="display:${activeTab === 'chart' ? 'block' : 'none'};">
      <div class="section-card" id="comp-inspector-chart-box"></div>
    </div>

    <!-- TAB 3: CONTEXTUAL LEARN -->
    <div id="comp-tab-learn" style="display:${activeTab === 'learn' ? 'block' : 'none'};">
      <div class="edu-block">
        <strong>Understanding ${c.symbol}'s Tower in 3D</strong>
        <p style="font-size:var(--text-sm); margin-top:4px;">
          • <strong>Tower Height (${tier}):</strong> Derived from ${fmtPrice(c.price)} × ${c.sharesOutstandingCr.toFixed(1)} Cr shares = ${fmtMcapCr(c.marketCap)}.<br>
          • <strong>Roof Beacon:</strong> Shows daily percentage change vs. previous close (${fmtPrice(c.previousClose)}).<br>
          • <strong>Window Illumination:</strong> Lit window density reflects relative trading volume against average session activity.
        </p>
      </div>
      <div class="section-card">
        <h4>Key Concepts for This Company</h4>
        <div style="display:flex; flex-direction:column; gap:5px;">
          <button data-concept-btn="marketCap" style="text-align:left;">📘 Market Cap vs. Share Price</button>
          <button data-concept-btn="valuation" style="text-align:left;">📘 Valuation: P/E & EPS Explained</button>
          <button data-concept-btn="volume" style="text-align:left;">📘 Trading Volume vs. Liquidity</button>
          <button data-concept-btn="dividends" style="text-align:left;">📘 Dividends & Yield</button>
        </div>
      </div>
    </div>
  `;

  bodyEl.querySelectorAll('[data-insp-tab]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      store.getLiveState().companyInspectorTab = tabBtn.dataset.inspTab;
      mountCompanyInspector(companyId, titleEl, bodyEl, store.getViewState());
    });
  });

  if (activeTab === 'chart') {
    const chartBox = bodyEl.querySelector('#comp-inspector-chart-box');
    mountHistoricalChart(chartBox, viewState, c.id, true);
  }

  bodyEl.querySelector('#comp-fly-3d-btn')?.addEventListener('click', () => {
    window.location.hash = '#/city';
    selectWorldObject('COMPANY', c.id, true);
  });

  bodyEl.querySelector('#comp-sector-link').addEventListener('click', () => {
    selectWorldObject('SECTOR', c.sector, true);
  });

  bodyEl.querySelector('#comp-watchlist-btn').addEventListener('click', () => {
    const live = store.getLiveState();
    const idx = live.watchlistIds.indexOf(c.id);
    if (idx >= 0) live.watchlistIds.splice(idx, 1);
    else live.watchlistIds.push(c.id);
    store.savePersistedState();
    store.emit('watchlist');
  });

  bodyEl.querySelector('#comp-compare-btn').addEventListener('click', () => {
    const live = store.getLiveState();
    const idx = live.compareIds.indexOf(c.id);
    if (idx >= 0) live.compareIds.splice(idx, 1);
    else {
      if (live.compareIds.length >= 4) live.compareIds.shift();
      live.compareIds.push(c.id);
    }
    update3DCityFromState(store.getViewState());
    store.emit('compare');
  });

  bodyEl.querySelector('#comp-whatif-btn').addEventListener('click', () => {
    const live = store.getLiveState();
    live.selectedObject = null;
    live.whatIf.companyId = c.id;
    live.whatIf.customPrice = null;
    live.whatIf.customSharesCr = null;
    switchLeftNavView('whatif');
  });

  bodyEl.querySelectorAll('[data-concept-btn]').forEach(btn => {
    btn.addEventListener('click', () => openConceptModal(btn.dataset.conceptBtn));
  });

  const largeInput = bodyEl.querySelector('#thresh-large-input');
  const midInput = bodyEl.querySelector('#thresh-mid-input');
  if (largeInput) {
    largeInput.addEventListener('change', e => {
      const val = parseFloat(e.target.value);
      if (!Number.isNaN(val) && val > 0) {
        store.getLiveState().mcapThresholds.largeCr = val;
        update3DCityFromState(store.getViewState());
        updateCompanyInspector(companyId, bodyEl, store.getViewState());
      }
    });
  }
  if (midInput) {
    midInput.addEventListener('change', e => {
      const val = parseFloat(e.target.value);
      if (!Number.isNaN(val) && val > 0) {
        store.getLiveState().mcapThresholds.midCr = val;
        update3DCityFromState(store.getViewState());
        updateCompanyInspector(companyId, bodyEl, store.getViewState());
      }
    });
  }

  updateCompanyInspector(companyId, bodyEl, viewState);
}

export function updateCompanyInspector(companyId, bodyEl, viewState) {
  const c = viewState.companies.find(x => x.id === companyId);
  if (!c) return;

  const datasetPct = viewState.totals.mcapCr > 0 ? ((c.marketCap / viewState.totals.mcapCr) * 100).toFixed(2) : '0.00';
  const tier = getCapTier(c.marketCap, viewState.mcapThresholds);
  const relVol = (c.volume / c.avgDailyVolume).toFixed(2);

  patchText(bodyEl, 'comp-status', c.dataStatus);
  patchText(bodyEl, 'comp-price', fmtPrice(c.price));
  patchText(bodyEl, 'comp-prev', fmtPrice(c.previousClose));
  patchTextAndClass(
    bodyEl,
    'comp-change-badge',
    `${c.change >= 0 ? '+' : ''}${c.change.toFixed(2)} (${fmtPct(c.changePercent)})`,
    `badge ${c.change >= 0 ? 'pos' : 'neg'} num`
  );
  patchText(bodyEl, 'comp-timestamp', c.timestamp);
  patchText(bodyEl, 'comp-tier-label', `Market Cap (${tier})`);
  patchText(bodyEl, 'comp-tier-inline', tier);
  patchText(bodyEl, 'comp-mcap', fmtMcapCr(c.marketCap));
  patchText(bodyEl, 'comp-dataset-pct', `${datasetPct}% of City Dataset`);
  patchText(bodyEl, 'comp-vol', c.volume.toLocaleString('en-IN'));
  patchText(bodyEl, 'comp-rel-vol', `Rel Vol: ${relVol}× avg`);
  patchText(bodyEl, 'comp-shares', `${c.sharesOutstandingCr.toFixed(1)} Cr`);
  patchText(bodyEl, 'comp-pe', c.pe !== null ? c.pe.toFixed(2) + '×' : 'Unavailable');
  patchText(
    bodyEl,
    'comp-formula',
    `${fmtPrice(c.price)} × ${c.sharesOutstandingCr.toFixed(1)} Cr shares = ₹${c.marketCap.toLocaleString('en-IN')} Cr`
  );

  if (viewState.companyInspectorTab === 'chart') {
    const chartBox = bodyEl.querySelector('#comp-inspector-chart-box');
    if (chartBox) updateHistoricalChart(chartBox, viewState);
  }
}