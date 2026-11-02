/**
 * Educational Concept Modal, Alerts Modal, and Settings Modal.
 */
import { FINANCIAL_LESSONS } from '../data/lessons.js';
import { store } from '../state/store.js';
import { checkEducationalAlerts } from '../engine/alerts.js';

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
  document.getElementById('modal-title').textContent = 'Environment, Theme & Accessibility Settings';
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <div class="section-card">
      <h4>Visual & Accessibility Controls</h4>
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Interface Theme (Dark Navy vs. High-Contrast Daylight)</span>
          <button id="toggle-theme-modal-btn">Toggle UI Theme</button>
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Reduced Motion (Instant camera jumps & minimal background motion)</span>
          <input type="checkbox" id="reduced-motion-checkbox" ${viewState.reducedMotion ? 'checked' : ''} />
        </label>
      </div>
    </div>
    <div class="edu-block">
      <strong>Accessibility Note:</strong> Positive and negative movements in MarketVerse always include explicit directional symbols (▲ +, ▼ -, •) alongside green/red/amber colors.
    </div>
  `;

  body.querySelector('#toggle-theme-modal-btn').addEventListener('click', () => {
    document.body.classList.toggle('light-ui');
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