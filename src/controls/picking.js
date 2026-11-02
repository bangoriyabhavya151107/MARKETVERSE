/**
 * Raycaster Object Selection, Double-Click Tight Focus, Throttled Hover Raycasting,
 * and Floating Mini-Tooltip with Sparkline.
 */
import * as THREE from 'three';
import { camera, renderer, interactiveMeshes, webglAvailable } from '../world/scene.js';
import { company3DMap, update3DCityFromState } from '../world/buildings.js';
import { SECTOR_MAP } from '../data/sectors.js';
import { INFRA_FACILITIES } from '../data/infrastructure.js';
import { LEARNING_LANDMARKS } from '../data/landmarks.js';
import { camRig, flyCameraTo, applyCameraPreset } from './cameraRig.js';
import { fmtPrice, fmtPct, fmtMcapCr } from '../utils/format.js';
import { store } from '../state/store.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let lastHoverCastTime = 0;

export function selectWorldObject(type, id, focusCamera = true, tightFocus = false) {
  const live = store.getLiveState();
  live.selectedObject = { type, id };

  const deselectBtn = document.getElementById('deselect-btn');
  if (deselectBtn) deselectBtn.style.display = 'inline-block';
  document.body.classList.remove('right-collapsed');

  const viewState = store.getViewState();

  if (type === 'COMPANY') {
    const c = viewState.companies.find(x => x.id === id);
    if (c && focusCamera) {
      const h = company3DMap[id] ? company3DMap[id].height : 15;
      const dist = tightFocus ? 34 : 48;
      flyCameraTo({ x: c.pos.x, y: h * 0.5, z: c.pos.z }, dist, camRig.goalTheta, 0.98);
    }
  } else if (type === 'SECTOR') {
    const s = SECTOR_MAP[id];
    if (s && focusCamera) {
      flyCameraTo({ x: s.center.x, y: 5, z: s.center.z }, tightFocus ? 56 : 74, camRig.goalTheta, 0.95);
    }
  } else if (type === 'EXCHANGE') {
    if (focusCamera) applyCameraPreset('EXCHANGE');
  } else if (type === 'INFRA') {
    const fac = INFRA_FACILITIES.find(x => x.id === id);
    if (fac && focusCamera) {
      flyCameraTo({ x: fac.pos.x, y: 6, z: fac.pos.z }, tightFocus ? 34 : 45, 0.0, 0.98);
    }
  } else if (type === 'LEARN') {
    const lm = LEARNING_LANDMARKS.find(x => x.id === id);
    if (lm && focusCamera) {
      flyCameraTo({ x: lm.pos.x, y: 5, z: lm.pos.z }, tightFocus ? 32 : 42, 0.15, 0.98);
    }
  }

  update3DCityFromState(store.getViewState());
  store.emit('selection');
}

export function clearSelection() {
  const live = store.getLiveState();
  live.selectedObject = null;
  const deselectBtn = document.getElementById('deselect-btn');
  if (deselectBtn) deselectBtn.style.display = 'none';
  update3DCityFromState(store.getViewState());
  store.emit('selection');
}

function getHitFromEvent(e) {
  if (!webglAvailable || !renderer || !camera) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveMeshes, false);
  if (intersects.length > 0) {
    const hit = intersects[0].object.userData;
    if (hit && hit.type && hit.id) return hit;
  }
  return null;
}

export function handleCanvasClick(e) {
  const hit = getHitFromEvent(e);
  if (hit) {
    selectWorldObject(hit.type, hit.id, true, false);
  }
}

export function handleCanvasDoubleClick(e) {
  const hit = getHitFromEvent(e);
  if (hit) {
    selectWorldObject(hit.type, hit.id, true, true);
  }
}

function buildMiniSparklinePoints(series) {
  if (!series || series.length < 2) return '';
  const w = 68;
  const h = 18;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function handlePointerHover(e) {
  const tooltip = document.getElementById('hover-tooltip');
  if (!tooltip) return;

  if (camRig.isDragging || e.target !== renderer?.domElement) {
    tooltip.style.display = 'none';
    if (store.getLiveState().hoveredObject) {
      store.getLiveState().hoveredObject = null;
      update3DCityFromState(store.getViewState());
    }
    return;
  }

  const now = performance.now();
  if (now - lastHoverCastTime < 45) {
    if (tooltip.style.display === 'block') {
      tooltip.style.left = `${e.clientX}px`;
      tooltip.style.top = `${e.clientY}px`;
    }
    return;
  }
  lastHoverCastTime = now;

  const hit = getHitFromEvent(e);
  const live = store.getLiveState();
  const prevHov = live.hoveredObject;

  if (!hit) {
    tooltip.style.display = 'none';
    if (prevHov) {
      live.hoveredObject = null;
      update3DCityFromState(store.getViewState());
    }
    renderer.domElement.style.cursor = 'grab';
    return;
  }

  renderer.domElement.style.cursor = 'pointer';
  const changed = !prevHov || prevHov.type !== hit.type || prevHov.id !== hit.id;
  live.hoveredObject = { type: hit.type, id: hit.id };

  const viewState = store.getViewState();
  if (changed) {
    update3DCityFromState(viewState);
  }

  if (hit.type === 'COMPANY') {
    const c = viewState.companies.find(x => x.id === hit.id);
    if (c) {
      const isPos = c.changePercent >= 0;
      const stroke = isPos ? '#22A06B' : '#D94F52';
      const pts = buildMiniSparklinePoints(c.history1D);
      tooltip.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <strong>${c.symbol}</strong>
          <span class="badge ${isPos ? 'pos' : 'neg'} num">${fmtPct(c.changePercent)}</span>
        </div>
        <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">${c.companyName}</div>
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <div class="num" style="font-weight:700; font-size:13px;">${fmtPrice(c.price)}</div>
            <div style="font-size:10px; color:var(--text-muted);">M-Cap: ${fmtMcapCr(c.marketCap)}</div>
          </div>
          <svg width="68" height="18"><polyline fill="none" stroke="${stroke}" stroke-width="1.8" points="${pts}" /></svg>
        </div>
      `;
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.clientX}px`;
      tooltip.style.top = `${e.clientY}px`;
      return;
    }
  } else if (hit.type === 'SECTOR') {
    const s = SECTOR_MAP[hit.id];
    if (s) {
      tooltip.innerHTML = `
        <div style="font-weight:700; color:${s.color};">${s.name}</div>
        <div style="font-size:11px; color:var(--text-secondary);">Click to inspect district • Double-click to zoom</div>
      `;
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.clientX}px`;
      tooltip.style.top = `${e.clientY}px`;
      return;
    }
  } else if (hit.type === 'EXCHANGE') {
    tooltip.innerHTML = `
      <div style="font-weight:700;">🏛️ Central Stock Exchange HQ</div>
      <div style="font-size:11px; color:var(--text-secondary);">Order Matching, Clearing & Market Data Anchor</div>
    `;
    tooltip.style.display = 'block';
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY}px`;
    return;
  }

  tooltip.style.display = 'none';
}