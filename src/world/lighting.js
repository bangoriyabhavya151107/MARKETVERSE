/**
 * City Lighting (Ambient, Hemisphere, and Directional Sun with shadow frustum).
 */
import * as THREE from 'three';
import { scene } from './scene.js';

export let ambientLight = null;
export let hemiLight = null;
export let sunLight = null;

export function buildLighting() {
  if (!scene) return;

  ambientLight = new THREE.AmbientLight(0xd9e4f0, 0.65);
  scene.add(ambientLight);

  hemiLight = new THREE.HemisphereLight(0x8bb8e8, 0x18222c, 0.45);
  scene.add(hemiLight);

  sunLight = new THREE.DirectionalLight(0xfff4e0, 0.95);
  sunLight.position.set(95, 140, 85);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near = 20;
  sunLight.shadow.camera.far = 350;
  const d = 140;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight);
}