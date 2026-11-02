/**
 * 2D HTML World Labels with LOD (District Tags always visible; Company Labels for
 * hovered/selected/compared/nearest N or when zoomed in), Distance Fading,
 * and 2D Screen-Space Collision Avoidance.
 */
import * as THREE from 'three';
import { camera, webglAvailable } from './scene.js';
import { camRig } from '../controls/cameraRig.js';
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

export function updateCompanyLabelAnchor(company, newH, isHighlighted, isVisible) {
  const anchor = labelAnchors.find(a => a.type === 'COMPANY' && a.id === company.id);
  if (!anchor) return;

  anchor.worldPos.y = newH + 4.8;
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

  anchor.el.classList.toggle('selected', Boolean(isHighlighted));
  if (!isVisible) anchor.el.style.display = 'none';
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
  const isZoomedIn = camRig.distance < 95;

  // Determine nearest N=10 companies to camera target for LOD when zoomed out
  const companyDistList = [];
  labelAnchors.forEach(a => {
    if (a.type === 'COMPANY') {
      const dx = a.worldPos.x - camRig.target.x;
      const dz = a.worldPos.z - camRig.target.z;
      companyDistList.push({ id: a.id, distSq: dx * dx + dz * dz });
    }
  });
  companyDistList.sort((a, b) => a.distSq - b.distSq);
  const nearestSet = new Set(companyDistList.slice(0, 10).map(x => x.id));

  const visibleCandidates = [];

  labelAnchors.forEach(a => {
    const isSel =
      viewState.selectedObject && viewState.selectedObject.type === a.type && viewState.selectedObject.id === a.id;
    const isHov =
      viewState.hoveredObject && viewState.hoveredObject.type === a.type && viewState.hoveredObject.id === a.id;
    const isCompared =
      a.type === 'COMPANY' && viewState.activeNavView === 'compare' && viewState.compareIds.includes(a.id);

    if (a.type === 'COMPANY') {
      const c = viewState.companies.find(x => x.id === a.id);
      if (c && viewState.exchangeFilter !== 'ALL' && c.exchange !== viewState.exchangeFilter) {
        a.el.style.display = 'none';
        return;
      }
      // LOD check: show if hovered, selected, compared, zoomed in, or within nearest 10
      if (!isSel && !isHov && !isCompared && !isZoomedIn && !nearestSet.has(a.id)) {
        a.el.style.display = 'none';
        return;
      }
    } else if ((a.type === 'INFRA' || a.type === 'LEARN') && !isSel && !isHov && camRig.distance > 125) {
      a.el.style.display = 'none';
      return;
    }

    tempV.copy(a.worldPos);
    tempV.project(camera);

    if (tempV.z > 1 || tempV.z < -1) {
      a.el.style.display = 'none';
      return;
    }

    const x = (tempV.x * 0.5 + 0.5) * w;
    const y = (-(tempV.y * 0.5) + 0.5) * h;

    if (x < 30 || x > w - 30 || y < 56 || y > h - 30) {
      a.el.style.display = 'none';
      return;
    }

    const camDist = camera.position.distanceTo(a.worldPos);
    const priority = isSel ? 100 : isHov ? 90 : isCompared ? 80 : a.isDistrict ? 70 : Math.max(1, 60 - camDist * 0.2);

    visibleCandidates.push({
      anchor: a,
      x,
      y,
      camDist,
      priority,
      isPinned: Boolean(isSel || isHov || isCompared || a.isDistrict)
    });
  });

  // Sort by priority descending for 2D collision avoidance
  visibleCandidates.sort((a, b) => b.priority - a.priority);
  const occupiedBoxes = [];

  visibleCandidates.forEach(item => {
    const { anchor, x, y, camDist, isPinned } = item;
    const el = anchor.el;
    el.style.display = 'flex';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const boxW = anchor.isDistrict ? 96 : 78;
    const boxH = 22;
    const rect = {
      left: x - boxW * 0.5,
      right: x + boxW * 0.5,
      top: y - boxH,
      bottom: y
    };

    let collides = false;
    for (let i = 0; i < occupiedBoxes.length; i++) {
      const ob = occupiedBoxes[i];
      if (rect.left < ob.right && rect.right > ob.left && rect.top < ob.bottom && rect.bottom > ob.top) {
        collides = true;
        break;
      }
    }

    if (collides && !isPinned) {
      // Occlusion / overlap fade
      el.style.opacity = '0.12';
      el.style.pointerEvents = 'none';
    } else {
      occupiedBoxes.push(rect);
      const distAlpha = THREE.MathUtils.clamp(1.25 - camDist / 260, 0.45, 1.0);
      el.style.opacity = isPinned ? '1' : distAlpha.toFixed(2);
      el.style.pointerEvents = 'auto';
    }
  });
}