/**
 * Spherical Orbit, Pan & Zoom Camera Rig with Inertia/Damping, Min/Max Bounds,
 * GSAP Smooth Transitions, Gentle Idle Orbit, and Skippable 5s Cinematic Fly-In.
 */
import * as THREE from 'three';
import gsap from 'gsap';
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
  // Inertia velocities
  thetaVel: 0,
  phiVel: 0,
  panVelX: 0,
  panVelZ: 0,
  zoomVel: 0,
  // Interaction & Idle Orbit state
  isDragging: false,
  dragMode: 'PAN',
  prevMouse: { x: 0, y: 0 },
  downMouse: { x: 0, y: 0 },
  idleTimer: 0,
  idleOrbitEnabled: true,
  isIdleOrbiting: false,
  isFlyInActive: false
};

let activeTween = null;

export const CAMERA_PRESETS = {
  ENTIRE: { target: { x: 0, y: 0, z: 10 }, distance: 165, theta: 0.48, phi: 0.90 },
  EXCHANGE: { target: { x: 0, y: 8, z: -18 }, distance: 68, theta: 0.35, phi: 1.02 },
  TECH: { target: { x: 75, y: 6, z: -25 }, distance: 76, theta: -0.45, phi: 0.96 },
  BANKING: { target: { x: -75, y: 6, z: -25 }, distance: 76, theta: 0.55, phi: 0.96 },
  INFRA: { target: { x: 0, y: 4, z: 86 }, distance: 82, theta: 0.0, phi: 0.95 },
  LEARN: { target: { x: 0, y: 4, z: 48 }, distance: 72, theta: 0.25, phi: 0.98 }
};

export function clampCameraGoals() {
  camRig.goalDistance = Math.max(24, Math.min(245, camRig.goalDistance));
  camRig.goalPhi = Math.max(0.32, Math.min(1.42, camRig.goalPhi));
  camRig.goalTarget.x = Math.max(-125, Math.min(125, camRig.goalTarget.x));
  camRig.goalTarget.z = Math.max(-115, Math.min(115, camRig.goalTarget.z));
}

export function notifyCameraInteraction() {
  camRig.idleTimer = 0;
  camRig.isIdleOrbiting = false;
  if (camRig.isFlyInActive) {
    skipCinematicFlyIn();
  }
  if (activeTween) {
    activeTween.kill();
    activeTween = null;
  }
}

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
  clampCameraGoals();
  camRig.target.copy(camRig.goalTarget);
  camRig.distance = camRig.goalDistance;
  camRig.theta = camRig.goalTheta;
  camRig.phi = camRig.goalPhi;
  applySphericalToCamera();
}

export function flyCameraTo(targetVec, distance = 68, theta = camRig.goalTheta, phi = 0.96, duration = 1.15) {
  if (activeTween) {
    activeTween.kill();
    activeTween = null;
  }

  camRig.thetaVel = 0;
  camRig.phiVel = 0;
  camRig.panVelX = 0;
  camRig.panVelZ = 0;
  camRig.zoomVel = 0;
  camRig.idleTimer = 0;

  camRig.goalTarget.set(targetVec.x, targetVec.y || 4, targetVec.z);
  camRig.goalDistance = distance;
  camRig.goalTheta = theta;
  camRig.goalPhi = phi;
  clampCameraGoals();

  if (store.getViewState().reducedMotion) {
    updateCameraImmediate();
    return;
  }

  const proxy = {
    tx: camRig.target.x,
    ty: camRig.target.y,
    tz: camRig.target.z,
    dist: camRig.distance,
    th: camRig.theta,
    ph: camRig.phi
  };

  activeTween = gsap.to(proxy, {
    tx: camRig.goalTarget.x,
    ty: camRig.goalTarget.y,
    tz: camRig.goalTarget.z,
    dist: camRig.goalDistance,
    th: camRig.goalTheta,
    ph: camRig.goalPhi,
    duration,
    ease: 'power3.out',
    onUpdate: () => {
      camRig.target.set(proxy.tx, proxy.ty, proxy.tz);
      camRig.goalTarget.copy(camRig.target);
      camRig.distance = proxy.dist;
      camRig.theta = proxy.th;
      camRig.phi = proxy.ph;
    },
    onComplete: () => {
      activeTween = null;
    }
  });
}

