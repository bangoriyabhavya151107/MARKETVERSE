
/**
 * Core Three.js Scene, Camera, and WebGLRenderer initialization
 * with graceful fallback if WebGL is unsupported or disabled.
 */
import * as THREE from 'three';

export let scene = null;
export let camera = null;
export let renderer = null;
export let webglAvailable = false;
export const interactiveMeshes = [];

export function initScene() {
  const canvas = document.getElementById('city-canvas');
  const fallbackEl = document.getElementById('webgl-fallback');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d151d);
  scene.fog = new THREE.FogExp2(0x0d151d, 0.0022);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 800);

  try {
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL context could not be created.');
    }

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    webglAvailable = true;
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

  return { scene, camera, renderer, webglAvailable };
}