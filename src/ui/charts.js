/**
 * Sparklines and Multi-Horizon Historical SVG Chart Renderer.
 * Uses the company's real seeded multi-horizon arrays (`1D`, `1W`, `1M`, `3M`, `1Y`),
 * never scaling `1D`.
 */
import { store } from '../state/store.js';
import { fmtPrice } from '../utils/format.js';

export function drawSparkline(svgId, series, strokeColor) {
  const svg = document.getElementById(svgId);
  if (!svg || !series || series.length < 2) return;
  const w = 64;
  const h = 18;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const pts = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  svg.innerHTML = `<polyline fill="none" stroke="${strokeColor}" stroke-width="1.8" points="${pts}" />`;
}

export function mountHistoricalChart(container, viewState) {
  const targetComp =
    viewState.selectedObject && viewState.selectedObject.type === 'COMPANY'
      ? viewState.companies.find(c => c.id === viewState.selectedObject.id)
      : viewState.companies[0];

  if (!targetComp) return;

  if (viewState.dataMode === 'REAL_DATA') {
    container.innerHTML = `<div class="edu-block warn">Real-Data Mode is active without a configured historical time-series provider. MarketVerse never fabricates historical series in Real-Data mode.</div>`;
    return;
  }

  const horizon = viewState.activeHistoryHorizon || '1D';

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:8px;">
      <div>
        <strong data-bind="chart-title">${targetComp.symbol} — Simulated Price & Volume History (${horizon})</strong>
        <span class="badge sim" style="margin-left:6px;">SIMULATED SERIES</span>
        <span data-bind="chart-range" style="font-size:11px; color:var(--text-secondary); margin-left:8px;"></span>
      </div>
      <div style="display:flex; gap:4px;">
        ${['1D', '1W', '1M', '3M', '1Y']
          .map(
            h => `
          <button class="horizon-btn ${horizon === h ? 'active' : ''}" data-horizon="${h}" style="padding:2px 8px; font-size:11px;">${h}</button>
        `
          )
          .join('')}
      </div>
    </div>
    <svg data-bind="chart-svg" viewBox="0 0 680 125" style="width:100%; height:130px; background:var(--bg-input); border-radius:6px; border:1px solid var(--border-subtle);"></svg>
  `;

  container.querySelectorAll('.horizon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.getLiveState().activeHistoryHorizon = btn.dataset.horizon;
      mountHistoricalChart(container, store.getViewState());
    });
  });

  updateHistoricalChart(container, viewState);
}

export function updateHistoricalChart(container, viewState) {
  if (viewState.dataMode === 'REAL_DATA') return;

  const targetComp =
    viewState.selectedObject && viewState.selectedObject.type === 'COMPANY'
      ? viewState.companies.find(c => c.id === viewState.selectedObject.id)
      : viewState.companies[0];

  if (!targetComp) return;

  const horizon = viewState.activeHistoryHorizon || '1D';
  const priceSeries = (targetComp.histories && targetComp.histories[horizon]) || targetComp.history1D;
  const volSeries = (targetComp.volHistories && targetComp.volHistories[horizon]) || targetComp.volHistory;

  const minP = Math.min(...priceSeries);
  const maxP = Math.max(...priceSeries);
  const rangeP = maxP - minP || 1;
  const maxV = Math.max(...volSeries, 1);

  const titleEl = container.querySelector('[data-bind="chart-title"]');
  if (titleEl) {
    titleEl.textContent = `${targetComp.symbol} — Simulated Price & Volume History (${horizon})`;
  }

  const rangeEl = container.querySelector('[data-bind="chart-range"]');
  if (rangeEl) {
    rangeEl.textContent = `Range: ${fmtPrice(minP)} to ${fmtPrice(maxP)}`;
  }

  const svg = container.querySelector('[data-bind="chart-svg"]');
  if (!svg) return;

  const svgW = 680;
  const pricePts = priceSeries
    .map((v, i) => {
      const x = (i / Math.max(1, priceSeries.length - 1)) * (svgW - 20) + 10;
      const y = 80 - ((v - minP) / rangeP) * 65;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const barsHtml = volSeries
    .map((v, i) => {
      const x = (i / Math.max(1, volSeries.length - 1)) * (svgW - 20) + 6;
      const bh = (v / maxV) * 28;
      return `<rect x="${x.toFixed(1)}" y="${(120 - bh).toFixed(1)}" width="8" height="${bh.toFixed(1)}" fill="rgba(75,139,232,0.45)" />`;
    })
    .join('');

  const strokeCol = priceSeries[priceSeries.length - 1] >= priceSeries[0] ? '#22A06B' : '#D94F52';
  svg.innerHTML = `
    ${barsHtml}
    <polyline fill="none" stroke="${strokeCol}" stroke-width="2.2" points="${pricePts}" />
  `;
}