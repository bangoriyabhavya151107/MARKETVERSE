/**
 * Key Directional Light with Camera-Following Tight Shadow Frustum (2048 map),
 * Hemisphere Fill, and Soft Baked-Looking Contact Shadow Decals (AO Approximation).
 */
import * as THREE from 'three';
import { scene } from './scene.js';
import { store } from '../state/store.js';

export let ambientLight = null;
export let hemiLight = null;
export let sunLight = null;
export let sunTarget = null;

let sharedContactShadowMaterial = null;
let sharedContactShadowGeo = null;

/**
 * Creates a shared soft radial gradient CanvasTexture for baked-looking AO contact shadows.
 */
export function createContactShadowMesh(width = 8, depth = 8, opacity = 0.58) {
  if (!sharedContactShadowMaterial) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 62);
    grad.addColorStop(0.0, 'rgba(4, 8, 14, 0.88)');
    grad.addColorStop(0.55, 'rgba(6, 12, 20, 0.48)');
    grad.addColorStop(1.0, 'rgba(6, 12, 20, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);
    sharedContactShadowMaterial = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });

    sharedContactShadowGeo = new THREE.PlaneGeometry(1, 1);
    sharedContactShadowGeo.rotateX(-Math.PI / 2);
  }

  const mesh = new THREE.Mesh(sharedContactShadowGeo, sharedContactShadowMaterial);
  mesh.scale.set(width, 1, depth);
  mesh.position.y = 0.04;
  return mesh;
}

export function buildLighting() {
  if (!scene) return;

  ambientLight = new THREE.AmbientLight(0xd9e4f0, 0.48);
  scene.add(ambientLight);

  hemiLight = new THREE.HemisphereLight(0x8bb8e8, 0x18222c, 0.55);
  hemiLight.position.set(0, 120, 0);
  scene.add(hemiLight);

  sunTarget = new THREE.Object3D();
  sunTarget.position.set(0, 0, 10);
  scene.add(sunTarget);

  sunLight = new THREE.DirectionalLight(0xfff4e0, 1.15);
  sunLight.position.set(85, 135, 85);
  sunLight.target = sunTarget;

  const resolved = store.getLiveState().resolvedQuality;
  sunLight.castShadow = resolved !== 'LOW';
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 15;
  sunLight.shadow.camera.far = 340;
  sunLight.shadow.bias = -0.0004;
  sunLight.shadow.normalBias = 0.02;

  const d = 95;
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

/**
 * Keeps the directional shadow frustum tightly centered on the camera's target
 * and adjusts its bounds based on zoom distance for crisp close-up and wide shadows.
 */
export function updateCameraFollowingShadow(camTarget, camDistance, sunOffsetVec) {
  if (!sunLight || !sunTarget) return;

  // Snap target to 2-unit grid to prevent sub-texel shadow swimming when panning
  const snapX = Math.round(camTarget.x * 0.5) * 2;
  const snapZ = Math.round(camTarget.z * 0.5) * 2;

  sunTarget.position.set(snapX, 0, snapZ);
  sunLight.position.set(
    snapX + sunOffsetVec.x,
    sunOffsetVec.y,
    snapZ + sunOffsetVec.z
  );

  const halfExtent = Math.round(Math.max(48, Math.min(125, camDistance * 0.68)));
  const cam = sunLight.shadow.camera;
  if (cam.right !== halfExtent) {
    cam.left = -halfExtent;
    cam.right = halfExtent;
    cam.top = halfExtent;
    cam.bottom = -halfExtent;
    cam.updateProjectionMatrix();
  }
}