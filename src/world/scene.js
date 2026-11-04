/**
 * Core Three.js Scene, Camera, WebGLRenderer initialization, Quality Tier Auto-Detection,
 * Adaptive Pixel-Ratio Scaling, Live Render Telemetry, and Resource Disposal on Teardown.
 */
import * as THREE from 'three';
import { store } from '../state/store.js';

export let scene = null;
export let camera = null;
export let renderer = null;
export let webglAvailable = false;
export const interactiveMeshes = [];

let smoothedFps = 60;
let lowFpsStreak = 0;
let highFpsStreak = 0;

export function detectHardwareQuality() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;

  if (isMobile || cores <= 2 || mem <= 2) return 'LOW';
  if (cores <= 4 || mem <= 4) return 'MEDIUM';
  return 'HIGH';
}

export function applyQualityToRenderer(qualityChoice = store.getLiveState().graphicsQuality) {
  const live = store.getLiveState();
  live.graphicsQuality = qualityChoice;
  const resolved = qualityChoice === 'AUTO' ? detectHardwareQuality() : qualityChoice;
  live.resolvedQuality = resolved;

  if (!renderer || !webglAvailable) return resolved;

  const dpr = window.devicePixelRatio || 1;
  if (resolved === 'LOW') {
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = false;
  } else if (resolved === 'MEDIUM') {
    renderer.setPixelRatio(Math.min(dpr, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
  } else {
    renderer.setPixelRatio(Math.min(dpr, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  return resolved;
}

/**
 * Dynamically adapts pixel ratio in AUTO mode if frame rate dips below 34 FPS.
 */
export function updateAdaptivePixelRatio(dt) {
  if (!renderer || !webglAvailable || dt <= 0) return;
  const currentFps = 1 / dt;
  smoothedFps = smoothedFps * 0.92 + currentFps * 0.08;

  const live = store.getLiveState();
  if (live.graphicsQuality !== 'AUTO') return;

  if (smoothedFps < 34) {
    lowFpsStreak++;
    highFpsStreak = 0;
    if (lowFpsStreak > 45 && renderer.getPixelRatio() > 1.0) {
      renderer.setPixelRatio(1.0);
      lowFpsStreak = 0;
    }
  } else if (smoothedFps > 55) {
    highFpsStreak++;
    lowFpsStreak = 0;
    const targetDpr = Math.min(window.devicePixelRatio || 1, live.resolvedQuality === 'HIGH' ? 2.0 : 1.5);
    if (highFpsStreak > 120 && renderer.getPixelRatio() < targetDpr) {
      renderer.setPixelRatio(targetDpr);
      highFpsStreak = 0;
    }
  }
}

/**
 * Returns live FPS, draw call count, and triangle count from WebGLRenderer.
 */
export function getRenderTelemetry() {
  if (!renderer || !webglAvailable) {
    return { fps: 0, calls: 0, triangles: 0, geometries: 0, textures: 0 };
  }
  return {
    fps: Math.round(smoothedFps),
    calls: renderer.info.render.calls,
    triangles: renderer.info.render.triangles,
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures
  };
}

/**
 * Traverses the scene and disposes all geometries, materials, and textures on teardown.
 */
export function disposeSceneResources() {
  if (!scene) return;
  scene.traverse(obj => {
    if (obj.geometry) {
      obj.geometry.dispose();
    }
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(m => {
        if (m.map) m.map.dispose();
        if (m.emissiveMap) m.emissiveMap.dispose();
        m.dispose();
      });
    }
  });
  if (renderer) {
    renderer.dispose();
  }
}

export function initScene() {
  const canvas = document.getElementById('city-canvas');
  const fallbackEl = document.getElementById('webgl-fallback');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d151d);
  scene.fog = new THREE.FogExp2(0x0d151d, 0.0021);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 850);

  try {
    const gl =
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true }) ||
      canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true });
    if (!gl) {
      throw new Error('WebGL context could not be created.');
    }

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    webglAvailable = true;

    applyQualityToRenderer(store.getLiveState().graphicsQuality);
  } catch (err) {
    console.warn('MarketVerse WebGL initialization failed, activating 2D fallback:', err);
    webglAvailable = false;
    if (canvas) canvas.style.display = 'none';
    if (fallbackEl) fallbackEl.style.display = 'flex';
  }

  window.addEventListener('resize', () => {
    if (!camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if (renderer && webglAvailable) {
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  });

  window.addEventListener('beforeunload', disposeSceneResources);

  return { scene, camera, renderer, webglAvailable };
}