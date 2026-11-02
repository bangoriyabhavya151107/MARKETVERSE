/**
 * Left Navigation Sidebar, Camera Presets, and Atmosphere Controls.
 */
import { store } from '../state/store.js';
import { applyCameraPreset } from '../controls/cameraRig.js';
import { update3DCityFromState } from '../world/buildings.js';
import { applyWeatherAndLighting } from '../world/weather.js';
import { syncBottomTabButtons } from './bottomPanel.js';

export function switchLeftNavView(viewKey) {
  const live = store.getLiveState();
  live.activeNavView = viewKey;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewKey));

  if (['compare', 'watchlist', 'portfolio', 'whatif', 'learn', 'indices', 'overview'].includes(viewKey)) {
    live.selectedObject = null;
    const deselectBtn = document.getElementById('deselect-btn');
    if (deselectBtn) deselectBtn.style.display = 'none';
    document.body.classList.remove('right-collapsed');
  }

  if (viewKey === 'companies') {
    live.activeBottomTab = 'companies';
    syncBottomTabButtons();
    store.emit('bottomTab');
  } else if (viewKey === 'sectors') {
    live.activeBottomTab = 'sectors';
    syncBottomTabButtons();
    store.emit('bottomTab');
  } else if (viewKey === 'indices') {
    live.activeBottomTab = 'indices';
    syncBottomTabButtons();
    store.emit('bottomTab');
  }

  update3DCityFromState(store.getViewState());
  store.emit('nav');
}

export function initLeftNavEvents() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLeftNavView(btn.dataset.view));
  });

  document.querySelectorAll('.camera-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => applyCameraPreset(btn.dataset.cam));
  });

  document.getElementById('day-night-btn').addEventListener('click', e => {
    const live = store.getLiveState();
    live.isNight = !live.isNight;
    e.target.textContent = live.isNight ? '🌙 Night' : '☀️ Day';
    applyWeatherAndLighting(store.getViewState());
  });

  document.getElementById('labels-toggle-btn').addEventListener('click', e => {
    const live = store.getLiveState();
    live.labelsVisible = !live.labelsVisible;
    e.target.classList.toggle('active', live.labelsVisible);
    update3DCityFromState(store.getViewState());
  });

  document.getElementById('weather-select').addEventListener('change', e => {
    const live = store.getLiveState();
    live.weather = e.target.value;
    applyWeatherAndLighting(store.getViewState());
  });
}