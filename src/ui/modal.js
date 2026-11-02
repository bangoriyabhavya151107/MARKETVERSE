/**
 * Educational Concept Modal, Alerts Modal, Keyboard Shortcuts Modal, and Settings Modal.
 */
import { FINANCIAL_LESSONS } from '../data/lessons.js';
import { store } from '../state/store.js';
import { checkEducationalAlerts } from '../engine/alerts.js';
import { syncQualitySettings } from '../world/postfx.js';
import { update3DCityFromState } from '../world/buildings.js';

export function openConceptModal(conceptKey) {
  const les = FINANCIAL_LESSONS[conceptKey];
  if (!les) return;
  document.getElementById('modal-title').textContent = `Understand This: ${les.title}`;
  document.getElementById('modal-body').innerHTML = `
    <div class="edu-block">
      <strong>What It Means</strong>
      <p style="margin-top:4px;">${les.meaning}</p>
    </div>
    <div class="section-card">
      <h4>Formula / Calculation</h4>
      <div style="background:var(--bg-input); padding:8px; border-radius:4px; font-family:var(--font-mono); font-size:12px;">
        ${les.formula}
      </div>
    </div>
    <div class="section-card">
      <h4>Numerical Example</h4>
      <p>${les.example}</p>
    </div>
    <div class="section-card">
      <h4>Why It Matters</h4>
      <p>${les.whyItMatters}</p>
    </div>
    <div class="edu-block warn">
      <strong>What It Does NOT Tell You (Common Misconceptions)</strong>
      <p style="margin-top:4px;">${les.whatItDoesNotTell}</p>
    </div>
  `;
  document.getElementById('modal-backdrop').style.display = 'flex';
}

export function openShortcutsModal() {
  document.getElementById('modal-title').textContent = 'Keyboard, Mouse & Touch Controls';
  document.getElementById('modal-body').innerHTML = `
    <div class="section-card">
      <h4>Keyboard Shortcuts</h4>
      <table class="data-table" style="font-size:12px;">
        <tbody>
          <tr><td><kbd class="badge">1</kbd> – <kbd class="badge">9</kbd>, <kbd class="badge">0</kbd></td><td>Switch Left Navigation Views 1 through 10</td></tr>
          <tr><td><kbd class="badge">Space</kbd></td><td>Pause / Resume Live Market Simulation</td></tr>
          <tr><td><kbd class="badge">F</kbd></td><td>Focus Camera on Selected Object (or Exchange)</td></tr>
          <tr><td><kbd class="badge">Esc</kbd></td><td>Close Modal or Deselect Active Building/District</td></tr>
          <tr><td><kbd class="badge">/</kbd></td><td>Focus Global Search Bar</td></tr>
          <tr><td><kbd class="badge">?</kbd></td><td>Open this Keyboard Shortcuts Guide</td></tr>
        </tbody>
      </table>
    </div>
    <div class="section-card">
      <h4>Mouse & Touch Gestures</h4>
      <ul style="padding-left:16px; font-size:12px; display:flex; flex-direction:column; gap:6px;">
        <li><strong>Mouse:</strong> Left-drag to Pan • Right-drag (or Shift+drag) to Orbit • Scroll Wheel to Zoom • Click to Select • Double-click to Zoom-Focus.</li>
        <li><strong>Touch:</strong> 1-Finger drag to Orbit • 2-Finger drag to Pan + Pinch to Zoom • Tap to Select • Double-tap to Focus.</li>
        <li><strong>Minimap & D-Pad:</strong> Click or drag anywhere on the bottom-right City Radar minimap or use the bottom-left on-screen camera buttons.</li>
      </ul>
    </div>
  `;
  document.getElementById('modal-backdrop').style.display = 'flex';
}

