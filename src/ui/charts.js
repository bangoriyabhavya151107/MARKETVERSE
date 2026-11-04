/**
 * Sparklines and Interactive Multi-Horizon Chart Component with Hover Crosshair & Tooltip.
 * Uses each company's authentic seeded multi-horizon arrays (`1D`, `1W`, `1M`, `3M`, `1Y`).
 */
import { store } from '../state/store.js';
import { fmtPrice, fmtPct } from '../utils/format.js';

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

export function mountHistoricalChart(container, viewState, customCompanyId = null, compact = false) {
  if (!container) return;

  const targetComp = customCompanyId
    ? viewState.companies.find(c => c.id === customCompanyId)
    : viewState.selectedObject && viewState.selectedObject.type === 'COMPANY'
    ? viewState.companies.find(c => c.id === viewState.selectedObject.id)
    : viewState.companies[0];

  if (!targetComp) {
    container.innerHTML = `<div class="edu-block warn">No company data available to chart.</div>`;
    return;
  }

  if (viewState.dataMode === 'REAL_DATA') {
    container.innerHTML = `<div class="edu-block warn">Real-Data Mode is active without a configured historical time-series provider. MarketVerse never fabricates historical series in Real-Data mode.</div>`;
    return;
  }

  const horizon = viewState.activeHistoryHorizon || '1D';
  const svgH = compact ? 155 : 132;

  container.dataset.chartCompId = targetComp.id;
  container.dataset.chartCompact = compact ? '1' : '0';

  container.innerHTML = `
    <div class="interactive-chart-wrap">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; flex-wrap:wrap; gap:6px;">
        <div>
          <strong data-bind="chart-title">${targetComp.symbol} (${horizon})</strong>
          <span class="badge sim" style="margin-left:4px;">SIMULATED</span>
        </div>
        <div style="display:flex; gap:3px;" role="group" aria-label="Chart Time Horizon">
          ${['1D', '1W', '1M', '3M', '1Y']
            .map(
              h => `
            <button class="horizon-btn ${horizon === h ? 'active' : ''}" data-horizon="${h}" style="padding:2px 7px; font-size:var(--text-sm);">${h}</button>
          `
            )
            .join('')}
        </div>
      </div>

      <div class="chart-hover-readout">
        <span data-bind="chart-range" class="num"></span>
        <span data-bind="chart-hover-info" class="num" style="color:var(--text-primary); font-weight:600;">Hover chart to inspect points</span>
      </div>

      <svg data-bind="chart-svg" viewBox="0 0 680 ${svgH}" style="width:100%; height:${svgH}px; background:var(--bg-input); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); cursor:crosshair; touch-action:none;"></svg>
    </div>
  `;

  container.querySelectorAll('.horizon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.getLiveState().activeHistoryHorizon = btn.dataset.horizon;
      mountHistoricalChart(container, store.getViewState(), customCompanyId, compact);
    });
  });

  updateHistoricalChart(container, viewState);
}

export function updateHistoricalChart(container, viewState) {
  if (!container || viewState.dataMode === 'REAL_DATA') return;

  const compId = container.dataset.chartCompId;
  const compact = container.dataset.chartCompact === '1';
  const targetComp = compId
    ? viewState.companies.find(c => c.id === compId)
    : viewState.selectedObject && viewState.selectedObject.type === 'COMPANY'
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
    titleEl.textContent = `${targetComp.symbol} — ${horizon} Series`;
  }

  const rangeEl = container.querySelector('[data-bind="chart-range"]');
  if (rangeEl) {
    rangeEl.textContent = `Low: ${fmtPrice(minP)} • High: ${fmtPrice(maxP)}`;
  }

  const svg = container.querySelector('[data-bind="chart-svg"]');
  if (!svg) return;

  const svgW = 680;
  const svgH = compact ? 155 : 132;
  const plotBottom = svgH - 34;
  const plotHeight = plotBottom - 14;

  const coords = priceSeries.map((v, i) => {
    const x = (i / Math.max(1, priceSeries.length - 1)) * (svgW - 24) + 12;
    const y = plotBottom - ((v - minP) / rangeP) * plotHeight;
    return { x, y, price: v, vol: volSeries[i] || 0, idx: i };
  });

  const pricePts = coords.map(pt => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
  const areaPts = `${coords[0].x.toFixed(1)},${plotBottom} ${pricePts} ${coords[coords.length - 1].x.toFixed(1)},${plotBottom}`;

  const barsHtml = coords
    .map(pt => {
      const bh = (pt.vol / maxV) * 26;
      return `<rect x="${(pt.x - 4).toFixed(1)}" y="${(svgH - 4 - bh).toFixed(1)}" width="8" height="${bh.toFixed(1)}" fill="rgba(75,139,232,0.42)" />`;
    })
    .join('');

  const isPositive = priceSeries[priceSeries.length - 1] >= priceSeries[0];
  const strokeCol = isPositive ? '#22A06B' : '#E05255';
  const fillCol = isPositive ? 'rgba(34,160,107,0.16)' : 'rgba(224,82,85,0.16)';

  svg.innerHTML = `
    <polygon fill="${fillCol}" points="${areaPts}" />
    ${barsHtml}
    <polyline fill="none" stroke="${strokeCol}" stroke-width="2.3" points="${pricePts}" />
    <line id="ch-vline" x1="0" y1="0" x2="0" y2="${svgH}" stroke="rgba(255,255,255,0.45)" stroke-dasharray="3,3" visibility="hidden" />
    <line id="ch-hline" x1="0" y1="0" x2="${svgW}" y2="0" stroke="rgba(255,255,255,0.35)" stroke-dasharray="3,3" visibility="hidden" />
    <circle id="ch-dot" cx="0" cy="0" r="4.5" fill="${strokeCol}" stroke="#fff" stroke-width="1.5" visibility="hidden" />
  `;

  const vline = svg.querySelector('#ch-vline');
  const hline = svg.querySelector('#ch-hline');
  const dot = svg.querySelector('#ch-dot');
  const hoverInfo = container.querySelector('[data-bind="chart-hover-info"]');

  const onMove = e => {
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * svgW;
    let nearest = coords[0];
    let bestDist = Infinity;
    coords.forEach(pt => {
      const d = Math.abs(pt.x - relX);
      if (d < bestDist) {
        bestDist = d;
        nearest = pt;
      }
    });

    if (nearest && vline && hline && dot) {
      vline.setAttribute('x1', nearest.x);
      vline.setAttribute('x2', nearest.x);
      vline.setAttribute('visibility', 'visible');

      hline.setAttribute('y1', nearest.y);
      hline.setAttribute('y2', nearest.y);
      hline.setAttribute('visibility', 'visible');

      dot.setAttribute('cx', nearest.x);
      dot.setAttribute('cy', nearest.y);
      dot.setAttribute('visibility', 'visible');

      if (hoverInfo) {
        const pctFromStart = priceSeries[0] > 0 ? ((nearest.price - priceSeries[0]) / priceSeries[0]) * 100 : 0;
        hoverInfo.textContent = `Pt #${nearest.idx + 1}: ${fmtPrice(nearest.price)} (${fmtPct(pctFromStart)}) • Vol: ${nearest.vol.toLocaleString('en-IN')}`;
      }
    }
  };

  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerleave', () => {
    if (vline) vline.setAttribute('visibility', 'hidden');
    if (hline) hline.setAttribute('visibility', 'hidden');
    if (dot) dot.setAttribute('visibility', 'hidden');
    if (hoverInfo) hoverInfo.textContent = 'Hover chart to inspect points';
  });
}