export function applyCameraPreset(presetKey) {
  const p = CAMERA_PRESETS[presetKey] || CAMERA_PRESETS.ENTIRE;
  flyCameraTo(p.target, p.distance, p.theta, p.phi);
}

/**
 * Starts the 5-second skippable cinematic fly-in across the city on first visit.
 */
export function startCinematicFlyIn(onFinish) {
  if (store.getViewState().reducedMotion) {
    applyCameraPreset('ENTIRE');
    if (onFinish) onFinish();
    return;
  }

  camRig.isFlyInActive = true;
  const banner = document.getElementById('flyin-banner');
  if (banner) banner.style.display = 'flex';

  // Start high and wide, sweeping around the Central Exchange to the Entire Market overlook
  camRig.target.set(0, 12, -20);
  camRig.goalTarget.copy(camRig.target);
  camRig.distance = 235;
  camRig.goalDistance = 235;
  camRig.theta = -0.85;
  camRig.goalTheta = -0.85;
  camRig.phi = 1.18;
  camRig.goalPhi = 1.18;
  applySphericalToCamera();

  const endPreset = CAMERA_PRESETS.ENTIRE;
  const proxy = {
    tx: camRig.target.x,
    ty: camRig.target.y,
    tz: camRig.target.z,
    dist: camRig.distance,
    th: camRig.theta,
    ph: camRig.phi
  };

  activeTween = gsap.to(proxy, {
    tx: endPreset.target.x,
    ty: endPreset.target.y,
    tz: endPreset.target.z,
    dist: endPreset.distance,
    th: endPreset.theta,
    ph: endPreset.phi,
    duration: 5.0,
    ease: 'power2.inOut',
    onUpdate: () => {
      camRig.target.set(proxy.tx, proxy.ty, proxy.tz);
      camRig.goalTarget.copy(camRig.target);
      camRig.distance = proxy.dist;
      camRig.goalDistance = proxy.dist;
      camRig.theta = proxy.th;
      camRig.goalTheta = proxy.th;
      camRig.phi = proxy.ph;
      camRig.goalPhi = proxy.ph;
    },
    onComplete: () => {
      camRig.isFlyInActive = false;
      activeTween = null;
      if (banner) banner.style.display = 'none';
      if (onFinish) onFinish();
    }
  });
}

export function skipCinematicFlyIn() {
  if (!camRig.isFlyInActive) return;
  camRig.isFlyInActive = false;
  if (activeTween) {
    activeTween.kill();
    activeTween = null;
  }
  const banner = document.getElementById('flyin-banner');
  if (banner) banner.style.display = 'none';
  applyCameraPreset('ENTIRE');
}

export function updateCameraRig(dt) {
  const reduced = store.getViewState().reducedMotion;

  if (!activeTween && !camRig.isFlyInActive) {
    // Apply inertia velocities with exponential damping
    const damping = Math.pow(0.0015, dt);
    if (!camRig.isDragging) {
      camRig.goalTheta += camRig.thetaVel * dt;
      camRig.goalPhi += camRig.phiVel * dt;
      camRig.goalTarget.x += camRig.panVelX * dt;
      camRig.goalTarget.z += camRig.panVelZ * dt;
      camRig.goalDistance += camRig.zoomVel * dt;

      camRig.thetaVel *= damping;
      camRig.phiVel *= damping;
      camRig.panVelX *= damping;
      camRig.panVelZ *= damping;
      camRig.zoomVel *= damping;
    }

    // Gentle idle orbit after 8 seconds of no interaction
    if (!camRig.isDragging && camRig.idleOrbitEnabled && !reduced) {
      camRig.idleTimer += dt;
      if (camRig.idleTimer > 8.0) {
        camRig.isIdleOrbiting = true;
        camRig.goalTheta += dt * 0.085;
      }
    }

    clampCameraGoals();

    if (reduced) {
      updateCameraImmediate();
      return;
    }

    const lerpFactor = 1 - Math.pow(0.0008, dt);
    camRig.target.lerp(camRig.goalTarget, lerpFactor);
    camRig.distance += (camRig.goalDistance - camRig.distance) * lerpFactor;
    camRig.theta += (camRig.goalTheta - camRig.theta) * lerpFactor;
    camRig.phi += (camRig.goalPhi - camRig.phi) * lerpFactor;
  }

  applySphericalToCamera();
}