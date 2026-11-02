/**
 * Sector District Detail Inspector (Mount + Keyed Tick Patch).
 */
import { getSectorStats, getCapTier } from '../../engine/finance.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../../utils/format.js';
import { patchText, patchTextAndClass } from '../../utils/dom.js';
import { selectWorldObject, clearSelection } from '../../controls/picking.js';
import { applyCameraPreset } from '../../controls/cameraRig.js';

export function mountSectorInspector(sectorId, titleEl, bodyEl, viewState) {
  const stats = getSectorStats(sectorId, viewState);
  const s = stats.sector;
  if (!s) return;

  titleEl.textContent = `${s.short} District`;

  bodyEl.innerHTML = `
    <div style="border-left:4px solid ${s.color}; padding-left:10px; margin-bottom:10px;">
      <div style="font-size:15px; font-weight:700;">${s.name}</div>
      <div style="font-size:11.5px; color:var(--text-secondary);">${stats.companies.length} Listed Companies in District</div>
    </div>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-label"><span>Sector Market Cap</span></div>
        <div class="metric-val num" data-bind="sec-mcap"></div>
        <div style="font-size:10.5px; color:var(--text-muted);" data-bind="sec-share"></div>
      </div>
      <div class="metric-box">
        <div class="metric-label"><span>Cap-Weighted Return</span></div>
        <div class="metric-val num" data-bind="sec-cap-ret"></div>
        <div style="font-size:10.5px; color:var(--text-muted);" data-bind="sec-eq-ret"></div>
      </div>
    </div>

    <div class="edu-block">
      <strong>How Sector Return Is Calculated:</strong>
      <p style="font-size:11.5px; margin-top:3px;" data-bind="sec-edu-text"></p>
    </div>

    <div class="section-card">
      <h4>Strongest & Weakest in Sector Today</h4>
      <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">
        <span>🏆 Top: <a href="javascript:void(0)" id="sec-strongest-link" style="color:var(--text-primary); font-weight:600;" data-bind="sec-strong-sym"></a></span>
        <span class="pos-text num" data-bind="sec-strong-pct"></span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0;">
        <span>📉 Lagging: <a href="javascript:void(0)" id="sec-weakest-link" style="color:var(--text-primary); font-weight:600;" data-bind="sec-weak-sym"></a></span>
        <span class="neg-text num" data-bind="sec-weak-pct"></span>
      </div>
    </div>

    <div class="section-card">
      <h4>Companies in ${s.short} District</h4>
      ${stats.companies
        .map(
          c => `
        <div class="sec-comp-row" data-comp-id="${c.id}" style="display:flex; justify-content:space-between; align-items:center; padding:6px 4px; border-bottom:1px solid var(--border-subtle); cursor:pointer;">
          <div>
            <div style="font-weight:600;">${c.symbol} <span style="font-size:10.5px; color:var(--text-muted);" data-bind="sec-c-tier-${c.id}"></span></div>
            <div style="font-size:11px; color:var(--text-secondary);" data-bind="sec-c-mcap-${c.id}"></div>
          </div>
          <div style="text-align:right;">
            <div class="num" style="font-weight:600;" data-bind="sec-c-price-${c.id}"></div>
            <span data-bind="sec-c-chg-${c.id}" class="badge pos num"></span>
          </div>
        </div>
      `
        )
        .join('')}
    </div>

    <button class="primary" id="sec-return-city-btn" style="width:100%;">🌐 Return to Full City View</button>
  `;

  bodyEl.querySelectorAll('.sec-comp-row').forEach(row => {
    row.addEventListener('click', () => selectWorldObject('COMPANY', row.dataset.compId, true));
  });

  bodyEl.querySelector('#sec-strongest-link').addEventListener('click', () => {
    const st = getSectorStats(sectorId);
    if (st.strongest) selectWorldObject('COMPANY', st.strongest.id, true);
  });

  bodyEl.querySelector('#sec-weakest-link').addEventListener('click', () => {
    const st = getSectorStats(sectorId);
    if (st.weakest) selectWorldObject('COMPANY', st.weakest.id, true);
  });

  bodyEl.querySelector('#sec-return-city-btn').addEventListener('click', () => {
    clearSelection();
    applyCameraPreset('ENTIRE');
  });

  updateSectorInspector(sectorId, bodyEl, viewState);
}

export function updateSectorInspector(sectorId, bodyEl, viewState) {
  const stats = getSectorStats(sectorId, viewState);
  const shareOfMarket = viewState.totals.mcapCr > 0 ? ((stats.totalMcap / viewState.totals.mcapCr) * 100).toFixed(2) : '0.00';

  patchText(bodyEl, 'sec-mcap', fmtMcapCr(stats.totalMcap));
  patchText(bodyEl, 'sec-share', `${shareOfMarket}% of City Dataset`);
  patchTextAndClass(
    bodyEl,
    'sec-cap-ret',
    fmtPct(stats.capWeightedChangePct),
    `metric-val num ${stats.capWeightedChangePct >= 0 ? 'pos-text' : 'neg-text'}`
  );
  patchText(bodyEl, 'sec-eq-ret', `Equal-Wt: ${fmtPct(stats.equalWeightedChangePct)}`);
  patchText(
    bodyEl,
    'sec-edu-text',
    `The primary figure (${fmtPct(stats.capWeightedChangePct)}) is Market-Cap Weighted: total current sector market cap divided by total previous-close sector market cap. An equal-weighted simple average of constituent percentages is ${fmtPct(stats.equalWeightedChangePct)}.`
  );

  if (stats.strongest) {
    patchText(bodyEl, 'sec-strong-sym', stats.strongest.symbol);
    patchText(bodyEl, 'sec-strong-pct', fmtPct(stats.strongest.changePercent));
  }
  if (stats.weakest) {
    patchText(bodyEl, 'sec-weak-sym', stats.weakest.symbol);
    patchText(bodyEl, 'sec-weak-pct', fmtPct(stats.weakest.changePercent));
  }

  stats.companies.forEach(c => {
    patchText(bodyEl, `sec-c-tier-${c.id}`, `(${getCapTier(c.marketCap, viewState.mcapThresholds)})`);
    patchText(bodyEl, `sec-c-mcap-${c.id}`, fmtMcapCr(c.marketCap));
    patchText(bodyEl, `sec-c-price-${c.id}`, fmtPrice(c.price));
    patchTextAndClass(
      bodyEl,
      `sec-c-chg-${c.id}`,
      fmtPct(c.changePercent),
      `badge ${c.changePercent >= 0 ? 'pos' : 'neg'} num`
    );
  });
}