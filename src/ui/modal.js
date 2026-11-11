/**
 * Educational Concept Modal, Alerts Modal, Keyboard Shortcuts Modal,
 * Automated QA Test Suite Modal, and Settings Modal.
 */
import { FINANCIAL_LESSONS } from '../data/lessons.js';
import { store } from '../state/store.js';
import { checkEducationalAlerts } from '../engine/alerts.js';
import { syncQualitySettings } from '../world/postfx.js';
import { update3DCityFromState } from '../world/buildings.js';
import { runAllEngineTests } from '../engine/__tests__/engine.test.js';
import ASSETS_MANIFEST from '../data/assets.json';

export function openCreditsModal() {
  document.getElementById('modal-title').textContent = '📜 3D Asset Credits & Licenses';
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="edu-block">
      <strong>License Information (CC BY 4.0)</strong>
      <p style="margin-top:4px;">
        All 3D low-poly models utilized in MarketVerse are provided by <a href="https://polyfork.dev" target="_blank" rel="noopener noreferrer" style="color:var(--accent); font-weight:600;">Polyfork</a> under the Creative Commons Attribution 4.0 International (CC BY 4.0) license.
      </p>
      <p style="margin-top:4px; font-style:italic; color:var(--text-secondary);">
        Models were modified (scaled, recolored, merged) for real-time visualization, building height scaling by market capitalization, and performance optimization.
      </p>
    </div>

    <div class="section-card" style="max-height:50vh; overflow-y:auto;">
      <h4>Attribution Index (${ASSETS_MANIFEST.length} Models)</h4>
      <table class="data-table" style="font-size:12px;">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Attribution & License Line</th>
            <th>Triangles</th>
          </tr>
        </thead>
        <tbody>
          ${ASSETS_MANIFEST.map(
            a => `
            <tr>
              <td style="font-weight:600;">${a.name}</td>
              <td>
                <span class="num">${a.name} by Polyfork (<a href="${a.sourceUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--accent);">${a.sourceUrl}</a>), CC BY 4.0</span>
              </td>
              <td class="num">${a.tris.toLocaleString()}</td>
            </tr>
          `
          ).join('')}
        </tbody>
      </table>
    </div>

    <div class="section-card">
      <h4>Usage Contract & Architecture Compliance</h4>
      <p style="font-size:12px; color:var(--text-secondary);">
        All models follow the New York City Kit (<code>nyc-city-kit-fbca88</code>) contract: 4m spatial grid snapping, 1 unit = 1 meter real-world coordinate system, 3m standardized floor pitch for non-stretching modular skyscraper extensions, and unified material palettes for low draw calls.
      </p>
    </div>
  `;
  document.getElementById('modal-backdrop').style.display = 'flex';
}

export function openPrivacyModal() {
  document.getElementById('modal-title').textContent = '🔒 Privacy Policy';
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="edu-block">
      <strong>Zero Tracking, 100% Client-Side Privacy</strong>
      <p style="margin-top:4px;">
        MarketVerse is committed to complete user privacy. All simulation state, what-if calculations, watchlists, and settings run entirely in your browser's local memory or localStorage.
      </p>
    </div>
    <div class="section-card">
      <h4>Key Privacy Guarantees</h4>
      <ul style="padding-left:16px; font-size:12.5px; display:flex; flex-direction:column; gap:6px; color:var(--text-primary);">
        <li><strong>No Cookies or Ad Trackers:</strong> We do not use advertising trackers, analytics tracking pixels, or third-party profiling cookies.</li>
        <li><strong>Local Data Storage:</strong> Your custom watchlist and simulated portfolio are stored exclusively in your browser's <code>localStorage</code>.</li>
        <li><strong>No Telemetry Sharing:</strong> Render statistics (FPS, draw calls, triangles) are calculated locally in WebGL memory and never transmitted externally.</li>
      </ul>
    </div>
  `;
  document.getElementById('modal-backdrop').style.display = 'flex';
}

