/**
 * Raycaster Object Selection & Camera Focus.
 */
import * as THREE from 'three';
import { camera, renderer, interactiveMeshes, webglAvailable } from '../world/scene.js';
import { company3DMap, update3DCityFromState } from '../world/buildings.js';
import { SECTOR_MAP } from '../data/sectors.js';
import { INFRA_FACILITIES } from '../data/infrastructure.js';
import { LEARNING_LANDMARKS } from '../data/landmarks.js';
import { camRig, flyCameraTo, applyCameraPreset } from './cameraRig.js';
import { store } from '../state/store.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function selectWorldObject(type, id, focusCamera = true) {
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
      flyCameraTo({ x: c.pos.x, y: h * 0.5, z: c.pos.z }, 48, camRig.goalTheta, 0.98);
    }
  } else if (type === 'SECTOR') {
    const s = SECTOR_MAP[id];
    if (s && focusCamera) {
      flyCameraTo({ x: s.center.x, y: 5, z: s.center.z }, 74, camRig.goalTheta, 0.95);
    }
  } else if (type === 'EXCHANGE') {
    if (focusCamera) applyCameraPreset('EXCHANGE');
  } else if (type === 'INFRA') {
    const fac = INFRA_FACILITIES.find(x => x.id === id);
    if (fac && focusCamera) {
      flyCameraTo({ x: fac.pos.x, y: 6, z: fac.pos.z }, 45, 0.0, 0.98);
    }
  } else if (type === 'LEARN') {
    const lm = LEARNING_LANDMARKS.find(x => x.id === id);
    if (lm && focusCamera) {
      flyCameraTo({ x: lm.pos.x, y: 5, z: lm.pos.z }, 42, 0.15, 0.98);
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

export function handleCanvasClick(e) {
  if (!webglAvailable || !renderer || !camera) return;
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveMeshes, false);

  if (intersects.length > 0) {
    const hit = intersects[0].object.userData;
    if (hit && hit.type && hit.id) {
      selectWorldObject(hit.type, hit.id, true);
    }
  }
}