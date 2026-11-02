/**
 * 2D HTML World Labels projected from 3D coordinates.
 */
import * as THREE from 'three';
import { camera, webglAvailable } from './scene.js';
import { store } from '../state/store.js';

export const labelAnchors = [];
let onLabelSelectCallback = null;

export function setLabelSelectHandler(fn) {
  onLabelSelectCallback = fn;
}

export function registerWorldLabel({ id, type, text, worldPos, isDistrict, borderColor }) {
  const container = document.getElementById('world-labels');
  if (!container) return;

  const el = document.createElement('div');
  el.className = 'world-label' + (isDistrict ? ' district-tag' : '');
  if (borderColor) el.style.borderColor = borderColor;
  el.innerHTML = `<span data-label-sym>${text}</span> <span data-label-pct class="num"></span>`;

  el.addEventListener('click', e => {
    e.stopPropagation();
    if (onLabelSelectCallback) {
      onLabelSelectCallback(type, id, true);
    }
  });

  container.appendChild(el);
  labelAnchors.push({ id, type, worldPos, el, isDistrict });
}

export function updateCompanyLabelAnchor(company, newH, isSelected, isVisible) {
  const anchor = labelAnchors.find(a => a.type === 'COMPANY' && a.id === company.id);
  if (!anchor) return;

  anchor.worldPos.y = newH + 4.2;
  const sign = company.changePercent > 0.02 ? '▲' : company.changePercent < -0.02 ? '▼' : '•';
  const colorCls = company.changePercent > 0.02 ? 'pos-text' : company.changePercent < -0.02 ? 'neg-text' : 'neu-text';

  const symEl = anchor.el.querySelector('[data-label-sym]');
  const pctEl = anchor.el.querySelector('[data-label-pct]');
  if (symEl && symEl.textContent !== company.symbol) symEl.textContent = company.symbol;
  if (pctEl) {
    const pctStr = `${sign}${Math.abs(company.changePercent).toFixed(1)}%`;
    if (pctEl.textContent !== pctStr) pctEl.textContent = pctStr;
    pctEl.className = `${colorCls} num`;
  }

  anchor.el.classList.toggle('selected', Boolean(isSelected));
  anchor.el.style.display = isVisible ? 'flex' : 'none';
}

const tempV = new THREE.Vector3();

export function updateWorldLabelsProjection() {
  if (!webglAvailable || !camera) return;
  const viewState = store.getViewState();

  if (!viewState.labelsVisible) {
    labelAnchors.forEach(a => {
      a.el.style.display = 'none';
    });
    return;
  }

  const w = window.innerWidth;
  const h = window.innerHeight;

  labelAnchors.forEach(a => {
    if (a.type === 'COMPANY') {
      const c = viewState.companies.find(x => x.id === a.id);
      if (c && viewState.exchangeFilter !== 'ALL' && c.exchange !== viewState.exchangeFilter) {
        a.el.style.display = 'none';
        return;
      }
    }

    tempV.copy(a.worldPos);
    tempV.project(camera);

    if (tempV.z > 1 || tempV.z < -1) {
      a.el.style.display = 'none';
      return;
    }

    const x = (tempV.x * 0.5 + 0.5) * w;
    const y = (-(tempV.y * 0.5) + 0.5) * h;

    if (x < -50 || x > w + 50 || y < 40 || y > h - 20) {
      a.el.style.display = 'none';
      return;
    }

    a.el.style.display = 'flex';
    a.el.style.left = `${x}px`;
    a.el.style.top = `${y}px`;
  });
}