export function openTermsModal() {
  document.getElementById('modal-title').textContent = '⚖️ Terms of Service & Disclaimer';
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="edu-block warn">
      <strong>Educational Financial Simulation — Not Investment Advice</strong>
      <p style="margin-top:4px;">
        MarketVerse is an interactive financial literacy and educational sandbox platform. All market indices (NIFTY 50, SENSEX), ticker symbols, company valuations, economic events, and financial statements depicted in simulation mode are completely fictional models.
      </p>
    </div>
    <div class="section-card">
      <h4>Permitted Use</h4>
      <ul style="padding-left:16px; font-size:12.5px; display:flex; flex-direction:column; gap:6px; color:var(--text-primary);">
        <li><strong>Educational Literacy:</strong> The software is provided for teaching macroeconomic mechanics, market-cap weighting, trading concepts, and 3D spatial visualization.</li>
        <li><strong>Disclaimer of Warranty:</strong> The service is provided "as is" without warranty of any kind. None of the figures or events should be relied upon for actual capital allocation.</li>
        <li><strong>Intellectual Property:</strong> 3D assets are credited to Polyfork under CC BY 4.0. Codebase is available under open educational terms.</li>
      </ul>
    </div>
  `;
  document.getElementById('modal-backdrop').style.display = 'flex';
}

export function openConceptModal(conceptKey) {
  if (conceptKey === 'disclaimer') {
    openTermsModal();
    return;
  }
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

export function openQATestModal() {
  const results = runAllEngineTests();
  update3DCityFromState(store.getViewState());

  document.getElementById('modal-title').textContent = `🧪 Automated QA & Acceptance Suite (${results.passed}/${results.total} Passed)`;
  document.getElementById('modal-body').innerHTML = `
    <div class="edu-block" style="border-left-color:${results.failed === 0 ? 'var(--pos)' : 'var(--neg)'};">
      <strong>Verification Summary: ${results.passed} Passed, ${results.failed} Failed</strong>
      <p style="font-size:var(--text-sm); margin-top:4px;">
        Executed live against the active MarketVerse engine and DOM state. You can also run <code>npm test</code> in the terminal.
      </p>
    </div>
    <div class="section-card" style="max-height:55vh; overflow-y:auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Test ID & Requirement</th>
            <th>Verified Detail</th>
          </tr>
        </thead>
        <tbody>
          ${results.items
            .map(
              t => `
            <tr>
              <td><span class="badge ${t.pass ? 'pos' : 'neg'}">${t.pass ? 'PASS ✓' : 'FAIL ✕'}</span></td>
              <td style="font-weight:600; white-space:normal;">${t.name}</td>
              <td class="num" style="white-space:normal; font-size:11px; color:var(--text-secondary);">${t.detail}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
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
          <tr><td><kbd class="badge">1</kbd> – <kbd class="badge">9</kbd>, <kbd class="badge">0</kbd></td><td>Switch Left Navigation Views 1 through 9</td></tr>
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
      <h4>Visual, Audio & Accessibility Controls</h4>
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
          <span>Web Audio Sound Effects (Off by default)</span>
          <input type="checkbox" id="modal-sound-checkbox" ${viewState.soundEnabled ? 'checked' : ''} />
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
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Developer Telemetry (FPS, Draw Calls, Triangles)</span>
          <input type="checkbox" id="modal-debug-stats-checkbox" ${document.getElementById('perf-telemetry-pill')?.style.display === 'block' ? 'checked' : ''} />
        </label>
        <div style="border-top:1px solid var(--border-subtle); padding-top:8px; display:flex; justify-content:space-between; align-items:center;">
          <span>Automated Engine & 18 Acceptance Tests</span>
          <button class="primary" id="modal-run-qa-btn">🧪 Run QA Suite</button>
        </div>
      </div>
    </div>

    <div class="section-card">
      <h4>Legal Information & 3D Asset Attribution</h4>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
        <button id="modal-open-credits-btn" class="primary" style="font-size:12px;">📜 Polyfork Asset Credits (CC BY 4.0)</button>
        <button id="modal-open-privacy-btn" style="font-size:12px;">🔒 Privacy Policy</button>
        <button id="modal-open-terms-btn" style="font-size:12px;">⚖️ Terms of Service</button>
      </div>
    </div>

    <div class="edu-block">
      <strong>Accessibility Note:</strong> Positive and negative movements in MarketVerse always include explicit directional symbols (▲ +, ▼ -, •) alongside green/red/amber colors.
    </div>
  `;

  body.querySelector('#modal-quality-select')?.addEventListener('change', e => {
    const val = e.target.value;
    syncQualitySettings(val);
    const navSel = document.getElementById('quality-select');
    if (navSel) navSel.value = val;
    openSettingsModal();
  });

  body.querySelector('#modal-postfx-checkbox')?.addEventListener('change', e => {
    store.getLiveState().postFxEnabled = e.target.checked;
    syncQualitySettings(store.getLiveState().graphicsQuality);
  });

  body.querySelector('#modal-dof-checkbox')?.addEventListener('change', e => {
    store.getLiveState().dofEnabled = e.target.checked;
    syncQualitySettings(store.getLiveState().graphicsQuality);
  });

  body.querySelector('#modal-sound-checkbox')?.addEventListener('change', e => {
    const live = store.getLiveState();
    live.soundEnabled = e.target.checked;
    const sBtn = document.getElementById('sound-top-btn');
    if (sBtn) {
      sBtn.textContent = live.soundEnabled ? '🔊' : '🔇';
      sBtn.classList.toggle('active', live.soundEnabled);
    }
  });

  body.querySelector('#modal-heatmap-checkbox')?.addEventListener('change', e => {
    const live = store.getLiveState();
    live.heatmapMode = e.target.checked;
    const navBtn = document.getElementById('heatmap-toggle-btn');
    if (navBtn) {
      navBtn.classList.toggle('active', live.heatmapMode);
      navBtn.textContent = live.heatmapMode ? '🔥 Sector Heatmap: On' : '🔥 Sector Heatmap: Off';
    }
    update3DCityFromState(store.getViewState());
  });

  body.querySelector('#toggle-theme-modal-btn')?.addEventListener('click', () => {
    document.body.classList.toggle('light-ui');
    store.getLiveState().lightUiTheme = document.body.classList.contains('light-ui');
    store.emit('settings');
  });

  body.querySelector('#reduced-motion-checkbox')?.addEventListener('change', e => {
    store.getLiveState().reducedMotion = e.target.checked;
    store.emit('settings');
  });

  const debugBox = body.querySelector('#modal-debug-stats-checkbox');
  if (debugBox) {
    debugBox.addEventListener('change', e => {
      const pill = document.getElementById('perf-telemetry-pill');
      if (pill) pill.style.display = e.target.checked ? 'block' : 'none';
    });
  }

  body.querySelector('#modal-open-credits-btn')?.addEventListener('click', openCreditsModal);
  body.querySelector('#modal-open-privacy-btn')?.addEventListener('click', openPrivacyModal);
  body.querySelector('#modal-open-terms-btn')?.addEventListener('click', openTermsModal);

  body.querySelector('#modal-run-qa-btn')?.addEventListener('click', openQATestModal);

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