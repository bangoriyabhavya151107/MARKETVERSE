/**
 * Pointer, Multi-Touch (1-Finger Orbit, 2-Finger Pan + Pinch Zoom, Tap/Double-Tap),
 * On-Screen Camera Buttons, Clickable 2D Minimap, and Global Keyboard Shortcuts.
 */
import { camRig, notifyCameraInteraction, flyCameraTo, applyCameraPreset } from './cameraRig.js';
import { handleCanvasClick, handleCanvasDoubleClick, handlePointerHover, selectWorldObject, clearSelection } from './picking.js';
import { SECTORS } from '../data/sectors.js';
import { store } from '../state/store.js';
import { switchLeftNavView } from '../ui/leftNav.js';
import { openShortcutsModal } from '../ui/modal.js';
import { returnToLiveReplay } from '../engine/replay.js';
import { update3DCityFromState } from '../world/buildings.js';
import { updateTopBarAndSummaryCards } from '../ui/topbar.js';
import { hasFocusedControl } from '../utils/dom.js';

const activePointers = new Map();
let prevPinchDist = 0;
let prevMidpoint = { x: 0, y: 0 };
let lastTapTime = 0;

export function setupViewportControls() {
  const canvas = document.getElementById('city-canvas');
  if (!canvas) return;

  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('dblclick', e => handleCanvasDoubleClick(e));

  canvas.addEventListener('pointerdown', e => {
    notifyCameraInteraction();
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.size === 1) {
      camRig.isDragging = true;
      // On touch, 1 finger orbits; on mouse, right-click or Shift orbits, left-click pans
      if (e.pointerType === 'touch') {
        camRig.dragMode = 'ROTATE';
      } else {
        camRig.dragMode = e.button === 2 || e.shiftKey ? 'ROTATE' : 'PAN';
      }
      camRig.prevMouse = { x: e.clientX, y: e.clientY };
      camRig.downMouse = { x: e.clientX, y: e.clientY };
    } else if (activePointers.size === 2) {
      // 2-finger touch: switch to pinch-zoom + two-finger pan
      const pts = Array.from(activePointers.values());
      prevPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      prevMidpoint = { x: (pts[0].x + pts[1].x) * 0.5, y: (pts[0].y + pts[1].y) * 0.5 };
    }
  });

  window.addEventListener('pointermove', e => {
    if (activePointers.has(e.pointerId)) {
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (activePointers.size === 2) {
      notifyCameraInteraction();
      const pts = Array.from(activePointers.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mid = { x: (pts[0].x + pts[1].x) * 0.5, y: (pts[0].y + pts[1].y) * 0.5 };

      const pinchDelta = prevPinchDist - dist;
      camRig.goalDistance += pinchDelta * 0.35;
      prevPinchDist = dist;

      const dx = mid.x - prevMidpoint.x;
      const dy = mid.y - prevMidpoint.y;
      prevMidpoint = mid;

      const panScale = camRig.distance * 0.0016;
      const forwardX = -Math.sin(camRig.theta);
      const forwardZ = -Math.cos(camRig.theta);
      const rightX = Math.cos(camRig.theta);
      const rightZ = -Math.sin(camRig.theta);

      camRig.goalTarget.x -= (rightX * dx - forwardX * dy) * panScale;
      camRig.goalTarget.z -= (rightZ * dx - forwardZ * dy) * panScale;
      return;
    }

    if (!camRig.isDragging) {
      handlePointerHover(e);
      return;
    }

    notifyCameraInteraction();
    const dx = e.clientX - camRig.prevMouse.x;
    const dy = e.clientY - camRig.prevMouse.y;
    camRig.prevMouse = { x: e.clientX, y: e.clientY };

    if (camRig.dragMode === 'ROTATE') {
      const dTheta = -dx * 0.0065;
      const dPhi = -dy * 0.0055;
      camRig.goalTheta += dTheta;
      camRig.goalPhi += dPhi;
      camRig.thetaVel = dTheta * 18;
      camRig.phiVel = dPhi * 18;
    } else {
      const panScale = camRig.distance * 0.0014;
      const forwardX = -Math.sin(camRig.theta);
      const forwardZ = -Math.cos(camRig.theta);
      const rightX = Math.cos(camRig.theta);
      const rightZ = -Math.sin(camRig.theta);

      const moveX = -(rightX * dx - forwardX * dy) * panScale;
      const moveZ = -(rightZ * dx - forwardZ * dy) * panScale;
      camRig.goalTarget.x += moveX;
      camRig.goalTarget.z += moveZ;
      camRig.panVelX = moveX * 16;
      camRig.panVelZ = moveZ * 16;
    }
  });

  const endPointer = e => {
    activePointers.delete(e.pointerId);
    if (activePointers.size === 0 && camRig.isDragging) {
      camRig.isDragging = false;
      const moveDist = Math.hypot(e.clientX - camRig.downMouse.x, e.clientY - camRig.downMouse.y);
      if (moveDist < 6 && e.target === canvas) {
        const now = performance.now();
        if (e.pointerType === 'touch' && now - lastTapTime < 320) {
          handleCanvasDoubleClick(e);
        } else {
          handleCanvasClick(e);
        }
        lastTapTime = now;
      }
    }
  };

  window.addEventListener('pointerup', endPointer);
  window.addEventListener('pointercancel', endPointer);

  canvas.addEventListener(
    'wheel',
    e => {
      e.preventDefault();
      notifyCameraInteraction();
      const dz = e.deltaY * 0.085;
      camRig.goalDistance += dz;
      camRig.zoomVel = dz * 8;
    },
    { passive: false }
  );

  setupOnScreenCameraButtons();
  setupMinimapInteraction();
  setupKeyboardShortcuts();
}

function setupOnScreenCameraButtons() {
  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        notifyCameraInteraction();
        fn();
      });
    }
  };

  bind('cam-rot-left-btn', () => {
    camRig.goalTheta += 0.32;
  });
  bind('cam-rot-right-btn', () => {
    camRig.goalTheta -= 0.32;
  });
  bind('cam-tilt-up-btn', () => {
    camRig.goalPhi -= 0.14;
  });
  bind('cam-tilt-down-btn', () => {
    camRig.goalPhi += 0.14;
  });
  bind('cam-zoom-in-btn', () => {
    camRig.goalDistance -= 22;
  });
  bind('cam-zoom-out-btn', () => {
    camRig.goalDistance += 22;
  });

  const idleBtn = document.getElementById('cam-idle-toggle-btn');
  if (idleBtn) {
    idleBtn.classList.toggle('active', camRig.idleOrbitEnabled);
    idleBtn.addEventListener('click', () => {
      camRig.idleOrbitEnabled = !camRig.idleOrbitEnabled;
      if (camRig.idleOrbitEnabled) {
        camRig.idleTimer = 8.1;
      } else {
        camRig.isIdleOrbiting = false;
      }
      idleBtn.classList.toggle('active', camRig.idleOrbitEnabled);
    });
  }
}

