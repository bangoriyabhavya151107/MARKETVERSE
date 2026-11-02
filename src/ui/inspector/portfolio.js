/**
 * Hypothetical Portfolio Explorer.
 * Mounts `#port-company-select` and `#port-qty-input` once.
 * On simulation ticks, updates only keyed `[data-bind]` values so typing a quantity
 * or selecting a company is NEVER reset by ticks.
 */
import { store } from '../../state/store.js';
import { SECTOR_MAP } from '../../data/sectors.js';
import { fmtPrice, fmtPct } from '../../utils/format.js';
import { patchText, patchTextAndClass, patchStyle } from '../../utils/dom.js';
import { selectWorldObject } from '../../controls/picking.js';
import { openConceptModal } from '../modal.js';

function computePortfolioMetrics(viewState) {
  let totalCost = 0;
  let totalValue = 0;
  const sectorTotals = {};

  const enriched = viewState.portfolio
    .map(item => {
      const comp = viewState.companies.find(c => c.id === item.id);
      if (!comp) return null;
      const cost = item.qty * item.avgCost;
      const val = item.qty * comp.price;
      const pnl = val - cost;
      const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
      totalCost += cost;
      totalValue += val;
      sectorTotals[comp.sector] = (sectorTotals[comp.sector] || 0) + val;
      return { ...item, comp, cost, val, pnl, pnlPct };
    })
    .filter(Boolean);

  const totalPnl = totalValue - totalCost;
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  let maxSectorShare = 0;
  let maxSectorName = 'None';
  Object.entries(sectorTotals).forEach(([secId, val]) => {
    const share = totalValue > 0 ? (val / totalValue) * 100 : 0;
    if (share > maxSectorShare) {
      maxSectorShare = share;
      maxSectorName = SECTOR_MAP[secId].short;
    }
  });

  return { totalCost, totalValue, totalPnl, totalPnlPct, sectorTotals, enriched, maxSectorShare, maxSectorName };
}

