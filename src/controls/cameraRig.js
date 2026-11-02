/**
 * Spherical Orbit & Pan Camera Rig with Preset Destinations.
 */
import * as THREE from 'three';
import { camera } from '../world/scene.js';
import { store } from '../state/store.js';

export const camRig = {
  target: new THREE.Vector3(0, 0, 10),
  goalTarget: new THREE.Vector3(0, 0, 10),
  distance: 155,
  goalDistance: 155,
  theta: 0.52,
  goalTheta: 0.52,
  phi: 0.92,
  goalPhi: 0.92,
  isDragging: false,
  dragMode: 'PAN',
  prevMouse: { x: 0, y: 0 },
  downMouse: { x: 0, y: 0 }
};

export const CAMERA_PRESETS = {
  ENTIRE: { target: { x: 0, y: 0, z: 10 }, distance: 165, theta: 0.48, phi: 0.90 },
  EXCHANGE: { target: { x: 0, y: 8, z: -18 }, distance: 68, theta: 0.35, phi: 1.02 },
  TECH: { target: { x: 75, y: 6, z: -25 }, distance: 76, theta: -0.45, phi: 0.96 },
  BANKING: { target: { x: -75, y: 6, z: -25 }, distance: 76, theta: 0.55, phi: 0.96 },
  INFRA: { target: { x: 0, y: 4, z: 86 }, distance: 82, theta: 0.0, phi: 0.95 },
  LEARN: { target: { x: 0, y: 4, z: 48 }, distance: 72, theta: 0.25, phi: 0.98 }
};

export function applySphericalToCamera() {
  if (!camera) return;
  const sinPhi = Math.sin(camRig.phi);
  const cosPhi = Math.cos(camRig.phi);
  const sinTheta = Math.sin(camRig.theta);
  const cosTheta = Math.cos(camRig.theta);

  camera.position.x = camRig.target.x + camRig.distance * sinPhi * sinTheta;
  camera.position.y = camRig.target.y + camRig.distance * cosPhi;
  camera.position.z = camRig.target.z + camRig.distance * sinPhi * cosTheta;
  camera.lookAt(camRig.target);
}

export function updateCameraImmediate() {
  camRig.target.copy(camRig.goalTarget);
  camRig.distance = camRig.goalDistance;
  camRig.theta = camRig.goalTheta;
  camRig.phi = camRig.goalPhi;
  applySphericalToCamera();
}

export function flyCameraTo(targetVec, distance = 68, theta = camRig.goalTheta, phi = 0.96) {
  camRig.goalTarget.set(targetVec.x, targetVec.y || 4, targetVec.z);
  camRig.goalDistance = distance;
  camRig.goalTheta = theta;
  camRig.goalPhi = phi;
  if (store.getViewState().reducedMotion) {
    updateCameraImmediate();
  }
}

export function applyCameraPreset(presetKey) {
  const p = CAMERA_PRESETS[presetKey] || CAMERA_PRESETS.ENTIRE;
  flyCameraTo(p.target, p.distance, p.theta, p.phi);
}

export function updateCameraRig(dt) {
  if (!store.getViewState().reducedMotion) {
    const lerpFactor = 1 - Math.pow(0.001, dt);
    camRig.target.lerp(camRig.goalTarget, lerpFactor);
    camRig.distance += (camRig.goalDistance - camRig.distance) * lerpFactor;
    camRig.theta += (camRig.goalTheta - camRig.theta) * lerpFactor;
    camRig.phi += (camRig.goalPhi - camRig.phi) * lerpFactor;
  }
  applySphericalToCamera();
}