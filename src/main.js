/**
 * MarketVerse — Application Entry & Main Loop (Boot Only).
 */
import { store } from './state/store.js';
import { initDataset, stepMarketSimulation } from './engine/simulation.js';
import { initScene } from './world/scene.js';
import { buildLighting } from './world/lighting.js';
import { buildGroundAndRoadNetwork } from './world/ground.js';
import { buildCentralExchangeComplex } from './world/exchange.js';
import { buildSectorDistricts } from './world/districts.js';
import { buildCompanyBuildings, update3DCityFromState, updateBuildingPulses } from './world/buildings.js';
import { buildInfrastructureDistrict } from './world/infrastructure.js';
import { buildLearningDistrict } from './world/learning.js';
import { buildInstancedProps } from './world/instancing.js';
import { buildTraffic, updateTraffic } from './world/traffic.js';
import { buildRainParticles, updateRainParticles } from './world/weather.js';
import { renderFrame } from './world/postfx.js';
import { setLabelSelectHandler, updateWorldLabelsProjection } from './world/labels.js';
import { updateCameraImmediate, updateCameraRig } from './controls/cameraRig.js';
import { selectWorldObject } from './controls/picking.js';
import { setupViewportControls } from './controls/touch.js';
import { initTopBarEvents, updateTopBarAndSummaryCards } from './ui/topbar.js';
import { initLeftNavEvents } from './ui/leftNav.js';
import { mountInspectorPanel, updateInspectorPanelOnTick } from './ui/inspector/index.js';
import { initBottomPanelEvents, mountBottomPanel, updateBottomPanelOnTick } from './ui/bottomPanel.js';
import { initModalEvents } from './ui/modal.js';
import { initDynamicCountLabels } from './ui/onboarding.js';

function boot() {
  // 1. Load persisted user state & initialize deterministic market dataset
  store.loadPersistedState();
  initDataset();
  initDynamicCountLabels(store.getViewState().companies);

  // 2. Initialize 3D Scene & City World (with graceful WebGL fallback)
  setLabelSelectHandler(selectWorldObject);
  initScene();
  buildLighting();
  buildGroundAndRoadNetwork();
  buildCentralExchangeComplex();
  buildSectorDistricts();
  buildCompanyBuildings(store.getViewState().companies);
  buildInfrastructureDistrict();
  buildLearningDistrict();
  buildInstancedProps();
  buildTraffic();
  buildRainParticles();

  update3DCityFromState(store.getViewState());
  updateCameraImmediate();

  // 3. Wire Controls & UI Modules
  setupViewportControls();
  initTopBarEvents();
  initLeftNavEvents();
  initBottomPanelEvents();
  initModalEvents();

  // 4. Subscribe UI & 3D World to Granular Store Channels
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

  // On 'tick' and 'replay', patch keyed DOM nodes in the Inspector without destroying focused inputs
  store.subscribe(['tick', 'replay'], viewState => {
    update3DCityFromState(viewState);
    updateTopBarAndSummaryCards(viewState);
    updateInspectorPanelOnTick(viewState);
    updateBottomPanelOnTick(viewState);
  });

  // Initial UI render
  const initialView = store.getViewState();
  updateTopBarAndSummaryCards(initialView);
  mountInspectorPanel(initialView);
  mountBottomPanel(initialView);

  // 5. Start Main Animation & Simulation Loop
  let lastFrameTime = performance.now();
  let simAccumulator = 0;

  function animate(now) {
    requestAnimationFrame(animate);

    const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
    lastFrameTime = now;

    if (document.hidden) return;

    const liveState = store.getLiveState();

    // Advance live simulation every 2.6s at 1x speed when running in Live mode
    if (liveState.simRunning && liveState.dataMode === 'SIMULATION' && liveState.replayIndex === -1) {
      simAccumulator += dt * liveState.simSpeed;
      if (simAccumulator >= 2.6) {
        simAccumulator = 0;
        stepMarketSimulation();
      }
    }

    updateCameraRig(dt);
    updateBuildingPulses(liveState.companies, dt);
    updateTraffic(dt, liveState.reducedMotion);
    updateRainParticles(dt, liveState.reducedMotion);

    renderFrame();
    updateWorldLabelsProjection();
  }

  requestAnimationFrame(animate);
}

window.addEventListener('DOMContentLoaded', boot);