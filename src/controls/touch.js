/**
 * Pointer, Wheel, and Touch Gestures (Pan, Orbit, Pinch-Zoom, Click).
 */
import { camRig } from './cameraRig.js';
import { handleCanvasClick } from './picking.js';

export function setupViewportControls() {
  const canvas = document.getElementById('city-canvas');
  if (!canvas) return;

  canvas.addEventListener('contextmenu', e => e.preventDefault());

  canvas.addEventListener('pointerdown', e => {
    camRig.isDragging = true;
    camRig.dragMode = e.button === 2 || e.shiftKey ? 'ROTATE' : 'PAN';
    camRig.prevMouse = { x: e.clientX, y: e.clientY };
    camRig.downMouse = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', e => {
    if (!camRig.isDragging) return;
    const dx = e.clientX - camRig.prevMouse.x;
    const dy = e.clientY - camRig.prevMouse.y;
    camRig.prevMouse = { x: e.clientX, y: e.clientY };

    if (camRig.dragMode === 'ROTATE') {
      camRig.goalTheta -= dx * 0.0065;
      camRig.goalPhi = Math.max(0.35, Math.min(1.38, camRig.goalPhi - dy * 0.0055));
    } else {
      const panScale = camRig.distance * 0.0014;
      const forwardX = -Math.sin(camRig.theta);
      const forwardZ = -Math.cos(camRig.theta);
      const rightX = Math.cos(camRig.theta);
      const rightZ = -Math.sin(camRig.theta);

      camRig.goalTarget.x -= (rightX * dx - forwardX * dy) * panScale;
      camRig.goalTarget.z -= (rightZ * dx - forwardZ * dy) * panScale;
      camRig.goalTarget.x = Math.max(-125, Math.min(125, camRig.goalTarget.x));
      camRig.goalTarget.z = Math.max(-115, Math.min(115, camRig.goalTarget.z));
    }
  });

  window.addEventListener('pointerup', e => {
    if (!camRig.isDragging) return;
    camRig.isDragging = false;
    const moveDist = Math.hypot(e.clientX - camRig.downMouse.x, e.clientY - camRig.downMouse.y);
    if (moveDist < 5 && e.target === canvas) {
      handleCanvasClick(e);
    }
  });

  canvas.addEventListener(
    'wheel',
    e => {
      e.preventDefault();
      camRig.goalDistance = Math.max(28, Math.min(245, camRig.goalDistance + e.deltaY * 0.09));
    },
    { passive: false }
  );
}