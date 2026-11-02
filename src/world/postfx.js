/**
 * Render pipeline wrapper (Stage 1 direct WebGLRenderer pass; ready for Stage 2+ EffectComposer).
 */
import { scene, camera, renderer, webglAvailable } from './scene.js';

export function renderFrame() {
  if (!webglAvailable || !renderer || !scene || !camera) return;
  renderer.render(scene, camera);
}