function setupMinimapInteraction() {
  const mmCanvas = document.getElementById('city-minimap');
  const toggleBtn = document.getElementById('minimap-toggle-btn');
  if (!mmCanvas) return;

  let mmDragging = false;
  const moveCamFromMinimap = e => {
    const rect = mmCanvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const nz = (e.clientY - rect.top) / rect.height;
    const worldX = (nx - 0.5) * 250;
    const worldZ = (nz - 0.5) * 240 + 8;
    flyCameraTo({ x: worldX, y: 4, z: worldZ }, camRig.goalDistance, camRig.goalTheta, camRig.goalPhi, 0.45);
  };

  mmCanvas.addEventListener('pointerdown', e => {
    mmDragging = true;
    moveCamFromMinimap(e);
  });
  window.addEventListener('pointermove', e => {
    if (mmDragging) moveCamFromMinimap(e);
  });
  window.addEventListener('pointerup', () => {
    mmDragging = false;
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const hidden = mmCanvas.style.display === 'none';
      mmCanvas.style.display = hidden ? 'block' : 'none';
      toggleBtn.textContent = hidden ? '−' : '+';
    });
  }
}

export function updateMinimap() {
  const mmCanvas = document.getElementById('city-minimap');
  if (!mmCanvas || mmCanvas.style.display === 'none') return;
  const ctx = mmCanvas.getContext('2d');
  const w = mmCanvas.width;
  const h = mmCanvas.height;

  ctx.fillStyle = '#0c141d';
  ctx.fillRect(0, 0, w, h);

  const toMapX = wx => (wx / 250 + 0.5) * w;
  const toMapY = wz => ((wz - 8) / 240 + 0.5) * h;

  // Canal stripe on west edge
  ctx.fillStyle = '#154463';
  ctx.fillRect(toMapX(-122), 0, 5, h);

  // Sector Districts
  SECTORS.forEach(s => {
    const x = toMapX(s.center.x - s.size.w * 0.5);
    const y = toMapY(s.center.z - s.size.d * 0.5);
    const rw = (s.size.w / 250) * w;
    const rh = (s.size.d / 240) * h;

    ctx.fillStyle = s.color + '33';
    ctx.fillRect(x, y, rw, rh);
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, rw, rh);
  });

  // Central Exchange
  ctx.fillStyle = '#4b8be8';
  ctx.beginPath();
  ctx.arc(toMapX(0), toMapY(-24), 5, 0, Math.PI * 2);
  ctx.fill();

  // Selected Company Highlight Dot
  const sel = store.getViewState().selectedObject;
  if (sel && sel.type === 'COMPANY') {
    const c = store.getViewState().companies.find(item => item.id === sel.id);
    if (c) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(toMapX(c.pos.x), toMapY(c.pos.z), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Camera Target & Frustum Cone
  const tx = toMapX(camRig.target.x);
  const ty = toMapY(camRig.target.z);
  const coneLen = Math.max(12, Math.min(38, (camRig.distance / 220) * 36));
  const dirAngle = Math.atan2(-Math.sin(camRig.theta), -Math.cos(camRig.theta)) - Math.PI / 2;

  ctx.save();
  ctx.translate(tx, ty);
  ctx.rotate(dirAngle);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-coneLen * 0.65, -coneLen);
  ctx.lineTo(coneLen * 0.65, -coneLen);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#ffd27d';
  ctx.beginPath();
  ctx.arc(tx, ty, 3, 0, Math.PI * 2);
  ctx.fill();
}

