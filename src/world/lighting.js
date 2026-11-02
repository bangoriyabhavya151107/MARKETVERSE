/**
 * City Lighting (Ambient, Hemisphere, and Directional Sun with shadow frustum).
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { store } from '../state/store.js';

export let ambientLight = null;
export let hemiLight = null;
export let sunLight = null;

export function buildLighting() {
  if (!scene) return;

  ambientLight = new THREE.AmbientLight(0xd9e4f0, 0.65);
  scene.add(ambientLight);

  hemiLight = new THREE.HemisphereLight(0x8bb8e8, 0x18222c, 0.48);
  scene.add(hemiLight);

  sunLight = new THREE.DirectionalLight(0xfff4e0, 1.02);
  sunLight.position.set(105, 150, 90);

  const resolved = store.getLiveState().resolvedQuality;
  sunLight.castShadow = resolved !== 'LOW';
  const mapSz = resolved === 'HIGH' ? 2048 : 1024;
  sunLight.shadow.mapSize.width = mapSz;
  sunLight.shadow.mapSize.height = mapSz;
  sunLight.shadow.camera.near = 20;
  sunLight.shadow.camera.far = 380;
  sunLight.shadow.bias = -0.0005;
  const d = 150;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight);
}

export function updateLightingShadowQuality(resolvedQuality) {
  if (!sunLight) return;
  sunLight.castShadow = resolvedQuality !== 'LOW';
}