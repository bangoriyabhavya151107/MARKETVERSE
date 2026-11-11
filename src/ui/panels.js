/**
 * MarketVerse Centralized Panel & Sheet Manager.
 * Enforces the strict rule: "Only ONE panel / drawer / sheet open at a time."
 * Manages mobile bottom sheets (peek / half / full) and desktop right drawers.
 */

let activePanelId = null;

const ALL_PANEL_IDS = [
  'right-panel',         // Inspector Drawer / Mobile Bottom Sheet
  'sheet-simulation',    // Simulation Controls Sheet
  'sheet-scene',         // 3D Scene & Atmosphere Sheet
  'drawer-menu',         // Main Menu & Utilities Drawer
  'search-modal-wrap'    // Global Search Modal
];

/**
 * Returns the currently active panel ID, or null if none is open.
 */
export function getActivePanel() {
  return activePanelId;
}

/**
 * Closes all open panels, sheets, drawers, and modal backdrops.
 */
export function closeAllPanels() {
  ALL_PANEL_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open', 'sheet-peek', 'sheet-full');
    el.classList.add('closed');
    if (id === 'right-panel') {
      document.body.classList.add('right-collapsed');
    }
  });

  const backdrop = document.getElementById('sheet-backdrop');
  if (backdrop) {
    backdrop.classList.remove('visible');
    backdrop.style.display = 'none';
  }

  activePanelId = null;
}

/**
 * Closes a specific panel if it is currently open.
 */
export function closePanel(panelId) {
  const el = document.getElementById(panelId);
  if (!el) return;
  el.classList.remove('open', 'sheet-peek', 'sheet-full');
  el.classList.add('closed');

  if (panelId === 'right-panel') {
    document.body.classList.add('right-collapsed');
  }

  if (activePanelId === panelId) {
    activePanelId = null;
    const backdrop = document.getElementById('sheet-backdrop');
    if (backdrop) {
      backdrop.classList.remove('visible');
      backdrop.style.display = 'none';
    }
  }
}

/**
 * Opens a specific panel/sheet while ensuring all other panels are closed.
 */
export function openPanel(panelId, initialSheetState = 'sheet-half') {
  if (activePanelId && activePanelId !== panelId) {
    closePanel(activePanelId);
  }

  const targetEl = document.getElementById(panelId);
  if (!targetEl) return;

  targetEl.classList.remove('closed');
  targetEl.classList.add('open');

  if (panelId === 'right-panel') {
    document.body.classList.remove('right-collapsed');
    targetEl.classList.remove('sheet-peek', 'sheet-full', 'sheet-half');
    targetEl.classList.add(initialSheetState);
  }

  // Show backdrop on mobile or when sheets/drawers open
  const backdrop = document.getElementById('sheet-backdrop');
  if (backdrop) {
    backdrop.style.display = 'block';
    // Trigger transition
    requestAnimationFrame(() => backdrop.classList.add('visible'));
  }

  activePanelId = panelId;
}

/**
 * Cycles bottom sheet height between peek -> half -> full -> half on mobile.
 */
export function cycleBottomSheetState(panelId = 'right-panel') {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  if (panel.classList.contains('sheet-peek')) {
    panel.classList.remove('sheet-peek', 'sheet-full');
    panel.classList.add('sheet-half');
  } else if (panel.classList.contains('sheet-half')) {
    panel.classList.remove('sheet-peek', 'sheet-half');
    panel.classList.add('sheet-full');
  } else {
    panel.classList.remove('sheet-half', 'sheet-full');
    panel.classList.add('sheet-peek');
  }
}

/**
 * Initializes global panel listeners (backdrop click, escape key, sheet handles).
 */
export function initPanelManager() {
  const backdrop = document.getElementById('sheet-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeAllPanels();
    });
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activePanelId) {
      closeAllPanels();
    }
  });

  // Wire close buttons across all sheets
  document.querySelectorAll('[data-close-sheet]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.closeSheet;
      if (targetId) closePanel(targetId);
      else closeAllPanels();
    });
  });

  // Wire mobile drag handles
  document.querySelectorAll('.sheet-drag-handle').forEach(handle => {
    handle.addEventListener('click', e => {
      const panel = handle.closest('.mobile-sheet') || document.getElementById('right-panel');
      if (panel) cycleBottomSheetState(panel.id);
    });
  });
}