export function mountPortfolioInspector(titleEl, bodyEl, viewState) {
  titleEl.textContent = 'Hypothetical Portfolio Explorer';

  const existingSel = bodyEl.querySelector('#port-company-select');
  const existingQty = bodyEl.querySelector('#port-qty-input');
  const preservedCompId = existingSel ? existingSel.value : viewState.companies[0]?.id;
  const preservedQty = existingQty ? existingQty.value : '20';

  const { sectorTotals, enriched } = computePortfolioMetrics(viewState);

  bodyEl.innerHTML = `
    <div class="edu-block">
      <strong>Educational Sandbox Disclosure:</strong>
      <p style="font-size:11.5px; margin-top:2px;">
        This is a hypothetical learning portfolio, not a brokerage account. No real orders are executed.
      </p>
    </div>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-label"><span>Hypothetical Value</span></div>
        <div class="metric-val num" data-bind="port-total-val"></div>
        <div style="font-size:10.5px; color:var(--text-muted);" data-bind="port-total-cost"></div>
      </div>
      <div class="metric-box">
        <div class="metric-label"><span>Unrealized Gain/Loss</span></div>
        <div class="metric-val num" data-bind="port-total-pnl"></div>
        <div class="num" style="font-size:11px;" data-bind="port-total-pnl-pct"></div>
      </div>
    </div>

    <div class="section-card">
      <h4>Add / Update Hypothetical Position</h4>
      <div style="display:grid; grid-template-columns:1fr 75px; gap:6px; margin-bottom:6px;">
        <select id="port-company-select">
          ${viewState.companies
            .map(
              c =>
                `<option value="${c.id}" ${c.id === preservedCompId ? 'selected' : ''}>${c.symbol} (${fmtPrice(c.price)})</option>`
            )
            .join('')}
        </select>
        <input type="number" id="port-qty-input" value="${preservedQty}" min="1" placeholder="Qty" />
      </div>
      <button class="primary" id="port-add-btn" style="width:100%;">+ Add Position at Current Simulated Price</button>
    </div>

    <div class="section-card">
      <h4>
        <span>Sector Allocation & Concentration</span>
        <button class="help-icon" id="port-div-help-btn">?</button>
      </h4>
      <div data-bind="port-conc-warn" class="edu-block warn" style="padding:6px 8px; font-size:11px; display:none;"></div>
      ${Object.keys(sectorTotals)
        .map(secId => {
          const sec = SECTOR_MAP[secId];
          return `
            <div style="margin-bottom:5px;">
              <div style="display:flex; justify-content:space-between; font-size:11px;">
                <span>${sec.short}</span>
                <span class="num" data-bind="port-sec-lbl-${secId}"></span>
              </div>
              <div style="height:6px; background:var(--bg-input); border-radius:3px; overflow:hidden;">
                <div data-bind="port-sec-bar-${secId}" style="width:0%; height:100%; background:${sec.color};"></div>
              </div>
            </div>
          `;
        })
        .join('')}
    </div>

    <div class="section-card">
      <h4>Holdings (${enriched.length})</h4>
      ${enriched
        .map(
          item => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border-subtle); font-size:11.5px;">
          <div data-port-focus="${item.comp.id}" style="cursor:pointer;">
            <div style="font-weight:700;">${item.comp.symbol} × ${item.qty} sh</div>
            <div style="font-size:10.5px; color:var(--text-muted);">Avg Cost: ${fmtPrice(item.avgCost)}</div>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <div style="text-align:right;">
              <div class="num" style="font-weight:600;" data-bind="port-item-val-${item.comp.id}"></div>
              <div class="num" style="font-size:10.5px;" data-bind="port-item-pnl-${item.comp.id}"></div>
            </div>
            <button data-port-remove="${item.comp.id}" style="padding:2px 6px;">✕</button>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  bodyEl.querySelector('#port-add-btn').addEventListener('click', () => {
    const cid = bodyEl.querySelector('#port-company-select').value;
    const qty = Math.max(1, parseInt(bodyEl.querySelector('#port-qty-input').value, 10) || 10);
    const live = store.getLiveState();
    const comp = live.companies.find(c => c.id === cid);
    if (!comp) return;

    const existing = live.portfolio.find(p => p.id === cid);
    if (existing) {
      const totalCost = existing.qty * existing.avgCost + qty * comp.price;
      existing.qty += qty;
      existing.avgCost = Number((totalCost / existing.qty).toFixed(2));
    } else {
      live.portfolio.push({ id: cid, qty, avgCost: comp.price });
    }
    store.savePersistedState();
    store.emit('portfolio');
  });

  bodyEl.querySelector('#port-div-help-btn').addEventListener('click', () => openConceptModal('diversification'));

  bodyEl.querySelectorAll('[data-port-focus]').forEach(el => {
    el.addEventListener('click', () => selectWorldObject('COMPANY', el.dataset.portFocus, true));
  });

  bodyEl.querySelectorAll('[data-port-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.dataset.portRemove;
      const live = store.getLiveState();
      live.portfolio = live.portfolio.filter(p => p.id !== cid);
      store.savePersistedState();
      store.emit('portfolio');
    });
  });

  updatePortfolioInspector(bodyEl, viewState);
}

export function updatePortfolioInspector(bodyEl, viewState) {
  const { totalCost, totalValue, totalPnl, totalPnlPct, sectorTotals, enriched, maxSectorShare, maxSectorName } =
    computePortfolioMetrics(viewState);

  patchText(bodyEl, 'port-total-val', fmtPrice(totalValue));
  patchText(bodyEl, 'port-total-cost', `Cost: ${fmtPrice(totalCost)}`);
  patchTextAndClass(
    bodyEl,
    'port-total-pnl',
    `${totalPnl >= 0 ? '+' : ''}${fmtPrice(totalPnl)}`,
    `metric-val num ${totalPnl >= 0 ? 'pos-text' : 'neg-text'}`
  );
  patchTextAndClass(
    bodyEl,
    'port-total-pnl-pct',
    fmtPct(totalPnlPct),
    `num ${totalPnl >= 0 ? 'pos-text' : 'neg-text'}`
  );

  const warnEl = bodyEl.querySelector('[data-bind="port-conc-warn"]');
  if (warnEl) {
    if (maxSectorShare > 55) {
      warnEl.style.display = 'block';
      warnEl.textContent = `⚠️ Concentration Notice: ${maxSectorShare.toFixed(1)}% of your hypothetical portfolio is concentrated in ${maxSectorName}.`;
    } else {
      warnEl.style.display = 'none';
    }
  }

  Object.entries(sectorTotals).forEach(([secId, val]) => {
    const pct = totalValue > 0 ? (val / totalValue) * 100 : 0;
    patchText(bodyEl, `port-sec-lbl-${secId}`, `${pct.toFixed(1)}% (${fmtPrice(val)})`);
    patchStyle(bodyEl, `port-sec-bar-${secId}`, 'width', `${pct}%`);
  });

  enriched.forEach(item => {
    patchText(bodyEl, `port-item-val-${item.comp.id}`, fmtPrice(item.val));
    patchTextAndClass(
      bodyEl,
      `port-item-pnl-${item.comp.id}`,
      `${item.pnl >= 0 ? '+' : ''}${item.pnl.toFixed(0)} (${item.pnlPct.toFixed(1)}%)`,
      `num ${item.pnl >= 0 ? 'pos-text' : 'neg-text'}`
    );
  });

  // Update option prices in place without resetting select value or closing dropdown
  const sel = bodyEl.querySelector('#port-company-select');
  if (sel && document.activeElement !== sel) {
    Array.from(sel.options).forEach(opt => {
      const c = viewState.companies.find(x => x.id === opt.value);
      if (c) {
        const lbl = `${c.symbol} (${fmtPrice(c.price)})`;
        if (opt.textContent !== lbl) opt.textContent = lbl;
      }
    });
  }
}