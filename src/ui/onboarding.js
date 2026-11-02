/**
 * Initial dynamic label population for navigation & tabs (replaces hardcoded "36" / "10" strings).
 */
import { getDatasetCounts } from '../engine/indices.js';

export function initDynamicCountLabels(companies) {
  const counts = getDatasetCounts(companies);

  const navComp = document.getElementById('nav-companies-label');
  if (navComp) navComp.textContent = `3. Companies (${counts.listedCount})`;

  const navSec = document.getElementById('nav-sectors-label');
  if (navSec) navSec.textContent = `4. Sectors (${counts.sectorCount})`;

  const navLearn = document.getElementById('nav-learn-label');
  if (navLearn) navLearn.textContent = `10. Learn Finance (${counts.lessonCount})`;

  const btabComp = document.getElementById('btab-companies-btn');
  if (btabComp) btabComp.textContent = `Companies (${counts.listedCount})`;

  const btabSec = document.getElementById('btab-sectors-btn');
  if (btabSec) btabSec.textContent = `Sectors (${counts.sectorCount})`;
}