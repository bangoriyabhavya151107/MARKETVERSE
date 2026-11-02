/**
 * What-If & Event Simulator Inspector.
 * Mounts `#wi-price-input`, `#wi-shares-input`, `#wi-sector-select`, `#wi-sector-pct` once.
 * On simulation ticks, ONLY updates keyed `[data-bind]` summary spans so typing in
 * the What-If price or share count field is NEVER reset by simulation ticks.
 */
import { store } from '../../state/store.js';
import { SECTORS } from '../../data/sectors.js';
import { recalculateAllFinancials } from '../../engine/finance.js';
import { recordReplaySnapshot, returnToLiveReplay } from '../../engine/replay.js';
import { endActiveEvent, resetFullSimulation } from '../../engine/simulation.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../../utils/format.js';
import { patchText, patchTextAndClass } from '../../utils/dom.js';
import { update3DCityFromState } from '../../world/buildings.js';

export function mountWhatIfInspector(titleEl, bodyEl, viewState) {
  titleEl.textContent = 'What-If & Event Simulator';
  const comp = viewState.companies.find(c => c.id === viewState.whatIf.companyId) || viewState.companies[0];
  const curPrice = viewState.whatIf.customPrice !== null ? viewState.whatIf.customPrice : comp.price;
  const curShares = viewState.whatIf.customSharesCr !== null ? viewState.whatIf.customSharesCr : comp.sharesOutstandingCr;

  bodyEl.innerHTML = `
    <div class="edu-block">
      <strong>Interactive What-If Sandbox</strong>
      <p style="font-size:11.5px; margin-top:2px;">
        Test how changing share price, share count, or sector shocks recalculates Market Cap and simulated indices in real time.
      </p>
    </div>

    <div class="section-card">
      <h4>1. Single-Company Parameter Simulator</h4>
      <label style="font-size:11.5px; color:var(--text-secondary);">Target Company:</label>
      <select id="wi-company-select" style="width:100%; margin:4px 0 8px;">
        ${viewState.companies
          .map(
            c =>
              `<option value="${c.id}" ${c.id === comp.id ? 'selected' : ''}>${c.symbol} — ${c.companyName}</option>`
          )
          .join('')}
      </select>

      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:6px;">
        Live Simulated Price: <strong class="num" data-bind="wi-live-price">${fmtPrice(comp.price)}</strong>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <div>
          <label style="font-size:11px; color:var(--text-secondary);">Hypothetical Price (₹)</label>
          <input type="number" id="wi-price-input" value="${curPrice}" step="10" style="width:100%; margin-top:3px;" />
        </div>
        <div>
          <label style="font-size:11px; color:var(--text-secondary);">Shares (Crores)</label>
          <input type="number" id="wi-shares-input" value="${curShares}" step="5" style="width:100%; margin-top:3px;" />
        </div>
      </div>

      <div style="display:flex; gap:6px; margin-top:8px;">
        <button class="primary" id="wi-apply-btn" style="flex:1;">Apply to Simulation</button>
        <button id="wi-undo-btn">Undo</button>
      </div>

      <div style="margin-top:10px; background:var(--bg-input); padding:8px; border-radius:5px; font-size:11.5px;">
        <div style="display:flex; justify-content:space-between;">
          <span>Before (Base Close):</span>
          <span class="num" data-bind="wi-before-mcap"></span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:3px;">
          <span>After (Current/What-If):</span>
          <span class="num"><strong data-bind="wi-after-mcap"></strong></span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:3px;">
          <span>Difference:</span>
          <span class="num" data-bind="wi-diff-mcap"></span>
        </div>
      </div>
    </div>

    <div class="section-card">
      <h4>2. Sector-Wide Percentage Shock</h4>
      <div style="display:grid; grid-template-columns:1fr 85px; gap:6px; margin-bottom:8px;">
        <select id="wi-sector-select">
          <option value="ALL">Entire Market (All ${SECTORS.length} Sectors)</option>
          ${SECTORS.map(s => `<option value="${s.id}" ${s.id === viewState.whatIf.sectorId ? 'selected' : ''}>${s.name}</option>`).join('')}
        </select>
        <input type="number" id="wi-sector-pct" value="${viewState.whatIf.sectorShockPct}" step="1" placeholder="%" />
      </div>
      <div style="display:flex; gap:6px;">
        <button class="primary" id="wi-shock-pos-btn" style="flex:1;">Apply +Shock %</button>
        <button id="wi-shock-neg-btn" style="flex:1; border-color:var(--neg); color:var(--neg);">Apply -Shock %</button>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
      <button id="wi-end-event-btn">⏹ End Active Event</button>
      <button id="wi-reset-sim-btn">↺ Reset Simulation</button>
    </div>
  `;

  bodyEl.querySelector('#wi-company-select').addEventListener('change', e => {
    const live = store.getLiveState();
    live.whatIf.companyId = e.target.value;
    live.whatIf.customPrice = null;
    live.whatIf.customSharesCr = null;
    mountWhatIfInspector(titleEl, bodyEl, store.getViewState());
  });

  // Live preview of hypothetical Market Cap as user types without mutating simulation until Apply
  const priceInp = bodyEl.querySelector('#wi-price-input');
  const sharesInp = bodyEl.querySelector('#wi-shares-input');
  const previewHandler = () => updateWhatIfInspector(bodyEl, store.getViewState());
  priceInp.addEventListener('input', previewHandler);
  sharesInp.addEventListener('input', previewHandler);

  bodyEl.querySelector('#wi-apply-btn').addEventListener('click', () => {
    returnToLiveReplay();
    const live = store.getLiveState();
    const c = live.companies.find(x => x.id === live.whatIf.companyId);
    if (!c) return;
    live.whatIf.snapshotBefore = { id: c.id, price: c.price, shares: c.sharesOutstandingCr };
    const newP = parseFloat(priceInp.value);
    const newS = parseFloat(sharesInp.value);
    if (!Number.isNaN(newP) && newP > 0) c.price = Number(newP.toFixed(2));
    if (!Number.isNaN(newS) && newS > 0) c.sharesOutstandingCr = Number(newS.toFixed(2));
    live.whatIf.customPrice = c.price;
    live.whatIf.customSharesCr = c.sharesOutstandingCr;
    recalculateAllFinancials(live);
    recordReplaySnapshot();
    update3DCityFromState(store.getViewState());
    store.emit('tick');
  });

  bodyEl.querySelector('#wi-undo-btn').addEventListener('click', () => {
    returnToLiveReplay();
    const live = store.getLiveState();
    const snap = live.whatIf.snapshotBefore;
    if (!snap) return;
    const c = live.companies.find(x => x.id === snap.id);
    if (c) {
      c.price = snap.price;
      c.sharesOutstandingCr = snap.shares;
      live.whatIf.customPrice = null;
      live.whatIf.customSharesCr = null;
      priceInp.value = c.price;
      sharesInp.value = c.sharesOutstandingCr;
      recalculateAllFinancials(live);
      recordReplaySnapshot();
      update3DCityFromState(store.getViewState());
      store.emit('tick');
    }
  });

  const applyShock = sign => {
    returnToLiveReplay();
    const live = store.getLiveState();
    const secId = bodyEl.querySelector('#wi-sector-select').value;
    const rawPct = parseFloat(bodyEl.querySelector('#wi-sector-pct').value) || 0;
    live.whatIf.sectorId = secId;
    live.whatIf.sectorShockPct = rawPct;
    const pct = rawPct * sign;
    live.companies.forEach(c => {
      if (secId === 'ALL' || c.sector === secId) {
        c.price = Math.max(5, Number((c.price * (1 + pct / 100)).toFixed(2)));
      }
    });
    recalculateAllFinancials(live);
    recordReplaySnapshot();
    update3DCityFromState(store.getViewState());
    store.emit('tick');
  };

  bodyEl.querySelector('#wi-shock-pos-btn').addEventListener('click', () => applyShock(1));
  bodyEl.querySelector('#wi-shock-neg-btn').addEventListener('click', () => applyShock(-1));

  bodyEl.querySelector('#wi-end-event-btn').addEventListener('click', () => {
    endActiveEvent();
    update3DCityFromState(store.getViewState());
  });

  bodyEl.querySelector('#wi-reset-sim-btn').addEventListener('click', () => {
    resetFullSimulation();
    update3DCityFromState(store.getViewState());
  });

  updateWhatIfInspector(bodyEl, viewState);
}

