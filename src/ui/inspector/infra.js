/**
 * Market Infrastructure Facility Inspector.
 */
import { INFRA_FACILITIES } from '../../data/infrastructure.js';
import { selectWorldObject } from '../../controls/picking.js';

export function mountInfraInspector(infraId, titleEl, bodyEl) {
  const fac = INFRA_FACILITIES.find(x => x.id === infraId);
  if (!fac) return;
  titleEl.textContent = fac.short;

  bodyEl.innerHTML = `
    <div class="section-card" style="border-left:4px solid #4B8BE8;">
      <div style="font-size:15px; font-weight:700;">${fac.name}</div>
      <div style="font-size:11.5px; color:var(--accent); margin-top:2px; font-weight:600;">Role: ${fac.role}</div>
      <p style="font-size:12.5px; margin-top:8px;">${fac.summary}</p>
    </div>

    <div class="edu-block warn">
      <strong>How This Differs from Other Market Institutions</strong>
      <p style="font-size:12px; margin-top:4px;">${fac.distinction}</p>
    </div>

    <div class="section-card">
      <h4>Explore All ${INFRA_FACILITIES.length} Infrastructure Facilities</h4>
      ${INFRA_FACILITIES.map(
        f => `
        <button data-infra-id="${f.id}" class="infra-nav-btn ${f.id === infraId ? 'active' : ''}" style="width:100%; text-align:left; margin-bottom:4px; display:flex; justify-content:space-between;">
          <span>⚙️ ${f.short}</span>
          <span style="font-size:10.5px; color:var(--text-secondary);">Inspect →</span>
        </button>
      `
      ).join('')}
    </div>
  `;

  bodyEl.querySelectorAll('.infra-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => selectWorldObject('INFRA', btn.dataset.infraId, true));
  });
}