/**
 * Weather particles and Day/Night atmosphere controller using `visualRng`.
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { ambientLight, sunLight } from './lighting.js';
import { streetLightBulbMesh } from './instancing.js';
import { visualRng } from '../engine/rng.js';

export let rainPoints = null;

export function buildRainParticles() {
  if (!scene) return;

  const count = 650;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = visualRng.range(-120, 120);
    positions[i * 3 + 1] = visualRng.range(2, 95);
    positions[i * 3 + 2] = visualRng.range(-110, 110);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0x90b8e0, size: 0.75, transparent: true, opacity: 0.65 });
  rainPoints = new THREE.Points(geo, mat);
  rainPoints.visible = false;
  scene.add(rainPoints);
}

export function applyWeatherAndLighting(viewState) {
  if (!scene || !ambientLight || !sunLight) return;

  const mode = viewState.weather;
  const night = viewState.isNight || mode === 'NIGHT';

  if (night) {
    scene.background.setHex(0x060b10);
    scene.fog.color.setHex(0x060b10);
    scene.fog.density = 0.0025;
    ambientLight.intensity = 0.28;
    sunLight.intensity = 0.22;
    if (streetLightBulbMesh) streetLightBulbMesh.material.color.setHex(0xffd27d);
  } else if (mode === 'EVENING') {
    scene.background.setHex(0x1b1e2b);
    scene.fog.color.setHex(0x1b1e2b);
    scene.fog.density = 0.0024;
    ambientLight.intensity = 0.48;
    sunLight.color.setHex(0xffae70);
    sunLight.intensity = 0.75;
    if (streetLightBulbMesh) streetLightBulbMesh.material.color.setHex(0xffd27d);
  } else if (mode === 'CLOUDY' || mode === 'RAIN') {
    scene.background.setHex(0x162029);
    scene.fog.color.setHex(0x162029);
    scene.fog.density = 0.0034;
    ambientLight.intensity = 0.55;
    sunLight.intensity = 0.45;
    if (streetLightBulbMesh) streetLightBulbMesh.material.color.setHex(0x778899);
  } else {
    scene.background.setHex(0x0f1923);
    scene.fog.color.setHex(0x0f1923);
    scene.fog.density = 0.0019;
    ambientLight.intensity = 0.68;
    sunLight.color.setHex(0xfff4e0);
    sunLight.intensity = 0.95;
    if (streetLightBulbMesh) streetLightBulbMesh.material.color.setHex(0x556677);
  }

  if (rainPoints) {
    rainPoints.visible = mode === 'RAIN';
  }
}

export function updateRainParticles(dt, reducedMotion) {
  if (!rainPoints || !rainPoints.visible || reducedMotion) return;
  const posAttr = rainPoints.geometry.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    let y = posAttr.getY(i) - 48 * dt;
    if (y < 1) y = 90;
    posAttr.setY(i, y);
  }
  posAttr.needsUpdate = true;
}