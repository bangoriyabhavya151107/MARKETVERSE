/**
 * Post-Processing Pipeline (EffectComposer + RenderPass + UnrealBloomPass + OutputPass)
 * with Quality Tier support (LOW / MEDIUM / HIGH / AUTO).
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { scene, camera, renderer, webglAvailable, applyQualityToRenderer } from './scene.js';
import { updateLightingShadowQuality } from './lighting.js';
import { store } from '../state/store.js';

let composer = null;
let bloomPass = null;

export function initPostFX() {
  if (!webglAvailable || !renderer || !scene || !camera) return;

  composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.32, // strength
    0.45, // radius
    0.82  // threshold
  );
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  syncQualitySettings(store.getLiveState().graphicsQuality);

  window.addEventListener('resize', () => {
    if (!composer) return;
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

export function syncQualitySettings(qualityChoice = store.getLiveState().graphicsQuality) {
  const resolved = applyQualityToRenderer(qualityChoice);
  updateLightingShadowQuality(resolved);

  if (composer && bloomPass) {
    if (resolved === 'HIGH') {
      bloomPass.enabled = true;
      bloomPass.strength = 0.34;
    } else if (resolved === 'MEDIUM') {
      bloomPass.enabled = true;
      bloomPass.strength = 0.2;
    } else {
      bloomPass.enabled = false;
    }
    composer.setSize(window.innerWidth, window.innerHeight);
  }
}

export function renderFrame() {
  if (!webglAvailable || !renderer || !scene || !camera) return;
  const resolved = store.getLiveState().resolvedQuality;
  if (composer && resolved !== 'LOW') {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}