/**
 * Left Navigation Sidebar (with Icon-Only Mode), Mobile Bottom Navigation Bar,
 * Mobile Bottom-Sheet Inspector Drag Handle (Peek / Half / Full), and Scene Controls.
 */
import { store } from '../state/store.js';
import { applyCameraPreset } from '../controls/cameraRig.js';
import { update3DCityFromState } from '../world/buildings.js';
import { applyWeatherAndLighting } from '../world/weather.js';
import { syncQualitySettings } from '../world/postfx.js';
import { syncBottomTabButtons } from './bottomPanel.js';
import { showToast } from './toasts.js';

export function switchLeftNavView(viewKey) {
  const live = store.getLiveState();
  live.activeNavView = viewKey;

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewKey));
  document.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.mobView === viewKey));

  if (viewKey === 'overview') {
    applyCameraPreset('ENTIRE');
  }

  if (['compare', 'watchlist', 'portfolio', 'whatif', 'learn', 'indices', 'overview'].includes(viewKey)) {
    live.selectedObject = null;
    const deselectBtn = document.getElementById('deselect-btn');
    if (deselectBtn) deselectBtn.style.display = 'none';
    document.body.classList.remove('right-collapsed');
  }

  if (viewKey === 'companies') {
    live.activeBottomTab = 'companies';
    syncBottomTabButtons();
    document.body.classList.remove('bottom-collapsed');
    store.emit('bottomTab');
  } else if (viewKey === 'sectors') {
    live.activeBottomTab = 'sectors';
    syncBottomTabButtons();
    document.body.classList.remove('bottom-collapsed');
    store.emit('bottomTab');
  } else if (viewKey === 'indices') {
    live.activeBottomTab = 'indices';
    syncBottomTabButtons();
    store.emit('bottomTab');
  }

  update3DCityFromState(store.getViewState());
  store.emit('nav');
}

function setupMobileBottomSheetAndNav() {
  // Collapse bottom table panel by default on mobile screens (<= 768px)
  if (window.innerWidth <= 768) {
    document.body.classList.add('bottom-collapsed');
  }

  document.querySelectorAll('.mob-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.remove('right-collapsed');
      const panel = document.getElementById('right-panel');
      if (panel && panel.classList.contains('sheet-peek')) {
        panel.classList.remove('sheet-peek');
        panel.classList.add('sheet-half');
      }
      switchLeftNavView(btn.dataset.mobView);
    });
  });

  const handle = document.getElementById('inspector-sheet-handle');
  const panel = document.getElementById('right-panel');
  if (!handle || !panel) return;

  const cycleSheetHeight = () => {
    if (panel.classList.contains('sheet-peek')) {
      panel.classList.remove('sheet-peek');
      panel.classList.add('sheet-half');
    } else if (panel.classList.contains('sheet-half')) {
      panel.classList.remove('sheet-half');
      panel.classList.add('sheet-full');
    } else {
      panel.classList.remove('sheet-full');
      panel.classList.add('sheet-peek');
    }
  };

  handle.addEventListener('click', cycleSheetHeight);
  handle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycleSheetHeight();
    }
  });
}

export function initLeftNavEvents() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLeftNavView(btn.dataset.view));
  });

  document.querySelectorAll('.camera-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => applyCameraPreset(btn.dataset.cam));
  });

  const iconModeBtn = document.getElementById('collapse-icon-mode-btn');
  if (iconModeBtn) {
    iconModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('left-icon-only');
    });
  }

  document.getElementById('day-night-btn').addEventListener('click', e => {
    const live = store.getLiveState();
    live.autoDayNight = false;
    const autoBtn = document.getElementById('auto-cycle-btn');
    if (autoBtn) autoBtn.classList.remove('active');

    live.isNight = !live.isNight;
    e.target.textContent = live.isNight ? '🌙 Night' : '☀️ Day';
    applyWeatherAndLighting(store.getViewState());
  });

  const autoCycleBtn = document.getElementById('auto-cycle-btn');
  if (autoCycleBtn) {
    autoCycleBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      live.autoDayNight = !live.autoDayNight;
      autoCycleBtn.classList.toggle('active', live.autoDayNight);
      showToast(
        live.autoDayNight
          ? 'Automatic Day/Night solar cycle enabled.'
          : 'Automatic Day/Night cycle paused.'
      );
    });
  }

  document.getElementById('labels-toggle-btn').addEventListener('click', e => {
    const live = store.getLiveState();
    live.labelsVisible = !live.labelsVisible;
    e.target.classList.toggle('active', live.labelsVisible);
    update3DCityFromState(store.getViewState());
  });

  const atmoOverrideBtn = document.getElementById('atmo-override-btn');
  if (atmoOverrideBtn) {
    atmoOverrideBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      live.atmosphereOverride = !live.atmosphereOverride;
      atmoOverrideBtn.classList.toggle('active', !live.atmosphereOverride);
      atmoOverrideBtn.textContent = live.atmosphereOverride ? '🌤️ Override' : '🌤️ Mood Sky';
      showToast(
        live.atmosphereOverride
          ? 'Market-driven sky tint overridden (manual neutral sky).'
          : 'Market-driven atmosphere enabled (Rally = Golden, Sell-off = Red Skyline).'
      );
    });
  }

  const heatmapBtn = document.getElementById('heatmap-toggle-btn');
  if (heatmapBtn) {
    heatmapBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      live.heatmapMode = !live.heatmapMode;
      heatmapBtn.classList.toggle('active', live.heatmapMode);
      heatmapBtn.textContent = live.heatmapMode ? '🔥 Sector Heatmap: On' : '🔥 Sector Heatmap: Off';
      update3DCityFromState(store.getViewState());
      showToast(
        live.heatmapMode
          ? 'Sector-Performance Heatmap enabled on district plazas.'
          : 'Sector-Performance Heatmap disabled.'
      );
    });
  }

  document.getElementById('weather-select').addEventListener('change', e => {
    const live = store.getLiveState();
    live.weather = e.target.value;
    if (live.weather === 'NIGHT' || live.weather === 'EVENING') {
      live.autoDayNight = false;
      if (autoCycleBtn) autoCycleBtn.classList.remove('active');
    }
    applyWeatherAndLighting(store.getViewState());
  });

  const qualitySel = document.getElementById('quality-select');
  if (qualitySel) {
    qualitySel.addEventListener('change', e => {
      const choice = e.target.value;
      syncQualitySettings(choice);
      const resolved = store.getLiveState().resolvedQuality;
      showToast(`Graphics quality set to ${choice} (Resolved: ${resolved}).`);
    });
  }

  setupMobileBottomSheetAndNav();
}