export function openAlertsModal() {
  const viewState = store.getViewState();
  document.getElementById('modal-title').textContent = 'Educational Market Alerts (Simulated Dataset)';
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="edu-block">
      Alerts monitor the active dataset (${viewState.dataMode}) and explain when a company or sector crosses your custom movement threshold.
    </div>
    <div class="section-card">
      <h4>Create New Percentage Movement Alert</h4>
      <div style="display:grid; grid-template-columns:1fr 90px auto; gap:6px;">
        <select id="new-alert-comp">
          ${viewState.companies.map(c => `<option value="${c.id}">${c.symbol}</option>`).join('')}
        </select>
        <input type="number" id="new-alert-pct" value="2.0" step="0.5" min="0.5" placeholder="±%" />
        <button class="primary" id="add-alert-submit-btn">+ Add Alert</button>
      </div>
    </div>
    <div class="section-card">
      <h4>Active Alert Rules (${viewState.alerts.length})</h4>
      ${viewState.alerts
        .map(
          a => `
        <div style="font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">${a.description}</div>
      `
        )
        .join('')}
    </div>
    <div class="section-card">
      <h4>Triggered Notifications Log (${viewState.triggeredAlerts.length})</h4>
      ${
        viewState.triggeredAlerts.length === 0
          ? `<div style="color:var(--text-secondary); font-size:12px;">No alerts triggered yet in this session.</div>`
          : viewState.triggeredAlerts
              .map(
                m => `<div style="padding:5px 0; border-bottom:1px solid var(--border-subtle); font-size:11.5px;">🔔 ${m}</div>`
              )
              .join('')
      }
    </div>
  `;

  const addBtn = body.querySelector('#add-alert-submit-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const live = store.getLiveState();
      const cid = document.getElementById('new-alert-comp').value;
      const pct = parseFloat(document.getElementById('new-alert-pct').value) || 2.0;
      const comp = live.companies.find(c => c.id === cid);
      if (!comp) return;
      live.alerts.push({
        id: 'A' + Date.now(),
        type: 'COMPANY_PCT',
        targetId: cid,
        thresholdPct: pct,
        description: `${comp.symbol} moves more than ±${pct.toFixed(1)}%`
      });
      store.savePersistedState();
      checkEducationalAlerts(live);
      store.emit('alerts');
      openAlertsModal();
    });
  }

  document.getElementById('modal-backdrop').style.display = 'flex';
}

export function openSettingsModal() {
  const viewState = store.getViewState();
  document.getElementById('modal-title').textContent = 'Environment, Render Quality & Accessibility Settings';
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="section-card">
      <h4>Visual, Post-Processing & Atmosphere Controls</h4>
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>3D Graphics Quality (Active: <strong>${viewState.resolvedQuality}</strong>)</span>
          <select id="modal-quality-select">
            <option value="AUTO" ${viewState.graphicsQuality === 'AUTO' ? 'selected' : ''}>Auto-Detect</option>
            <option value="HIGH" ${viewState.graphicsQuality === 'HIGH' ? 'selected' : ''}>High (Bloom + SMAA + Soft Shadows)</option>
            <option value="MEDIUM" ${viewState.graphicsQuality === 'MEDIUM' ? 'selected' : ''}>Medium</option>
            <option value="LOW" ${viewState.graphicsQuality === 'LOW' ? 'selected' : ''}>Low (Battery Saver)</option>
          </select>
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Post-Processing (Selective Emissive Bloom, SMAA, Vignette)</span>
          <input type="checkbox" id="modal-postfx-checkbox" ${viewState.postFxEnabled ? 'checked' : ''} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Depth-of-Field (Focus Blur when a Building is Selected)</span>
          <input type="checkbox" id="modal-dof-checkbox" ${viewState.dofEnabled ? 'checked' : ''} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Automatic Smooth Day/Night Solar Cycle</span>
          <input type="checkbox" id="modal-autocycle-checkbox" ${viewState.autoDayNight ? 'checked' : ''} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Override Market-Driven Sky Tint (Keep Neutral Sky)</span>
          <input type="checkbox" id="modal-atmo-override-checkbox" ${viewState.atmosphereOverride ? 'checked' : ''} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Sector-Performance Ground Heatmap</span>
          <input type="checkbox" id="modal-heatmap-checkbox" ${viewState.heatmapMode ? 'checked' : ''} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Interface & 3D City Theme (Dark Navy vs. Daylight Palette)</span>
          <button id="toggle-theme-modal-btn">Toggle UI & 3D Theme</button>
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Reduced Motion (Respects OS prefers-reduced-motion)</span>
          <input type="checkbox" id="reduced-motion-checkbox" ${viewState.reducedMotion ? 'checked' : ''} />
        </label>
      </div>
    </div>
    <div class="edu-block">
      <strong>Accessibility Note:</strong> Positive and negative movements in MarketVerse always include explicit directional symbols (▲ +, ▼ -, •) alongside green/red/amber colors.
    </div>
  `;

  body.querySelector('#modal-quality-select').addEventListener('change', e => {
    const val = e.target.value;
    syncQualitySettings(val);
    const navSel = document.getElementById('quality-select');
    if (navSel) navSel.value = val;
    openSettingsModal();
  });

  body.querySelector('#modal-postfx-checkbox').addEventListener('change', e => {
    store.getLiveState().postFxEnabled = e.target.checked;
    syncQualitySettings(store.getLiveState().graphicsQuality);
  });

  body.querySelector('#modal-dof-checkbox').addEventListener('change', e => {
    store.getLiveState().dofEnabled = e.target.checked;
    syncQualitySettings(store.getLiveState().graphicsQuality);
  });

  body.querySelector('#modal-autocycle-checkbox').addEventListener('change', e => {
    const live = store.getLiveState();
    live.autoDayNight = e.target.checked;
    const autoBtn = document.getElementById('auto-cycle-btn');
    if (autoBtn) autoBtn.classList.toggle('active', live.autoDayNight);
  });

  body.querySelector('#modal-atmo-override-checkbox').addEventListener('change', e => {
    const live = store.getLiveState();
    live.atmosphereOverride = e.target.checked;
    const atmoBtn = document.getElementById('atmo-override-btn');
    if (atmoBtn) {
      atmoBtn.classList.toggle('active', !live.atmosphereOverride);
      atmoBtn.textContent = live.atmosphereOverride ? '🌤️ Override' : '🌤️ Mood Sky';
    }
  });

  body.querySelector('#modal-heatmap-checkbox').addEventListener('change', e => {
    const live = store.getLiveState();
    live.heatmapMode = e.target.checked;
    const navBtn = document.getElementById('heatmap-toggle-btn');
    if (navBtn) {
      navBtn.classList.toggle('active', live.heatmapMode);
      navBtn.textContent = live.heatmapMode ? '🔥 Sector Heatmap: On' : '🔥 Sector Heatmap: Off';
    }
    update3DCityFromState(store.getViewState());
  });

  body.querySelector('#toggle-theme-modal-btn').addEventListener('click', () => {
    document.body.classList.toggle('light-ui');
    store.getLiveState().lightUiTheme = document.body.classList.contains('light-ui');
    store.emit('settings');
  });

  body.querySelector('#reduced-motion-checkbox').addEventListener('change', e => {
    store.getLiveState().reducedMotion = e.target.checked;
    store.emit('settings');
  });

  document.getElementById('modal-backdrop').style.display = 'flex';
}

export function initModalEvents() {
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      backdrop.style.display = 'none';
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', e => {
      if (e.target.id === 'modal-backdrop') {
        backdrop.style.display = 'none';
      }
    });
  }
}