export function updateWhatIfInspector(bodyEl, viewState) {
  const comp = viewState.companies.find(c => c.id === viewState.whatIf.companyId) || viewState.companies[0];
  if (!comp) return;

  patchText(bodyEl, 'wi-live-price', fmtPrice(comp.price));

  const priceInp = bodyEl.querySelector('#wi-price-input');
  const sharesInp = bodyEl.querySelector('#wi-shares-input');

  const typedPrice = priceInp ? parseFloat(priceInp.value) : NaN;
  const typedShares = sharesInp ? parseFloat(sharesInp.value) : NaN;

  const evalPrice = !Number.isNaN(typedPrice) && typedPrice > 0 ? typedPrice : comp.price;
  const evalShares = !Number.isNaN(typedShares) && typedShares > 0 ? typedShares : comp.sharesOutstandingCr;

  const beforeMcap = comp.previousClose * comp.baseSharesCr;
  const afterMcap = evalPrice * evalShares;
  const diffMcap = afterMcap - beforeMcap;
  const diffMcapPct = beforeMcap > 0 ? (diffMcap / beforeMcap) * 100 : 0;

  patchText(bodyEl, 'wi-before-mcap', fmtMcapCr(beforeMcap));
  patchText(bodyEl, 'wi-after-mcap', fmtMcapCr(afterMcap));
  patchTextAndClass(
    bodyEl,
    'wi-diff-mcap',
    `${diffMcap >= 0 ? '+' : ''}${fmtMcapCr(diffMcap)} (${fmtPct(diffMcapPct)})`,
    `num ${diffMcap >= 0 ? 'pos-text' : 'neg-text'}`
  );
}