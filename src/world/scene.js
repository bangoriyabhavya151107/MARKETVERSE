/**
 * Core Three.js Scene, Camera, WebGLRenderer initialization, and Quality Tier Auto-Detection.
 */
import * as THREE from 'three';
import { store } from '../state/store.js';

export let scene = null;
export let camera = null;
export let renderer = null;
export let webglAvailable = false;
export const interactiveMeshes = [];

/**
 * Auto-detects optimal graphics quality tier based on device memory, CPU cores, and mobile screen.
 */
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

export function initScene() {
  const canvas = document.getElementById('city-canvas');
  const fallbackEl = document.getElementById('webgl-fallback');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d151d);
  scene.fog = new THREE.FogExp2(0x0d151d, 0.0021);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 850);

  try {
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL context could not be created.');
    }

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
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

  return { scene, camera, renderer, webglAvailable };
}