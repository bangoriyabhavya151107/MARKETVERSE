/**
 * MarketVerse — Application Entry & Main Loop (Boot Only).
 */
import { store } from './state/store.js';
import { initDataset, stepMarketSimulation } from './engine/simulation.js';
import { initScene, updateAdaptivePixelRatio, getRenderTelemetry } from './world/scene.js';
import { buildLighting } from './world/lighting.js';
import { buildGroundAndRoadNetwork, updateCanalWater } from './world/ground.js';
import { buildCentralExchangeComplex, animateExchangeComplex } from './world/exchange.js';
import { buildSectorDistricts } from './world/districts.js';
import { buildCompanyBuildings, update3DCityFromState, updateBuildingPulses } from './world/buildings.js';
import { buildInfrastructureDistrict, animateInfrastructure } from './world/infrastructure.js';
import { buildLearningDistrict, animateLearningLandmarks } from './world/learning.js';
import { buildInstancedProps, animateInstancedProps } from './world/instancing.js';
import { buildTraffic, updateTraffic } from './world/traffic.js';
import { buildRainParticles, updateRainParticles } from './world/weather.js';
import { initPostFX, renderFrame } from './world/postfx.js';
import { setLabelSelectHandler, updateWorldLabelsProjection } from './world/labels.js';
import { camRig, updateCameraImmediate, updateCameraRig } from './controls/cameraRig.js';
import { selectWorldObject } from './controls/picking.js';
import { setupViewportControls, updateMinimap } from './controls/touch.js';
import { initTopBarEvents, updateTopBarAndSummaryCards } from './ui/topbar.js';
import { initLeftNavEvents } from './ui/leftNav.js';
import { mountInspectorPanel, updateInspectorPanelOnTick } from './ui/inspector/index.js';
import { initBottomPanelEvents, mountBottomPanel, updateBottomPanelOnTick } from './ui/bottomPanel.js';
import { initModalEvents, openQATestModal } from './ui/modal.js';
import { initDynamicCountLabels, setLoadingProgress, finishLoadingAndStartIntro, playUiSound } from './ui/onboarding.js';
import { preloadPolyforkModels } from './world/modelLoader.js';

async function boot() {
  setLoadingProgress(10, 'Loading Seeded Indian Market Dataset...');
  store.loadPersistedState();
  initDataset();
  initDynamicCountLabels(store.getViewState().companies);

  // Pre-populate summary counters before removal of loading screen to prevent placeholder flash
  const initialView = store.getViewState();
  updateTopBarAndSummaryCards(initialView);

  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', e => {
      store.getLiveState().reducedMotion = e.matches;
      store.emit('settings');
    });
  }

  setLoadingProgress(25, 'Downloading Polyfork Low-Poly 3D Assets (CC BY 4.0)...');
  await preloadPolyforkModels((pct, name) => {
    setLoadingProgress(25 + Math.round(pct * 25), `Loading ${name}...`);
  });

  setLoadingProgress(55, 'Constructing 3D Exchange & Sector Districts...');
  setLabelSelectHandler(selectWorldObject);
  initScene();
  buildLighting();
  buildGroundAndRoadNetwork();
  buildCentralExchangeComplex();
  buildSectorDistricts();

  setLoadingProgress(75, 'Building Company Towers & Learning Landmarks...');
  buildCompanyBuildings(store.getViewState().companies);
  buildInfrastructureDistrict();
  buildLearningDistrict();
  buildInstancedProps();
  buildTraffic();
  buildRainParticles();
  initPostFX();

  update3DCityFromState(store.getViewState());
  updateCameraImmediate();

  setLoadingProgress(92, 'Wiring Interactive Controls & Analytics...');
  setupViewportControls();
  initTopBarEvents();
  initLeftNavEvents();
  initBottomPanelEvents();
  initModalEvents();

  store.subscribe('selection', () => {
    playUiSound('select');
  });

  store.subscribe(
    ['selection', 'nav', 'settings', 'watchlist', 'portfolio', 'compare', 'whatif'],
    viewState => {
      updateTopBarAndSummaryCards(viewState);
      mountInspectorPanel(viewState);
      mountBottomPanel(viewState);
    }
  );

  store.subscribe(['bottomTab', 'filter', 'event'], viewState => {
    updateTopBarAndSummaryCards(viewState);
    mountBottomPanel(viewState);
  });

  store.subscribe('alerts', viewState => {
    updateTopBarAndSummaryCards(viewState);
  });

  store.subscribe(['tick', 'replay'], viewState => {
    update3DCityFromState(viewState);
    updateTopBarAndSummaryCards(viewState);
    updateInspectorPanelOnTick(viewState);
    updateBottomPanelOnTick(viewState);
  });

  const viewAtMount = store.getViewState();
  updateTopBarAndSummaryCards(viewAtMount);
  mountInspectorPanel(viewAtMount);
  mountBottomPanel(viewAtMount);

  finishLoadingAndStartIntro();

  // Auto-open QA Acceptance Suite if ?test=1 is in the URL
  if (window.location.search.includes('test=1')) {
    setTimeout(() => openQATestModal(), 500);
  }

  const perfPill = document.getElementById('perf-telemetry-pill');
  if (perfPill && (window.location.search.includes('debug=1') || window.location.search.includes('dev=1'))) {
    perfPill.style.display = 'block';
  }
  let lastFrameTime = performance.now();
  let simAccumulator = 0;
  let telemetryAccumulator = 0;

  function animate(now) {
    requestAnimationFrame(animate);

    const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
    const nowSec = now * 0.001;
    lastFrameTime = now;

    // Pause simulation and 3D rendering when browser tab is hidden
    if (document.hidden) return;

    const liveState = store.getLiveState();
    const viewState = store.getViewState();

    if (liveState.simRunning && liveState.dataMode === 'SIMULATION' && liveState.replayIndex === -1) {
      simAccumulator += dt * liveState.simSpeed;
      if (simAccumulator >= 2.6) {
        simAccumulator = 0;
        stepMarketSimulation();
      }
    }

    updateAdaptivePixelRatio(dt);
    updateCameraRig(dt);
    updateBuildingPulses(viewState.companies, dt, viewState);
    animateExchangeComplex(dt, liveState.reducedMotion);
    animateInfrastructure(dt, liveState.reducedMotion);
    animateLearningLandmarks(nowSec, dt, liveState.reducedMotion);
    animateInstancedProps(nowSec, liveState.reducedMotion);
    updateCanalWater(dt, liveState.reducedMotion);
    updateTraffic(dt, liveState.reducedMotion);
    updateRainParticles(dt, liveState.reducedMotion, camRig.target, camRig.distance);

    renderFrame(camRig.target);
    updateWorldLabelsProjection();
    updateMinimap();

    telemetryAccumulator += dt;
    if (telemetryAccumulator >= 0.5 && perfPill) {
      telemetryAccumulator = 0;
      const stats = getRenderTelemetry();
      perfPill.textContent = `${stats.fps} FPS • ${stats.calls} draws • ${(stats.triangles / 1000).toFixed(1)}k tris`;
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener('DOMContentLoaded', boot);