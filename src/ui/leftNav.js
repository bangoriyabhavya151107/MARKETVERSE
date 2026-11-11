/**
 * Left Navigation Sidebar (Desktop Rail) & Mobile Bottom Tab Bar.
 * Routes to the 5 primary screens: City, Markets, Companies, Learn, Tools.
 * Also provides District Quick-Jumps to fly across the 3D City.
 */
import { store } from '../state/store.js';
import { applyCameraPreset } from '../controls/cameraRig.js';
import { navigateTo } from './router.js';

export function switchLeftNavView(viewKey) {
  navigateTo(viewKey);
}

export function initLeftNavEvents() {
  // Desktop Left Nav Buttons
  document.querySelectorAll('#left-nav .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route || btn.dataset.view;
      if (route) {
        navigateTo(route);
      }
    });
  });

  // Mobile Bottom Navigation Bar Buttons (5 Tabs: City, Markets, Companies, Learn, Tools)
  document.querySelectorAll('#mobile-bottom-nav .mob-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route || btn.dataset.mobView;
      if (route) {
        navigateTo(route);
      }
    });
  });

  // District Quick-Jump Buttons (Fly to district in 3D City)
  document.querySelectorAll('.camera-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo('city');
      applyCameraPreset(btn.dataset.cam);
    });
  });

  // Sidebar Icon-Only Mode Toggle
  const iconModeBtn = document.getElementById('collapse-icon-mode-btn');
  if (iconModeBtn) {
    iconModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('left-icon-only');
    });
  }
}
