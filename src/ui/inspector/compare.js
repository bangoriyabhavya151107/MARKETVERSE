/**
 * Company Comparison Tool (2–4 Companies).
 * Mounts `<select id="compare-add-select">` once; on simulation ticks only updates
 * keyed `data-bind` cells and bar widths so the dropdown is NEVER reset while browsing.
 */
import { store } from '../../state/store.js';
import { getCapTier } from '../../engine/finance.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../../utils/format.js';
import { patchText, patchTextAndClass, patchStyle } from '../../utils/dom.js';
import { selectWorldObject } from '../../controls/picking.js';
import { update3DCityFromState } from '../../world/buildings.js';

export function mountCompareInspector(titleEl, bodyEl, viewState) {
  titleEl.textContent = 'Company Comparison (2–4)';
  const selectedComps = viewState.compareIds.map(id => viewState.companies.find(c => c.id === id)).filter(Boolean);

  // Preserve current select value if re-mounting after adding/removing a chip
  const existingSelect = bodyEl.querySelector('#compare-add-select');
  const preservedSelectVal = existingSelect ? existingSelect.value : viewState.companies[0]?.id;

  bodyEl.innerHTML = `
    <div class="section-card">
      <h4>Select 2 to 4 Companies to Compare</h4>
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <select id="compare-add-select" style="flex:1;">
          ${viewState.companies
            .map(
              c =>
                `<option value="${c.id}" ${c.id === preservedSelectVal ? 'selected' : ''}>${c.symbol} — ${c.companyName}</option>`
            )
            .join('')}
        </select>
        <button class="primary" id="compare-add-btn">+ Add</button>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:5px;">
        ${selectedComps
          .map(
            c => `
          <span class="badge" style="background:var(--bg-input); border:1px solid var(--accent);">
            ${c.symbol}
            <button data-remove-comp="${c.id}" style="border:none; background:transparent; padding:0 3px; color:var(--neg);">✕</button>
          </span>
        `
          )
          .join('')}
      </div>
    </div>

    ${
      selectedComps.length < 2
        ? `<div class="edu-block warn">Please select at least 2 companies (up to 4) to view side-by-side comparison.</div>`
        : `
      <div class="section-card" style="overflow-x:auto;">
        <h4>Side-by-Side Metrics (INR ₹)</h4>
        <table class="data-table" style="font-size:11.5px;">
          <thead>
            <tr>
              <th>Metric</th>
              ${selectedComps.map(c => `<th data-focus-comp="${c.id}">${c.symbol}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              ${selectedComps.map(c => `<td class="num" data-bind="cmp-price-${c.id}"></td>`).join('')}
            </tr>
            <tr>
              <td>Change (%)</td>
              ${selectedComps.map(c => `<td class="num" data-bind="cmp-chg-${c.id}"></td>`).join('')}
            </tr>
            <tr>
              <td>Market Cap</td>
              ${selectedComps.map(c => `<td class="num" data-bind="cmp-mcap-${c.id}"></td>`).join('')}
            </tr>
            <tr>
              <td>Cap Tier</td>
              ${selectedComps.map(c => `<td data-bind="cmp-tier-${c.id}"></td>`).join('')}
            </tr>
            <tr>
              <td>Volume</td>
              ${selectedComps.map(c => `<td class="num" data-bind="cmp-vol-${c.id}"></td>`).join('')}
            </tr>
            <tr>
              <td>P/E (TTM)</td>
              ${selectedComps.map(c => `<td class="num" data-bind="cmp-pe-${c.id}"></td>`).join('')}
            </tr>
            <tr>
              <td>Div Yield</td>
              ${selectedComps.map(c => `<td class="num">${c.divYield !== null ? c.divYield.toFixed(2) + '%' : 'Unavailable'}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-card">
        <h4>Normalized Session Performance (% vs Prev Close)</h4>
        ${selectedComps
          .map(
            c => `
          <div style="margin-bottom:6px;">
            <div style="display:flex; justify-content:space-between; font-size:11.5px;">
              <span>${c.symbol}</span>
              <span class="num" data-bind="cmp-bar-lbl-${c.id}"></span>
            </div>
            <div style="height:7px; background:var(--bg-input); border-radius:4px; overflow:hidden; margin-top:2px;">
              <div data-bind="cmp-bar-fill-${c.id}" style="width:0%; height:100%;"></div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `
    }
  `;

  bodyEl.querySelector('#compare-add-btn').addEventListener('click', () => {
    const sel = bodyEl.querySelector('#compare-add-select');
    const live = store.getLiveState();
    if (sel && !live.compareIds.includes(sel.value)) {
      if (live.compareIds.length >= 4) live.compareIds.shift();
      live.compareIds.push(sel.value);
      update3DCityFromState(store.getViewState());
      store.emit('compare');
    }
  });

  bodyEl.querySelectorAll('[data-remove-comp]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.dataset.removeComp;
      const live = store.getLiveState();
      const idx = live.compareIds.indexOf(cid);
      if (idx >= 0) {
        live.compareIds.splice(idx, 1);
        update3DCityFromState(store.getViewState());
        store.emit('compare');
      }
    });
  });

  bodyEl.querySelectorAll('[data-focus-comp]').forEach(th => {
    th.addEventListener('click', () => selectWorldObject('COMPANY', th.dataset.focusComp, true));
  });

  updateCompareInspector(bodyEl, viewState);
}

export function updateCompareInspector(bodyEl, viewState) {
  const selectedComps = viewState.compareIds.map(id => viewState.companies.find(c => c.id === id)).filter(Boolean);
  if (selectedComps.length < 2) return;

  selectedComps.forEach(c => {
    patchText(bodyEl, `cmp-price-${c.id}`, fmtPrice(c.price));
    patchTextAndClass(
      bodyEl,
      `cmp-chg-${c.id}`,
      fmtPct(c.changePercent),
      `num ${c.changePercent >= 0 ? 'pos-text' : 'neg-text'}`
    );
    patchText(bodyEl, `cmp-mcap-${c.id}`, fmtMcapCr(c.marketCap));
    patchText(bodyEl, `cmp-tier-${c.id}`, getCapTier(c.marketCap, viewState.mcapThresholds));
    patchText(bodyEl, `cmp-vol-${c.id}`, `${(c.volume / 100000).toFixed(2)} L`);
    patchText(bodyEl, `cmp-pe-${c.id}`, c.pe !== null ? c.pe.toFixed(1) + '×' : 'Unavailable');

    patchTextAndClass(
      bodyEl,
      `cmp-bar-lbl-${c.id}`,
      fmtPct(c.changePercent),
      `num ${c.changePercent >= 0 ? 'pos-text' : 'neg-text'}`
    );
    const w = Math.min(100, Math.abs(c.changePercent) * 18);
    patchStyle(bodyEl, `cmp-bar-fill-${c.id}`, 'width', `${w}%`);
    patchStyle(bodyEl, `cmp-bar-fill-${c.id}`, 'background', c.changePercent >= 0 ? 'var(--pos)' : 'var(--neg)');
  });
}