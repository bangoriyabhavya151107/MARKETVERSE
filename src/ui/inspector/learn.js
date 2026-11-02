/**
 * Financial Education Curriculum Inspector (All 12 Lessons).
 */
import { FINANCIAL_LESSONS } from '../../data/lessons.js';
import { applyCameraPreset } from '../../controls/cameraRig.js';
import { openConceptModal } from '../modal.js';

export function mountLearnInspector(titleEl, bodyEl) {
  const entries = Object.entries(FINANCIAL_LESSONS);
  titleEl.textContent = `Financial Education Curriculum (${entries.length})`;

  bodyEl.innerHTML = `
    <div class="edu-block">
      <strong>Learn Without Leaving the City</strong>
      <p style="font-size:11.5px; margin-top:3px;">
        Select any of the ${entries.length} interactive financial lessons below or fly directly to the <strong>Investor Learning District</strong> in the 3D city.
      </p>
      <button class="primary" id="fly-learn-district-btn" style="width:100%; margin-top:8px;">🎓 Fly Camera to Learning District</button>
    </div>

    <div class="section-card">
      <h4>${entries.length} Core Financial Lessons</h4>
      ${entries
        .map(
          ([key, les], idx) => `
        <div data-lesson-key="${key}" style="padding:8px; border-bottom:1px solid var(--border-subtle); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-size:12.5px;">${idx + 1}. ${les.title}</div>
            <div style="font-size:11px; color:var(--text-secondary);">${les.meaning.slice(0, 68)}...</div>
          </div>
          <span style="color:var(--accent); font-weight:700;">Open →</span>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  bodyEl.querySelector('#fly-learn-district-btn').addEventListener('click', () => {
    applyCameraPreset('LEARN');
  });

  bodyEl.querySelectorAll('[data-lesson-key]').forEach(row => {
    row.addEventListener('click', () => openConceptModal(row.dataset.lessonKey));
  });
}