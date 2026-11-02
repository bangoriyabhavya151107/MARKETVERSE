/**
 * Indices & Constituent Explorer Inspector (Mount + Keyed Tick Patch).
 */
import { fmtPct } from '../../utils/format.js';
import { patchText, patchTextAndClass } from '../../utils/dom.js';
import { selectWorldObject } from '../../controls/picking.js';

export function mountIndicesInspector(titleEl, bodyEl, viewState) {
  titleEl.textContent = 'Indices & Constituent Explorer';
  const niftyComps = [...viewState.companies.filter(c => c.inNifty)].sort((a, b) => b.marketCap - a.marketCap);

  bodyEl.innerHTML = `
    <div class="edu-block">
      <strong>Index Methodology Disclosure</strong>
      <p style="font-size:11.5px; margin-top:3px;">
        Official NIFTY 50 and SENSEX indices are maintained by NSE Indices Ltd and Asia Index Pvt Ltd using free-float market capitalization rules. In MarketVerse Simulation Mode, index movements are derived proportionally from the market-cap-weighted basket of constituent buildings in the city.
      </p>
    </div>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-label"><span>NIFTY 50 (Simulated)</span></div>
        <div class="metric-val num" data-bind="idx-nifty-lvl"></div>
        <div class="num" style="font-size:11px;" data-bind="idx-nifty-chg"></div>
      </div>
      <div class="metric-box">
        <div class="metric-label"><span>SENSEX (Simulated)</span></div>
        <div class="metric-val num" data-bind="idx-sensex-lvl"></div>
        <div class="num" style="font-size:11px;" data-bind="idx-sensex-chg"></div>
      </div>
    </div>

    <div class="section-card">
      <h4>Simulated NIFTY Basket Constituents (${niftyComps.length})</h4>
      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:6px;">
        Top Constituents by Basket Weight (Market Cap Share)
      </div>
      ${niftyComps
        .slice(0, 12)
        .map(
          c => `
        <div data-idx-comp="${c.id}" style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid var(--border-subtle); cursor:pointer; font-size:11.5px;">
          <span><strong>${c.symbol}</strong> <span style="color:var(--text-muted);" data-bind="idx-wt-${c.id}"></span></span>
          <span class="num" data-bind="idx-pct-${c.id}"></span>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  bodyEl.querySelectorAll('[data-idx-comp]').forEach(row => {
    row.addEventListener('click', () => selectWorldObject('COMPANY', row.dataset.idxComp, true));
  });

  updateIndicesInspector(bodyEl, viewState);
}

export function updateIndicesInspector(bodyEl, viewState) {
  const n = viewState.indices.NIFTY;
  const s = viewState.indices.SENSEX;
  const niftyComps = viewState.companies.filter(c => c.inNifty);
  const totalNiftyMcap = niftyComps.reduce((acc, x) => acc + x.marketCap, 0);

  patchText(bodyEl, 'idx-nifty-lvl', n.current.toLocaleString('en-IN', { minimumFractionDigits: 2 }));
  patchTextAndClass(
    bodyEl,
    'idx-nifty-chg',
    fmtPct(n.changePercent),
    `num ${n.changePercent >= 0 ? 'pos-text' : 'neg-text'}`
  );

  patchText(bodyEl, 'idx-sensex-lvl', s.current.toLocaleString('en-IN', { minimumFractionDigits: 2 }));
  patchTextAndClass(
    bodyEl,
    'idx-sensex-chg',
    fmtPct(s.changePercent),
    `num ${s.changePercent >= 0 ? 'pos-text' : 'neg-text'}`
  );

  niftyComps.forEach(c => {
    const wt = totalNiftyMcap > 0 ? ((c.marketCap / totalNiftyMcap) * 100).toFixed(2) : '0.00';
    patchText(bodyEl, `idx-wt-${c.id}`, `(${wt}% wt)`);
    patchTextAndClass(
      bodyEl,
      `idx-pct-${c.id}`,
      fmtPct(c.changePercent),
      `num ${c.changePercent >= 0 ? 'pos-text' : 'neg-text'}`
    );
  });
}