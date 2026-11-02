/**
 * Watchlist Inspector (Mount + Keyed Tick Patch so select is never reset on ticks).
 */
import { store } from '../../state/store.js';
import { SECTOR_MAP } from '../../data/sectors.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../../utils/format.js';
import { patchText, patchTextAndClass } from '../../utils/dom.js';
import { selectWorldObject } from '../../controls/picking.js';

export function mountWatchlistInspector(titleEl, bodyEl, viewState) {
  titleEl.textContent = 'My Watchlist';
  const list = viewState.watchlistIds.map(id => viewState.companies.find(c => c.id === id)).filter(Boolean);

  const existingSel = bodyEl.querySelector('#watchlist-add-select');
  const preservedVal = existingSel ? existingSel.value : viewState.companies[0]?.id;

  bodyEl.innerHTML = `
    <div class="section-card">
      <h4>Add Company to Watchlist</h4>
      <div style="display:flex; gap:6px;">
        <select id="watchlist-add-select" style="flex:1;">
          ${viewState.companies
            .map(
              c =>
                `<option value="${c.id}" ${c.id === preservedVal ? 'selected' : ''}>${c.symbol} — ${c.companyName}</option>`
            )
            .join('')}
        </select>
        <button class="primary" id="watchlist-add-btn">+ Add</button>
      </div>
    </div>

    ${
      list.length === 0
        ? `
      <div class="edu-block warn">
        Your watchlist is currently empty. Add companies above or click "☆ Add Watchlist" on any building.
      </div>
      <button id="watchlist-reset-btn" style="width:100%; margin-top:6px; font-size:11.5px;">↺ Reset Watchlist to Default</button>
    `
        : `
      <div class="section-card">
        <h4>Watched Companies (${list.length})</h4>
        ${list
          .map(
            c => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid var(--border-subtle);">
            <div data-watch-focus="${c.id}" style="cursor:pointer;">
              <div style="font-weight:700;">${c.symbol} <span style="font-size:10.5px; color:var(--text-muted);">${SECTOR_MAP[c.sector].short}</span></div>
              <div style="font-size:11px; color:var(--text-secondary);" data-bind="wl-mcap-${c.id}"></div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="text-align:right;">
                <div class="num" style="font-weight:600;" data-bind="wl-price-${c.id}"></div>
                <span data-bind="wl-chg-${c.id}" class="badge pos num"></span>
              </div>
              <button data-watch-remove="${c.id}" title="Remove from Watchlist" style="padding:3px 6px;">✕</button>
            </div>
          </div>
        `
          )
          .join('')}
        <button id="watchlist-reset-btn" style="width:100%; margin-top:10px; font-size:11.5px;">↺ Reset Watchlist to Default</button>
      </div>
    `
    }
  `;

  bodyEl.querySelector('#watchlist-add-btn').addEventListener('click', () => {
    const sel = bodyEl.querySelector('#watchlist-add-select');
    const live = store.getLiveState();
    if (sel && !live.watchlistIds.includes(sel.value)) {
      live.watchlistIds.push(sel.value);
      store.savePersistedState();
      store.emit('watchlist');
    }
  });

  bodyEl.querySelectorAll('[data-watch-focus]').forEach(el => {
    el.addEventListener('click', () => selectWorldObject('COMPANY', el.dataset.watchFocus, true));
  });

  bodyEl.querySelectorAll('[data-watch-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.dataset.watchRemove;
      const live = store.getLiveState();
      const idx = live.watchlistIds.indexOf(cid);
      if (idx >= 0) {
        live.watchlistIds.splice(idx, 1);
        store.savePersistedState();
        store.emit('watchlist');
      }
    });
  });

  const resetBtn = bodyEl.querySelector('#watchlist-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      store.getLiveState().watchlistIds = ['C01', 'C06', 'C11', 'C19'];
      store.savePersistedState();
      store.emit('watchlist');
    });
  }

  updateWatchlistInspector(bodyEl, viewState);
}

export function updateWatchlistInspector(bodyEl, viewState) {
  viewState.watchlistIds.forEach(id => {
    const c = viewState.companies.find(x => x.id === id);
    if (!c) return;
    patchText(bodyEl, `wl-mcap-${c.id}`, fmtMcapCr(c.marketCap));
    patchText(bodyEl, `wl-price-${c.id}`, fmtPrice(c.price));
    patchTextAndClass(
      bodyEl,
      `wl-chg-${c.id}`,
      fmtPct(c.changePercent),
      `badge ${c.changePercent >= 0 ? 'pos' : 'neg'} num`
    );
  });
}