/**
 * Post-Processing Pipeline (EffectComposer):
 * - RenderPass
 * - Selective UnrealBloomPass (only emissive windows, beacons, streetlights)
 * - Optional BokehPass Depth-of-Field when a building/landmark is selected
 * - SMAAPass anti-aliasing
 * - Subtle Vignette ShaderPass + OutputPass (ACES tone mapping)
 * Automatically disabled on Low quality or via user toggle.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { scene, camera, renderer, webglAvailable, applyQualityToRenderer } from './scene.js';
import { updateLightingShadowQuality } from './lighting.js';
import { store } from '../state/store.js';

let composer = null;
let bloomPass = null;
let bokehPass = null;
let smaaPass = null;
let vignettePass = null;

const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    uOffset: { value: 1.05 },
    uDarkness: { value: 0.28 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uOffset;
    uniform float uDarkness;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - vec2(0.5)) * vec2(uOffset);
      float vig = clamp(1.0 - dot(uv, uv) * uDarkness, 0.0, 1.0);
      gl_FragColor = vec4(texel.rgb * vig, texel.a);
    }
  `
};

export function initPostFX() {
  if (!webglAvailable || !renderer || !scene || !camera) return;

  composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // High threshold (0.85) ensures only bright emissive beacons, windows, and streetlights bloom
  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.34, // strength
    0.42, // radius
    0.85  // threshold
  );
  composer.addPass(bloomPass);

  // Optional Depth-of-Field Pass when an object is selected
  bokehPass = new BokehPass(scene, camera, {
    focus: 55.0,
    aperture: 0.00008,
    maxblur: 0.004
  });
  bokehPass.enabled = false;
  composer.addPass(bokehPass);

  // Vignette Pass
  vignettePass = new ShaderPass(VignetteShader);
  composer.addPass(vignettePass);

  // SMAA Pass for crisp architectural edges
  const pixelRatio = renderer.getPixelRatio();
  smaaPass = new SMAAPass(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
  composer.addPass(smaaPass);

  // OutputPass (Tone Mapping + sRGB conversion)
  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  syncQualitySettings(store.getLiveState().graphicsQuality);

  window.addEventListener('resize', () => {
    if (!composer || !renderer) return;
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

export function syncQualitySettings(qualityChoice = store.getLiveState().graphicsQuality) {
  const resolved = applyQualityToRenderer(qualityChoice);
  updateLightingShadowQuality(resolved);

  const viewState = store.getViewState();
  const usePost = viewState.postFxEnabled && resolved !== 'LOW';

  if (composer && bloomPass && smaaPass && bokehPass && vignettePass) {
    if (!usePost) {
      bloomPass.enabled = false;
      bokehPass.enabled = false;
      smaaPass.enabled = false;
      vignettePass.enabled = false;
    } else if (resolved === 'HIGH') {
      bloomPass.enabled = true;
      bloomPass.strength = 0.36;
      smaaPass.enabled = true;
      vignettePass.enabled = true;
      updateDoFState(viewState);
    } else {
      // MEDIUM
      bloomPass.enabled = true;
      bloomPass.strength = 0.22;
      smaaPass.enabled = false;
      vignettePass.enabled = true;
      bokehPass.enabled = false;
    }
    composer.setSize(window.innerWidth, window.innerHeight);
  }
}

export function updateDoFState(viewState, camTarget) {
  if (!bokehPass || !camera) return;
  const resolved = viewState.resolvedQuality;
  const shouldEnableDoF =
    Boolean(viewState.postFxEnabled) &&
    Boolean(viewState.dofEnabled) &&
    resolved === 'HIGH' &&
    Boolean(viewState.selectedObject);

  bokehPass.enabled = shouldEnableDoF;
  if (shouldEnableDoF && camTarget) {
    const dist = camera.position.distanceTo(camTarget);
    bokehPass.uniforms.focus.value = dist;
  }
}

export function renderFrame(camTarget) {
  if (!webglAvailable || !renderer || !scene || !camera) return;
  const viewState = store.getViewState();
  const resolved = viewState.resolvedQuality;

  if (composer && viewState.postFxEnabled && resolved !== 'LOW') {
    updateDoFState(viewState, camTarget);
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}