/**
 * Learning District Landmark Inspector.
 */
import { LEARNING_LANDMARKS } from '../../data/landmarks.js';
import { FINANCIAL_LESSONS } from '../../data/lessons.js';
import { selectWorldObject } from '../../controls/picking.js';

export function mountLandmarkInspector(landmarkId, titleEl, bodyEl) {
  const lm = LEARNING_LANDMARKS.find(x => x.id === landmarkId);
  if (!lm) return;
  const lesson = FINANCIAL_LESSONS[lm.conceptKey];
  titleEl.textContent = lm.short;

  bodyEl.innerHTML = `
    <div class="section-card" style="border-left:4px solid #22A06B;">
      <div style="font-size:15px; font-weight:700;">🎓 ${lm.name}</div>
      <p style="font-size:12.5px; margin-top:6px;">${lm.summary}</p>
    </div>

    ${
      lesson
        ? `
      <div class="section-card">
        <h4>Deep Dive: ${lesson.title}</h4>
        <p style="font-size:12px; margin-bottom:8px;">${lesson.meaning}</p>
        <div style="background:var(--bg-input); padding:7px; border-radius:4px; font-family:var(--font-mono); font-size:11.5px; margin-bottom:8px;">
          ${lesson.formula}
        </div>
        <p style="font-size:12px; margin-bottom:8px;"><strong>Example:</strong> ${lesson.example}</p>
        <div class="edu-block warn" style="margin-bottom:0;">
          <strong>What It Does NOT Tell You:</strong>
          <p style="font-size:11.5px; margin-top:3px;">${lesson.whatItDoesNotTell}</p>
        </div>
      </div>
    `
        : ''
    }

    <div class="section-card">
      <h4>All ${LEARNING_LANDMARKS.length} Learning District Landmarks</h4>
      ${LEARNING_LANDMARKS.map(
        l => `
        <button data-lm-id="${l.id}" class="lm-nav-btn ${l.id === landmarkId ? 'active' : ''}" style="width:100%; text-align:left; margin-bottom:4px;">
          🎓 ${l.name}
        </button>
      `
      ).join('')}
    </div>
  `;

  bodyEl.querySelectorAll('.lm-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => selectWorldObject('LEARN', btn.dataset.lmId, true));
  });
}