function setupKeyboardShortcuts() {
  const viewKeys = {
    '1': 'overview',
    '2': 'explore',
    '3': 'companies',
    '4': 'sectors',
    '5': 'indices',
    '6': 'compare',
    '7': 'watchlist',
    '8': 'portfolio',
    '9': 'whatif',
    '0': 'learn'
  };

  window.addEventListener('keydown', e => {
    if (hasFocusedControl(document.body)) {
      if (e.key === 'Escape') {
        document.activeElement.blur();
      }
      return;
    }

    if (viewKeys[e.key]) {
      e.preventDefault();
      switchLeftNavView(viewKeys[e.key]);
    } else if (e.code === 'Space') {
      e.preventDefault();
      const live = store.getLiveState();
      live.simRunning = !live.simRunning;
      returnToLiveReplay();
      const btn = document.getElementById('sim-play-pause-btn');
      if (btn) btn.textContent = live.simRunning ? '⏸ Pause' : '▶ Resume';
      update3DCityFromState(store.getViewState());
      updateTopBarAndSummaryCards(store.getViewState());
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      const sel = store.getViewState().selectedObject;
      if (sel) {
        selectWorldObject(sel.type, sel.id, true, true);
      } else {
        applyCameraPreset('EXCHANGE');
      }
    } else if (e.key === 'Escape') {
      const modal = document.getElementById('modal-backdrop');
      if (modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
      } else {
        clearSelection();
      }
    } else if (e.key === '/') {
      e.preventDefault();
      const search = document.getElementById('global-search');
      if (search) search.focus();
    } else if (e.key === '?') {
      e.preventDefault();
      openShortcutsModal();
    }
  });
}